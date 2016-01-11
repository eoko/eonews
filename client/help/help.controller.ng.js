'use strict'

angular.module('eokoApp')
  .controller('helpCtrl', function ($scope, $ionicModal) {
    $scope.viewName = 'help';

    $scope.helps = [
      {
        title: "J'ai oublié mon mot de passef ezdfze f ezf ez fez f zef ze fze",
        description: "wololow"
      },
      {
        title: "J'ai oublié mon mot de passe",
        description: "xxxx"
      },
      {
        title: "J'ai oublié mon mot de passe y",
        description: "wololow"
      }
    ];

    $scope.help = {
      title: null,
      description: null
    };

    $ionicModal.fromTemplateUrl('my-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });

    $scope.closeHelp = function() {
      $scope.modal.hide();
    };

    $scope.openHelp = function (id) {
      $scope.help = $scope.helps[id];
      $scope.modal.show();
    }
  });