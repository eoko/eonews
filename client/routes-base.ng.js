'use strict';

angular.module('eokoApp')

  .config(function ($urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/');
  }).run(['$rootScope', '$state', function ($rootScope, $state) {
    $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
      switch (error) {
        case 'AUTH_REQUIRED':
        case 'FORBIDDEN':
        case 'UNAUTHORIZED':
          $state.go('main');
          break;
      }
    });

    $rootScope.$on("$stateChangeStart", function (event, next, current) {
      var logged = ['/live', '/profile'];

      if (Meteor.userId() != null && logged.indexOf(next.url)) {
        event.preventDefault(); // stop current execution
        $state.go('live');
      }
    });
  }]);
