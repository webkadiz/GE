(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[21],{

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/js/components/canvas-coords.vue?vue&type=script&lang=js":
/*!*******************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/js/components/canvas-coords.vue?vue&type=script&lang=js ***!
  \*******************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\n//\n//\n//\n//\n//\n//\n//\n//\n//\n\n// ширина canvas-title есть в canvas-wrapper \n\nexports.default = {\n  props: [\"top\", 'left', \"axis\"],\n  computed: _extends({\n    computeWidth() {\n\n      if (this.getCanvasWidth < this.canvas.width * this.canvas.zoom) return this.canvas.width * this.canvas.zoom + 400 + COORDS_SIZE + \"px\";else return this.getCanvasWidth + COORDS_SIZE + \"px\";\n    },\n    computeHeight() {\n      if (this.getCanvasHeight < this.canvas.height * this.canvas.zoom) return this.canvas.height * this.canvas.zoom + 400 + COORDS_SIZE + \"px\";else return this.getCanvasHeight + COORDS_SIZE + \"px\";\n    }\n  }, Vuex.mapState([\"canvas\"]), Vuex.mapGetters([\"getCanvasWidth\", \"getCanvasHeight\"]))\n};\n\n//# sourceURL=webpack:///./src/js/components/canvas-coords.vue?./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/lib/loader.js??ref--2-2!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/js/components/canvas-coords.vue?vue&type=style&index=0&lang=sass":
/*!**********************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/lib/loader.js??ref--2-2!./node_modules/vue-loader/lib??vue-loader-options!./src/js/components/canvas-coords.vue?vue&type=style&index=0&lang=sass ***!
  \**********************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ \"./node_modules/css-loader/lib/css-base.js\")(false);\n// imports\n\n\n// module\nexports.push([module.i, \"\", \"\"]);\n\n// exports\n\n\n//# sourceURL=webpack:///./src/js/components/canvas-coords.vue?./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/lib/loader.js??ref--2-2!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/js/components/canvas-coords.vue?vue&type=template&id=79bdb80a":
/*!*********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/js/components/canvas-coords.vue?vue&type=template&id=79bdb80a ***!
  \*********************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _vm.axis === \"x\"\n    ? _c(\n        \"div\",\n        {\n          staticClass: \"coords-x-wrapper\",\n          style: { top: _vm.top + \"px\", width: _vm.computeWidth }\n        },\n        [\n          _c(\"div\", {\n            staticStyle: { height: \"20px\", width: \"20px\", \"flex-shrink\": \"0\" }\n          })\n        ]\n      )\n    : _vm.axis === \"y\"\n      ? _c(\n          \"div\",\n          {\n            staticClass: \"coords-y-wrapper\",\n            style: { left: _vm.left + \"px\", height: _vm.computeHeight }\n          },\n          [\n            _c(\"div\", {\n              staticStyle: { height: \"20px\", width: \"20px\", \"flex-shrink\": \"0\" }\n            })\n          ]\n        )\n      : _vm._e()\n}\nvar staticRenderFns = []\nrender._withStripped = true\n\n\n\n//# sourceURL=webpack:///./src/js/components/canvas-coords.vue?./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/lib/loader.js??ref--2-2!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/js/components/canvas-coords.vue?vue&type=style&index=0&lang=sass":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader!./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/lib/loader.js??ref--2-2!./node_modules/vue-loader/lib??vue-loader-options!./src/js/components/canvas-coords.vue?vue&type=style&index=0&lang=sass ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// style-loader: Adds some css to the DOM by adding a <style> tag\n\n// load the styles\nvar content = __webpack_require__(/*! !../../../node_modules/css-loader!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/sass-loader/lib/loader.js??ref--2-2!../../../node_modules/vue-loader/lib??vue-loader-options!./canvas-coords.vue?vue&type=style&index=0&lang=sass */ \"./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/lib/loader.js??ref--2-2!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/js/components/canvas-coords.vue?vue&type=style&index=0&lang=sass\");\nif(typeof content === 'string') content = [[module.i, content, '']];\nif(content.locals) module.exports = content.locals;\n// add the styles to the DOM\nvar add = __webpack_require__(/*! ../../../node_modules/vue-style-loader/lib/addStylesClient.js */ \"./node_modules/vue-style-loader/lib/addStylesClient.js\").default\nvar update = add(\"e2894652\", content, false, {});\n// Hot Module Replacement\nif(false) {}\n\n//# sourceURL=webpack:///./src/js/components/canvas-coords.vue?./node_modules/vue-style-loader!./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/lib/loader.js??ref--2-2!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./src/js/components/canvas-coords.vue":
/*!*********************************************!*\
  !*** ./src/js/components/canvas-coords.vue ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _canvas_coords_vue_vue_type_template_id_79bdb80a__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./canvas-coords.vue?vue&type=template&id=79bdb80a */ \"./src/js/components/canvas-coords.vue?vue&type=template&id=79bdb80a\");\n/* harmony import */ var _canvas_coords_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./canvas-coords.vue?vue&type=script&lang=js */ \"./src/js/components/canvas-coords.vue?vue&type=script&lang=js\");\n/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _canvas_coords_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _canvas_coords_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));\n/* harmony import */ var _canvas_coords_vue_vue_type_style_index_0_lang_sass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./canvas-coords.vue?vue&type=style&index=0&lang=sass */ \"./src/js/components/canvas-coords.vue?vue&type=style&index=0&lang=sass\");\n/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"./node_modules/vue-loader/lib/runtime/componentNormalizer.js\");\n\n\n\n\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(\n  _canvas_coords_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _canvas_coords_vue_vue_type_template_id_79bdb80a__WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _canvas_coords_vue_vue_type_template_id_79bdb80a__WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  null,\n  null\n  \n)\n\n/* hot reload */\nif (false) { var api; }\ncomponent.options.__file = \"src\\\\js\\\\components\\\\canvas-coords.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./src/js/components/canvas-coords.vue?");

/***/ }),

/***/ "./src/js/components/canvas-coords.vue?vue&type=script&lang=js":
/*!*********************************************************************!*\
  !*** ./src/js/components/canvas-coords.vue?vue&type=script&lang=js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_canvas_coords_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib!../../../node_modules/vue-loader/lib??vue-loader-options!./canvas-coords.vue?vue&type=script&lang=js */ \"./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/js/components/canvas-coords.vue?vue&type=script&lang=js\");\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_canvas_coords_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_canvas_coords_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_canvas_coords_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_canvas_coords_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));\n /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_canvas_coords_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0___default.a); \n\n//# sourceURL=webpack:///./src/js/components/canvas-coords.vue?");

/***/ }),

/***/ "./src/js/components/canvas-coords.vue?vue&type=style&index=0&lang=sass":
/*!******************************************************************************!*\
  !*** ./src/js/components/canvas-coords.vue?vue&type=style&index=0&lang=sass ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_ref_2_2_node_modules_vue_loader_lib_index_js_vue_loader_options_canvas_coords_vue_vue_type_style_index_0_lang_sass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-style-loader!../../../node_modules/css-loader!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/sass-loader/lib/loader.js??ref--2-2!../../../node_modules/vue-loader/lib??vue-loader-options!./canvas-coords.vue?vue&type=style&index=0&lang=sass */ \"./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/lib/loader.js??ref--2-2!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/js/components/canvas-coords.vue?vue&type=style&index=0&lang=sass\");\n/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_ref_2_2_node_modules_vue_loader_lib_index_js_vue_loader_options_canvas_coords_vue_vue_type_style_index_0_lang_sass__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_ref_2_2_node_modules_vue_loader_lib_index_js_vue_loader_options_canvas_coords_vue_vue_type_style_index_0_lang_sass__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_ref_2_2_node_modules_vue_loader_lib_index_js_vue_loader_options_canvas_coords_vue_vue_type_style_index_0_lang_sass__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_ref_2_2_node_modules_vue_loader_lib_index_js_vue_loader_options_canvas_coords_vue_vue_type_style_index_0_lang_sass__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));\n /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_ref_2_2_node_modules_vue_loader_lib_index_js_vue_loader_options_canvas_coords_vue_vue_type_style_index_0_lang_sass__WEBPACK_IMPORTED_MODULE_0___default.a); \n\n//# sourceURL=webpack:///./src/js/components/canvas-coords.vue?");

/***/ }),

/***/ "./src/js/components/canvas-coords.vue?vue&type=template&id=79bdb80a":
/*!***************************************************************************!*\
  !*** ./src/js/components/canvas-coords.vue?vue&type=template&id=79bdb80a ***!
  \***************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_canvas_coords_vue_vue_type_template_id_79bdb80a__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./canvas-coords.vue?vue&type=template&id=79bdb80a */ \"./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/js/components/canvas-coords.vue?vue&type=template&id=79bdb80a\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_canvas_coords_vue_vue_type_template_id_79bdb80a__WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_canvas_coords_vue_vue_type_template_id_79bdb80a__WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack:///./src/js/components/canvas-coords.vue?");

/***/ })

}]);