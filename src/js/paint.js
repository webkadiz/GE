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
import MenuHeader from "./components/menu-header.vue";
import MenuHeaderDropdownItem from "./components/menu-header-dropdown-item.vue";
import PanelHeaderTools from "./components/panel-header-tools.vue";
import Grid from "./components/grid.vue";
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

Vue.config.devtools = true;
Vue.config.performance = true;

window.bus = new Vue(); //глобальная шина

Vue.use(Vuex);
Vue.use(Sortable);

const store = new Vuex.Store({
  state: {
    headerDropdownItem: [{ connector: "newFile", isActive: false }, { connector: "windowSize", isActive: false }],
    grid: [],
    gridTools: [
      { component: "CanvasWrapper", id: 0 },
      { component: "CommonTools", id: 1 },
      { component: "TextTools", id: 2 },
      { component: "LayerTools", id: 3 },
      { component: "PencilTools", id: 4 }
    ],
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
    openHeaderDropdownItem: (state, connector) =>
      (state.headerDropdownItem.find(item => item.connector === connector).isActive = true),
    closeHeaderDropdownItem: (state, connector) =>
      (state.headerDropdownItem.find(item => item.connector === connector).isActive = false),

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
              state.grid.splice(index + flagPlace, 0, [state.gridTools.find(tool => tool.component === component)]);
              return;
            } else if (flagGrid === "ROW") {
              let index = gridCol.indexOf(gridRow);
              gridCol.splice(index + flagPlace, 0, state.gridTools.find(tool => tool.component === component));
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
        c: null,
        layers: [],
        activeLayer: null
      });
      state.canvas = state.canvases.last;
    }
  }
});

Vue.component("v-select", vSelect);

let app = new Vue({
  el: "#app",
  store,
  components: {
    MenuHeader,
    MenuHeaderDropdownItem,
    PanelHeaderTools,
    Grid
  },
  computed: Vuex.mapState(["headerDropdownItem"]),
  methods: {}
});
