<template>
	<div class="pencil-tools tools">
		<div class="col-center" v-for="setting in ['strokeLineCap', 'strokeLineJoin']" :key="props[setting].id">
			<EnterPropTool v-bind="props[setting]" :tool="tool"></EnterPropTool>
		</div>
		<div class="col-space" v-for="settings in [['stroke', 'fill'], ['strokeWidth']]" :key="props[settings[0]].id">
			<EnterPropTool v-bind="props[setting]" :tool="tool" v-for="setting in settings" :key="setting.id"></EnterPropTool>
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
        strokeLineCap: {
          id: 1,
          label: "наконечник:",
          setting: "strokeLineCap",
          type: "select",
          options: [
            { label: "обрезанный", value: "butt" },
            { label: "круглый", value: "round" },
            { label: "квадратный", value: "square" }
          ]
        },
        strokeLineJoin: {
          id: 2,
          label: "соединение линий:",
          setting: "strokeLineJoin",
          type: "select",
          options: [
            { label: "bevil", value: "bevil" },
            { label: "круглое", value: "round" },
            { label: "острое", value: "miter" }
          ]
        },
        fill: {
          id: 3,
          label: "fill:",
          setting: "fill",
          type: "color"
        },
        stroke: {
          id: 4,
          label: "граница:",
          setting: "stroke",
          type: "input"
        },
        strokeWidth: {
          id: 5,
          label: "ширина границуы",
          setting: "strokeWidth",
          type: "input",
          number: true
        }
      },
      tool: "pencil"
    };
  }
};
</script>

<style lang="sass">
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
