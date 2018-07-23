<template>
	<div class="tools-wrapper">    
    <div :class="[{active: currentTool === tool} , 'tool','bg-anim-icon' ]"  @click="active(tool)" :key="index" v-for="(tool, index) in tools">
      <img :src="'img/' + tool.img" alt="" />
    </div>
	</div>	
</template>

<script>
export default {
  components: {
    Casing: () => import("../casing.vue")
  },
  computed: {
    canvas() {
      return this.$store.state.canvas;
    },
    c() {
      return this.$store.state.canvas.c;
    }
  },
  mounted() {
    bus.$on("toolEventActive", this.active);
  },
  methods: {
    active(tool) {
      if (this.generator) {
        this.generator.next();
      }

      if (tool) {
        this.currentTool = tool;
        bus.$emit("toolActive", this.currentTool.connector); //обработчик в panel-header-tools
      }

      if (this.canvas && this.currentTool) {
        this.generator = this.currentTool.event();
        this.generator.next();
      }
    },
    move: function*() {
      let self = this.canvas;

      self.c.selection = true;
      self.c.skipTargetFind = false;

      self.c.renderAll();

      yield;

      self.c.skipTargetFind = true;
      self.c.selection = false;
    },
    pencil: function*() {
      let down, move, up, path, group, self = this.canvas;
      //prettier-ignore
      self.c.on('mouse:down', down = e => {
        let {x ,y} = self.c.getPointer()

        path = new fabric.Path(`M ${x} ${y}`, this.$store.state.pencil);	

        self.c.add(path)

        self.c.on('mouse:move', move = e => {
          ({x ,y} = self.c.getPointer());
          
          self.c.remove(path);
      
          path = new fabric.Path(path.path, this.$store.state.pencil)

          path.path.push(['L', x, y])

          self.c.add(path);
        })	
        self.c.on('mouse:up', up = e => {
          group = new fabric.Group([path])
          self.c.add(group)
          self.c.remove(path)

          self.c.off('mouse:move', move)
          self.c.off('mouse:up', up);
        })
      }) 

      //console.log("before yield");
      yield;
      //console.log("after yield");

      self.c.off('mouse:down', down);
    },
    text: function*() {
      //prettier-ignore
      let text, up, group, self = this.canvas;
      //prettier-ignore
      self.c.on("mouse:up",up = e => {
        let { x, y } = self.c.getPointer();

        if (text) text.exitEditing();

        Object.assign(this.$store.state.text, {
          left: x,
          top: y
        });

        text = new fabric.IText("", this.$store.state.text);
        group = new fabric.Group([text])

        text.on('changed', () => group.addWithUpdate());

        self.c.add(group);
        text.enterEditing();
      })

      //console.log("before yield");
      yield;
      //console.log("after yield");

      if (text) text.exitEditing();
      self.c.off("mouse:up", up);
    },
    pouring: function*() {},
    eraser: function*() {
      let self = this.canvas;

      self.c.globalCompositeOperation = "destination-out";
      self.c.isDrawingMode = true;
      self.c.freeDrawingBrush.width = 12;
      self.c.freeDrawingBrush.color = "rgba(0,0,0,0)";

      //console.log("before yield");
      yield;
      //console.log("after yield");

      self.c.isDrawingMode = false;
    },
    square: function*() {
      //prettier-ignore
      let up, down, move, rect, group, self = this.canvas;
      //prettier-ignore
      self.c.on("mouse:down", down = e => {
        let { x: left, y: top } = self.c.getPointer();

        Object.assign(this.$store.state.square, {
          left,
          top
        });

        rect = new fabric.Rect(this.$store.state.square);

        self.c.on("mouse:move", move = e => {
          let { x, y } = self.c.getPointer(),
              width    = Math.abs(x - left),
              height   = Math.abs(y - top);

          if (x < left && y < top) {
            rect.scaleX = -1;
            rect.scaleY = -1;
          } else if (x < left) {
            rect.scaleX = -1;
            rect.scaleY = 1;
          } else if (y < top) {
            rect.scaleY = -1;
            rect.scaleX = 1;
          } else {
            rect.scaleX = 1;
            rect.scaleY = 1;
          }

          rect.set({ width, height });

          self.c.renderAll();

          rect.render(self.c.getContext());
        })
          

        self.c.on("mouse:up", up = e => {
            group = new fabric.Group([rect]);
            self.c.add(group);

            self.c.off("mouse:move", move);
            self.c.off("mouse:up", up);
        })
        
      })

      //console.log("before yield");
      yield;
      //console.log("after yield");

      self.c.off("mouse:down", down);
    },
    line: function*() {
      //prettier-ignore
      let down, move, up, line, group, self = this.canvas;
      //prettier-ignore
      self.c.on("mouse:down", down = e => {
        let { x, y } = self.c.getPointer();

        line = new fabric.Line([x, y, x, y], {
          strokeWidth: 5,
          stroke: 'black'
        });

        self.c.on("mouse:move", move = e => {
          ({ x, y } = self.c.getPointer());

          line.set({ x2: x, y2: y });

          self.c.renderAll();

          line.render(self.c.getContext());
        })
        

        self.c.on("mouse:up", up = e => {
          group = new fabric.Group([line])
          self.c.add(group);

          self.c.off("mouse:move", move);
          self.c.off("mouse:up", up);
        });
      })

      yield;

      self.c.off("mouse:down", down);
    }
  },
  updated() {},
  data() {
    return {
      tools: [
        { img: "move.png", connector: "move", event: this.move, isActive: false },
        { img: "pencil.png", connector: "pencil", event: this.pencil, isActive: false },
        { img: "text.png", connector: "text", event: this.text, isActive: false },
        { img: "paint-bucket.png", connector: "pouring", event: this.rubber, isActive: false },
        { img: "eraser.png", connector: "eraser", event: this.eraser, isActive: false },
        { img: "square.png", connector: "square", event: this.square, isActive: false },
        { img: "line.png", connector: "line", event: this.line, isActive: false }
      ],
      currentTool: null,
      generator: null
    };
  }
};
</script>

<style lang="sass" scoped>
@import '../../../sass/_help'

.tools-wrapper
  flex-shrink: 0
  z-index: 1000
  background: $main-color
  display: flex
  flex-wrap: wrap
  justify-content: center
  align-content: flex-start
  width: 32px
  transition: opacity .8s

.tool
  width: 100%
  height: 32px
  display: flex
  align-items: center
  justify-content: center
  cursor: pointer
  &:hover
    background: $bg-color    
.tool.active 
  background: $bg-color


</style>
