/* 
  набор плагинов, библиотек, функций, свойств, методов и объявление глобальных переменных
*/

import "vue/dist/vue.runtime"; // компилятор Vue js
import Vue from "vue/dist/vue"; // фреймворк Vue js
import Vuex from "vuex"; // паттерн управления состоянием приложения и библиотека Vue.js
import Vuebar from "vuebar"; // vue-плагин прокрутки
import vSelect from "vue-select"; // vue-плагин для стилизации тега select
import $ from "jquery"; // многофункциональная библиотека для работы с DOM
import _ from "lodash"; // библиотека функциональный утилит
import Interact from "interactjs"; // библиотека для работы с drag and drop, resizing and multi-touch gestures
import Sortable from "sortablejs"; // библиотека для переупорядочиваемых списков перетаскивания
import PerfectScrollbar from "perfect-scrollbar"; // плагин прокрутки
import SimpleScrollbar from "simple-scrollbar";
import "fabric"; // библиотека для работы с HTML5 canvas
import "jquery-colpick"; // jquery-плагин color picker
import "./lib/spectrum/spectrum"; // jquery-плагин color picker
import "nicescroll"; // jquery-плагин прокрутки

/*
  глобальные переменные
*/

window.levelNeg = -10;
window.level0 = 0;
window.level1 = 10;
window.level2 = 100;
window.level3 = 1000;
window.level4 = 10000;
window.level5 = 100000;
window.level6 = 1000000;
window.level7 = 1000000;

window.html = document.documentElement;
window.Vue = Vue;
window.Vuex = Vuex;
window.bus = new Vue(); //глобальная шина
window.$ = $;
window._ = _;
window.Interact = Interact;
window.Sortable = Sortable;
window.PerfectScrollbar = PerfectScrollbar;
window.SimpleScrollbar = SimpleScrollbar;
window.fabric = fabric;
window.genID = generatorID();

// две константы для функции getPixel объекта fabric.Canvas
window.RGB_OBJECT = 1;
window.RGB_STRING = 0;

window.COORDS_SIZE = 20;

/*
  общие настройки библиотек
*/

Vue.config.devtools = true;
Vue.config.performance = true;

Vue.use(Vuex);

Vue.component("v-select", vSelect);

Interact.dynamicDrop(true);

/* 
  добавление методов в прототипы различных объектов
*/

/**
 * свойство объекта fabric.Group
 * @return {Object} возвращает первый элемент группы
 */
Object.defineProperty(fabric.Group.prototype, "object", {
  get() {
    return this.item(0);
  }
});

// для отладки
Object.defineProperty(fabric.Canvas.prototype, "v", {
  get() {
    return this.viewportTransform;
  },
  set(arr) {
    this.setViewportTransform(arr);
  }
});

/**
 * метод объекта fabric.Canvas
 * координаты x, y должны быть относительно canvas а не относительно viewportTransform
 * @param {Const} [format] принимает константу RGB_OBJECT или RGB_STRING
 * @param {Number} [x]
 * @param {Number} [y]
 * @param {Number} [width]
 * @param {Number} [height]
 * @return {Object | String} возвращает цвет пикселя в координат x, y с размерами width, height
 * в формате rgb в виде строки или в виде объекта
 */
Object.defineProperty(fabric.Canvas.prototype, "getPixel", {
  value(format = RGB_OBJECT, x, y, width = 1, height = 1) {
    (x && y) || ({ x, y } = this.getPointer(null, true));
    let data = this.getContext().getImageData(x, y, width, height).data;
    let color = tinycolor({ r: data[0], g: data[1], b: data[2], a: _.round(data[3] / 255, 2) });
    if (format) return color.toRgb();
    else return color.toRgbString();
  }
});

/**
 * свойство массивов last
 * @return {Any} возвращает последний элемент массива
 */
Object.defineProperty(Array.prototype, "last", {
  get() {
    return this[this.length - 1];
  }
});

/**
 * метод массивов remove, удаляет элемент из массива по  значению
 * @param {Any} значение элемента, который нужно удалить
 * @return {Any} возвращает удаленный элемент
 */
Object.defineProperty(Array.prototype, "remove", {
  value(value) {
    this.splice(this.indexOf(value), 1);
    return value;
  }
});



/**
 * метод массивов removeIndex, удаляет элемент из массива по индексу
 * @param {Number} индекс элемента, который нужно удалить
 * @return {Any} возвращает удаленный элемент
 */
Object.defineProperty(Array.prototype, "removeIndex", {
  value(index) {
    let remember = this[index];
    this.splice(index, 1);
    return remember;
  }
});

/**
 * метод массивов flat, делает из двухмерного массива одномерный
 * @return {Array} возвращает одномерный массив
 */
Object.defineProperty(Array.prototype, "flat", {
  value() {
    let newArr = [];
    for (let i = 0; i < this.length; i++) {
      newArr = newArr.concat(this[i]);
    }
    return newArr;
  }
});

/**
 * метод массивов insert, вставляет элемент по указанному индексу
 * @param {Number} index
 * @param {Any} value
 * @returns {Any} возвращает вставленный элемент
 */
Object.defineProperty(Array.prototype, "insert", {
  value(index, value) {
    this.splice(index, 0, value);
    return value;
  }
});

/**
 * метод массивов unique, оставляет в массиве уникальные объекты
 * не работает с числами строки, а также с вложенными массивами
 * @param {String} принимает ключ, по которому будут сравниваться объекты
 * @return {Array}
 */
Object.defineProperty(Array.prototype, "unique", {
  value(key) {
    let result = [];

    for (let i = 0; i < this.length; i++) {
      let obj = this[i];

      if (result.find(item => item[key] === obj[key])) continue;

      result.push(obj);
    }
    return result;
  }
});

Object.defineProperty(Object.prototype, "genID", {
  get: () => genID.next().value
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

//window.maxId = arr => Math.max(...arr.map(item => item.id));

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

/*
  дефолтные настройки
*/

/* 
  Canvas - 0
  Transfrom - 1
  Common - 2
  Text - 3
  Layer - 4
  Pencil - 5
  Fill - 6
*/

window.config = {
  grids: {
    ["Основная"]: {
      grid: [
        [{ component: "CommonTools", id: 2, isFold: false, isActive: true, title: "инструменты" }],
        [{ component: "CanvasWrapper", id: 0, isFold: false, isActive: true, title: "canvas" }],
        [
          { component: "TransformTools", id: 1, isFold: true, isActive: true, title: "трансформация" },
          { component: "FillTools", id: 6, isFold: true, isActive: true, title: "Заливка", class: "fill-tools" },
          { component: "LayerTools", id: 4, isFold: true, isActive: true, title: "Слои" }
        ]
      ],
      gridTools: [
        { component: "TransformTools", id: 1, isFold: true, isActive: true, title: "трансформация" },
        { component: "CommonTools", id: 2, isFold: true, isActive: true, title: "инструменты" },
        { component: "TextTools", id: 3, isFold: false, isActive: false, title: "Текст" },
        { component: "LayerTools", id: 4, isFold: true, isActive: true, title: "Слои" },
        { component: "PencilTools", id: 5, isFold: false, isActive: false, title: "Мелок" },
        { component: "FillTools", id: 6, isFold: true, isActive: true, title: "Заливка", class: "fill-tools" }
      ],
      name: "Основная"
    },
    ["Начальная"]: {
      grid: [[{ component: "CanvasWrapper", id: 0, isFold: false, isActive: true, title: "canvas" }]],
      gridTools: [
        { component: "TransformTools", id: 1, isFold: false, isActive: false, title: "трансформация" },
        { component: "CommonTools", id: 2, isFold: false, isActive: false, title: "инструменты" },
        { component: "TextTools", id: 3, isFold: false, isActive: false, title: "Текст" },
        { component: "LayerTools", id: 4, isFold: false, isActive: false, title: "Слои" },
        { component: "PencilTools", id: 5, isFold: false, isActive: false, title: "Мелок" },
        { component: "FillTools", id: 6, isFold: false, isActive: false, title: "Заливка", class: "fill-tools" }
      ],
      name: "Начальная"
    },
    currentGrid: {
      grid: [
        [{ component: "CommonTools", id: 2, isFold: false, isActive: true, title: "инструменты" }],
        [{ component: "CanvasWrapper", id: 0, isFold: false, isActive: true, title: "canvas" }],
        [
          { component: "TransformTools", id: 1, isFold: true, isActive: true, title: "трансформация" },
          { component: "FillTools", id: 6, isFold: true, isActive: true, title: "Заливка", class: "fill-tools" },
          { component: "LayerTools", id: 4, isFold: true, isActive: true, title: "Слои" }
        ]
      ],
      gridTools: [
        { component: "TransformTools", id: 1, isFold: true, isActive: true, title: "трансформация" },
        { component: "CommonTools", id: 2, isFold: true, isActive: true, title: "инструменты" },
        { component: "TextTools", id: 3, isFold: false, isActive: false, title: "Текст" },
        { component: "LayerTools", id: 4, isFold: true, isActive: true, title: "Слои" },
        { component: "PencilTools", id: 5, isFold: false, isActive: false, title: "Мелок" },
        { component: "FillTools", id: 6, isFold: true, isActive: true, title: "Заливка", class: "fill-tools" }
      ],
      name: "Основная"
    }
  },
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
    ["Серая"]: {
      textColor: "black",
      mainColor: "#f6f4f5",
      bgColor: "#bfbbb5",
      bgBody: "#877a79",
      borderColor: "#301c0c",
      labelColor: "#877a79",
      theme: "Серая"
    },
    ["Розовая"]: {
      textColor: "white",
      mainColor: "#d69cf4",
      bgColor: "#e866d3",
      bgBody: "#80379c",
      borderColor: "#fabef4",
      labelColor: "#80379c",
      theme: "Розовая"
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
  },
  palette: [
    [
      "Transparent",
      "Black",
      "Gray",
      "white",
      "Fuchsia",
      "Purple",
      "Red",
      "Maroon",
      "Yellow",
      "Olive",
      "Lime",
      "Green",
      "Aqua",
      "Teal",
      "Blue",
      "Navy"
    ],
    ["IndianRed", "LightCoral", "Salmon", "DarkSalmon", "LightSalmon", "Crimson", "Red", "FireBrick", "DarkRed"],
    ["Pink", "LightPink", "HotPink", "DeepPink", "MediumVioletRed", "PaleVioletRed"],
    ["LightSalmon", "Coral", "Tomato", "OrangeRed", "DarkOrange", "Orange"],
    [
      "Gold",
      "Yellow",
      "LightYellow",
      "LemonChiffon",
      "LightGoldenrodYellow",
      "PapayaWhip",
      "Moccasin",
      "PeachPuff",
      "PaleGoldenrod",
      "Khaki",
      "DarkKhaki"
    ],
    [
      "Cornsilk",
      "BlanchedAlmond",
      "Bisque",
      "NavajoWhite",
      "Wheat",
      "BurlyWood",
      "Tan",
      "RosyBrown",
      "SandyBrown",
      "Goldenrod",
      "DarkGoldenRod",
      "Peru",
      "Chocolate",
      "SaddleBrown",
      "Sienna",
      "Brown",
      "Maroon"
    ],
    [
      "White",
      "Snow",
      "Honeydew",
      "MintCream",
      "Azure",
      "AliceBlue",
      "GhostWhite",
      "WhiteSmoke",
      "Seashell",
      "Beige",
      "OldLace",
      "FloralWhite",
      "Ivory",
      "AntiqueWhite",
      "Linen",
      "LavenderBlush",
      "MistyRose"
    ],
    [
      "Gainsboro",
      "LightGrey",
      "Silver",
      "DarkGray",
      "Grey",
      "DimGray",
      "LightSlateGray",
      "SlateGray",
      "DarkSlateGray",
      "Black"
    ],
    [
      "GreenYellow",
      "Chartreuse",
      "LawnGreen",
      "Lime",
      "LimeGreen",
      "PaleGreen",
      "LightGreen",
      "MediumSpringGreen",
      "SpringGreen",
      "MediumSeaGreen",
      "SeaGreen",
      "ForestGreen",
      "Green",
      "DarkGreen",
      "YellowGreen",
      "OliveDrab",
      "Olive",
      "DarkOliveGreen",
      "MediumAquamarine",
      "DarkSeaGreen",
      "LightSeaGreen",
      "DarkCyan",
      "Teal"
    ],
    [
      "Aqua",
      "Cyan",
      "LightCyan",
      "PaleTurquoise",
      "Aquamarine",
      "Turquoise",
      "MediumTurquoise",
      "DarkTurquoise",
      "CadetBlue",
      "SteelBlue",
      "LightSteelBlue",
      "PowderBlue",
      "LightBlue",
      "SkyBlue",
      "LightSkyBlue",
      "DeepSkyBlue",
      "DodgerBlue",
      "CornflowerBlue",
      "MediumSlateBlue",
      "RoyalBlue",
      "Blue",
      "MediumBlue",
      "DarkBlue",
      "Navy",
      "MidnightBlue"
    ],
    [
      "Lavender",
      "Thistle",
      "Plum",
      "Violet",
      "Orchid",
      "Fuchsia",
      "Magenta",
      "MediumOrchid",
      "MediumPurple",
      "BlueViolet",
      "DarkViolet",
      "DarkOrchid",
      "DarkMagenta",
      "Purple",
      "Indigo",
      "SlateBlue",
      "DarkSlateBlue"
    ]
  ]
};
