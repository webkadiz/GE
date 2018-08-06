<template>
	<div class="wrapper">
		<input ref="colorpicker" type="text">
	</div>
	
</template>

<script>
export default {
	computed: Vuex.mapState(['canvas']),
	mounted(){
		$(this.$refs.colorpicker).spectrum({
			preferredFormat : "name",
			flat: true,
			showInput: true,
			//allowEmpty: true,
			showInitial : true ,
			showAlpha: true,
			selectText : "Alright" , 
			cancelText: "Отменить",
			showPalette: true,
			showSelectionPalette: true,
			palette : [['black', 'white', 'blue'], ['red', 'green']],
			change: color => {
				console.log(color.toRgbString());
				this.$store.commit({
					type:'propUpdate', 
					setting:'fill', 
					tool:'global', newValue: color.toRgbString()})
			}
		})
	}
}
</script>

<style lang="sass" scoped>

.wrapper
	border-top: 1px solid var(--border-color)
	
.in-grid .wrapper
	border-bottom: 1px solid var(--border-color)



</style>
