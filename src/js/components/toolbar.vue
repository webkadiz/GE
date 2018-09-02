<template>
	<nav class="toolbar">
		<ToolbarItem
			:fields="tool"
			:tool="key"  
			v-if="activeTool === key" 
			v-for="(tool, key) in tools" :key="key">
		</ToolbarItem>
	</nav>
</template>

<script>
export default {
  components: {
    ToolbarItem: () => import("./toolbar-item.vue")
	},
	mounted() {
		//common-tools.vue
		//bus.$on('toolActive' ,connector => this.currentTool = this.tools.find(tool => tool.connector === connector))
	},
	computed: Vuex.mapState(['activeTool']),
	methods : {

	},
  data() {
    return {
      tools: {
        move: {},
				pencil: {
					strokeWidth: {
						type: 'input',
						number: true
					}
				},
				brush: {},
       	text:{ },
        pouring: {},
        eraser: { },
        square: {},
        line: {}
			}
    };
  }
};
</script>

<style lang="sass">
@import 'config-style'

.toolbar
	background: var(--main-color)
	color: var(--text-color)
	display: flex
	height: 35px
	+bb()
</style>
