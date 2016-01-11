'use strict'

angular.module('eokoApp')
.config(function($stateProvider) {
  $stateProvider
  .state('signup', {
    url: '/signup',
    templateUrl: 'client/signup/signup.view.html',
    controller: 'signupCtrl'
  });
});