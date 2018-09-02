<template>
	<div class="wrapper">
		<input :value="computeValue" ref="colorpicker" type="text">
	</div>
</template>

<script>
import Icon from '../icon';

export default {
  props: ['setting'],
  computed: {
		computeValue() {
      setTimeout(() =>	{
			  $(this.$refs.colorpicker).spectrum('set', this.$refs.colorpicker.value )
      }, 0)
			return this.getCanvasProp(this.setting, 'global')
		},
    ...Vuex.mapState(["canvas"]),
    ...Vuex.mapGetters(["getCanvasProp"])
	},
  mounted() {
    $(this.$refs.colorpicker).spectrum({
      preferredFormat: "name",
      flat: true,
      showInput: true,
      showInitial: true,
      showAlpha: true,
      chooseText: "Применить",
      cancelText: "Отменить",
      showPalette: true,
      clickoutFiresChange: false,
      hideAfterPaletteSelect: true,
      togglePaletteOnly: true,
      togglePaletteMoreText: "развернуть",
      togglePaletteLessText: "свернуть",
      localStorageKey: "color-fill-stroke",
      maxSelectionSize: 10,
      palette: this.$store.state.palette,
      containerClassName: 'fill-tools__colorpicker',
      change: color => {
        this.$store.commit({
          type: "propUpdate",
          setting: this.setting,
          tool: "global",
          newValue: color.toRgbString()
        })      
      }
    });

    let Palette = Vue.extend({
      components: {Icon},
      template: `<div class="color-picker-icon-wrapper">
                  <div @click="newColor" class="color-picker-icon"><Icon icon="file"></Icon></div>
                  <div @click="deleteColor" class="color-picker-icon"><Icon icon="delete"></Icon></div>
                 </div>`,
      methods: {
        newColor: () => {
          let colors = Array.from(this.$el.querySelectorAll('.sp-palette-row-selection > span'), function(el) { 
            if(el.dataset.color === $(this.$refs.colorpicker).spectrum("get").toRgbString()) return el.dataset.color
          }, this)

          if(colors.length) {
            let color = colors.find(color => color !== undefined);
            color = color || this.$el.querySelector('.sp-palette-row-selection span').dataset.color;
           
            this.$store.state.palette.last.length < 10 
              ? this.$store.state.palette.last.push(color)
              : this.$store.state.palette.push([color])

            $(this.$refs.colorpicker).spectrum("option", "palette", this.$store.state.palette);
            setLocalStorageField('palette',  this.$store.state.palette)
          }
        },
        deleteColor: () => {
          let currentColors = [
            $(this.$refs.colorpicker).spectrum("get").toName(),
            $(this.$refs.colorpicker).spectrum("get").toRgbString()
          ]
          this.$store.state.palette.forEach(colors => {
            colors.forEach(color => {
              currentColors.forEach(currentColor => {
                if(currentColor === color.toLowerCase()) {
                  colors.remove(color)
                  $(this.$refs.colorpicker).spectrum("option", "palette", this.$store.state.palette);
                  setLocalStorageField('palette',  this.$store.state.palette)
                }
              })
            })
          });
        }
      }
    })
    
    $(".sp-palette-button-container", this.$el).append(new Palette().$mount().$el)

    this.psPalette = new PerfectScrollbar(this.$el.querySelector(".sp-palette"))
    
    this.psContainer = new PerfectScrollbar(this.$el.querySelector(".sp-container"))

    Interact(".sp-palette", this.$el).resizable({
      edges: { right: true, bottom: true, },

      restrictSize: {
        min: { width: 160, height: 160 }
      },

      inertia: true,
      onmove: event => {
        let target = event.target;

        target.style.width = event.rect.width + "px";
        target.style.height = event.rect.height + "px";

        this.psPalette.update();
        this.psContainer.update();
      }
    });
    
    new Sortable(this.$el.querySelector('.sp-palette'),{
     // draggable: '.sp-thumb-el',
     animation: 150
    })
  }
};
</script>

<style lang="sass" scoped>
@import 'config-style'

.wrapper
  +bt()
  

</style>

<style lang="sass">

@import 'config-style'

.color-picker-icon-wrapper
  display: flex
  .color-picker-icon
    margin-left: 5px
    padding: 5px
    cursor: pointer
    +btn-char-spacing-effect(16px, 16px)

</style>

