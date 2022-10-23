import angular from 'angular';
import 'angular-route';
import 'angular-sanitize';

const appModule = angular.module('organizerApp', ['ngSanitize', 'ngRoute']);

appModule.run(($document) => {
  (function isWebp() {
    function testWebP(callback) {
      const webP = new Image();
      const onEvent = () => {
        callback(webP.height === 2);
      };
      webP.onload = onEvent;
      webP.onerror = onEvent;
      // eslint-disable-next-line operator-linebreak
      webP.src =
        'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
    }

    testWebP((support) => {
      const className = support === true ? 'webp' : 'no-webp';

      $document.find('html').addClass(className);
    });
  })();
});
