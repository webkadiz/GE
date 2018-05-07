import APP from "../class_app";
import TOOLS_COMPONENTS from "./class_tools_components";
import {
  get_height,
  get_width,
  get_x,
  get_y,
  get_left,
  get_top,
  visible,
  hidden,
  switcher,
  block,
  none
} from "../addition_function";
import "fabric";

export default class TOOLS_DRAW extends TOOLS_COMPONENTS {
  constructor(wrapper) {
    super(wrapper)
      .create_drag_panel(switcher(this.drag_panel_func.bind(this), 2, 0.5))
      .create_drag_place();

    this.move = {
      elem_setting: document.querySelector(".header-panel-settings-move"),
      elem: document.querySelector(".move-badge"),
      class_name: ".move-badge",
      func_event: this.move_func_event.bind(this),
      func_start: this.move_func_start.bind(this),
      func_end: this.move_func_end.bind(this),
      settings: {}
    };
    this.pencil = {
      elem_setting: document.querySelector(".header-panel-settings-pencil"),
      elem: document.querySelector(".pencil-badge"),
      class_name: ".pencil-badge",
      func_event: this.pencil_func_event.bind(this),
      func_start: this.pencil_func_start.bind(this),
      func_end: this.pencil_func_end.bind(this),
      settings: {
        width: 1,
        color: "#000"
      }
    };
    this.text = {
      elem_setting: document.querySelector(".header-panel-settings-text"),
      elem: document.querySelector(".text-badge"),
      class_name: ".text-badge",
      func_event: this.text_func_event.bind(this),
      func_start: this.text_func_start.bind(this),
      func_end: this.text_func_end.bind(this),
      settings: {}
    };
    this.pouring = {
      elem_setting: document.querySelector(".header-panel-settings-pouring"),
      elem: document.querySelector(".pouring-badge"),
      class_name: ".pouring-badge",
      func_event: this.pouring_func_event.bind(this),
      func_start: this.pouring_func_start.bind(this),
      func_end: this.pouring_func_end.bind(this),
      settings: {}
    };
    this.rubber = {
      elem_setting: document.querySelector(".header-panel-settings-rubber"),
      elem: document.querySelector(".rubber-badge"),
      class_name: ".rubber-badge",
      func_event: this.rubber_func_event.bind(this),
      func_start: this.rubber_func_start.bind(this),
      func_end: this.rubber_func_end.bind(this),
      settings: {}
    };
    this.square = {
      elem_setting: document.querySelector(".header-panel-settings-square"),
      elem: document.querySelector(".square-badge"),
      class_name: ".square-badge",
      func_event: this.square_func_event.bind(this),
      func_start: this.square_func_start.bind(this),
      func_end: this.square_func_end.bind(this),
      settings: {
        stroke: "#000"
      }
    };
    this.line = {
      elem_setting: document.querySelector(".header-panel-settings-line"),
      elem: document.querySelector(".line-badge"),
      class_name: ".line-badge",
      func_event: this.line_func_event.bind(this),
      func_start: this.line_func_start.bind(this),
      func_end: this.line_func_end.bind(this),
      settings: {
        stroke: "#000"
      }
    };
  }
  drag_panel_func(value) {
    this.wrapper.style.width = get_width(this.wrapper) * value + "px";
  }

  // START
  move_func_start() {
    APP.canvas.selection = true;
    console.log(APP.canvas.getObjects());

    APP.canvas.forEachObject(item => {
      item.hasControls = true;
    });
  }
  pencil_func_start() {
    APP.canvas.selection = false;
    APP.canvas.isDrawingMode = true;
  }
  text_func_start() {}
  pouring_func_start() {}
  rubber_func_start() {}
  square_func_start() {}
  line_func_start() {}

  //END
  move_func_end() {
    APP.canvas.forEachObject(item => {
      item.hasControls = false;
    });
  }
  pencil_func_end() {
    APP.canvas.isDrawingMode = false;
  }
  text_func_end() {}
  pouring_func_end() {}
  rubber_func_end() {}
  square_func_end() {}
  line_func_end() {}

  //EVENT
  move_func_event(e) {}
  pencil_func_event(props) {
    let e = props.e;
    let x = get_x(e);
    let y = get_y(e);

    APP.canvas.freeDrawingBrush.width = this.pencil.settings.width;
    APP.canvas.freeDrawingBrush.color = this.pencil.settings.color;
  }
  text_func_event(props) {
    let x = get_x(props.e);
    let y = get_y(props.e);

    this.text.settings.left = x;
    this.text.settings.top = y;

    console.log(this.text.settings);

    let text = new fabric.IText("", this.text.settings);

    APP.canvas.add(text);

    text.enterEditing();

    console.log(text);
  }
  pouring_func_event(e) {}
  rubber_func_event(e) {}
  square_func_event(props) {
    APP.canvas.selection = false;

    if (!props.target) {
      let x1 = get_x(props.e);
      let y1 = get_y(props.e);

      console.log(this.square.settings);

      this.square.settings.left = x1;
      this.square.settings.top = y1;
      this.square.settings.width = 0;
      this.square.settings.height = 0;
      this.square.settings.hasControls = false;

      let rect = new fabric.Rect(this.square.settings);

      APP.canvas.on("mouse:move", function(props) {
        let x = get_x(props.e);
        let y = get_y(props.e);
        let x2 = x - x1;
        let y2 = y - y1;

        if (x < x1 && y < y1) {
          rect.set({ left: x, top: y, width: Math.abs(x2), height: Math.abs(y2) });
        } else if (x < x1) {
          rect.set({ left: x, width: Math.abs(x2), height: Math.abs(y2) });
        } else if (y < y1) {
          rect.set({ top: y, width: Math.abs(x2), height: Math.abs(y2) });
        } else {
          rect.set({ width: x2, height: y2 });
        }

        APP.canvas.renderAll();

        rect.render(APP.canvas.getContext());
      });

      APP.canvas.on("mouse:up", function() {
        APP.canvas.add(rect);

        APP.canvas.renderAll();

        APP.canvas.off("mouse:move");
        APP.canvas.off("mouse:up");
      });
    }
  }
  line_func_event(props) {
    APP.canvas.selection = false;

    if (!props.target) {
      let x = get_x(props.e);
      let y = get_y(props.e);

      this.line.settings.hasControls = false;

      console.log(this.line.settings);

      let line = new fabric.Line([x, y, x, y], this.line.settings);

      APP.canvas.on("mouse:move", function(props) {
        let x = get_x(props.e);
        let y = get_y(props.e);

        line.set({ x2: x, y2: y });

        APP.canvas.renderAll();

        line.render(APP.canvas.getContext());
      });

      APP.canvas.on("mouse:up", function() {
        console.log(123);
        APP.canvas.add(line);

        APP.canvas.off("mouse:move");
        APP.canvas.off("mouse:up");
      });
    }
  }
}
