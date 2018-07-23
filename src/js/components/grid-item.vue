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
import interact from "interactjs";

export default {
  components: {
    CanvasWrapper: () => import("./canvas-wrapper.vue"),
    CommonTools: () => import("./common-tools.vue"),
    TextTools: () => import("./text-tools.vue"),
    LayerTools: () => import("./layer-tools.vue"),
    Casing: () => import("./casing.vue")
  },
  props: ["component"],
  methods: {
    focus() {
      console.log("focus");
    }
  },
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
            for (let gridCol of this.$store.state.grid) {
              if ((gridRow = gridCol.find(row => row.component === component))) {
                if (gridCol.length !== 1) gridCol.remove(gridRow);
                else this.$store.state.grid.remove(gridCol);
              }
            }
            //el.setAttribute('data-x', 0);
            //el.setAttribute('data-y', 0)

            // el.style.webkitTransform = el.style.transform = "translate(" + 0 + "px, " + 0 + "px)";
          }
          el.style.pointerEvents = "none";
          $(".casing").css("z-index", 100);
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
        let k = this.$store.state.rowsCount / gridCol.length;
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
  .casing
    display: block

</style>


