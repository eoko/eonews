'use strict';

Meteor.publish('posts', function() {
  return [
    Posts.find({
      published: true
    }),
    Tags.find(),
    UserPostData.find({
      userId: this.userId
    })
  ];
});

Meteor.publish('tags', function() {
  return Tags.find();
});

//Meteor.publish('user-post-data', function() {
//  return UserPostData.find({
//    userId: this.userId
//  });
//});
