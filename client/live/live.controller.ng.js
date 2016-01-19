angular.module('eokoApp')
  .controller('liveCtrl', function ($scope, $meteor, $reactive, $state,
      $ionicScrollDelegate, $ionicSideMenuDelegate, $timeout) {
    'use strict'

    $scope.subscribe('posts');

    $scope.logout = logout;
    $scope.toggleUserMenu = toggleUserMenu;
    $scope.isRead = isRead;
    $scope.isUpdated = isUpdated;

    $scope.anonymous = !Meteor.userId();

    $scope.page = 1;
    $scope.perPage = 3;
    $scope.sort = {name_sort: 1};
    $scope.orderProperty = '1';

    $scope.tagChecked = {};

    $scope.stats = null; // {total:..., read:...}

    var firstLoad = true;
    $scope.helpers({
      user: function() {
        return Meteor.user();
      },
      postCollection: function() {
        return Posts.find();
      },
      tags: function() {
        return Tags.find();
      },
      // "loaded" posts (i.e. not new)
      loadedPosts: function() {
        var posts = $scope.getReactively('postCollection');
        if (firstLoad && posts.length) {
          firstLoad = false;
          posts.forEach(function(post) {
            post._loaded = true;
          });
          return posts;
        } else {
          return posts.filter(function(post) {
            return post._loaded;
          });
        }
      },
      // displayed posts
      posts: function() {
        var posts = angular.copy(
          $scope.getReactively('loadedPosts')
        );
        var tagIds = Object.keys($scope.getReactively('tagChecked', true))
          .filter(function(tag) {
            return $scope.tagChecked[tag];
          });
        if (posts && posts.length) {
          // category filters
          if (posts.length && tagIds.length) {
            return posts.filter(function(post) {
              return post.tags && tagIds.some(function(tagId) {
                  return post.tags.some(function(tag) {
                    return tag._id === tagId;
                  });
                });
            });
          }
        }
        return posts;
      },
      unloadedPostsCount: function() {
        var col = $scope.getReactively('postCollection');
        var posts = $scope.getReactively('loadedPosts');
        console.log(col, posts, col.length - posts.length)
        return col.length - posts.length;
      },
      stats: function() {
        var posts = $scope.getReactively('posts');
        return {
          total: posts.length,
          read: posts.reduce(function(sum, post) {
            return sum + (isRead(post) ? 1 : 0);
          }, 0)
        }
      }
    });

    //$scope.$watchCollection('posts', function(posts) {
    //  // stats
    //  $scope.stats = {
    //    total: posts.length,
    //    read: posts.reduce(function(sum, post) {
    //      return sum + (isRead(post) ? 1 : 0);
    //    }, 0)
    //  };
    //});

    $scope.refreshList = function() {
      $scope.$broadcast('scroll.refreshComplete');
      // delay because the reload indicator sticks a bit longer
      // that it should
      $timeout(function() {
        if ($scope.postCollection) {
          $scope.postCollection.forEach(function(post) {
            post._loaded = true;
          });
        }
      }, 200);
    };

    function logout() {
      $meteor.logout(function() {
        $state.go('main');
      });
    }

    function toggleUserMenu() {
      $ionicSideMenuDelegate.toggleLeft();
    }

    function isRead(post) {
      if (Meteor.userId()) {
        var userData = UserPostData.findOne({postId: post._id});
        return userData && userData.read;
      } else {
        return true;
      }
    }

    function isUpdated(post) {
      if (Meteor.userId()) {
        var userData;
        return post.updatedDate
          && (userData = UserPostData.findOne({postId: post._id}))
          && userData.read
          && userData.read < post.updatedDate;
      } else {
        return false;
      }
    }
  })
;
