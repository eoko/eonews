angular.module('eokoApp')
  /**
   * Toggle class 'bar-positive' according to $rootScope.isContent.
   *
   * This cannot be done with ng-class because ionic propagate the ion-nav-bar
   * class to its ion-header-bar children (and does not watch for changes).
   */
  .directive('barPositiveContent', function() {
    'use strict';
    return {
      controller: function($rootScope, $element) {
        $rootScope.$watch('isContent', function(value) {
          $element.find('ion-header-bar').toggleClass('bar-positive', value);
        });
      }
    }
  })
;
