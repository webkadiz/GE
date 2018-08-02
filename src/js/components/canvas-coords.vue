<template>	
	<div v-if="axis === 'x'" class="coords-x-wrapper" :style="{top: scrollTop + 'px',width: computeWidth + 'px'}">
		<div style="height: 20px ; width: 20px ;flex-shrink: 0"></div>
	</div>
	<div v-else-if="axis === 'y'" class="coords-y-wrapper" :style="{height: computeHeight + 'px'}">
		<div style="height: 20px ; width: 20px ; flex-shrink: 0"></div>
	</div>
</template>

<script>
export default {
	props: ['axis', 'scrollTop', 'width', 'height'],
	computed: {
		computeWidth() {
			if(($('.canvas-wrapper').width() - 20) < this.width)
			return this.width + 400
			else return $('.canvas-wrapper').width()
		},
		computeHeight() {
			if(($('.canvas-wrapper').height() - 20) < this.height)
			return this.height + 400
			else return $('.canvas-wrapper').height()
		},
		...Vuex.mapState(['canvas'])
	},
	mounted() {
	}
}
</script>

<style lang="sass">


</style>
