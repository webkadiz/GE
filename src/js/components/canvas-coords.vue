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
    computeTop() {
      if (this.$parent.$el) return this.$parent.$el.scrollTop + 'px';
      return 0 + 'px';
    },
    computeWidth() {
			let wrapperWidth = $('.canvas-wrapper-outer').width();
      if (wrapperWidth - 20 < this.canvas.width * this.canvas.zoom)
        return this.canvas.width * this.canvas.zoom + wrapperWidth + "px";
      else return wrapperWidth + "px";
    },
    computeHeight() {
			let wrapperHeight = $('.canvas-wrapper-outer').height() - 25;
      if (wrapperHeight - 20 < this.canvas.height * this.canvas.zoom)
        return this.canvas.height  * this.canvas.zoom + wrapperHeight + "px";
      else return wrapperHeight + "px";
    },
    ...Vuex.mapState(["canvas"])
  },
};
</script>

<style lang="sass">


</style>
