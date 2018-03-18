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
console.log(document.querySelector("svg.shapes-controller"));
document
  .querySelector(".shapes-controller")
  .addEventListener("click", function() {
    console.log(123);
    document
      .querySelector(".dropdown-shapes-wrapper")
      .classList.toggle("dropdown-shapes-wrapper-active");
  });

//shapes

document.body.onresize = function() {
  canvas.style.width = document.documentElement.clientWidth;
  canvas.style.height = document.documentElement.clientHeight - 150;
};
