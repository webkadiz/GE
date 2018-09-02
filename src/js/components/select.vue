<template>
	<div :class="['select', {open}]">
		<input @keyup.enter.stop="selectKeyboard()" 
					 ref="input" type="text" 
					 @focus="focus" @blur="blur" @input="input" :value="computeValue">
		<label v-if="label" for="">{{label}}</label>
		<div class="select-arrow"></div>
		<transition name="fade-select">
			<ul v-show="open" class="select-list">
				<li @click="selectClick(item)" 
						v-for="(item, index) in getList" :key="index">
					{{ item.label }}
				</li>
				<li v-if="!getList.length">не найдено</li>
			</ul>
		</transition>
	</div>
</template>

<script>

export default {
  props: ["list", 'label', 'value'],
  computed: {
		computeValue(){
			if(this.value && !this.open) {
				this.selected = _.find(this.getList, {value: this.value})
				this.preview = this.selected.label
			}
			return this.preview
		},
		getList() {
			return _(this.list)
				.map(item => (item.label ? {label: item.label, value: item.value} : {label: item, value: item}))
				.filter(search => ~search.label.indexOf(this.search))
				.sortBy(['label'])
				.value();    
		},
  },
  methods: {
		selectKeyboard() {
			if(this.getList.length) {
				this.selected = _.first(this.getList)
				this.preview = this.selected.label
				this.$emit("input", this.selected.value);
			} 			
			this.search = '' 
			this.$refs.input.blur()
		},
    selectClick(selectedItem) {
			this.selected = selectedItem
			this.preview = this.selected.label
			this.search = '';
      this.$emit("input", this.selected.value);
    },
    focus(e) {
      this.open = true;
			$(this.$refs.input).select();
			this.$emit('focus', e)
    },
    blur(e) {
			this.open = false;
			setTimeout(() => {
				this.selected.value !== '' && (this.preview = this.selected.label)
				this.$emit('blur',e)
			}, 200)
    },
    input(e) {
			this.preview = this.search = e.target.value;
    }
  },
  data() {
    return {
      open: false,
      search: "",
			preview: "",
			selected: ""
    };
  }
};
</script>

<style lang="sass">
@import 'config-style'

.select
	position: relative
	input
		@extend %input
		text-align: left
	&-list
		position: absolute
		left: 0
		top: 100%
		width: 100%
		background: var(--bg-color)
		box-shadow: rgb(51, 51, 51) 0px 10px 20px
		+index($level5)
		li
			width: 100%
			text-align: center
			padding: 10px 0
			cursor: pointer
			+bb()
		li:last-child
			border-bottom: none
	&-arrow
		position: absolute
		pointer-events: none
		&::before
			border: none
			content: ''
			position: absolute
			width: 2px
			height: 10px
			background: var(--label-color)
			left: 50%
			top: 50%
			transform: translate(-50%, -50%) rotate(45deg)
			transform-origin: bottom 
			transition: .3s
		&::after
			@extend ::before 
			transform: translate(-50%, -50%)  rotate(-45deg)

.select.open
	.select-arrow
		&::before			
			transform: translate(-50%, -30%) rotate(45deg)
			transform-origin: top
		&::after
			@extend ::before
			transform: translate(-50%, -30%) rotate(-45deg)


.select.modal-input
	.select-arrow
		right: 10px
		top: 50%
		width: 20px
		height: 8px

.select.tool-input
	input
		padding-left: 2px
		width: 100px
	.select-arrow
		top: 45%
		right: 2px
		width: 20px


.fade-select-enter-active, .fade-select-leave-active
	transition: .5s
.fade-select-enter, .fade-select-leave-to
	opacity: 0
</style>
