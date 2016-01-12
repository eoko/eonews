'use strict'

angular.module('eokoApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('live', {
        url: '/live',
        templateUrl: 'client/live/live.view.html',
        controller: 'liveCtrl',
        data: {
          navbar: true
        },
        resolve: {
          currentUser: function($q) {
            if (Meteor.userId() == null) {
              return $q.reject();
            } else {
              return $q.resolve();
            }
          }
        }
      })
    ;
  })
;
