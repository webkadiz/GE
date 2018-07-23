import APP from "./class_app";
import {
  get_height,
  get_width,
  get_left,
  get_top,
  visible,
  hidden,
  switcher,
  block,
  none,
  html,
  elem_center
} from "./addition_function";
import $ from "jquery";

export default class WRAPPER extends APP {
  constructor(canvas) {
    super();
    if (canvas) {
      this.canvas = canvas;
      this.s_canvas_wrapper = canvas.s_canvas_wrapper;
    }

    this.where_add;
    this.first;
    this.last;
    this.arr_coords;
    this.decision;
    this.get_size;
    this.breakdown = 50;

    this.title_height = 25;
    this.coords_size = 20;
    this.add_size = 400;

    this.h_canvas_wrapper = $('<div class="high-canvas-wrapper"></div>').appendTo("main");
    this.title_canvas_wrapper = $("<div class='title-canvas-wrapper'></div>").appendTo(this.h_canvas_wrapper);
    this.m_canvas_wrapper = $("<div class='middle-canvas-wrapper'></div>").appendTo(this.h_canvas_wrapper);
    this.coords_x_wrapper = $("<div class='coords-x-wrapper'></div>").appendTo(this.m_canvas_wrapper);
    this.coords_y_wrapper = $("<div class='coords-y-wrapper'></div>").appendTo(this.m_canvas_wrapper);

    console.log(this.h_canvas_wrapper);

    return this;
  }

  static get title_file_wrapper() {
    return document.querySelector(".title-file-wrapper");
  }
  static get SIZE_COORDS() {
    return 20;
  }

  static get HEIGHT_TITLE() {
    return 25;
  }
  static get ADD_SIZE() {
    return 400;
  }
  update(canvas) {
    this.canvas = canvas;
    this.s_canvas_wrapper = canvas.s_canvas_wrapper;
  }
  init() {
    this.title_canvas_wrapper.height(this.title_height);

    this.h_canvas_wrapper.height(get_height(html) - get_height(APP.header));

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
    // инициализация координат по оси Y

    this.canvas.coords_y = $("<div class='coords-y'></div>").appendTo(this.coords_y_wrapper); //приклепляем к канвасу div-координат-y

    this.init_value = { elem: wrapper_coords_y };

    this.create_coords_block(get_top(this.s_canvas_wrapper), "height", this.coords_size);

    // инициализация координат по оси X

    this.canvas.coords_x = $("<div class='coords-x'></div>").appendTo(this.coords_x_wrapper); //приклепляем к канвасу div-координат-x

    this.init_value = { elem: wrapper_coords_x };

    this.create_coords_block(get_left(this.s_canvas_wrapper), "width", this.coords_size);

    return this;
  }

  create_coords_block(size, size_decision, size_tools) {
    let size_begin = size - size_tools;
    let size_end;
    let size_end_counter = 0;
    let size_value = this.breakdown;
    let first_iter = true;

    if (size_decision == "height") {
      size_end = APP.wrapper_work.scrollHeight - size;
    } else if (size_decision == "width") {
      size_end = APP.wrapper_work.scrollWidth - size;
    }

    while (size_begin) {
      let text = "";
      if (size_begin % this.breakdown == 0) {
        text = size_begin;

        size_value = this.breakdown;
        size_begin -= this.breakdown;
      } else {
        size_value = size_begin % this.breakdown;
        size_begin -= size_value;
      }

      this.create_coords_div(size_decision, size_value, text);
    }

    while (size_end_counter < size_end) {
      let text = "";

      text = size_end_counter;

      size_value = this.breakdown;

      if (size_end - size_end_counter < this.breakdown) {
        size_value = size_end % this.breakdown;

        this.create_coords_div(size_decision, size_value);
      } else {
        if (first_iter) {
          if (size_decision == "width") {
            this.canvas.zero_coords_x = this.create_coords_div(size_decision, size_value, text);
          } else if (size_decision == "height") {
            this.canvas.zero_coords_y = this.create_coords_div(size_decision, size_value, text);
          }

          first_iter = false;
        } else {
          this.create_coords_div(size_decision, size_value, text);
        }
      }

      size_end_counter += this.breakdown;
    }
  }

  change_coords() {
    let coefficient_x = get_width(APP.wrapper_zoom) / this.canvas.prev_width; // коэффициент-x
    let coefficient_y = get_height(APP.wrapper_zoom) / this.canvas.prev_height; // коэффициент-y

    // устанавливаем div , куда добавлять элементы
    this.init_value = {
      elem: this.canvas.coords_x,
      decision: "width",
      get_size: get_width
    };
    //изменили ширину каждой координаты в зависимости от коэффициента
    ``;
    for (let item of this.canvas.coords_x.children) {
      item.style.width = get_width(item) * coefficient_x + "px";
    }

    this.check_coords();

    this.init_value = {
      elem: this.canvas.coords_y,
      decision: "height",
      get_size: get_height
    };

    for (let item of this.canvas.coords_y.children) {
      item.style.height = get_height(item) * coefficient_y + "px";
    }

    this.check_coords();
  }

  check_coords() {
    let difference_width_begin;
    let difference_width_end;

    let text_begin = parseFloat(this.first.nextElementSibling.textContent.replace(/\n/g, "")) || 0;
    let text_end = parseFloat(this.last.previousElementSibling.textContent.replace(/\n/g, "")) || 0;

    if (this.decision == "width") {
      difference_width_begin =
        this.canvas.zero_coords_x.getBoundingClientRect().left - APP.wrapper_zoom.getBoundingClientRect().left;
    } else if (this.decision == "height") {
      difference_width_begin =
        this.canvas.zero_coords_y.getBoundingClientRect().top - APP.wrapper_zoom.getBoundingClientRect().top;
    }

    if (difference_width_begin > 0) {
      //check start
      this.check_positive(difference_width_begin, this.first);

      if (this.decision == "width") {
        difference_width_end = APP.wrapper_work.scrollWidth - get_width(APP.wrapper_coords_x);
      } else if (this.decision == "height") {
        difference_width_end = APP.wrapper_work.scrollHeight - get_height(APP.wrapper_coords_y);
      }

      //check end
      this.check_positive(difference_width_end, this.last);
    } else {
      //difference_width_begin < 0
      difference_width_begin = Math.abs(difference_width_begin);

      // check_start
      this.check_negative(difference_width_begin, this.first, text_begin, true);

      if (this.decision == "width") {
        difference_width_end =
          APP.wrapper_coords_x.getBoundingClientRect().right - this.last.getBoundingClientRect().right;
      } else if (this.decision == "height") {
        difference_width_end =
          APP.wrapper_coords_y.getBoundingClientRect().bottom - this.last.getBoundingClientRect().bottom;
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
    this.m_canvas_wrapper.on("scroll", function(e) {
      this.coords_x_wrapper.position({ left: this.m_canvas_wrapper.scrollTop, top: 0 });
      this.coords_y_wrapper.position({ top: this.m_canvas_wrapper.scrollLeft, left: 0 });
    });
    return this;
  }

  centering_canvas() {
    elem_center({
      elem: APP.wrapper_zoom,
      elem_wrapper: APP.wrapper_work,
      left_add: WRAPPER.SIZE_COORDS,
      top_add: WRAPPER.SIZE_COORDS
    });

    if (get_left(APP.wrapper_zoom) && get_top(APP.wrapper_zoom) < WRAPPER.SIZE_COORDS) {
      APP.wrapper_coords_x.set_width(get_width(APP.wrapper_zoom) + WRAPPER.ADD_SIZE);

      APP.wrapper_coords_y.set_height(get_height(APP.wrapper_zoom) + WRAPPER.ADD_SIZE);

      APP.wrapper_zoom.set_left(WRAPPER.ADD_SIZE / 2);
      APP.wrapper_zoom.set_top(WRAPPER.ADD_SIZE / 2);
    } else if (get_left(APP.wrapper_zoom) < WRAPPER.SIZE_COORDS) {
      APP.wrapper_coords_x.set_width(get_width(APP.wrapper_zoom) + WRAPPER.ADD_SIZE);

      if (get_top(APP.wrapper_zoom) > WRAPPER.SIZE_COORDS) {
        APP.wrapper_coords_y.set_height(APP.wrapper_work);
      }

      elem_center({
        only_top: true,
        elem: APP.wrapper_zoom,
        elem_wrapper: APP.wrapper_work,
        left_add: WRAPPER.ADD_SIZE / 2,
        top_add: WRAPPER.SIZE_COORDS
      });
    } else if (get_top(APP.wrapper_zoom) < WRAPPER.SIZE_COORDS) {
      APP.wrapper_coords_y.set_height(get_height(APP.wrapper_zoom) + WRAPPER.ADD_SIZE);

      if (get_left(APP.wrapper_zoom) > WRAPPER.SIZE_COORDS) {
        APP.wrapper_coords_x.set_width(APP.wrapper_work);
      }

      elem_center({
        only_left: true,
        elem: APP.wrapper_zoom,
        elem_wrapper: APP.wrapper_work,
        top_add: WRAPPER.ADD_SIZE / 2,
        left_add: WRAPPER.SIZE_COORDS
      });
    } else {
      APP.wrapper_coords_x.set_width(get_width(APP.wrapper_work));
      APP.wrapper_coords_y.set_height(get_height(APP.wrapper_work));
    }

    return this;
  }
}
