<template>
	<label @click="active">
    {{label}}
    <div  class="main-color color" ref="color"></div>
    <div v-show="isActive" class="dropdown-color">
			<div class="dropdown-color-panel">
				<div ref="tabs" :style="{ background : computeBackground(tab.connector)}" 
				v-for="(tab, index) in tabs"
				:key="index"
				:class="['color', {active : current[1] === tab.connector}]" 
				@click="current = [tab.tab, tab.connector]"></div>
			</div>
			<div class="dropdown-color-tab">
				<keep-alive>
					<component :is="current[0]"></component>
				</keep-alive>				
			</div>
		</div>
	</label>
</template>

<script>
export default {
	components: {
		fill: () => import('./color/fill.vue'),
		gradient: () => import('./color/gradient.vue'),
		patern: () => import('./color/patern.vue')
	},
	props: ['label', 'tool', 'setting','enter'],
	data () {
		return {
			isActive: false,
			current:['fill', null],// первый элемент отвечает за вкладки, второй за классы
			tabs: [
				{tab:'fill', connector: 'non-fill'},
				{tab: 'fill', connector: 'fill'}, 
				{tab: 'gradient', connector: 'gradient'}, 
				{tab: 'patern', connector: 'patern'}, 
				{tab:'fill', connector: 'color-picker'}]
		}
	},
	mounted () {


		let nonFill = this.$refs.tabs[0];
		let colorPicker = this.$refs.tabs.last;

		$(nonFill).click(() => {		
			$(this.$refs.color).css('background', $(nonFill).css('background'));
			this.$emit('input',  "transparent")
		})

		$(colorPicker).colpick({
			onSubmit : (hsl,hex, rgb, el) => {
				$(this.$refs.color).css('background', `#${hex}`)
				this.$emit('input',  `#${hex}`)
			}
		})
	},
	methods: {
		active(e) {
			if(e.target === this.$el || e.target === this.$refs.color)
				this.isActive = !this.isActive
		},
		computeBackground(connector){
			if(connector === 'non-fill') return "url(../../../img/non-fill.png) repeat scroll 0% 0% / cover"
			else if(connector === 'fill') return 'black'
			else if(connector === 'gradient') return 'linear-gradient(90deg, black, white)'
			else if (connector === 'patern') return 'blue';
			else if (connector === 'color-picker') return 'green';
		}
	}
}
</script>

<style lang="sass">
@import '../../sass/_help'

.color
	width: 30px
	height: 15px
	background: black
	margin: 8px
	box-shadow: 0 0 0 2px #535353, 0 0 0 3px rgba(245, 255, 250, 0.5)
	background-size: cover

.color.active
	box-shadow: 0 0 0 2px #535353, 0 0 0 3px rgba(245, 255, 250, 0.5), 0 0 0 7px #424242

.main-color
	margin: 3px
	margin-left: 8px


.dropdown-color
	position: absolute
	top: 100%
	left: 0
	height: 200px
	background: $main-color
	margin-left: 8px
	+b()


.dropdown-color-panel
	display: flex
	padding: 20px
	+bb()
	
</style>
