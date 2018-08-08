<template>
	<div class="text-tools">

    <div class="col-center"  v-for="setting in ['fontStyle']" :key="props[setting].id">
      <EnterPropTool :tool="tool" v-bind="props[setting]"></EnterPropTool>
    </div>

    <div class="col-space"  v-for="settings in [['fontSize'],['lineHeight'],['charSpacing'],['text']]" :key="props[settings[0]].id">
      <EnterPropTool :tool="tool" v-bind="props[setting]" v-for="setting in settings" :key="setting.id"></EnterPropTool>
    </div>

    <div class="col-space">
      <EnterPropTool :tool="tool" v-bind="props[setting]" v-for="setting in ['underline','overline']" :key="props[setting].id"></EnterPropTool>
    </div>
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
          id: 1,
          label: "стиль шрифта:",
          setting: 'fontStyle',
          type: 'select',
          options: [
            { label: "обычный", value: "normal" },
            { label: "курсивный", value: "italic" },
            { label: "жирный", value: "bold" }
          ]
        },
        fontSize: {
          id: 2,
          icon: "font-size",
          setting: 'fontSize',
          alt: "font-size", 
          type: 'input',
          number: true       
        },
        lineHeight: {
          id: 4,
          icon: "line-height",
          setting:'lineHeight',
          alt: "font-line-height",      
          type: 'input',
          number: true         
        },
        charSpacing: {
          id: 5,
          icon: "char-spacing",
          setting: 'charSpacing',
          alt: "font-word-space",
          type: 'input',
          number: true         
        },        
        underline: {
          id: 6,
          icon: "underline",
          alt: 'underline',
          setting: 'underline',        
          type: 'checkbox',
        },
        overline: {
          id: 7,
          label: "overline",
          setting: 'overline',        
          type: 'checkbox',
        },
        text: {
          id: 8,
          label: "Текст:",
          setting: 'text',        
          type: 'textarea',
        }
      },
      tool: 'text'
    };
  }
};
</script>

<style lang="sass" scoped>
@import '../../../sass/_help'

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
