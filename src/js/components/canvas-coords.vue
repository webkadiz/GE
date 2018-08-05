<template>	
	<div v-if="axis === 'x'" class="coords-x-wrapper" :style="{top: computeTop, width: computeWidth}">
		<div style="height: 20px ; width: 20px ;flex-shrink: 0"></div>
	</div>
	<div v-else-if="axis === 'y'" class="coords-y-wrapper" :style="{height: computeHeight}">
		<div style="height: 20px ; width: 20px ; flex-shrink: 0"></div>
	</div>
</template>

<script>
export default {
  props: ["axis", "scrollTop", "width", "height"],
  computed: {
    computeTop() {
      //if (this.$parent.$el) console.log(this.$parent.$el);
      //return 0 + 'px'
    },
    computeWidth() {
      if (this.canvas.wrapperWidth < this.canvas.width * this.canvas.zoom)
        return this.canvas.width * this.canvas.zoom + 400 + "px";
      else return this.canvas.wrapperWidth + 20 + "px";
    },
    computeHeight() {
			console.log(this.canvas.wrapperHeight);
      if (this.canvas.wrapperHeight < this.canvas.height * this.canvas.zoom)
        return this.canvas.height * this.canvas.zoom + 400 + "px";
      else return this.canvas.wrapperHeight + 20 + "px";
    },
    ...Vuex.mapState(["canvas"])
  },
  update() {
		console.log('update');
  }
};
</script>

<style lang="sass">


</style>
