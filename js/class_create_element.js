export default class Create_Element {
  constructor({ tag_name }) {
    console.log(123);
    this.elem = document.createElement(tag_name);
    return this;
  }
  add_classes(...classes) {
    for (let value of classes) {
      this.elem.classList.add(value);
    }
    return this;
  }
}
