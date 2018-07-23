<template>
	<div class="header-options-badge">
		{{name[index]}}
		<i class="fas fa-angle-up"></i>
	</div>
</template>

<script>
export default {
	props: ['index'],
	data () {
		return {
			name: ['файл' , "окно", "вид", "помощь"]
		}
	},
}
</script>

<style lang="sass">
	
</style>