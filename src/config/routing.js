import angular from 'angular';

const appModule = angular.module('organizerApp');

appModule.config(($routeProvider, $locationProvider) => {
  $routeProvider.when('/todo', {
    templateUrl: 'components/todo/appTodo.html',
  });

  $routeProvider.when('/calendar', {
    templateUrl: 'components/calendar/appCalendar.html',
  });

  $routeProvider.otherwise({ redirectTo: '/' });

  $locationProvider.html5Mode(true);
});
