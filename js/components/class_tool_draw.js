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
      elem: document.querySelector(".move-badge"),
      class_name: ".move-badge",
      func_event: this.move_func_event,
      func_start: this.move_func_start,
      func_end: this.move_func_end
    };
    this.pencil = {
      elem: document.querySelector(".pencil-badge"),
      class_name: ".pencil-badge",
      func_event: this.pencil_func_event,
      func_start: this.pencil_func_start,
      func_end: this.pencil_func_end
    };
    this.text = {
      elem: document.querySelector(".text-badge"),
      class_name: ".text-badge",
      func_event: this.text_func_event,
      func_start: this.text_func_start,
      func_end: this.text_func_end
    };
    this.pouring = {
      elem: document.querySelector(".pouring-badge"),
      class_name: ".pouring-badge",
      func_event: this.pouring_func_event,
      func_start: this.pouring_func_start,
      func_end: this.pouring_func_end
    };
    this.rubber = {
      elem: document.querySelector(".rubber-badge"),
      class_name: ".rubber-badge",
      func_event: this.rubber_func_event,
      func_start: this.rubber_func_start,
      func_end: this.rubber_func_end
    };
    this.square = {
      elem: document.querySelector(".square-badge"),
      class_name: ".square-badge",
      func_event: this.square_func_event,
      func_start: this.square_func_start,
      func_end: this.square_func_end
    };
    this.line = {
      elem: document.querySelector(".line-badge"),
      class_name: ".line-badge",
      func_event: this.line_func_event,
      func_start: this.line_func_start,
      func_end: this.line_func_end
    };
  }
  drag_panel_func(value) {
    this.wrapper.style.width = get_width(this.wrapper) * value + "px";
  }
  move_func_start() {
    APP.canvas.selection = true;
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

  move_func_end() {}
  pencil_func_end() {
    APP.canvas.isDrawingMode = false;
  }
  text_func_end() {}
  pouring_func_end() {}
  rubber_func_end() {}
  square_func_end() {}
  line_func_end() {}

  move_func_event(e) {}
  pencil_func_event(props) {
    let e = props.e;
    let x = get_x(e);
    let y = get_y(e);
  }
  text_func_event(props) {
    if (!props.target) {
      let x = get_x(props.e);
      let y = get_y(props.e);

      let text = new fabric.IText("", { left: x, top: y, width: 20, height: 2 });

      APP.canvas.add(text);

      text.enterEditing();

      console.log(text);
    }
  }
  pouring_func_event(e) {}
  rubber_func_event(e) {}
  square_func_event(props) {
    APP.canvas.selection = false;

    if (!props.target) {
      let x1 = get_x(props.e);
      let y1 = get_y(props.e);

      let rect = new fabric.Rect({ stroke: "#000", left: x1, top: y1, width: 0, height: 0, hasControls: false });

      APP.canvas.add(rect).setActiveObject(rect);

      APP.canvas.on("mouse:move", function(props) {
        let x2 = get_x(props.e) - x1;
        let y2 = get_y(props.e) - y1;

        rect.set({ width: x2, height: y2 });

        APP.canvas.renderAll();
      });

      APP.canvas.on("mouse:up", function() {
        APP.canvas.renderAll();

        APP.canvas.off("mouse:move");
      });
    }
  }
  line_func_event(props) {
    APP.canvas.selection = false;

    if (!props.target) {
      let x = get_x(props.e);
      let y = get_y(props.e);

      let line = new fabric.Line([x, y, x, y], { stroke: "#000", hasControls: false });

      APP.canvas.add(line).setActiveObject(line);

      APP.canvas.on("mouse:move", function(props) {
        let x = get_x(props.e);
        let y = get_y(props.e);

        line.set({ x2: x, y2: y, ownCaching: false });

        APP.canvas.renderAll();
      });

      APP.canvas.on("mouse:up", function() {
        APP.canvas.renderAll();

        APP.canvas.off("mouse:move");
      });
    }
  }
}
