<template>
	<div class="wrapper">
		<input :value="computeValue" ref="colorpicker" type="text">
	</div>
	
</template>

<script>
import Icon from '../icon';

export default {
  props: ['tool'],
  computed: {
		computeValue() {
      setTimeout(() =>	
			  $(this.$refs.colorpicker).spectrum('set', this.$refs.colorpicker.value ), 0)
			if (this.canvas && this.canvas.activeLayer) 
        return this.canvas.activeLayer.object[this.tool];

      return this.$store.state.global[this.tool];
		},
		...Vuex.mapState(["canvas"])
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
      change: color => {
        color
          ? this.$store.commit({
              type: "propUpdate",
              setting: this.tool,
              tool: "global",
              newValue: color.toRgbString()
            })
          : void 0;
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

    $(".sp-palette", this.$el).niceScroll({
      autohidemode: "leave"
    });

    $('.sp-cancel', this.$el).remove()


    Interact(".sp-palette", this.$el).resizable({
      edges: { left: true, right: true, bottom: true, top: true },

      // keep the edges inside the parent
      restrictEdges: {
        restriction: {top: 40, left: 40, right: 100, bottom: 100}
			},

      // minimum size
      restrictSize: {
        //min: { width: 100, height: 50 }
      },

      inertia: true,
      onmove: event => {
        let target = event.target,
          x = parseFloat(target.getAttribute("data-x")) || 0,
          y = parseFloat(target.getAttribute("data-y")) || 0;

        // update the element's style
        target.style.width = event.rect.width + "px";
        target.style.height = event.rect.height + "px";

        // translate when resizing from top or left edges
        x += event.deltaRect.left;
        y += event.deltaRect.top;

        //target.style.webkitTransform = target.style.transform = "translate(" + x + "px," + y + "px)";

        target.setAttribute("data-x", x);
        target.setAttribute("data-y", y);

        $(".sp-palette", this.$el)
          .getNiceScroll()
          .resize();
      }
    });
    
    console.log(this.$el.querySelector('.sp-palette-row'));
    new Sortable(this.$el.querySelector('.sp-palette-row'),{
     // draggable: '.sp-thumb-el',
     animation: 150
    })
  }
};
</script>

<style lang="sass" scoped>
@import '../../../sass/_help'

.wrapper
  +bt()
  
.in-grid .wrapper
  +bb()

</style>

<style lang="sass">
@import '../../../sass/_help'

.color-picker-icon-wrapper
  display: flex
  margin-left: 33px
  .color-picker-icon
    margin-left: 5px
    padding: 5px
    cursor: pointer
    +btn-char-spacing-effect(16px, 16px)
</style>

