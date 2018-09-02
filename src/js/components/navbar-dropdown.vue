<template>
	<div  class="navbar-dropdown">
		<div :class="['navbar-dropdown-item', {'navbar-dropdown-item__wrapper':dropdown.type === 'dropdown'}]" 
         @click="isOpen(dropdown)"
				 v-for="(dropdown, index) in dropdownList" :key="index">
      <Icon class="navbar-dropdown-item__checked" v-if="isActive(dropdown)" icon="checked"></Icon>
			{{dropdown.title}}

      <div class="navbar-subdropdown" v-if="dropdown.type === 'dropdown'">    
        <div  class="navbar-dropdown-item navbar-subdropdown-item"  
              @click="isOpen(subdropdown)"
              v-for="(subdropdown, index) in dropdown.subdropdown" :key="index">
          <Icon class="navbar-dropdown-item__checked" v-if="isActive(subdropdown)" icon="checked"></Icon>
          {{subdropdown.title}}
        </div>
      </div>

      <Icon class="navbar-dropdown-item__wrapper-arrow" icon="dropdown-arrow"></Icon>		
		</div>
	</div>
</template>

<script>
export default {
  components:{
    Icon: () => import('./icon.vue') 
  },
  props: ["dropdownList"],
  methods: {
    isActive(dropdown) {
      if(dropdown.getter) {
        return this.$store.getters[dropdown.getter](dropdown.value)
      }
    },
    isOpen(dropdown) {
      if(dropdown.type === 'open')
        this.$store.commit("openModal", dropdown.event)
      else if(dropdown.type === 'apply') 
        this.$store.commit(dropdown.event, dropdown.value);
    },
    firefly() {
      Array.from(this.$el.querySelectorAll(".navbar-dropdown-item"), function(el) {
        el.addEventListener("mousemove", function(e) {
          el.style.setProperty("--px", e.clientX - el.getBoundingClientRect().left);
          el.style.setProperty("--py", e.clientY - el.getBoundingClientRect().top);
        });
      });
    }
  },
  mounted() {this.firefly()},
  updated() {this.firefly()}
};
</script>

<style lang="sass">
@import 'config-style'

.navbar-dropdown
  transition: transform .3s .5s, background 1s .5s
  position: absolute
  left: 0
  background: var(--main-color)
  transform: translateY(-100%)
  cursor: pointer
  +index($level3)
  &-item
    padding: 10px 40px
    text-align: center
    white-space: nowrap
    position: relative
    &__checked
      position: absolute
      left: 15px
    &__wrapper-arrow
      display: none
      position: absolute
      right: 10px
      top: 50%
      transform: translateY(-50%) rotate(0deg)
      width: 10px
      height: 10px
      transition: .5s
    &__wrapper
      & &-arrow
        display: block
      &:hover &-arrow
        transform: translateY(-50%) rotate(450deg)
      &:hover
        @for $i from 1 to 15
          & .navbar-subdropdown-item:nth-child(#{$i})
            animation: subdropdown .3s ease-in-out forwards
            animation-delay: $i * .2s
    &::before, &::after
      pointer-events: none
      content: ''
      display: block
      position: absolute
      top: 0
      left: 0
      z-index: -1
      -webkit-transition: opacity 0.1s linear
      transition: opacity 0.1s linear
    &::before
      width: 60px
      height: 45px
      background: -webkit-radial-gradient(center circle, #FFF 0%, transparent 60%)
      background: radial-gradient(circle at center, #FFF 0%, transparent 60%)
      opacity: 0
      mix-blend-mode: screen
      -webkit-transform: translate( calc( var(--px) * 1px ),calc( var(--py) * 1px ) ) translate(-50%, -50%)
      transform: translate( calc( var(--px) * 1px ),calc( var(--py) * 1px ) ) translate(-50%, -50%)
    &::after
      background: inherit
      margin: 2px
      top: 0
      right: 0
      bottom: 0
      left: 0
      opacity: 0
      -webkit-transition-delay: 0.05s
      transition-delay: 0.05s
    &:hover
      &::before
        opacity: .6
      &::after
        opacity: 0.85
        -webkit-transition-delay: 0s         
        transition-delay: 0s

 
.navbar-subdropdown
  display: none
  position: absolute
  left: 100%
  top: 0
  &-item
    opacity: 0

  


@keyframes subdropdown
  from 
    opacity: 0
    transform: translateX(30px) rotateY(90deg)

  to 
    opacity: 1
    transform: translateX(0) rotateY(0)
  

</style>