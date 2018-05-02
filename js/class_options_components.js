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
  elem_center,
  html
} from "./addition_function";

export default class OPTIONS_COMPONENTS extends APP {
  constructor({ class_option, class_setting }) {
    super();
    this.elem_option = document.querySelector(`.${class_option}`);
    if (class_setting) {
      this.elem_setting = document.querySelector(`.${class_setting}`);
      this.apply = this.elem_setting.querySelector(".apply");
    }
  }
  set_appear(func) {
    this.elem_option.addEventListener("mouseup", e => {
      if (this.elem_setting) {
        block(this.elem_setting);
        this.elem_setting.classList.remove("zoomOut");
        this.elem_setting.classList.add("zoomIn");

        func.call(this);

        elem_center({ elem: this.elem_setting });
      } else {
        func.call(this);
      }
    });
    return this;
  }
  set_apply(func) {
    if (this.apply) {
      if (func) {
        this.apply.addEventListener("mouseup", func.bind(this));
      } else {
        this.apply.addEventListener("mouseup", e => {
          alert(1);
        });
      }
    }
    return this;
  }
}
