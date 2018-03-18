var canvas = document.querySelector("#canvas");

var c = canvas.getContext("2d");

canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight - 150;

// pencil

function moveToPencil(e) {
  let x = e.clientX;
  let y = e.clientY - 150;
  c.moveTo(x, y);
  console.log;
  canvas.onmousemove = function(e) {
    let x = e.clientX;
    let y = e.clientY - 150;
    c.lineTo(x, y);
    c.stroke();
  };
  canvas.onmouseup = function() {
    canvas.onmousemove = null;
  };
}

document.querySelector(".pencil").addEventListener("click", function(e) {
  e.preventDefault();
  this.classList.toggle("active");

  if (this.classList.contains("active")) {
    canvas.addEventListener("mousedown", moveToPencil);
  } else {
    canvas.removeEventListener("mousedown", moveToPencil);
  }
});

// pencil

//rubber

function moveToRubber(e) {
  let x = e.clientX;
  let y = e.clientY - 150;

  c.clearRect(x, y, 16, 16);

  canvas.onmousemove = function(e) {
    let x = e.clientX;
    let y = e.clientY - 150;
    c.clearRect(x, y, 16, 16);
  };
  canvas.onmouseup = function() {
    canvas.onmousemove = null;
  };
}

document.querySelector(".rubber").addEventListener("click", function(e) {
  e.preventDefault();
  canvas.classList.toggle("rubber-canvas-active");
  this.classList.toggle("active");

  if (this.classList.contains("active")) {
    canvas.addEventListener("mousedown", moveToRubber);
  } else {
    canvas.removeEventListener("mousedown", moveToRubber);
  }
});

//rubber

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
  let y1 = e.clientY - 150;

  canvas.onmousemove = function(e) {
    let x = e.clientX - x1;
    let y = e.clientY - y1 - 150;

    c.clearRect(x1, y1, x, y);
    c.strokeRect(x1, y1, x, y);
  };
  canvas.onmouseup = function() {
    canvas.onmousemove = null;
  };
}

document.querySelector(".square").addEventListener("click", function() {
  this.classList.toggle("active");
  if (this.classList.contains("active")) {
    canvas.addEventListener("mousedown", beginRect);
  } else {
    canvas.removeEventListener("mousedown", beginRect);
  }
});

//shapes

document.body.onresize = function() {
  canvas.width = document.documentElement.clientWidth;
  canvas.height = document.documentElement.clientHeight - 150;
};
