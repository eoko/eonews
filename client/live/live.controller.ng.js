angular.module('eokoApp')
  .controller('liveCtrl', function ($scope, $meteor, $reactive, $state,
      $ionicScrollDelegate, $ionicSideMenuDelegate, $user) {
    'use strict'

    $scope.subscribe('posts');
    $scope.subscribe('tags');

    var me = this;
    //$reactive(me).attach($scope);

    $scope.logout = logout;

    $scope.user = $user;

    $scope.page = 1;
    $scope.perPage = 3;
    $scope.sort = {name_sort: 1};
    $scope.orderProperty = '1';

    $scope.tagChecked = {};

    $scope.helpers({
      posts: function() {
        var posts = Posts.find().fetch();
        var tagIds = Object.keys($scope.getReactively('tagChecked', true))
          .filter(function(tagId) {
            return $scope.tagChecked[tagId];
          });
        if (posts.length && tagIds.length) {
          return posts.filter(function(post) {
            return post.tags && tagIds.every(function(tagId) {
                return post.tags.some(function(tag) {
                  return tag._id === tagId;
                });
            });
          });
        }
        return posts;
      },
      tags: function() {return Tags.find();}
    });

    //$scope.$watchCollection('tags', function(tags) {
    //  tags.forEach(function(tag) {
    //    $scope.tagChecked[tag._id] = true;
    //  });
    //});

    //$scope.things = $scope.$meteorCollection(function () {
    //  return Things.find({}, {
    //    sort: $scope.getReactively('sort')
    //  });
    //});

    $scope.$watchCollection('things', function(things) {
      angular.forEach(things, function(thing) {
        if (!thing.tags) {
          thing.tags = [{
            text: "Javascript",
            style: 'calm'
          }, {
            text: "Webapp",
            style: 'royal'
          }, {
            text: "Développement",
            style: 'assertive'
          }];
        }
      })
    });

    $meteor.autorun($scope, function () {
      $scope.$meteorSubscribe('things', {
        limit: parseInt($scope.getReactively('perPage')),
        skip: parseInt(($scope.getReactively('page') - 1) * $scope.getReactively('perPage')),
        sort: $scope.getReactively('sort')
      }, $scope.getReactively('search')).then(function () {
        $scope.thingsCount = $scope.$meteorObject(Counts, 'numberOfThings', false);
      });
    });

    $meteor.session('thingsCounter').bind($scope, 'page');

    $scope.save = function () {
      if ($scope.form.$valid) {
        $scope.things.save($scope.newThing);
        $scope.newThing = undefined;
        $ionicScrollDelegate.resize();
      }
    };

    $scope.remove = function (thing) {
      $scope.things.remove(thing);
      $ionicScrollDelegate.resize();
    };

    $scope.pageChanged = function (newPage) {
      $scope.page = newPage;
    };

    $scope.$watch('orderProperty', function () {
      if ($scope.orderProperty) {
        $scope.sort = {name_sort: parseInt($scope.orderProperty)};
      }
    });

    $scope.toggleLeft = function() {
      $ionicSideMenuDelegate.toggleRight();
    };

    $scope.refreshList = function() {
      debugger
    };

    function logout() {
      $meteor.logout(function() {
        $state.go('main');
      });
    }
  })
;
