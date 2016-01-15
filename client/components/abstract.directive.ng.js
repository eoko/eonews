angular.module('eokoApp')
  .filter('abstract', function() {
    return function(input) {
      return angular.element(input.html).text().substr(0,140);
    };
  })
;
