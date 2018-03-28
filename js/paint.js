let canvas = document.querySelector("#canvas"); //главный канвас
let canvas_wrapper = document.querySelector(".canvas-wrapper"); //обертка канвасов
let zoom_wrapper = document.querySelector(".zoom-wrapper"); // обертка которая помогает реализовать zoom
let c = canvas.getContext("2d"); //контекст главного канваса
let counter = 0; // просто счетчик если понадобится
let prev_target; // предыдущая нажатая иконка , в обработчике на .main-nav - шапка painta
let temp_target; // предыдущий канвас , используется в функции move_canvas
let new_canvas;
let new_c;
let script = document.querySelector("script"); // последний script на странице
const widthHeader = 171; // константная ширина шапки
let zoom = 1; // множитель зума
let bias_left = 0;
let bias_top = 0;

let clear_coords = []; // координаты пройденные с помощью ластика
let arr_textarea = [];
let path = []; // все пути которые можно рисовать
let all_path = []; // обсолютно все
let path_delete = []; // удаленные пути через ctrl-z
let arr_context = []; // все контексты которые создаются

//все значки с функциями для делегирования из .nav-options
let arr_settings = [
  {
    class_badge: "options-window-size",
    class_settings: "settings-window-size",
    value_input: document.querySelectorAll(".size-wrapper input"),
    appear_func: function() {
      let elem = document.querySelector("." + this.class_settings);

      this.value_input[0].value = canvas.width;
      this.value_input[1].value = canvas.height;

      elem.style.display = "block";
      elem.classList.remove("zoomOut");
      elem.classList.add("zoomIn");

      centering_element(elem);
    },
    service_func: function() {
      canvas_wrapper.style.width = parseInt(this.value_input[0].value) + "px";
      canvas.width = parseInt(this.value_input[0].value);

      canvas_wrapper.style.height = parseInt(this.value_input[1].value) + "px";
      canvas.height = parseInt(this.value_input[1].value);
    }
  }
];
// все значки с функциями для делегирования из tools
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
    string: "add",
    service_func: function(string) {
      if (string == "remove") {
        canvas_wrapper.classList.remove("rubber-canvas-active");
        this.string = "add";
      } else if (string == "add") {
        canvas_wrapper.classList.add("rubber-canvas-active");
        this.string = "remove";
      }
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
  },
  {
    class: "line-badge",
    func: draw_line,
    event: "mousedown"
  },
  {
    class: "move-badge",
    func: move_canvas,
    event: "mousedown",
    service_func: function() {
      if (temp_target) {
        temp_target.style.border = "";
      }
    }
  }
];

// устанавливаем ширину , высоту главному canvas
canvas_wrapper.style.zoom = 1;
canvas_wrapper.style.width = document.documentElement.clientWidth + "px";
canvas_wrapper.style.height =
  document.documentElement.clientHeight - widthHeader + "px";

canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight - widthHeader;

document.querySelector(".apply").addEventListener("click", function(e) {
  let target = this.parentElement;
  target.classList.remove("zoomIn");
  target.classList.add("zoomOut");

  for (let i = 0; i < arr_settings.length; i++) {
    if (target.classList.contains(arr_settings[i].class_settings)) {
      arr_settings[i].service_func();
    }
  }

  setTimeout(() => {
    target.style.display = "";
  }, 500);
});

document.querySelector(".options").addEventListener("click", function(e) {
  e.preventDefault();
  let target = e.target;

  for (let i = 0; i < arr_settings.length; i++) {
    if (e.target.classList.contains(arr_settings[i].class_badge)) {
      arr_settings[i].appear_func();
    }
  }
});

// используем делегирование на шапке painta
document.querySelector(".main-nav").onclick = function(e) {
  let target = e.target;
  let new_target;

  e.preventDefault();
  counter = 0;

  function check() {
    if (prev_target) {
      canvas_wrapper.removeEventListener(
        prev_target.arr_class.event,
        prev_target.arr_class.func
      );
      if (prev_target.arr_class.service_func) {
        prev_target.arr_class.service_func(prev_target.arr_class.string);
      }
      prev_target.target.classList.remove("active");
    }
  }

  for (let i = 0; i < arr_class.length; i++) {
    new_target = target.closest("." + arr_class[i].class);

    if (new_target) {
      counter++;

      check();

      canvas_wrapper.addEventListener(arr_class[i].event, arr_class[i].func);

      if (arr_class[i].service_func) {
        arr_class[i].service_func(arr_class[i].string);
      }

      prev_target = {
        target: document.querySelector("." + arr_class[i].class),
        arr_class: arr_class[i]
      };

      new_target.classList.add("active");
    }
  }

  if (counter == 0) {
    check();
    prev_target = null;
  }
};

let divide = 1;
let multiply_increase = 1.05;
let multiply_lower = 0.95;
document.addEventListener("keydown", function(e) {
  if ((e.keyCode == 90 && e.ctrlKey) || (e.keyCode == 90 && e.metaKey)) {
    path_remove();
  }

  // увеличение масштаба
  if (e.keyCode == 187 && e.ctrlKey && e.altKey) {
    canvas_wrapper.style.zoom = parseFloat(canvas_wrapper.style.zoom) + 0.05;
    if (
      document.documentElement.scrollWidth >
      document.documentElement.clientWidth
    ) {
      zoom =
        document.documentElement.clientWidth /
        document.documentElement.scrollWidth;
    } else {
      zoom =
        document.documentElement.clientWidth /
        canvas_wrapper.parentElement.clientWidth;
    }
  }
  // уменьшение масштаба
  if (e.keyCode == 189 && e.ctrlKey && e.altKey) {
    canvas_wrapper.style.zoom = parseFloat(canvas_wrapper.style.zoom) - 0.05;

    zoom =
      document.documentElement.clientWidth /
      canvas_wrapper.parentElement.clientWidth;
  }
});

// удаление пути через ctrl-z
function path_remove() {
  arr_context.forEach(item => {
    item.width = item.width;
    item.height = item.height;
  });

  canvas.width = canvas.width;
  canvas.height = canvas.height;

  let all_path_last = all_path[all_path.length - 1];
  let path_last = path[path.length - 1];

  // возвращаем canvas на прежнее место после передвижения
  if (all_path_last && all_path_last.move_canvas) {
    all_path_last.target.style.left = all_path_last.left;
    all_path_last.target.style.top = all_path_last.top;
  }

  // удаляем путь ластика если он есть
  if (all_path_last && all_path_last.clear) {
    clear_coords.pop();
  }

  // удаляем цвет если есть
  if (all_path_last && all_path_last.fill_pop) {
    all_path_last.target.fillStyle.pop();
  }

  //если это путь то выкидываем еще и из массива путей , которые можно рисовать
  //и проверяем надо ли удалить елемент из DOM-дерева
  if (all_path_last && all_path_last.isPath) {
    if (path_last && path_last.remove) {
      path_last.remove.remove();
    }

    path.pop();
  }

  // удаем последнее действие - сама реализация ctrl-z
  path_delete.push(all_path.pop());

  // рисуем все заново без одного элемента
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

  // закрашиваем заново все ластиком
  clear_coords.forEach(item => {
    item.coords.forEach(item => {
      c.fillStyle = "#fff";
      c.fillRect(item.x, item.y, 16, 16);
    });
  });
}

// передвижение canvas
function move_canvas(e) {
  let target = e.target;
  if (e.target == canvas) {
    target = zoom_wrapper;
  }
  if (temp_target == target) {
    let x = e.pageX * zoom;
    let y = e.pageY * zoom;

    if (temp_target == canvas) {
      temp_target = zoom_wrapper;
    }

    console.log(zoom_wrapper);
    let begin_x = parseInt(temp_target.style.left) || 0;
    let begin_y = parseInt(temp_target.style.top) || 0;

    // запоминаем передвижения для отмены через ctrl-z

    all_path.push({
      isPath: false,
      left: temp_target.style.left,
      top: temp_target.style.top,
      move_canvas: true,
      target: temp_target
    });

    canvas_wrapper.onmousemove = function(e) {
      let new_x = e.pageX * zoom - x;
      let new_y = e.pageY * zoom - y;
      console.log(temp_target);
      if (temp_target == zoom_wrapper) {
        bias_left = (parseFloat(temp_target.style.left) || 0) * zoom;
        bias_top = (parseFloat(temp_target.style.top) || 0) * zoom;
      }
      temp_target.style.left = begin_x + new_x + "px";
      temp_target.style.top = begin_y + new_y + "px";

      if (parseInt(temp_target.style.top) < 0) {
        temp_target.style.top = "0px";
      }
    };

    temp_target.onmouseup = function() {
      canvas_wrapper.onmousemove = null;
    };

    document.onmouseup = function() {
      canvas_wrapper.onmousemove = null;
    };
  } else if (temp_target !== undefined) {
    temp_target.style.border = "";
  }

  temp_target = target;
  target.style.border = "1px dashed black";
}

// рисование карандашом
function draw_pencil(e) {
  let target = e.target;
  let x = e.pageX * zoom - bias_left - (parseInt(target.style.left) || 0);
  let y =
    (e.pageY - widthHeader) * zoom -
    bias_top -
    (parseInt(target.style.top) || 0);

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
    let x =
      e.pageX * zoom - bias_left - (parseInt(current_target.style.left) || 0);
    let y =
      (e.pageY - widthHeader) * zoom -
      bias_top -
      (parseInt(current_target.style.top) || 0);

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

// ластик
function moveToRubber(e) {
  let x = e.pageX;
  let y = e.pageY - widthHeader;
  let arr_coords = [];

  canvas_wrapper.onmousemove = function(e) {
    let x = e.pageX;
    let y = e.pageY;
    let target = document.elementFromPoint(x + 8, y + 8);
    let coords = {};
    let all_coords = {};

    c = target.getContext("2d");
    x = e.pageX - (parseInt(target.style.left) || 0);
    y = e.pageY - widthHeader - (parseInt(target.style.top) || 0);

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

//рисование текста

function draw_text(text, c, line_height, font_size, font) {
  let temp = line_height;
  for (let i = 0; i < text.length; i++) {
    c.font = `${font_size} ${font}`;
    c.fillText(text[i], 0, line_height);
    line_height += temp;
  }
  line_height = temp;
}

// создания поля ввода для текста
function create_textarea(x, y) {
  var textarea = document.createElement("textarea");

  textarea.style.left = x + "px";
  textarea.style.top = y + "px";

  textarea.classList.add("canvas-textarea-text");

  canvas_wrapper.appendChild(textarea);
  textarea.focus();

  return textarea;
}

//вставка поля ввода или canvasa в документ
function text_click(e) {
  let x = e.pageX;
  let y = e.pageY - widthHeader;
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

//заливка

function fill(e) {
  let x = e.pageX - (parseInt(e.target.style.left) || 0);
  let y = e.pageY - (parseInt(e.target.style.top) || 0) - widthHeader;

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

//shapes

document
  .querySelector(".shapes-controller")
  .addEventListener("click", function() {
    document
      .querySelector(".dropdown-shapes-wrapper")
      .classList.toggle("dropdown-shapes-wrapper-active");
  });

//создание нового canvas
function create_canvas(x1, y1, ...value_class) {
  new_canvas = document.createElement("canvas");
  new_c = new_canvas.getContext("2d");
  new_canvas.classList.add("canvas");

  value_class.forEach(item => {
    new_canvas.classList.add(item);
  });

  new_canvas.style.left = x1 + "px";
  new_canvas.style.top = y1 + "px";
  new_canvas.width = 0;
  new_canvas.height = 0;
}

// рисование прямоугольника

function beginRect(e) {
  let x1 = e.pageX;
  let y1 = e.pageY - widthHeader;
  let y = 0;
  let x = 0;
  let current_path = {};

  create_canvas(x1, y1, "canvas-rect");

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

  canvas_wrapper.appendChild(new_canvas);

  canvas_wrapper.onmousemove = function(e) {
    x = e.pageX - x1;
    y = e.pageY - widthHeader - y1;

    if (e.pageX < x1) {
      new_canvas.style.left = e.pageX + "px";
      x = x1 - e.pageX;
    }
    if (e.pageY - widthHeader < y1) {
      new_canvas.style.top = e.pageY - widthHeader + "px";
      y = y1 - (e.pageY - widthHeader);
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

//рисуем линию
function draw_line(e) {
  let x1 = e.pageX;
  let y1 = e.pageY - widthHeader;
  let x, y, begin_x, begin_y, end_x, end_y;

  create_canvas(x1, y1, "canvas-line");

  current_path = {
    path: new Path2D(),
    isPath: true,
    context: new_c,
    stroke: true,
    fill: false,
    fillStyle: ["#fff"],
    shape: "line",
    target: new_canvas,
    remove: new_canvas
  };

  path.push(current_path);
  all_path.push(current_path);

  canvas_wrapper.appendChild(new_canvas);

  new_c.beginPath();

  canvas_wrapper.onmousemove = function(e) {
    x = e.pageX - x1;
    y = e.pageY - y1 - widthHeader;

    if (e.pageX < x1) {
      new_canvas.style.left = e.pageX + "px";
      x = x1 - e.pageX;
    }
    if (e.pageY - widthHeader < y1) {
      new_canvas.style.top = e.pageY - widthHeader + "px";
      y = y1 - (e.pageY - widthHeader);
    }
    if (e.pageY - widthHeader > y1 && e.pageX > x1) {
      begin_x = 0;
      begin_y = 0;
      end_x = x;
      end_y = y;
    }
    if (e.pageY - widthHeader < y1 && e.pageX > x1) {
      begin_x = 0;
      begin_y = y;
      end_x = x;
      end_y = 0;
    }
    if (e.pageY - widthHeader > y1 && e.pageX < x1) {
      begin_x = x;
      begin_y = 0;
      end_x = 0;
      end_y = y;
    }
    if (e.pageY - widthHeader < y1 && e.pageX < x1) {
      begin_x = x;
      begin_y = y;
      end_x = 0;
      end_y = 0;
    }

    new_canvas.width = x || 1;
    new_canvas.height = y || 1;

    new_c.moveTo(begin_x, begin_y);
    new_c.lineTo(end_x, end_y);

    new_c.stroke();
  };
  canvas_wrapper.onmouseup = function(e) {
    path[path.length - 1].path.moveTo(begin_x, begin_y);
    path[path.length - 1].path.lineTo(end_x, end_y);

    canvas_wrapper.onmousemove = null;
  };
}

// resize canvasa

document.body.onresize = function() {
  canvas_wrapper.style.width = document.documentElement.clientWidth + "px";
  canvas_wrapper.style.height =
    document.documentElement.clientHeight - widthHeader + "px";

  canvas.width = document.documentElement.clientWidth;
  canvas.height = document.documentElement.clientHeight - widthHeader;
};

function centering_element(elem) {
  elem.style.left =
    document.documentElement.clientWidth / 2 - elem.clientWidth / 2 + "px";
  elem.style.top =
    document.documentElement.clientHeight / 2 - elem.clientHeight / 2 + "px";
}

document
  .querySelector(".close-wrapper")
  .addEventListener("mousedown", function(e) {
    let target = this.parentElement;
    let x = e.pageX;
    let y = e.pageY;
    let begin_x = parseInt(target.style.left) || 0;
    let begin_y = parseInt(target.style.top) || 0;

    document.onmousemove = function(e) {
      let new_x = e.pageX - x;
      let new_y = e.pageY - y;

      target.style.left = begin_x + new_x + "px";
      target.style.top = begin_y + new_y + "px";
    };

    target.onmouseup = function() {
      document.onmousemove = null;
    };

    document.onmouseup = function() {
      document.onmousemove = null;
    };
  });
document.querySelector(".close").addEventListener("click", function() {
  this.parentElement.parentElement.classList.remove("zoomIn");
  this.parentElement.parentElement.classList.add("zoomOut");

  setTimeout(() => {
    this.parentElement.parentElement.style.display = "";
  }, 500);
});
