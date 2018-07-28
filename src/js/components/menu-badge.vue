<template>
	<div class="menu-badge">
		<span v-for="char in title.length" :key="char">
			{{ title[char - 1].toUpperCase()}}
		</span>
		<!-- <i class="fas fa-angle-up"></i> -->
	</div>
</template>

<script>
import animationText from '../menu-animation-text/menu-animation-text.js';

export default {
	props: ['title', 'color'],
	mounted() {
		this.amin = new animationText(this.$el, this.color)

		bus.$on('updateAnimationText', () => {
			$('span', this.$el).css('color', getComputedStyle(this.$el).color)
			this.amin.colors.initial = getComputedStyle(this.$el).color
		})//вызывавший в paint.js
	}
}
</script>

<style lang="sass">
@import '../../sass/_help'

.menu-badge
	position: relative
	display: flex
	justify-content: center
	font-family: 'Exo 2', sans-serif
	cursor: pointer
	padding: 6px 4px
	background: var(--main-color)
	color: var(--text-color)
	+index($level4)
</style>