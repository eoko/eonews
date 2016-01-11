'use strict';

angular.module('eokoApp')
  .controller('signupCtrl', function ($scope, $meteor, $ionicPopup, $state, $q, lodash) {
    $scope.viewName = 'signup';
    $scope.more = true;

    $scope.showAlert = function () {
      $ionicPopup.alert({
        title: 'Forumlaire incorrect',
        template: 'Les informations que vous nous avez fournis ne sont pas correct.'
      });
    };

    $scope.master = {};
    $scope.user = {};

    $scope.reset = function () {
      $scope.user = angular.copy($scope.master);

      if (lodash.isObject($scope.form)) {
        $scope.form.$setPristine();
        $scope.form.$setUntouched();
      }
    };

    $scope.reset();

    $scope.createUser = function () {
      console.log($scope.form);
      if ($scope.form.$valid) {
        Accounts.createUser($scope.user, function (e) {
          if (!e) {
            $scope.reset();
            $state.go('live');
          } else {
            $ionicPopup.alert({title: 'Erreur', template: e.reason});
          }
        })
      }
      if (!$scope.form.$valid) {
        $scope.showAlert();
      }
    }

  });