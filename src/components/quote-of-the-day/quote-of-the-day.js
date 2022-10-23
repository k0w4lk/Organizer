import angular from 'angular';

const appModule = angular.module('organizerApp');

appModule.component('appQuoteOfTheDay', {
  templateUrl: 'components/quote-of-the-day/appQuoteOfTheDay.html',
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
    const quoteOfTheDayElement = angular.element(
      document.getElementById('quoteOfTheDay'),
    );

    quoteOfTheDayElement.css(
      'background-image',
      `url('${$scope.quoteOfTheDay.background}')`,
    );
  };
});
