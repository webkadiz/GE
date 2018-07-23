<template>
	<div 
		:style="{'grid-row': computeRow}" 
		:class="['grid-item', {'in-grid': inGrid}]" 
		:data-component="component" 
    @mousedown="$emit('mousedown')">

		<keep-alive>
			<component :is="component"></component>
		</keep-alive>
		<Casing v-if="component !== 'CanvasWrapper'"></Casing>
		<Casing v-else BottomNot="true" TopNot="true"></Casing>
	</div>
</template>

<script>
export default {
  components: {
    CanvasWrapper: () => import("./canvas-wrapper.vue"),
    CommonTools: () => import("./tools/common-tools.vue"),
    TextTools: () => import("./tools/text-tools.vue"),
    LayerTools: () => import("./tools/layer-tools.vue"),
    PencilTools: () => import("./tools/pencil-tools.vue"),
    Casing: () => import("./casing.vue")
  },
  props: ["component", 'rowsAmount'],
  mounted() {
    if (this.component !== "CanvasWrapper") {
      interact(this.$el).draggable({
        ignoreFrom: ".layers",
        onmove(e) {
          //prettier-ignore
          let el = e.target,
              x  = (parseFloat(el.getAttribute("data-x")) || 0) + e.dx,
              y  = (parseFloat(el.getAttribute("data-y")) || 0) + e.dy;

          el.style.webkitTransform = el.style.transform = `translate(${x}px, ${y}px)`;

          el.setAttribute("data-x", x);
          el.setAttribute("data-y", y);
        },
        onstart: event => {
          let el = event.target;

          if (el.classList.contains("in-grid")) {
            let gridRow, component = el.getAttribute("data-component");
            this.$store.state.grid.forEach( gridCol => 
              gridRow = gridCol.find(row => row.component === component)
                ? gridCol.length !== 1 
                    ? gridCol.remove(gridRow)
                    : this.$store.state.grid.remove(gridCol) : void 0)
            
            el.setAttribute("data-x", el.getBoundingClientRect().left);
            el.setAttribute("data-y", el.getBoundingClientRect().top);
          }
          el.style.pointerEvents = "none";
          $(".casing").css("z-index", 1000000000);         
        },
        onend: e => {
          e.target.style.pointerEvents = "auto";
          $(".casing").css("z-index", -100);
        }
      });
    }
  },
  computed: {
    inGrid() {
      for (let gridCol of this.$store.state.grid) {
        if (~gridCol.findIndex(gridRow => gridRow.component === this.component)) return true;
      }
      return false;
    },
    computeRow() {
      for (let gridCol of this.$store.state.grid) {
        let k = this.rowsAmount / gridCol.length;
        let index;
        if (~(index = gridCol.findIndex(gridRow => gridRow.component === this.component))) {
          return `${index * k + 1} / ${index * k + k + 1}`;
        }
      }
    }
  }
};
</script>

<style lang="sass">
@import '../../sass/_help'

.grid-item
  transition: opacity .8s
  display: flex
  position: absolute
  border-radius: 3px
  box-shadow: 0 0px 14px 2px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12), 0 5px 5px -3px rgba(0, 0, 0, 0.2)
  +b()
  .casing
    display: none

.grid-item.in-grid
  position: relative
  border-radius: 0
  box-shadow: none
  display: grid
  .casing
    display: block

</style>


