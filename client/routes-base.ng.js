angular.module('eokoApp')
  .config(function ($urlRouterProvider, $locationProvider) {
    'use strict';
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/');
  })
  .run(['$rootScope', '$state', function ($rootScope, $state) {
    'use strict';
    $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
      switch (error) {
        case 'AUTH_REQUIRED':
        case 'FORBIDDEN':
        case 'UNAUTHORIZED':
          $state.go('main');
          break;
      }
    });
    //$rootScope.$on("$stateChangeStart", function(event, toState, toStateParams) {
    //  var logged = [
    //    '/live',
    //    '/profile'
    //  ];
    //
    //  debugger
    //
    //  if (Meteor.userId() != null && logged.indexOf(toState.url)) {
    //    event.preventDefault(); // stop current execution
    //    $state.go('live');
    //  }
    //});
  }])
;
