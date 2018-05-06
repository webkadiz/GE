import { get_height, get_width, get_left, get_top, visible, hidden, switcher, block, none } from "./addition_function";

export default class APP {
  constructor() {}

  static get active_tool() {
    return document.querySelector(".tool-item.active");
  }
  static get header_panel() {
    return document.querySelector(".header-panel-settings");
  }
  static get header() {
    return document.querySelector("header");
  }
  static get wrapper_main() {
    return document.querySelector(".main-wrapper");
  }
  static get wrapper_main_canvas() {
    return document.querySelector(".main-wrapper-canvas");
  }
  static get wrapper_work() {
    return document.querySelector(".work-wrapper");
  }
  static get wrapper_coords_x() {
    return document.querySelector(".coords-x-wrapper");
  }
  static get wrapper_coords_y() {
    return document.querySelector(".coords-y-wrapper");
  }

  static get wrapper_zoom() {
    return document.querySelector(".zoom-wrapper.active ");
  }
}
APP.canvas_counter = 1;
