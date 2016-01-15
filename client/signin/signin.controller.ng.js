'use strict'

angular.module('eokoApp')
  .controller('signinCtrl', function ($scope, $meteor, $state, $ionicPopup, $ionicViewSwitcher, lodash, $user) {

    // Init scope variables
    $scope.viewName = 'signin';
    $scope.mode = 'email';

    $scope.forms = {};
    $scope.master = {};
    $scope.user = {};

    // Attach function to scope
    $scope.reset = function () {
      $scope.user = angular.copy($scope.master);
      $scope.mode = 'email';

      if(typeof $scope.forms.form !== 'undefined') {
        $scope.forms.form.$setPristine();
      }
    };

    $scope.error = function(title, message) {
      $ionicPopup.alert({
        title: title,
        template: message
      });
    };

    $scope.login = function () {
      if (typeof $scope.forms.form.$error == 'undefined' || !lodash.isEmpty($scope.forms.form.$error)) {
        debugger
        $scope.error('Not kewl', 'really not kewl');
      } else {
        $meteor.loginWithPassword($scope.user.username, $scope.user.password, function (error) {
          if (error) {
            $ionicPopup.alert({
              title: 'Forumlaire incorrect',
              template: 'Les informations que vous avez fournies ne sont pas correctes.'
            });
          } else {
            $user.setUser({
              displayName: $scope.user.username
            });
            $ionicViewSwitcher.nextDirection('forward');
            $state.go('live');
          }
        });
      }
    };

    $scope.loginWithGithub = function () {
      $meteor.loginWithGithub({
        requestPermissions: ['user', 'public_repo']
      }, function (err) {
        if (err) {
          $ionicPopup.alert({
            title: 'Identification impossible',
            template: err.reason || 'Raison inconnue'
          });
        } else {
          $state.go('live');
        }
      });
    };

    $scope.loginWithFacebook = function () {
      $meteor.loginWithFacebook({
        requestPermissions: ['read_friendlists', 'user_about_me', 'user_birthday',
          'user_education_history', 'user_friends', 'user_likes', 'user_photos',
          'user_religion_politics', 'user_work_history']
      }, function (error) {
        if (error) {
          $ionicPopup.alert({
            title: 'Identification impossible',
            template: err.reason || 'Raison inconnue'
          });
        } else {
          $state.go('live');
        }
      });
    };

    // Attach listeners
    $scope.$on('$ionicView.beforeLeave', function () {
      $scope.reset();
    });


    $scope.reset();
  });
