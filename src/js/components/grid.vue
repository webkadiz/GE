<template>
	<main :style="{ gridTemplateColumns: computeCols , gridTemplateRows: computeRows} " class="grid">	

    <GridItem @mousedown="gridItem.component !== 'CanvasWrapper' ? activeGridItem = gridItem: void 0" 
              :component="gridItem.component" 
              :key="gridItem.id" v-for="gridItem in grid"
              :style="{'z-index': computeZIndex(gridItem)}"
              :rowsAmount="computeRows.match(/[0-9]+/)[0]">
    </GridItem>
	</main>
</template>

<script>
export default {
  components: {
    GridItem: () => import('./grid-item.vue'),  
  },
  mounted() {   
    if(!this.$store.state.grid.length){
      this.$store.state.grid.push([{component: 'CanvasWrapper', id: 0}]);   
    }
  },
  computed: {
    grid() {
      return this.$store.state.grid.flat().concat(this.$store.state.gridTools).unique('component');
    },
    computeCols() {
      let cols = "";
      for (let gridCol of this.$store.state.grid) {
        ~gridCol.findIndex(gridRow => gridRow.component === "CanvasWrapper")
          ? (cols += "1fr ")
          : (cols += "auto ");
      }
      return cols;
    },
    computeRows(){
      return `repeat(${this.$store.state.grid.reduce((prev, gridCol) => 
        prev > gridCol.length ? prev : gridCol.length, 0)}, auto)`
    }
  },
  methods: {
    computeZIndex(gridItem) {
      if(gridItem.component === 'CanvasWrapper') return level0
      return this.activeGridItem === gridItem ? level3 : level2
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
@import '../../sass/_help'

.grid
  height: calc(100% - 52px)
  position: relative
  display: grid
  grid-auto-flow: column
  grid-gap: 2px
  +index($level0)
	
</style>
