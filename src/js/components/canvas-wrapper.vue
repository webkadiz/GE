<template>
	<div  class="canvas-wrapper-outer">
		<div v-if="canvases.length" class="canvas-wrapper-title">
			<CanvasTitle
			:class="{active : canvas.title === canvasAlias.title}" 
			:title="canvasAlias.title" 
			:key="canvasAlias.id" 
			v-for="canvasAlias in canvases"></CanvasTitle>
		</div>
			
		<Canvas v-show="canvas.title === canvasAlias.title" :key="canvasAlias.id" v-for="canvasAlias in canvases"></Canvas>		
	</div>
</template>

<script>
export default {
  components: {
    Canvas: () => import("./canvas.vue"),
    CanvasTitle: () => import("./canvas-title.vue"),
    Casing: () => import("./casing.vue")
  },
	computed: Vuex.mapState(["canvases", "canvas"]),
};
</script>

<style lang="sass">
@import '../../sass/_help'

.canvas-wrapper-outer
	width: 100%
	height: 100%
	display: flex
	flex-direction: column
	position: relative
	.canvas-wrapper-title
		font-size: 1.2rem
		line-height: 25px
		background: var(--bg-color)
		+bb()
</style>
