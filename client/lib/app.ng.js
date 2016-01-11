angular.module('eokoApp', [
  'angular-meteor',
  'ionic',
  'angularUtils.directives.dirPagination',
  'ngLodash'
]);

onReady = function() {
  angular.bootstrap(document, ['eokoApp']);
};
  
if(Meteor.isCordova) {
  angular.element(document).on('deviceready', onReady);
} else {
  angular.element(document).ready(onReady);
}
