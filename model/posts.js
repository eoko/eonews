Posts = new Mongo.Collection('posts');

Tags = new Mongo.Collection('tags');

UserPostData = new Mongo.Collection('user-post-data');

UserPostData.allow({
  insert: function(userId, doc) {
    return userId && doc.userId === userId;
  },
  update: function(userId, doc) {
    return doc.userId === userId;
  },
  remove: function(userId, doc) {
    return doc.userId === userId;
  },
  fetch: ['userId']
});

Meteor.methods({
  markPostRead: function(post) {
    UserPostData.upsert({
      userId: Meteor.userId(),
      postId: post._id
    }, {
      $set: {
        read: post.updatedAt || post.createdAt
      }
    });
  }
});
