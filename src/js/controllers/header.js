import { organizerApp } from '../index.js';

organizerApp.controller('headerController', ($scope) => {
  $scope.currentDate = null;

  $scope.setCurrentDate = () => {
    const currentDate = new Date();

    $scope.currentDate = currentDate.toLocaleDateString('en-US', {
      weekday: 'long',
    });
  };
});
