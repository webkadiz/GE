<template>
	<div>
		<div v-if="!LeftNot" class="casing casing-left"></div>
		<div v-if="!RightNot" class="casing casing-right"></div>
		<div v-if="!BottomNot" class="casing casing-bottom"></div>
		<div v-if="!TopNot" class="casing casing-top"></div>	
	</div>		
</template>

<script>
export default {
  props: ["TopNot", "BottomNot", "LeftNot", "RightNot"],
  mounted() {
    $(".casing", this.$el).unwrap();

    Interact(".casing").dropzone({
			max: Infinity,
			maxPerElement: Infinity,
      accept: ".grid-item",
      ondrop: event => {
        //prettier-ignore
        let el                = event.relatedTarget, 
            dropzone          = event.target,
            component         = el.getAttribute("data-component"),
            dropzoneComponent = dropzone.parentElement.getAttribute("data-component"),
						flagPlace, flagGrid;
        
        if (dropzone.classList.contains("casing-right")) [flagPlace, flagGrid] = [1, "COL"];
        else if (dropzone.classList.contains("casing-left")) [flagPlace, flagGrid] = [0, "COL"];
        else if (dropzone.classList.contains("casing-bottom")) [flagPlace, flagGrid] = [1, "ROW"];
				else if (dropzone.classList.contains("casing-top")) [flagPlace, flagGrid] = [0, "ROW"];
        
        this.$store.commit({
          type: "loopGrid",
          component, dropzoneComponent, flagPlace, flagGrid
        });

				$(el).css({ opacity: "1", transform: "translate(0, 0)" });
      },
      ondragenter : e => e.relatedTarget.style.opacity = ".5",
      ondragleave: e => e.relatedTarget.style.opacity = "1"     
    });
  } 
};
</script>

<style lang="sass">
@import 'config-style'

.casing
	z-index: $levelNeg
	position: absolute
	opacity: 0
	box-shadow: 0 0 80px 5px blue		
	background: rgba(blue , .4)
	transition: .8s .2s
	&-left
		left: 0
		top: 0
		width: 10px
		height: 100%
	&-right
		right: 0
		top: 0
		width: 10px
		height: 100%
	&-top
		left: 0
		top: 0
		width: 100%
		height: 10px
	&-bottom
		left: 0
		bottom: 0
		width: 100%
		height: 10px		
.casing:hover
	opacity: 1

</style>
