<template>
	<div class="layers-wrapper" >

    <div ref="layers" class="layers" v-resize v-scroll :style="{height: '300px'}">
      <div @click="activeLayerAlias($event, layer)" 
          :class="['layer', {active: activeLayer === layer}]" 
          v-for="layer in reverse(layers)" :key="layer.id" :data-id="layer.id">

        <Icon class="eye" :icon="layer.visible ? 'eye' : 'eye-cross'"></Icon>
        {{layer.title}}
      </div>
    </div>

		<div  class="layers-tools">
			<div @click="layerTool.event" class="layers-tool bg-anim-icon" v-for="(layerTool, index) in layerTools" :key="index">
				<Icon :icon="layerTool.icon"></Icon>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  components: {
    Icon: () => import('../icon.vue')
  },
  methods: {
    hello(){
      console.log('gello');
    },
    layerUp() {
      let index;
      this.c.bringForward(this.activeLayer.group);
      index = this.c.getObjects().findIndex(object => object === this.activeLayer.group);
      this.layers.splice(index, 0, this.layers.remove(this.activeLayer));
    },
    layerDown() {
      let index;
      this.c.sendBackwards(this.activeLayer.group);
      index = this.c.getObjects().findIndex(object => object === this.activeLayer.group);
      this.layers.splice(index, 0, this.layers.remove(this.activeLayer));
    },
    layerNew() {},
    layerDelete() {
      this.c.remove(this.activeLayer.group);
      this.layers.remove(this.activeLayer);
      this.canvas.activeLayer = null;
    },
    activeLayerAlias(e, layer) {
      this.canvas.activeLayer = layer;
      if (e.target.closest('.eye')) {
        layer.visible = layer.group.visible = !layer.group.visible;
        this.c.renderAll();
      }
    }
  },
  mounted() {
    new Sortable(this.$refs.layers, {
      draggable: '.layer',
      animation: 150,
      onUpdate: e => {
        let newIndexRevert = this.layers.length - 1 - e.newIndex, oldIndexRevert = this.layers.length - 1 - e.oldIndex
				this.layers.splice(newIndexRevert, 0, this.layers.removeIndex(oldIndexRevert))
        this.layers[newIndexRevert].group.moveTo(newIndexRevert)
      }
    });
    console.log(this.$refs.layers);
    //SimpleScrollbar.initEl(".layers")
    // $(this.$refs.layers).niceScroll({
    //   autohidemode: 'leave'
    // });
  },
  computed: {
    activeLayer() {
      return this.canvas.activeLayer;
    },
    layers() {
      if (this.canvas) return this.canvas.layers;
      return [];
    },
    c() {
      return this.canvas.c;
    },
    ...Vuex.mapState(["canvas"])
  },
  data() {
    return {
      layerTools: [
        { icon: "layer-up", event: this.layerUp },
        { icon: "layer-down", event: this.layerDown },
        { icon: "layer-add", event: this.layerNew },
        { icon: "delete", event: this.layerDelete }
      ],
      layerActive: null,
      reverse: reverse
    };
  }
};
</script>

<style lang="sass" scoped>
@import 'config-style'

.layers-wrapper
  .layers
    position: relative
    display: flex
    flex-direction: column
    .layer
      position: relative
      padding: 10px 6px
      display: flex
      flex-shrink: 0
      align-items: center
      color: var(--text-color)
      background: var(--main-color)
      +bb()
    .layer::after
      content: ''
      position: absolute
      height: 100%
      top: 0
      left: 28px
      +br()
    .layer.active
      background: var(--bg-color)


.layers-tools
	display: flex
	.layers-tool
		padding: 5px



</style>
