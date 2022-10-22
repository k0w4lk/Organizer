/* eslint-disable unused-imports/no-unused-imports */
import angular from 'angular';
import { ngSanitize } from 'angular-sanitize';
import { isWebp } from './utils/is-webp.js';

isWebp();

const organizerApp = angular.module('organizerApp', ['ngSanitize']);

export { organizerApp };
