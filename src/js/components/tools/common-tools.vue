<template>
	<div class="tools-wrapper tools">    
    <div  :class="[{active: currentTool === tool} , 'tool','bg-anim-icon' ]"  
          @click="active(tool)" :key="index" v-for="(tool, index) in tools">
      <Icon :icon="tool.icon"></Icon>
    </div>
	</div>	
</template>

<script>
export default {
  components: {
    Casing: () => import("../casing.vue"),
    Icon: () => import("../icon.vue")
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
      self.c.discardActiveObject()
      self.c.skipTargetFind = true;
      self.c.selection = false;
      self.c.requestRenderAll();
    },
    pencil: function*() {
      //prettier-ignore
      let down, move, moveCursor, up, path, group, cursor, self = this.canvas;

      self.c.defaultCursor = "none";

      moveCursor = e => {
        let { x: left, y: top } = self.c.getPointer();
        let width, height, color, imageData;
        width = height = this.$store.state.pencil.strokeWidth;

        imageData = self.c.getContext().getImageData(self.zoom * left + width/2,self.zoom * top + height / 2, 1,1)

        if(imageData.data[0] < 50 && imageData.data[1] < 50 && imageData.data[2] < 50) {
          color = 'white'
        }
        else color = 'black';

        self.c.remove(cursor);
        cursor = new fabric.Rect({
          left,
          top,
          width: width + 0.1,
          height: height + 0.1,
          fill: "transparent",
          stroke: color,
          shadow: 'rgba(0,0,0,.3) 0 0 3px'
        });

        self.c.add(cursor);

      };

      self.c.on("mouse:move", moveCursor);

      self.c.on("mouse:out", () => {
        self.c.remove(cursor);
      });

      //prettier-ignore
      self.c.on('mouse:down', down = e => {
        let {x, y} = self.c.getPointer(), counter = 0;

        path = new fabric.Path(`M ${x} ${y} L ${x + 0.1} ${y}`, Object.assign({}, this.$store.state.global , this.$store.state.pencil, {
          strokeLineCap: 'square',
          strokeLineJoin: 'bevil'
        }));	

        self.c.add(path);
        moveCursor()      
        self.c.on('mouse:move', move = e => {
          let {x, y} = self.c.getPointer();
          
          if(!counter) {
            path.path.pop();
            counter++;
          }
          
          self.c.remove(path);

          path.path.push(['L', x , y])
      
          path = new fabric.Path(path.path, Object.assign({}, this.$store.state.global, this.$store.state.pencil, {
            strokeLineCap: 'square',
            strokeLineJoin: 'bevil'
          }))

          self.c.add(path);         
          moveCursor();
        })	
        self.c.on('mouse:up', up = e => {
          group = new fabric.Group([path])
          self.c.add(group)
          self.c.remove(path)

          self.c.off('mouse:move', move)
          self.c.off('mouse:up', up);
          moveCursor()
        })
      })

      //console.log("before yield");
      yield;
      //console.log("after yield");

      self.c.off("mouse:down", down);
      self.c.off("mouse:move", moveCursor);
      self.c.defaultCursor = "default";
    },
    brush: function*() {
      //prettier-ignore
      let down, move, moveCursor, up, path, group, cursor, self = this.canvas;

      self.c.defaultCursor = "none";

      moveCursor = e => {
        let { x: left, y: top } = self.c.getPointer();

        self.c.remove(cursor);
        cursor = new fabric.Circle({
          left,
          top,
          radius: this.$store.state.pencil.strokeWidth / 2,
          fill: "transparent",
          stroke: "grey"
        });

        self.c.add(cursor);
      };

      self.c.on("mouse:move", moveCursor);

      self.c.on("mouse:out", () => {
        self.c.remove(cursor);
      });

      //prettier-ignore
      self.c.on('mouse:down', down = e => {
        let {x, y} = self.c.getPointer(), counter = 0;

        path = new fabric.Path(`M ${x} ${y} L ${x + 0.1} ${y}`, Object.assign({}, this.$store.state.global, this.$store.state.pencil, {
          strokeLineCap: 'round',
          strokeLineJoin: 'round'
        }));	

        self.c.add(path);

        moveCursor()     
        self.c.on('mouse:move', move = e => {
          let {x, y} = self.c.getPointer();
          
          if(!counter) {
            path.path.pop();
            counter++;
          }
          
          self.c.remove(path);

          path.path.push(['L', x , y])
      
          path = new fabric.Path(path.path, Object.assign({}, this.$store.state.global, this.$store.state.pencil, {
            strokeLineCap: 'round',
            strokeLineJoin: 'round'
          }))

          self.c.add(path);          
          moveCursor();
        })	
        self.c.on('mouse:up', up = e => {
          group = new fabric.Group([path])
          self.c.add(group)
          self.c.remove(path)

          self.c.off('mouse:move', move)
          self.c.off('mouse:up', up);
          moveCursor()
        })
      })

      //console.log("before yield");
      yield;
      //console.log("after yield");

      self.c.off("mouse:down", down);
      self.c.off("mouse:move", moveCursor);
      self.c.defaultCursor = "default";
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
      //prettier-ignore
      let down, move, moveCursor, up, path, group, cursor, self = this.canvas;

      self.c.defaultCursor = "none";

      moveCursor = e => {
        let { x: left, y: top } = self.c.getPointer();

        self.c.remove(cursor);
        cursor = new fabric.Circle({
          left,
          top,
          radius: this.$store.state.pencil.strokeWidth / 2,
          fill: "transparent",
          stroke: "grey"
        });

        self.c.add(cursor);
      };

      self.c.on("mouse:move", moveCursor);

      self.c.on("mouse:out", () => {
        self.c.remove(cursor);
      });

      //prettier-ignore
      self.c.on('mouse:down', down = e => {
        let {x, y} = self.c.getPointer(), counter = 0;

        path = new fabric.Path(`M ${x} ${y} L ${x + 0.1} ${y}`, Object.assign({}, this.$store.state.pencil, {
          fill: 'transparent',
          globalCompositeOperation: 'destination-out'
        }));	

        self.activeLayer.group.addWithUpdate(path);
        moveCursor()      
        self.c.on('mouse:move', move = e => {
          let {x, y} = self.c.getPointer();
          
          if(!counter) {
            path.path.pop();
            counter++;
          }
          
          self.activeLayer.group.remove(path);

          path.path.push(['L', x , y])
      
          path = new fabric.Path(path.path, Object.assign({}, this.$store.state.pencil, {
            fill: 'transparent',
            globalCompositeOperation: 'destination-out'
          }))

          self.activeLayer.group.addWithUpdate(path);
          
          moveCursor();
        })	
        self.c.on('mouse:up', up = e => {
          self.c.off('mouse:move', move)
          self.c.off('mouse:up', up);
          moveCursor();
        })
      })

      //console.log("before yield");
      yield;
      //console.log("after yield");

      self.c.off("mouse:down", down);
      self.c.off("mouse:move", moveCursor);
      self.c.defaultCursor = "default";
    },
    square: function*() {
      //prettier-ignore
      let up, down, move, rect, group, self = this.canvas;
      //prettier-ignore
      self.c.on("mouse:down", down = e => {
        let { x: left, y: top } = self.c.getPointer();

        rect = new fabric.Rect(Object.assign({}, this.$store.state.global, this.$store.state.square, {
          left,
          top
        }));

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

        line = new fabric.Line([x, y, x, y], Object.assign({}, this.$store.state.global, {
          strokeWidth: 5,
          stroke: 'black'
        }));

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
    },
    zoomIn: function*() {
      let up, self = this.canvas

      self.c.on('mouse:up', up = e => {
        this.$store.commit({type: 'setZoom', zoom: self.zoom + 0.2, point: self.c.getPointer()})
      })

      yield;

      self.c.off('mouse:up', up)
    },
    zoomOut: function*() {
      let up, self = this.canvas;

      self.c.on('mouse:up', up = e => {
        this.$store.commit({type: 'setZoom', zoom: self.zoom - 0.2, point: self.c.getPointer()})
      })

      yield;

      self.c.off('mouse:up', up)
    },
  },
  updated() {},
  data() {
    return {
      tools: [
        { icon: "move", connector: "move", event: this.move, isActive: false },
        { icon: "pencil1", connector: "pencil", event: this.pencil, isActive: false },
        { icon: "brush", connector: "brush", event: this.brush, isActive: false },
        { icon: "text", connector: "text", event: this.text, isActive: false },
        { icon: "pouring", connector: "pouring", event: this.rubber, isActive: false },
        { icon: "eraser", connector: "eraser", event: this.eraser, isActive: false },
        { icon: "square", connector: "square", event: this.square, isActive: false },
        { icon: "line", connector: "line", event: this.line, isActive: false},
        { icon: "zoom-in", connector: "zoom", event: this.zoomIn, isActive: false},
        { icon: "zoom-out", connector: "zoom", event: this.zoomOut, isActive: false }
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
  background: var(--main-color)
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
    background: var(--bg-color)    
.tool.active 
  background: var(--bg-color)


</style>
