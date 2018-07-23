<template>
	<div class="input-wrapper">
		<label v-if="type === 'input'" :style="{cursor: computeCursor}" @mousedown="slider">
			<img v-if="alt" :src="'img/' + label" :alt="alt"/>
			{{ alt ? '' : label }}
			<input :style="{width : computeWidthInput}" 
             :value="computeEnter" @input="enterUpdate($event.target.value)">
		</label>

    <label @click="focusTextarea" v-if="type === 'textarea'" for="">
			<img v-if="alt" :src="'img/' + label" :alt="alt"/>
			{{ alt ? '' : label }}
      <span :style="{width : computeWidthSpan}" class="span-textarea">{{computeSpan}}</span>  
			<textarea :style="{width : computeWidthTextarea, 
                height: computeHeightTextarea}" @blur="blurTextarea" 
                :value="computeEnter" @input="enterUpdate($event.target.value)">
      </textarea>
		</label>

    <label v-else-if="type === 'select'" for="">
			<img v-if="alt" :src="'img/' + label" :alt="alt"/>
			{{ alt ? '' : label }}
			<v-select :value="computeEnter" @input="enterSelectUpdate($event)" :options="options">
      </v-select>
		</label>

    <EnterPropColor v-else-if="type === 'color'" 
                    @input="enter = $event" :label="label" :tool="tool" :setting="setting">
    </EnterPropColor>


    <label v-else-if="type === 'checkbox'" @click="enterUpdate(!$refs.checkbox.checked)" for="">
      <img v-if="alt" :src="'img/' + label" :alt="alt"/>
			{{ alt ? '' : label }}
      <input ref="checkbox" :checked="computeEnter" type="checkbox" class="check-input" >

      <label class="check-label">
        <svg width="15px" height="15px" viewBox="0 0 18 18">
          <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
          <polyline points="1 9 7 14 15 4"></polyline>
        </svg>
      </label>
    </label>
	</div>
  
</template>

<script>
import { mapState } from "vuex";

export default {
  components: {
    EnterPropColor: () => import("./enter-prop-color.vue")
  },
  props: ["number", "type", "tool", "label", "setting", "alt", "options"],
  computed: {
    computeCursor() {
      return this.number ? "ew-resize" : "pointer";
    },
    computeHeightTextarea() {
      // while (~(pos = this.computeEnter.indexOf('\n', pos + 1))) 
      //   amount++;
      return this.computeEnter.split('\n').length * this.height + 'px';
    },
    computeWidthTextarea () {
      return this.computeEnter.split('\n').reduce((prev, str) => 
        prev < str.length ? str.length : prev, 0) * 6 + this.width + 'px'
    },
    computeWidthInput() {
      return this.computeEnter.toString().length * 6 + this.width + "px";
    },
    computeWidthSpan() {
      return this.computeSpan.toString().length * 6 + this.width + "px";
    },
    computeEnter() {
      if (this.canvas && this.canvas.activeLayer && this.canvas.activeLayer.type === this.tool) {
        if (this.type === "select") {
          return this.options.find(option => option.value === this.canvas.activeLayer.object[this.setting]);
        }
        return this.canvas.activeLayer.object[this.setting];
      }

      if (this.type === "select") return this.options.find(option => option.value === this.storeTool[this.setting]);
      return this.storeTool[this.setting];
    },
    computeSpan() {
      let lines = this.computeEnter.split('\n');
      if(lines.length === 1) return this.computeEnter
      else return lines[0].slice(0, lines[0].length - 3) + '...';           
    },
    storeTool() {
      return this.$store.state[this.tool];
    },
    ...mapState(['canvas'])
  },
  methods: {
    enterUpdate(newValue) {
      newValue = this.number ? float(newValue) : newValue;

      if (this.canvas && this.canvas.activeLayer && this.canvas.activeLayer.type === this.tool) {
        this.$store.commit({
          type: "activeLayerUpdate",
          setting: this.setting,
          newValue
        });
        return;
      }

      this.$store.commit({
        type: "canvasToolUpdate",
        tool: this.tool,
        setting: this.setting,
        newValue
      });
    },
    enterSelectUpdate(event) {
      let span;

      this.$nextTick(() => {
        $('input[type="search"]', this.$el).css("width", 100);
        if ((span = $('input[type="search"]', this.$el).prev("span")).length && event)
          span.text((index, value) => (event.label.length > 8 ? event.label.slice(0, 8) + "..." : event.label));
      });

      event ? this.enterUpdate(event.value) : void 0;
    },
    slider(event) {
      if (event.target.tagName !== "INPUT" && this.number) {
        let move;
        //prettier-ignore
        window.addEventListener("mousemove", move = event => {
          if (event.movementX > 0) this.enterUpdate(round(float(this.computeEnter) + 1, 3))
          else if (event.movementX < 0) this.enterUpdate(round(float(this.computeEnter) - 1, 3))
        });

        window.addEventListener("mouseup", function up() {
          window.removeEventListener("mousemove", move);
          window.removeEventListener("mouseup", up);
        });
      }
    },
    focusTextarea(e) {
      $('textarea', e.target.closest('label')).css('display','block').focus().prev().css('display', 'none');
    },
    blurTextarea(e) {
      $('textarea', e.target.closest('label')).css('display','none').focus().prev().css('display', 'block');
    }
  },
  data () {
    return {
      width: 15,
      height: 15
    }
  }
};
</script>

<style lang="sass" scoped>
@import '../../sass/help'

.input-wrapper
  position: relative
  padding: 5px
  display: flex
  input	
    @extend %input
    margin-left: 8px
    text-align: center
  textarea
    @extend %input
    padding: 0
    margin-left: 8px
    text-align: left
    resize: none
    overflow: hidden
    display: none
    font-family: sans-serif
  
  .span-textarea
    @extend %input
    padding: 0
    margin-left: 8px
    width: 15px
    height: 15px
    display: block
    
  label
    font-size: 0.9rem
    display: flex
    align-items: center
    white-space: nowrap
    color: $label-color

  .check-input
    display: none

.check-label
  cursor: pointer
  position: relative
  width: 15px
  height: 15px
  margin-left: 4px
  -webkit-tap-highlight-color: transparent
  transform: translate3d(0,0,0)
  &:before
    content: ""
    position: absolute
    top: 50%
    left: 50%
    width: 40px
    height: 40px
    border-radius: 50%
    background: rgba(white,.03)
    transform: translate(-50%, -50%)
    opacity: 0
    transition: opacity .2s ease
  svg
    position: relative
    z-index: 1
    fill: none
    stroke-linecap: round
    stroke-linejoin: round
    stroke: $text-color
    stroke-width: 1.5
    transform: translate3d(0,0,0)
    transition: all .2s ease
    path
      stroke-dasharray: 60
      stroke-dashoffset: 0
    polyline 
      stroke-dasharray: 22
      stroke-dashoffset: 66
  &:hover 
    &:before
      opacity: 1
    svg
      stroke: $label-color

.check-input:checked + .check-label
  svg
    stroke: $text-color
    path
      stroke-dashoffset: 60
      transition: all .3s linear
    polyline
      stroke-dashoffset: 42
      transition: all .2s linear
      transition-delay: .15s

</style>

<style lang="sass">
@import '../../sass/_help'

main
  .v-select
    input[type="search"],input[type="search"]:focus
      padding: 3px 0 1.7px 5px
      margin-left: 8px
      color: $text-color
  .v-select.single
    .selected-tag
      padding: 0 0 3.7px 5px
      left: 8px
  .v-select .open-indicator
    right: 5px
  .v-select .dropdown-toggle .clear
    right: 25px
  .v-select .dropdown-toggle .clear, .v-select .open-indicator,.v-select.open .open-indicator
    bottom: 1px




</style>

