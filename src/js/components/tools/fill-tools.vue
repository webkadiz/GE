<template>
	<div>
		<div class="tabs-wrapper">
			<div class="tabs">
				<div 	@click="currentTab = tab" :class="['tab', {active: currentTab === tab}]" 
							v-for="(tab, index) in tabs" :key="index">
				</div>
			</div>
			<label class="box" @click="switcher = !switcher">
				<input ref="switch" class="Switcher__checkbox sr-only" :checked="switcher" type="checkbox" />
				<label class="Switcher">
					<div class="Switcher__trigger" data-value="Заливка"></div>
					<div class="Switcher__trigger" data-value="Обводка"></div>
				</label>
			</label>
			
		</div>
		<keep-alive>
			<component :tool="switcher ? 'stroke' : 'fill'" :is="currentTab"></component>
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
			switcher: false, // false - fill / true - stroke
			currentTab: 'fill',
			tabs: ['fill', 'gradient', 'patern']
		}
	},
	mounted() {
		
	}
}
</script>

<style lang="sass" scoped>
@import 'config-style'

.tabs-wrapper
	display: flex
	justify-content: space-evenly
	padding: 8px 0
	.tabs
		display: flex
		justify-content: center
		align-items: center
		margin: 0 10px
		.tab
			width: 30px
			height: 15px
			background: black
			margin: 8px
			box-shadow: 0 0 0 2px var(--main-color), 0 0 0 3px var(--border-color)
			background-size: cover
		.tab.active
			box-shadow: 0 0 0 2px var(--main-color), 0 0 0 3px var(--border-color), 0 0 0 7px var(--bg-color)
	.box
		margin: 0 10px

</style>


