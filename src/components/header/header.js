import angular from 'angular';

const appModule = angular.module('organizerApp');

appModule.component('appHeader', {
  templateUrl: 'components/header/appHeader.html',
});

appModule.controller('headerController', ($scope) => {
  $scope.currentDate = null;

  $scope.setCurrentDate = () => {
    const currentDate = new Date();

    $scope.currentDate = currentDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
    });
  };
});

appModule.controller('quotesController', ($scope, $http) => {
  $scope.quoteOfTheDay = null;

  $http({ method: 'GET', url: 'https://quotes.rest/qod' }).then((response) => {
    const quoteRawData = response.data.contents.quotes.at(0);

    const quoteData = {
      title: quoteRawData.title,
      author: quoteRawData.author,
      text: quoteRawData.quote,
      background: quoteRawData.background,
    };

    $scope.quoteOfTheDay = quoteData;

    $scope.setBackground();
  });

  $scope.setBackground = () => {
    const headerElement = angular.element(
      document.getElementById('app-header'),
    );

    headerElement.css(
      'background',
      `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), center / cover no-repeat url('${$scope.quoteOfTheDay.background}')`,
    );
  };
});
