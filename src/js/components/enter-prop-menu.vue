<template>
	<div v-if="type === 'input'" class="modal-input"> 	
		<input 
			autocomplete="off" type="text" 
			@focus="focus" @blur="blur" 			
			@change="$emit('change', $event.target.value)">
  	
		<label >{{title}}</label> 
	</div>


	<Select v-else-if="type === 'select'" class="modal-input"
					@input="$emit('change', $event)" :label="title"  
					:list="list" @focus="focus" @blur="blur">
	</Select>	


	<div v-else-if="type === 'color'" class="modal-input">	
		<input 
			autocomplete="off" type="text" 
			@focus="focus" @blur="blur" 
			@change="$emit('change', $event.target.value)"
			ref="colorPreview">	
		<label  for="">{{title}}</label>
		<input ref="colorPicker">
	</div>
</template>

<script>
export default {
	components: {Select: () => import('./select')},
  props: ["title", 'type', "list"],
  methods: {
		focus: e => {
			e.target.classList.add("active")
		},
		blur: e => {
			e.target.value === "" && e.target.classList.remove("active")
		}
	},
  mounted() {
		if(this.type === 'color') {
			$(this.$refs.colorPicker).spectrum({
				showInput: true,
				showButtons: false,
				addInput: this.$refs.colorPreview,
				allowEmpty: true,
				showAlpha: true,
				preferredFormat: 'name',
				replacerClassName: "navbar-dropdown__colorpicker-replacer",
				show: () => this.$refs.colorPreview.focus(),
				hide: () => $(this.$refs.colorPreview).val() === "" && $(this.$refs.colorPreview).removeClass("active"),
				move: color => this.$emit('change', color && color.toRgbString()),
				change: color => this.$emit('change', color && color.toRgbString()),				
			})	
		}
  }
};
</script>

<style lang="sass">
@import 'config-style'

.modal-input
	position: relative
	margin-bottom: 15px
	input
		@extend %input
		width: 100%
		display: block
		padding: 15px
		padding-bottom: 6px
	input.active + label
		transform: translateY(-25px)
		font-size: 0.9rem				
	label
		padding-bottom: 4px
		padding-left: 15px
		transition: .3s
		font-size: 1.2rem 
		color: var(--label-color)			
		display: block
		position: absolute
		left: 0
		bottom: 0
		pointer-events: none
		white-space: nowrap
	.colorpicker
		position: absolute
		right: 10px
		bottom: 8px
		width: 20px
		height: 12px
		background: black
		box-shadow: 0 0 0 2px var(--bg-body), 0 0 0 3px var(--border-color)
		cursor: pointer

</style>

