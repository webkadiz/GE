"use strict";

// импорт стилей
import "../css/apply_button.css";
import "jquery-colpick/css/colpick.css";
import "spectrum-colorpicker/spectrum.css";
import "../css/animate.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import "../sass/main.sass";

import "./config.js"; // файл конфигурации

// импорт компонентов
import vSelect from "vue-select";
import MenuAlias from "./components/menu.vue";
import Grid from "./components/grid.vue";
import MenuHeaderDropdownItem from "./components/menu-header-dropdown-item.vue";
import PanelHeaderTools from "./components/panel-header-tools.vue";

//импорт компонентов для отладки
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

Vue.use(Vuex);

// глобальное хранилище
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
      { component: "TextTools", id: 2, isFold: false, isActive: false, title: "Текст" },
      { component: "LayerTools", id: 3, isFold: false, isActive: false, title: "Слои" },
      { component: "PencilTools", id: 4, isFold: false, isActive: true, title: "Мелок" },
      { component: "FillTools", id: 5, isFold: false, isActive: true, title: "Заливка" }
    ],
    themes: getLocalStorageField("themes") || config.themes,
    canvases: [],
    canvas: null,
    global: {
      fill: "black"
    },
    move: {},
    pencil: {
      fill: "transparent",
      stroke: "black",
      strokeWidth: 5,
      strokeLineCap: "round",
      strokeLineJoin: "round"
    },
    text: {
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

    activeLayerUpdate(state, { newValue, setting }) {},
    canvasToolUpdate(state, { newValue, setting, tool }) {
      state[tool][setting] = newValue;
    },
    propUpdate(state, { newValue, setting, tool }) {
      if (state.canvas && state.canvas.activeLayer && (state.canvas.activeLayer.type === tool || tool === "global")) {
        state.canvas.activeLayer.object.set(setting, newValue);
        state.canvas.activeLayer.group.addWithUpdate();
        state.canvas.c.requestRenderAll();
        return;
      }
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
      store.commit({ type: "setZoom", zoom: 1, unsafe: true });

      state.canvas.c.clipTo = ctx => {
        ctx.rect(0, 0, state.canvas.wrapperWidth, state.canvas.wrapperHeight);
      };
      state.canvas.c.requestRenderAll();

      state.canvas.c.setViewportTransform([
        1,
        0,
        0,
        1,
        -(state.canvas.wrapperWidth / 2 - state.canvas.width / 2),
        -(state.canvas.wrapperHeight / 2 - state.canvas.height / 2)
      ]);
      state.canvas.c.setWidth(state.canvas.width);
      state.canvas.c.setHeight(state.canvas.height);

      let base = state.canvas.c.toDataURL("png");

      let link = document.createElement("a");
      link.href = base;
      link.download = true;
      link.click();
      store.commit({ type: "setZoom", zoom: state.canvas.zoom });
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
    canvasCenter(state) {
      let canvas = $(state.canvas.el);
      //prettier-ignore
      let left = (canvas.offsetParent().width() + 20) / 2 - canvas.width() / 2,
          top  = (canvas.offsetParent().height() + 20) / 2 - canvas.height() / 2;
      canvas.css({ left, top });

      if (top < 20 && left < 20) canvas.css({ left: "200px", top: "200px" });
      else if (top < 20) canvas.css("top", "200px");
      else if (left < 20) canvas.css("left", "200px");
    },
    newFile(state, props) {
      let { width, height, title, background: backgroundColor } = getPropFromInput(
        props,
        "width",
        "height",
        "title",
        "background"
      );

      let id = state.canvases.last ? state.canvases.last.id + 1 : 1;
      title = title ? title : `Untitled-${id}`;

      state.canvases.push({
        id,
        width: float(width),
        height: float(height),
        title,
        backgroundColor,
        zoom: 1,
        c: null,
        layers: [],
        activeLayer: null
      });
      state.canvas = state.canvases.last;
    },
    setZoom(state, { zoom, unsafe = false, point = false }) {
      if (!point) point = new fabric.Point(state.canvas.c.getWidth() / 2, state.canvas.c.getHeight() / 2);

      state.canvas.c.zoomToPoint(point, zoom);

      if (!unsafe) {
        state.canvas.zoom = zoom;
      }
      state.canvas.wrapper.scrollTop = Math.abs(state.canvas.c.viewportTransform[5]);
      state.canvas.wrapper.scrollLeft = Math.abs(state.canvas.c.viewportTransform[4]);
      state.canvas.ps.update();
      state.canvas.c.requestRenderAll();
    },
    themeChange(state, theme) {
      html.style.setProperty("--text-color", state.themes[theme].textColor);
      html.style.setProperty("--main-color", state.themes[theme].mainColor);
      html.style.setProperty("--bg-color", state.themes[theme].bgColor);
      html.style.setProperty("--bg-body", state.themes[theme].bgBody);
      html.style.setProperty("--label-color", state.themes[theme].labelColor);
      html.style.setProperty("--border-color", state.themes[theme].borderColor);
      bus.$emit("updateAnimationText"); //обработчик в menu-badge.vue
      state.themes.currentTheme = state.themes[theme];
      setLocalStorageField("themes", state.themes);
    },
    themeInvert(state) {
      state.themes.invert = !state.themes.invert;
      setLocalStorageField("themes", state.themes);
    },
    themeNew(state, colors) {
      //prettier-ignore
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
      Vue.set(state.themes, theme , {
        textColor,
        mainColor,
        bgColor,
        bgBody,
        borderColor,
        labelColor,
        theme
      })
      setLocalStorageField("themes", state.themes);
    },
    themeDelete(state) {
      let theme = state.themes.currentTheme.theme;
      if (theme !== "Темная" && theme !== "Светлая") Vue.set(state.themes, theme, undefined);
      setLocalStorageField("themes", state.themes);
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
    genThemes: state => {
      let themes = [];
      for (let theme in state.themes) {
        if (typeof state.themes[theme] === "object" && theme !== "currentTheme") {
          themes.push({
            event: "themeChange",
            getter: "getCurrentTheme",
            title: theme,
            type: "apply",
            value: theme
          });
        }
      }
      return themes;
    }
  }
});
window.store = store;

Vue.component("v-select", vSelect);

// точка входа в приложение
let app = new Vue({
  el: "#app",
  store,
  components: {
    MenuAlias,
    MenuHeaderDropdownItem,
    PanelHeaderTools,
    Grid
  },
  computed: Vuex.mapState(["headerDropdownItem"]),
  methods: {},
  mounted() {
    this.$store.commit("themeChange", "currentTheme");

    window.addEventListener("keydown", e => {
      //prettier-ignore
      if (e.ctrlKey && e.keyCode === 187) { // increase   
        e.returnValue = false;
        
        if (this.$store.state.canvas) {
          this.$store.commit({type: "setZoom", zoom: this.$store.state.canvas.zoom + 0.1});
          //this.$store.commit('canvasCenter');
        }
      }
      //prettier-ignore
      if (e.ctrlKey && e.keyCode === 189) { // decrease       
        e.returnValue = false;

        if (this.$store.state.canvas) {
          this.$store.commit({type: "setZoom", zoom: this.$store.state.canvas.zoom - 0.1});
         //this.$store.commit('canvasCenter');
        }
      }
    });
  }
});
