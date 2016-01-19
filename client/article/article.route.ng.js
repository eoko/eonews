angular.module('eokoApp')
  .config(function ($stateProvider) {
    'use strict';
    $stateProvider.state('article', {
      url: '/article/{id}',
      templateUrl: 'client/article/article.view.html',
      controller: function($stateParams, $scope, $meteor) {
        'use strict';

        $scope.subscribe('posts');

        $scope.username = Meteor.user().username;

        $scope.helpers({
          article: function() {
            var post = Posts.findOne($stateParams.id);
            if (post) {
              $meteor.call('markPostRead', post);
            }
            return post;
          }
        });

        $scope.$watch('article', function(article) {
          console.log(article, $scope.article === article);
        }, true);
      }
    });
  })
;
