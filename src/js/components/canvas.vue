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
    ...Vuex.mapState(["canvas"])
  },
  methods: {
    width() {
      if (this.$el) return this.$el.clientWidth - 20;
    },
    height() {
      if (this.$el) return this.$el.clientHeight - 20;
    },
    
    initCanvasBackground() {
      let rect = new fabric.Rect({
        left: this.canvas.wrapperWidth / 2 - this.canvas.width / 2,
        top: this.canvas.wrapperHeight / 2 - this.canvas.height / 2,
        width: this.canvas.width,
        height: this.canvas.height,
        fill: this.canvas.backgroundColor  
      });
      let group = this.canvas.background = new fabric.Group([rect], {
        selectable: false
      });
      group.type = 'background'

      this.c.add(group)
    }
  },
  mounted() {
    let counter = 1; //счетчик слоев

    Object.defineProperty(this.canvas, 'wrapperWidth', {
      get: () => this.$el.clientWidth - 20     
    })
     Object.defineProperty(this.canvas, 'wrapperHeight', {
      get: () => this.$el.clientHeight - 20  
    })

    this.canvas.c = this.c = new fabric.Canvas(this.$refs.canvas, {
      width: this.canvas.wrapperWidth,
      height: this.canvas.wrapperHeight,
      skipTargetFind: true,
      selection: false,
      preserveObjectStacking: true,
    });
    this.canvas.wrapper = this.$el
  

    // this.c.on('object:modified', e => {
    // 	console.log(e);
    // })
    

    this.c.on("selection:created", e => {
      //console.log(e, 'selection created');
      console.log(this.canvas.layers.find(layer => layer.group === e.target));
      this.canvas.activeLayer = this.canvas.layers.find(layer => layer.group === e.target);
    });
    this.c.on("selection:updated", e => {
      //console.log(e, 'selection updated');
      this.canvas.activeLayer = this.canvas.layers.find(layer => layer.group === e.target);
    });

    this.c.on("before:selection:cleared", e => {
      //console.log(e, 'before selection cleared');
    });
    this.c.on("selection:cleared", e => {
      //console.log(e, 'selection cleared');
      //console.log('cleared');
      //this.canvas.activeLayer = null;
    });

    this.c.on("object:added", e => {
      //prettier-ignore
      let group = e.target,
					object = group.object,
					title, layer, type;

      if (object) {
        if (group.type === "background") {
          type = "background";
          title = `Фон ${this.canvas.layers.length + 1}`;
        } else if (object.type === "i-text") {
          type = "text";
          title = `Текст ${this.canvas.layers.length + 1}`;
        } else if (object.type === "rect") {
          type = "square";
          title = `Прямоугольник ${this.canvas.layers.length + 1}`;
        } else if (object.type === "path") {
          type = "pencil";
          title = `Карандаш ${this.canvas.layers.length + 1}`;
        } else if (object.type === "line") {
          type = "line";
          title = `Линия ${this.canvas.layers.length + 1}`;
        }  else {
          type = "nothing";
          title = `Слой ${this.canvas.layers.length + 1}`;
        }

        layer = { object, group, type, title, id: counter++, visible: true };
        this.canvas.layers.push(layer);
        this.canvas.activeLayer = layer;
        return;
      }
    });
    this.c.on("object:removed", e => {});

    this.initCanvasBackground()

    //кастомные полосы прокрутки
    $(this.canvas.c.wrapperEl).css({position:'absolute', left: 20, top: 20 });
    // $(this.$el).niceScroll('.scroll', {
    //   cursorcolor: "#535353",
    //   cursorborder: "1px solid #535353",
    //   autohidemode: "leave",
    //   enablecrollonselectionL: false
    // });

    this.ps = this.canvas.ps = new PerfectScrollbar(this.$el);

    this.$el.addEventListener('ps-scroll-x' , () => {
      this.canvas.c.wrapperEl.style.left = this.$el.scrollLeft + 20 + 'px'
      this.scrollLeft = this.$el.scrollLeft   
    })
    this.$el.addEventListener('ps-scroll-y' , () => {
      this.canvas.c.wrapperEl.style.top = this.$el.scrollTop + 20 + 'px'
      this.scrollTop = this.$el.scrollTop    
    })
    this.$el.addEventListener('ps-scroll-up' ,  () => {
      let vpt = this.c.viewportTransform;
      console.log(vpt);
      console.log(this.canvas.background.top);
      vpt[5] = -this.$el.scrollTop + -this.canvas.background.top * 2;
      this.canvas.c.setViewportTransform(vpt)
      //this.c.setViewportTransform(vpt)
    })
    this.$el.addEventListener('ps-scroll-down' ,  () => {
      let vpt = this.c.viewportTransform;
      console.log(vpt);
      vpt[5] = -this.$el.scrollTop + -this.canvas.background.top * 2;
      this.canvas.c.setViewportTransform(vpt)
      //this.c.setViewportTransform(vpt)
    })
     this.$el.addEventListener('ps-scroll-left' ,  () => {
      let vpt = this.c.viewportTransform;
      console.log(vpt);
      vpt[4] = -this.$el.scrollLeft + -this.canvas.background.left * 2;
      this.canvas.c.setViewportTransform(vpt)
    })
    this.$el.addEventListener('ps-scroll-right' ,  () => {
      let vpt = this.c.viewportTransform;
      console.log(vpt);
      vpt[4] = -this.$el.scrollLeft + -this.canvas.background.left * 2;
      this.canvas.c.setViewportTransform(vpt)
    })

    bus.$emit("toolEventActive"); // обработчик в common-tools
    bus.$emit('createCoords') // обработчик в canvas-coords
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
