<template>
<div class="canvas-wrapper">

  <CanvasCoords :width="width()" :scrollTop="scrollTop" axis="x"></CanvasCoords>
  <CanvasCoords :height="height()" :scrollTop="scrollTop" axis="y"></CanvasCoords>

	<canvas class="no-invert canvas" ref="canvas"></canvas>
  
</div>	
</template>

<script>
export default {
  components: {
    CanvasCoords: () => import('./canvas-coords.vue')
  },
  computed: Vuex.mapState(["canvas"]),
  methods: {
    width() {     
      if(this.c)
        return +this.c.getWidth() 
    },
    height() {
      if(this.c)
        return +this.c.getHeight()
    }
  },
  mounted() {
    let counter = 1; //счетчик слоев

    this.canvas.c = this.c = new fabric.Canvas(this.$refs.canvas, {
      width: this.canvas.width,
      height: this.canvas.height,
      backgroundColor: this.canvas.background,
      skipTargetFind: true,
      selection: false,
      preserveObjectStacking: true
    });
    this.canvas.el = this.canvas.c.wrapperEl;
    this.c.renderAll();
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
      this.canvas.activeLayer = null;
    });

    this.c.on("object:added", e => {
      //prettier-ignore
      let group = e.target,
					object = group.object,
					title, layer, type;

      if (object) {
        if (object.type === "i-text") {
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
        } else {
          type = "nothing";
          title = `Слой ${this.canvas.layers.length + 1}`;
        }

        layer = { object, group, type, title, id: counter++, visible: true };
        this.canvas.layers.push(layer);
				this.canvas.activeLayer = layer;
				return
			}
    });
    this.c.on("object:removed", e => {});
    

    //центрируем холст
    this.$store.commit('canvasCenter');
    //кастомные полосы прокрутки
    $(this.canvas.el).css('position', 'absolute');
    // $(this.$el).niceScroll('.scroll', {
    //   cursorcolor: "#535353",
    //   cursorborder: "1px solid #535353",
    //   autohidemode: "leave",
    //   enablecrollonselectionL: false
    // });
    this.ps = new PerfectScrollbar(this.$el);

    this.$el.addEventListener('ps-scroll-y', () => {
      this.scrollTop = this.$el.scrollTop;
    });

    bus.$emit("toolEventActive"); // обработчик в common-tools
  },
  data () {
    return {
      scrollTop: 0
    }
  }
};
</script>

<style lang="sass">
@import '../../sass/_help'

.canvas-wrapper
	flex: 1
	position: relative
	overflow: scroll
	.canvas-wrapper-inner
		position: absolute
		display: inline-block

.lower-canvas
  background-image: url(data:image/gif;base64,R0lGODlhCgAKAIAAAOLi4v///yH5BAAHAP8ALAAAAAAKAAoAAAIRhB2ZhxoM3GMSykqd1VltzxQAOw==)


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
