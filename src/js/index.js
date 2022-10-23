/* eslint-disable unused-imports/no-unused-imports */
import angular from 'angular';
import { ngSanitize } from 'angular-sanitize';
import { isWebp } from './utils/is-webp.js';

isWebp();

const organizerApp = angular.module('organizerApp', ['ngSanitize']);

organizerApp.component('preloader', {
  templateUrl: 'html/components/preloader.html',
});

export { organizerApp };
