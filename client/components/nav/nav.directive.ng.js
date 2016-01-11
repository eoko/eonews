'use strict'

angular.module('eokoApp')
.directive('nav', function($state) {
  return {
    restrict: 'AE',
    templateUrl: 'client/components/nav/nav.view.html',
    replace: true,
    link: function(scope, elem, attrs) {
      scope.getState = function() {
        return $state.current.name;
      };
    }
  };
});