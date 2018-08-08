<template>
	<div>
		<div class="tabs">
			
			<div 	@click="currentTab = tab" :class="['tab', {active: currentTab === tab}]" 
						v-for="(tab, index) in tabs" :key="index">
			</div>
			
		</div>
		<keep-alive>
			<component :is="currentTab"></component>
		</keep-alive>		
	</div>
	
</template>

<script>

export default {
	components: {
		fill: () => import('../color/fill.vue'),
		gradient: () => import('../color/gradient.vue'),
		patern: () => import('../color/patern.vue')
	},
	data() {
		return {
			currentTab: 'fill',
			tabs: ['fill', 'gradient', 'patern']
		}
	},
	mounted() {
		
	}
}
</script>

<style lang="sass" scoped>
@import '../../../sass/_help'

.tabs
	display: flex
	justify-content: center
	padding: 5px 0
	.tab
		width: 30px
		height: 15px
		background: black
		margin: 8px
		box-shadow: 0 0 0 2px var(--main-color), 0 0 0 3px var(--border-color)
		background-size: cover
	.tab.active
		box-shadow: 0 0 0 2px var(--main-color), 0 0 0 3px var(--border-color), 0 0 0 7px var(--bg-color)


</style>


