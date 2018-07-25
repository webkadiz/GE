<template>
 	<div class="drag drag-wrapper">
		<div class="drag-close"></div>	 
		<div @click="$emit('switchArrow')" class="drag-arrow"></div>
	</div>		
</template>

<script>
export default {}
</script>

<style lang="sass" scoped>
@import '../../../sass/_help'

.drag-wrapper
	background: $bg-color
	height: 14px
	width: 100%
	+bb()

	.drag-close
		transition: .6s
		position: absolute 
		right: -8px
		top: -10px
		width: 20px
		height: 20px
		padding: 0
		border-radius: 50%
		background: $bg-color
		cursor: pointer
		outline: none
		border: none
		+b()
		&:hover
			transform: scale(1.15) rotate(360deg)
		&::before
			content: ''
			display: block
			width: 8px
			height: 2px
			position: absolute
			left: 50%
			top: 50%
			margin: -1px -4px
			transform: rotate(45deg)
			background: white
			cursor: pointer
		&::after
			@extend .drag-close::before
			transform: rotate(-45deg)

	.drag-arrow
		transition: .6s
		position: absolute 
		left: -8px
		top: -10px
		width: 20px
		height: 20px
		padding: 0
		border-radius: 50%
		background: $bg-color
		cursor: pointer
		outline: none
		border: none
		+b()
		&:hover
			transform: scale(1.15) rotate(360deg)
		&::before
			transition: .3s
			content: ''
			display: block
			position: absolute
			left: 50%
			top: 50%
			margin: -4px -5px
			cursor: pointer
			border:
				right: 4px solid white
				top: 4px solid transparent
				bottom: 4px solid transparent
		&::after
			@extend .drag-arrow::before
			left: calc(50% + 5px)

.drag-wrapper.fold
	.drag-arrow
		&::before
			transform: rotate(180deg)
			margin: -4px -4px
		&::after
			@extend .drag-arrow::before
			left: calc(50% + 5px)
</style>
