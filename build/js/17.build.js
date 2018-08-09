(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[17],{

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/js/components/canvas-title.vue?vue&type=script&lang=js":
/*!******************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/js/components/canvas-title.vue?vue&type=script&lang=js ***!
  \******************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n//\n//\n//\n//\n//\n//\n//\n\nexports.default = {\n\tprops: ['title']\n};\n\n//# sourceURL=webpack:///./src/js/components/canvas-title.vue?./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/lib/loader.js??ref--2-2!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/js/components/canvas-title.vue?vue&type=style&index=0&lang=sass":
/*!*********************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/lib/loader.js??ref--2-2!./node_modules/vue-loader/lib??vue-loader-options!./src/js/components/canvas-title.vue?vue&type=style&index=0&lang=sass ***!
  \*********************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ \"./node_modules/css-loader/lib/css-base.js\")(false);\n// imports\n\n\n// module\nexports.push([module.i, \"\\n.canvas-title {\\n  height: 100%;\\n  padding: 0px 8px 0px 8px;\\n  transition: .3s;\\n  color: var(--text-color);\\n  display: inline-block;\\n  cursor: pointer;\\n}\\n.canvas-title span {\\n    color: rgba(255, 255, 255, 0.6);\\n    margin-left: 5px;\\n}\\n.canvas-title:hover {\\n    background: MINTCREAM;\\n    color: black;\\n}\\n.canvas-title:hover span {\\n      color: rgba(0, 0, 0, 0.6);\\n}\\n.canvas-title.active {\\n  background: MINTCREAM;\\n  color: black;\\n}\\n.canvas-title.active span {\\n    color: rgba(0, 0, 0, 0.6);\\n}\\n\", \"\"]);\n\n// exports\n\n\n//# sourceURL=webpack:///./src/js/components/canvas-title.vue?./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/lib/loader.js??ref--2-2!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/js/components/canvas-title.vue?vue&type=template&id=41ff23c8":
/*!********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/js/components/canvas-title.vue?vue&type=template&id=41ff23c8 ***!
  \********************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\n    \"div\",\n    {\n      staticClass: \"canvas-title\",\n      on: {\n        click: function($event) {\n          _vm.$store.commit(\"canvasActive\", _vm.title)\n        }\n      }\n    },\n    [\n      _vm._v(\"\\n\\t\" + _vm._s(_vm.title) + \"\\n\\t\"),\n      _c(\n        \"span\",\n        {\n          on: {\n            click: function($event) {\n              $event.stopPropagation()\n              _vm.$store.commit(\"canvasClose\", _vm.title)\n            }\n          }\n        },\n        [_vm._v(\"×\")]\n      )\n    ]\n  )\n}\nvar staticRenderFns = []\nrender._withStripped = true\n\n\n\n//# sourceURL=webpack:///./src/js/components/canvas-title.vue?./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/lib/loader.js??ref--2-2!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/js/components/canvas-title.vue?vue&type=style&index=0&lang=sass":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader!./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/lib/loader.js??ref--2-2!./node_modules/vue-loader/lib??vue-loader-options!./src/js/components/canvas-title.vue?vue&type=style&index=0&lang=sass ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// style-loader: Adds some css to the DOM by adding a <style> tag\n\n// load the styles\nvar content = __webpack_require__(/*! !../../../node_modules/css-loader!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/sass-loader/lib/loader.js??ref--2-2!../../../node_modules/vue-loader/lib??vue-loader-options!./canvas-title.vue?vue&type=style&index=0&lang=sass */ \"./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/lib/loader.js??ref--2-2!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/js/components/canvas-title.vue?vue&type=style&index=0&lang=sass\");\nif(typeof content === 'string') content = [[module.i, content, '']];\nif(content.locals) module.exports = content.locals;\n// add the styles to the DOM\nvar add = __webpack_require__(/*! ../../../node_modules/vue-style-loader/lib/addStylesClient.js */ \"./node_modules/vue-style-loader/lib/addStylesClient.js\").default\nvar update = add(\"1d14d641\", content, false, {});\n// Hot Module Replacement\nif(false) {}\n\n//# sourceURL=webpack:///./src/js/components/canvas-title.vue?./node_modules/vue-style-loader!./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/lib/loader.js??ref--2-2!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./src/js/components/canvas-title.vue":
/*!********************************************!*\
  !*** ./src/js/components/canvas-title.vue ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _canvas_title_vue_vue_type_template_id_41ff23c8__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./canvas-title.vue?vue&type=template&id=41ff23c8 */ \"./src/js/components/canvas-title.vue?vue&type=template&id=41ff23c8\");\n/* harmony import */ var _canvas_title_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./canvas-title.vue?vue&type=script&lang=js */ \"./src/js/components/canvas-title.vue?vue&type=script&lang=js\");\n/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _canvas_title_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _canvas_title_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));\n/* harmony import */ var _canvas_title_vue_vue_type_style_index_0_lang_sass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./canvas-title.vue?vue&type=style&index=0&lang=sass */ \"./src/js/components/canvas-title.vue?vue&type=style&index=0&lang=sass\");\n/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"./node_modules/vue-loader/lib/runtime/componentNormalizer.js\");\n\n\n\n\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(\n  _canvas_title_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _canvas_title_vue_vue_type_template_id_41ff23c8__WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _canvas_title_vue_vue_type_template_id_41ff23c8__WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  null,\n  null\n  \n)\n\n/* hot reload */\nif (false) { var api; }\ncomponent.options.__file = \"src\\\\js\\\\components\\\\canvas-title.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./src/js/components/canvas-title.vue?");

/***/ }),

/***/ "./src/js/components/canvas-title.vue?vue&type=script&lang=js":
/*!********************************************************************!*\
  !*** ./src/js/components/canvas-title.vue?vue&type=script&lang=js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_canvas_title_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib!../../../node_modules/vue-loader/lib??vue-loader-options!./canvas-title.vue?vue&type=script&lang=js */ \"./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/js/components/canvas-title.vue?vue&type=script&lang=js\");\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_canvas_title_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_canvas_title_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_canvas_title_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_canvas_title_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));\n /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_canvas_title_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0___default.a); \n\n//# sourceURL=webpack:///./src/js/components/canvas-title.vue?");

/***/ }),

/***/ "./src/js/components/canvas-title.vue?vue&type=style&index=0&lang=sass":
/*!*****************************************************************************!*\
  !*** ./src/js/components/canvas-title.vue?vue&type=style&index=0&lang=sass ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_ref_2_2_node_modules_vue_loader_lib_index_js_vue_loader_options_canvas_title_vue_vue_type_style_index_0_lang_sass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-style-loader!../../../node_modules/css-loader!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/sass-loader/lib/loader.js??ref--2-2!../../../node_modules/vue-loader/lib??vue-loader-options!./canvas-title.vue?vue&type=style&index=0&lang=sass */ \"./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/lib/loader.js??ref--2-2!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/js/components/canvas-title.vue?vue&type=style&index=0&lang=sass\");\n/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_ref_2_2_node_modules_vue_loader_lib_index_js_vue_loader_options_canvas_title_vue_vue_type_style_index_0_lang_sass__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_ref_2_2_node_modules_vue_loader_lib_index_js_vue_loader_options_canvas_title_vue_vue_type_style_index_0_lang_sass__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_ref_2_2_node_modules_vue_loader_lib_index_js_vue_loader_options_canvas_title_vue_vue_type_style_index_0_lang_sass__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_ref_2_2_node_modules_vue_loader_lib_index_js_vue_loader_options_canvas_title_vue_vue_type_style_index_0_lang_sass__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));\n /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_ref_2_2_node_modules_vue_loader_lib_index_js_vue_loader_options_canvas_title_vue_vue_type_style_index_0_lang_sass__WEBPACK_IMPORTED_MODULE_0___default.a); \n\n//# sourceURL=webpack:///./src/js/components/canvas-title.vue?");

/***/ }),

/***/ "./src/js/components/canvas-title.vue?vue&type=template&id=41ff23c8":
/*!**************************************************************************!*\
  !*** ./src/js/components/canvas-title.vue?vue&type=template&id=41ff23c8 ***!
  \**************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_canvas_title_vue_vue_type_template_id_41ff23c8__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./canvas-title.vue?vue&type=template&id=41ff23c8 */ \"./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/js/components/canvas-title.vue?vue&type=template&id=41ff23c8\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_canvas_title_vue_vue_type_template_id_41ff23c8__WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_canvas_title_vue_vue_type_template_id_41ff23c8__WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack:///./src/js/components/canvas-title.vue?");

/***/ })

}]);