angular.module('eokoApp')
  .config(function($ionicConfigProvider) {
    $ionicConfigProvider.views.maxCache(0);
  })
  .run(function($rootScope, $state) {
    // Always start on home page (or history may be broken,
    // making it impossible to go back to main...)
    if (Meteor.userId()) {
      $state.go('live', {}, {location: 'replace'});
    } else {
      $state.go('main', {}, {location: 'replace'});
    }

    $rootScope.$on('$stateChangeSuccess', function(event, toState) {
      $rootScope.hideHelp = ['article', 'help'].indexOf(toState.name) !== -1;
      $rootScope.isContent = ['live', 'article'].indexOf(toState.name) !== -1;
    });
  })
;
