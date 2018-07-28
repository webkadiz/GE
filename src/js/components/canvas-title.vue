<template>
	<div @click="$store.commit('canvasActive' , title)" class='canvas-title'>
		{{title}}
		<span @click.stop="$store.commit('canvasClose' , title)">&times;</span>
	</div>
</template>

<script>
export default {
	props : ['title'],
}
</script>

<style lang="sass">
@import '../../sass/_help'

.canvas-title
	height: 100%
	padding: 0px 8px 0px 8px
	transition: .3s
	color: var(--text-color)
	display: inline-block
	cursor: pointer
	span
		color: rgba(255 ,255 ,255, .6)
		margin-left: 5px
	&:hover
		background: MINTCREAM
		color: black
		span
			color: rgba(0 , 0 ,0, .6)
.canvas-title.active
	background: MINTCREAM
	color: black 
	span
		color: rgba(0 , 0 ,0, .6)
</style>

