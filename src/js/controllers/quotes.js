import angular from 'angular';
import { organizerApp } from '../index.js';

organizerApp.controller('quotesController', ($scope, $http) => {
  $scope.quoteOfTheDay = null;

  $http({ method: 'GET', url: 'https://quotes.rest/qod' }).then((response) => {
    const quoteRawData = response.data.contents.quotes.at(0);

    const quoteData = {
      title: quoteRawData.title,
      author: quoteRawData.author,
      text: quoteRawData.quote,
    };

    $scope.quoteOfTheDay = quoteData;
  });

  $scope.setBackground = () => {
    const quoteOfTheDayElement = angular.element(
      document.getElementById('quoteOfTheDay'),
    );

    quoteOfTheDayElement.css(
      'background-image',
      $scope.quoteOfTheDay?.background,
    );
  };
});
