"use strict";

// импорт стилей
import "jquery-colpick/css/colpick";
import "spectrum-colorpicker/spectrum";
import "perfect-scrollbar/css/perfect-scrollbar";
import "../css/apply-btn";
import "../css/animate";
import "../css/switcher";
import "../sass/spectrum";
import "../sass/main";

import "./config"; // файл конфигурации

// импорт компонентов
import Navbar from "./components/navbar";
import Toolbar from "./components/toolbar";
import Grid from "./components/grid";
import MenuHeaderDropdownItem from "./components/menu-header-dropdown-item";

// глобальное хранилище
let store;
window.store = store = new Vuex.Store({
  state: {
    grids: getLocalStorageField("grids") || config.grids,
    themes: getLocalStorageField("themes") || config.themes,
    palette: getLocalStorageField("palette") || config.palette,
    modal: null,
    canvases: [],
    canvas: null,
    activeTool: null,
    global: {
      fill: "black",
      stroke: "black",
      hasControls: false
    },
    transform: {
      left: 0,
      top: 0,
      height: 0,
      width: 0
    },
    move: {},
    pencil: {
      fill: "transparent",
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
    openModal: (state, event) => {
      state.modal = state.modal ? state.modal : event;
    },
    closeModal: state => (state.modal = null),

    /**
     * обновляет свойства в глобальных настройках и в активнов слое, если есть такой
     * @param {Object} state
     * @param {String} newValue новое значение свойства
     * @param {String} setting название свойства
     * @param {String} tool название иструмента
     * @param {Boolean} onlyGlobal если true, тогда функция изменяет только глобальные настройки
     */
    propUpdate(state, { newValue, setting, tool, onlyGlobal, onlyGroup }) {
      let c = state.canvas;
      //prettier-ignore
      if (c && c.activeLayer && c.activeLayer.object && (c.activeLayer.type === tool || "global" === tool || "transform" === tool) && !onlyGlobal) 
      {
        let object = onlyGroup ? state.canvas.activeLayer.group : state.canvas.activeLayer.object;
        object.set(setting, newValue);
        //state.canvas.activeLayer.group.addWithUpdate();
        state.canvas.c.requestRenderAll();
        return;
      }

      state[tool][setting] = newValue;
    },
    /**
     * управляет сеткой
     * @param {Object} state
     * @param {String} component добавляемый в сетку компонент
     * @param {String} dropzoneComponent компонент, на который был сброшен добавляемый компонент
     * @param {Number} flagPlace 0 или 1, будет вставлен в сетку до dropzoneComponent или после dropzoneComponent
     * @param {String} flagGrid COL или ROW, будет вставлен в сетку в качетсве столбца или строки
     */
    loopGrid(state, { component, dropzoneComponent, flagPlace, flagGrid }) {
      for (let gridCol of store.getters.getGrid) {
        for (let gridRow of gridCol) {
          if (gridRow.component === dropzoneComponent) {
            if (flagGrid === "COL") {
              let index = _.indexOf(store.getters.getGrid, gridCol);
              let tool = _.find(store.getters.getGridTools, { component });
              store.getters.getGrid.insert(index + flagPlace, [tool]);
            } else if (flagGrid === "ROW") {
              let index = _.indexOf(gridCol, gridRow);
              let tool = _.find(store.getters.getGridTools, { component });
              gridCol.insert(index + flagPlace, tool);
              tool.isFold = gridCol[0].isFold;
            }
            setLocalStorageField("grids", state.grids);
            return;
          }
        }
      }
    },
    changeGrid(state, gridName) {
      state.grids.currentGrid = state.grids[gridName];
      setLocalStorageField("grids", state.grids);
    },
    newGrid(state, { workspace }) {
      Vue.set(state.grids, workspace, {
        grid: state.grids.currentGrid.grid.slice(),
        gridTools: state.grids.currentGrid.gridTools.slice(),
        name: workspace
      });

      state.grids.currentGrid = state.grids[workspace];
      setLocalStorageField("grids", state.grids);
    },
    deleteGrid(state) {},
    /**
     * изменение темы
     * @param {Object} state
     * @param {String} theme название темы, которую надо установить
     */
    changeTheme(state, theme) {
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
    /**
     * инвертирует текущую тему
     * @param {Object} state
     */
    invertTheme(state) {
      state.themes.invert = !state.themes.invert;
      setLocalStorageField("themes", state.themes);
    },
    /**
     * создает новую тему и запоминает в localStorage
     * @param {Object} state
     * @param {Object | Array} colors массив или объект цветов темы
     */
    newTheme(state, { theme, bgColor, bgBody, mainColor, labelColor, textColor, borderColor }) {
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
    /**
     * Удаляет текущую тему, не может удалить дефолтную тему
     * @param {Object} state
     */
    deleteTheme(state) {
      let theme = state.themes.currentTheme.theme;
      if (theme !== "Темная" && theme !== "Светлая" && theme !== "Розовая" && theme !== "Серая")
        Vue.set(state.themes, theme, undefined);
      setLocalStorageField("themes", state.themes);
    },
    /**
     * делает текущий холст активным
     * @param {Object} state
     * @param {String} title название холста
     */
    canvasActive(state, title) {
      state.canvas = state.canvases.find(canvas => canvas.title === title);
      bus.$emit("toolEventActive"); //обработчик в common-tool
    },
    /**
     * удаляет canvas
     * @param {Object} state
     * @param {String} title название холста
     */
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
    /**
     * создает новый canvas
     * @param {Object} state
     * @param {Object} props свойства холста
     */
    newFile(state, { file, title, width, height, background }) {
      let id = state.canvases.last ? state.canvases.last.id + 1 : 1;
      title = title ? title : `Untitled-${id}`;

      state.canvases.push({
        id,
        file,
        width: float(width),
        height: float(height),
        title,
        background,
        zoom: 1,
        c: null,
        layers: [],
        activeLayer: null
      });
      state.canvas = state.canvases.last;
    },
    /**
     * открывает изображение или svg
     * @param {Object} state
     */
    openFile(state) {
      //prettier-ignore
      $('<input type="file" accept="image/*">').trigger("click").change(function() {
        let file = $(this).get(0).files[0], type = file.type;

        if (!type.startsWith("image/")) return;
        let src = window.URL.createObjectURL(file);
           
        if (type === "image/svg+xml") {
          // загружает формат image/svg+xml
          fabric.loadSVGFromURL(src, (svg, options) => {
            svg = fabric.util.groupSVGElements(svg, options);

            store.commit({
              type: "newFile",
              title: file.name,
              background: "transparent",
              width: options.width,
              height: options.height,
              file: svg
            });
        
          });
        } else {
          //загружает все изображения кроме формата image/svg+xml
          //prettier-ignore
          new fabric.Image.fromURL(src, img =>
          store.commit({
            type: 'newFile',
            title: file.name,
            background: "transparent",
            width: img.width,
            height: img.height,
            file: img,
          }));

        }
      
      });
    },
    /**
     * скачивает canvas
     * @param {Object} state
     */
    download(state) {
      //store.commit({ type: "setZoom", zoom: 1, unsafe: true });

      state.canvas.c.clipTo = ctx => {
        ctx.rect(0, 0, state.canvas.width, state.canvas.height);
      };
      state.canvas.c.requestRenderAll();

      state.canvas.c.setViewportTransform([
        1,
        0,
        0,
        1,
        -(store.getters.getCanvasWidth / 2 - state.canvas.width / 2),
        -(store.getters.getCanvasHeight / 2 - state.canvas.height / 2)
      ]);
      state.canvas.c.setWidth(state.canvas.width);
      state.canvas.c.setHeight(state.canvas.height);

      let base = state.canvas.c.toDataURL("png");
      console.log(base);

      let link = document.createElement("a");
      link.href = base;
      link.download = true;
      link.click();
      store.commit({ type: "setZoom", zoom: state.canvas.zoom });
    },
    /**
     * @param {Object} state
     * @param {Number} zoom
     * @param {Boolen} unsafe определяет надо ли сохранять zoom переданный в аргументе
     * @param {fabric.Point} point точка относительно которой происходит zoom
     */
    setZoom(state, { zoom, unsafe = false, point = false }) {
      let vpt = state.canvas.c.viewportTransform;

      if (!point) point = new fabric.Point(state.canvas.c.getWidth() / 2, state.canvas.c.getHeight() / 2);

      state.canvas.c.zoomToPoint(point, zoom);

      console.log(state.canvas.c.viewportTransform);

      if (!unsafe) {
        state.canvas.zoom = zoom;
      }

      // state.canvas.transparent.forEachObject((object, index) => {
      //   console.log(object, index);
      //   object.set({
      //     width: 10 / state.canvas.c.getZoom(),
      //     height: 10 / state.canvas.c.getZoom()
      //   });
      //   if (index === 1) {
      //     object.set({ left: 10 / state.canvas.c.getZoom() });
      //   } else if (index === 2) {
      //     object.set({ top: 10 / state.canvas.c.getZoom() });
      //   } else if (index === 3) {
      //     object.set({ top: 10 / state.canvas.c.getZoom(), left: 10 / state.canvas.c.getZoom() });
      //   }
      //   state.canvas.transparent.requestRenderAll();
      // });

      // state.canvas.c.item(0).setPatternFill({
      //   source: state.canvas.transparent.getElement(),
      //   repeat: "repeat"
      // });

      //state.canvas.wrapper.scrollTop = Math.abs(state.canvas.c.viewportTransform[5]);
      //state.canvas.wrapper.scrollLeft = Math.abs(state.canvas.c.viewportTransform[4]);
      bus.$emit("updateSize"); // canvas.vue
      state.canvas.ps.update();
      state.canvas.c.requestRenderAll();
    },
    /**
     * переключение состояние инструмента: show / hide
     * @param {Object} state
     * @param {String} tool название инструмента
     */
    switchTool(state, tool) {
      console.log(_.find(store.getters.getGridTools, { component: tool }));
      //prettier-ignore
      let flag = false;
      _(store.getters.getGrid).forEach(item => {
        let temp;
        if ((temp = _.find(item, { component: tool }))) {
          temp.isActive = !temp.isActive;
          item.length !== 1 ? item.remove(temp) : store.getters.getGrid.remove(item);
          flag = true;
          return;
        }
      });

      if (flag) return;

      _.find(store.getters.getGridTools, { component: tool }).isActive = !_.find(store.getters.getGridTools, {
        component: tool
      }).isActive;
      setLocalStorageField("grids", state.grids);
    }
  },
  getters: {
    getCanvasProp: state => (setting, tool, onlyGlobal, onlyGroup) => {
      let c = state.canvas;
      //prettier-ignore
      if (c && c.activeLayer && c.activeLayer.object && (c.activeLayer.type === tool || "global" === tool || "transform" === tool) && !onlyGlobal)
        return onlyGroup ? c.activeLayer.group[setting] : c.activeLayer.object[setting];

      return state[tool][setting];
    },
    getCanvasWidth: () => $(".canvas-wrapper-outer").width() - COORDS_SIZE,
    getCanvasHeight: () => $(".canvas-wrapper-outer").height() - COORDS_SIZE - 25,
    /**
     * возвращает список инструментов в сетке в текущем активном рабочем месте
     * @return {Array}
     */
    getGrid: state => state.grids.currentGrid.grid,
    /**
     * возвращает весь список инструментов в текущем активном рабочем месте
     * @return {Array}
     */
    getGridTools: state => state.grids.currentGrid.gridTools,

    /**
     * геттеры с приставкой is используется в navbar для определения активен ли элемент или нет
     */

    /**
     * проверяет соответсвует переданное имя текущему активному рабочему месту
     * @return {Boolean}
     */
    isGrid: state => gridName => state.grids.currentGrid.name === gridName,
    /**
     * проверяет активен ли сейчас инструмент {display: block}
     * в текущем активном рабочем местt
     * @return {Boolean}
     */
    isGridTools: state => tool => _.find(state.grids.currentGrid.gridTools, { component: tool }).isActive,
    /**
     * проверяет соответсвует переданное имя текущей активной тему
     * @return {Boolean}
     */
    isTheme: state => theme => state.themes.currentTheme.theme === theme,
    /**
     * проверяет является ли тема активной
     */
    isThemeInvert: state => () => state.themes.invert,

    /*
     * генераторы
     * геттеры, которые генерируют динамические списки в меню - navbar
     */

    // генерирует список рабочих мест
    genGrids: state => {
      let grids = [];
      for (let grid in state.grids) {
        if (typeof state.grids[grid] === "object" && grid !== "currentGrid") {
          grids.push({
            event: "changeGrid",
            getter: "isGrid",
            title: grid,
            value: grid,
            type: "apply"
          });
        }
      }
      return grids;
    },

    // генерирует список тем
    genThemes: state => {
      let themes = [];
      for (let theme in state.themes) {
        if (typeof state.themes[theme] === "object" && theme !== "currentTheme") {
          themes.push({
            event: "changeTheme",
            getter: "isTheme",
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

// точка входа в приложение
new Vue({
  el: "#app",
  store,
  components: {
    Navbar,
    Toolbar,
    Grid,
    Modal: () => import("./components/modal"),
    MenuHeaderDropdownItem
  },
  computed: Vuex.mapState(["headerDropdownItem", "themes", "modal"]),
  methods: {},
  mounted() {
    this.$store.commit("changeTheme", "currentTheme");

    window.oncontextmenu = () => false;

    window.addEventListener("keydown", e => {
      //prettier-ignore
      if (e.ctrlKey && e.keyCode === 187) { // increase   
        e.preventDefault();
        
        if (this.$store.state.canvas) {
          this.$store.commit({type: "setZoom", zoom: this.$store.state.canvas.zoom + 0.1});
        }
      }
      //prettier-ignore
      if (e.ctrlKey && e.keyCode === 189) { // decrease       
        e.preventDefault();

        if (this.$store.state.canvas) {
          this.$store.commit({type: "setZoom", zoom: this.$store.state.canvas.zoom - 0.1});
        }
      }
    });

    window.addEventListener("wheel", e => {
      console.log(e);
      e.preventDefault();
      if (e.ctrlKey && this.$store.state.canvas) {
        if (e.deltaY < 0) {
          this.$store.commit({ type: "setZoom", zoom: this.$store.state.canvas.zoom + 0.1 });
        } else {
          this.$store.commit({ type: "setZoom", zoom: this.$store.state.canvas.zoom - 0.1 });
        }
      }
    });
  }
});

Vue.directive("scroll", {
  inserted(el) {
    let ps = new PerfectScrollbar(el);

    // let observer = new MutationObserver(mutations => {
    //   console.log(mutations);
    //   mutations.forEach(mutation => {
    //     if (mutation.attributeName !== "class") {
    //       console.log("ps");
    //       ps.update();
    //     }
    //   });
    // });

    // observer.observe(el, {
    //   childList: true,
    //   characterData: true,
    //   subtree: true,
    //   attributes: true
    // });
  }
});

Vue.directive("resize", {
  inserted(el) {
    Interact(el).resizable({
      edges: { bottom: true, top: true },

      // minimum size
      restrictSize: {
        min: { width: 100, height: 50 }
      },

      inertia: true,
      onmove: event => {
        let target = event.target,
          y = parseFloat(target.getAttribute("data-y")) || 0;

        target.style.height = event.rect.height + "px";
        y += event.deltaRect.top;

        target.setAttribute("data-y", y);
      }
    });
  }
});
