<template>
	<div :class="['grid-arrow-wrapper', computeClass]">
		<div @click="$emit('switcherArrowInGrid')" class="grid-arrow" ></div>
	</div>
</template>

<script>
export default {
	props: ['component'],
	computed: {
		computeClass() {
			let index = this.$store.state.grid.findIndex(col => col.find(row => row.component === this.component));
			let canvasIndex = this.$store.state.grid.findIndex(col => col.find(row => row.component === "CanvasWrapper"));
			if(index > canvasIndex) 
			return {
				left: false,
				right: true
			}; else return {
				left: true,
				right: false
			}
		}
	}
}
</script>

<style lang="sass" >
@import '../../sass/_help'

.grid-arrow-wrapper
	height: 10px
	background: var(--bg-color)
	+bb()
	position: relative
	.grid-arrow
		transition: .6s
		position: absolute 
		width: 24px
		height: 100%
		padding: 0
		top: 0
		background: var(--bg-color)
		cursor: pointer
		outline: none
		border: none
		&::before
			transition: .3s
			content: ''
			display: block
			position: absolute
			left: 50%
			top: 50%
			margin: -4px -4px
			cursor: pointer
			border:
		&::after
			@extend .grid-arrow::before
	&.left
		.grid-arrow
			left: 0
			+br()
			&::before
				border:
					right: 4px solid var(--text-color)
					top: 4px solid transparent
					bottom: 4px solid transparent
					left: 4px solid transparent
			&::after
				@extend .grid-arrow::before
				left: calc(50% - 5px)
	&.right
		.grid-arrow
			right: 0
			+bl()
			&::before
				border:
					left: 4px solid var(--text-color)
					top: 4px solid transparent
					bottom: 4px solid transparent
					right: 4px solid transparent
			&::after
				@extend .grid-arrow::before
				left: calc(50% + 5px)


.grid-arrow-wrapper.fold
	&.left
		.grid-arrow
			&::before
				transform: rotate(180deg) 
			&::after
				@extend .grid-arrow::before
				left: calc(50% + 5px)
	&.right
		.grid-arrow
			&::before
				transform: rotate(180deg)
			&::after
				@extend .grid-arrow::before
				left: calc(50% - 5px)

</style>
