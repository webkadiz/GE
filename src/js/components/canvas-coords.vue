<template>	
	<div v-if="axis === 'x'" class="coords-x-wrapper" :style="{top: top + 'px', width: computeWidth}">
		<div style="height: 20px ; width: 20px ;flex-shrink: 0"></div>
	</div>
	<div v-else-if="axis === 'y'" class="coords-y-wrapper" :style="{left: left + 'px',height: computeHeight}">
		<div style="height: 20px ; width: 20px ; flex-shrink: 0"></div>
	</div>
</template>

<script>
// ширина canvas-title есть в canvas-wrapper 

export default {
  props: ["top", 'left', "axis"],
  computed: {
    computeWidth() {

      if (this.getCanvasWidth < this.canvas.width * this.canvas.zoom)
        return this.canvas.width * this.canvas.zoom + 400 + COORDS_SIZE + "px";
      else return this.getCanvasWidth + COORDS_SIZE + "px";
    },
    computeHeight() {
      if (this.getCanvasHeight  < this.canvas.height * this.canvas.zoom)
        return this.canvas.height  * this.canvas.zoom + 400 + COORDS_SIZE + "px";
      else return this.getCanvasHeight + COORDS_SIZE + "px";
    },
    ...Vuex.mapState(["canvas"]),
    ...Vuex.mapGetters(["getCanvasWidth", "getCanvasHeight"])
  },
};
</script>

<style lang="sass">


</style>
