var canvas = document.querySelector("#canvas");
var canvas_wrapper = document.querySelector(".canvas-wrapper");
var c = canvas.getContext("2d");

const widthHeader = 150;

canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight - 150;

// pencil

// function moveToPencil(e) {
//   let arr_canvas = document.querySelectorAll(".canvas");
//   let x = e.clientX;
//   let y = e.clientY - widthHeader;

//   c.beginPath();
//   c.moveTo(x, y);

//   canvas.onmousemove = function(e) {
//     let x = e.clientX;
//     let y = e.clientY - widthHeader;
//     c.lineTo(x, y);
//     c.stroke();
//   };
//   canvas.onmouseup = function() {
//     canvas.onmousemove = null;
//     for (let i = 0; i < arr_canvas.length; i++) {
//       arr_canvas[i].onmousemove = null;
//     }
//   };
//   for (let i = 0; i < arr_canvas.length; i++) {
//     arr_canvas[i].onmouseover = function() {
//       arr_canvas[i].onmousemove = function(e) {
//         let x = e.clientX;
//         let y = e.clientY - widthHeader;
//         c.lineTo(x, y);
//         c.stroke();
//       };
//       arr_canvas[i].onmouseout = function() {
//         arr_canvas[i].onmousemove = null;
//       };
//       arr_canvas[i].onmouseup = function() {
//         arr_canvas[i].onmousemove = null;
//         canvas.onmousemove = null;
//       };
//     };
//   }
// }

function moveToPencilWrapper(e) {
  let target = e.target;
  let x1 = e.clientX;
  let y1 = e.clientY - widthHeader;

  c.beginPath();
  c.moveTo(x1, y1);

  target.onmousemove = function(e) {
    let x = e.clientX;
    let y = e.clientY - widthHeader;
    c.lineTo(x, y);
    c.stroke();
  };

  target.onmouseout = function(e) {
    let relatedTarget = e.relatedTarget;
    console.log(relatedTarget);
    if (relatedTarget !== null) {
      relatedTarget.onmousemove = function(e) {
        console.log(1);
        let x = e.clientX;
        let y = e.clientY - widthHeader;
        c.lineTo(x, y);
        c.stroke();
      };
      relatedTarget.onmouseup = function() {
        target.onmousemove = null;
        target.onmouseout = null;
        target.onmouseover = null;
        relatedTarget.onmousemove = null;
      };
    }
  };
  target.onmouseover = function(e) {
    let relatedTarget = e.relatedTarget;
    if (relatedTarget !== null) {
      console.log(relatedTarget);
      relatedTarget.onmousemove = null;
    }
  };
  target.onmouseup = function() {
    target.onmousemove = null;
    target.onmouseout = null;
    target.onmouseover = null;
  };
}

document.querySelector(".pencil").addEventListener("click", function(e) {
  e.preventDefault();
  this.classList.toggle("active");

  if (this.classList.contains("active")) {
    canvas_wrapper.addEventListener("mousedown", moveToPencilWrapper);
    // canvas.addEventListener("mousedown", moveToPencil);
    // for (let i = 0; i < arr_canvas.length; i++) {
    //   arr_canvas[i].addEventListener("mousedown", moveToPencil);
    // }
  } else {
    canvas_wrapper.removeEventListener("mousedown", moveToPencilWrapper);
  }
});

// pencil

//rubber

function moveToRubber(e) {
  let x = e.clientX;
  let y = e.clientY - widthHeader;

  c.clearRect(x, y, 16, 16);

  canvas_wrapper.onmousemove = function(e) {
    let x = e.clientX;
    let y = e.clientY - widthHeader;
    c.clearRect(x, y, 16, 16);
  };
  canvas_wrapper.onmouseout = function(e) {
    let relatedTarget = e.relatedTarget;
    console.log(relatedTarget);
    if (relatedTarget !== null) {
      let new_c = document.querySelector(".canvas").getContext("2d");
      relatedTarget.onmousemove = function(e) {
        let x = e.clientX;
        console.log(new_c);

        let y = e.clientY - widthHeader;
        console.log(y);
        new_c.clearRect(x, y, 16, 16);
      };
    }
  };
  canvas_wrapper.onmouseup = function() {
    canvas_wrapper.onmousemove = null;
  };
}

document.querySelector(".rubber").addEventListener("click", function(e) {
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
  }
});

//shapes

document.body.onresize = function() {
  canvas.width = document.documentElement.clientWidth;
  canvas.height = document.documentElement.clientHeight - widthHeader;
};
