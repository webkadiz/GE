import APP from "../class_app";
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
  drag
} from "../addition_function";
import CREATE_ELEMENT from "../class_create_element";
import CASING from "../class_casing";
import $ from "jquery";
import "jquery-ui-dist/jquery-ui";

export default class TOOLS_COMPONENTS extends APP {
  constructor(wrapper, func_panel = () => {}) {
    super();
    this.wrapper = wrapper;
    this.drag_panel;
    this.drag_place;
    this.create_drag_panel(func_panel);
    this.create_drag_place();

    $(this.wrapper).resizable({
      ghost: true,
      handles: "n, e, s, w, ne, se, sw, nw"
    });
  }
  create_drag_panel(drag_panel_func) {
    let panel = new CREATE_ELEMENT("div").add_classes("drag-panel");

    let arrow = new CREATE_ELEMENT("div").add_classes("drag-panel-arrow", "drag-panel-item");

    let close = new CREATE_ELEMENT("div").add_classes("drag-panel-close", "drag-panel-item");

    arrow.innerHTML = "<img width=11 height=11 src='img/rewind.png' />";

    close.onclick = () => none(this.wrapper);

    arrow.onclick = e => {
      arrow.classList.toggle("drag-panel-arrow-active");
      drag_panel_func();
    };

    panel.appendChild(arrow);
    panel.appendChild(close);

    this.drag_panel = panel;

    this.wrapper.prepend(panel);

    return this;
  }
  create_drag_place() {
    let place = new CREATE_ELEMENT("div").add_classes("drag-place").add_child('<img src="./img/drag.png" />');

    $(this.wrapper)
      .draggable({
        start: e => {
          this.wrapper.classList.contains("tool-active") ? this.wrapper.classList.remove("tool-active") : void 0;

          CASING.block();
        },
        stop: e => {
          CASING.none();
        },
        scroll: false,
        handle: ".drag-place , .drag-panel",
        addClasses: false,
        distance: 3
      })
      .css("position", "absolute");

    this.drag_panel.after(place);

    this.drag_place = place;
  }
  create_menu_bar() {}
  create_footer_bar() {}
}
