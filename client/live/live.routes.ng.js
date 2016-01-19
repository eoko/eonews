'use strict'

angular.module('eokoApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('live', {
        url: '/live',
        templateUrl: 'client/live/live.view.html',
        controller: 'liveCtrl'
      })
    ;
  })
;
