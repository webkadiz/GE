<template>
	<div class="transform-tools">
    
    <EnterPropTool :setting="key" :icon="key" :onlyGroup="true" :tool="tool" v-bind="setting" v-for="(setting, key) in props" :key="key">
		</EnterPropTool>
    
	</div>
</template>

<script>
	export default {
		components: {
    EnterPropTool: () => import("../enter-prop-tool.vue")
  },
  data() {
    return {
      props: {
        left: {
					width: 100,
					type: 'input',
					label: "left",
					number: true,
        },
        top: {
          width: 50,
          type: 'input',
					number: true,
					label: 'top'      
        },
        width: { 
          width: 50,   
          type: 'input',
					number: true,
					label: 'width'         
        },
        height: {
          width: 50,
          type: 'input',
					number: true,
					label: 'height'        
        }, 
      },
      tool: 'transform'
    };
  }
	}
</script>

<style lang="sass">
	
</style>