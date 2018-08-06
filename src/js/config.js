/* 
  набор плагинов, библиотек, функций, свойств, методов и объявление глобальных переменных
*/

import "vue/dist/vue.runtime.js"; // компилятор Vue js
import Vue from "vue/dist/vue.js"; // фреймворк Vue js
import Vuex from "vuex"; // паттерн управления состоянием приложения и библиотека Vue.js
import $ from "jquery"; // многофункциональная библиотека для работы с DOM
import interact from "interactjs"; // библиотека для работы с drag and drop, resizing and multi-touch gestures
import Sortable from "sortablejs"; // библиотека для переупорядочиваемых списков перетаскивания
import PerfectScrollbar from "perfect-scrollbar"; // плагин прокрутки
import "fabric"; // библиотека для работы с HTML5 canvas
import "jquery-colpick"; // jquery плагин color picker
import "spectrum-colorpicker"; // jquery плагин color picker
import "nicescroll"; // jquery плагин прокрутки

/*
  глобальные переменные
*/

window.levelNeg = -10;
window.level0 = 0;
window.level1 = 10;
window.level2 = 100;
window.level3 = 1000;
window.level4 = 10000;

window.Vue = Vue;
window.Vuex = Vuex;
window.bus = new Vue(); //глобальная шина
window.html = document.documentElement;
window.$ = $;
window.interact = interact;
window.Sortable = Sortable;
window.fabric = fabric;
window.PerfectScrollbar = PerfectScrollbar;
window.genID = generatorID();

/* 
  добавление методов в прототипы различных объектов
*/

Object.defineProperty(fabric.Group.prototype, "object", {
  get() {
    return this.item(0);
  },
  enumerable: false
});

Object.defineProperty(fabric.Canvas.prototype, "v", {
  get(arr) {
    return this.viewportTransform;
  },
  set(arr) {
    this.setViewportTransform(arr);
  },
  enumerable: false
});

Object.defineProperty(fabric.Canvas.prototype, "getPixel", {
  value(left, top, width, height) {
    return this.getContext().getImageData(left, top, width, height).data;
  },
  enumerable: false
});

Object.defineProperty(fabric.Group.prototype, "renderGroup", {
  value() {
    this.set({ width: this.object.width, height: this.object.height });
  },
  enumerable: false
});

Object.defineProperty(Array.prototype, "last", {
  get() {
    return this[this.length - 1];
  },
  enumerable: false
});

Object.defineProperty(Array.prototype, "remove", {
  value(value) {
    this.splice(this.indexOf(value), 1);
    return value;
  },
  enumerable: false
});

Object.defineProperty(Array.prototype, "removeIndex", {
  value(value) {
    let returnable = this[value];
    this.splice(value, 1);
    return returnable;
  },
  enumerable: false
});

Object.defineProperty(Array.prototype, "flat", {
  value() {
    let newArr = [];
    for (let i = 0; i < this.length; i++) {
      newArr = newArr.concat(this[i]);
    }
    return newArr;
  },
  enumerable: false
});

Object.defineProperty(Array.prototype, "unique", {
  value(key) {
    let result = [];

    for (let i = 0; i < this.length; i++) {
      let obj = this[i];

      if (result.find(item => item[key] === obj[key])) continue;

      result.push(obj);
    }
    return result;
  },
  enumerable: false
});

Object.defineProperty(Object.prototype, "genID", {
  get: () => genID.next().value,
  enumerable: false
});

/* 
  вспомогательные функции
*/

window.reverse = arr => arr.reduceRight((prev, item) => prev.concat(item), []);

// window.reverse = arr => {
//   let newArr = [];
//   for (let i = 0, j = arr.length - 1; i < arr.length; i++, j--) {
//     newArr[i] = arr[j];
//   }
//   return newArr;
// };

window.elemCenter = function(elem, left = 0, top = 0) {
  elem = $(elem);
  if (left && !top)
    elem.css({
      left,
      top: (elem.offsetParent().height() + top) / 2 - elem.height() / 2
    });
  else if (top && !left)
    elem.css({
      left: (elem.offsetParent().width() + left) / 2 - elem.width() / 2,
      top: top
    });
  else
    elem.css({
      left: (elem.offsetParent().width() + left) / 2 - elem.width() / 2,
      top: (elem.offsetParent().height() + top) / 2 - elem.height() / 2
    });
};

window.canvasCenter = function(canvas) {
  canvas = $(canvas);
  //prettier-ignore
  let left = (canvas.offsetParent().width() + 20) / 2 - canvas.width() / 2,
      top  = (canvas.offsetParent().height() + 20) / 2 - canvas.height() / 2;
  canvas.css({ left, top });

  if (top < 20 && left < 20) canvas.css({ left: "200px", top: "200px" });
  else if (top < 20) canvas.css("top", "200px");
  else if (left < 20) canvas.css("left", "200px");
};

window.maxId = arr => Math.max(...arr.map(item => item.id));

window.float = str => (parseFloat(str) !== Infinity && parseFloat(str) ? parseFloat(str) : 0);

window.round = (num, amount) => Math.round(num * 10 ** amount) / 10 ** amount;

window.find = (arr, connector, prop = "connector", index = false) =>
  index
    ? arr.indexOf(arr.filter(item => item[prop] === connector)[0])
    : arr.filter(item => item[prop] === connector)[0];

window.spreadArray2 = function(arr) {
  let newArr = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      newArr.push(arr[i][j]);
    }
  }
  return newArr;
};

function* generatorID() {
  for (let i = 1000; i < 10000000; i++) yield i;
}

window.getLocalStorageField = title => JSON.parse(localStorage.getItem(title));

window.setLocalStorageField = (title, data) => localStorage.setItem(title, JSON.stringify(data));

// window.arr1 = [];
// window.arr2 = [];
// window.arr3 = [];

// for (let i = 0; i < 100000; i++) {
//   if (i < 30000) arr1.push(i);
//   else if (i > 30000 && i < 60000) arr2.push(i);
//   else if (i > 60000) arr3.push(i);
// }

window.getPropFromInput = function(input_values, ...lists) {
  let obj = {};
  for (let input_value of input_values) {
    for (let list of lists) {
      if (list === input_value.subtitle) {
        Object.assign(obj, { [list]: input_value.enter });
      }
    }
  }
  return obj;
};

/*
  дефолтные настройки
*/

window.config = {
  themes: {
    ["Светлая"]: {
      textColor: "black",
      mainColor: "WHITESMOKE",
      bgColor: "oldlace",
      bgBody: "gainsboro",
      borderColor: "#8F9491",
      labelColor: "dimgray",
      theme: "Светлая"
    },
    ["Темная"]: {
      textColor: "white",
      mainColor: "#535353",
      bgColor: "#424242",
      bgBody: "#282828",
      borderColor: "#8F9491",
      labelColor: "#d6d6d6",
      theme: "Темная"
    },
    currentTheme: {
      textColor: "white",
      mainColor: "#535353",
      bgColor: "#424242",
      bgBody: "#282828",
      borderColor: "#8F9491",
      labelColor: "#d6d6d6",
      theme: "Темная"
    },
    invert: false
  }
};
