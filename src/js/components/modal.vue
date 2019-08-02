<template>
  <transition @enter="enter" @before-leave="leave">
    <div class="modal">
      <div
        @keyup.enter="apply() , $store.commit('closeModal')"
        class="modal-item animated"
        ref="modal"
      >
        <button @click.stop="$store.commit('closeModal')" class="close"></button>

        <form>
          <EnterPropMenu
            v-bind="setting"
            v-for="(setting, index) in settings[modal]"
            :key="index"
            @change="enterUpdate($event, setting)"
          ></EnterPropMenu>
        </form>

        <div @click="apply() , $store.commit('closeModal')" class="apply glitch-btn">
          <div class="text">Применить</div>
          <div class="mask">
            <span>Применить</span>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  components: {
    EnterPropMenu: () => import("./enter-prop-menu.vue")
  },
  computed: Vuex.mapState(["modal"]),
  methods: {
    enter() {
      console.log(this.$refs.modal);
      //$(this.$refs.modal).addClass('animated zoomIn')
    },
    leave() {
      //$(this.$refs.modal).addClass('zoomOut')
    },
    apply() {
      this.$store.commit({
        type: this.modal,
        ..._.mapValues(this.settings[this.modal], object => object.value)
      });
    },
    enterUpdate: (newValue, setting) => (setting.value = newValue)
  },
  data() {
    return {
      settings: {
        newFile: {
          title: { title: "Название", type: "input", value: null },
          width: { title: "Ширина", type: "input", value: null },
          height: { title: "Высота", type: "input", value: null },
          background: { title: "Фон", type: "color", value: null },
          //prettier-ignore
          test: {title: "test",value: null,type: "select", list: [
              {label: "белый", value: "white" },
              {  label: "темный", value: "navy" },
              {  label: "черный", value: "black" },
              {  label: "зеленый", value: "green" }
          ]}
        },
        windowSize: {
          width: { title: "Ширина", value: null, type: "input" },
          height: { title: "Высота", value: null, type: "input" }
        },
        newTheme: {
          theme: { title: "Название темы", value: null, type: "input" },
          textColor: { title: "Цвет текста", value: null, type: "color" },
          labelColor: { title: "Цвет подписей и иконок", value: null, type: "color" },
          bgBody: { title: "Задний фон", value: null, type: "color" },
          mainColor: { title: "Основной цвет", value: null, type: "color" },
          borderColor: { title: "Цвет обводки", value: null, type: "color" },
          bgColor: { title: "Цвет при наведении", value: null, type: "color" }
        },
        newGrid: {
          workspace: { title: "Название рабочего места", value: null, type: "input" }
        }
      }
    };
  }
};
</script>	

<style lang="sass" scoped>
@import 'config-style'

.modal
  position: fixed
  display: flex
  justify-content: center
  align-items: center
  left: 0
  top: 0
  right: 0
  bottom: 0
  background: rgba(0, 0, 0, .3)
  +index($level5)
  &-item
    position: relative
    display: flex
    flex-direction: column
    background: radial-gradient(circle, transparent 45%, var(--main-color) 45%)
    border-radius: 3px
    animation: grad-reverse .5s
    +index($level4)
    &:hover
      animation: grad .5s 
      background: radial-gradient(circle, transparent 100%, var(--main-color) 45%)

    form
      padding-top: 15px  
    .apply
      transition: .3s
      font-size: 1.1rem
      padding: 0 15px
      margin-bottom: 14px
      border: none
      color: var(--label-color)
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



@keyframes grad
  $value: 45
  @for $i from 0 to 100
    #{$i}%
      background: radial-gradient(circle, transparent #{$value + '%'}, var(--main-color) 45%)
    @if $value > 100
      $value: 100
    @else
      $value: $value + 1

@keyframes grad-reverse
  $value: 100
  @for $i from 0 to 100
    #{$i}%
      background: radial-gradient(circle, transparent #{$value + '%'}, var(--main-color) 45%)
    @if $value < 45
      $value: 45
    @else
      $value: $value - 1


		
</style>