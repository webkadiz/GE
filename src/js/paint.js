"use strict";

import "../css/apply_button.css";
import "../css/colpick.css";
import "../sass/main.sass";
import "../css/animate.css";

import "jquery-colpick"; // jquery плагин для полосы прокрутки
import "nicescroll"; // jquery плагин для цвета
import "jquery-ui-dist/jquery-ui";
import "./addition_function.js"; // набор функций

import "vue/dist/vue.runtime.js";
import Vue from "vue/dist/vue.js";
import Vuex from "vuex";
import Sortable from "vue-sortable";
import vSelect from "vue-select";
//импортирую для отладки
import "./components/canvas-wrapper.vue";
import "./components/canvas.vue";
import "./components/enter-prop-color.vue";
import "./components/enter-prop-menu.vue";
import "./components/enter-prop-tool.vue";
import "./components/casing.vue";
import "./components/grid-item.vue";
import "./components/tools/text-tools.vue";
import "./components/tools/common-tools.vue";
import "./components/menu-badge.vue";

Vue.config.devtools = true;
Vue.config.performance = true;

window.bus = new Vue(); //глобальная шина

Vue.use(Vuex);
Vue.use(Sortable);

const store = new Vuex.Store({
  state: {
    headerDropdownItem: [
      { event: "newFile", isActive: false },
      { event: "windowSize", isActive: false },
      { event: "themeNew", isActive: false }
    ],
    grid: [[{ component: "CanvasWrapper", id: 0, isFold: false, isActive: true, title: "canvas" }]],
    gridTools: [
      { component: "CommonTools", id: 1, isFold: false, isActive: true, title: "инструменты" },
      { component: "TextTools", id: 2, isFold: false, isActive: true, title: "Текст" },
      { component: "LayerTools", id: 3, isFold: false, isActive: true, title: "Слои" },
      { component: "PencilTools", id: 4, isFold: false, isActive: true, title: "Мелок" }
    ],
    themes: {
      light: {
        textColor: "black",
        mainColor: "WHITESMOKE",
        bgColor: "oldlace",
        bgBody: "gainsboro",
        borderColor: "#8F9491",
        labelColor: "dimgray",
        theme: "light",
        title: "Светлая"
      },
      dark: {
        textColor: "white",
        mainColor: "#535353",
        bgColor: "#424242",
        bgBody: "#282828",
        borderColor: "#8F9491",
        labelColor: "#d6d6d6",
        theme: "dark",
        title: "Темная"
      },
      currentTheme: null,
      invert: false
    },
    canvases: [],
    canvas: null,
    move: {},
    pencil: {
      fill: "transparent",
      stroke: "black",
      strokeWidth: 5,
      strokeLineCap: "round",
      strokeLineJoin: "round"
    },
    text: {
      fill: "black",
      fontStyle: "normal",
      fontSize: 40,
      lineHeight: 1.16,
      charSpacing: 0,
      underline: true,
      overline: false,
      text: "",
      originX: "left",
      originY: "top"
    },
    pouring: {},
    eraser: {},
    square: {},
    line: {}
  },
  mutations: {
    openHeaderDropdownItem: (state, event) =>
      (state.headerDropdownItem.find(item => item.event === event).isActive = true),
    closeHeaderDropdownItem: (state, event) =>
      (state.headerDropdownItem.find(item => item.event === event).isActive = false),

    activeLayerUpdate(state, { newValue, setting }) {
      state.canvas.activeLayer.object.set(setting, newValue);
      //state.canvas.activeLayer.group.renderGroup();
      state.canvas.activeLayer.group.addWithUpdate();
      state.canvas.c.renderAll();
    },
    canvasToolUpdate(state, { newValue, setting, tool }) {
      state[tool][setting] = newValue;
    },

    gridLoop(state, { component, dropzoneComponent, flagPlace, flagGrid }) {
      for (let gridCol of state.grid) {
        for (let gridRow of gridCol) {
          if (gridRow.component === dropzoneComponent) {
            if (flagGrid === "COL") {
              let index = state.grid.indexOf(gridCol);
              let tool = state.gridTools.find(tool => tool.component === component);
              state.grid.splice(index + flagPlace, 0, [tool]);
              return;
            } else if (flagGrid === "ROW") {
              let index = gridCol.indexOf(gridRow);
              let tool = state.gridTools.find(tool => tool.component === component);
              gridCol.splice(index + flagPlace, 0, tool);
              tool.isFold = gridCol[0].isFold;
              return;
            }
          }
        }
      }
    },
    download(state) {
      console.log("download");
    },
    canvasActive(state, title) {
      state.canvas = state.canvases.find(canvas => canvas.title === title);
      bus.$emit("toolEventActive"); //обработчик в common-tool
    },
    canvasClose(state, title) {
      let index = state.canvases.findIndex(canvas => canvas.title === title);
      //удаляем холст
      state.canvases.removeIndex(index);
      //выбираем новый активный холст после удаления
      if (state.canvases[index]) store.commit("canvasActive", state.canvases[index].title);
      else if (state.canvases[index - 1]) store.commit("canvasActive", state.canvases[index - 1].title);
    },

    newFile(state, props) {
      let { width, height, title, background } = getPropFromInput(props, "width", "height", "title", "background");

      let id = state.canvases.last ? state.canvases.last.id + 1 : 1;
      title = title ? title : `Untitled-${id}`;

      state.canvases.push({
        id,
        width,
        height,
        title,
        background,
        zoom: 1,
        c: null,
        layers: [],
        activeLayer: null
      });
      state.canvas = state.canvases.last;
    },
    setZoom(state, zoom) {
      state.canvas.zoom = zoom;
      canvas.setZoom(zoom);
      canvas.setHeight(state.canvas.height * zoom);
      canvas.setWidth(state.canvas.width * zoom);
      canvas.renderAll();
    },
    themeChange(state, theme) {
      html.style.setProperty("--text-color", state.themes[theme].textColor);
      html.style.setProperty("--main-color", state.themes[theme].mainColor);
      html.style.setProperty("--bg-color", state.themes[theme].bgColor);
      html.style.setProperty("--bg-body", state.themes[theme].bgBody);
      html.style.setProperty("--label-color", state.themes[theme].labelColor);
      html.style.setProperty("--border-color", state.themes[theme].borderColor);
      state.themes.currentTheme = state.themes[theme];
      bus.$emit("updateAnimationText"); //обработчик в menu-badge.vue
    },
    themeInvert(state) {
      $(html).toggleClass("invert");
      state.themes.invert = $(html).hasClass("invert");
    },
    themeNew(state, colors) {
      //prettier-ignore
      console.log(colors);
      let { theme, bgColor, bgBody, mainColor, labelColor, textColor, borderColor } = getPropFromInput(
        colors,
        "theme",
        "bgColor",
        "bgBody",
        "mainColor",
        "labelColor",
        "textColor",
        "borderColor"
      );
      //prettier-ignore
      localStorage.setItem('themes', JSON.stringify(Object.assign(state.themes, {
        [theme]: {
          textColor,
          mainColor,
          bgColor,
          bgBody,
          borderColor,
          labelColor,
          theme
        }
      })))

      console.log(state.themes);
    },

    switchTool(state, tool) {
      //prettier-ignore
      state.gridTools.find(gridTool => gridTool.component === tool).isActive = !state.gridTools.find(gridTool => gridTool.component === tool).isActive
    }
  },
  getters: {
    getCurrentTheme: state => theme => state.themes.currentTheme.theme === theme,
    getGridTool: state => tool => state.gridTools.find(gridTool => gridTool.component === tool).isActive,
    getInvertTheme: state => () => state.themes.invert,
    genThemes: function*(state) {
      for (let theme in state.themes) {
        console.log(state.themes[theme]);
        if (typeof state.themes[theme] === "object")
          yield {
            event: "themeChange",
            getter: "getCurrentTheme",
            title: state.themes[theme].title,
            type: "apply",
            value: state.themes[theme].theme
          };
      }
    }
  }
});

Vue.component("v-select", vSelect);

let app = new Vue({
  el: "#app",
  store,
  components: {
    MenuAlias: () => import("./components/menu.vue"),
    MenuHeaderDropdownItem: () => import("./components/menu-header-dropdown-item.vue"),
    PanelHeaderTools: () => import("./components/panel-header-tools.vue"),
    Grid: () => import("./components/grid.vue")
  },
  computed: Vuex.mapState(["headerDropdownItem"]),
  methods: {},
  mounted() {
    this.$store.commit("themeChange", "dark");
  }
});
