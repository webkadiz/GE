<template >

<div v-show="isActive" 
  @keyup.enter="$store.commit(connector) , $store.commit('closeHeaderDropdownItem', connector)"  
  class="menu-header-dropdown-item animated">  
  <button @click.stop="$store.commit('closeHeaderDropdownItem', connector)" class="close"></button>
  
  <form>
    <EnterPropMenu 
      v-bind="setting" 
      :key="i" 
      v-for="(setting, i) in settings[index].props"
      v-model.trim.number="setting.enter">   
    </EnterPropMenu>
  </form>
  
  <div  @click="apply() , $store.commit('closeHeaderDropdownItem', connector)" class="apply glitch-btn">
    <div class="text">Применить</div>
    <div class="mask">
      <span>Применить</span>
    </div>
  </div>
</div>

</template>

<script>
import { mapState} from 'vuex';

export default {
  components: {
    EnterPropMenu: () => import("./enter-prop-menu.vue")
  },
  props: ["index", "connector", 'isActive'],
  data() {
    return {
      settings: [
        {
          props: [
            { title: "Название", id: 0, subtitle: "title", enter: null, input: true },
            { title: "Ширина", id: 1, subtitle: "width", enter: null, input: true },
            { title: "Высота", id: 2, subtitle: "height", enter: null, input: true },
            {
              title: "Фон",
              id: 3,
              subtitle: "background",
              enter: null,
              select: true,
              options: [{ id: 0, label: "white", value: "white" }]
            },
            {
              title: "test",
              id: 4,
              subtitle: "test",
              enter: null,
              select: true,
              options: [
                { id: 0, label: "white", value: "white" },
                { id: 1, label: "navy", value: "navy" },
                { id: 2, label: "black", value: "black" },
                { id: 3, label: "green", value: "green" }
              ]
            }
          ],
          connector: 'newFile'
        },
        {
          props: [
            { title: "Ширина", id: 0, subtitle: "width", enter: null, input: true },
            { title: "Высота", id: 1, subtitle: "height", enter: null, input: true }
          ]
        }
      ]
    };
  },
  methods: {
    apply() {
      this.$store.commit(this.connector,find(this.settings, this.connector).props);
    },
  },
};
</script>	

<style lang="sass">
@import '../../sass/_help'

.menu-header-dropdown-item
  display: flex
  position: fixed
  left: 50%
  top: 50%
  transform: translate(-50%, -50%)
  flex-direction: column
  background: transparentize($bg-body ,.4)
  box-shadow: 0 10px 90px -2px rgba(#000,0.2)
  border-radius: 3px
  z-index: 100000000

form
  padding-top: 15px  

.apply
  transition: .3s
  font-size: 1.1rem
  padding: 0 15px
  margin-bottom: 15px
  border: none
  color: $label-color
  overflow: hidden
  outline: none
  cursor: pointer
  &::before
    left: 0   
  &:hover::before
    transform: translateX(2150%) scaleX(100) scaleY(0.2)

.close
  transition: .6s
  position: absolute 
  right: -10px
  top: -10px
  width: 30px
  height: 30px
  padding: 0
  border-radius: 50%
  background: #363D4E
  cursor: pointer
  outline: none
  border: none
  &:hover
    background: #3E465A
    transform: scale(1.15) rotate(360deg)
  &::before
    content: ''
    display: block
    width: 12px
    height: 2px
    position: absolute
    left: 50%
    top: 50%
    margin: -1px -6px
    transform: rotate(45deg)
    background: white
    cursor: pointer
  &::after
    @extend .close::before
    transform: rotate(-45deg)



		
</style>