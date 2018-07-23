import APP from "../class_app";
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
  none,
  once
} from "../addition_function";
import "fabric";

export default class TOOL_ALL {
  constructor(canvas) {
    this.canvas = canvas;

    this.move = {
      elem_setting: document.querySelector(".header-panel-settings-move"),
      elem: document.querySelector(".move-badge"),
      class_name: ".move-badge",
      event: "mouse:move",
      func_event: this.move_func_event.bind(this),
      func_start: this.move_func_start.bind(this),
      func_end: this.move_func_end.bind(this),
      settings: {}
    };
    this.pencil = {
      elem_setting: document.querySelector(".header-panel-settings-pencil"),
      elem: document.querySelector(".pencil-badge"),
      class_name: ".pencil-badge",
      event: "mouse:move",
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
      event: "mouse:down",
      func_event: this.text_func_event.bind(this),
      func_start: this.text_func_start.bind(this),
      func_end: this.text_func_end.bind(this),
      settings: {}
    };
    this.pouring = {
      elem_setting: document.querySelector(".header-panel-settings-pouring"),
      elem: document.querySelector(".pouring-badge"),
      class_name: ".pouring-badge",
      event: "mouse:down",
      func_event: this.pouring_func_event.bind(this),
      func_start: this.pouring_func_start.bind(this),
      func_end: this.pouring_func_end.bind(this),
      settings: {
        fill: "#000"
      }
    };
    this.rubber = {
      elem_setting: document.querySelector(".header-panel-settings-rubber"),
      elem: document.querySelector(".rubber-badge"),
      class_name: ".rubber-badge",
      event: "mouse:move",
      func_event: this.rubber_func_event.bind(this),
      func_start: this.rubber_func_start.bind(this),
      func_end: this.rubber_func_end.bind(this),
      settings: {
        stroke: "#000"
      }
    };
    this.square = {
      elem_setting: document.querySelector(".header-panel-settings-square"),
      elem: document.querySelector(".square-badge"),
      class_name: ".square-badge",
      event: "mouse:down",
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
      event: "mouse:down",
      func_event: this.line_func_event.bind(this),
      func_start: this.line_func_start.bind(this),
      func_end: this.line_func_end.bind(this),
      settings: {
        stroke: "#000"
      }
    };
    Object.assign(this.canvas, this.move, this.pencil);
  }

  // START
  move_func_start() {
    APP.canvas.on(this.move.event, this.move.func_event);

    APP.canvas.selection = true;
    APP.canvas.skipTargetFind = false;
  }
  pencil_func_start() {
    APP.canvas.selection = false;
    APP.canvas.isDrawingMode = true;
    APP.canvas.on(this.pencil.event, this.pencil.func_event);
  }
  text_func_start() {
    APP.canvas.on(this.text.event, this.text.func_event);
  }
  pouring_func_start() {
    APP.canvas.on("mouse:down", ({ e }) => {
      let x = get_x(e);
      let y = get_y(e);

      APP.canvas.forEachObject(
        (item, i) =>
          APP.canvas.containsPoint(e, item, { x, y })
            ? APP.canvas.item(i).set({ fill: this.pouring.settings.fill })
            : void 0
      );
    });
  }
  rubber_func_start() {
    APP.canvas.on("mouse:move", ({ e }) => {
      let x = get_x(e);
      let y = get_y(e);

      this.rubber.settings.radius = 16;
      this.rubber.settings.left = x - 16;
      this.rubber.settings.top = y - 16;
      this.rubber.settings.fill = "transparent";
      this.rubber.settings.stroke = "black";

      let circle = new fabric.Circle(this.rubber.settings);

      APP.canvas.renderAll();

      console.log(123);

      circle.render(APP.canvas.getContext());
    });
    APP.canvas.on("mouse:down", ({ e }) => {
      let x = get_x(e);
      let y = get_y(e);

      //APP.canvas.getContext().globalCompositeOperation = "destination-out";

      this.rubber.settings.radius = 16;
      this.rubber.settings.left = x - 16;
      this.rubber.settings.top = y - 16;
      this.rubber.settings.globalCompositeOperation = "destination-out";
      this.rubber.settings.fill = "red";

      APP.canvas.freeDrawingBrush.width = 20;

      APP.canvas.isDrawingMode = true;

      APP.canvas.getContext().globalCompositeOperation = "destination-out";

      //let circle = new fabric.Circle(this.rubber.settings);

      //APP.canvas.add(circle);

      APP.canvas.renderAll();
    });
  }
  square_func_start() {
    APP.canvas.on(this.square.event, this.square.func_event);
  }
  line_func_start() {
    APP.canvas.on(this.line.event, this.line.func_event);
  }

  //END
  move_func_end() {
    APP.canvas.off(this.move.event, this.move.func_event);
    APP.canvas.skipTargetFind = true;
    APP.canvas.selection = false;

    APP.canvas.discardActiveObject();
  }
  pencil_func_end() {
    APP.canvas.off(this.pencil.event, this.pencil.func_event);

    APP.canvas.isDrawingMode = false;
  }
  text_func_end() {
    APP.canvas.off(this.text.event, this.text.func_event);

    try {
      APP.canvas.item(APP.canvas.size() - 1).exitEditing();
    } catch (e) {}
  }
  pouring_func_end() {
    APP.canvas.off("mouse:down");
  }
  rubber_func_end() {
    APP.canvas.off("mouse:move");
    APP.canvas.off("mouse:down");

    APP.canvas.getContext().globalCompositeOperation = "source-over";
  }
  square_func_end() {
    APP.canvas.off(this.square.event, this.square.func_event);
  }
  line_func_end() {
    APP.canvas.off(this.line.event, this.line.func_event);
  }

  //EVENT
  move_func_event(e) {}
  pencil_func_event(props) {
    APP.canvas.freeDrawingBrush.width = this.pencil.settings.width;
    APP.canvas.freeDrawingBrush.color = this.pencil.settings.color;
  }
  text_func_event(props) {
    let x = get_x(props.e);
    let y = get_y(props.e);

    Object.assign(this.text.settings, {
      left: x,
      top: y
    });

    let text = new fabric.IText("", this.text.settings);

    APP.canvas.add(text);

    text.enterEditing();

    text.on("editing:exited", () => {
      if (text.text === "") APP.canvas.remove(text);
    });
  }

  pouring_func_event(e) {}
  rubber_func_event({ e }) {}
  square_func_event(props) {
    APP.canvas.selection = false;

    let x1 = get_x(props.e);
    let y1 = get_y(props.e);

    this.square.settings.left = x1;
    this.square.settings.top = y1;

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
  line_func_event(props) {
    APP.canvas.selection = false;

    let x = get_x(props.e);
    let y = get_y(props.e);

    let line = new fabric.Line([x, y, x, y], this.line.settings);

    APP.canvas.on("mouse:move", function(props) {
      let x = get_x(props.e);
      let y = get_y(props.e);

      line.set({ x2: x, y2: y });

      APP.canvas.renderAll();

      line.render(APP.canvas.getContext());
    });

    APP.canvas.on("mouse:up", function() {
      APP.canvas.add(line);

      APP.canvas.off("mouse:move");
      APP.canvas.off("mouse:up");
    });
  }
}
