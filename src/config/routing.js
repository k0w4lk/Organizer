import angular from 'angular';

const appModule = angular.module('organizerApp');

appModule.config(($routeProvider, $locationProvider) => {
  $locationProvider.html5Mode(true);

  $routeProvider.when('/', {
    templateUrl: 'components/quote-of-the-day/appQuoteOfTheDay.html',
  });

  $routeProvider.when('/todo', {
    templateUrl: 'components/todo/appTodo.html',
  });

  $routeProvider.otherwise({ redirectTo: '/' });
});
