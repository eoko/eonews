'use strict';

var marked = Meteor.npmRequire('marked');
var GitHubApi = Meteor.npmRequire('github');
var cheerio = Meteor.npmRequire('cheerio');
var md5 = Meteor.npmRequire('md5');
var fs = Meteor.npmRequire('fs');

var token = Meteor.settings.githubToken;
var userAgent = 'Eoko-Eonews-App',
  user = 'eoko',
  repo = 'blog',
  branch = 'master',
  postDirectory = '_posts';

var github = new GitHubApi({
  version: '3.0.0',
  headers: {
    'user-agent': userAgent
  }
});

var tagStyles = ['calm', 'royal', 'assertive', 'positive', 'balanced', 'energized'];

Meteor.startup(function() {

  var now = new Date;
  var tagMap = initTags();

  var ids = [];
  getPostFiles().forEach(function(item) {
    var record = updateRecord(item);
    ids.push(record._id);
  });

  // Remove old records
  Posts.remove({
    _id: {$nin: ids}
  });

  function initTags() {
    initTagsConfig();
    var map = {};
    tagStyles.forEach(function(style) {
      map[style] = 0;
    });
    Tags.find().fetch().forEach(function(tag) {
      if (tag.style) {
        map[tag.style]++;
      }
    });
    return map;
  }

  function updateRecord(file) {
    var source = sync(function(done) {
      github.gitdata.getBlob({
        user: user,
        repo: repo,
        sha: file.sha
      }, done);
    });
    var content = (new Buffer(source.content, 'base64')).toString();

    //var id = file.path.replace(/\s/g, '_').replace(/\.md$/);
    var id = md5(file.path);
    var record = Posts.findOne(id);
    var newRecord = !record;

    if (newRecord) {
      record = {
        _id: id,
        path: file.path,
        createdAt: new Date()
      };
    }

    var post = renderPost(content);
    record.sha = file.sha;
    record.source = content;
    record.meta = post.meta;
    record.html = post.html;

    record.title = record.meta.title
      || cheerio.load(record.html)('h1').first().text()
      || file.path.replace(/_/g, ' ');

    record.tags = post.meta.tags || post.meta.categories || [];
    record.tags = record.tags.map(tag);

    record.date = record.meta.date
      ? new Date(record.meta.date)
      : record.createdAt;

    record.published = !(post.meta.date && post.meta.date > now);

    if (newRecord) {
      console.log('inserted', record._id);
      Posts.insert(record);
    } else {
      Posts.update(id, record);
      console.log('updated', record._id);
    }

    return record;
  }

  function tag(value) {
    if (typeof value === 'string') {
      var tag = Tags.findOne(value);
      var insert = false;
      var update = false;
      if (!tag) {
        tag = {_id: value};
        insert = true;
      }
      if (!tag.text) {
        tag.text = value;
        update = true;
      }
      if (!tag.style) {
        var style = Object.keys(tagMap).sort(function(left, right) {
          return tagMap[left] - tagMap[right];
        })[0];
        tag.style = style;
        tagMap[style]++;
        update = true;
      }
      if (insert) {
        Tags.insert(tag);
      } else if (update) {
        Tags.update(tag._id, tag);
      }
      console.log('tag', tag);
      return tag;
    }
  }
});

function getPostFiles() {
  var branchHeadRef = sync(function(done) {
    github.gitdata.getReference({
      user: user,
      repo: repo,
      ref: 'heads/' + branch
    }, done);
  });
  //console.log('ref:', branchHeadRef.object.sha);

  var commit = sync(function(done) {
    github.gitdata.getCommit({
      user: user,
      repo: repo,
      sha: branchHeadRef.object.sha
    }, done);
  });
  //console.log('commit:', commit);

  var tree = sync(function(done) {
    github.gitdata.getTree({
      user: user,
      repo: repo,
      sha: commit.tree.sha
    }, done);
  });
  //console.log('tree', JSON.stringify(tree.tree, false, 2));

  var postRef = tree.tree.filter(function(path) {
    return path.path === postDirectory && path.type === 'tree';
  })[0];

  if (postRef) {
    var postTree = sync(function(done) {
      github.gitdata.getTree({
        user: user,
        repo: repo,
        sha: postRef.sha,
        recursive: true
      }, done);
    });
    //console.log('_posts', JSON.stringify(postTree.tree, false, 2));

    return postTree.tree
      .filter(function(item) {
        return item.type === 'blob';
      })
      .map(function(item) {
        return {
          sha: item.sha,
          path: item.path
        };
      });
  } else {
    throw new Error('Could not find posts directory.');
  }
}

var metaRegex = /---([\s\S]*?)\n---([\s\S]*)$/;
function renderPost(source) {
  var match = metaRegex.exec(source);
  var meta, markdown;
  if (match) {
    meta = YAML.safeLoad(match[1]);
    markdown = match[2];
  } else {
    meta = {};
    markdown = source;
  }
  return {
    meta: meta,
    html: marked(markdown)
  };
}

function sync(fn, preventAuth) {
  if (!preventAuth && token) {
    github.authenticate({
      type: 'oauth',
      token: token
    });
  }
  var data = Async.runSync(fn);
  if (data.error) {
    throw data.error;
  } else {
    return data.result;
  }
}

function initTagsConfig() {
  //var doc = YAML.safeLoad(fs.readFileSync(__dirname + '/../../categories-config.yml', 'utf8'));
  //console.log(doc)
}
