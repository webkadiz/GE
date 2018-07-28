<template>
	<div v-if="input" class="input-wrapper"> 	
		<input 
			autocomplete="off"
			type="text" 
			@focus="focus" @blur="blur" 			
			:name="title"
			@input="$emit('input', $event.target.value)">
  	
		<label ref="label">{{title}}</label> 
	</div>

	<div v-else-if="select" class="input-wrapper">	
		<v-select  @input="renewal" :options="options"></v-select>	
		<label ref="label" for="">{{title}}</label>
	</div>

	<div v-else-if="color" class="input-wrapper">	
		<input 
			autocomplete="off"
			type="text" 
			@focus="focus" @blur="blur" 
			:name="title"
			@input="$emit('input', $event.target.value)"
			ref="colorAccept">	
		<label ref="label" for="">{{title}}</label>
		<div ref="colorpicker" class="colorpicker"></div>
	</div>
</template>

<script>
export default {
  props: ["title", "input", "select", "color",  "id", "options", "enter"],
  methods: {
		// применяется на обычном input при фокусе
		focus: event => $(event.target).addClass("active"),
		// применяется на обычном input при блюре
		blur: event => ($(event.target).val() === "" ? $(event.target).removeClass("active") : void 0),
		// применяется на select при обновлении данных
    renewal(event) {
			console.log('renewal in enter menu');
      if (event) this.$emit("input", event.value);
      else this.$emit("input", event);
      $('input[type="search"]', this.$el).blur();
		},
	},
  mounted() {
    if (this.select) {
			// фокус на select
      $('input[type="search"]', this.$el).focus(e => $(e.target.closest(".v-select")).attr("data-active", true));
			// блюр на select
      $('input[type="search"]', this.$el).blur(e =>
        this.$nextTick(() => (!this.enter ? $(e.target.closest(".v-select")).removeAttr("data-active") : void 0))
      );
		}
		if(this.color) {
			$(this.$refs.colorpicker).colpick({
				onShow: () => this.$refs.colorAccept.focus(),
				onChange: (rgb, hex, hsl, el) => {
					$(el).css('background', `#${hex}`)
					$(this.$refs.colorAccept).val(`#${hex}`);
					this.$emit('input', `#${hex}`)
				},
				onSubmit: (rgb, hex) => $(this.$refs.colorpicker).colpickHide()
			})
		}
		this.$nextTick(() => {
				console.log(this.$refs.label.clientWidth)
				console.log($(this.$refs.label).width());
		})
  }
};
</script>

<style lang="sass" scoped>
@import '../../sass/help'

.input-wrapper
	position: relative
	margin-bottom: 15px
	input
		@extend %input
		width: 100%
		display: block
		padding: 15px
		padding-bottom: 6px
	input.active + label, .v-select[data-active] + label
		transform: translateY(-25px)
		font-size: 0.9rem				
	// input + label, .v-select + label
	// 	padding-bottom: 4px
	// 	padding-left: 15px
	// 	transition: .3s
	// 	font-size: 1.2rem 
	// 	color: var(--label-color)			
	// 	display: block
	// 	position: absolute
	// 	left: 0
	// 	bottom: 0
	// 	pointer-events: none
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


<style lang="sass">
@import '../../sass/help'

.v-select 
	.dropdown-toggle
		border: none
		.clear
			height: 20px
			width: 10px
			bottom: 6px
			color: rgba(var(--label-color), .9)
	input[type=search],  input[type=search]:focus	
		padding: 15px
		padding-bottom: 6px	
		height: 100%
		line-height: 1
		font-size: 0.9rem
		color: var(--text-color)
		+bb()
	.open-indicator
		&::before
			border: none
			content: ''
			position: absolute
			width: 2px
			height: 10px
			background: var(--label-color)
			left: 50%
			top: 50%
			margin: -5px -1.5px
			transform: rotate(45deg)
			transform-origin: bottom 
			transition: .3s
		&::after
			@extend .open-indicator::before 
			transform: rotate(-45deg) 

.v-select.open
	.open-indicator	
		bottom: 6px
		&::before			
			transform: rotate(45deg)
			transform-origin: top
			margin: -3px -1.5px
		&::after
			@extend .open-indicator::before
			transform: rotate(-45deg)

.v-select.single .selected-tag
	position: absolute
	left: 0
	bottom: 0
	padding-left: 15px
	padding-bottom: 8px
	border: none
	color: var(--text-color)
	font-size: 0.9rem
	margin: 0
	height: auto
	line-height: 1
.v-select.single.open .selected-tag
	opacity: 1

.v-select 
	.dropdown-menu
		padding: 0
		border-radius: 0
		overflow-y: auto
		background: rgba(0,0,0,.8)
		border: none
		li
			line-height: 1
		li.highlight > a
			background: transparent
		li > a
			font-size: 0.9rem
			color: white
			padding: 10px
			text-align: center
			+bb()	


</style>