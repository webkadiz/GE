<template>
	<div class="text-tools">
    
    <EnterPropTool :setting="key" :icon="key" :tool="tool" v-bind="setting" v-for="(setting, key) in props" :key="key"></EnterPropTool>
    
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
        fontStyle: {
          width: 100,
          label: "стиль шрифта:",
          type: 'select',
          options: [
            { label: "обычный", value: "normal" },
            { label: "курсивный", value: "italic" },
            { label: "жирный", value: "bold" }
          ]
        },
        fontSize: {
          width: 50,
          type: 'input',
          number: true       
        },
        lineHeight: { 
          width: 50,   
          type: 'input',
          number: true         
        },
        charSpacing: {
          width: 50,
          type: 'input',
          number: true         
        }, 
        text: {
          width: 50,
          label: "Текст:",      
          type: 'textarea',
        },    
        underline: {   
          width: 50,    
          type: 'checkbox',
        },
        overline: {
          width: 50,
          label: "overline",     
          type: 'checkbox',
        },
       
      },
      tool: 'text'
    };
  }
};
</script>

<style lang="sass" scoped>
@import 'config-style'

.text-tools
  padding: 10px
  display: flex
  flex-wrap: wrap
  width: 225px

.col-center
  display: flex
  justify-content: center

.col-space
  display: flex
  justify-content: space-between

.col-around
  display: flex
  justify-content: space-around
</style>
