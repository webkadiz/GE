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
			//preferredFormat : "name",
			flat: true,
			showInput: true,
			//allowEmpty: true,
			showInitial : true ,
			showAlpha: true,
			chooseText : "Применить" , 
			cancelText: "Отменить",
			showPalette: true,
			clickoutFiresChange: false,
			allowEmpty : true,
			hideAfterPaletteSelect: true,
			togglePaletteOnly: true,
			togglePaletteMoreText: "развернуть",
			togglePaletteLessText: "свернуть",
			localStorageKey: 'color-fill-stroke',
			palette : [['black', 'white', 'blue', 'red', 'green', 'yellow', 'transparent', ]],
			change: color => {
				console.log('change', color);
				color ?	this.$store.commit({
					type:'propUpdate', 
					setting:'fill', 
					tool:'global', newValue: color.toRgbString()}) : void 0;
			$(this.$refs.colorpicker).spectrum('set', color.toRgbString())
			console.log($(this.$refs.colorpicker).spectrum('get'))
			}
		})
		console.log($('.sp-palette-row-selection'));
		//$('.sp-palette-row-selection').prependTo($('.sp-palette'))
	}
}
</script>

<style lang="sass" scoped>

.wrapper
	border-top: 1px solid var(--border-color)
	
.in-grid .wrapper
	border-bottom: 1px solid var(--border-color)



</style>
