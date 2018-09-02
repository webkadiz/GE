<template>
  <div class="canvas-wrapper">

    <CanvasCoords :top="scrollTop" axis="x"></CanvasCoords>
    <CanvasCoords :left="scrollLeft" axis="y"></CanvasCoords>

    <canvas class="no-invert canvas" ref="canvas"></canvas>
    
  </div>	
</template>

<script>
export default {
  components: {
    CanvasCoords: () => import("./canvas-coords.vue")
  },
  computed: {
    ...Vuex.mapState(["canvas"]),
    ...Vuex.mapGetters(["getCanvasWidth", "getCanvasHeight"])
  },
  methods: {
    width() {
      if (this.$el) return this.$el.clientWidth - 20;
    },
    height() {
      if (this.$el) return this.$el.clientHeight - 20;
    },

    init() {
      let rectTransparent = new fabric.Rect({
        width: this.canvas.width,
        height: this.canvas.height,
        strokeWidth: 0
      });

      let transparent = new fabric.StaticCanvas(document.createElement("canvas"), {
        width: 10,
        height: 10
      });
      //prettier-ignore
      transparent.add(
        new fabric.Rect({
          left: 0, top: 0, width: 5, height: 5, fill: '#e2e2e2', strokeWidth: 0
        }),
        new fabric.Rect({
          left: 5, top: 0, width: 5, height: 5, fill: 'white', strokeWidth: 0
        }),
        new fabric.Rect({
          left: 0, top: 5, width: 5, height: 5, fill: 'white', strokeWidth: 0
        }),
        new fabric.Rect({
          left: 5, top:5, width: 5, height: 5, fill: '#e2e2e2', strokeWidth: 0
        })     
      )

      this.canvas.transparent = transparent;
      rectTransparent.setPatternFill({
        source: transparent.getElement(),
        repeat: "repeat"
      });
      this.c.add(rectTransparent);
      rectTransparent.center();
      rectTransparent.sendToBack();
      this.c.requestRenderAll();

      let background = new fabric.Rect({
        width: this.canvas.width,
        height: this.canvas.height,
        fill: this.canvas.background
      });
      let group = (this.canvas.background = new fabric.Group([background], {
        selectable: false,
        hasControls: false,
        hasBorders: false,
        lockMovementX: true,
        lockMovementY: true,
        hoverCursor: "default",
        strokeWidth: 0
      }));
      group.type = "background";

      this.c.add(group);
      group.center();

      if (this.canvas.file) {
        let group = new fabric.Group([this.canvas.file]);
        this.c.add(group);
        group.center();
        this.c.requestRenderAll();
      }
    },
    updateSize() {
      let vpt = this.c.viewportTransform,
        top,
        left,
        bottom,
        right;
      let bounds = this.c.item(0).getBoundingRect();

      top = vpt[5] + 200 - bounds.top;

      left = vpt[4] + 200 - bounds.left;

      bottom = top - bounds.height;
      right = left - bounds.width;
      this.canvas.bounds = { top, bottom, left, right, width: bounds.width, height: bounds.height };
    }
  },
  mounted() {
    bus.$on("updateSize", this.updateSize); // app.js setZoom
    let counter = 1; //счетчик слоев

    this.canvas.c = this.c = new fabric.Canvas(this.$refs.canvas, {
      width: this.getCanvasWidth,
      height: this.getCanvasHeight,
      skipTargetFind: true,
      selection: false,
      preserveObjectStacking: true,
      fireRightClick: true,
      fireMiddleClick: true,
      centeredKey: "ctrlKey",
      altSelectionKey: "ctrlKey"
    });
    this.canvas.wrapper = this.$el;

    // this.c.on('object:modified', e => {
    // 	console.log(e);
    // })
    

    this.c.on("selection:created", e => {
      if(!e.target.unactive) {
        this.canvas.activeLayer = this.canvas.layers.find(layer => layer.group === e.target);
        
      }
    });
    this.c.on("selection:updated", e => {
      if(!e.target.unactive) {
        this.canvas.activeLayer = this.canvas.layers.find(layer => layer.group === e.target);
      }
    });

  
    this.c.on("selection:cleared", e => {
      console.log(e, 'selection cleared');
      //console.log('cleared');
      //this.canvas.activeLayer = null;
    });

    this.c.on("object:added", e => {
      //prettier-ignore
      let target = e.target, flag = false, title, layer;

      if (target.type === "background") {
        title = `Фон ${this.canvas.layers.length + 1}`;
        flag = true
      } else if (target.type === "pencil") {
        title = `Карандаш ${this.canvas.layers.length + 1}`;
        flag = true
      } else if (target.type === "brush") {
        title = `Карандаш ${this.canvas.layers.length + 1}`;
        flag = true
      } else if (target.type === "text") {
        title = `Текст ${this.canvas.layers.length + 1}`;
        flag = true
      } else if (target.type === "square") {
        title = `Прямоугольник ${this.canvas.layers.length + 1}`;
        flag = true
      } else if (target.type === "lines") {
        title = `Линия ${this.canvas.layers.length + 1}`;
        flag = true
      } else if (target.type === "empty") {
        title = `Пустой ${this.canvas.layers.length + 1}`;
        flag = true
      }

      if(flag) {
        layer = { object: target.object, type: target.type, group: target,title, id: counter++, visible: true };
        this.canvas.layers.push(layer);
        this.canvas.activeLayer = layer;
        this.c.setActiveObject(layer.group)
        this.c.requestRenderAll()
      }
    });
    this.c.on("object:removed", e => {});

    //prettier-ignore
    this.c.on('mouse:down', e => {
      let move, up, lastPosX, lastPosY;
      if(e.e.ctrlKey && e.button === 3) {

        lastPosX = e.e.clientX;
        lastPosY = e.e.clientY;

        this.c.on('mouse:move', move = e => {
          this.c.viewportTransform[4] += e.e.clientX - lastPosX;
          this.c.viewportTransform[5] += e.e.clientY - lastPosY;
          this.c.requestRenderAll();
          lastPosX = e.e.clientX;
          lastPosY = e.e.clientY;
        })

        this.c.on('mouse:up', up = e => {
          this.c.off('mouse:move', move)
          this.c.off('mouse:up', up)
        })
      }
    })

    this.init();
    this.updateSize();

    //$(this.canvas.c.wrapperEl).css({left: 20, top: 20 });

    this.ps = this.canvas.ps = new PerfectScrollbar(this.$el);

    this.$el.addEventListener("ps-scroll-x", () => {
      let width = this.$el.scrollWidth - this.$el.clientWidth;
      let perScroll = this.$el.scrollLeft / width;
      let perCanvas = perScroll * this.canvas.width * this.canvas.zoom;
      let vpt = this.c.viewportTransform;
      vpt[4] = this.canvas.bounds.left - perCanvas;
      this.canvas.c.setViewportTransform(vpt);

      this.canvas.c.wrapperEl.style.left = this.$el.scrollLeft + COORDS_SIZE + "px";
      this.scrollLeft = this.$el.scrollLeft;
    });
    this.$el.addEventListener("ps-scroll-y", () => {
      let height = this.$el.scrollHeight - this.$el.clientHeight;
      let perScroll = this.$el.scrollTop / height;
      let perCanvas = perScroll * this.canvas.height * this.canvas.zoom;
      let vpt = this.c.viewportTransform;
      vpt[5] = this.canvas.bounds.top - perCanvas;
      this.canvas.c.setViewportTransform(vpt);

      this.canvas.c.wrapperEl.style.top = this.$el.scrollTop + COORDS_SIZE + "px";
      this.scrollTop = this.$el.scrollTop;
    });

    this.ps.update();

    bus.$emit("toolEventActive"); // обработчик в common-tools
  },
  data() {
    return {
      scrollTop: 0,
      scrollLeft: 0
    };
  }
};
</script>

<style lang="sass">
@import 'config-style'

.canvas-wrapper
  flex: 1
  position: relative
  overflow: hidden
  .canvas-wrapper-inner
    position: absolute
    display: inline-block

.canvas-container
  left: 20px
  top: 20px

// .lower-canvas
//   background-image: url(data:image/gif;base64,R0lGODlhCgAKAIAAAOLi4v///yH5BAAHAP8ALAAAAAAKAAoAAAIRhB2ZhxoM3GMSykqd1VltzxQAOw==)


.coords-x-wrapper
	font-size: .7rem
	line-height: 30px
	display: flex
	position: absolute
	left: 0
	top: 0
	z-index: 20
	height: 20px
	width: 100%
	background: var(--bg-color)
	color: var(--text-color)
	.coords-x
		width: calc(100% - 20px)
		display: flex
		div
			flex-shrink: 0
			height: 20px
			text-indent: 2px
			+bl()
.coords-y-wrapper
	@extend .coords-x-wrapper
	line-height: inherit
	position: absolute
	z-index: 10 
	flex-direction: column
	left: 0
	top: 0
	height: 100%
	width: 20px	
	.coords-y
		div
			flex-shrink: 0
			white-space: pre-wrap
			text-align: center
			+bt()
			width: 20px

</style>
