<template>
  <nav class="menu">
    <div class="menu-item" v-for="(menuItem, index) in menuItems" :key="index" >
      <NavbarBadge v-bind="menuItem.badge"></NavbarBadge>
      <NavbarDropdown :dropdownList="menuItemDropdown(index)"></NavbarDropdown>     
    </div>
    <div class="fill-space"></div>
    <div class="lower-band"></div>
  </nav>
</template>

<script>
import NavbarBadge from "./navbar-badge";

export default {
  components: {
    NavbarBadge,
    NavbarDropdown: () => import("./navbar-dropdown")
  },
  methods: {
    menuItemDropdown(index) {
      let themes = this.menuItems[index].dropdown.find(item => item.alias === "themes");
      let workspace = this.menuItems[index].dropdown.find(item => item.alias === "workspace");

      if (themes) {
        this.$set(themes, "subdropdown", [...this.$store.getters.genThemes, ...themes.staticdropdown]);
      }

      if(workspace) {
        this.$set(workspace, "subdropdown", [...this.$store.getters.genGrids, ...workspace.staticdropdown]);
      }

      return this.menuItems[index].dropdown;
    }
  },
  data() {
    return {
      menuItems: [
        {
          badge: { title: "файл", color: "#9437ff" },
          dropdown: [
            {
              event: "newFile",
              title: "новый файл",
              type: "open"
            },
            {
              event: "download",
              title: "скачать",
              type: "apply"
            }
          ]
        },
        {
          badge: { title: "вид", color: "#ff84fd" },
          dropdown: [
            {
              event: "windowSize",
              title: "размер холста",
              type: "open"
            },
            {
              alias: 'themes',
              title: "Темы",
              type: "dropdown",
              staticdropdown: [
                {
                  event: "themeInvert",
                  getter: "isThemeInvert",
                  title: "Инвертировать тему",
                  type: "apply"
                },
                {
                  event: "themeNew",
                  title: "Создать тему",
                  type: "open"
                },
                {
                  event: "themeDelete",
                  title: "Удалить выбранную тему",
                  type: "apply"
                }
              ],
              subdropdown: []
            }
          ]
        },
        {
          badge: { title: "окно", color: "#6cccff" },
          dropdown: [
            {
              event: "switchTool",
              getter: "isGridTools",
              title: "Инструменты",
              type: "apply",
              value: "CommonTools"
            },
            {
              event: "switchTool",
              getter: "isGridTools",
              title: "Текст",
              type: "apply",
              value: "TextTools"
            },
            {
              event: "switchTool",
              getter: "isGridTools",
              title: "Слои",
              type: "apply",
              value: "LayerTools"
            },
            {
              event: "switchTool",
              getter: "isGridTools",
              title: "Карандаш",
              type: "apply",
              value: "PencilTools"
            },
            {
              event: "switchTool",
              getter: "isGridTools",
              title: "Заливка",
              type: "apply",
              value: "FillTools"
            },
             {
              alias: 'workspace',
              title: "Рабочее место",
              type: "dropdown",
              staticdropdown: [
                {
                  event: 'gridNew',
                  title: 'Новое рабочее место',
                  type: 'open',
                },
                {
                  event: 'gridDelete',
                  title: 'Удалить рабочее место',
                  type: 'apply',
                }
              ],
              subdropdown: []
            }
          ]
        },
        {
          badge: { title: "помощь", color: "#3dd2c1" },
          dropdown: [
            {
              event: "newFile",
              title: "новый файл",
              open: true
            }
          ]
        }
      ]
    };
  }
};
</script>

<style lang="sass">
@import 'config-style'

.menu
  display: flex
  background: var(--main-color)
  position: relative
  +bb()
  &-item
    flex-shrink: 0
    position: relative
    color: var(--text-color)
    width: 75px
    &:hover
      & .menu-dropdown
        transform: translateY(1px)
      & .menu-subdropdown
        display: block
    &:last-child
      width: 100%
  .fill-space
    width: 100%
    background: var(--main-color)
    position: relative
    +index($level4)
  .lower-band
    transition: .3s
    position: absolute
    width: 75px
    height: 2px
    left: -75px
    bottom: -1px
    +index($level4)
    &:hover
      transition: .3s 1s
  


@each $color, $n in #9437ff 1, #ff84fd 2, #6cccff 3, #3dd2c1 4
  .menu-item:hover:nth-child(#{$n}) ~ .lower-band
    background: $color
    transform: translateX(#{$n * 75px})
  .menu-item:nth-child(#{$n}) .menu-dropdown .menu-dropdown-item
    background: rgba($color, .7)
  

    
</style>