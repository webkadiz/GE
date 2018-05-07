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

export default class TOOLS_TEXT extends TOOLS_COMPONENTS {
  constructor(wrapper) {
    super(wrapper)
      .create_drag_panel()
      .create_drag_place();
  }
}
