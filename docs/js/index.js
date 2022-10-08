/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils_is_webp_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/is-webp.js */ \"./src/js/utils/is-webp.js\");\n/* harmony import */ var _utils_translation_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/translation.js */ \"./src/js/utils/translation.js\");\n\n\n\n(0,_utils_is_webp_js__WEBPACK_IMPORTED_MODULE_0__.isWebp)();\n(0,_utils_translation_js__WEBPACK_IMPORTED_MODULE_1__.setTranslations)();\n\n\n//# sourceURL=webpack://gulp-package/./src/js/index.js?");

/***/ }),

/***/ "./src/js/utils/is-webp.js":
/*!*********************************!*\
  !*** ./src/js/utils/is-webp.js ***!
  \*********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"isWebp\": () => (/* binding */ isWebp)\n/* harmony export */ });\nfunction isWebp() {\n  function testWebP(callback) {\n    const webP = new Image();\n    const onEvent = () => {\n      callback(webP.height === 2);\n    };\n    webP.onload = onEvent;\n    webP.onerror = onEvent;\n    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';\n  }\n\n  testWebP((support) => {\n    const className = support === true ? 'webp' : 'no-webp';\n    document.documentElement.classList.add(className);\n  });\n}\n\n\n//# sourceURL=webpack://gulp-package/./src/js/utils/is-webp.js?");

/***/ }),

/***/ "./src/js/utils/translation.js":
/*!*************************************!*\
  !*** ./src/js/utils/translation.js ***!
  \*************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"changeLanguage\": () => (/* binding */ changeLanguage),\n/* harmony export */   \"setTranslations\": () => (/* binding */ setTranslations)\n/* harmony export */ });\nconst LANG_ATTRIBUTE = 'lang';\n\nconst translationNodes = document.querySelectorAll('[data-translate]');\n\nlet translationData;\n\nfunction fillTranslationNodes(data, language) {\n  translationNodes.forEach((item) => {\n    const key = item.dataset.translate;\n\n    item.innerHTML = data[key][language];\n  });\n}\n\nfunction setTranslations() {\n  const initLanguage = document.documentElement.getAttribute(LANG_ATTRIBUTE);\n\n  fetch('../assets/translations.json')\n    .then((res) => res.json())\n    .then((data) => {\n      translationData = data;\n      fillTranslationNodes(translationData, initLanguage);\n    });\n}\n\nfunction changeLanguage(language) {\n  document.documentElement.setAttribute(LANG_ATTRIBUTE, language);\n  fillTranslationNodes(translationData, language);\n}\n\n\n//# sourceURL=webpack://gulp-package/./src/js/utils/translation.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/js/index.js");
/******/ 	
/******/ })()
;