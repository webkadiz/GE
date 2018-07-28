<template>
  <nav class="menu">
    <div class="menu-item" v-for="(menuItem, index) in menuItems" :key="index" >
      <MenuBadge v-bind="menuItem.badge"></MenuBadge>
      <MenuDropdown :dropdownList="menuItem.dropdown"></MenuDropdown>     
    </div>
    <div class="fill-space"></div>
    <div class="lower-band"></div>
  </nav>
</template>

<script>
export default {
  components: {
    MenuBadge: () => import("./menu-badge.vue"),
    MenuDropdown: () => import("./menu-dropdown.vue")
  },
  methods: {
    getThemes(){}
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
              type: 'open'
            },
            {
              event: "download",
              title: "скачать",
              type: 'apply'
            }
          ]
        },
        {
          badge: { title: 'вид', color: "#ff84fd" },
          dropdown: [
            {
              event: "windowSize", 
              title: "размер холста", 
              type: 'open'
            },
            { 
              title: "Тема",
              type: 'dropdown',
              subdropdown: [
                this.$store.getters.genThemes,
                {
                  event: 'themeChange', 
                  getter: 'getCurrentTheme',
                  title: 'Светлая', 
                  type: 'apply', 
                  value:'light',                   
                },
                {
                  event: 'themeChange', 
                  getter: 'getCurrentTheme',
                  title: 'Темная', 
                  type: 'apply', 
                  value: 'dark',                   
                },
                {
                  event: 'themeInvert', 
                  getter: 'getInvertTheme',
                  title: 'Инвертировать тему', 
                  type: 'apply',                    
                },
                {
                  event: 'themeNew', 
                  title: 'Создать тему', 
                  type: 'open',                    
                }
              ]
            }
          ]
        },
        {
          badge: { title: 'окно', color: "#6cccff" },
          dropdown: [
            {
              event: 'switchTool',
              getter: 'getGridTool', 
              title: 'Инструменты', 
              type: 'apply', 
              value:'CommonTools',
            },
            {
              event: 'switchTool',
              getter: 'getGridTool', 
              title: 'Текст', 
              type: 'apply', 
              value:'TextTools',
            },
            {
              event: 'switchTool',
              getter: 'getGridTool', 
              title: 'Слои', 
              type: 'apply', 
              value:'LayerTools',
            },
            {
              event: 'switchTool',
              getter: 'getGridTool', 
              title: 'Карандаш', 
              type: 'apply', 
              value:'PencilTools',
            }
          ]
        },
        {
          badge: { title: 'помощь', color: "#3dd2c1" },
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
@import '../../sass/_help'

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