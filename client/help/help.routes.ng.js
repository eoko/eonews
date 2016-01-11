'use strict'

angular.module('eokoApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('help', {
        url: '/help',
        templateUrl: 'client/help/help.view.html',
        controller: 'helpCtrl'
      });
  });