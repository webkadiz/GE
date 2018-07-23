<template>
	<div class="panel-header-tool-wrapper">						
  	<img :src="'img/' + img" alt="" />																		
  	<label class="h-100 pointer">размер <input class="input" maxlength="3" type="text" name="width"></label>													
  	<label class="h-100 pointer">цвет <input class="input" type="color" id="color" name="color"></label>										
	</div>
</template>

<script>
export default {
	props : { img : String}
}
</script>

<style lang="sass">
@import '../../sass/_help'

.panel-header-tool-wrapper
	display: flex
	align-items: center
	label
		margin-left: 10px
		display: flex
		align-items: center	
		color: $label-color
	img
		margin-left: 8px			
	input[type="color"]
		background: transparent	
		width: 40px
		height: 25px
		padding: 0  	

.panel-header-tool-wrapper > label
	display: flex
	align-items: center	


</style>
