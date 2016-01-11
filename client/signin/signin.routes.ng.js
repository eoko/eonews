'use strict'

angular.module('eokoApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('signin', {
        url: '/signin',
        templateUrl: 'client/signin/signin.view.html',
        controller: 'signinCtrl',
      });
  });