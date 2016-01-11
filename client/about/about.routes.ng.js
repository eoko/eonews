'use strict'

angular.module('eokoApp')
.config(function($stateProvider) {
  $stateProvider
  .state('about', {
    url: '/about',
    templateUrl: 'client/about/about.view.html',
    controller: 'AboutCtrl'
  });
});