var canvas = document.querySelector("#canvas");
var canvas_wrapper = document.querySelector(".canvas-wrapper");
var c = canvas.getContext("2d");
var counter = 0;
let prev_target;
const widthHeader = 150;

let clear_coords = [];
let arr_delete_fill_color = [];
let arr_textarea = [];
let path = [];
let all_path = [];
let path_delete = [];
let arr_context = [];
let arr_class = [
  {
    class: "pencil-badge",
    func: draw_pencil,
    event: "mousedown"
  },
  {
    class: "rubber-badge",
    func: moveToRubber,
    event: "mousedown",
    add_func: function(string) {
      if (string == "remove")
        canvas_wrapper.classList.remove("rubber-canvas-active");
      else if (string == "add")
        canvas_wrapper.classList.add("rubber-canvas-active");
    }
  },
  {
    class: "text-badge",
    func: text_click,
    event: "dblclick"
  },
  {
    class: "pouring-badge",
    func: fill,
    event: "mousedown"
  },
  {
    class: "square-badge",
    func: beginRect,
    event: "mousedown"
  }
];

canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight - 150;

document.querySelector(".main-nav").onclick = function(e) {
  let target = e.target;

  e.preventDefault();
  counter = 0;

  for (let i = 0; i < arr_class.length; i++) {
    let new_target = target.closest("." + arr_class[i].class);

    if (new_target) {
      counter++;
      if (prev_target) {
        canvas_wrapper.removeEventListener(
          prev_target.arr.event,
          prev_target.arr.func
        );
        if (prev_target.arr.add_func) {
          prev_target.arr.add_func("remove");
        }
        prev_target.target.classList.remove("active");
      }

      canvas_wrapper.addEventListener(arr_class[i].event, arr_class[i].func);

      if (arr_class[i].add_func) {
        arr_class[i].add_func("add");
      }

      prev_target = {
        target: document.querySelector("." + arr_class[i].class),
        arr: arr_class[i]
      };

      new_target.classList.add("active");
    }
  }
  if (counter == 0) {
    if (prev_target) {
      console.log(1);
      canvas_wrapper.removeEventListener(
        prev_target.arr.event,
        prev_target.arr.func
      );
      prev_target.target.classList.remove("active");
    }
  }
};

document.addEventListener("keyup", function(e) {
  if ((e.keyCode == 90 && e.ctrlKey) || (e.keyCode == 90 && e.metaKey)) {
    path_remove();
  }
});

function path_remove() {
  arr_context.forEach(item => {
    console.log(item);
    item.width = item.width;
    item.height = item.height;
  });

  canvas.width = canvas.width;
  canvas.height = canvas.height;

  let all_path_last = all_path[all_path.length - 1];
  let path_last = path[path.length - 1];

  if (all_path_last && all_path_last.clear) {
    clear_coords.pop();
  }

  if (all_path_last && all_path_last.fill_pop) {
    all_path_last.target.fillStyle.pop();
  }

  if (all_path_last && all_path_last.isPath) {
    if (path_last && path_last.remove) {
      path_last.remove.remove();
    }

    path.pop();
  }

  path_delete.push(all_path.pop());

  path.forEach(item => {
    if (item.fill) {
      item.context.fillStyle = item.fillStyle[item.fillStyle.length - 1];
      item.context.fill(item.path);
    }
    if (item.shape == "text") {
      let temp = item.text_value;
      draw_text(
        temp.text,
        item.context,
        temp.line_height,
        temp.font_size,
        temp.font
      );
    }

    item.context.stroke(item.path);
  });

  console.log(all_path);
  console.log(clear_coords);

  clear_coords.forEach(item => {
    item.coords.forEach(item => {
      c.fillStyle = "#fff";
      c.fillRect(item.x, item.y, 16, 16);
    });
  });
}

function draw_pencil(e) {
  let target = e.target;
  let x = e.clientX - (parseInt(target.style.left) || 0);
  let y = e.clientY - widthHeader - (parseInt(target.style.top) || 0);

  c = target.getContext("2d");

  let current_path = {
    path: new Path2D(),
    isPath: true,
    context: c,
    stroke: true,
    fill: false,
    fillStyle: ["#fff"],
    shape: false,
    target: target,
    remove: false
  };

  path.push(current_path);
  all_path.push(current_path);

  c.beginPath();
  path[path.length - 1].path.moveTo(x, y);

  canvas_wrapper.onmousemove = function(e) {
    let current_target = e.target;
    let x = e.clientX - (parseInt(current_target.style.left) || 0);
    let y = e.clientY - widthHeader - (parseInt(current_target.style.top) || 0);

    c = current_target.getContext("2d");

    if (current_target !== target) {
      target = current_target;

      current_path = {
        path: new Path2D(),
        isPath: true,
        context: c,
        stroke: true,
        fill: false,
        fillStyle: ["#fff"],
        shape: false,
        target: target,
        remove: false
      };

      path.push(current_path);
      all_path.push(current_path);

      c.beginPath();
      path[path.length - 1].path.moveTo(x, y);
    }

    path[path.length - 1].path.lineTo(x, y);

    c.stroke(path[path.length - 1].path);
  };
  canvas_wrapper.onmouseup = function() {
    canvas_wrapper.onmousemove = null;
  };
}

// pencil

//rubber

function moveToRubber(e) {
  let x = e.clientX;
  let y = e.clientY - widthHeader;
  let arr_coords = [];

  canvas_wrapper.onmousemove = function(e) {
    let x = e.clientX;
    let y = e.clientY;
    let target = document.elementFromPoint(x + 8, y + 8);
    let coords = {};
    let all_coords = {};

    c = target.getContext("2d");
    x = e.clientX - (parseInt(target.style.left) || 0);
    y = e.clientY - widthHeader - (parseInt(target.style.top) || 0);

    coords = {
      x: x,
      y: y
    };

    arr_coords.push(coords);

    c.fillStyle = "#fff";
    c.fillRect(x, y, 16, 16);
  };
  canvas_wrapper.onmouseup = function() {
    all_coords = {
      coords: arr_coords,
      clear: true
    };

    clear_coords.push(all_coords);
    all_path.push(all_coords);

    canvas_wrapper.onmousemove = null;
  };
}

//rubber

//text

function draw_text(text, c, line_height, font_size, font) {
  let temp = line_height;
  for (let i = 0; i < text.length; i++) {
    c.font = `${font_size} ${font}`;
    c.fillText(text[i], 0, line_height);
    line_height += temp;
  }
  line_height = temp;
}

function create_textarea(x, y) {
  var textarea = document.createElement("textarea");

  textarea.style.left = x + "px";
  textarea.style.top = y + "px";

  textarea.classList.add("canvas-textarea-text");

  canvas_wrapper.appendChild(textarea);
  textarea.focus();

  return textarea;
}

function text_click(e) {
  let x = e.clientX;
  let y = e.clientY - widthHeader;
  let x1 = 0;
  let y1 = 0;

  if (
    !e.target.classList.contains("canvas-text") &&
    e.target.tagName != "TEXTAREA"
  ) {
    create_textarea(x, y);
  }

  textarea = document.querySelectorAll(".canvas-textarea-text");

  for (let i = 0; i < textarea.length; i++) {
    if (textarea[i]) {
      textarea[i].onblur = function() {
        event_textarea(textarea[i]);
      };
    }
  }

  function event_textarea(textarea) {
    let text = textarea.value;
    let new_canvas = document.createElement("canvas");
    let current_path = {};
    let font_size = "22px";
    let font = "sans-serif";
    let line_height = 30;
    let x = 0;
    let y = line_height;

    new_canvas.classList.add("canvas");
    new_canvas.classList.add("canvas-text");
    new_canvas.style.left = textarea.style.left;
    new_canvas.style.top = textarea.style.top;

    new_canvas.counter = counter;

    c = new_canvas.getContext("2d");

    arr_context.push(new_canvas);

    current_path = {
      path: new Path2D(),
      context: c,
      isPath: true,
      stroke: true,
      fill: false,
      fillStyle: ["#fff"],
      shape: "text",
      text_value: {
        text: text.split("\n"),
        font: font,
        line_height: line_height,
        font_size: font_size
      },
      target: new_canvas,
      remove: new_canvas
    };
    path.push(current_path);
    all_path.push(current_path);

    text = text.split("\n");
    let width = c.measureText(text[0]).width;
    for (let i = 0; i < text.length; i++) {
      if (width < c.measureText(text[i]).width)
        width = c.measureText(text[i]).width;
    }

    new_canvas.width = width * (parseInt(font_size) / 10);
    new_canvas.height = text.length * line_height;

    draw_text(text, c, line_height, font_size, font);

    arr_textarea.push(canvas_wrapper.replaceChild(new_canvas, textarea));

    new_canvas.addEventListener("dblclick", function() {
      console.log(counter);
      canvas_wrapper.replaceChild(arr_textarea[this.counter], this);
      arr_textarea[this.counter].focus();
    });

    counter++;
  }
}

//text

//pouring

function fill(e) {
  let x = e.clientX - (parseInt(e.target.style.left) || 0);
  let y = e.clientY - (parseInt(e.target.style.top) || 0) - widthHeader;

  let bool = false;
  let arr_new_path = [];

  canvas_wrapper.onmouseup = null;

  arr_new_path = path.filter(item => {
    return item.target == e.target;
  });

  arr_new_path.forEach(item => {
    if (item.context.isPointInPath(item.path, x, y)) {
      if (item.shape == false) bool = true;
    }
  });

  if (bool) {
    arr_new_path.forEach(item => {
      if (!item.shape) {
        if (item.context.isPointInPath(item.path, x, y)) {
          console.log(1);
          item.fillStyle.push(
            "#" + (~~(Math.random() * 16777000)).toString(16)
          );
          item.fill = true;
          all_path.push({
            target: item,
            isPath: false,
            path: item.path,
            context: item.context,
            draw: false,
            fill_pop: true,
            fillStyle: item.fillStyle
          });
          item.context.stroke(item.path);
          item.context.fillStyle = item.fillStyle[item.fillStyle.length - 1];
          item.context.fill(item.path);
        }
      }
    });
  }

  if (!bool) {
    arr_new_path.forEach(item => {
      if (item.shape == "rect") {
        item.fillStyle.push("#" + (~~(Math.random() * 16777000)).toString(16));
        item.fill = true;
        all_path.push({
          target: item,
          isPath: false,
          path: item.path,
          context: item.context,
          fill_pop: true,
          fillStyle: item.fillStyle
        });
      }
      item.context.fillStyle = item.fillStyle[item.fillStyle.length - 1];
      item.context.fill(item.path);
      item.context.stroke(item.path);
    });
  }
}

//pouring

//shapes

document
  .querySelector(".shapes-controller")
  .addEventListener("click", function() {
    document
      .querySelector(".dropdown-shapes-wrapper")
      .classList.toggle("dropdown-shapes-wrapper-active");
  });

function beginRect(e) {
  let x1 = e.clientX;
  let y1 = e.clientY - widthHeader;
  let y = 0;
  let x = 0;
  let current_path = {};

  var new_canvas = document.createElement("canvas");
  let new_c = new_canvas.getContext("2d");
  new_canvas.classList.add("canvas");

  new_canvas.style.left = x1 + "px";
  new_canvas.style.top = y1 + "px";
  new_canvas.width = 0;
  new_canvas.height = 0;

  current_path = {
    path: new Path2D(),
    isPath: true,
    context: new_c,
    stroke: true,
    fill: false,
    fillStyle: ["#fff"],
    shape: "rect",
    target: new_canvas,
    remove: new_canvas
  };

  path.push(current_path);
  all_path.push(current_path);

  document.querySelector(".canvas-wrapper").appendChild(new_canvas);

  canvas_wrapper.onmousemove = function(e) {
    x = e.clientX - x1;
    y = e.clientY - widthHeader - y1;

    if (e.clientX < x1) {
      new_canvas.style.left = e.clientX + "px";
      x = x1 - e.clientX;
    }
    if (e.clientY - widthHeader < y1) {
      new_canvas.style.top = e.clientY - widthHeader + "px";
      y = y1 - (e.clientY - widthHeader);
    }

    new_canvas.width = x;
    new_canvas.height = y;

    new_c.strokeRect(0, 0, x, y);
  };
  canvas_wrapper.onmouseup = function(e) {
    new_canvas.width = x;
    new_canvas.height = y;

    arr_context.push(new_canvas);

    path[path.length - 1].path.rect(0, 0, x, y);

    new_c.stroke(path[path.length - 1].path);

    canvas_wrapper.onmousemove = null;
  };
}

document.body.onresize = function() {
  canvas.width = document.documentElement.clientWidth;
  canvas.height = document.documentElement.clientHeight - widthHeader;
};
