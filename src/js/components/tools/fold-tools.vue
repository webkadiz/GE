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
@import 'config-style'

.fold-wrapper
	padding: 5px
	background: var(--main-color)
	.fold
		cursor: pointer
		padding: 8px
		color: var(--text-color)
		background: var(--main-color)
		&:hover
			background: var(--bg-color)
	.fold.active
		background: var(--bg-color)
</style>
