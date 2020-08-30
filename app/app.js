'use strict';
angular.lowercase = text => text.toLowerCase();

agGrid.initialiseAgGridWithAngular1(angular);

// Declare app level module which depends on views, and core components
angular.module('myApp', [
  'ngMaterial',
  'agGrid',
  'textAngular',
  'myApp.students'
]).
  config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    angular.lowercase = angular.$$lowercase;
    $locationProvider.hashPrefix('!');

    $routeProvider.otherwise({ redirectTo: '/students' });
  }])
  .config(function ($mdThemingProvider) {
    $mdThemingProvider.theme('light green');
  });;
