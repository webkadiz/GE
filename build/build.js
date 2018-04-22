/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/class_create_element.js":
/*!************************************!*\
  !*** ./js/class_create_element.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Create_Element = function () {
  function Create_Element(_ref) {
    var tag_name = _ref.tag_name;

    _classCallCheck(this, Create_Element);

    console.log(123);
    this.elem = document.createElement(tag_name);
    return this;
  }

  _createClass(Create_Element, [{
    key: "add_classes",
    value: function add_classes() {
      for (var _len = arguments.length, classes = Array(_len), _key = 0; _key < _len; _key++) {
        classes[_key] = arguments[_key];
      }

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = classes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var value = _step.value;

          this.elem.classList.add(value);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return this;
    }
  }]);

  return Create_Element;
}();

exports.default = Create_Element;

/***/ }),

/***/ "./js/paint.js":
/*!*********************!*\
  !*** ./js/paint.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _settings_func = __webpack_require__(/*! ./settings_func */ "./js/settings_func.js");

var _class_create_element = __webpack_require__(/*! ./class_create_element */ "./js/class_create_element.js");

var _class_create_element2 = _interopRequireDefault(_class_create_element);

__webpack_require__(/*! style-loader!css-loader!../build/css/main.css */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./build/css/main.css");

__webpack_require__(/*! style-loader!css-loader!../build/css/animate.css */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./build/css/animate.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// переменные DOM-елементов
var html = document.documentElement; // html
var header = document.querySelector("header"); // вся шапка
var title = document.querySelector(".title-canvas-wrapper");
var menu_bar = document.querySelector(".options"); //самое верхнее меня с настройками
var all_apply_button = document.querySelectorAll(".apply"); // все кнопки подтвердить
var script = document.querySelector("script"); // последний script на странице

// переменные канваса
var wrapper = document.querySelector(".wrapper"); //конечный wrapper
var wrapper_coords_x = document.querySelector(".coords-x-wrapper");
var wrapper_coords_y = document.querySelector(".coords-y-wrapper");

var actual_canvas = void 0; //текущий канвас на экране
var template_canvas = void 0; // шаблон для всех канвасов
var zoom_wrapper = void 0; // обертка которая помогает реализовать zoom
var canvas_wrapper = void 0; //обертка канвасов
var canvas = void 0; //главный канвас
var c = void 0; //контекст главного канваса

var new_canvas = void 0; // новый canvas который создается в функции create_canvas
var new_c = void 0; //новый контекст который создается в функции create_canvas

// переменные помогающие запоминать предыдущий элемент
var counter = 0; // просто счетчик если понадобится
var prev_target = void 0; // предыдущая нажатая иконка , в обработчике на .main-nav - шапка painta
var temp_target = void 0; // предыдущий канвас , используется в функции move_canvas
var prev_title = void 0;

// все статические высоты
var wrapper_add_size = 400;
var height_title_file = 25; // константная высота менюшки с файлами
var height_menu_bar = 30; //константная высота менюшки
var wrapper_coords_w_h = 20; // ширина и высоты системы координат

var height_header = 40; //  ширина шапки
var wrapper_top_tools = 20;
var wrapper_left_tools = 20;

// переменные , которые реализуют zoom
var zoom = 1; // множитель зума
var divide_width = 1; // отношения ширины холста к ширине экрана
var bias_left = 0; // смещение слева
var bias_top = 0; // смещение сверху

// массивы хранящие все действия пользователя
var arr_canvas = []; // все созданные канвасы , именно как созданные файлы
var clear_coords = []; // координаты пройденные с помощью ластика
var arr_textarea = []; // все созданные текстовые поля в функции create_textarea

var path = []; // все пути которые можно рисовать
var all_path = []; // обсолютно все

var path_delete = []; // удаленные пути через ctrl-z
var arr_context = []; // все контексты которые создаются

//все значки с функциями для делегирования из .nav-options

var arr_settings = [{
  class_badge: "options-new-file",
  class_settings: "settings-new-file",
  class_value: " .input-wrapper input",
  value_name: ["name", "width", "height"],

  appear_func: function appear_func() {
    var elem = document.querySelector("." + this.class_settings);

    var value = new Init_Value(this.class_settings, this.class_value, this.value_name);

    elem.style.display = "block";
    elem.classList.remove("zoomOut");
    elem.classList.add("zoomIn");

    //console.log(arr_canvas[arr_canvas.length - 1].canvas_name.slice(-1, -2));

    value.name.value = "Untitled-" + Init_Canvas.counter;

    value.width.value = html.clientWidth;
    value.height.value = html.clientHeight;

    new Centering_Element().all(elem);
  },

  service_func: function service_func() {
    title.style.display = "block";
    wrapper.style.display = "block";

    zoom_wrapper.style.display = "none";

    try {
      prev_title.classList.remove("active");
      wrapper_coords_x.querySelector(".coords-x").remove();
      wrapper_coords_y.querySelector(".coords-y").remove();
    } catch (e) {}

    var value = new Init_Value(this.class_settings, this.class_value, this.value_name).init();

    // новый титл в шапке
    var new_title = document.createElement("div");
    new_title.classList.add("title-canvas");
    new_title.classList.add("active");

    new_title.setAttribute("data-canvas-name", value.name);
    new_title.innerHTML = value.name + "<span>&times;</span>";

    title.appendChild(new_title);

    prev_title = new_title;

    // клонирование канваса
    var new_main_canvas = template_canvas.zoom_wrapper.cloneNode(true);

    new_main_canvas.setAttribute("data-canvas-name", value.name);

    new_main_canvas = new Init_Canvas(new_main_canvas, new_title).init().block().add_wrapper().init_size(value.width, value.height);

    wrapper.style.height = html.clientHeight - (0, _settings_func.get_height)(header) + "px";

    new Centering_Element().all_elem(zoom_wrapper, wrapper, wrapper_left_tools, wrapper_top_tools);

    new Init_Wrapper(new_main_canvas).check().init_coords();

    get_zoom();
    get_bias();

    arr_canvas.push(new_main_canvas);
  }
}, {
  class_badge: "options-window-size",
  class_settings: "settings-window-size",
  class_value: " .input-wrapper input",
  value_name: ["width", "height"],
  appear_func: function appear_func() {
    var elem = document.querySelector("." + this.class_settings);

    var value = new Init_Value(this.class_settings, this.class_value, this.value_name);

    value.width.value = canvas.width;
    value.height.value = canvas.height;

    elem.style.display = "block";
    elem.classList.remove("zoomOut");
    elem.classList.add("zoomIn");

    new Centering_Element().all(elem);
  },

  service_func: function service_func() {
    var value = new Init_Value(this.class_settings, this.class_value, this.value_name).init();

    new Init_Canvas(zoom_wrapper).init_size(value.width, value.height);

    new Centering_Element().all_elem(zoom_wrapper, wrapper, wrapper_left_tools, wrapper_top_tools);

    new Init_Wrapper().check().change_coords();

    get_zoom();
    get_bias();
  }
}];
// все значки с функциями для делегирования из tools
var arr_class = [{
  class: "pencil-badge",
  func: draw_pencil,
  event: "mousedown"
}, {
  class: "rubber-badge",
  func: moveToRubber,
  event: "mousedown",
  string: "add",
  service_func: function service_func(string) {
    if (string == "remove") {
      canvas_wrapper.classList.remove("rubber-canvas-active");
      this.string = "add";
    } else if (string == "add") {
      canvas_wrapper.classList.add("rubber-canvas-active");
      this.string = "remove";
    }
  }
}, {
  class: "text-badge",
  func: text_click,
  event: "dblclick"
}, {
  class: "pouring-badge",
  func: fill,
  event: "mousedown"
}, {
  class: "square-badge",
  func: beginRect,
  event: "mousedown"
}, {
  class: "line-badge",
  func: draw_line,
  event: "mousedown"
}, {
  class: "move-badge",
  func: move_canvas,
  event: "mousedown",
  service_func: function service_func() {
    if (temp_target) {
      temp_target.style.border = "";
    }
    temp_target = undefined;
  }
}];

// блок объявления классов

var Tools_Component = function () {
  function Tools_Component(_ref) {
    var wrapper = _ref.wrapper;

    _classCallCheck(this, Tools_Component);

    this.wrapper = wrapper;
    this.drag_panel;
    this.drag_place;
  }

  _createClass(Tools_Component, [{
    key: "create_drag_panel",
    value: function create_drag_panel(drag_panel_func) {
      var _this = this;

      var _add_classes = new _class_create_element2.default({ tag_name: "div" }).add_classes("drag-panel"),
          panel = _add_classes.elem;

      var _add_classes2 = new _class_create_element2.default({ tag_name: "div" }).add_classes("drag-panel-arrow", "drag-panel-item"),
          arrow = _add_classes2.elem;

      var _add_classes3 = new _class_create_element2.default({ tag_name: "div" }).add_classes("drag-panel-close", "drag-panel-item"),
          close = _add_classes3.elem;

      arrow.innerHTML = "<img width=11 height=11 src='img/rewind.png' />";

      close.onclick = function () {
        return none(_this.wrapper);
      };

      arrow.onclick = function (e) {
        arrow.classList.toggle("drag-panel-arrow-active");
        drag_panel_func();
      };

      panel.appendChild(arrow);
      panel.appendChild(close);

      this.drag_panel = panel;

      this.wrapper.prepend(panel);

      return this;
    }
  }, {
    key: "create_drag_place",
    value: function create_drag_place() {
      var _add_classes4 = new _class_create_element2.default({ tag_name: "div" }).add_classes("drag-place"),
          place = _add_classes4.elem;

      place.innerHTML = '<img src="./img/drag.png" />';

      drag(place, this.wrapper);

      this.drag_panel.after(place);

      this.drag_place = place;
    }
  }, {
    key: "create_menu_bar",
    value: function create_menu_bar() {}
  }, {
    key: "create_footer_bar",
    value: function create_footer_bar() {}
  }]);

  return Tools_Component;
}();

var Tools_Draw = function (_Tools_Component) {
  _inherits(Tools_Draw, _Tools_Component);

  function Tools_Draw(_ref2) {
    var _this2;

    var wrapper = _ref2.wrapper;

    _classCallCheck(this, Tools_Draw);

    (_this2 = _possibleConstructorReturn(this, (Tools_Draw.__proto__ || Object.getPrototypeOf(Tools_Draw)).call(this, { wrapper: wrapper })), _this2).create_drag_panel(switcher(_this2.drag_panel_func.bind(_this2), 2, 0.5)).create_drag_place();

    _this2.wrapper.set_left(100);
    _this2.wrapper.set_top(80);

    console.log(_this2);
    return _this2;
  }

  _createClass(Tools_Draw, [{
    key: "drag_panel_func",
    value: function drag_panel_func(value) {
      this.wrapper.style.width = (0, _settings_func.get_width)(this.wrapper) * value + "px";
    }
  }]);

  return Tools_Draw;
}(Tools_Component);

var Init_Wrapper = function () {
  function Init_Wrapper(canvas) {
    _classCallCheck(this, Init_Wrapper);

    this.canvas = canvas;
    this.where_add;
    this.first;
    this.last;
    this.arr_coords;
    this.decision;
    this.get_size;
    return this;
  }

  _createClass(Init_Wrapper, [{
    key: "init_coords",
    value: function init_coords() {
      var width_breakdown = 50;
      var wrapper_coords = void 0;
      // инициализация координат по оси Y

      wrapper_coords = document.createElement("div");

      wrapper_coords.classList.add("coords-y");

      this.canvas.coords_y = wrapper_coords; //приклепляем к канвасу div-координат-y

      this.init_value = { elem: wrapper_coords };

      this.create_coords_block(get_top(zoom_wrapper), "height", width_breakdown, wrapper_top_tools);

      wrapper_coords_y.appendChild(wrapper_coords);

      // инициализация координат по оси X

      wrapper_coords = document.createElement("div");

      wrapper_coords.classList.add("coords-x");

      this.canvas.coords_x = wrapper_coords; //приклепляем к канвасу div-координат-x

      this.init_value = { elem: wrapper_coords };

      this.create_coords_block(get_left(zoom_wrapper), "width", width_breakdown, wrapper_left_tools);

      wrapper_coords_x.appendChild(wrapper_coords);

      return this;
    }
  }, {
    key: "create_coords_block",
    value: function create_coords_block(size, size_decision, breakdown, size_tools) {
      var size_begin = size - size_tools;
      var size_end = void 0;
      var size_end_counter = 0;
      var size_value = breakdown;
      var first_iter = true;

      if (size_decision == "height") {
        size_end = wrapper.scrollHeight - size;
      } else if (size_decision == "width") {
        size_end = wrapper.scrollWidth - size;
      }

      while (size_begin >= breakdown) {
        var text = "";
        if (size_begin % breakdown == 0) {
          text = size_begin;

          size_value = breakdown;
          size_begin -= breakdown;
        } else {
          size_value = size_begin % breakdown;
          size_begin -= size_value;
        }

        this.create_coords_div(size_decision, size_value, text);
      }

      while (size_end_counter < size_end) {
        var _text = "";

        _text = size_end_counter;

        if (size_end - size_end_counter < breakdown) {
          size_value = size_end % breakdown;

          this.create_coords_div(size_decision, size_value);
        } else {
          if (first_iter) {
            if (size_decision == "width") {
              actual_canvas.zero_coords_elem_x = this.create_coords_div(size_decision, size_value, _text);
            } else if (size_decision == "height") {
              actual_canvas.zero_coords_elem_y = this.create_coords_div(size_decision, size_value, _text);
            }

            first_iter = false;
          } else {
            this.create_coords_div(size_decision, size_value, _text);
          }
        }

        size_end_counter += breakdown;
      }
    }
  }, {
    key: "change_coords",
    value: function change_coords() {
      var arr_coords_x = actual_canvas.coords_x.children,
          arr_coords_y = actual_canvas.coords_y.children,
          coefficient_x = zoom_wrapper.clientWidth / actual_canvas.prev_zoom_wrapper_width,
          // коэффициент-x
      coefficient_y = zoom_wrapper.clientHeight / actual_canvas.prev_zoom_wrapper_height; // коэффициент-y

      // устанавливаем div , куда добавлять элементы
      this.init_value = {
        elem: actual_canvas.coords_x,
        decision: "width",
        get_size: _settings_func.get_width
      };
      //изменили ширину каждой координаты в зависимости от коэффициента

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = arr_coords_x[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var item = _step.value;

          item.style.width = (0, _settings_func.get_width)(item) * coefficient_x + "px";
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      this.check_coords();

      this.init_value = {
        elem: actual_canvas.coords_y,
        decision: "height",
        get_size: _settings_func.get_height
      };

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = arr_coords_y[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var _item = _step2.value;

          _item.style.height = (0, _settings_func.get_height)(_item) * coefficient_y + "px";
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      this.check_coords();
    }
  }, {
    key: "check_coords",
    value: function check_coords() {
      var difference_width_begin = void 0;
      var difference_width_end = void 0;

      var text_begin = parseFloat(this.first.nextElementSibling.textContent.replace(/\n/g, "")) || 0;
      var text_end = parseFloat(this.last.previousElementSibling.textContent.replace(/\n/g, "")) || 0;

      if (this.decision == "width") {
        difference_width_begin = actual_canvas.zero_coords_elem_x.getBoundingClientRect().left - zoom_wrapper.getBoundingClientRect().left;
      } else if (this.decision == "height") {
        difference_width_begin = actual_canvas.zero_coords_elem_y.getBoundingClientRect().top - zoom_wrapper.getBoundingClientRect().top;
      }

      if (difference_width_begin > 0) {
        //check start
        this.check_positive(difference_width_begin, this.first);

        if (this.decision == "width") {
          difference_width_end = wrapper.scrollWidth - (0, _settings_func.get_width)(wrapper_coords_x);
        } else if (this.decision == "height") {
          difference_width_end = wrapper.scrollHeight - (0, _settings_func.get_height)(wrapper_coords_y);
        }

        //check end
        this.check_positive(difference_width_end, this.last);
      } else {
        //difference_width_begin < 0
        difference_width_begin = Math.abs(difference_width_begin);

        // check_start
        this.check_negative(difference_width_begin, this.first, text_begin, true);

        if (this.decision == "width") {
          difference_width_end = wrapper_coords_x.getBoundingClientRect().right - this.last.getBoundingClientRect().right;
        } else if (this.decision == "height") {
          difference_width_end = wrapper_coords_y.getBoundingClientRect().bottom - this.last.getBoundingClientRect().bottom;
        }
        //check end
        this.check_negative(difference_width_end, this.last, text_end, false);
      }
    }
  }, {
    key: "check_positive",
    value: function check_positive(difference, elem) {
      while (difference > this.get_size(elem)) {
        difference -= this.get_size(elem);

        var temp = elem.nextElementSibling || elem.previousElementSibling;

        elem.remove();

        elem = temp;
      }

      elem.style[this.decision] = this.get_size(elem) - difference + "px";

      elem.innerHTML = "";
    }
  }, {
    key: "check_negative",
    value: function check_negative(difference, elem, text, flag) {
      var middle_width = this.get_size(this.arr_coords[Math.round(this.arr_coords.length / 2)]);

      if (this.get_size(elem) + difference > middle_width) {
        difference -= middle_width - this.get_size(elem);

        text += 50;

        elem.remove();

        this.create_coords_div(this.decision, middle_width, text, flag);

        while (difference > middle_width) {
          text += 50;

          this.create_coords_div(this.decision, middle_width, text, flag);

          difference -= middle_width;
        }

        this.create_coords_div(this.decision, difference, "", flag);
      } else {
        elem.style[this.decision] = this.get_size(elem) + difference + "px";
        elem.innerHTML = "";
      }
    }
  }, {
    key: "create_coords_div",
    value: function create_coords_div(flag, size) {
      var text = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
      var add_begin = arguments[3];

      var temp_div = document.createElement("div");

      if (flag == "width") {
        temp_div.style.width = size + "px";
      } else if (flag == "height") {
        temp_div.style.height = size + "px";
        text = Array.prototype.reduce.call(String(text), function (res, item) {
          return res + item + "\n";
        }, "");
      }

      temp_div.textContent = text;

      if (add_begin) {
        this.where_add.insertBefore(temp_div, this.where_add.firstElementChild);
      } else {
        this.where_add.appendChild(temp_div);
      }

      return temp_div;
    }
  }, {
    key: "event_scroll",
    value: function event_scroll() {
      wrapper.addEventListener("scroll", function (e) {
        wrapper_coords_x.style.top = wrapper.scrollTop + "px";
      });
      return this;
    }
  }, {
    key: "check",
    value: function check() {
      if (get_left(zoom_wrapper) < wrapper_left_tools && get_top(zoom_wrapper) < wrapper_top_tools) {
        wrapper_coords_x.style.width = zoom_wrapper.clientWidth + wrapper_add_size + "px";

        wrapper_coords_y.style.height = zoom_wrapper.clientHeight + wrapper_add_size + "px";

        new Centering_Element().const_center(zoom_wrapper, wrapper_add_size / 2, wrapper_add_size / 2);
      } else if (get_left(zoom_wrapper) < wrapper_left_tools) {
        wrapper_coords_x.style.width = zoom_wrapper.clientWidth + wrapper_add_size + "px";

        if (get_top(zoom_wrapper) > wrapper_top_tools) {
          wrapper_coords_y.style.width = wrapper.clientHeight + "px";
        }

        new Centering_Element().top(zoom_wrapper, wrapper_add_size / 2, wrapper, wrapper_top_tools);
      } else if (get_top(zoom_wrapper) < wrapper_top_tools) {
        wrapper_coords_y.style.height = zoom_wrapper.clientHeight + wrapper_add_size + "px";

        if (get_left(zoom_wrapper) > wrapper_left_tools) {
          wrapper_coords_x.style.width = wrapper.clientWidth + "px";
        }

        new Centering_Element().left(zoom_wrapper, wrapper_add_size / 2, wrapper, wrapper_left_tools);
      } else {
        wrapper_coords_x.style.width = wrapper.clientWidth + "px";
        wrapper_coords_y.style.height = wrapper.clientHeight + "px";
      }

      return this;
    }
  }, {
    key: "init_value",
    set: function set(options) {
      try {
        this.where_add = options.elem || this.where_add;
        this.first = options.elem.firstElementChild || this.where_add.firstElementChild;
        this.last = options.elem.lastElementChild || this.where_add.lastElementChild;
        this.arr_coords = options.elem.children || this.where_add.children;
        this.decision = options.decision || this.decision;
        this.get_size = options.get_size || this.get_size;
      } catch (e) {}
    }
  }]);

  return Init_Wrapper;
}();

var Init_Value = function () {
  function Init_Value(class_settings, selector_value, name_value) {
    var _this3 = this;

    _classCallCheck(this, Init_Value);

    this.class_settings = class_settings;
    this.value = document.querySelectorAll("." + class_settings + selector_value);
    this.name_value = name_value;

    this.name_value.forEach(function (item, i) {
      _this3[item] = _this3.value[i];
    });

    return this;
  }

  _createClass(Init_Value, [{
    key: "init",
    value: function init() {
      var _this4 = this;

      this.name_value.forEach(function (item, i) {
        _this4[item] = _this4.value[i].value;
      });
      return this;
    }
  }]);

  return Init_Value;
}();

var Init_Canvas = function () {
  function Init_Canvas(new_canvas, new_title) {
    _classCallCheck(this, Init_Canvas);

    if (new_canvas instanceof Init_Canvas) {
      return new_canvas;
    } else {
      this.all_path = [];
      this.path = [];
      this.arr_context = [];

      this.zoom_wrapper = new_canvas;
      this.canvas_wrapper = new_canvas.firstElementChild;
      this.canvas = new_canvas.firstElementChild.firstElementChild;
      this.c = this.canvas.getContext("2d");
      this.canvas_name = new_canvas.dataset.canvasName;

      this.title = new_title;

      Init_Canvas.counter++;
    }

    return this;
  }

  _createClass(Init_Canvas, [{
    key: "init",
    value: function init() {
      all_path = this.all_path;
      path = this.path;
      arr_context = this.arr_context;

      actual_canvas = this;
      zoom_wrapper = this.zoom_wrapper;
      canvas_wrapper = this.canvas_wrapper;
      canvas = this.canvas;
      c = this.c;

      return this;
    }
  }, {
    key: "init_size",
    value: function init_size(width, height) {
      this.canvas_wrapper.style.width = (parseFloat(width || 0) || 0) + "px";
      this.canvas_wrapper.style.height = (parseFloat(height || 0) || 0) + "px";

      this.canvas.width = width;
      this.canvas.height = height;
      return this;
    }
  }, {
    key: "init_coords",
    value: function init_coords() {
      try {
        wrapper_coords_x.querySelector(".coords-x").remove();
        wrapper_coords_y.querySelector(".coords-y").remove();
      } catch (e) {}
      wrapper_coords_x.appendChild(this.coords_x);
      wrapper_coords_y.appendChild(this.coords_y);

      return this;
    }
  }, {
    key: "block",
    value: function block() {
      this.zoom_wrapper.style.display = "inline-block";
      return this;
    }
  }, {
    key: "none",
    value: function none() {
      this.zoom_wrapper.style.display = "none";
      return this;
    }
  }, {
    key: "add_title_class",
    value: function add_title_class() {
      this.title.classList.add("active");
      prev_title = this.title;
      return this;
    }
  }, {
    key: "remove_title_class",
    value: function remove_title_class() {
      this.title.classList.remove("active");
      return this;
    }
  }, {
    key: "add_wrapper",
    value: function add_wrapper() {
      wrapper.appendChild(this.zoom_wrapper);
      return this;
    }
  }]);

  return Init_Canvas;
}();

// блок инизиализация в начале программы

Init_Canvas.counter = 0; // счетчик канвасов

template_canvas = new Init_Canvas(document.querySelector(".zoom-wrapper")).init();

new Init_Wrapper().event_scroll();

var tools = new Tools_Draw({
  wrapper: document.querySelector(".tools-wrapper")
});

// просто задаем стили в HTML
menu_bar.style.height = height_menu_bar + "px";

title.style.height = height_title_file + "px";

canvas_wrapper.style.zoom = 1;

// обработчик на каждую кнопку подтвердить с соответствующей функцией из массива arr_settings
all_apply_button.forEach(function (item) {
  item.addEventListener("click", function (e) {
    var target = item.parentElement;
    target.classList.remove("zoomIn");
    target.classList.add("zoomOut");

    arr_settings.forEach(function (item) {
      if (target.classList.contains(item.class_settings)) {
        item.service_func();
      }
    });

    setTimeout(function () {
      target.style.display = "";
    }, 500);
  });
});

title.addEventListener("click", function (e) {
  var target = e.target;
  var all_title = title.querySelectorAll(".title-canvas");

  for (var i = 0; i < arr_canvas.length; i++) {
    if (target.getAttribute("data-canvas-name") == arr_canvas[i].canvas_name) {
      new Init_Canvas(arr_canvas[i]).init().block().add_title_class().init_coords();

      get_zoom();
      get_bias();
    } else {
      arr_canvas[i].remove_title_class();
      arr_canvas[i].none();
    }
  }

  if (target.tagName == "SPAN") {
    target = target.closest(".title-canvas");
    for (var _i = 0; _i < arr_canvas.length; _i++) {
      if (target.getAttribute("data-canvas-name") == arr_canvas[_i].canvas_name) {
        arr_canvas[_i].title.remove();
        arr_canvas[_i].zoom_wrapper.remove();

        arr_canvas.splice(_i, 1);

        if (arr_canvas[_i]) {
          new Init_Canvas(arr_canvas[_i]).init().block().add_title_class().init_coords();
        } else if (arr_canvas[_i - 1]) {
          console.log(123);
          new Init_Canvas(arr_canvas[_i - 1]).init().block().add_title_class().init_coords();
        } else {
          title.style.display = "none";
          wrapper.style.display = "none";
        }

        get_zoom();
        get_bias();
      } else {
        arr_canvas[_i].none();
      }
    }
  }
});

document.querySelector(".options").addEventListener("click", function (e) {
  e.preventDefault();
  var target = e.target;

  for (var i = 0; i < arr_settings.length; i++) {
    if (e.target.classList.contains(arr_settings[i].class_badge)) {
      arr_settings[i].appear_func();
    }
  }
});

// используем делегирование на шапке painta

try {
  document.querySelector(".tools-wrapper").onclick = function (e) {
    var target = e.target;
    var new_target = void 0;

    e.preventDefault();
    counter = 0;

    function check() {
      if (prev_target) {
        canvas_wrapper.removeEventListener(prev_target.arr_class.event, prev_target.arr_class.func);
        if (prev_target.arr_class.service_func) {
          prev_target.arr_class.service_func(prev_target.arr_class.string);
        }
        prev_target.target.classList.remove("active");
      }
    }

    for (var i = 0; i < arr_class.length; i++) {
      new_target = target.closest("." + arr_class[i].class);

      if (new_target) {
        counter++;

        check();

        canvas_wrapper.addEventListener(arr_class[i].event, arr_class[i].func);

        if (arr_class[i].service_func) {
          arr_class[i].service_func(arr_class[i].string);
        }

        prev_target = {
          target: document.querySelector("." + arr_class[i].class),
          arr_class: arr_class[i]
        };

        new_target.classList.add("active");
      }
    }

    if (counter == 0) {
      check();
      prev_target = null;
    }
  };
} catch (e) {}

document.addEventListener("keydown", function (e) {
  if (e.keyCode == 90 && e.ctrlKey || e.keyCode == 90 && e.metaKey) {
    path_remove();
  }

  // увеличение масштаба
  if (e.keyCode == 187 && e.ctrlKey && e.altKey) {
    actual_canvas.prev_zoom_wrapper_width = (0, _settings_func.get_width)(zoom_wrapper);
    actual_canvas.prev_zoom_wrapper_height = (0, _settings_func.get_height)(zoom_wrapper);

    canvas_wrapper.style.zoom = parseFloat(canvas_wrapper.style.zoom) + 0.05;

    new Centering_Element().all_elem(zoom_wrapper, wrapper, wrapper_left_tools, wrapper_top_tools);

    new Init_Wrapper().check().change_coords();

    get_zoom();
    get_bias();
  }
  // уменьшение масштаба
  if (e.keyCode == 189 && e.ctrlKey && e.altKey) {
    actual_canvas.prev_zoom_wrapper_width = (0, _settings_func.get_width)(zoom_wrapper);
    actual_canvas.prev_zoom_wrapper_height = (0, _settings_func.get_height)(zoom_wrapper);

    canvas_wrapper.style.zoom = parseFloat(canvas_wrapper.style.zoom) - 0.05;

    new Centering_Element().all_elem(zoom_wrapper, wrapper, wrapper_left_tools, wrapper_top_tools);

    new Init_Wrapper().check().change_coords();

    get_zoom();
    get_bias();
  }
});

// удаление пути через ctrl-z
function path_remove() {
  arr_context.forEach(function (item) {
    item.width = item.width;
    item.height = item.height;
  });

  canvas.width = canvas.width;
  canvas.height = canvas.height;

  var all_path_last = all_path[all_path.length - 1];
  var path_last = path[path.length - 1];

  // возвращаем canvas на прежнее место после передвижения
  if (all_path_last && all_path_last.move_canvas) {
    all_path_last.target.style.left = all_path_last.left;
    all_path_last.target.style.top = all_path_last.top;
  }

  // удаляем путь ластика если он есть
  if (all_path_last && all_path_last.clear) {
    clear_coords.pop();
  }

  // удаляем цвет если есть
  if (all_path_last && all_path_last.fill_pop) {
    all_path_last.target.fillStyle.pop();
  }

  //если это путь то выкидываем еще и из массива путей , которые можно рисовать
  //и проверяем надо ли удалить елемент из DOM-дерева
  if (all_path_last && all_path_last.isPath) {
    if (path_last && path_last.remove) {
      path_last.remove.remove();
    }
    console.log(all_path);
    path.pop();
  }

  console.log(all_path);

  // удаем последнее действие - сама реализация ctrl-z
  path_delete.push(all_path.pop());

  console.log(all_path);

  // рисуем все заново без одного элемента
  path.forEach(function (item) {
    if (item.fill) {
      item.context.fillStyle = item.fillStyle[item.fillStyle.length - 1];
      item.context.fill(item.path);
    }
    if (item.shape == "text") {
      var temp = item.text_value;
      draw_text(temp.text, item.context, temp.line_height, temp.font_size, temp.font);
    }

    item.context.stroke(item.path);
  });

  // закрашиваем заново все ластиком
  clear_coords.forEach(function (item) {
    item.coords.forEach(function (item) {
      c.fillStyle = "#fff";
      c.fillRect(item.x, item.y, 16, 16);
    });
  });
}

// передвижение canvas
function move_canvas(e) {
  var target = e.target;
  var x = void 0;
  var y = void 0;

  if (temp_target == target && target !== canvas) {
    x = get_x(e);
    y = get_y(e);

    var begin_x = get_left(temp_target);
    var begin_y = get_top(temp_target);

    // запоминаем передвижения для отмены через ctrl-z
    all_path.push({
      isPath: false,
      left: temp_target.style.left,
      top: temp_target.style.top,
      move_canvas: true,
      target: temp_target
    });

    canvas_wrapper.onmousemove = function (e) {
      var new_x = get_x(e) - x;
      var new_y = get_y(e) - y;

      temp_target.style.left = begin_x + new_x + "px";
      temp_target.style.top = begin_y + new_y + "px";

      if (get_top(temp_target) < 0) {
        temp_target.style.top = "0px";
      }
    };

    temp_target.onmouseup = function () {
      canvas_wrapper.onmousemove = null;
    };

    document.onmouseup = function () {
      canvas_wrapper.onmousemove = null;
    };
  } else if (temp_target !== undefined) {
    temp_target.style.border = "";
  }

  temp_target = target;
  target.style.border = "1px dashed black";
}

// рисование карандашом
function draw_pencil(e) {
  var target = e.target;
  var x = get_x(e) - get_left(target);
  var y = get_y(e) - get_top(target);

  c = target.getContext("2d");

  var current_path = {
    path: new Path2D(),
    isPath: true,
    context: c,
    stroke: true,
    fill: false,
    fillStyle: ["#fff"],
    shape: false,
    target: target,
    remove: false
  };

  path.push(current_path);
  all_path.push(current_path);

  c.beginPath();
  path[path.length - 1].path.moveTo(x, y);

  canvas_wrapper.onmousemove = function (e) {
    var current_target = e.target;

    var x = get_x(e) - get_left(current_target);
    var y = get_y(e) - get_top(current_target);

    c = current_target.getContext("2d");

    if (current_target !== target) {
      target = current_target;

      current_path = {
        path: new Path2D(),
        isPath: true,
        context: c,
        stroke: true,
        fill: false,
        fillStyle: ["#fff"],
        shape: false,
        target: target,
        remove: false
      };

      path.push(current_path);
      all_path.push(current_path);

      c.beginPath();
      path[path.length - 1].path.moveTo(x, y);
    }

    path[path.length - 1].path.lineTo(x, y);

    c.stroke(path[path.length - 1].path);
  };

  document.onmouseup = function () {
    canvas_wrapper.onmousemove = null;
  };
  canvas_wrapper.onmouseup = function () {
    canvas_wrapper.onmousemove = null;
  };
}

// ластик
function moveToRubber(e) {
  var x = e.pageX;
  var y = e.pageY - height_header;
  var arr_coords = [];

  canvas_wrapper.onmousemove = function (e) {
    var x = e.pageX;
    var y = e.pageY;
    var target = document.elementFromPoint(x + 8, y + 8);
    var coords = {};
    var all_coords = {};

    c = target.getContext("2d");
    x = e.pageX - (parseInt(target.style.left) || 0);
    y = e.pageY - height_header - (parseInt(target.style.top) || 0);

    coords = {
      x: x,
      y: y
    };

    arr_coords.push(coords);

    c.fillStyle = "#fff";
    c.fillRect(x, y, 16, 16);
  };
  canvas_wrapper.onmouseup = function () {
    all_coords = {
      coords: arr_coords,
      clear: true
    };

    clear_coords.push(all_coords);
    all_path.push(all_coords);

    canvas_wrapper.onmousemove = null;
  };
}

//рисование текста

function draw_text(text, c, line_height, font_size, font) {
  var temp = line_height;
  for (var i = 0; i < text.length; i++) {
    c.font = font_size + " " + font;
    c.fillText(text[i], 0, line_height);
    line_height += temp;
  }
  line_height = temp;
}

// создания поля ввода для текста
function create_textarea(x, y) {
  var textarea = document.createElement("textarea");

  textarea.style.left = x + "px";
  textarea.style.top = y + "px";

  textarea.classList.add("canvas-textarea-text");

  canvas_wrapper.appendChild(textarea);
  textarea.focus();

  return textarea;
}

//вставка поля ввода или canvasa в документ
function text_click(e) {
  var x = get_x(e);
  var y = get_y(e);
  var x1 = 0;
  var y1 = 0;

  if (!e.target.classList.contains("canvas-text") && e.target.tagName != "TEXTAREA") {
    create_textarea(x, y);
  }

  textarea = document.querySelectorAll(".canvas-textarea-text");

  var _loop = function _loop(i) {
    if (textarea[i]) {
      textarea[i].onblur = function () {
        event_textarea(textarea[i]);
      };
    }
  };

  for (var i = 0; i < textarea.length; i++) {
    _loop(i);
  }

  function event_textarea(textarea) {
    var text = textarea.value;
    var current_path = {};
    var font_size = "22px";
    var font = "sans-serif";
    var line_height = 30;
    var x = 0;
    var y = line_height;

    create_canvas(get_left(textarea), get_top(textarea), "canvas-text");

    new_canvas.counter = arr_textarea.length;

    arr_context.push(new_canvas);

    current_path = {
      path: new Path2D(),
      context: new_c,
      isPath: true,
      stroke: true,
      fill: false,
      fillStyle: ["#fff"],
      shape: "text",
      text_value: {
        text: text.split("\n"),
        font: font,
        line_height: line_height,
        font_size: font_size
      },
      target: new_canvas,
      remove: new_canvas
    };

    path.push(current_path);
    all_path.push(current_path);

    text = text.split("\n");
    var width = new_c.measureText(text[0]).width;
    for (var i = 0; i < text.length; i++) {
      if (width < new_c.measureText(text[i]).width) width = new_c.measureText(text[i]).width;
    }

    new_canvas.width = width * (parseInt(font_size) / 10);
    new_canvas.height = text.length * line_height;

    draw_text(text, new_c, line_height, font_size, font);

    arr_textarea.push(canvas_wrapper.replaceChild(new_canvas, textarea));

    new_canvas.addEventListener("dblclick", function () {
      canvas_wrapper.replaceChild(arr_textarea[this.counter], this);
      arr_textarea[this.counter].focus();
    });

    counter++;
  }
}

//заливка

function fill(e) {
  var x = get_x(e) - get_left(e.target);
  var y = get_y(e) - get_top(e.target);

  var bool = false;
  var arr_new_path = [];

  canvas_wrapper.onmouseup = null;

  arr_new_path = path.filter(function (item) {
    return item.target == e.target;
  });

  arr_new_path.forEach(function (item) {
    if (item.context.isPointInPath(item.path, x, y)) {
      if (item.shape == false) bool = true;
    }
  });

  if (bool) {
    arr_new_path.forEach(function (item) {
      if (!item.shape) {
        if (item.context.isPointInPath(item.path, x, y)) {
          item.fillStyle.push("#" + (~~(Math.random() * 16777000)).toString(16));

          item.fill = true;
          all_path.push({
            target: item,
            isPath: false,
            path: item.path,
            context: item.context,
            draw: false,
            fill_pop: true,
            fillStyle: item.fillStyle
          });

          item.context.stroke(item.path);
          item.context.fillStyle = item.fillStyle[item.fillStyle.length - 1];
          item.context.fill(item.path);
        }
      }
    });
  }

  if (!bool) {
    arr_new_path.forEach(function (item) {
      if (item.shape == "rect") {
        item.fillStyle.push("#" + (~~(Math.random() * 16777000)).toString(16));
        item.fill = true;
        all_path.push({
          target: item,
          isPath: false,
          path: item.path,
          context: item.context,
          fill_pop: true,
          fillStyle: item.fillStyle
        });
      }
      item.context.fillStyle = item.fillStyle[item.fillStyle.length - 1];
      item.context.fill(item.path);
      item.context.stroke(item.path);
    });
  }
}

//shapes

// рисование прямоугольника

function beginRect(e) {
  var x1 = get_x(e);
  var y1 = get_y(e);
  var y = 0;
  var x = 0;
  var current_path = {};

  create_canvas(x1, y1, "canvas-rect");

  current_path = {
    path: new Path2D(),
    isPath: true,
    context: new_c,
    stroke: true,
    fill: false,
    fillStyle: ["#fff"],
    shape: "rect",
    target: new_canvas,
    remove: new_canvas
  };

  path.push(current_path);
  all_path.push(current_path);

  canvas_wrapper.appendChild(new_canvas);

  canvas_wrapper.onmousemove = function (e) {
    x = get_x(e) - x1;
    y = get_y(e) - y1;

    if (get_x(e) < x1) {
      new_canvas.style.left = get_x(e) + "px";
      x = x1 - get_x(e);
    }
    if (get_y(e) < y1) {
      new_canvas.style.top = get_y(e) + "px";
      y = y1 - get_y(e);
    }

    new_canvas.width = x;
    new_canvas.height = y;

    new_c.strokeRect(0, 0, x, y);
  };
  canvas_wrapper.onmouseup = function (e) {
    new_canvas.width = x;
    new_canvas.height = y;

    arr_context.push(new_canvas);

    path[path.length - 1].path.rect(0, 0, x, y);

    new_c.stroke(path[path.length - 1].path);

    canvas_wrapper.onmousemove = null;
  };
}

//рисуем линию
function draw_line(e) {
  var x1 = get_x(e);
  var y1 = get_y(e);
  var x = void 0,
      y = void 0,
      begin_x = void 0,
      begin_y = void 0,
      end_x = void 0,
      end_y = void 0;

  create_canvas(x1, y1, "canvas-line");

  current_path = {
    path: new Path2D(),
    isPath: true,
    context: new_c,
    stroke: true,
    fill: false,
    fillStyle: ["#fff"],
    shape: "line",
    target: new_canvas,
    remove: new_canvas
  };

  path.push(current_path);
  all_path.push(current_path);

  canvas_wrapper.appendChild(new_canvas);

  new_c.beginPath();

  canvas_wrapper.onmousemove = function (e) {
    x = get_x(e) - x1;
    y = get_y(e) - y1;

    if (get_x(e) < x1) {
      new_canvas.style.left = get_x(e) + "px";
      x = x1 - get_x(e);
    }
    if (get_y(e) < y1) {
      new_canvas.style.top = get_y(e) + "px";
      y = y1 - get_y(e);
    }
    if (get_y(e) > y1 && get_x(e) > x1) {
      begin_x = 0;
      begin_y = 0;
      end_x = x;
      end_y = y;
    }
    if (get_y(e) < y1 && get_x(e) > x1) {
      begin_x = 0;
      begin_y = y;
      end_x = x;
      end_y = 0;
    }
    if (get_y(e) > y1 && get_x(e) < x1) {
      begin_x = x;
      begin_y = 0;
      end_x = 0;
      end_y = y;
    }
    if (get_y(e) < y1 && e.pageX < x1) {
      begin_x = x;
      begin_y = y;
      end_x = 0;
      end_y = 0;
    }

    new_canvas.width = x || 1;
    new_canvas.height = y || 1;

    new_c.moveTo(begin_x, begin_y);
    new_c.lineTo(end_x, end_y);

    new_c.stroke();
  };
  canvas_wrapper.onmouseup = function (e) {
    path[path.length - 1].path.moveTo(begin_x, begin_y);
    path[path.length - 1].path.lineTo(end_x, end_y);

    canvas_wrapper.onmousemove = null;
  };
}

//создание нового canvas

function create_canvas(x1, y1) {
  new_canvas = document.createElement("canvas");
  new_c = new_canvas.getContext("2d");
  new_canvas.classList.add("canvas");

  for (var _len = arguments.length, value_class = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    value_class[_key - 2] = arguments[_key];
  }

  value_class.forEach(function (item) {
    new_canvas.classList.add(item);
  });

  new_canvas.style.left = x1 + "px";
  new_canvas.style.top = y1 + "px";
  new_canvas.width = 0;
  new_canvas.height = 0;
}

function get_x(e) {
  return (e.pageX + wrapper.scrollLeft) * zoom - bias_left;
}
function get_y(e) {
  return (e.pageY + wrapper.scrollTop - (0, _settings_func.get_height)(header)) * zoom - bias_top;
}

function get_left(elem) {
  return parseFloat(elem.style.left) || 0;
}
function get_top(elem) {
  return parseFloat(elem.style.top) || 0;
}

function get_zoom() {
  divide_width = canvas.width / html.clientWidth;

  zoom = html.clientWidth / zoom_wrapper.clientWidth * divide_width;
}

function get_bias() {
  bias_left = (get_left(zoom_wrapper) + get_left(wrapper)) * zoom;
  bias_top = (get_top(zoom_wrapper) + get_top(wrapper)) * zoom;
}

function block(elem) {
  elem.style.display = "block";
}
function none(elem) {
  elem.style.display = "none";
}

function switcher(f, value1, value2) {
  var flag = true;
  return function () {
    if (flag) {
      f(value1);
      flag = false;
    } else {
      f(value2);
      flag = true;
    }
  };
}

//реализация drag'n'drop
function drag(target, wrapper) {
  target.ondragstart = function () {
    return false;
  };

  target.onmousedown = function (e) {
    var x = e.pageX;
    var y = e.pageY;
    var begin_x = get_left(wrapper);
    var begin_y = get_top(wrapper);

    document.onmousemove = function (e) {
      wrapper.style.left = begin_x + (e.pageX - x) + "px";
      wrapper.style.top = begin_y + (e.pageY - y) + "px";
    };
  };

  target.onmouseup = function (e) {
    document.onmousemove = null;
  };
  document.onmouseup = function () {
    document.onmousemove = null;
  };
}

//класс центрировки элемента
function Centering_Element() {
  this.all = function (elem) {
    elem.style.left = html.clientWidth / 2 - elem.clientWidth / 2 + "px";
    elem.style.top = html.clientHeight / 2 - elem.clientHeight / 2 + "px";
  };

  this.all_elem = function (elem, wrapper) {
    var left_add = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var top_add = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

    elem.style.left = (wrapper.clientWidth + left_add) / 2 - elem.clientWidth / 2 + "px";
    elem.style.top = (wrapper.clientHeight + top_add) / 2 - elem.clientHeight / 2 + "px";
  };

  this.top = function (elem) {
    var left = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var wrapper = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : html;
    var top_add = arguments[3];

    elem.style.top = (wrapper.clientHeight + top_add) / 2 - elem.clientHeight / 2 + "px";
    elem.style.left = left + "px";
  };

  this.left = function (elem) {
    var top = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var wrapper = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : html;
    var left_add = arguments[3];

    elem.style.top = top + "px";
    elem.style.left = (wrapper.clientWidth + left_add) / 2 - elem.clientWidth / 2 + "px";
  };
  this.const_center = function (elem, left, top) {
    elem.style.top = top + "px";
    elem.style.left = left + "px";
  };
}

// закрытие окошек с настройками
var all_close_wrapper = document.querySelectorAll(".close-wrapper");
var all_close = document.querySelectorAll(".close");

all_close_wrapper.forEach(function (item) {
  drag(item, item.parentElement);
});

all_close.forEach(function (item) {
  item.addEventListener("click", function (e) {
    item.parentElement.parentElement.classList.remove("zoomIn");
    item.parentElement.parentElement.classList.add("zoomOut");

    setTimeout(function () {
      item.parentElement.parentElement.style.display = "";
    }, 500);
  });
});

/***/ }),

/***/ "./js/settings_func.js":
/*!*****************************!*\
  !*** ./js/settings_func.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.prototype.set_left = function (size) {
  this.style.left = size + "px";
};
Object.prototype.set_top = function (size) {
  this.style.top = size + "px";
};

function get_width(elem) {
  var width = void 0;
  try {
    if ((parseFloat(elem.style.width) || 0) > elem.clientWidth) {
      width = parseFloat(elem.style.width) || 0;
    } else {
      width = elem.clientWidth;
    }
  } catch (e) {}
  return width;
}

function get_height(elem) {
  var height = void 0;
  try {
    if ((parseFloat(elem.style.height) || 0) > elem.clientHeight) {
      height = parseFloat(elem.style.height) || 0;
    } else {
      height = elem.clientHeight;
    }
  } catch (e) {}
  return height;
}

exports.get_height = get_height;
exports.get_width = get_width;

/***/ }),

/***/ "./node_modules/css-loader/index.js!./build/css/animate.css":
/*!*********************************************************!*\
  !*** ./node_modules/css-loader!./build/css/animate.css ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "@charset \"UTF-8\";\r\n\r\n/*!\r\n * animate.css -http://daneden.me/animate\r\n * Version - 3.5.2\r\n * Licensed under the MIT license - http://opensource.org/licenses/MIT\r\n *\r\n * Copyright (c) 2017 Daniel Eden\r\n */\r\n\r\n.animated {\r\n  animation-duration: 0.4s;\r\n  animation-fill-mode: both;\r\n}\r\n\r\n.animated.infinite {\r\n  animation-iteration-count: infinite;\r\n}\r\n\r\n.animated.hinge {\r\n  animation-duration: 2s;\r\n}\r\n\r\n.animated.flipOutX,\r\n.animated.flipOutY,\r\n.animated.bounceIn,\r\n.animated.bounceOut {\r\n  animation-duration: 0.75s;\r\n}\r\n\r\n@keyframes bounce {\r\n  from,\r\n  20%,\r\n  53%,\r\n  80%,\r\n  to {\r\n    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\r\n    transform: translate3d(0, 0, 0);\r\n  }\r\n\r\n  40%,\r\n  43% {\r\n    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);\r\n    transform: translate3d(0, -30px, 0);\r\n  }\r\n\r\n  70% {\r\n    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);\r\n    transform: translate3d(0, -15px, 0);\r\n  }\r\n\r\n  90% {\r\n    transform: translate3d(0, -4px, 0);\r\n  }\r\n}\r\n\r\n.bounce {\r\n  animation-name: bounce;\r\n  transform-origin: center bottom;\r\n}\r\n\r\n@keyframes flash {\r\n  from,\r\n  50%,\r\n  to {\r\n    opacity: 1;\r\n  }\r\n\r\n  25%,\r\n  75% {\r\n    opacity: 0;\r\n  }\r\n}\r\n\r\n.flash {\r\n  animation-name: flash;\r\n}\r\n\r\n/* originally authored by Nick Pettit - https://github.com/nickpettit/glide */\r\n\r\n@keyframes pulse {\r\n  from {\r\n    transform: scale3d(1, 1, 1);\r\n  }\r\n\r\n  50% {\r\n    transform: scale3d(1.05, 1.05, 1.05);\r\n  }\r\n\r\n  to {\r\n    transform: scale3d(1, 1, 1);\r\n  }\r\n}\r\n\r\n.pulse {\r\n  animation-name: pulse;\r\n}\r\n\r\n@keyframes rubberBand {\r\n  from {\r\n    transform: scale3d(1, 1, 1);\r\n  }\r\n\r\n  30% {\r\n    transform: scale3d(1.25, 0.75, 1);\r\n  }\r\n\r\n  40% {\r\n    transform: scale3d(0.75, 1.25, 1);\r\n  }\r\n\r\n  50% {\r\n    transform: scale3d(1.15, 0.85, 1);\r\n  }\r\n\r\n  65% {\r\n    transform: scale3d(0.95, 1.05, 1);\r\n  }\r\n\r\n  75% {\r\n    transform: scale3d(1.05, 0.95, 1);\r\n  }\r\n\r\n  to {\r\n    transform: scale3d(1, 1, 1);\r\n  }\r\n}\r\n\r\n.rubberBand {\r\n  animation-name: rubberBand;\r\n}\r\n\r\n@keyframes shake {\r\n  from,\r\n  to {\r\n    transform: translate3d(0, 0, 0);\r\n  }\r\n\r\n  10%,\r\n  30%,\r\n  50%,\r\n  70%,\r\n  90% {\r\n    transform: translate3d(-10px, 0, 0);\r\n  }\r\n\r\n  20%,\r\n  40%,\r\n  60%,\r\n  80% {\r\n    transform: translate3d(10px, 0, 0);\r\n  }\r\n}\r\n\r\n.shake {\r\n  animation-name: shake;\r\n}\r\n\r\n@keyframes headShake {\r\n  0% {\r\n    transform: translateX(0);\r\n  }\r\n\r\n  6.5% {\r\n    transform: translateX(-6px) rotateY(-9deg);\r\n  }\r\n\r\n  18.5% {\r\n    transform: translateX(5px) rotateY(7deg);\r\n  }\r\n\r\n  31.5% {\r\n    transform: translateX(-3px) rotateY(-5deg);\r\n  }\r\n\r\n  43.5% {\r\n    transform: translateX(2px) rotateY(3deg);\r\n  }\r\n\r\n  50% {\r\n    transform: translateX(0);\r\n  }\r\n}\r\n\r\n.headShake {\r\n  animation-timing-function: ease-in-out;\r\n  animation-name: headShake;\r\n}\r\n\r\n@keyframes swing {\r\n  20% {\r\n    transform: rotate3d(0, 0, 1, 15deg);\r\n  }\r\n\r\n  40% {\r\n    transform: rotate3d(0, 0, 1, -10deg);\r\n  }\r\n\r\n  60% {\r\n    transform: rotate3d(0, 0, 1, 5deg);\r\n  }\r\n\r\n  80% {\r\n    transform: rotate3d(0, 0, 1, -5deg);\r\n  }\r\n\r\n  to {\r\n    transform: rotate3d(0, 0, 1, 0deg);\r\n  }\r\n}\r\n\r\n.swing {\r\n  transform-origin: top center;\r\n  animation-name: swing;\r\n}\r\n\r\n@keyframes tada {\r\n  from {\r\n    transform: scale3d(1, 1, 1);\r\n  }\r\n\r\n  10%,\r\n  20% {\r\n    transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg);\r\n  }\r\n\r\n  30%,\r\n  50%,\r\n  70%,\r\n  90% {\r\n    transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);\r\n  }\r\n\r\n  40%,\r\n  60%,\r\n  80% {\r\n    transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);\r\n  }\r\n\r\n  to {\r\n    transform: scale3d(1, 1, 1);\r\n  }\r\n}\r\n\r\n.tada {\r\n  animation-name: tada;\r\n}\r\n\r\n/* originally authored by Nick Pettit - https://github.com/nickpettit/glide */\r\n\r\n@keyframes wobble {\r\n  from {\r\n    transform: none;\r\n  }\r\n\r\n  15% {\r\n    transform: translate3d(-25%, 0, 0) rotate3d(0, 0, 1, -5deg);\r\n  }\r\n\r\n  30% {\r\n    transform: translate3d(20%, 0, 0) rotate3d(0, 0, 1, 3deg);\r\n  }\r\n\r\n  45% {\r\n    transform: translate3d(-15%, 0, 0) rotate3d(0, 0, 1, -3deg);\r\n  }\r\n\r\n  60% {\r\n    transform: translate3d(10%, 0, 0) rotate3d(0, 0, 1, 2deg);\r\n  }\r\n\r\n  75% {\r\n    transform: translate3d(-5%, 0, 0) rotate3d(0, 0, 1, -1deg);\r\n  }\r\n\r\n  to {\r\n    transform: none;\r\n  }\r\n}\r\n\r\n.wobble {\r\n  animation-name: wobble;\r\n}\r\n\r\n@keyframes jello {\r\n  from,\r\n  11.1%,\r\n  to {\r\n    transform: none;\r\n  }\r\n\r\n  22.2% {\r\n    transform: skewX(-12.5deg) skewY(-12.5deg);\r\n  }\r\n\r\n  33.3% {\r\n    transform: skewX(6.25deg) skewY(6.25deg);\r\n  }\r\n\r\n  44.4% {\r\n    transform: skewX(-3.125deg) skewY(-3.125deg);\r\n  }\r\n\r\n  55.5% {\r\n    transform: skewX(1.5625deg) skewY(1.5625deg);\r\n  }\r\n\r\n  66.6% {\r\n    transform: skewX(-0.78125deg) skewY(-0.78125deg);\r\n  }\r\n\r\n  77.7% {\r\n    transform: skewX(0.390625deg) skewY(0.390625deg);\r\n  }\r\n\r\n  88.8% {\r\n    transform: skewX(-0.1953125deg) skewY(-0.1953125deg);\r\n  }\r\n}\r\n\r\n.jello {\r\n  animation-name: jello;\r\n  transform-origin: center;\r\n}\r\n\r\n@keyframes bounceIn {\r\n  from,\r\n  20%,\r\n  40%,\r\n  60%,\r\n  80%,\r\n  to {\r\n    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\r\n  }\r\n\r\n  0% {\r\n    opacity: 0;\r\n    transform: scale3d(0.3, 0.3, 0.3);\r\n  }\r\n\r\n  20% {\r\n    transform: scale3d(1.1, 1.1, 1.1);\r\n  }\r\n\r\n  40% {\r\n    transform: scale3d(0.9, 0.9, 0.9);\r\n  }\r\n\r\n  60% {\r\n    opacity: 1;\r\n    transform: scale3d(1.03, 1.03, 1.03);\r\n  }\r\n\r\n  80% {\r\n    transform: scale3d(0.97, 0.97, 0.97);\r\n  }\r\n\r\n  to {\r\n    opacity: 1;\r\n    transform: scale3d(1, 1, 1);\r\n  }\r\n}\r\n\r\n.bounceIn {\r\n  animation-name: bounceIn;\r\n}\r\n\r\n@keyframes bounceInDown {\r\n  from,\r\n  60%,\r\n  75%,\r\n  90%,\r\n  to {\r\n    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\r\n  }\r\n\r\n  0% {\r\n    opacity: 0;\r\n    transform: translate3d(0, -3000px, 0);\r\n  }\r\n\r\n  60% {\r\n    opacity: 1;\r\n    transform: translate3d(0, 25px, 0);\r\n  }\r\n\r\n  75% {\r\n    transform: translate3d(0, -10px, 0);\r\n  }\r\n\r\n  90% {\r\n    transform: translate3d(0, 5px, 0);\r\n  }\r\n\r\n  to {\r\n    transform: none;\r\n  }\r\n}\r\n\r\n.bounceInDown {\r\n  animation-name: bounceInDown;\r\n}\r\n\r\n@keyframes bounceInLeft {\r\n  from,\r\n  60%,\r\n  75%,\r\n  90%,\r\n  to {\r\n    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\r\n  }\r\n\r\n  0% {\r\n    opacity: 0;\r\n    transform: translate3d(-3000px, 0, 0);\r\n  }\r\n\r\n  60% {\r\n    opacity: 1;\r\n    transform: translate3d(25px, 0, 0);\r\n  }\r\n\r\n  75% {\r\n    transform: translate3d(-10px, 0, 0);\r\n  }\r\n\r\n  90% {\r\n    transform: translate3d(5px, 0, 0);\r\n  }\r\n\r\n  to {\r\n    transform: none;\r\n  }\r\n}\r\n\r\n.bounceInLeft {\r\n  animation-name: bounceInLeft;\r\n}\r\n\r\n@keyframes bounceInRight {\r\n  from,\r\n  60%,\r\n  75%,\r\n  90%,\r\n  to {\r\n    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\r\n  }\r\n\r\n  from {\r\n    opacity: 0;\r\n    transform: translate3d(3000px, 0, 0);\r\n  }\r\n\r\n  60% {\r\n    opacity: 1;\r\n    transform: translate3d(-25px, 0, 0);\r\n  }\r\n\r\n  75% {\r\n    transform: translate3d(10px, 0, 0);\r\n  }\r\n\r\n  90% {\r\n    transform: translate3d(-5px, 0, 0);\r\n  }\r\n\r\n  to {\r\n    transform: none;\r\n  }\r\n}\r\n\r\n.bounceInRight {\r\n  animation-name: bounceInRight;\r\n}\r\n\r\n@keyframes bounceInUp {\r\n  from,\r\n  60%,\r\n  75%,\r\n  90%,\r\n  to {\r\n    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\r\n  }\r\n\r\n  from {\r\n    opacity: 0;\r\n    transform: translate3d(0, 3000px, 0);\r\n  }\r\n\r\n  60% {\r\n    opacity: 1;\r\n    transform: translate3d(0, -20px, 0);\r\n  }\r\n\r\n  75% {\r\n    transform: translate3d(0, 10px, 0);\r\n  }\r\n\r\n  90% {\r\n    transform: translate3d(0, -5px, 0);\r\n  }\r\n\r\n  to {\r\n    transform: translate3d(0, 0, 0);\r\n  }\r\n}\r\n\r\n.bounceInUp {\r\n  animation-name: bounceInUp;\r\n}\r\n\r\n@keyframes bounceOut {\r\n  20% {\r\n    transform: scale3d(0.9, 0.9, 0.9);\r\n  }\r\n\r\n  50%,\r\n  55% {\r\n    opacity: 1;\r\n    transform: scale3d(1.1, 1.1, 1.1);\r\n  }\r\n\r\n  to {\r\n    opacity: 0;\r\n    transform: scale3d(0.3, 0.3, 0.3);\r\n  }\r\n}\r\n\r\n.bounceOut {\r\n  animation-name: bounceOut;\r\n}\r\n\r\n@keyframes bounceOutDown {\r\n  20% {\r\n    transform: translate3d(0, 10px, 0);\r\n  }\r\n\r\n  40%,\r\n  45% {\r\n    opacity: 1;\r\n    transform: translate3d(0, -20px, 0);\r\n  }\r\n\r\n  to {\r\n    opacity: 0;\r\n    transform: translate3d(0, 2000px, 0);\r\n  }\r\n}\r\n\r\n.bounceOutDown {\r\n  animation-name: bounceOutDown;\r\n}\r\n\r\n@keyframes bounceOutLeft {\r\n  20% {\r\n    opacity: 1;\r\n    transform: translate3d(20px, 0, 0);\r\n  }\r\n\r\n  to {\r\n    opacity: 0;\r\n    transform: translate3d(-2000px, 0, 0);\r\n  }\r\n}\r\n\r\n.bounceOutLeft {\r\n  animation-name: bounceOutLeft;\r\n}\r\n\r\n@keyframes bounceOutRight {\r\n  20% {\r\n    opacity: 1;\r\n    transform: translate3d(-20px, 0, 0);\r\n  }\r\n\r\n  to {\r\n    opacity: 0;\r\n    transform: translate3d(2000px, 0, 0);\r\n  }\r\n}\r\n\r\n.bounceOutRight {\r\n  animation-name: bounceOutRight;\r\n}\r\n\r\n@keyframes bounceOutUp {\r\n  20% {\r\n    transform: translate3d(0, -10px, 0);\r\n  }\r\n\r\n  40%,\r\n  45% {\r\n    opacity: 1;\r\n    transform: translate3d(0, 20px, 0);\r\n  }\r\n\r\n  to {\r\n    opacity: 0;\r\n    transform: translate3d(0, -2000px, 0);\r\n  }\r\n}\r\n\r\n.bounceOutUp {\r\n  animation-name: bounceOutUp;\r\n}\r\n\r\n@keyframes fadeIn {\r\n  from {\r\n    opacity: 0;\r\n  }\r\n\r\n  to {\r\n    opacity: 1;\r\n  }\r\n}\r\n\r\n.fadeIn {\r\n  animation-name: fadeIn;\r\n}\r\n\r\n@keyframes fadeInDown {\r\n  from {\r\n    opacity: 0;\r\n    transform: translate3d(0, -100%, 0);\r\n  }\r\n\r\n  to {\r\n    opacity: 1;\r\n    transform: none;\r\n  }\r\n}\r\n\r\n.fadeInDown {\r\n  animation-name: fadeInDown;\r\n}\r\n\r\n@keyframes fadeInDownBig {\r\n  from {\r\n    opacity: 0;\r\n    transform: translate3d(0, -2000px, 0);\r\n  }\r\n\r\n  to {\r\n    opacity: 1;\r\n    transform: none;\r\n  }\r\n}\r\n\r\n.fadeInDownBig {\r\n  animation-name: fadeInDownBig;\r\n}\r\n\r\n@keyframes fadeInLeft {\r\n  from {\r\n    opacity: 0;\r\n    transform: translate3d(-100%, 0, 0);\r\n  }\r\n\r\n  to {\r\n    opacity: 1;\r\n    transform: none;\r\n  }\r\n}\r\n\r\n.fadeInLeft {\r\n  animation-name: fadeInLeft;\r\n}\r\n\r\n@keyframes fadeInLeftBig {\r\n  from {\r\n    opacity: 0;\r\n    transform: translate3d(-2000px, 0, 0);\r\n  }\r\n\r\n  to {\r\n    opacity: 1;\r\n    transform: none;\r\n  }\r\n}\r\n\r\n.fadeInLeftBig {\r\n  animation-name: fadeInLeftBig;\r\n}\r\n\r\n@keyframes fadeInRight {\r\n  from {\r\n    opacity: 0;\r\n    transform: translate3d(100%, 0, 0);\r\n  }\r\n\r\n  to {\r\n    opacity: 1;\r\n    transform: none;\r\n  }\r\n}\r\n\r\n.fadeInRight {\r\n  animation-name: fadeInRight;\r\n}\r\n\r\n@keyframes fadeInRightBig {\r\n  from {\r\n    opacity: 0;\r\n    transform: translate3d(2000px, 0, 0);\r\n  }\r\n\r\n  to {\r\n    opacity: 1;\r\n    transform: none;\r\n  }\r\n}\r\n\r\n.fadeInRightBig {\r\n  animation-name: fadeInRightBig;\r\n}\r\n\r\n@keyframes fadeInUp {\r\n  from {\r\n    opacity: 0;\r\n    transform: translate3d(0, 100%, 0);\r\n  }\r\n\r\n  to {\r\n    opacity: 1;\r\n    transform: none;\r\n  }\r\n}\r\n\r\n.fadeInUp {\r\n  animation-name: fadeInUp;\r\n}\r\n\r\n@keyframes fadeInUpBig {\r\n  from {\r\n    opacity: 0;\r\n    transform: translate3d(0, 2000px, 0);\r\n  }\r\n\r\n  to {\r\n    opacity: 1;\r\n    transform: none;\r\n  }\r\n}\r\n\r\n.fadeInUpBig {\r\n  animation-name: fadeInUpBig;\r\n}\r\n\r\n@keyframes fadeOut {\r\n  from {\r\n    opacity: 1;\r\n  }\r\n\r\n  to {\r\n    opacity: 0;\r\n  }\r\n}\r\n\r\n.fadeOut {\r\n  animation-name: fadeOut;\r\n}\r\n\r\n@keyframes fadeOutDown {\r\n  from {\r\n    opacity: 1;\r\n  }\r\n\r\n  to {\r\n    opacity: 0;\r\n    transform: translate3d(0, 100%, 0);\r\n  }\r\n}\r\n\r\n.fadeOutDown {\r\n  animation-name: fadeOutDown;\r\n}\r\n\r\n@keyframes fadeOutDownBig {\r\n  from {\r\n    opacity: 1;\r\n  }\r\n\r\n  to {\r\n    opacity: 0;\r\n    transform: translate3d(0, 2000px, 0);\r\n  }\r\n}\r\n\r\n.fadeOutDownBig {\r\n  animation-name: fadeOutDownBig;\r\n}\r\n\r\n@keyframes fadeOutLeft {\r\n  from {\r\n    opacity: 1;\r\n  }\r\n\r\n  to {\r\n    opacity: 0;\r\n    transform: translate3d(-100%, 0, 0);\r\n  }\r\n}\r\n\r\n.fadeOutLeft {\r\n  animation-name: fadeOutLeft;\r\n}\r\n\r\n@keyframes fadeOutLeftBig {\r\n  from {\r\n    opacity: 1;\r\n  }\r\n\r\n  to {\r\n    opacity: 0;\r\n    transform: translate3d(-2000px, 0, 0);\r\n  }\r\n}\r\n\r\n.fadeOutLeftBig {\r\n  animation-name: fadeOutLeftBig;\r\n}\r\n\r\n@keyframes fadeOutRight {\r\n  from {\r\n    opacity: 1;\r\n  }\r\n\r\n  to {\r\n    opacity: 0;\r\n    transform: translate3d(100%, 0, 0);\r\n  }\r\n}\r\n\r\n.fadeOutRight {\r\n  animation-name: fadeOutRight;\r\n}\r\n\r\n@keyframes fadeOutRightBig {\r\n  from {\r\n    opacity: 1;\r\n  }\r\n\r\n  to {\r\n    opacity: 0;\r\n    transform: translate3d(2000px, 0, 0);\r\n  }\r\n}\r\n\r\n.fadeOutRightBig {\r\n  animation-name: fadeOutRightBig;\r\n}\r\n\r\n@keyframes fadeOutUp {\r\n  from {\r\n    opacity: 1;\r\n  }\r\n\r\n  to {\r\n    opacity: 0;\r\n    transform: translate3d(0, -100%, 0);\r\n  }\r\n}\r\n\r\n.fadeOutUp {\r\n  animation-name: fadeOutUp;\r\n}\r\n\r\n@keyframes fadeOutUpBig {\r\n  from {\r\n    opacity: 1;\r\n  }\r\n\r\n  to {\r\n    opacity: 0;\r\n    transform: translate3d(0, -2000px, 0);\r\n  }\r\n}\r\n\r\n.fadeOutUpBig {\r\n  animation-name: fadeOutUpBig;\r\n}\r\n\r\n@keyframes flip {\r\n  from {\r\n    transform: perspective(400px) rotate3d(0, 1, 0, -360deg);\r\n    animation-timing-function: ease-out;\r\n  }\r\n\r\n  40% {\r\n    transform: perspective(400px) translate3d(0, 0, 150px)\r\n      rotate3d(0, 1, 0, -190deg);\r\n    animation-timing-function: ease-out;\r\n  }\r\n\r\n  50% {\r\n    transform: perspective(400px) translate3d(0, 0, 150px)\r\n      rotate3d(0, 1, 0, -170deg);\r\n    animation-timing-function: ease-in;\r\n  }\r\n\r\n  80% {\r\n    transform: perspective(400px) scale3d(0.95, 0.95, 0.95);\r\n    animation-timing-function: ease-in;\r\n  }\r\n\r\n  to {\r\n    transform: perspective(400px);\r\n    animation-timing-function: ease-in;\r\n  }\r\n}\r\n\r\n.animated.flip {\r\n  -webkit-backface-visibility: visible;\r\n  backface-visibility: visible;\r\n  animation-name: flip;\r\n}\r\n\r\n@keyframes flipInX {\r\n  from {\r\n    transform: perspective(400px) rotate3d(1, 0, 0, 90deg);\r\n    animation-timing-function: ease-in;\r\n    opacity: 0;\r\n  }\r\n\r\n  40% {\r\n    transform: perspective(400px) rotate3d(1, 0, 0, -20deg);\r\n    animation-timing-function: ease-in;\r\n  }\r\n\r\n  60% {\r\n    transform: perspective(400px) rotate3d(1, 0, 0, 10deg);\r\n    opacity: 1;\r\n  }\r\n\r\n  80% {\r\n    transform: perspective(400px) rotate3d(1, 0, 0, -5deg);\r\n  }\r\n\r\n  to {\r\n    transform: perspective(400px);\r\n  }\r\n}\r\n\r\n.flipInX {\r\n  -webkit-backface-visibility: visible !important;\r\n  backface-visibility: visible !important;\r\n  animation-name: flipInX;\r\n}\r\n\r\n@keyframes flipInY {\r\n  from {\r\n    transform: perspective(400px) rotate3d(0, 1, 0, 90deg);\r\n    animation-timing-function: ease-in;\r\n    opacity: 0;\r\n  }\r\n\r\n  40% {\r\n    transform: perspective(400px) rotate3d(0, 1, 0, -20deg);\r\n    animation-timing-function: ease-in;\r\n  }\r\n\r\n  60% {\r\n    transform: perspective(400px) rotate3d(0, 1, 0, 10deg);\r\n    opacity: 1;\r\n  }\r\n\r\n  80% {\r\n    transform: perspective(400px) rotate3d(0, 1, 0, -5deg);\r\n  }\r\n\r\n  to {\r\n    transform: perspective(400px);\r\n  }\r\n}\r\n\r\n.flipInY {\r\n  -webkit-backface-visibility: visible !important;\r\n  backface-visibility: visible !important;\r\n  animation-name: flipInY;\r\n}\r\n\r\n@keyframes flipOutX {\r\n  from {\r\n    transform: perspective(400px);\r\n  }\r\n\r\n  30% {\r\n    transform: perspective(400px) rotate3d(1, 0, 0, -20deg);\r\n    opacity: 1;\r\n  }\r\n\r\n  to {\r\n    transform: perspective(400px) rotate3d(1, 0, 0, 90deg);\r\n    opacity: 0;\r\n  }\r\n}\r\n\r\n.flipOutX {\r\n  animation-name: flipOutX;\r\n  -webkit-backface-visibility: visible !important;\r\n  backface-visibility: visible !important;\r\n}\r\n\r\n@keyframes flipOutY {\r\n  from {\r\n    transform: perspective(400px);\r\n  }\r\n\r\n  30% {\r\n    transform: perspective(400px) rotate3d(0, 1, 0, -15deg);\r\n    opacity: 1;\r\n  }\r\n\r\n  to {\r\n    transform: perspective(400px) rotate3d(0, 1, 0, 90deg);\r\n    opacity: 0;\r\n  }\r\n}\r\n\r\n.flipOutY {\r\n  -webkit-backface-visibility: visible !important;\r\n  backface-visibility: visible !important;\r\n  animation-name: flipOutY;\r\n}\r\n\r\n@keyframes lightSpeedIn {\r\n  from {\r\n    transform: translate3d(100%, 0, 0) skewX(-30deg);\r\n    opacity: 0;\r\n  }\r\n\r\n  60% {\r\n    transform: skewX(20deg);\r\n    opacity: 1;\r\n  }\r\n\r\n  80% {\r\n    transform: skewX(-5deg);\r\n    opacity: 1;\r\n  }\r\n\r\n  to {\r\n    transform: none;\r\n    opacity: 1;\r\n  }\r\n}\r\n\r\n.lightSpeedIn {\r\n  animation-name: lightSpeedIn;\r\n  animation-timing-function: ease-out;\r\n}\r\n\r\n@keyframes lightSpeedOut {\r\n  from {\r\n    opacity: 1;\r\n  }\r\n\r\n  to {\r\n    transform: translate3d(100%, 0, 0) skewX(30deg);\r\n    opacity: 0;\r\n  }\r\n}\r\n\r\n.lightSpeedOut {\r\n  animation-name: lightSpeedOut;\r\n  animation-timing-function: ease-in;\r\n}\r\n\r\n@keyframes rotateIn {\r\n  from {\r\n    transform-origin: center;\r\n    transform: rotate3d(0, 0, 1, -200deg);\r\n    opacity: 0;\r\n  }\r\n\r\n  to {\r\n    transform-origin: center;\r\n    transform: none;\r\n    opacity: 1;\r\n  }\r\n}\r\n\r\n.rotateIn {\r\n  animation-name: rotateIn;\r\n}\r\n\r\n@keyframes rotateInDownLeft {\r\n  from {\r\n    transform-origin: left bottom;\r\n    transform: rotate3d(0, 0, 1, -45deg);\r\n    opacity: 0;\r\n  }\r\n\r\n  to {\r\n    transform-origin: left bottom;\r\n    transform: none;\r\n    opacity: 1;\r\n  }\r\n}\r\n\r\n.rotateInDownLeft {\r\n  animation-name: rotateInDownLeft;\r\n}\r\n\r\n@keyframes rotateInDownRight {\r\n  from {\r\n    transform-origin: right bottom;\r\n    transform: rotate3d(0, 0, 1, 45deg);\r\n    opacity: 0;\r\n  }\r\n\r\n  to {\r\n    transform-origin: right bottom;\r\n    transform: none;\r\n    opacity: 1;\r\n  }\r\n}\r\n\r\n.rotateInDownRight {\r\n  animation-name: rotateInDownRight;\r\n}\r\n\r\n@keyframes rotateInUpLeft {\r\n  from {\r\n    transform-origin: left bottom;\r\n    transform: rotate3d(0, 0, 1, 45deg);\r\n    opacity: 0;\r\n  }\r\n\r\n  to {\r\n    transform-origin: left bottom;\r\n    transform: none;\r\n    opacity: 1;\r\n  }\r\n}\r\n\r\n.rotateInUpLeft {\r\n  animation-name: rotateInUpLeft;\r\n}\r\n\r\n@keyframes rotateInUpRight {\r\n  from {\r\n    transform-origin: right bottom;\r\n    transform: rotate3d(0, 0, 1, -90deg);\r\n    opacity: 0;\r\n  }\r\n\r\n  to {\r\n    transform-origin: right bottom;\r\n    transform: none;\r\n    opacity: 1;\r\n  }\r\n}\r\n\r\n.rotateInUpRight {\r\n  animation-name: rotateInUpRight;\r\n}\r\n\r\n@keyframes rotateOut {\r\n  from {\r\n    transform-origin: center;\r\n    opacity: 1;\r\n  }\r\n\r\n  to {\r\n    transform-origin: center;\r\n    transform: rotate3d(0, 0, 1, 200deg);\r\n    opacity: 0;\r\n  }\r\n}\r\n\r\n.rotateOut {\r\n  animation-name: rotateOut;\r\n}\r\n\r\n@keyframes rotateOutDownLeft {\r\n  from {\r\n    transform-origin: left bottom;\r\n    opacity: 1;\r\n  }\r\n\r\n  to {\r\n    transform-origin: left bottom;\r\n    transform: rotate3d(0, 0, 1, 45deg);\r\n    opacity: 0;\r\n  }\r\n}\r\n\r\n.rotateOutDownLeft {\r\n  animation-name: rotateOutDownLeft;\r\n}\r\n\r\n@keyframes rotateOutDownRight {\r\n  from {\r\n    transform-origin: right bottom;\r\n    opacity: 1;\r\n  }\r\n\r\n  to {\r\n    transform-origin: right bottom;\r\n    transform: rotate3d(0, 0, 1, -45deg);\r\n    opacity: 0;\r\n  }\r\n}\r\n\r\n.rotateOutDownRight {\r\n  animation-name: rotateOutDownRight;\r\n}\r\n\r\n@keyframes rotateOutUpLeft {\r\n  from {\r\n    transform-origin: left bottom;\r\n    opacity: 1;\r\n  }\r\n\r\n  to {\r\n    transform-origin: left bottom;\r\n    transform: rotate3d(0, 0, 1, -45deg);\r\n    opacity: 0;\r\n  }\r\n}\r\n\r\n.rotateOutUpLeft {\r\n  animation-name: rotateOutUpLeft;\r\n}\r\n\r\n@keyframes rotateOutUpRight {\r\n  from {\r\n    transform-origin: right bottom;\r\n    opacity: 1;\r\n  }\r\n\r\n  to {\r\n    transform-origin: right bottom;\r\n    transform: rotate3d(0, 0, 1, 90deg);\r\n    opacity: 0;\r\n  }\r\n}\r\n\r\n.rotateOutUpRight {\r\n  animation-name: rotateOutUpRight;\r\n}\r\n\r\n@keyframes hinge {\r\n  0% {\r\n    transform-origin: top left;\r\n    animation-timing-function: ease-in-out;\r\n  }\r\n\r\n  20%,\r\n  60% {\r\n    transform: rotate3d(0, 0, 1, 80deg);\r\n    transform-origin: top left;\r\n    animation-timing-function: ease-in-out;\r\n  }\r\n\r\n  40%,\r\n  80% {\r\n    transform: rotate3d(0, 0, 1, 60deg);\r\n    transform-origin: top left;\r\n    animation-timing-function: ease-in-out;\r\n    opacity: 1;\r\n  }\r\n\r\n  to {\r\n    transform: translate3d(0, 700px, 0);\r\n    opacity: 0;\r\n  }\r\n}\r\n\r\n.hinge {\r\n  animation-name: hinge;\r\n}\r\n\r\n@keyframes jackInTheBox {\r\n  from {\r\n    opacity: 0;\r\n    transform: scale(0.1) rotate(30deg);\r\n    transform-origin: center bottom;\r\n  }\r\n\r\n  50% {\r\n    transform: rotate(-10deg);\r\n  }\r\n\r\n  70% {\r\n    transform: rotate(3deg);\r\n  }\r\n\r\n  to {\r\n    opacity: 1;\r\n    transform: scale(1);\r\n  }\r\n}\r\n\r\n.jackInTheBox {\r\n  animation-name: jackInTheBox;\r\n}\r\n\r\n/* originally authored by Nick Pettit - https://github.com/nickpettit/glide */\r\n\r\n@keyframes rollIn {\r\n  from {\r\n    opacity: 0;\r\n    transform: translate3d(-100%, 0, 0) rotate3d(0, 0, 1, -120deg);\r\n  }\r\n\r\n  to {\r\n    opacity: 1;\r\n    transform: none;\r\n  }\r\n}\r\n\r\n.rollIn {\r\n  animation-name: rollIn;\r\n}\r\n\r\n/* originally authored by Nick Pettit - https://github.com/nickpettit/glide */\r\n\r\n@keyframes rollOut {\r\n  from {\r\n    opacity: 1;\r\n  }\r\n\r\n  to {\r\n    opacity: 0;\r\n    transform: translate3d(100%, 0, 0) rotate3d(0, 0, 1, 120deg);\r\n  }\r\n}\r\n\r\n.rollOut {\r\n  animation-name: rollOut;\r\n}\r\n\r\n@keyframes zoomIn {\r\n  from {\r\n    opacity: 0;\r\n    transform: scale3d(0.3, 0.3, 0.3);\r\n  }\r\n\r\n  50% {\r\n    opacity: 1;\r\n  }\r\n}\r\n\r\n.zoomIn {\r\n  animation-name: zoomIn;\r\n}\r\n\r\n@keyframes zoomInDown {\r\n  from {\r\n    opacity: 0;\r\n    transform: scale3d(0.1, 0.1, 0.1) translate3d(0, -1000px, 0);\r\n    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);\r\n  }\r\n\r\n  60% {\r\n    opacity: 1;\r\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0);\r\n    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);\r\n  }\r\n}\r\n\r\n.zoomInDown {\r\n  animation-name: zoomInDown;\r\n}\r\n\r\n@keyframes zoomInLeft {\r\n  from {\r\n    opacity: 0;\r\n    transform: scale3d(0.1, 0.1, 0.1) translate3d(-1000px, 0, 0);\r\n    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);\r\n  }\r\n\r\n  60% {\r\n    opacity: 1;\r\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(10px, 0, 0);\r\n    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);\r\n  }\r\n}\r\n\r\n.zoomInLeft {\r\n  animation-name: zoomInLeft;\r\n}\r\n\r\n@keyframes zoomInRight {\r\n  from {\r\n    opacity: 0;\r\n    transform: scale3d(0.1, 0.1, 0.1) translate3d(1000px, 0, 0);\r\n    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);\r\n  }\r\n\r\n  60% {\r\n    opacity: 1;\r\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(-10px, 0, 0);\r\n    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);\r\n  }\r\n}\r\n\r\n.zoomInRight {\r\n  animation-name: zoomInRight;\r\n}\r\n\r\n@keyframes zoomInUp {\r\n  from {\r\n    opacity: 0;\r\n    transform: scale3d(0.1, 0.1, 0.1) translate3d(0, 1000px, 0);\r\n    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);\r\n  }\r\n\r\n  60% {\r\n    opacity: 1;\r\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(0, -60px, 0);\r\n    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);\r\n  }\r\n}\r\n\r\n.zoomInUp {\r\n  animation-name: zoomInUp;\r\n}\r\n\r\n@keyframes zoomOut {\r\n  from {\r\n    opacity: 1;\r\n  }\r\n\r\n  50% {\r\n    opacity: 0;\r\n    transform: scale3d(0.3, 0.3, 0.3);\r\n  }\r\n\r\n  to {\r\n    opacity: 0;\r\n  }\r\n}\r\n\r\n.zoomOut {\r\n  animation-name: zoomOut;\r\n}\r\n\r\n@keyframes zoomOutDown {\r\n  40% {\r\n    opacity: 1;\r\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(0, -60px, 0);\r\n    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);\r\n  }\r\n\r\n  to {\r\n    opacity: 0;\r\n    transform: scale3d(0.1, 0.1, 0.1) translate3d(0, 2000px, 0);\r\n    transform-origin: center bottom;\r\n    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);\r\n  }\r\n}\r\n\r\n.zoomOutDown {\r\n  animation-name: zoomOutDown;\r\n}\r\n\r\n@keyframes zoomOutLeft {\r\n  40% {\r\n    opacity: 1;\r\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(42px, 0, 0);\r\n  }\r\n\r\n  to {\r\n    opacity: 0;\r\n    transform: scale(0.1) translate3d(-2000px, 0, 0);\r\n    transform-origin: left center;\r\n  }\r\n}\r\n\r\n.zoomOutLeft {\r\n  animation-name: zoomOutLeft;\r\n}\r\n\r\n@keyframes zoomOutRight {\r\n  40% {\r\n    opacity: 1;\r\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(-42px, 0, 0);\r\n  }\r\n\r\n  to {\r\n    opacity: 0;\r\n    transform: scale(0.1) translate3d(2000px, 0, 0);\r\n    transform-origin: right center;\r\n  }\r\n}\r\n\r\n.zoomOutRight {\r\n  animation-name: zoomOutRight;\r\n}\r\n\r\n@keyframes zoomOutUp {\r\n  40% {\r\n    opacity: 1;\r\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0);\r\n    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);\r\n  }\r\n\r\n  to {\r\n    opacity: 0;\r\n    transform: scale3d(0.1, 0.1, 0.1) translate3d(0, -2000px, 0);\r\n    transform-origin: center bottom;\r\n    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);\r\n  }\r\n}\r\n\r\n.zoomOutUp {\r\n  animation-name: zoomOutUp;\r\n}\r\n\r\n@keyframes slideInDown {\r\n  from {\r\n    transform: translate3d(0, -100%, 0);\r\n    visibility: visible;\r\n  }\r\n\r\n  to {\r\n    transform: translate3d(0, 0, 0);\r\n  }\r\n}\r\n\r\n.slideInDown {\r\n  animation-name: slideInDown;\r\n}\r\n\r\n@keyframes slideInLeft {\r\n  from {\r\n    transform: translate3d(-100%, 0, 0);\r\n    visibility: visible;\r\n  }\r\n\r\n  to {\r\n    transform: translate3d(0, 0, 0);\r\n  }\r\n}\r\n\r\n.slideInLeft {\r\n  animation-name: slideInLeft;\r\n}\r\n\r\n@keyframes slideInRight {\r\n  from {\r\n    transform: translate3d(100%, 0, 0);\r\n    visibility: visible;\r\n  }\r\n\r\n  to {\r\n    transform: translate3d(0, 0, 0);\r\n  }\r\n}\r\n\r\n.slideInRight {\r\n  animation-name: slideInRight;\r\n}\r\n\r\n@keyframes slideInUp {\r\n  from {\r\n    transform: translate3d(0, 100%, 0);\r\n    visibility: visible;\r\n  }\r\n\r\n  to {\r\n    transform: translate3d(0, 0, 0);\r\n  }\r\n}\r\n\r\n.slideInUp {\r\n  animation-name: slideInUp;\r\n}\r\n\r\n@keyframes slideOutDown {\r\n  from {\r\n    transform: translate3d(0, 0, 0);\r\n  }\r\n\r\n  to {\r\n    visibility: hidden;\r\n    transform: translate3d(0, 100%, 0);\r\n  }\r\n}\r\n\r\n.slideOutDown {\r\n  animation-name: slideOutDown;\r\n}\r\n\r\n@keyframes slideOutLeft {\r\n  from {\r\n    transform: translate3d(0, 0, 0);\r\n  }\r\n\r\n  to {\r\n    visibility: hidden;\r\n    transform: translate3d(-100%, 0, 0);\r\n  }\r\n}\r\n\r\n.slideOutLeft {\r\n  animation-name: slideOutLeft;\r\n}\r\n\r\n@keyframes slideOutRight {\r\n  from {\r\n    transform: translate3d(0, 0, 0);\r\n  }\r\n\r\n  to {\r\n    visibility: hidden;\r\n    transform: translate3d(100%, 0, 0);\r\n  }\r\n}\r\n\r\n.slideOutRight {\r\n  animation-name: slideOutRight;\r\n}\r\n\r\n@keyframes slideOutUp {\r\n  from {\r\n    transform: translate3d(0, 0, 0);\r\n  }\r\n\r\n  to {\r\n    visibility: hidden;\r\n    transform: translate3d(0, -100%, 0);\r\n  }\r\n}\r\n\r\n.slideOutUp {\r\n  animation-name: slideOutUp;\r\n}\r\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./build/css/main.css":
/*!******************************************************!*\
  !*** ./node_modules/css-loader!./build/css/main.css ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "* {\n  box-sizing: border-box; }\n\nhtml {\n  height: 100%;\n  overflow: hidden;\n  box-sizing: border-box;\n  font-size: 14px; }\n\nbody {\n  background: #282828;\n  box-sizing: border-box;\n  font-family: sans-serif;\n  font-size: 1rem;\n  height: 100%;\n  margin: 0;\n  z-index: -1000;\n  position: relative; }\n\nul {\n  margin: 0;\n  padding: 0;\n  list-style: none; }\n\nheader {\n  margin: 0;\n  background: #535353;\n  z-index: 100; }\n  header .options ul {\n    height: 100%;\n    background: #535353;\n    border-bottom: 1px solid MINTCREAM;\n    display: flex; }\n    header .options ul li {\n      color: white;\n      position: relative; }\n      header .options ul li div {\n        height: 100%; }\n      header .options ul li:hover .options-dropdown {\n        display: block; }\n      header .options ul li:hover .options-badge {\n        color: black;\n        cursor: pointer;\n        background: MINTCREAM; }\n        header .options ul li:hover .options-badge svg {\n          transform: rotate(180deg); }\n    header .options ul li:first-child {\n      margin-left: 20px; }\n  header .options-dropdown {\n    border: 1px solid black;\n    z-index: 1000;\n    display: none;\n    position: absolute;\n    left: 0;\n    top: 100%;\n    background: #eee; }\n    header .options-dropdown a {\n      font-size: .9rem;\n      white-space: pre;\n      color: #285473;\n      text-decoration: none;\n      background: #eee;\n      padding: 8px 8px;\n      display: block; }\n      header .options-dropdown a:hover {\n        background: #e1e5eb; }\n  header .options-badge {\n    padding: 0px 10px;\n    transition: .3s;\n    display: flex;\n    align-items: center; }\n    header .options-badge svg {\n      margin-left: 5px;\n      transition: .2s transform; }\n\nheader .title-canvas-wrapper {\n  font-size: 1.2rem;\n  line-height: 25px;\n  display: none;\n  background: #424242;\n  border-bottom: 1px solid MINTCREAM;\n  padding-left: 20px; }\n  header .title-canvas-wrapper .title-canvas, header .title-canvas-wrapper .title-canvas.active {\n    height: 100%;\n    padding: 0px 5px 0px 10px;\n    transition: .3s;\n    color: white;\n    display: inline-block;\n    cursor: pointer; }\n    header .title-canvas-wrapper .title-canvas span, header .title-canvas-wrapper .title-canvas.active span {\n      color: rgba(255, 255, 255, 0.6);\n      margin-left: 5px; }\n    header .title-canvas-wrapper .title-canvas:hover {\n      background: MINTCREAM;\n      color: black; }\n      header .title-canvas-wrapper .title-canvas:hover span {\n        color: rgba(0, 0, 0, 0.6); }\n\nheader .title-canvas-wrapper .active.title-canvas {\n  background: MINTCREAM;\n  color: black; }\n  header .title-canvas-wrapper .active.title-canvas span {\n    color: rgba(0, 0, 0, 0.6); }\n\n.drag-panel {\n  border-radius: 5px 5px 0 0;\n  width: 100%;\n  height: 17px;\n  line-height: 15px;\n  background: #535353;\n  display: flex;\n  justify-content: flex-end;\n  border-bottom: 1px solid MINTCREAM; }\n  .drag-panel-item {\n    transition: .4s;\n    width: 18px;\n    height: 100%;\n    padding: 0px 3px;\n    cursor: pointer; }\n    .drag-panel-item:hover {\n      border-left: 1px solid MINTCREAM;\n      border-right: 1px solid MINTCREAM; }\n  .drag-panel-close {\n    position: relative; }\n    .drag-panel-close::before, .drag-panel-close::after {\n      position: absolute;\n      top: 50%;\n      left: 50%;\n      content: '';\n      width: 11px;\n      height: 2px;\n      background: MINTCREAM;\n      transform: translate(-50%, -50%) rotate(45deg); }\n    .drag-panel-close::after {\n      transform: translate(-50%, -50%) rotate(-45deg); }\n  .drag-panel-arrow {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    transform: rotate(180deg); }\n  .drag-panel-arrow-active {\n    transform: rotate(0deg); }\n\n.drag-place {\n  width: 100%;\n  height: 25px;\n  display: flex;\n  justify-content: center;\n  align-items: center; }\n\n.tools-wrapper {\n  box-shadow: 0 24px 38px 3px rgba(0, 0, 0, 0.2), 0 9px 46px 8px rgba(0, 0, 0, 0.2), 0 11px 15px -7px rgba(0, 0, 0, 0.1);\n  position: absolute;\n  z-index: 1000;\n  background: #535353;\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: center;\n  width: 40px;\n  left: 100px;\n  top: 100px;\n  border-radius: 5px;\n  transition: width .4s; }\n  .tools-wrapper div.tool {\n    padding: 5px;\n    width: 34px;\n    height: 100%;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    cursor: pointer; }\n  .tools-wrapper div.tool:hover {\n    background: #777; }\n\n.wrapper {\n  display: none;\n  z-index: 10;\n  position: relative;\n  overflow: scroll; }\n  .wrapper .coords-x-wrapper, .wrapper .coords-y-wrapper {\n    font-size: .7rem;\n    line-height: 30px;\n    display: flex;\n    color: white;\n    position: absolute;\n    left: 0;\n    top: 0;\n    z-index: 100;\n    height: 20px;\n    width: 100%;\n    background: #474747;\n    color: #ccc; }\n    .wrapper .coords-x-wrapper .coords-x, .wrapper .coords-y-wrapper .coords-x {\n      width: calc(100% - 20px);\n      display: flex; }\n      .wrapper .coords-x-wrapper .coords-x div, .wrapper .coords-y-wrapper .coords-x div {\n        flex-shrink: 0;\n        height: 20px;\n        text-indent: 2px;\n        box-sizing: border-box;\n        border-left: 1px solid #888; }\n  .wrapper .coords-y-wrapper {\n    line-height: inherit;\n    position: absolute;\n    z-index: 90;\n    flex-direction: column;\n    left: 0;\n    top: 0;\n    height: 100%;\n    width: 20px; }\n    .wrapper .coords-y-wrapper .coords-y div {\n      flex-shrink: 0;\n      white-space: pre-wrap;\n      text-align: center;\n      box-sizing: border-box;\n      border-top: 1px solid #888;\n      width: 20px; }\n\n.zoom-wrapper {\n  left: 0;\n  top: 0;\n  position: relative;\n  display: none; }\n  .zoom-wrapper .canvas-wrapper {\n    zoom: 1;\n    background: #fff;\n    display: block; }\n    .zoom-wrapper .canvas-wrapper textarea {\n      position: absolute;\n      font-size: 22px;\n      font-weight: 400;\n      border: 1px dashed black; }\n      .zoom-wrapper .canvas-wrapper textarea:focus {\n        outline: none; }\n    .zoom-wrapper .canvas-wrapper .main-canvas {\n      display: block; }\n    .zoom-wrapper .canvas-wrapper .canvas {\n      display: block;\n      position: absolute; }\n\n.close-wrapper {\n  position: absolute;\n  left: 0;\n  right: 0;\n  top: 0;\n  height: 35px;\n  background: #fff; }\n  .close-wrapper .close {\n    transition: .3s;\n    position: absolute;\n    padding: 0;\n    background: transparent;\n    border: none;\n    right: 0;\n    top: 0;\n    margin: auto;\n    bottom: 0;\n    width: 35px;\n    height: 35px; }\n    .close-wrapper .close:focus {\n      outline: none; }\n    .close-wrapper .close:hover {\n      background: CRIMSON;\n      cursor: pointer; }\n      .close-wrapper .close:hover::before, .close-wrapper .close:hover::after {\n        background: white; }\n    .close-wrapper .close::before, .close-wrapper .close::after {\n      transition: .3s;\n      position: absolute;\n      left: 50%;\n      top: 50%;\n      content: '';\n      display: block;\n      width: 75%;\n      height: 2px;\n      background: #34495E;\n      transform: translate(-50%, -50%) rotate(45deg); }\n    .close-wrapper .close::after {\n      transform: translate(-50%, -50%) rotate(-45deg); }\n\n.apply {\n  position: absolute;\n  right: 40px;\n  bottom: 25px;\n  height: 35px;\n  transition: .3s;\n  font-size: 22px;\n  padding: 5px;\n  border: none;\n  border-radius: 3px;\n  color: white;\n  background: #535353; }\n  .apply:active {\n    transform: scale(0.95); }\n  .apply:focus {\n    outline: none; }\n  .apply:hover {\n    background: #3a3a3a;\n    cursor: pointer; }\n\n.settings-window-size, .settings-new-file {\n  z-index: 10000;\n  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.3);\n  border: 1px solid blue;\n  font-size: 25px;\n  border-radius: 3px;\n  display: none;\n  background: #282828;\n  position: fixed;\n  padding: 75px 40px; }\n  .settings-window-size .input-wrapper, .settings-new-file .input-wrapper {\n    display: flex;\n    margin-bottom: 15px;\n    justify-content: space-between; }\n    .settings-window-size .input-wrapper input, .settings-new-file .input-wrapper input {\n      display: block;\n      padding: 5px;\n      border-radius: 3px;\n      border: none; }\n      .settings-window-size .input-wrapper input:focus, .settings-new-file .input-wrapper input:focus {\n        outline: none; }\n    .settings-window-size .input-wrapper label, .settings-new-file .input-wrapper label {\n      margin-right: 10px;\n      display: block;\n      color: white; }", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/lib/css-base.js":
/*!*************************************************!*\
  !*** ./node_modules/css-loader/lib/css-base.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function (useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if (item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function (modules, mediaQuery) {
		if (typeof modules === "string") modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for (var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if (typeof id === "number") alreadyImportedModules[id] = true;
		}
		for (i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if (mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if (mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */';
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}

/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./build/css/animate.css":
/*!*************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader!./build/css/animate.css ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../node_modules/css-loader!./animate.css */ "./node_modules/css-loader/index.js!./build/css/animate.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./build/css/main.css":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader!./build/css/main.css ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../node_modules/css-loader!./main.css */ "./node_modules/css-loader/index.js!./build/css/main.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/style-loader/lib/addStyles.js":
/*!****************************************************!*\
  !*** ./node_modules/style-loader/lib/addStyles.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target) {
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(/*! ./urls */ "./node_modules/style-loader/lib/urls.js");

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ "./node_modules/style-loader/lib/urls.js":
/*!***********************************************!*\
  !*** ./node_modules/style-loader/lib/urls.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
	// get current location
	var location = typeof window !== "undefined" && window.location;

	if (!location) {
		throw new Error("fixUrls requires window.location");
	}

	// blank or null?
	if (!css || typeof css !== "string") {
		return css;
	}

	var baseUrl = location.protocol + "//" + location.host;
	var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
 This regular expression is just a way to recursively match brackets within
 a string.
 	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
    (  = Start a capturing group
      (?:  = Start a non-capturing group
          [^)(]  = Match anything that isn't a parentheses
          |  = OR
          \(  = Match a start parentheses
              (?:  = Start another non-capturing groups
                  [^)(]+  = Match anything that isn't a parentheses
                  |  = OR
                  \(  = Match a start parentheses
                      [^)(]*  = Match anything that isn't a parentheses
                  \)  = Match a end parentheses
              )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
  \)  = Match a close parens
 	 /gi  = Get all matches, not the first.  Be case insensitive.
  */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function (fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl.trim().replace(/^"(.*)"$/, function (o, $1) {
			return $1;
		}).replace(/^'(.*)'$/, function (o, $1) {
			return $1;
		});

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
			return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
			//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};

/***/ }),

/***/ "./sass/main.sass":
/*!************************!*\
  !*** ./sass/main.sass ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 0:
/*!********************************************!*\
  !*** multi ./js/paint.js ./sass/main.sass ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./js/paint.js */"./js/paint.js");
module.exports = __webpack_require__(/*! ./sass/main.sass */"./sass/main.sass");


/***/ })

/******/ });
//# sourceMappingURL=build.js.map