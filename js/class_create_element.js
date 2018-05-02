export default class CREATE_ELEMENT {
  constructor(tag_name) {
    this.elem = document.createElement(tag_name);

    this.elem.add_classes = this.add_classes;
    this.elem.add_child = this.add_child;
    this.elem.add_parent = this.add_parent;
    this.elem.add_id = this.add_id;

    return this.elem;
  }
  add_classes(...classes) {
    for (let value of classes) {
      this.classList.add(value);
    }
    return this;
  }
  add_id(id) {
    this.id = id;
    return this;
  }
  add_parent(parent, where) {
    parent.insertBefore(this, where);
    return this;
  }
  add_child(child, where) {
    if (typeof child === "string") {
      this.insertAdjacentHTML("beforeEnd", child);
    } else {
      this.insertBefore(child, where);
    }

    return this;
  }
}
