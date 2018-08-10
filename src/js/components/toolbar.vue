<template>
	<nav class="panel-header-tools-wrapper">
		<PanelHeaderTool
			:img="tool.img"  
			v-show="currentTool === tool" 
			:key="tool.id" v-for="tool in tools">
		</PanelHeaderTool>
	</nav>
</template>

<script>
export default {
  components: {
    PanelHeaderTool: () => import("./panel-header-tool.vue")
	},
	mounted() {
		//common-tools.vue
		bus.$on('toolActive' ,connector => this.currentTool = this.tools.find(tool => tool.connector === connector))
	},
	methods : {
		tool_active (index) {
			this.prevActive ? this.prevActive.isActive = false : void 0;
			this.prevActive = this.tools[index];
			this.prevActive.isActive = true;
		}
	},
  data() {
    return {
      tools: [
        { id: 0, img: "move.png",connector:'move' , isActive : false },
        { id: 1, img: "pencil.png" ,connector:'pencil', isActive : false},
        { id: 2, img: "text.png" ,connector:'text', isActive : false},
        { id: 3, img: "paint-bucket.png",connector:'rubber' , isActive : false},
        { id: 4, img: "eraser.png" ,connector:'eraser', isActive : false},
        { id: 5, img: "square.png" ,connector:'square', isActive : false},
        { id: 6, img: "line.png",connector:'line', isActive : false }
			],
			currentTool : null
    };
  }
};
</script>

<style lang="sass">
@import 'config-style'

.panel-header-tools-wrapper
	background: var(--main-color)
	color: var(--text-color)
	display: flex
	height: 35px
	+bb()
</style>
