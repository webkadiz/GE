<template>
	<div class="wrapper">
		<input :value="computeValue" ref="colorpicker" type="text">
	</div>
	
</template>

<script>
export default {
  computed: {
		computeValue() {
			if (this.canvas && this.canvas.activeLayer) {
				console.log(this.$refs.colorpicker.value);
			setTimeout(() =>	
			$(this.$refs.colorpicker).spectrum('set', this.$refs.colorpicker.value ), 0)
        return this.canvas.activeLayer.object['fill'];
      }
      return this.$store.state.global['fill'];
		},
		...Vuex.mapState(["canvas"])
	},
  mounted() {
    let colors = [
      [
				"Transparent",
        "Black",
        "Gray",
        "white",
        "Fuchsia",
        "Purple",
        "Red",
        "Maroon",
        "Yellow",
        "Olive",
        "Lime",
        "Green",
        "Aqua",
        "Teal",
        "Blue",
        "Navy"
      ],
      ["IndianRed", "LightCoral", "Salmon", "DarkSalmon", "LightSalmon", "Crimson", "Red", "FireBrick", "DarkRed"],
      ["Pink", "LightPink", "HotPink", "DeepPink", "MediumVioletRed", "PaleVioletRed"],
      ["LightSalmon", "Coral", "Tomato", "OrangeRed", "DarkOrange", "Orange"],
      [
        "Gold",
        "Yellow",
        "LightYellow",
        "LemonChiffon",
        "LightGoldenrodYellow",
        "PapayaWhip",
        "Moccasin",
        "PeachPuff",
        "PaleGoldenrod",
        "Khaki",
        "DarkKhaki"
      ],
      [
        "Cornsilk",
        "BlanchedAlmond",
        "Bisque",
        "NavajoWhite",
        "Wheat",
        "BurlyWood",
        "Tan",
        "RosyBrown",
        "SandyBrown",
        "Goldenrod",
        "DarkGoldenRod",
        "Peru",
        "Chocolate",
        "SaddleBrown",
        "Sienna",
        "Brown",
        "Maroon"
      ],
      [
        "White",
        "Snow",
        "Honeydew",
        "MintCream",
        "Azure",
        "AliceBlue",
        "GhostWhite",
        "WhiteSmoke",
        "Seashell",
        "Beige",
        "OldLace",
        "FloralWhite",
        "Ivory",
        "AntiqueWhite",
        "Linen",
        "LavenderBlush",
        "MistyRose"
      ],
      [
        "Gainsboro",
        "LightGrey",
        "Silver",
        "DarkGray",
        "Grey",
        "DimGray",
        "LightSlateGray",
        "SlateGray",
        "DarkSlateGray",
        "Black"
      ],
      [
        "GreenYellow",
        "Chartreuse",
        "LawnGreen",
        "Lime",
        "LimeGreen",
        "PaleGreen",
        "LightGreen",
        "MediumSpringGreen",
        "SpringGreen",
        "MediumSeaGreen",
        "SeaGreen",
        "ForestGreen",
        "Green",
        "DarkGreen",
        "YellowGreen",
        "OliveDrab",
        "Olive",
        "DarkOliveGreen",
        "MediumAquamarine",
        "DarkSeaGreen",
        "LightSeaGreen",
        "DarkCyan",
        "Teal"
      ],
      [
        "Aqua",
        "Cyan",
        "LightCyan",
        "PaleTurquoise",
        "Aquamarine",
        "Turquoise",
        "MediumTurquoise",
        "DarkTurquoise",
        "CadetBlue",
        "SteelBlue",
        "LightSteelBlue",
        "PowderBlue",
        "LightBlue",
        "SkyBlue",
        "LightSkyBlue",
        "DeepSkyBlue",
        "DodgerBlue",
        "CornflowerBlue",
        "MediumSlateBlue",
        "RoyalBlue",
        "Blue",
        "MediumBlue",
        "DarkBlue",
        "Navy",
        "MidnightBlue"
      ],
      [
        "Lavender",
        "Thistle",
        "Plum",
        "Violet",
        "Orchid",
        "Fuchsia",
        "Magenta",
        "MediumOrchid",
        "MediumPurple",
        "BlueViolet",
        "DarkViolet",
        "DarkOrchid",
        "DarkMagenta",
        "Purple",
        "Indigo",
        "SlateBlue",
        "DarkSlateBlue"
      ]
    ];
    $(this.$refs.colorpicker).spectrum({
      preferredFormat: "name",
      flat: true,
      showInput: true,
      showInitial: true,
      showAlpha: true,
      chooseText: "Применить",
      cancelText: "Отменить",
      showPalette: true,
      clickoutFiresChange: false,
      allowEmpty: true,
      hideAfterPaletteSelect: true,
      togglePaletteOnly: true,
      togglePaletteMoreText: "развернуть",
      togglePaletteLessText: "свернуть",
      localStorageKey: "color-fill-stroke",
      maxSelectionSize: 10,
      palette: colors,
      change: color => {
        console.log("change", color);
        color
          ? this.$store.commit({
              type: "propUpdate",
              setting: "fill",
              tool: "global",
              newValue: color.toRgbString()
            })
          : void 0;
      }
		});

		$(".sp-palette", this.$el).append('<div class="resize-right"></div>')
		$(".sp-palette", this.$el).append('<div class="resize-bottom"></div>')

    $(".sp-palette", this.$el).niceScroll({
			autohidemode: "leave"
    });

    $(".fill-tools .sp-palette-container").prepend("<Icon icon='file'></Icon>");

    Interact(".sp-palette", this.$el).resizable({
      edges: { left: true, right: true, bottom: true, top: true },

      // keep the edges inside the parent
      restrictEdges: {
        restriction: {top: 40, left: 40, right: 100, bottom: 100}
			},

      // minimum size
      restrictSize: {
        //min: { width: 100, height: 50 }
      },

      inertia: true,
      onmove: event => {
        let target = event.target,
          x = parseFloat(target.getAttribute("data-x")) || 0,
          y = parseFloat(target.getAttribute("data-y")) || 0;

        // update the element's style
        target.style.width = event.rect.width + "px";
        target.style.height = event.rect.height + "px";

        // translate when resizing from top or left edges
        x += event.deltaRect.left;
        y += event.deltaRect.top;

        //target.style.webkitTransform = target.style.transform = "translate(" + x + "px," + y + "px)";

        target.setAttribute("data-x", x);
        target.setAttribute("data-y", y);

        $(".sp-palette", this.$el)
          .getNiceScroll()
          .resize();
      }
    });
  }
};
</script>

<style lang="sass" scoped>

.wrapper
	border-top: 1px solid var(--border-color)
	
.in-grid .wrapper
	border-bottom: 1px solid var(--border-color)



</style>
