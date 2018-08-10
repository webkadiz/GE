<template>
	<div 
		:style="{'grid-row': computeRow}" 
		:class="['grid-item', {'in-grid': inGrid, 'in-fold': isFold}]" 
		:data-component="component" 
    @mousedown="$emit('mousedown')">

    <GridArrow v-if=" component !== 'CanvasWrapper' 
                      && inGrid 
                      && $store.state.grid.find(col => col[0].component === component)"
               @switcherArrowInGrid="switcherArrowInGrid"
               :class="{fold: isFold }" :component="component">
    </GridArrow>

    <DragTools @closeComponent="$emit('closeComponent')" @switchArrow="switchArrow" 
               v-if="component !== 'CanvasWrapper' && !inGrid"
               :class="{fold: isFold}">
    </DragTools>

		<keep-alive>
        <component v-scroll
            ref="component"
            :class="[{'component-fold': isFold}, {tools: component !== 'CanvasWrapper'}]" 
            :style="computePosition()"
            :is="component"
            v-show="computeDisplayComponent">
        </component>
		</keep-alive>

    <FoldTools @switcher="switcher = !switcher" 
               v-if="isFold" 
               :title="title" 
               :active="switcher">
    </FoldTools>

		<Casing v-if="component !== 'CanvasWrapper'"></Casing>
		<Casing v-else-if="component === 'CanvasWrapper'" BottomNot="true" TopNot="true"></Casing>
	</div>
</template>

<script>
import CanvasWrapper from "./canvas-wrapper.vue";
import Casing from "./casing.vue";

export default {
  components: {
    CanvasWrapper,
    Casing,
    GridArrow: () => import("./grid-arrow.vue"),
    DragTools: () => import("./tools/drag-tools.vue"),
    FoldTools: () => import("./tools/fold-tools.vue"),
    CommonTools: () => import("./tools/common-tools.vue"),
    TextTools: () => import("./tools/text-tools.vue"),
    LayerTools: () => import("./tools/layer-tools.vue"),
    PencilTools: () => import("./tools/pencil-tools.vue"),
    FillTools: () => import("./tools/fill-tools.vue")
  },
  props: ["component", "rowsAmount", "isFold", "isActive", "title"],
  mounted() {
    bus.$on("switchArrow", this.switchArrow); // вызывавший здесь же
    if (this.component !== "CanvasWrapper") {
      Interact(this.$el).draggable({
          max: Infinity,
          maxPerElement: Infinity,
          allowFrom: ".drag, .in-grid, .fold-wrapper",
          inertia: {
            smoothEndDuration: 1000
          },
          restrict: {
            restriction: 'parent',
          },
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
              let gridRow,
                component = el.getAttribute("data-component");
              this.$store.state.grid.forEach(gridCol => {
                if ((gridRow = gridCol.find(row => row.component === component))) {
                  gridCol.length !== 1 ? gridCol.remove(gridRow) : this.$store.state.grid.remove(gridCol);
                }
              });

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
        })

        // .resizable({
        //   enabled: false,
        //   edges: { bottom: true, top: true },

        //   // minimum size
        //   restrictSize: {
        //     min: { width: 100, height: 50 }
        //   },

        //   inertia: true,
        //   onmove: event => {
        //     let target = event.target,
        //       y = parseFloat(target.getAttribute("data-y")) || 0;

        //     target.style.height = event.rect.height + "px";
        //     y += event.deltaRect.top;

        //     target.setAttribute("data-y", y);

        //     $(this.$refs.component.$el).getNiceScroll().resize();
        //   }
        // });
       
    }
  },
  computed: {
    inGrid() {
      for (let gridCol of this.$store.state.grid) {
        if (~gridCol.findIndex(gridRow => gridRow.component === this.component)) {
          if(this.$el) {
            // this.ps = new PerfectScrollbar(this.$el); 
            // this.ps.update()
            
            //Interact(this.$el).resizable({enabled: true});
          }
          return true;
        }
      }
      if(this.$el) {
        // Interact(this.$el).resizable({enabled: false})
        // this.$el.style.height = 'auto';
        // this.ps.update()
      };
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
    },
    computeDisplayComponent() {
      if (!this.isFold) return true;
      return this.switcher;
    }
  },
  methods: {
    computePosition() {
      if (this.$el && this.isFold)
        return {
          left: this.$el.getBoundingClientRect().left < $("html").width() / 2 ? "103%" : "",
          right: this.$el.getBoundingClientRect().left > $("html").width() / 2 ? "103%" : ""
        };
    },
    switchArrow(col) {
      if (col && !col.find(row => row.component === this.component)) return;
      this.switcher = this.isFold ? true : false;
      this.$emit("fold");
    },
    switcherArrowInGrid() {
      bus.$emit("switchArrow", this.$store.state.grid.find(col => col[0].component === this.component)); // обработчик здесь же
    }
  },
  data() {
    return {
      switcher: true
    };
  }
};
</script>

<style lang="sass">
@import 'config-style'

.grid-item
  transition: opacity .8s
  display: flex
  flex-direction: column
  position: absolute
  border-radius: 3px
  box-shadow: 0 0px 14px 2px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12), 0 5px 5px -3px rgba(0, 0, 0, 0.2)
  +b()
  .casing
    display: none
  .component-fold
    position: absolute
    top: 14px
    +b()

.grid-item.in-grid
  overflow: hidden
  position: relative
  border-radius: 0
  box-shadow: none
  .casing
    display: block
  .tools
    flex: 1
  .tools.component-fold
    height: auto
    top: 0
  .fold-wrapper
    height: 100%

.grid-item.in-grid.in-fold
  overflow: visible
</style>


