import APP from "./class_app";

export default class CASING extends APP {
  constructor() {
    super();
    this.cases = document.querySelectorAll(".casing");
  }
  static get cases() {
    return document.querySelectorAll(".casing");
  }
  static block() {
    for (let item of CASING.cases) {
      item.style.display = "block";
    }
    return this;
  }
  static none() {
    for (let item of CASING.cases) {
      item.style.display = "none";
    }
    return this;
  }
  static event() {
    for (let item of CASING.cases) {
      item.onmouseover = e => {
        let related;
        try {
          related = e.relatedTarget.closest(".tool");
          console.log(e.relatedTarget);
        } catch (e) {}

        if (related) {
          item.onmouseup = e => {
            related.classList.add("tool-active");

            if (item.classList.contains("casing-left")) {
              APP.wrapper_main.prepend(related);
              related.set_left(0);
              related.set_top(0);
            }

            if (item.classList.contains("casing-right")) {
              APP.wrapper_main.append(related);
              related.set_left(related.getBoundingClientRect().left);
              related.set_top(0);
            }
            this.none();
          };
        }
      };
    }
    return this;
  }
}
