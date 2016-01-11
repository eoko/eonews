'use strict'

angular.module('eokoApp')
  .controller('liveCtrl', function ($scope, $meteor, $state, $ionicScrollDelegate, $ionicSideMenuDelegate) {
    $scope.page = 1;
    $scope.perPage = 3;
    $scope.sort = {name_sort: 1};
    $scope.orderProperty = '1';

    $scope.logout = function() {
      $meteor.logout(function() {
        $state.go('main');
      });
    };

    $scope.things = $scope.$meteorCollection(function () {
      return Things.find({}, {sort: $scope.getReactively('sort')});
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
  });