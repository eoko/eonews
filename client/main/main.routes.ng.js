'use strict'

angular.module('eokoApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'client/main/main.view.html',
        controller: 'MainCtrl'
      });
  });