"use strict";

// переменные DOM-елементов
let html = document.documentElement; // html
let header = document.querySelector("header"); // шапка
let title = document.querySelector(".title-canvas-wrapper");
let all_apply_button = document.querySelectorAll(".apply"); // все кнопки подтвердить
let script = document.querySelector("script"); // последний script на странице

// переменные канваса
let wrapper = document.querySelector(".wrapper"); //конечный wrapper
let wrapper_coords_x = document.querySelector(".coords-x-wrapper");
let wrapper_coords_y = document.querySelector(".coords-y-wrapper");

let actual_canvas; //текущий канвас на экране
let template_canvas; // шаблон для всех канвасов
let zoom_wrapper; // обертка которая помогает реализовать zoom
let canvas_wrapper; //обертка канвасов
let canvas; //главный канвас
let c; //контекст главного канваса

let new_canvas; // новый canvas который создается в функции create_canvas
let new_c; //новый контекст который создается в функции create_canvas

// переменные помогающие запоминать предыдущий элемент
let counter = 0; // просто счетчик если понадобится
let prev_target; // предыдущая нажатая иконка , в обработчике на .main-nav - шапка painta
let temp_target; // предыдущий канвас , используется в функции move_canvas
let prev_title;

// все статические высоты
const wrapper_add_size = 400;
const height_title_file = 30; // константная высота менюшки с файлами
const height_menu = 171; //константная высота менюшки
const wrapper_coords_w_h = 20; // ширина и высоты системы координат
let height_header = 171; //  ширина шапки
let wrapper_top_tools = 20;
let wrapper_left_tools = 20;

// переменные , которые реализуют zoom
let zoom = 1; // множитель зума
let divide_width = 1; // отношения ширины холста к ширине экрана
let bias_left = 0; // смещение слева
let bias_top = 0; // смещение сверху

// массивы хранящие все действия пользователя
let arr_canvas = []; // все созданные канвасы , именно как созданные файлы
let clear_coords = []; // координаты пройденные с помощью ластика
let arr_textarea = []; // все созданные текстовые поля в функции create_textarea

let path = []; // все пути которые можно рисовать
let all_path = []; // обсолютно все

let path_delete = []; // удаленные пути через ctrl-z
let arr_context = []; // все контексты которые создаются

//все значки с функциями для делегирования из .nav-options

let arr_settings = [
  {
    class_badge: "options-new-file",
    class_settings: "settings-new-file",
    class_value: " .input-wrapper input",
    value_name: ["name", "width", "height"],

    appear_func: function() {
      let elem = document.querySelector("." + this.class_settings);

      let value = new Init_Value(this.class_settings, this.class_value, this.value_name);

      elem.style.display = "block";
      elem.classList.remove("zoomOut");
      elem.classList.add("zoomIn");

      //console.log(arr_canvas[arr_canvas.length - 1].canvas_name.slice(-1, -2));

      value.name.value = "Untitled-" + Init_Canvas.counter;

      value.width.value = html.clientWidth;
      value.height.value = html.clientHeight;

      new Centering_Element().all(elem);
    },

    service_func: function() {
      header.style.height = height_menu + height_title_file + "px";
      wrapper.style.top = height_menu + height_title_file + "px";
      height_header = height_menu + height_title_file;

      title.style.display = "block";
      wrapper.style.display = "block";

      zoom_wrapper.style.display = "none";

      try {
        prev_title.classList.remove("active");
        wrapper_coords_x.querySelector(".coords-x").remove();
        wrapper_coords_y.querySelector(".coords-y").remove();
      } catch (e) {}

      let value = new Init_Value(this.class_settings, this.class_value, this.value_name).init();

      // новый титл в шапке
      let new_title = document.createElement("div");
      new_title.classList.add("title-canvas");
      new_title.classList.add("active");

      new_title.setAttribute("data-canvas-name", value.name);
      new_title.innerHTML = value.name + "<span>&times;</span>";

      title.appendChild(new_title);

      prev_title = new_title;

      // клонирование канваса
      let new_main_canvas = template_canvas.zoom_wrapper.cloneNode(true);

      new_main_canvas.setAttribute("data-canvas-name", value.name);

      new_main_canvas = new Init_Canvas(new_main_canvas, new_title)
        .init()
        .block()
        .add_wrapper()
        .init_size(value.width, value.height);

      wrapper.style.height = html.clientHeight - height_header + "px";

      new Centering_Element().all_elem(zoom_wrapper, wrapper, wrapper_left_tools, wrapper_top_tools);

      new Init_Wrapper(new_main_canvas).check().init_coords();

      get_zoom();
      get_bias();

      arr_canvas.push(new_main_canvas);
    }
  },
  {
    class_badge: "options-window-size",
    class_settings: "settings-window-size",
    class_value: " .input-wrapper input",
    value_name: ["width", "height"],
    appear_func: function() {
      let elem = document.querySelector("." + this.class_settings);

      let value = new Init_Value(this.class_settings, this.class_value, this.value_name);

      value.width.value = canvas.width;
      value.height.value = canvas.height;

      elem.style.display = "block";
      elem.classList.remove("zoomOut");
      elem.classList.add("zoomIn");

      new Centering_Element().all(elem);
    },

    service_func: function() {
      let value = new Init_Value(this.class_settings, this.class_value, this.value_name).init();

      new Init_Canvas(zoom_wrapper).init_size(value.width, value.height);

      new Centering_Element().all_elem(zoom_wrapper, wrapper, wrapper_left_tools, wrapper_top_tools);

      new Init_Wrapper().check().change_coords();

      get_zoom();
      get_bias();
    }
  }
];
// все значки с функциями для делегирования из tools
let arr_class = [
  {
    class: "pencil-badge",
    func: draw_pencil,
    event: "mousedown"
  },
  {
    class: "rubber-badge",
    func: moveToRubber,
    event: "mousedown",
    string: "add",
    service_func: function(string) {
      if (string == "remove") {
        canvas_wrapper.classList.remove("rubber-canvas-active");
        this.string = "add";
      } else if (string == "add") {
        canvas_wrapper.classList.add("rubber-canvas-active");
        this.string = "remove";
      }
    }
  },
  {
    class: "text-badge",
    func: text_click,
    event: "dblclick"
  },
  {
    class: "pouring-badge",
    func: fill,
    event: "mousedown"
  },
  {
    class: "square-badge",
    func: beginRect,
    event: "mousedown"
  },
  {
    class: "line-badge",
    func: draw_line,
    event: "mousedown"
  },
  {
    class: "move-badge",
    func: move_canvas,
    event: "mousedown",
    service_func: function() {
      if (temp_target) {
        temp_target.style.border = "";
      }
      temp_target = undefined;
    }
  }
];

// блок объявления классов

class Init_Wrapper {
  constructor(canvas) {
    this.canvas = canvas;
    this.where_add;
    this.first;
    this.last;
    this.arr_coords;
    this.decision;
    this.get_size;
    return this;
  }
  set init_value(options) {
    try {
      this.where_add = options.elem || this.where_add;
      this.first = options.elem.firstElementChild || this.where_add.firstElementChild;
      this.last = options.elem.lastElementChild || this.where_add.lastElementChild;
      this.arr_coords = options.elem.children || this.where_add.children;
      this.decision = options.decision || this.decision;
      this.get_size = options.get_size || this.get_size;
    } catch (e) {}
  }

  init_coords() {
    let width_breakdown = 50;
    let wrapper_coords;
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

  create_coords_block(size, size_decision, breakdown, size_tools) {
    let size_begin = size - size_tools;
    let size_end;
    let size_end_counter = 0;
    let size_value = breakdown;
    let first_iter = true;

    if (size_decision == "height") {
      size_end = wrapper.scrollHeight - size;
    } else if (size_decision == "width") {
      size_end = wrapper.scrollWidth - size;
    }

    while (size_begin >= breakdown) {
      let text = "";
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
      let text = "";

      text = size_end_counter;

      if (size_end - size_end_counter < breakdown) {
        size_value = size_end % breakdown;

        this.create_coords_div(size_decision, size_value);
      } else {
        if (first_iter) {
          if (size_decision == "width") {
            actual_canvas.zero_coords_elem_x = this.create_coords_div(size_decision, size_value, text);
          } else if (size_decision == "height") {
            actual_canvas.zero_coords_elem_y = this.create_coords_div(size_decision, size_value, text);
          }

          first_iter = false;
        } else {
          this.create_coords_div(size_decision, size_value, text);
        }
      }

      size_end_counter += breakdown;
    }
  }

  change_coords() {
    let arr_coords_x = actual_canvas.coords_x.children,
      arr_coords_y = actual_canvas.coords_y.children,
      coefficient_x = zoom_wrapper.clientWidth / actual_canvas.prev_zoom_wrapper_width, // коэффициент-x
      coefficient_y = zoom_wrapper.clientHeight / actual_canvas.prev_zoom_wrapper_height; // коэффициент-y

    // устанавливаем div , куда добавлять элементы
    this.init_value = {
      elem: actual_canvas.coords_x,
      decision: "width",
      get_size: get_width
    };
    //изменили ширину каждой координаты в зависимости от коэффициента
    Array.prototype.forEach.call(arr_coords_x, item => {
      item.style.width = get_width(item) * coefficient_x + "px";
    });

    this.check_coords();

    this.init_value = {
      elem: actual_canvas.coords_y,
      decision: "height",
      get_size: get_height
    };

    Array.prototype.forEach.call(arr_coords_y, item => {
      item.style.height = get_height(item) * coefficient_y + "px";
    });

    this.check_coords();
  }

  check_coords() {
    let difference_width_begin;
    let difference_width_end;

    let text_begin = parseFloat(this.first.nextElementSibling.textContent.replace(/\n/g, "")) || 0;
    let text_end = parseFloat(this.last.previousElementSibling.textContent.replace(/\n/g, "")) || 0;

    if (this.decision == "width") {
      difference_width_begin =
        actual_canvas.zero_coords_elem_x.getBoundingClientRect().left - zoom_wrapper.getBoundingClientRect().left;
    } else if (this.decision == "height") {
      difference_width_begin =
        actual_canvas.zero_coords_elem_y.getBoundingClientRect().top - zoom_wrapper.getBoundingClientRect().top;
    }

    if (difference_width_begin > 0) {
      //check start
      this.check_positive(difference_width_begin, this.first);

      if (this.decision == "width") {
        difference_width_end = wrapper.scrollWidth - get_width(wrapper_coords_x);
      } else if (this.decision == "height") {
        difference_width_end = wrapper.scrollHeight - get_height(wrapper_coords_y);
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
        difference_width_end =
          wrapper_coords_y.getBoundingClientRect().bottom - this.last.getBoundingClientRect().bottom;
      }
      //check end
      this.check_negative(difference_width_end, this.last, text_end, false);
    }
  }

  check_positive(difference, elem) {
    while (difference > this.get_size(elem)) {
      difference -= this.get_size(elem);

      let temp = elem.nextElementSibling || elem.previousElementSibling;

      elem.remove();

      elem = temp;
    }

    elem.style[this.decision] = this.get_size(elem) - difference + "px";

    elem.innerHTML = "";
  }

  check_negative(difference, elem, text, flag) {
    let middle_width = this.get_size(this.arr_coords[Math.round(this.arr_coords.length / 2)]);

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

  create_coords_div(flag, size, text = "", add_begin) {
    let temp_div = document.createElement("div");

    if (flag == "width") {
      temp_div.style.width = size + "px";
    } else if (flag == "height") {
      temp_div.style.height = size + "px";
      text = Array.prototype.reduce.call(
        String(text),
        (res, item) => {
          return res + item + "\n";
        },
        ""
      );
    }

    temp_div.textContent = text;

    if (add_begin) {
      this.where_add.insertBefore(temp_div, this.where_add.firstElementChild);
    } else {
      this.where_add.appendChild(temp_div);
    }

    return temp_div;
  }

  event_scroll() {
    wrapper.addEventListener("scroll", function(e) {
      wrapper_coords_x.style.top = wrapper.scrollTop + "px";
    });
    return this;
  }

  check() {
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
}

class Init_Value {
  constructor(class_settings, selector_value, name_value) {
    this.class_settings = class_settings;
    this.value = document.querySelectorAll("." + class_settings + selector_value);
    this.name_value = name_value;

    this.name_value.forEach((item, i) => {
      this[item] = this.value[i];
    });

    return this;
  }

  init() {
    this.name_value.forEach((item, i) => {
      this[item] = this.value[i].value;
    });
    return this;
  }
}

class Init_Canvas {
  constructor(new_canvas, new_title) {
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

  init() {
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
  init_size(width, height) {
    this.canvas_wrapper.style.width = (parseFloat(width || 0) || 0) + "px";
    this.canvas_wrapper.style.height = (parseFloat(height || 0) || 0) + "px";

    this.canvas.width = width;
    this.canvas.height = height;
    return this;
  }
  init_coords() {
    try {
      wrapper_coords_x.querySelector(".coords-x").remove();
      wrapper_coords_y.querySelector(".coords-y").remove();
    } catch (e) {}
    wrapper_coords_x.appendChild(this.coords_x);
    wrapper_coords_y.appendChild(this.coords_y);

    return this;
  }
  block() {
    this.zoom_wrapper.style.display = "inline-block";
    return this;
  }
  none() {
    this.zoom_wrapper.style.display = "none";
    return this;
  }
  add_title_class() {
    this.title.classList.add("active");
    prev_title = this.title;
    return this;
  }
  remove_title_class() {
    this.title.classList.remove("active");
    return this;
  }
  add_wrapper() {
    wrapper.appendChild(this.zoom_wrapper);
    return this;
  }
}

// блок инизиализация в начале программы

Init_Canvas.counter = 0; // счетчик канвасов

template_canvas = new Init_Canvas(document.querySelector(".zoom-wrapper")).init();

new Init_Wrapper().event_scroll();

// просто задаем стили в HTML
header.style.height = height_menu + "px";

title.style.height = height_title_file + "px";

canvas_wrapper.style.zoom = 1;

// обработчик на каждую кнопку подтвердить с соответствующей функцией из массива arr_settings
all_apply_button.forEach(item => {
  item.addEventListener("click", e => {
    let target = item.parentElement;
    target.classList.remove("zoomIn");
    target.classList.add("zoomOut");

    arr_settings.forEach(item => {
      if (target.classList.contains(item.class_settings)) {
        item.service_func();
      }
    });

    setTimeout(() => {
      target.style.display = "";
    }, 500);
  });
});

title.addEventListener("click", function(e) {
  let target = e.target;
  let all_title = title.querySelectorAll(".title-canvas");

  for (let i = 0; i < arr_canvas.length; i++) {
    if (target.getAttribute("data-canvas-name") == arr_canvas[i].canvas_name) {
      new Init_Canvas(arr_canvas[i])
        .init()
        .block()
        .add_title_class()
        .init_coords();

      get_zoom();
      get_bias();
    } else {
      arr_canvas[i].remove_title_class();
      arr_canvas[i].none();
    }
  }

  if (target.tagName == "SPAN") {
    target = target.closest(".title-canvas");
    for (let i = 0; i < arr_canvas.length; i++) {
      if (target.getAttribute("data-canvas-name") == arr_canvas[i].canvas_name) {
        arr_canvas[i].title.remove();
        arr_canvas[i].zoom_wrapper.remove();

        arr_canvas.splice(i, 1);

        if (arr_canvas[i]) {
          new Init_Canvas(arr_canvas[i])
            .init()
            .block()
            .add_title_class()
            .init_coords();
        } else if (arr_canvas[i - 1]) {
          console.log(123);
          new Init_Canvas(arr_canvas[i - 1])
            .init()
            .block()
            .add_title_class()
            .init_coords();
        } else {
          header.style.height = height_menu + "px";
          wrapper.style.top = height_menu + "px";
          height_header = height_menu;

          title.style.display = "none";
          wrapper.style.display = "none";
        }

        get_zoom();
        get_bias();
      } else {
        arr_canvas[i].none();
      }
    }
  }
});

document.querySelector(".options").addEventListener("click", function(e) {
  e.preventDefault();
  let target = e.target;

  for (let i = 0; i < arr_settings.length; i++) {
    if (e.target.classList.contains(arr_settings[i].class_badge)) {
      arr_settings[i].appear_func();
    }
  }
});

// используем делегирование на шапке painta
document.querySelector(".main-nav").onclick = function(e) {
  let target = e.target;
  let new_target;

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

  for (let i = 0; i < arr_class.length; i++) {
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

document.addEventListener("keydown", function(e) {
  if ((e.keyCode == 90 && e.ctrlKey) || (e.keyCode == 90 && e.metaKey)) {
    path_remove();
  }

  // увеличение масштаба
  if (e.keyCode == 187 && e.ctrlKey && e.altKey) {
    actual_canvas.prev_zoom_wrapper_width = get_width(zoom_wrapper);
    actual_canvas.prev_zoom_wrapper_height = get_height(zoom_wrapper);

    canvas_wrapper.style.zoom = parseFloat(canvas_wrapper.style.zoom) + 0.05;

    new Centering_Element().all_elem(zoom_wrapper, wrapper, wrapper_left_tools, wrapper_top_tools);

    new Init_Wrapper().check().change_coords();

    get_zoom();
    get_bias();
  }
  // уменьшение масштаба
  if (e.keyCode == 189 && e.ctrlKey && e.altKey) {
    actual_canvas.prev_zoom_wrapper_width = get_width(zoom_wrapper);
    actual_canvas.prev_zoom_wrapper_height = get_height(zoom_wrapper);

    canvas_wrapper.style.zoom = parseFloat(canvas_wrapper.style.zoom) - 0.05;

    new Centering_Element().all_elem(zoom_wrapper, wrapper, wrapper_left_tools, wrapper_top_tools);

    new Init_Wrapper().check().change_coords();

    get_zoom();
    get_bias();
  }
});

// удаление пути через ctrl-z
function path_remove() {
  arr_context.forEach(item => {
    item.width = item.width;
    item.height = item.height;
  });

  canvas.width = canvas.width;
  canvas.height = canvas.height;

  let all_path_last = all_path[all_path.length - 1];
  let path_last = path[path.length - 1];

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
  path.forEach(item => {
    if (item.fill) {
      item.context.fillStyle = item.fillStyle[item.fillStyle.length - 1];
      item.context.fill(item.path);
    }
    if (item.shape == "text") {
      let temp = item.text_value;
      draw_text(temp.text, item.context, temp.line_height, temp.font_size, temp.font);
    }

    item.context.stroke(item.path);
  });

  // закрашиваем заново все ластиком
  clear_coords.forEach(item => {
    item.coords.forEach(item => {
      c.fillStyle = "#fff";
      c.fillRect(item.x, item.y, 16, 16);
    });
  });
}

// передвижение canvas
function move_canvas(e) {
  let target = e.target;
  let x;
  let y;

  if (temp_target == target && target !== canvas) {
    x = get_x(e);
    y = get_y(e);

    let begin_x = get_left(temp_target);
    let begin_y = get_top(temp_target);

    // запоминаем передвижения для отмены через ctrl-z
    all_path.push({
      isPath: false,
      left: temp_target.style.left,
      top: temp_target.style.top,
      move_canvas: true,
      target: temp_target
    });

    canvas_wrapper.onmousemove = function(e) {
      let new_x = get_x(e) - x;
      let new_y = get_y(e) - y;

      temp_target.style.left = begin_x + new_x + "px";
      temp_target.style.top = begin_y + new_y + "px";

      if (get_top(temp_target) < 0) {
        temp_target.style.top = "0px";
      }
    };

    temp_target.onmouseup = function() {
      canvas_wrapper.onmousemove = null;
    };

    document.onmouseup = function() {
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
  let target = e.target;
  let x = get_x(e) - get_left(target);
  let y = get_y(e) - get_top(target);

  c = target.getContext("2d");

  let current_path = {
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

  canvas_wrapper.onmousemove = function(e) {
    let current_target = e.target;

    let x = get_x(e) - get_left(current_target);
    let y = get_y(e) - get_top(current_target);

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

  document.onmouseup = function() {
    canvas_wrapper.onmousemove = null;
  };
  canvas_wrapper.onmouseup = function() {
    canvas_wrapper.onmousemove = null;
  };
}

// ластик
function moveToRubber(e) {
  let x = e.pageX;
  let y = e.pageY - height_header;
  let arr_coords = [];

  canvas_wrapper.onmousemove = function(e) {
    let x = e.pageX;
    let y = e.pageY;
    let target = document.elementFromPoint(x + 8, y + 8);
    let coords = {};
    let all_coords = {};

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
  canvas_wrapper.onmouseup = function() {
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
  let temp = line_height;
  for (let i = 0; i < text.length; i++) {
    c.font = `${font_size} ${font}`;
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
  let x = get_x(e);
  let y = get_y(e);
  let x1 = 0;
  let y1 = 0;

  if (!e.target.classList.contains("canvas-text") && e.target.tagName != "TEXTAREA") {
    create_textarea(x, y);
  }

  textarea = document.querySelectorAll(".canvas-textarea-text");

  for (let i = 0; i < textarea.length; i++) {
    if (textarea[i]) {
      textarea[i].onblur = function() {
        event_textarea(textarea[i]);
      };
    }
  }

  function event_textarea(textarea) {
    let text = textarea.value;
    let current_path = {};
    let font_size = "22px";
    let font = "sans-serif";
    let line_height = 30;
    let x = 0;
    let y = line_height;

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
    let width = new_c.measureText(text[0]).width;
    for (let i = 0; i < text.length; i++) {
      if (width < new_c.measureText(text[i]).width) width = new_c.measureText(text[i]).width;
    }

    new_canvas.width = width * (parseInt(font_size) / 10);
    new_canvas.height = text.length * line_height;

    draw_text(text, new_c, line_height, font_size, font);

    arr_textarea.push(canvas_wrapper.replaceChild(new_canvas, textarea));

    new_canvas.addEventListener("dblclick", function() {
      canvas_wrapper.replaceChild(arr_textarea[this.counter], this);
      arr_textarea[this.counter].focus();
    });

    counter++;
  }
}

//заливка

function fill(e) {
  let x = get_x(e) - get_left(e.target);
  let y = get_y(e) - get_top(e.target);

  let bool = false;
  let arr_new_path = [];

  canvas_wrapper.onmouseup = null;

  arr_new_path = path.filter(item => {
    return item.target == e.target;
  });

  arr_new_path.forEach(item => {
    if (item.context.isPointInPath(item.path, x, y)) {
      if (item.shape == false) bool = true;
    }
  });

  if (bool) {
    arr_new_path.forEach(item => {
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
    arr_new_path.forEach(item => {
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

document.querySelector(".shapes-controller").addEventListener("click", function() {
  document.querySelector(".dropdown-shapes-wrapper").classList.toggle("dropdown-shapes-wrapper-active");
});

// рисование прямоугольника

function beginRect(e) {
  let x1 = get_x(e);
  let y1 = get_y(e);
  let y = 0;
  let x = 0;
  let current_path = {};

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

  canvas_wrapper.onmousemove = function(e) {
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
  canvas_wrapper.onmouseup = function(e) {
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
  let x1 = get_x(e);
  let y1 = get_y(e);
  let x, y, begin_x, begin_y, end_x, end_y;

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

  canvas_wrapper.onmousemove = function(e) {
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
  canvas_wrapper.onmouseup = function(e) {
    path[path.length - 1].path.moveTo(begin_x, begin_y);
    path[path.length - 1].path.lineTo(end_x, end_y);

    canvas_wrapper.onmousemove = null;
  };
}

//создание нового canvas
function create_canvas(x1, y1, ...value_class) {
  new_canvas = document.createElement("canvas");
  new_c = new_canvas.getContext("2d");
  new_canvas.classList.add("canvas");

  value_class.forEach(item => {
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
  return (e.pageY + wrapper.scrollTop - height_header) * zoom - bias_top;
}

function get_left(elem) {
  return parseFloat(elem.style.left) || 0;
}
function get_top(elem) {
  return parseFloat(elem.style.top) || 0;
}

function get_width(elem) {
  let width;
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
  let height;
  try {
    if ((parseFloat(elem.style.height) || 0) > elem.clientHeight) {
      height = parseFloat(elem.style.height) || 0;
    } else {
      height = elem.clientHeight;
    }
  } catch (e) {}
  return height;
}

function get_zoom() {
  divide_width = canvas.width / html.clientWidth;

  zoom = html.clientWidth / zoom_wrapper.clientWidth * divide_width;
}

function get_bias() {
  bias_left = get_left(zoom_wrapper) * zoom;
  bias_top = get_top(zoom_wrapper) * zoom;
}

//класс центрировки элемента
function Centering_Element() {
  this.all = function(elem) {
    elem.style.left = html.clientWidth / 2 - elem.clientWidth / 2 + "px";
    elem.style.top = html.clientHeight / 2 - elem.clientHeight / 2 + "px";
  };

  this.all_elem = function(elem, wrapper, left_add = 0, top_add = 0) {
    elem.style.left = (wrapper.clientWidth + left_add) / 2 - elem.clientWidth / 2 + "px";
    elem.style.top = (wrapper.clientHeight + top_add) / 2 - elem.clientHeight / 2 + "px";
  };

  this.top = function(elem, left = 0, wrapper = html, top_add) {
    elem.style.top = (wrapper.clientHeight + top_add) / 2 - elem.clientHeight / 2 + "px";
    elem.style.left = left + "px";
  };

  this.left = function(elem, top = 0, wrapper = html, left_add) {
    elem.style.top = top + "px";
    elem.style.left = (wrapper.clientWidth + left_add) / 2 - elem.clientWidth / 2 + "px";
  };
  this.const_center = function(elem, left, top) {
    elem.style.top = top + "px";
    elem.style.left = left + "px";
  };
}

// закрытие окошек с настройками
let all_close_wrapper = document.querySelectorAll(".close-wrapper");
let all_close = document.querySelectorAll(".close");

all_close_wrapper.forEach(item => {
  item.addEventListener("mousedown", e => {
    let target = item.parentElement;
    let x = e.pageX;
    let y = e.pageY;
    let begin_x = get_left(target);
    let begin_y = get_top(target);

    document.onmousemove = function(e) {
      let new_x = e.pageX - x;
      let new_y = e.pageY - y;

      target.style.left = begin_x + new_x + "px";
      target.style.top = begin_y + new_y + "px";
    };

    target.onmouseup = function() {
      document.onmousemove = null;
    };

    document.onmouseup = function() {
      document.onmousemove = null;
    };
  });
});

all_close.forEach(item => {
  item.addEventListener("click", e => {
    item.parentElement.parentElement.classList.remove("zoomIn");
    item.parentElement.parentElement.classList.add("zoomOut");

    setTimeout(() => {
      item.parentElement.parentElement.style.display = "";
    }, 500);
  });
});
