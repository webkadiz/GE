<template>
	<div class="toolbar-item">
		<div class="toolbar-item__icon">
  		<Icon :icon="tool"></Icon>																				
		</div>					
		<EnterPropTool :onlyGlobal="true" 
									 :setting="key" 
									 :tool="tool" 									 
									 :icon="key"
									 v-bind="field"
									 v-for="(field, key) in fields" :key="key">
		</EnterPropTool>									
	</div>
</template>

<script>
export default {
	components: {
		Icon: () => import('./icon'),
		EnterPropTool: () => import('./enter-prop-tool')
	},
	computed: Vuex.mapState(['activeTool']),
	props : ['fields', 'tool'],
	mounted() {
		console.log(this.fields, this.id);
	},
	date() {
		return {

		}
	}
}
</script>

<style lang="sass">
@import 'config-style'

.toolbar-item
	display: flex
	align-items: center
	&__icon
		margin: 0 15px
		display: flex
		align-items: center
		justify-content: center
	label
		margin-left: 10px
		display: flex
		align-items: center	
		color: var(--label-color)		
	input[type="color"]
		background: transparent	
		width: 40px
		height: 25px
		padding: 0  	

.toolbar-item > label
	display: flex
	align-items: center	


</style>
