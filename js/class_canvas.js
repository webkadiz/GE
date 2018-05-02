import APP from "./class_app";
import CREATE_ELEMENT from "./class_create_element";
import "fabric";

export default class CANVAS extends APP {
  constructor({ title, width, height, background_color }) {
    super();

    let wrapper_zoom = new CREATE_ELEMENT("div").add_classes("zoom-wrapper", "active").add_parent(APP.wrapper_work);

    this.c = new fabric.Canvas(new CREATE_ELEMENT("canvas").add_classes("first-canvas").add_parent(wrapper_zoom), {
      width,
      height,
      backgroundColor: background_color,
      interactive: true,
      fireRightClick: true,
      stopContextMenu: true
    });

    this.c.wrapper_zoom = wrapper_zoom;

    this.c.zoom = 1;
    this.c.path = [];
    this.c.all_path = [];
    this.c.title = title;

    this.c.renderAll();

    console.log(this.c);

    return this.c;
  }
}
