<template>
	<main :style="{ gridTemplateColumns: computeCols, 
        gridTemplateRows: computeRows}" 
        class="grid">	

    <GridItem @mousedown="gridItem.component !== 'CanvasWrapper' ? activeGridItem = gridItem: void 0" 
              v-bind="gridItem" 
              :key="gridItem.id" v-for="gridItem in grid"
              :style="{'z-index': computeZIndex(gridItem)}"
              :class="gridItem.class"
              :rowsAmount="computeRows.match(/[0-9]+/)[0]"
              @fold="fold(gridItem)"
              @closeComponent="close(gridItem)"
              v-if="gridItem.isActive">
    </GridItem>
	</main>
</template>

<script>
export default {
  components: {
    GridItem: () => import('./grid-item.vue'),  
  },
  computed: {
    grid() {
      return this.getGrid.flat().concat(this.getGridTools).unique('component');
    },
    computeCols() {
      let cols = "";
      for (let gridCol of this.getGrid) 
        ~gridCol.findIndex(gridRow => gridRow.component === "CanvasWrapper")
          ? (cols += "1fr ")
          : (cols += "auto ");
      return cols;
    },
    computeRows(){
      return `repeat(${this.getGrid.reduce((prev, gridCol) => 
        prev > gridCol.length ? prev : gridCol.length, 0)}, auto)`
    },
    ...Vuex.mapGetters(['getGrid', 'getGridTools'])
  },
  methods: {
    computeZIndex(gridItem) {
      if(gridItem.component === 'CanvasWrapper') return level0
      return this.activeGridItem === gridItem ? level3 : level2
    },
    fold(gridItem) {
      gridItem.isFold = !gridItem.isFold
      setLocalStorageField("grids", this.$store.state.grids);
    },
    close(gridItem) {
      gridItem.isActive = false
      setLocalStorageField("grids", this.$store.state.grids);
    }
  },
  data() {
    return {
      activeGridItem: null,
      level2,
      level3
    }
  }
};
</script>

<style lang="sass" scoped>
@import 'config-style'

.grid
  position: relative
  display: grid
  grid-auto-flow: column
  grid-gap: 2px
  flex: 1
  +index($level0)
	
</style>
