(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["styles"],{

/***/ 2:
/*!******************************!*\
  !*** multi ./src/styles.css ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/runner/work/cvVincentAgular/cvVincentAgular/src/styles.css */"OmL/");


/***/ }),

/***/ "JPst":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring

  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || '').concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
  return "/*# ".concat(data, " */");
}

/***/ }),

/***/ "LboF":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : undefined;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && btoa) {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "OmL/":
/*!************************!*\
  !*** ./src/styles.css ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "LboF");
            var content = __webpack_require__(/*! !../node_modules/css-loader/dist/cjs.js??ref--12-1!../node_modules/postcss-loader/src??embedded!./styles.css */ "W9N5");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ "W9N5":
/*!*********************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--12-1!./node_modules/postcss-loader/src??embedded!./src/styles.css ***!
  \*********************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "JPst");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(true);
// Module
___CSS_LOADER_EXPORT___.push([module.i, "/* You can add global styles to this file, and also import other style files */\n\n/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */\n\n/* Document\n   ========================================================================== */\n\n/**\n * 1. Correct the line height in all browsers.\n * 2. Prevent adjustments of font size after orientation changes in iOS.\n */\n\nhtml {\n  line-height: 1.15; /* 1 */\n  -webkit-text-size-adjust: 100%; /* 2 */\n}\n\n/* Sections\n   ========================================================================== */\n\n/**\n * Remove the margin in all browsers.\n */\n\nbody {\n  margin: 0;\n}\n\n/**\n * Render the `main` element consistently in IE.\n */\n\nmain {\n  display: block;\n}\n\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\n/* Grouping content\n   ========================================================================== */\n\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\n\nhr {\n  box-sizing: content-box; /* 1 */\n  height: 0; /* 1 */\n  overflow: visible; /* 2 */\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\npre {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/* Text-level semantics\n   ========================================================================== */\n\n/**\n * Remove the gray background on active links in IE 10.\n */\n\na {\n  background-color: transparent;\n}\n\n/**\n * 1. Remove the bottom border in Chrome 57-\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\n\nabbr[title] {\n  border-bottom: none; /* 1 */\n  text-decoration: underline; /* 2 */\n  -webkit-text-decoration: underline dotted;\n          text-decoration: underline dotted; /* 2 */\n}\n\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\n\nb,\nstrong {\n  font-weight: bolder;\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\ncode,\nkbd,\nsamp {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/**\n * Add the correct font size in all browsers.\n */\n\nsmall {\n  font-size: 80%;\n}\n\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nsup {\n  top: -0.5em;\n}\n\n/* Embedded content\n   ========================================================================== */\n\n/**\n * Remove the border on images inside links in IE 10.\n */\n\nimg {\n  border-style: none;\n}\n\n/* Forms\n   ========================================================================== */\n\n/**\n * 1. Change the font styles in all browsers.\n * 2. Remove the margin in Firefox and Safari.\n */\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: inherit; /* 1 */\n  font-size: 100%; /* 1 */\n  line-height: 1.15; /* 1 */\n  margin: 0; /* 2 */\n}\n\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\n\nbutton,\ninput { /* 1 */\n  overflow: visible;\n}\n\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\n\nbutton,\nselect { /* 1 */\n  text-transform: none;\n}\n\n/**\n * Correct the inability to style clickable types in iOS and Safari.\n */\n\nbutton,\n[type=\"button\"],\n[type=\"reset\"],\n[type=\"submit\"] {\n  -webkit-appearance: button;\n}\n\n/**\n * Remove the inner border and padding in Firefox.\n */\n\nbutton::-moz-focus-inner,\n[type=\"button\"]::-moz-focus-inner,\n[type=\"reset\"]::-moz-focus-inner,\n[type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0;\n}\n\n/**\n * Restore the focus styles unset by the previous rule.\n */\n\nbutton:-moz-focusring,\n[type=\"button\"]:-moz-focusring,\n[type=\"reset\"]:-moz-focusring,\n[type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n\n/**\n * Correct the padding in Firefox.\n */\n\nfieldset {\n  padding: 0.35em 0.75em 0.625em;\n}\n\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\n\nlegend {\n  box-sizing: border-box; /* 1 */\n  color: inherit; /* 2 */\n  display: table; /* 1 */\n  max-width: 100%; /* 1 */\n  padding: 0; /* 3 */\n  white-space: normal; /* 1 */\n}\n\n/**\n * Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\n\nprogress {\n  vertical-align: baseline;\n}\n\n/**\n * Remove the default vertical scrollbar in IE 10+.\n */\n\ntextarea {\n  overflow: auto;\n}\n\n/**\n * 1. Add the correct box sizing in IE 10.\n * 2. Remove the padding in IE 10.\n */\n\n[type=\"checkbox\"],\n[type=\"radio\"] {\n  box-sizing: border-box; /* 1 */\n  padding: 0; /* 2 */\n}\n\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n\n[type=\"number\"]::-webkit-inner-spin-button,\n[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n\n[type=\"search\"] {\n  -webkit-appearance: textfield; /* 1 */\n  outline-offset: -2px; /* 2 */\n}\n\n/**\n * Remove the inner padding in Chrome and Safari on macOS.\n */\n\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n\n::-webkit-file-upload-button {\n  -webkit-appearance: button; /* 1 */\n  font: inherit; /* 2 */\n}\n\n/* Interactive\n   ========================================================================== */\n\n/*\n * Add the correct display in Edge, IE 10+, and Firefox.\n */\n\ndetails {\n  display: block;\n}\n\n/*\n * Add the correct display in all browsers.\n */\n\nsummary {\n  display: list-item;\n}\n\n/* Misc\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 10+.\n */\n\ntemplate {\n  display: none;\n}\n\n/**\n * Add the correct display in IE 10.\n */\n\n[hidden] {\n  display: none;\n}\n\n/**\n * Manually forked from SUIT CSS Base: https://github.com/suitcss/base\n * A thin layer on top of normalize.css that provides a starting point more\n * suitable for web applications.\n */\n\n/**\n * Removes the default spacing and border for appropriate elements.\n */\n\nblockquote,\ndl,\ndd,\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\nhr,\nfigure,\np,\npre {\n  margin: 0;\n}\n\nbutton {\n  background-color: transparent;\n  background-image: none;\n}\n\n/**\n * Work around a Firefox/IE bug where the transparent `button` background\n * results in a loss of the default `button` focus styles.\n */\n\nbutton:focus {\n  outline: 1px dotted;\n  outline: 5px auto -webkit-focus-ring-color;\n}\n\nfieldset {\n  margin: 0;\n  padding: 0;\n}\n\nol,\nul {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n}\n\n/**\n * Tailwind custom reset styles\n */\n\n/**\n * 1. Use the user's configured `sans` font-family (with Tailwind's default\n *    sans-serif font stack as a fallback) as a sane default.\n * 2. Use Tailwind's default \"normal\" line-height so the user isn't forced\n *    to override it to ensure consistency even when using the default theme.\n */\n\nhtml {\n  font-family: system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\"; /* 1 */\n  line-height: 1.5; /* 2 */\n}\n\n/**\n * 1. Prevent padding and border from affecting element width.\n *\n *    We used to set this in the html element and inherit from\n *    the parent element for everything else. This caused issues\n *    in shadow-dom-enhanced elements like <details> where the content\n *    is wrapped by a div with box-sizing set to `content-box`.\n *\n *    https://github.com/mozdevs/cssremedy/issues/4\n *\n *\n * 2. Allow adding a border to an element by just adding a border-width.\n *\n *    By default, the way the browser specifies that an element should have no\n *    border is by setting it's border-style to `none` in the user-agent\n *    stylesheet.\n *\n *    In order to easily add borders to elements by just setting the `border-width`\n *    property, we change the default border-style for all elements to `solid`, and\n *    use border-width to hide them instead. This way our `border` utilities only\n *    need to set the `border-width` property instead of the entire `border`\n *    shorthand, making our border utilities much more straightforward to compose.\n *\n *    https://github.com/tailwindcss/tailwindcss/pull/116\n */\n\n*,\n::before,\n::after {\n  box-sizing: border-box; /* 1 */\n  border-width: 0; /* 2 */\n  border-style: solid; /* 2 */\n  border-color: #e2e8f0; /* 2 */\n}\n\n/*\n * Ensure horizontal rules are visible by default\n */\n\nhr {\n  border-top-width: 1px;\n}\n\n/**\n * Undo the `border-style: none` reset that Normalize applies to images so that\n * our `border-{width}` utilities have the expected effect.\n *\n * The Normalize reset is unnecessary for us since we default the border-width\n * to 0 on all elements.\n *\n * https://github.com/tailwindcss/tailwindcss/issues/362\n */\n\nimg {\n  border-style: solid;\n}\n\ntextarea {\n  resize: vertical;\n}\n\ninput::placeholder,\ntextarea::placeholder {\n  color: #a0aec0;\n}\n\nbutton,\n[role=\"button\"] {\n  cursor: pointer;\n}\n\ntable {\n  border-collapse: collapse;\n}\n\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n  font-size: inherit;\n  font-weight: inherit;\n}\n\n/**\n * Reset links to optimize for opt-in styling instead of\n * opt-out.\n */\n\na {\n  color: inherit;\n  text-decoration: inherit;\n}\n\n/**\n * Reset form element properties that are easy to forget to\n * style explicitly so you don't inadvertently introduce\n * styles that deviate from your design system. These styles\n * supplement a partial reset that is already applied by\n * normalize.css.\n */\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  padding: 0;\n  line-height: inherit;\n  color: inherit;\n}\n\n/**\n * Use the configured 'mono' font family for elements that\n * are expected to be rendered with a monospace font, falling\n * back to the system monospace stack if there is no configured\n * 'mono' font family.\n */\n\npre,\ncode,\nkbd,\nsamp {\n  font-family: Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace;\n}\n\n/**\n * Make replaced elements `display: block` by default as that's\n * the behavior you want almost all of the time. Inspired by\n * CSS Remedy, with `svg` added as well.\n *\n * https://github.com/mozdevs/cssremedy/issues/14\n */\n\nimg,\nsvg,\nvideo,\ncanvas,\naudio,\niframe,\nembed,\nobject {\n  display: block;\n  vertical-align: middle;\n}\n\n/**\n * Constrain images and videos to the parent width and preserve\n * their instrinsic aspect ratio.\n *\n * https://github.com/mozdevs/cssremedy/issues/14\n */\n\nimg,\nvideo {\n  max-width: 100%;\n  height: auto;\n}\n\n.container {\n  width: 100%;\n}\n\n@media (min-width: 640px) {\n  .container {\n    max-width: 640px;\n  }\n}\n\n@media (min-width: 768px) {\n  .container {\n    max-width: 768px;\n  }\n}\n\n@media (min-width: 1024px) {\n  .container {\n    max-width: 1024px;\n  }\n}\n\n@media (min-width: 1280px) {\n  .container {\n    max-width: 1280px;\n  }\n}\n\n.bg-black {\n  --bg-opacity: 1;\n  background-color: #000;\n  background-color: rgba(0, 0, 0, var(--bg-opacity));\n}\n\n.bg-gray-100 {\n  --bg-opacity: 1;\n  background-color: #f7fafc;\n  background-color: rgba(247, 250, 252, var(--bg-opacity));\n}\n\n.bg-gray-900 {\n  --bg-opacity: 1;\n  background-color: #1a202c;\n  background-color: rgba(26, 32, 44, var(--bg-opacity));\n}\n\n.bg-blue-600 {\n  --bg-opacity: 1;\n  background-color: #3182ce;\n  background-color: rgba(49, 130, 206, var(--bg-opacity));\n}\n\n.bg-blue-900 {\n  --bg-opacity: 1;\n  background-color: #2a4365;\n  background-color: rgba(42, 67, 101, var(--bg-opacity));\n}\n\n.hover\\:bg-gray-300:hover {\n  --bg-opacity: 1;\n  background-color: #e2e8f0;\n  background-color: rgba(226, 232, 240, var(--bg-opacity));\n}\n\n.hover\\:bg-red-500:hover {\n  --bg-opacity: 1;\n  background-color: #f56565;\n  background-color: rgba(245, 101, 101, var(--bg-opacity));\n}\n\n.bg-opacity-25 {\n  --bg-opacity: 0.25;\n}\n\n.border-black {\n  --border-opacity: 1;\n  border-color: #000;\n  border-color: rgba(0, 0, 0, var(--border-opacity));\n}\n\n.border-gray-300 {\n  --border-opacity: 1;\n  border-color: #e2e8f0;\n  border-color: rgba(226, 232, 240, var(--border-opacity));\n}\n\n.border-gray-500 {\n  --border-opacity: 1;\n  border-color: #a0aec0;\n  border-color: rgba(160, 174, 192, var(--border-opacity));\n}\n\n.rounded {\n  border-radius: 0.25rem;\n}\n\n.rounded-full {\n  border-radius: 9999px;\n}\n\n.border-solid {\n  border-style: solid;\n}\n\n.border-dotted {\n  border-style: dotted;\n}\n\n.border-2 {\n  border-width: 2px;\n}\n\n.border-r-2 {\n  border-right-width: 2px;\n}\n\n.border-b {\n  border-bottom-width: 1px;\n}\n\n.flex {\n  display: flex;\n}\n\n.table {\n  display: table;\n}\n\n.flex-row {\n  flex-direction: row;\n}\n\n.flex-col {\n  flex-direction: column;\n}\n\n.items-center {\n  align-items: center;\n}\n\n.justify-center {\n  justify-content: center;\n}\n\n.justify-between {\n  justify-content: space-between;\n}\n\n.justify-around {\n  justify-content: space-around;\n}\n\n.flex-1 {\n  flex: 1 1 0%;\n}\n\n.font-serif {\n  font-family: Georgia, Cambria, \"Times New Roman\", Times, serif;\n}\n\n.font-mono {\n  font-family: Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace;\n}\n\n.font-normal {\n  font-weight: 400;\n}\n\n.font-semibold {\n  font-weight: 600;\n}\n\n.font-bold {\n  font-weight: 700;\n}\n\n.h-4 {\n  height: 1rem;\n}\n\n.h-10 {\n  height: 2.5rem;\n}\n\n.h-24 {\n  height: 6rem;\n}\n\n.h-32 {\n  height: 8rem;\n}\n\n.h-64 {\n  height: 16rem;\n}\n\n.h-auto {\n  height: auto;\n}\n\n.h-full {\n  height: 100%;\n}\n\n.text-xs {\n  font-size: 0.75rem;\n}\n\n.text-2xl {\n  font-size: 1.5rem;\n}\n\n.text-6xl {\n  font-size: 4rem;\n}\n\n.leading-none {\n  line-height: 1;\n}\n\n.leading-normal {\n  line-height: 1.5;\n}\n\n.list-none {\n  list-style-type: none;\n}\n\n.m-0 {\n  margin: 0;\n}\n\n.m-2 {\n  margin: 0.5rem;\n}\n\n.mx-16 {\n  margin-left: 4rem;\n  margin-right: 4rem;\n}\n\n.my-24 {\n  margin-top: 6rem;\n  margin-bottom: 6rem;\n}\n\n.mx-auto {\n  margin-left: auto;\n  margin-right: auto;\n}\n\n.mt-0 {\n  margin-top: 0;\n}\n\n.mb-0 {\n  margin-bottom: 0;\n}\n\n.mt-1 {\n  margin-top: 0.25rem;\n}\n\n.mb-1 {\n  margin-bottom: 0.25rem;\n}\n\n.mb-2 {\n  margin-bottom: 0.5rem;\n}\n\n.mt-4 {\n  margin-top: 1rem;\n}\n\n.mb-4 {\n  margin-bottom: 1rem;\n}\n\n.ml-4 {\n  margin-left: 1rem;\n}\n\n.mt-10 {\n  margin-top: 2.5rem;\n}\n\n.ml-12 {\n  margin-left: 3rem;\n}\n\n.-mt-24 {\n  margin-top: -6rem;\n}\n\n.object-cover {\n  object-fit: cover;\n}\n\n.object-center {\n  object-position: center;\n}\n\n.overflow-hidden {\n  overflow: hidden;\n}\n\n.p-0 {\n  padding: 0;\n}\n\n.p-2 {\n  padding: 0.5rem;\n}\n\n.p-4 {\n  padding: 1rem;\n}\n\n.px-3 {\n  padding-left: 0.75rem;\n  padding-right: 0.75rem;\n}\n\n.pb-0 {\n  padding-bottom: 0;\n}\n\n.pt-1 {\n  padding-top: 0.25rem;\n}\n\n.pb-1 {\n  padding-bottom: 0.25rem;\n}\n\n.pl-1 {\n  padding-left: 0.25rem;\n}\n\n.pt-10 {\n  padding-top: 2.5rem;\n}\n\n.pb-10 {\n  padding-bottom: 2.5rem;\n}\n\n.pt-64 {\n  padding-top: 16rem;\n}\n\n.absolute {\n  position: absolute;\n}\n\n.relative {\n  position: relative;\n}\n\n.top-0 {\n  top: 0;\n}\n\n.bottom-0 {\n  bottom: 0;\n}\n\n.shadow-xl {\n  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);\n}\n\n.text-center {\n  text-align: center;\n}\n\n.text-white {\n  --text-opacity: 1;\n  color: #fff;\n  color: rgba(255, 255, 255, var(--text-opacity));\n}\n\n.text-gray-200 {\n  --text-opacity: 1;\n  color: #edf2f7;\n  color: rgba(237, 242, 247, var(--text-opacity));\n}\n\n.text-gray-700 {\n  --text-opacity: 1;\n  color: #4a5568;\n  color: rgba(74, 85, 104, var(--text-opacity));\n}\n\n.text-gray-800 {\n  --text-opacity: 1;\n  color: #2d3748;\n  color: rgba(45, 55, 72, var(--text-opacity));\n}\n\n.text-yellow-300 {\n  --text-opacity: 1;\n  color: #faf089;\n  color: rgba(250, 240, 137, var(--text-opacity));\n}\n\n.text-green-500 {\n  --text-opacity: 1;\n  color: #48bb78;\n  color: rgba(72, 187, 120, var(--text-opacity));\n}\n\n.text-blue-600 {\n  --text-opacity: 1;\n  color: #3182ce;\n  color: rgba(49, 130, 206, var(--text-opacity));\n}\n\n.hover\\:text-gray-800:hover {\n  --text-opacity: 1;\n  color: #2d3748;\n  color: rgba(45, 55, 72, var(--text-opacity));\n}\n\n.uppercase {\n  text-transform: uppercase;\n}\n\n.subpixel-antialiased {\n  -webkit-font-smoothing: auto;\n  -moz-osx-font-smoothing: auto;\n}\n\n.tracking-tight {\n  letter-spacing: -0.025em;\n}\n\n.w-4 {\n  width: 1rem;\n}\n\n.w-32 {\n  width: 8rem;\n}\n\n.w-1\\/2 {\n  width: 50%;\n}\n\n.w-1\\/4 {\n  width: 25%;\n}\n\n.w-full {\n  width: 100%;\n}\n\n.z-0 {\n  z-index: 0;\n}\n\n.z-10 {\n  z-index: 10;\n}\n\n.z-20 {\n  z-index: 20;\n}\n\n@keyframes spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n\n@keyframes ping {\n  75%, 100% {\n    transform: scale(2);\n    opacity: 0;\n  }\n}\n\n@keyframes pulse {\n  50% {\n    opacity: .5;\n  }\n}\n\n@keyframes bounce {\n  0%, 100% {\n    transform: translateY(-25%);\n    animation-timing-function: cubic-bezier(0.8,0,1,1);\n  }\n\n  50% {\n    transform: none;\n    animation-timing-function: cubic-bezier(0,0,0.2,1);\n  }\n}\n\n@media (min-width: 640px) {\n  .sm\\:container {\n    width: 100%;\n  }\n\n  @media (min-width: 640px) {\n    .sm\\:container {\n      max-width: 640px;\n    }\n  }\n\n  @media (min-width: 768px) {\n    .sm\\:container {\n      max-width: 768px;\n    }\n  }\n\n  @media (min-width: 1024px) {\n    .sm\\:container {\n      max-width: 1024px;\n    }\n  }\n\n  @media (min-width: 1280px) {\n    .sm\\:container {\n      max-width: 1280px;\n    }\n  }\n\n  .sm\\:flex-row {\n    flex-direction: row;\n  }\n\n  .sm\\:flex-1 {\n    flex: 1 1 0%;\n  }\n\n  .sm\\:ml-32 {\n    margin-left: 8rem;\n  }\n}\n\n@media (min-width: 768px) {\n  .md\\:container {\n    width: 100%;\n  }\n\n  @media (min-width: 640px) {\n    .md\\:container {\n      max-width: 640px;\n    }\n  }\n\n  @media (min-width: 768px) {\n    .md\\:container {\n      max-width: 768px;\n    }\n  }\n\n  @media (min-width: 1024px) {\n    .md\\:container {\n      max-width: 1024px;\n    }\n  }\n\n  @media (min-width: 1280px) {\n    .md\\:container {\n      max-width: 1280px;\n    }\n  }\n\n  .md\\:flex-row {\n    flex-direction: row;\n  }\n\n  .md\\:flex-col {\n    flex-direction: column;\n  }\n\n  .md\\:items-center {\n    align-items: center;\n  }\n\n  .md\\:justify-center {\n    justify-content: center;\n  }\n\n  .md\\:text-2xl {\n    font-size: 1.5rem;\n  }\n\n  .md\\:ml-32 {\n    margin-left: 8rem;\n  }\n\n  .md\\:pt-10 {\n    padding-top: 2.5rem;\n  }\n\n  .md\\:w-1\\/4 {\n    width: 25%;\n  }\n\n  .md\\:w-3\\/4 {\n    width: 75%;\n  }\n}\n\n@media (min-width: 1024px) {\n  .lg\\:container {\n    width: 100%;\n  }\n\n  @media (min-width: 640px) {\n    .lg\\:container {\n      max-width: 640px;\n    }\n  }\n\n  @media (min-width: 768px) {\n    .lg\\:container {\n      max-width: 768px;\n    }\n  }\n\n  @media (min-width: 1024px) {\n    .lg\\:container {\n      max-width: 1024px;\n    }\n  }\n\n  @media (min-width: 1280px) {\n    .lg\\:container {\n      max-width: 1280px;\n    }\n  }\n\n  .lg\\:flex-row {\n    flex-direction: row;\n  }\n\n  .lg\\:ml-32 {\n    margin-left: 8rem;\n  }\n}\n\n@media (min-width: 1280px) {\n  .xl\\:container {\n    width: 100%;\n  }\n\n  @media (min-width: 640px) {\n    .xl\\:container {\n      max-width: 640px;\n    }\n  }\n\n  @media (min-width: 768px) {\n    .xl\\:container {\n      max-width: 768px;\n    }\n  }\n\n  @media (min-width: 1024px) {\n    .xl\\:container {\n      max-width: 1024px;\n    }\n  }\n\n  @media (min-width: 1280px) {\n    .xl\\:container {\n      max-width: 1280px;\n    }\n  }\n\n  .xl\\:flex-row {\n    flex-direction: row;\n  }\n\n  .xl\\:ml-32 {\n    margin-left: 8rem;\n  }\n}\n", "",{"version":3,"sources":["webpack://src/styles.css"],"names":[],"mappings":"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;AAEA;EACE;IACE,WAAW;EACb;;EAEA;IACE;MACE,gBAAgB;IAClB;EACF;;EAEA;IACE;MACE,gBAAgB;IAClB;EACF;;EAEA;IACE;MACE,iBAAiB;IACnB;EACF;;EAEA;IACE;MACE,iBAAiB;IACnB;EACF;;EAEA;IACE,mBAAmB;EACrB;;EAEA;IACE,YAAY;EACd;;EAEA;IACE,iBAAiB;EACnB;AACF;;AAEA;EACE;IACE,WAAW;EACb;;EAEA;IACE;MACE,gBAAgB;IAClB;EACF;;EAEA;IACE;MACE,gBAAgB;IAClB;EACF;;EAEA;IACE;MACE,iBAAiB;IACnB;EACF;;EAEA;IACE;MACE,iBAAiB;IACnB;EACF;;EAEA;IACE,mBAAmB;EACrB;;EAEA;IACE,sBAAsB;EACxB;;EAEA;IACE,mBAAmB;EACrB;;EAEA;IACE,uBAAuB;EACzB;;EAEA;IACE,iBAAiB;EACnB;;EAEA;IACE,iBAAiB;EACnB;;EAEA;IACE,mBAAmB;EACrB;;EAEA;IACE,UAAU;EACZ;;EAEA;IACE,UAAU;EACZ;AACF;;AAEA;EACE;IACE,WAAW;EACb;;EAEA;IACE;MACE,gBAAgB;IAClB;EACF;;EAEA;IACE;MACE,gBAAgB;IAClB;EACF;;EAEA;IACE;MACE,iBAAiB;IACnB;EACF;;EAEA;IACE;MACE,iBAAiB;IACnB;EACF;;EAEA;IACE,mBAAmB;EACrB;;EAEA;IACE,iBAAiB;EACnB;AACF;;AAEA;EACE;IACE,WAAW;EACb;;EAEA;IACE;MACE,gBAAgB;IAClB;EACF;;EAEA;IACE;MACE,gBAAgB;IAClB;EACF;;EAEA;IACE;MACE,iBAAiB;IACnB;EACF;;EAEA;IACE;MACE,iBAAiB;IACnB;EACF;;EAEA;IACE,mBAAmB;EACrB;;EAEA;IACE,iBAAiB;EACnB;AACF","sourcesContent":["/* You can add global styles to this file, and also import other style files */\n\n/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */\n\n/* Document\n   ========================================================================== */\n\n/**\n * 1. Correct the line height in all browsers.\n * 2. Prevent adjustments of font size after orientation changes in iOS.\n */\n\nhtml {\n  line-height: 1.15; /* 1 */\n  -webkit-text-size-adjust: 100%; /* 2 */\n}\n\n/* Sections\n   ========================================================================== */\n\n/**\n * Remove the margin in all browsers.\n */\n\nbody {\n  margin: 0;\n}\n\n/**\n * Render the `main` element consistently in IE.\n */\n\nmain {\n  display: block;\n}\n\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\n/* Grouping content\n   ========================================================================== */\n\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\n\nhr {\n  box-sizing: content-box; /* 1 */\n  height: 0; /* 1 */\n  overflow: visible; /* 2 */\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\npre {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/* Text-level semantics\n   ========================================================================== */\n\n/**\n * Remove the gray background on active links in IE 10.\n */\n\na {\n  background-color: transparent;\n}\n\n/**\n * 1. Remove the bottom border in Chrome 57-\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\n\nabbr[title] {\n  border-bottom: none; /* 1 */\n  text-decoration: underline; /* 2 */\n  text-decoration: underline dotted; /* 2 */\n}\n\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\n\nb,\nstrong {\n  font-weight: bolder;\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\ncode,\nkbd,\nsamp {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/**\n * Add the correct font size in all browsers.\n */\n\nsmall {\n  font-size: 80%;\n}\n\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nsup {\n  top: -0.5em;\n}\n\n/* Embedded content\n   ========================================================================== */\n\n/**\n * Remove the border on images inside links in IE 10.\n */\n\nimg {\n  border-style: none;\n}\n\n/* Forms\n   ========================================================================== */\n\n/**\n * 1. Change the font styles in all browsers.\n * 2. Remove the margin in Firefox and Safari.\n */\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: inherit; /* 1 */\n  font-size: 100%; /* 1 */\n  line-height: 1.15; /* 1 */\n  margin: 0; /* 2 */\n}\n\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\n\nbutton,\ninput { /* 1 */\n  overflow: visible;\n}\n\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\n\nbutton,\nselect { /* 1 */\n  text-transform: none;\n}\n\n/**\n * Correct the inability to style clickable types in iOS and Safari.\n */\n\nbutton,\n[type=\"button\"],\n[type=\"reset\"],\n[type=\"submit\"] {\n  -webkit-appearance: button;\n}\n\n/**\n * Remove the inner border and padding in Firefox.\n */\n\nbutton::-moz-focus-inner,\n[type=\"button\"]::-moz-focus-inner,\n[type=\"reset\"]::-moz-focus-inner,\n[type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0;\n}\n\n/**\n * Restore the focus styles unset by the previous rule.\n */\n\nbutton:-moz-focusring,\n[type=\"button\"]:-moz-focusring,\n[type=\"reset\"]:-moz-focusring,\n[type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n\n/**\n * Correct the padding in Firefox.\n */\n\nfieldset {\n  padding: 0.35em 0.75em 0.625em;\n}\n\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\n\nlegend {\n  box-sizing: border-box; /* 1 */\n  color: inherit; /* 2 */\n  display: table; /* 1 */\n  max-width: 100%; /* 1 */\n  padding: 0; /* 3 */\n  white-space: normal; /* 1 */\n}\n\n/**\n * Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\n\nprogress {\n  vertical-align: baseline;\n}\n\n/**\n * Remove the default vertical scrollbar in IE 10+.\n */\n\ntextarea {\n  overflow: auto;\n}\n\n/**\n * 1. Add the correct box sizing in IE 10.\n * 2. Remove the padding in IE 10.\n */\n\n[type=\"checkbox\"],\n[type=\"radio\"] {\n  box-sizing: border-box; /* 1 */\n  padding: 0; /* 2 */\n}\n\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n\n[type=\"number\"]::-webkit-inner-spin-button,\n[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n\n[type=\"search\"] {\n  -webkit-appearance: textfield; /* 1 */\n  outline-offset: -2px; /* 2 */\n}\n\n/**\n * Remove the inner padding in Chrome and Safari on macOS.\n */\n\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n\n::-webkit-file-upload-button {\n  -webkit-appearance: button; /* 1 */\n  font: inherit; /* 2 */\n}\n\n/* Interactive\n   ========================================================================== */\n\n/*\n * Add the correct display in Edge, IE 10+, and Firefox.\n */\n\ndetails {\n  display: block;\n}\n\n/*\n * Add the correct display in all browsers.\n */\n\nsummary {\n  display: list-item;\n}\n\n/* Misc\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 10+.\n */\n\ntemplate {\n  display: none;\n}\n\n/**\n * Add the correct display in IE 10.\n */\n\n[hidden] {\n  display: none;\n}\n\n/**\n * Manually forked from SUIT CSS Base: https://github.com/suitcss/base\n * A thin layer on top of normalize.css that provides a starting point more\n * suitable for web applications.\n */\n\n/**\n * Removes the default spacing and border for appropriate elements.\n */\n\nblockquote,\ndl,\ndd,\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\nhr,\nfigure,\np,\npre {\n  margin: 0;\n}\n\nbutton {\n  background-color: transparent;\n  background-image: none;\n}\n\n/**\n * Work around a Firefox/IE bug where the transparent `button` background\n * results in a loss of the default `button` focus styles.\n */\n\nbutton:focus {\n  outline: 1px dotted;\n  outline: 5px auto -webkit-focus-ring-color;\n}\n\nfieldset {\n  margin: 0;\n  padding: 0;\n}\n\nol,\nul {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n}\n\n/**\n * Tailwind custom reset styles\n */\n\n/**\n * 1. Use the user's configured `sans` font-family (with Tailwind's default\n *    sans-serif font stack as a fallback) as a sane default.\n * 2. Use Tailwind's default \"normal\" line-height so the user isn't forced\n *    to override it to ensure consistency even when using the default theme.\n */\n\nhtml {\n  font-family: system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\"; /* 1 */\n  line-height: 1.5; /* 2 */\n}\n\n/**\n * 1. Prevent padding and border from affecting element width.\n *\n *    We used to set this in the html element and inherit from\n *    the parent element for everything else. This caused issues\n *    in shadow-dom-enhanced elements like <details> where the content\n *    is wrapped by a div with box-sizing set to `content-box`.\n *\n *    https://github.com/mozdevs/cssremedy/issues/4\n *\n *\n * 2. Allow adding a border to an element by just adding a border-width.\n *\n *    By default, the way the browser specifies that an element should have no\n *    border is by setting it's border-style to `none` in the user-agent\n *    stylesheet.\n *\n *    In order to easily add borders to elements by just setting the `border-width`\n *    property, we change the default border-style for all elements to `solid`, and\n *    use border-width to hide them instead. This way our `border` utilities only\n *    need to set the `border-width` property instead of the entire `border`\n *    shorthand, making our border utilities much more straightforward to compose.\n *\n *    https://github.com/tailwindcss/tailwindcss/pull/116\n */\n\n*,\n::before,\n::after {\n  box-sizing: border-box; /* 1 */\n  border-width: 0; /* 2 */\n  border-style: solid; /* 2 */\n  border-color: #e2e8f0; /* 2 */\n}\n\n/*\n * Ensure horizontal rules are visible by default\n */\n\nhr {\n  border-top-width: 1px;\n}\n\n/**\n * Undo the `border-style: none` reset that Normalize applies to images so that\n * our `border-{width}` utilities have the expected effect.\n *\n * The Normalize reset is unnecessary for us since we default the border-width\n * to 0 on all elements.\n *\n * https://github.com/tailwindcss/tailwindcss/issues/362\n */\n\nimg {\n  border-style: solid;\n}\n\ntextarea {\n  resize: vertical;\n}\n\ninput::placeholder,\ntextarea::placeholder {\n  color: #a0aec0;\n}\n\nbutton,\n[role=\"button\"] {\n  cursor: pointer;\n}\n\ntable {\n  border-collapse: collapse;\n}\n\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n  font-size: inherit;\n  font-weight: inherit;\n}\n\n/**\n * Reset links to optimize for opt-in styling instead of\n * opt-out.\n */\n\na {\n  color: inherit;\n  text-decoration: inherit;\n}\n\n/**\n * Reset form element properties that are easy to forget to\n * style explicitly so you don't inadvertently introduce\n * styles that deviate from your design system. These styles\n * supplement a partial reset that is already applied by\n * normalize.css.\n */\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  padding: 0;\n  line-height: inherit;\n  color: inherit;\n}\n\n/**\n * Use the configured 'mono' font family for elements that\n * are expected to be rendered with a monospace font, falling\n * back to the system monospace stack if there is no configured\n * 'mono' font family.\n */\n\npre,\ncode,\nkbd,\nsamp {\n  font-family: Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace;\n}\n\n/**\n * Make replaced elements `display: block` by default as that's\n * the behavior you want almost all of the time. Inspired by\n * CSS Remedy, with `svg` added as well.\n *\n * https://github.com/mozdevs/cssremedy/issues/14\n */\n\nimg,\nsvg,\nvideo,\ncanvas,\naudio,\niframe,\nembed,\nobject {\n  display: block;\n  vertical-align: middle;\n}\n\n/**\n * Constrain images and videos to the parent width and preserve\n * their instrinsic aspect ratio.\n *\n * https://github.com/mozdevs/cssremedy/issues/14\n */\n\nimg,\nvideo {\n  max-width: 100%;\n  height: auto;\n}\n\n.container {\n  width: 100%;\n}\n\n@media (min-width: 640px) {\n  .container {\n    max-width: 640px;\n  }\n}\n\n@media (min-width: 768px) {\n  .container {\n    max-width: 768px;\n  }\n}\n\n@media (min-width: 1024px) {\n  .container {\n    max-width: 1024px;\n  }\n}\n\n@media (min-width: 1280px) {\n  .container {\n    max-width: 1280px;\n  }\n}\n\n.bg-black {\n  --bg-opacity: 1;\n  background-color: #000;\n  background-color: rgba(0, 0, 0, var(--bg-opacity));\n}\n\n.bg-gray-100 {\n  --bg-opacity: 1;\n  background-color: #f7fafc;\n  background-color: rgba(247, 250, 252, var(--bg-opacity));\n}\n\n.bg-gray-900 {\n  --bg-opacity: 1;\n  background-color: #1a202c;\n  background-color: rgba(26, 32, 44, var(--bg-opacity));\n}\n\n.bg-blue-600 {\n  --bg-opacity: 1;\n  background-color: #3182ce;\n  background-color: rgba(49, 130, 206, var(--bg-opacity));\n}\n\n.bg-blue-900 {\n  --bg-opacity: 1;\n  background-color: #2a4365;\n  background-color: rgba(42, 67, 101, var(--bg-opacity));\n}\n\n.hover\\:bg-gray-300:hover {\n  --bg-opacity: 1;\n  background-color: #e2e8f0;\n  background-color: rgba(226, 232, 240, var(--bg-opacity));\n}\n\n.hover\\:bg-red-500:hover {\n  --bg-opacity: 1;\n  background-color: #f56565;\n  background-color: rgba(245, 101, 101, var(--bg-opacity));\n}\n\n.bg-opacity-25 {\n  --bg-opacity: 0.25;\n}\n\n.border-black {\n  --border-opacity: 1;\n  border-color: #000;\n  border-color: rgba(0, 0, 0, var(--border-opacity));\n}\n\n.border-gray-300 {\n  --border-opacity: 1;\n  border-color: #e2e8f0;\n  border-color: rgba(226, 232, 240, var(--border-opacity));\n}\n\n.border-gray-500 {\n  --border-opacity: 1;\n  border-color: #a0aec0;\n  border-color: rgba(160, 174, 192, var(--border-opacity));\n}\n\n.rounded {\n  border-radius: 0.25rem;\n}\n\n.rounded-full {\n  border-radius: 9999px;\n}\n\n.border-solid {\n  border-style: solid;\n}\n\n.border-dotted {\n  border-style: dotted;\n}\n\n.border-2 {\n  border-width: 2px;\n}\n\n.border-r-2 {\n  border-right-width: 2px;\n}\n\n.border-b {\n  border-bottom-width: 1px;\n}\n\n.flex {\n  display: flex;\n}\n\n.table {\n  display: table;\n}\n\n.flex-row {\n  flex-direction: row;\n}\n\n.flex-col {\n  flex-direction: column;\n}\n\n.items-center {\n  align-items: center;\n}\n\n.justify-center {\n  justify-content: center;\n}\n\n.justify-between {\n  justify-content: space-between;\n}\n\n.justify-around {\n  justify-content: space-around;\n}\n\n.flex-1 {\n  flex: 1 1 0%;\n}\n\n.font-serif {\n  font-family: Georgia, Cambria, \"Times New Roman\", Times, serif;\n}\n\n.font-mono {\n  font-family: Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace;\n}\n\n.font-normal {\n  font-weight: 400;\n}\n\n.font-semibold {\n  font-weight: 600;\n}\n\n.font-bold {\n  font-weight: 700;\n}\n\n.h-4 {\n  height: 1rem;\n}\n\n.h-10 {\n  height: 2.5rem;\n}\n\n.h-24 {\n  height: 6rem;\n}\n\n.h-32 {\n  height: 8rem;\n}\n\n.h-64 {\n  height: 16rem;\n}\n\n.h-auto {\n  height: auto;\n}\n\n.h-full {\n  height: 100%;\n}\n\n.text-xs {\n  font-size: 0.75rem;\n}\n\n.text-2xl {\n  font-size: 1.5rem;\n}\n\n.text-6xl {\n  font-size: 4rem;\n}\n\n.leading-none {\n  line-height: 1;\n}\n\n.leading-normal {\n  line-height: 1.5;\n}\n\n.list-none {\n  list-style-type: none;\n}\n\n.m-0 {\n  margin: 0;\n}\n\n.m-2 {\n  margin: 0.5rem;\n}\n\n.mx-16 {\n  margin-left: 4rem;\n  margin-right: 4rem;\n}\n\n.my-24 {\n  margin-top: 6rem;\n  margin-bottom: 6rem;\n}\n\n.mx-auto {\n  margin-left: auto;\n  margin-right: auto;\n}\n\n.mt-0 {\n  margin-top: 0;\n}\n\n.mb-0 {\n  margin-bottom: 0;\n}\n\n.mt-1 {\n  margin-top: 0.25rem;\n}\n\n.mb-1 {\n  margin-bottom: 0.25rem;\n}\n\n.mb-2 {\n  margin-bottom: 0.5rem;\n}\n\n.mt-4 {\n  margin-top: 1rem;\n}\n\n.mb-4 {\n  margin-bottom: 1rem;\n}\n\n.ml-4 {\n  margin-left: 1rem;\n}\n\n.mt-10 {\n  margin-top: 2.5rem;\n}\n\n.ml-12 {\n  margin-left: 3rem;\n}\n\n.-mt-24 {\n  margin-top: -6rem;\n}\n\n.object-cover {\n  object-fit: cover;\n}\n\n.object-center {\n  object-position: center;\n}\n\n.overflow-hidden {\n  overflow: hidden;\n}\n\n.p-0 {\n  padding: 0;\n}\n\n.p-2 {\n  padding: 0.5rem;\n}\n\n.p-4 {\n  padding: 1rem;\n}\n\n.px-3 {\n  padding-left: 0.75rem;\n  padding-right: 0.75rem;\n}\n\n.pb-0 {\n  padding-bottom: 0;\n}\n\n.pt-1 {\n  padding-top: 0.25rem;\n}\n\n.pb-1 {\n  padding-bottom: 0.25rem;\n}\n\n.pl-1 {\n  padding-left: 0.25rem;\n}\n\n.pt-10 {\n  padding-top: 2.5rem;\n}\n\n.pb-10 {\n  padding-bottom: 2.5rem;\n}\n\n.pt-64 {\n  padding-top: 16rem;\n}\n\n.absolute {\n  position: absolute;\n}\n\n.relative {\n  position: relative;\n}\n\n.top-0 {\n  top: 0;\n}\n\n.bottom-0 {\n  bottom: 0;\n}\n\n.shadow-xl {\n  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);\n}\n\n.text-center {\n  text-align: center;\n}\n\n.text-white {\n  --text-opacity: 1;\n  color: #fff;\n  color: rgba(255, 255, 255, var(--text-opacity));\n}\n\n.text-gray-200 {\n  --text-opacity: 1;\n  color: #edf2f7;\n  color: rgba(237, 242, 247, var(--text-opacity));\n}\n\n.text-gray-700 {\n  --text-opacity: 1;\n  color: #4a5568;\n  color: rgba(74, 85, 104, var(--text-opacity));\n}\n\n.text-gray-800 {\n  --text-opacity: 1;\n  color: #2d3748;\n  color: rgba(45, 55, 72, var(--text-opacity));\n}\n\n.text-yellow-300 {\n  --text-opacity: 1;\n  color: #faf089;\n  color: rgba(250, 240, 137, var(--text-opacity));\n}\n\n.text-green-500 {\n  --text-opacity: 1;\n  color: #48bb78;\n  color: rgba(72, 187, 120, var(--text-opacity));\n}\n\n.text-blue-600 {\n  --text-opacity: 1;\n  color: #3182ce;\n  color: rgba(49, 130, 206, var(--text-opacity));\n}\n\n.hover\\:text-gray-800:hover {\n  --text-opacity: 1;\n  color: #2d3748;\n  color: rgba(45, 55, 72, var(--text-opacity));\n}\n\n.uppercase {\n  text-transform: uppercase;\n}\n\n.subpixel-antialiased {\n  -webkit-font-smoothing: auto;\n  -moz-osx-font-smoothing: auto;\n}\n\n.tracking-tight {\n  letter-spacing: -0.025em;\n}\n\n.w-4 {\n  width: 1rem;\n}\n\n.w-32 {\n  width: 8rem;\n}\n\n.w-1\\/2 {\n  width: 50%;\n}\n\n.w-1\\/4 {\n  width: 25%;\n}\n\n.w-full {\n  width: 100%;\n}\n\n.z-0 {\n  z-index: 0;\n}\n\n.z-10 {\n  z-index: 10;\n}\n\n.z-20 {\n  z-index: 20;\n}\n\n@keyframes spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n\n@keyframes ping {\n  75%, 100% {\n    transform: scale(2);\n    opacity: 0;\n  }\n}\n\n@keyframes pulse {\n  50% {\n    opacity: .5;\n  }\n}\n\n@keyframes bounce {\n  0%, 100% {\n    transform: translateY(-25%);\n    animation-timing-function: cubic-bezier(0.8,0,1,1);\n  }\n\n  50% {\n    transform: none;\n    animation-timing-function: cubic-bezier(0,0,0.2,1);\n  }\n}\n\n@media (min-width: 640px) {\n  .sm\\:container {\n    width: 100%;\n  }\n\n  @media (min-width: 640px) {\n    .sm\\:container {\n      max-width: 640px;\n    }\n  }\n\n  @media (min-width: 768px) {\n    .sm\\:container {\n      max-width: 768px;\n    }\n  }\n\n  @media (min-width: 1024px) {\n    .sm\\:container {\n      max-width: 1024px;\n    }\n  }\n\n  @media (min-width: 1280px) {\n    .sm\\:container {\n      max-width: 1280px;\n    }\n  }\n\n  .sm\\:flex-row {\n    flex-direction: row;\n  }\n\n  .sm\\:flex-1 {\n    flex: 1 1 0%;\n  }\n\n  .sm\\:ml-32 {\n    margin-left: 8rem;\n  }\n}\n\n@media (min-width: 768px) {\n  .md\\:container {\n    width: 100%;\n  }\n\n  @media (min-width: 640px) {\n    .md\\:container {\n      max-width: 640px;\n    }\n  }\n\n  @media (min-width: 768px) {\n    .md\\:container {\n      max-width: 768px;\n    }\n  }\n\n  @media (min-width: 1024px) {\n    .md\\:container {\n      max-width: 1024px;\n    }\n  }\n\n  @media (min-width: 1280px) {\n    .md\\:container {\n      max-width: 1280px;\n    }\n  }\n\n  .md\\:flex-row {\n    flex-direction: row;\n  }\n\n  .md\\:flex-col {\n    flex-direction: column;\n  }\n\n  .md\\:items-center {\n    align-items: center;\n  }\n\n  .md\\:justify-center {\n    justify-content: center;\n  }\n\n  .md\\:text-2xl {\n    font-size: 1.5rem;\n  }\n\n  .md\\:ml-32 {\n    margin-left: 8rem;\n  }\n\n  .md\\:pt-10 {\n    padding-top: 2.5rem;\n  }\n\n  .md\\:w-1\\/4 {\n    width: 25%;\n  }\n\n  .md\\:w-3\\/4 {\n    width: 75%;\n  }\n}\n\n@media (min-width: 1024px) {\n  .lg\\:container {\n    width: 100%;\n  }\n\n  @media (min-width: 640px) {\n    .lg\\:container {\n      max-width: 640px;\n    }\n  }\n\n  @media (min-width: 768px) {\n    .lg\\:container {\n      max-width: 768px;\n    }\n  }\n\n  @media (min-width: 1024px) {\n    .lg\\:container {\n      max-width: 1024px;\n    }\n  }\n\n  @media (min-width: 1280px) {\n    .lg\\:container {\n      max-width: 1280px;\n    }\n  }\n\n  .lg\\:flex-row {\n    flex-direction: row;\n  }\n\n  .lg\\:ml-32 {\n    margin-left: 8rem;\n  }\n}\n\n@media (min-width: 1280px) {\n  .xl\\:container {\n    width: 100%;\n  }\n\n  @media (min-width: 640px) {\n    .xl\\:container {\n      max-width: 640px;\n    }\n  }\n\n  @media (min-width: 768px) {\n    .xl\\:container {\n      max-width: 768px;\n    }\n  }\n\n  @media (min-width: 1024px) {\n    .xl\\:container {\n      max-width: 1024px;\n    }\n  }\n\n  @media (min-width: 1280px) {\n    .xl\\:container {\n      max-width: 1280px;\n    }\n  }\n\n  .xl\\:flex-row {\n    flex-direction: row;\n  }\n\n  .xl\\:ml-32 {\n    margin-left: 8rem;\n  }\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ })

},[[2,"runtime"]]]);
//# sourceMappingURL=styles.js.map