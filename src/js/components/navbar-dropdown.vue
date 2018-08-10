<template>
	<div  class="menu-dropdown">
		<div class="menu-dropdown-item" @click="isOpen(dropdown)"
				 v-for="(dropdown, index) in dropdownList" :key="index">
      <Icon v-if="isActive(dropdown)" icon="checked"></Icon>
			{{dropdown.title}}

      <div class="menu-subdropdown">    
        <div  class="menu-dropdown-item menu-subdropdown-item"  
              v-if="dropdown.type === 'dropdown'" @click="isOpen(subdropdown)"
              v-for="(subdropdown, index) in dropdown.subdropdown" :key="index">
          <Icon v-if="isActive(subdropdown)" icon="checked"></Icon>
          {{subdropdown.title}}
        </div>

      </div>			
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
        this.$store.commit("openHeaderDropdownItem", dropdown.event)
      else if(dropdown.type === 'apply') 
        this.$store.commit(dropdown.event, dropdown.value);
    },
    firefly() {
      Array.from(this.$el.querySelectorAll(".menu-dropdown-item"), function(el) {
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

.menu-dropdown
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
    svg
      position: absolute
      left: 15px
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

 
.menu-subdropdown
  display: none
  position: absolute
  left: 100%
  top: 0
  &-item
    opacity: 0
.menu-dropdown-item:hover
  @for $i from 1 to 15
    & .menu-subdropdown-item:nth-child(#{$i})
      animation: subdropdown .3s ease-in-out forwards
      animation-delay: $i * .2s
      @debug $i * .2s


@keyframes subdropdown
  from 
    opacity: 0
    transform: translateX(30px) rotateY(90deg)

  to 
    opacity: 1
    transform: translateX(0) rotateY(0)
  

</style>