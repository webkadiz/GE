import APP from "./class_app";

export let html = document.documentElement;

Object.defineProperty(Array.prototype, "remove", {
  value(value) {
    let index = this.indexOf(value);

    if (index !== -1) {
      return this.splice(index, 1);
    }
    return false;
  },
  enumerable: false
});

Object.defineProperty(Array.prototype, "next", {
  value(value) {
    let index = this.indexOf(value);

    if (index !== -1) {
      return this[index + 1];
    }
    return false;
  },
  enumerable: false
});

Object.defineProperty(Array.prototype, "prev", {
  value(value) {
    let index = this.indexOf(value);

    if (index !== -1) {
      return this[index - 1];
    }
    return false;
  },
  enumerable: false
});

Object.defineProperty(Object.prototype, "set_left", {
  value(size) {
    this.style.left = size + "px";
  },
  enumerable: false
});

Object.defineProperty(Object.prototype, "set_top", {
  value(size) {
    this.style.top = size + "px";
  },
  enumerable: false
});
Object.defineProperty(Object.prototype, "set_width", {
  value(size) {
    this.style.width = size + "px";
  },
  enumerable: false
});
Object.defineProperty(Object.prototype, "set_height", {
  value(size) {
    this.style.height = size + "px";
  },
  enumerable: false
});

export function visible(elem) {
  elem.style.visibility = "visible";
}
export function hidden(elem) {
  elem.style.visibility = "hidden";
}

export function block(elem) {
  elem.style.display = "block";
}
export function none(elem) {
  elem.style.display = "none";
}

export function get_left(elem) {
  try {
    let left = parseFloat(elem.style.left);
    if (!left) {
      left = elem.offsetLeft;
    }
    return left;
  } catch (e) {}
}
export function get_top(elem) {
  try {
    let top = parseFloat(elem.style.top);
    if (!top) {
      top = elem.offsetTop;
    }
    return top;
  } catch (e) {}
}

export function get_width(elem) {
  let width;
  try {
    if ((parseFloat(elem.style.width) || 0) > elem.clientWidth) {
      width = parseFloat(elem.style.width) || 0;
    } else {
      width = elem.clientWidth;
    }
  } catch (e) {}
  return width;
}

export function get_height(elem) {
  let height;
  try {
    if ((parseFloat(elem.style.height) || 0) > elem.clientHeight) {
      height = parseFloat(elem.style.height) || 0;
    } else {
      height = elem.clientHeight;
    }
  } catch (e) {}
  return height;
}

export function switcher(f, value1, value2) {
  let flag = true;
  return function() {
    if (flag) {
      f(value1);
      flag = false;
    } else {
      f(value2);
      flag = true;
    }
  };
}
export function once(f, ...args) {
  let counter = 0;
  return function() {
    if (!counter) {
      f(...args);
      counter++;
    }
  };
}

export function elem_center({
  elem,
  left_add = 0,
  top_add = 0,
  elem_wrapper = html,
  only_top = false,
  only_left = false
}) {
  if (only_top) {
    elem.set_top((elem_wrapper.clientHeight + top_add) / 2 - elem.clientHeight / 2);
    elem.set_left(left_add);
  } else if (only_left) {
    elem.set_left((elem_wrapper.clientWidth + left_add) / 2 - elem.clientWidth / 2);
    elem.set_top(top_add);
  } else {
    elem.set_left((elem_wrapper.clientWidth + left_add) / 2 - elem.clientWidth / 2);
    elem.set_top((elem_wrapper.clientHeight + top_add) / 2 - elem.clientHeight / 2);
  }
}

export function get_value_of_form(form) {
  let temp = {};

  form = new FormData(form);

  for (let item of form) {
    Object.assign(temp, { [item[0]]: item[1] });
  }
  return temp;
}

export function set_value_of_form(form, props) {
  for (let item in props) {
    if (props.hasOwnProperty(item)) {
      form[item].value = props[item];
    }
  }
}

//реализация drag'n'drop
export function drag(target, wrapper, f_down = () => {}, f_move = () => {}, f_up = () => {}) {
  target.ondragstart = () => {
    return false;
  };

  target.onmousedown = e => {
    let x = e.pageX;
    let y = e.pageY;
    let begin_x = get_left(wrapper);
    let begin_y = get_top(wrapper);

    f_down();

    document.onmousemove = e => {
      wrapper.style.left = begin_x + (e.pageX - x) + "px";
      wrapper.style.top = begin_y + (e.pageY - y) + "px";

      f_move();
    };
  };

  document.onmouseup = e => {
    document.onmousemove = null;
  };

  target.onmouseup = e => {
    document.onmousemove = null;

    f_up();
  };
}

export function get_x(e) {
  return (e.pageX - APP.wrapper_zoom.getBoundingClientRect().left) * APP.canvas.zoom;
}
export function get_y(e) {
  return (e.pageY - APP.wrapper_zoom.getBoundingClientRect().top) * APP.canvas.zoom;
}

export function get_zoom() {
  APP.canvas.zoom = parseFloat(APP.canvas.getWidth()) / get_width(APP.canvas.wrapperEl);
}

export function active(...value) {
  for (let item of value) {
    item.classList.add("active");
  }
}

export function disactive(...value) {
  for (let item of value) {
    item.classList.remove("active");
  }
}
