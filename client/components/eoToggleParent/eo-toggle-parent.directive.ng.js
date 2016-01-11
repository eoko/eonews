'use strict';

angular.module('eokoApp')
  .directive('eoToggleParent', function() {
    return {
      restrict: 'A',
      link: function(scope, elem, attrs) {
        elem.bind('focus',function() {
          elem.parent().addClass(attrs.eoToggleParent);
        });
        elem.bind('blur',function() {
          elem.parent().removeClass(attrs.eoToggleParent);
        });
      }
    };
  });