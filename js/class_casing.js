class Casing {
  constructor() {
    this.cases = document.querySelectorAll(".casing");
  }
  block() {
    for (let item of this.cases) {
      item.style.display = "block";
    }
    return this;
  }
  none() {
    for (let item of this.cases) {
      item.style.display = "none";
    }
    return this;
  }
  update() {
    this.cases = document.querySelectorAll(".casing");
  }

  event() {
    for (let item of this.cases) {
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
              window.main_wrapper.prepend(related);
              related.set_left(0);
              related.set_top(0);
            }

            if (item.classList.contains("casing-right")) {
              window.main_wrapper.append(related);
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

export default Casing;
