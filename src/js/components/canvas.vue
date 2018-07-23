<template>
<div class="canvas-wrapper">

	<div class="coords-x-wrapper">
		<div style="height: 20px ; width: 20px ;flex-shrink: 0"></div>
	</div>
	<div class="coords-y-wrapper">
		<div style="height: 20px ; width: 20px ; flex-shrink: 0"></div>
	</div>

	<div ref="canvasInner" class="canvas-wrapper-inner">
		<canvas ref="canvas"></canvas>
	</div>
</div>	
</template>

<script>
import Tool from "./class_tool_all.js";
import { mapState } from "vuex";

export default {
  data() {
    return {
      canvasInner: ""
    };
  },
  computed: {
    ...mapState(["canvas"])
  },
  mounted() {
    let counter = 1; //счетчик слоев
    this.canvasInner = this.$refs.canvasInner;

    this.canvas.c = this.c = new fabric.Canvas(this.$refs.canvas, {
      width: this.canvas.width,
      height: this.canvas.height,
      backgroundColor: this.canvas.background,
      skipTargetFind: true,
      selection: false,
      preserveObjectStacking: true
    });
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
    elemCenter(this.canvasInner, 20, 20);
    //кастомные полосы прокрутки
    $(this.$el).niceScroll({
      cursorcolor: "#535353",
      cursorborder: "1px solid #535353",
      autohidemode: "leave",
      zindex: 10000000
    });

    bus.$emit("toolEventActive"); // обработчик в common-tools
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
	background: $bg-color
	color: $text-color
	.coords-x
		width: calc(100% - 20px)
		display: flex
		div
			flex-shrink: 0
			height: 20px
			text-indent: 2px
			border-left: 1px solid #888
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
			border-top: 1px solid #888
			width: 20px

</style>
