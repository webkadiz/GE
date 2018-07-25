<template>
	<div class="fold-wrapper">
		<div @click="$emit('switcher')" :class="[{active},'fold']">{{title}}</div>		
	</div>
</template>

<script>
export default {
	props: ['title', 'active']
}
</script>

<style lang="sass" scoped>
@import '../../../sass/_help'

.fold-wrapper
	padding: 5px
	background: $main-color
	.fold
		padding: 10px
		color: $text-color
		background: $main-color
		&:hover
			background: $bg-color
	.fold.active
		background: $bg-color
</style>
