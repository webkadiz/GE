(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[8],{

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/js/components/tools/layer-tools.vue?vue&type=script&lang=js":
/*!***********************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/js/components/tools/layer-tools.vue?vue&type=script&lang=js ***!
  \***********************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
  methods: {
    layerUp() {
      let index;
      this.c.bringForward(this.activeLayer.group);
      index = this.c.getObjects().findIndex(object => object === this.activeLayer.group);
      this.layers.splice(index, 0, this.layers.remove(this.activeLayer));
    },
    layerDown() {
      let index;
      this.c.sendBackwards(this.activeLayer.group);
      index = this.c.getObjects().findIndex(object => object === this.activeLayer.group);
      this.layers.splice(index, 0, this.layers.remove(this.activeLayer));
    },
    layerNew() {},
    layerDelete() {
      this.c.remove(this.activeLayer.group);
      this.layers.remove(this.activeLayer);
      this.canvas.activeLayer = null;
    },
    activeLayerAlias(e, layer) {
      this.canvas.activeLayer = layer;
      if (e.target.tagName === "IMG") {
        layer.visible = layer.group.visible = !layer.group.visible;
        this.c.renderAll();
      }
    }
  },
  mounted() {
    new Sortable(this.$refs.layers, {
      onUpdate: e => {

        this.layers.splice(e.newIndex, 0, this.layers.removeIndex(e.oldIndex));
        this.layers[e.newIndex].group.moveTo(e.newIndex);

        console.log(this.c.getObjects());
      }
    });
  },
  computed: _extends({
    activeLayer() {
      return this.canvas.activeLayer;
    },
    layers() {
      if (this.canvas) return this.canvas.layers;
      return [];
    },
    c() {
      return this.canvas.c;
    }
  }, Vuex.mapState(["canvas"])),
  data() {
    return {
      layerTools: [{ img: "arrow-up.png", event: this.layerUp }, { img: "arrow-down.png", event: this.layerDown }, { img: "add-layer.png", event: this.layerNew }, { img: "delete.png", event: this.layerDelete }],
      layerActive: null,
      reverse: reverse
    };
  }
};

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/lib/loader.js??ref--2-2!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/js/components/tools/layer-tools.vue?vue&type=style&index=0&lang=sass":
/*!**************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/lib/loader.js??ref--2-2!./node_modules/vue-loader/lib??vue-loader-options!./src/js/components/tools/layer-tools.vue?vue&type=style&index=0&lang=sass ***!
  \**************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n.layer-wrapper {\n  background: #535353;\n}\n.layer-wrapper .layers {\n    display: flex;\n    flex-direction: column-reverse;\n}\n.layer-wrapper .layers .layer {\n      position: relative;\n      padding: 10px 6px;\n      display: flex;\n      align-items: center;\n      color: white;\n      background: #535353;\n      border-bottom: 1px solid #8F9491;\n}\n.layer-wrapper .layers .layer img {\n        padding-right: 13px;\n}\n.layer-wrapper .layers .layer::after {\n      content: '';\n      position: absolute;\n      height: 100%;\n      top: 0;\n      left: 28px;\n      border-right: 1px solid #8F9491;\n}\n.layer-wrapper .layers .layer.active {\n      background: #424242;\n}\n.layers-tools {\n  display: flex;\n}\n.layers-tools .layers-tool {\n    padding: 5px;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/js/components/tools/layer-tools.vue?vue&type=template&id=5a62f296":
/*!*************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/js/components/tools/layer-tools.vue?vue&type=template&id=5a62f296 ***!
  \*************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "layer-wrapper" }, [
    _c(
      "div",
      { ref: "layers", staticClass: "layers" },
      _vm._l(_vm.layers, function(layer) {
        return _c(
          "div",
          {
            key: layer.id,
            class: ["layer", { active: _vm.activeLayer === layer }],
            attrs: { "data-id": layer.id },
            on: {
              click: function($event) {
                _vm.activeLayerAlias($event, layer)
              }
            }
          },
          [
            _c("img", {
              attrs: {
                src: "img/" + (layer.visible ? "eye.png" : "eye-cross.png"),
                alt: "eye"
              }
            }),
            _vm._v("\n\t\t\t" + _vm._s(layer.title) + "\n\t\t")
          ]
        )
      })
    ),
    _vm._v(" "),
    _vm.$store.state.canvas
      ? _c(
          "div",
          { staticClass: "layers-tools" },
          _vm._l(_vm.layerTools, function(layerTool, index) {
            return _c(
              "div",
              {
                key: index,
                staticClass: "layers-tool bg-anim-icon",
                on: { click: layerTool.event }
              },
              [_c("img", { attrs: { src: "img/" + layerTool.img } })]
            )
          })
        )
      : _vm._e()
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/lib/loader.js??ref--2-2!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/js/components/tools/layer-tools.vue?vue&type=style&index=0&lang=sass":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader!./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/lib/loader.js??ref--2-2!./node_modules/vue-loader/lib??vue-loader-options!./src/js/components/tools/layer-tools.vue?vue&type=style&index=0&lang=sass ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../../node_modules/css-loader!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/sass-loader/lib/loader.js??ref--2-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./layer-tools.vue?vue&type=style&index=0&lang=sass */ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/lib/loader.js??ref--2-2!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/js/components/tools/layer-tools.vue?vue&type=style&index=0&lang=sass");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("b6cce2ac", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./src/js/components/tools/layer-tools.vue":
/*!*************************************************!*\
  !*** ./src/js/components/tools/layer-tools.vue ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _layer_tools_vue_vue_type_template_id_5a62f296__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./layer-tools.vue?vue&type=template&id=5a62f296 */ "./src/js/components/tools/layer-tools.vue?vue&type=template&id=5a62f296");
/* harmony import */ var _layer_tools_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./layer-tools.vue?vue&type=script&lang=js */ "./src/js/components/tools/layer-tools.vue?vue&type=script&lang=js");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _layer_tools_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _layer_tools_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _layer_tools_vue_vue_type_style_index_0_lang_sass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./layer-tools.vue?vue&type=style&index=0&lang=sass */ "./src/js/components/tools/layer-tools.vue?vue&type=style&index=0&lang=sass");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _layer_tools_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _layer_tools_vue_vue_type_template_id_5a62f296__WEBPACK_IMPORTED_MODULE_0__["render"],
  _layer_tools_vue_vue_type_template_id_5a62f296__WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src\\js\\components\\tools\\layer-tools.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/js/components/tools/layer-tools.vue?vue&type=script&lang=js":
/*!*************************************************************************!*\
  !*** ./src/js/components/tools/layer-tools.vue?vue&type=script&lang=js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_layer_tools_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib!../../../../node_modules/vue-loader/lib??vue-loader-options!./layer-tools.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/js/components/tools/layer-tools.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_layer_tools_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_layer_tools_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_layer_tools_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_layer_tools_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_layer_tools_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/js/components/tools/layer-tools.vue?vue&type=style&index=0&lang=sass":
/*!**********************************************************************************!*\
  !*** ./src/js/components/tools/layer-tools.vue?vue&type=style&index=0&lang=sass ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_ref_2_2_node_modules_vue_loader_lib_index_js_vue_loader_options_layer_tools_vue_vue_type_style_index_0_lang_sass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-style-loader!../../../../node_modules/css-loader!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/sass-loader/lib/loader.js??ref--2-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./layer-tools.vue?vue&type=style&index=0&lang=sass */ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/lib/loader.js??ref--2-2!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/js/components/tools/layer-tools.vue?vue&type=style&index=0&lang=sass");
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_ref_2_2_node_modules_vue_loader_lib_index_js_vue_loader_options_layer_tools_vue_vue_type_style_index_0_lang_sass__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_ref_2_2_node_modules_vue_loader_lib_index_js_vue_loader_options_layer_tools_vue_vue_type_style_index_0_lang_sass__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_ref_2_2_node_modules_vue_loader_lib_index_js_vue_loader_options_layer_tools_vue_vue_type_style_index_0_lang_sass__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_ref_2_2_node_modules_vue_loader_lib_index_js_vue_loader_options_layer_tools_vue_vue_type_style_index_0_lang_sass__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_ref_2_2_node_modules_vue_loader_lib_index_js_vue_loader_options_layer_tools_vue_vue_type_style_index_0_lang_sass__WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/js/components/tools/layer-tools.vue?vue&type=template&id=5a62f296":
/*!*******************************************************************************!*\
  !*** ./src/js/components/tools/layer-tools.vue?vue&type=template&id=5a62f296 ***!
  \*******************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_layer_tools_vue_vue_type_template_id_5a62f296__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./layer-tools.vue?vue&type=template&id=5a62f296 */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/js/components/tools/layer-tools.vue?vue&type=template&id=5a62f296");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_layer_tools_vue_vue_type_template_id_5a62f296__WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_layer_tools_vue_vue_type_template_id_5a62f296__WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=8.build.js.map