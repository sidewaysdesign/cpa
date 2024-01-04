/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _css_style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../css/style.scss */ "./css/style.scss");
/* harmony import */ var _modules_PersonnelPopup__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/PersonnelPopup */ "./src/modules/PersonnelPopup.js");
/* harmony import */ var _modules_ComboboxExpander__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/ComboboxExpander */ "./src/modules/ComboboxExpander.js");



// import { SinglePopup } from './modules/SinglePopup'
// import { ConstructPopup } from './modules/ConstructPopup'
// import { AwardsVideoLoader } from './modules/AwardsVideoLoader'

// import { MobileAccordionSections } from './modules/MobileAccordionSections'
// import { MobileMenu } from './modules/MobileMenu'

const onReady = () => {
  if (location.hostname === 'localhost' || location.hostname.includes('ohja-update.local')) {
    document.body.classList.add('localhost');
  }
  var personnelPopup = new _modules_PersonnelPopup__WEBPACK_IMPORTED_MODULE_1__.PersonnelPopup([{
    popupSelector: '.personnelcard--wrapper',
    targetAttribute: 'data-popup',
    activeClass: 'active',
    removeClass: 'fadeout',
    closeButtonClass: 'personnelpopup--closex'
  }]);
  var comboboxExpander = new _modules_ComboboxExpander__WEBPACK_IMPORTED_MODULE_2__.ComboboxExpander([{
    targetSelector: '.wp-block-details.is-style-popup-menu'
  }]);
  // var constructPopup = new ConstructPopup([{ triggerSelector: '.youtube-popup' }])
  // var awardsVideoLoader = new AwardsVideoLoader([{ targetSelector: '#videoContainer' }])
};
if (document.readyState !== 'loading') {
  onReady();
} else {
  document.addEventListener('DOMContentLoaded', onReady);
}

/***/ }),

/***/ "./src/modules/ComboboxExpander.js":
/*!*****************************************!*\
  !*** ./src/modules/ComboboxExpander.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ComboboxExpander: () => (/* binding */ ComboboxExpander)
/* harmony export */ });
// .wp-block-details.is-style-popup-menu

class ComboboxExpander {
  constructor(params) {
    this.events(params);
  }
  events(params) {
    const paramsArray = [].concat(params);
    paramsArray.forEach(p => this.initModule(p));
  }
  createObserver(target, summaryElement) {
    return new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'open') {
          if (target.hasAttribute('open')) {
            target.style.maxHeight = `${summaryElement.offsetHeight}px`;
            target.style.overflow = 'visible';
            summaryElement.setAttribute('aria-expanded', 'true'); // Update aria-expanded when 'open' is present
          } else {
            target.style.maxHeight = '';
            target.style.overflow = '';
            summaryElement.setAttribute('aria-expanded', 'false'); // Update aria-expanded when 'open' is not present
          }
        }
      });
    });
  }
  initModule({
    targetSelector
  }) {
    const targetElements = document.querySelectorAll(targetSelector);
    targetElements.forEach(target => {
      const summaryElement = target.querySelector('summary');
      if (!summaryElement) return;
      summaryElement.setAttribute('aria-haspopup', 'true');
      summaryElement.setAttribute('aria-controls', 'yourMenuId'); // replace 'yourMenuId' with the actual ID of your menu
      summaryElement.setAttribute('aria-expanded', 'false');

      // Create a MutationObserver instance
      const observer = this.createObserver(target, summaryElement);

      // Start observing the target node for configured mutations
      observer.observe(target, {
        attributes: true
      });

      // Handle click outside the target element
      document.addEventListener('click', event => {
        if (!target.contains(event.target) && target.hasAttribute('open')) {
          target.removeAttribute('open');
        }
      });
      // Function to handle keydown events
      function handleKeydown(event) {
        if (event.key === 'Escape' || event.key === 'Esc' || event.keyCode === 27) {
          if (target.hasAttribute('open')) {
            target.removeAttribute('open');
          }
        }
      }

      // Add keydown listener when the target receives focus
      target.addEventListener('focus', () => {
        target.addEventListener('keydown', handleKeydown);
      });

      // Remove keydown listener when the target loses focus
      target.addEventListener('blur', () => {
        target.removeEventListener('keydown', handleKeydown);
      });
    });
  }
}


/***/ }),

/***/ "./src/modules/PersonnelPopup.js":
/*!***************************************!*\
  !*** ./src/modules/PersonnelPopup.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PersonnelPopup: () => (/* binding */ PersonnelPopup)
/* harmony export */ });
class PersonnelPopup {
  constructor(params) {
    this.events(params);
  }
  events(params) {
    const paramsArray = [].concat(params);
    paramsArray.forEach(p => this.popupInit(p));
  }
  popupInit({
    popupSelector = '',
    targetAttribute,
    appearClass = 'fadein',
    activeClass = 'active',
    removeClass = 'fadeout',
    closeButtonClass = 'closex',
    delay = 750
  }) {
    const popupWrappers = document.querySelectorAll(popupSelector);
    if (!popupSelector || !popupWrappers.length) {
      return;
    }
    popupWrappers.forEach(popupWrapper => {
      const triggers = popupWrapper.querySelectorAll(`[${targetAttribute}]`);
      triggers.forEach(trigger => {
        const targetId = trigger.getAttribute(targetAttribute);
        const origPopup = document.getElementById(targetId);
        if (origPopup) {
          trigger.addEventListener('click', e => {
            e.preventDefault();
            this.clonePanel(origPopup, activeClass, closeButtonClass, delay);
          });
        }
      });
    });
  }
  clonePanel(panel, activeClass, closeButtonClass, delay) {
    const newPanel = panel.cloneNode(true);
    document.body.appendChild(newPanel);
    this.appearPanel(newPanel, activeClass, closeButtonClass, delay);
  }
  appearPanel(panel, activeClass, closeButtonClass, delay) {
    panel.style.removeProperty('display');
    panel.setAttribute('aria-hidden', 'false'); // panel is visible

    const closex = panel.querySelector(`.${closeButtonClass}`);
    const closeBg = this.initCloseBg();
    panel.prepend(closeBg);
    closeBg.addEventListener('click', e => this.removePanel(panel, activeClass, delay));
    closex.addEventListener('click', e => this.removePanel(panel, activeClass, delay));
    window.addEventListener('keydown', this.handleKeypress(panel, activeClass, delay), false);
    setTimeout(() => {
      panel.classList.add(activeClass);
    }, 1);
  }
  initCloseBg() {
    const co = document.createElement('div');
    co.style.cssText = 'background-color:transparent; position:absolute; top:0; left:0; width:100%; height:100%;';
    co.setAttribute('aria-hidden', 'true');
    co.setAttribute('tabindex', '-1');
    return co;
  }
  removePanel(panel, activeClass, delay) {
    panel.classList.remove(activeClass);
    panel.setAttribute('aria-hidden', 'true'); // panel is hidden

    setTimeout(() => panel.remove(), delay);
    window.removeEventListener('keydown', this.handleKeypress);
  }
  handleKeypress(panel, activeClass, delay) {
    return function (e) {
      if (e.key === 'Escape') this.removePanel(panel, activeClass, delay);
    }.bind(this);
  }
}


/***/ }),

/***/ "./css/style.scss":
/*!************************!*\
  !*** ./css/style.scss ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


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
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"index": 0,
/******/ 			"./style-index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = globalThis["webpackChunkcpa_theme"] = globalThis["webpackChunkcpa_theme"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["./style-index"], () => (__webpack_require__("./src/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map