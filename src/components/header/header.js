import angular from 'angular';

const appModule = angular.module('organizerApp');

appModule.controller('headerController', ($scope) => {
  $scope.currentDate = null;

  $scope.setCurrentDate = () => {
    const currentDate = new Date();

    $scope.currentDate = currentDate.toLocaleDateString('en-US', {
      weekday: 'long',
    });
  };
});

appModule.component('appHeader', {
  templateUrl: 'components/header/appHeader.html',
});
