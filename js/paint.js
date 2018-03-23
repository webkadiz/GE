var canvas = document.querySelector("#canvas");
var canvas_wrapper = document.querySelector(".canvas-wrapper");
var c = canvas.getContext("2d");
var counter = 0;
const widthHeader = 150;

let path = [];

canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight - 150;

function path_remove() {
  c.clearRect(0, 0, canvas.width, canvas.height);

  let path_delete = path.pop();

  counter = path.length;

  for (let i = 0; i < path.length; i++) {
    c.stroke(path[i]);
  }

  console.log(counter);
  console.log(path);
}

document.addEventListener("keyup", function(e) {
  //console.log(e.keyCode == 17 && e.ctrlKey);
  console.log(e.keyCode);
  if (e.keyCode == 90 && e.ctrlKey) {
    path_remove();
  }
});

function moveToPencilWrapper(e) {
  let target = e.target;
  let x = e.clientX - (parseInt(target.style.left) || 0);
  let y = e.clientY - widthHeader - (parseInt(target.style.top) || 0);

  c = target.getContext("2d");

  path.push(new Path2D());
  console.log(counter);
  console.log(path[0]);
  c.beginPath();
  path[counter].moveTo(x, y);

  canvas_wrapper.onmousemove = function(e) {
    let current_target = e.target;
    let x = e.clientX - (parseInt(current_target.style.left) || 0);
    let y = e.clientY - widthHeader - (parseInt(current_target.style.top) || 0);

    c = current_target.getContext("2d");
    console.log(current_target !== target);
    if (current_target !== target) {
      target = current_target;
      path[counter].beginPath();
      path[counter].moveTo(x, y);
    }

    path[counter].lineTo(x, y);
    c.stroke(path[counter]);
  };
  canvas_wrapper.onmouseup = function() {
    canvas_wrapper.onmousemove = null;
    counter++;
  };
}

document.querySelector(".pencil-badge").addEventListener("click", function(e) {
  e.preventDefault();
  this.classList.toggle("active");

  if (this.classList.contains("active")) {
    canvas_wrapper.addEventListener("mousedown", moveToPencilWrapper);
  } else {
    canvas_wrapper.removeEventListener("mousedown", moveToPencilWrapper);
  }
});

// pencil

//rubber

function moveToRubber(e) {
  let x = e.clientX;
  let y = e.clientY - widthHeader;

  canvas_wrapper.onmousemove = function(e) {
    console.log(e);
    let target = e.target;
    c = target.getContext("2d");
    let x = e.clientX - (parseInt(target.style.left) || 0);
    let y = e.clientY - widthHeader - (parseInt(target.style.top) || 0);
    console.log(x);
    console.log(y);
    c.clearRect(x, y, 16, 16);
  };
  canvas_wrapper.onmouseup = function() {
    canvas_wrapper.onmousemove = null;
  };
}

document.querySelector(".rubber-badge").addEventListener("click", function(e) {
  e.preventDefault();
  canvas_wrapper.classList.toggle("rubber-canvas-active");
  this.classList.toggle("active");

  if (this.classList.contains("active")) {
    canvas_wrapper.addEventListener("mousedown", moveToRubber);
  } else {
    canvas_wrapper.removeEventListener("mousedown", moveToRubber);
  }
});

//rubber

//text

function create_textarea(x, y) {
  var textarea = document.createElement("textarea");

  textarea.style.left = x + "px";
  textarea.style.top = y + "px";

  textarea.classList.add("canvas-textarea-text");

  canvas_wrapper.appendChild(textarea);

  return textarea;
}

function text_click(e) {
  let x = e.clientX;
  let y = e.clientY - widthHeader;
  let x1 = 0;
  let y1 = 0;

  create_textarea(x, y);

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

    let x = 0;
    let y = 30;

    new_canvas.classList.add("canvas");
    new_canvas.classList.add("canvas-text");
    new_canvas.style.left = textarea.style.left;
    new_canvas.style.top = textarea.style.top;

    canvas_wrapper.appendChild(new_canvas);
    c = new_canvas.getContext("2d");

    text = text.split("\n");
    let width = c.measureText(text[0]).width;
    for (let i = 0; i < text.length; i++) {
      if (width < c.measureText(text[i]).width)
        width = c.measureText(text[i]).width;
    }
    new_canvas.width = width * 2.2;
    new_canvas.height = text.length * 30;
    for (let i = 0; i < text.length; i++) {
      c.font = "400 22px sans-serif";
      c.fillText(text[i], x, y);
      y += 30;
    }

    textarea_remember = canvas_wrapper.removeChild(textarea);
    new_canvas.addEventListener("mousedown", function() {
      canvas_wrapper.removeChild(this);

      let textarea = create_textarea(
        parseInt(new_canvas.style.left),
        parseInt(new_canvas.style.top)
      );
      console.log(textarea);
      textarea.onblur = function() {
        event_textarea(textarea);
      };
      textarea.value = textarea_remember.value;
    });
  }
}

document.querySelector(".text-badge").addEventListener("click", function(e) {
  e.preventDefault();
  this.classList.toggle("active");
  if (this.classList.contains("active")) {
    canvas_wrapper.addEventListener("dblclick", text_click);
  } else {
    canvas_wrapper.removeEventListener("dblclick", text_click);
  }
});

//text

//pouring

function fill(e) {
  let target = e.target;

  c = target.getContext("2d");

  if (target.classList.contains("canvas")) {
    c.fillStyle = "blue";
    c.fillRect(0, 0, target.width, target.height);
    console.log(123);
  }
}

document.querySelector(".pouring-badge").addEventListener("click", function(e) {
  e.preventDefault();

  this.classList.toggle("active");

  if (this.classList.contains("active")) {
    canvas_wrapper.addEventListener("mousedown", fill);
  } else {
    canvas_wrapper.removeEventListener("mousedown", fill);
  }
});

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

  var new_canvas = document.createElement("canvas");
  let new_c = new_canvas.getContext("2d");
  new_canvas.classList.add("canvas");

  new_canvas.style.left = x1 + "px";
  new_canvas.style.top = y1 + "px";
  new_canvas.width = 0;
  new_canvas.height = 0;

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
    console.log(123123);
    new_canvas.width = x;
    new_canvas.height = y;
    new_c.strokeRect(0, 0, x, y);
    canvas_wrapper.onmousemove = null;
  };
}

document.querySelector(".square").addEventListener("click", function() {
  this.classList.toggle("active");
  if (this.classList.contains("active")) {
    canvas_wrapper.addEventListener("mousedown", beginRect);
  } else {
    canvas_wrapper.removeEventListener("mousedown", beginRect);
    canvas_wrapper.onmouseup = null;
  }
});

//shapes

document.body.onresize = function() {
  canvas.width = document.documentElement.clientWidth;
  canvas.height = document.documentElement.clientHeight - widthHeader;
};
