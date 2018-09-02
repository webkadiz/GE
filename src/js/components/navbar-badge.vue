<template>
	<div class="navbar-badge">
		<span v-for="char in title.length" :key="char">
			{{ title[char - 1].toUpperCase()}}
		</span>
	</div>
</template>

<script>
import AnimationText from '../lib/menu-animation-text/menu-animation-text';

export default {
	props: ['title', 'color'],
	mounted() {
		this.amin = new AnimationText(this.$el, this.color)

		bus.$on('updateAnimationText', () => {
			$('span', this.$el).css('color', getComputedStyle(this.$el).color)
			this.amin.colors.initial = getComputedStyle(this.$el).color
		}) // из app.js
	}
}
</script>

<style lang="sass">
@import 'config-style'

.navbar-badge
	position: relative
	display: flex
	justify-content: center
	font-family: 'Exo 2', sans-serif
	cursor: pointer
	padding: 10px 4px
	background: var(--main-color)
	color: var(--text-color)
	+index($level4)
</style>