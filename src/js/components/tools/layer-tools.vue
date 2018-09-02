<template>
	<div class="layers-wrapper" >

    <div ref="layers" class="layers" v-resize :style="{height: '300px'}">
      <div @click="activeLayerAlias($event, layer)" @mouseover="activeObject(layer)" @mouseout="discardObject()"
          :class="['layer', {active: activeLayer === layer}]" 
          v-for="layer in layers.slice().reverse()" :key="layer.id" :data-id="layer.id">

        <div class="layer-eye">

          <Icon class="eye" :icon="layer.visible ? 'eye' : 'eye-cross'"></Icon>
        </div>
        
        <div class="layer-title">
          <div @dblclick="focusTitleInput(layer.title)" class="layer-title__preview">{{layer.title}}</div>
          <input @keydown.enter="blurTitleInput" 
                 @input="layer.title = $event.target.value" 
                 ref="titleInput" @blur="blurTitleInput" class="layer-title__input">
        </div>
      </div>
    </div>

		<div  class="layers-tools">
			<div @click="delegate(layerTool)" class="layers-tool bg-anim-icon" v-for="(layerTool, index) in layerTools" :key="index">
				<Icon :icon="layerTool"></Icon>
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
    delegate(event) {
      this.canvas && this[event]()
    },
    layerUp() {
      let index;
      this.c.bringForward(this.activeLayer.group);
      index = this.c.getObjects().findIndex(object => object === this.activeLayer.group);
      this.layers.insert(index, this.layers.remove(this.activeLayer));
    },
    layerDown() {
      let index;
      this.c.sendBackwards(this.activeLayer.group);
      index = this.c.getObjects().findIndex(object => object === this.activeLayer.group);
      this.layers.insert(index, this.layers.remove(this.activeLayer));
    },
    layerAdd() {
      let group = new fabric.Group();
      group.layer = true;
      group.type = 'empty'

      this.c.add(group)
    },
    delete() {// layerDelete
      this.c.remove(this.activeLayer.group);
      this.layers.remove(this.activeLayer);
      this.canvas.activeLayer = null;
    },
    activeLayerAlias(e, layer) {
      this.canvas.activeLayer = layer;
      this.c.setActiveObject(layer.group)
      if (e.target.closest('.layer-eye')) {
        layer.visible = layer.group.visible = !layer.group.visible;
      }
      this.c.requestRenderAll();
    },
    activeObject(layer) {
      layer.group.unactive = true;
      this.c.setActiveObject(layer.group)
      this.c.requestRenderAll()
    },
    discardObject(){
      this.c.setActiveObject(this.canvas.activeLayer.group)
      this.c.requestRenderAll()
    },
    focusTitleInput(title) {
      $(this.$refs.titleInput).css('display', 'block').val(title).select().prev().css('display', 'none')
    },
    blurTitleInput() {
      $(this.$refs.titleInput).css('display', 'none').prev().css('display', 'block')
    }
  },
  mounted() {
    new Sortable(this.$refs.layers, {
      draggable: '.layer',
      animation: 150,
      scrollSensitivity: 20,
      scrollSpeed: 30,
      onUpdate: e => {
        let newIndexRevert = this.layers.length - 1 - e.newIndex, oldIndexRevert = this.layers.length - 1 - e.oldIndex
				this.layers.splice(newIndexRevert, 0, this.layers.removeIndex(oldIndexRevert))
        this.layers[newIndexRevert].group.moveTo(newIndexRevert)
      }
    });

    this.ps = new PerfectScrollbar(this.$refs.layers)
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
        "layerUp",
        "layerDown",
        "layerAdd",
        "delete"
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
      
      display: flex
      flex-shrink: 0
      align-items: center
      color: var(--text-color)
      background: var(--main-color)
      +bb()
      &-eye
        width: 30px
        height: 30px
        display: flex
        align-items: center
        justify-content: center
        flex-shrink: 0
        +br()
      &-title
        height: 30px
        width: 100%
        display: flex
        align-items: center
        &__preview
          padding-left: 6px
        &__input
          padding-left: 6px
          display: none
          background: var(--bg-body)
          color: var(--text-color)
          height: 100%
          border: none
          outline: none
    .layer.active
      background: var(--bg-color)


.layers-tools
	display: flex
	.layers-tool
		padding: 5px



</style>
