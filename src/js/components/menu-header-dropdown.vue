<template>
	<div  class="header-options-dropdown">
		<div @click="isOpen(setting)" 
				 :key="setting.id"
         :apply="setting.apply ? setting.apply : void 0" 
				 v-for="setting in settings[index]">
			{{setting.text}}			
		</div>
	</div>
</template>

<script>

export default {
  props: ["index"],
  methods: {
    isOpen (setting) {
      setting.open 
        ? this.$store.commit('openHeaderDropdownItem', setting.connector)
        : this.$store.commit(setting.connector)
    }
  },
  data() {
    return {
      settings: [
        [
          {
            id: 1,
            connector: "newFile",
            text: "новый файл",
            open: true
          },
          { id: 2, connector: "download", text: "скачать",open: false  }
        ],
        [{ id: 3, connector: "windowSize", text: "размер холста", open: true }],
        [
          { id: 4, connector: "common_tools", text: "инструменты" },
          { id: 5, connector: "text_tools", text: "работа с текстом" }
        ]
      ]
    };
  }
};
</script>

<style lang="sass">
	
</style>