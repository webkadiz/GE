<template>
	<div class="tools-wrapper tools">    
    <div  :class="[{active: activeTool === tool} , 'tool','bg-anim-icon' ]"  
          @click="active(tool)" :key="index" v-for="(tool, index) in tools">
      <Icon :icon="tool"></Icon>
    </div>
    <div class="tool swap-color">
      <input type="text" ref="foreground">
      <input type="text" ref="background">
      <div @click="swapColor" class="swap-color__icon"><Icon icon="swap-color"></Icon></div>
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
    },
    ...Vuex.mapState(['activeTool'])
  },
  mounted() {
    bus.$on("toolEventActive", this.active); // из app.js canvasActive

    let spectrum = {
      preferredFormat: "name",
      showInput: true,
      showButtons: false,
      showAlpha: true
    };
    $(this.$refs.foreground).spectrum({
      color: "black",
      replacerClassName: "common-tools__foreground-replacer common-tools__colorpicker-replacer",
      ...spectrum
    });
    $(this.$refs.foreground).on('dragstop.spectrum', color => {
      this.updateColor($(this.$refs.foreground).spectrum('get'));
    })

    $(this.$refs.background).spectrum({
      color: "white",
      replacerClassName: "common-tools__background-replacer common-tools__colorpicker-replacer",
      ...spectrum
    });
  },
  methods: {
    active(tool) {
      if (this.generator) {
        this.generator.next();
      }

      if (tool) {
        this.$store.state.activeTool = tool;
        this.updateColor($(this.$refs.foreground).spectrum("get"));
      }

      if (this.canvas && this.activeTool) {
        this.generator = this[this.activeTool]();
        this.generator.next();
      }
    },
    updateColor(color) {
      let tool =  this.activeTool, mode;

      if (tool === "pencil" || tool === "brush" || tool === "line") {
        mode = "stroke";
      } else mode = "fill";
      this.$store.commit({
        type: "propUpdate",
        tool: "global",
        setting: mode,
        newValue: tinycolor(color).toRgbString(),
        onlyGlobal: true
      });
    },
    swapColor() {
      let tempColor = $(this.$refs.foreground).spectrum("get");
      $(this.$refs.foreground).spectrum("set", $(this.$refs.background).spectrum("get"));
      $(this.$refs.background).spectrum("set", tempColor);
      this.updateColor($(this.$refs.foreground).spectrum("get"));
    },
    add(object, type) {
      let group;

      if(this.canvas.activeLayer && this.canvas.activeLayer.type === 'empty') {
        this.canvas.activeLayer.group.addWithUpdate(object)
        this.canvas.activeLayer.object = object
        this.canvas.activeLayer.type = type
        this.c.remove(object)
        return;
      }

      group = new fabric.Group([object], {
        hasControls: false,

      })
      group.layer = true;
      group.type = type
      this.c.add(group)
      this.c.remove(object)
    },
    move: function*() {
      let self = this.canvas;

      self.c.selection = true;
      self.c.skipTargetFind = false;

      self.c.setActiveObject(self.activeLayer.group);

      self.c.forEachObject(object => {
        object.hasControls = true
        object.set({
          cornerStrokeColor: 'white',
          cornerStyle: 'circle',
          cornerSize: 5,
          transparentCorners: false
        })
      })

      self.c.requestRenderAll();

      yield;
      self.c.skipTargetFind = true;
      self.c.selection = false;

      self.c.forEachObject(object => {
        object.hasControls = false
      })

      self.c.setActiveObject(self.activeLayer.group)

      self.c.requestRenderAll();
    },
    pencil: function*() {
      //prettier-ignore
      let down, move, moveCursor, up, path, group, cursor, self = this.canvas;

      self.c.defaultCursor = "none";

      moveCursor = e => {
        let { x: left, y: top } = self.c.getPointer();
        let { x, y } = self.c.getPointer(null, true);
        let width, height, color, imageData;
        width = height = this.$store.state.pencil.strokeWidth;

        imageData = self.c.getContext().getImageData(x + width / 2, y + height / 2, 1, 1);

        if (imageData.data[0] < 50 && imageData.data[1] < 50 && imageData.data[2] < 50) {
          color = "white";
        } else color = "black";

        self.c.remove(cursor);
        cursor = new fabric.Rect({
          left: left - 1,
          top: top - 1,
          width: width + 1,
          height: height + 1,
          fill: "transparent",
          stroke: color,
          strokeWidth: 1
          //shadow: 'rgba(0,0,0,.3) 0 0 3px'
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
            strokeLineJoin: 'bevil',
          }))

          self.c.add(path);         
          moveCursor();
        })	
        self.c.on('mouse:up', up = e => {
          this.add(path, 'pencil')

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
      //#567cc9

      moveCursor = e => {
        let { x: left, y: top } = self.c.getPointer();

        self.c.remove(cursor);
        cursor = new fabric.Circle({
          left: left - 1,
          top: top - 1,
          radius: this.$store.state.pencil.strokeWidth / 2 + 0.5,
          fill: "transparent",
          stroke: "black",
          strokeWidth: 1,
          shadow: 'rgba(255,255,255,1) 0 0 1px'
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
          this.add(path, 'brush')

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

        group.type = 'text'
        self.c.add(group);
        text.enterEditing();
      })

      yield;

      if (text) text.exitEditing();
      self.c.off("mouse:up", up);
    },
    pouring: function*() {
      let up,
        self = this.canvas;
      //prettier-ignore
      self.c.on('mouse:up', up = e => {
        if(e.button === 1 || e.button === 3) {
          let {x, y} = self.c.getPointer(), colorClick,  colorFill, whereClick, fill, stroke;
          colorFill = e.button === 1 
            ? $(this.$refs.foreground).spectrum('get').toRgbString()
            : $(this.$refs.background).spectrum('get').toRgbString()
  
          for(let object of self.c.getObjects().slice().reverse()) {
            if(object.containsPoint({x, y}) && !self.c.isTargetTransparent(object, x, y)) {
              colorClick = self.c.getPixel();
              fill       = tinycolor(object.object.fill).toRgb();
              stroke     = tinycolor(object.object.stroke).toRgb();
              whereClick = _.isEqual(colorClick, fill) 
                ? 'fill' 
                : _.isEqual(colorClick,stroke) ? 'stroke' : fill.a === 0 ? 'stroke' : 'fill'
  
              
              object.object.set(whereClick, colorFill)
              self.c.requestRenderAll()
              break;
            }
          }
        }
      })

      yield;

      self.c.off("mouse:up", up);
    },
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
          stroke: 'black',
          globalCompositeOperation: 'destination-out'
        }));	

        console.log(path);

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
            stroke: 'black',
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

        self.c.add(rect)

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

          console.log(rect.left, rect.top, rect.width, rect.height);

          self.c.requestRenderAll();
        })
          

        self.c.on("mouse:up", up = e => {
          this.add(rect, 'square')

          self.c.off("mouse:move", move);
          self.c.off("mouse:up", up);
        })
        
      })

      yield;

      self.c.off("mouse:down", down);
    },
    line: function*() {
      //prettier-ignore
      let down, move, up, line, group, self = this.canvas;
      //prettier-ignore
      self.c.on("mouse:down", down = e => {
        let { x, y } = self.c.getPointer();

        line = new fabric.Line([x, y, x, y], Object.assign({}, this.$store.state.global, {
          strokeWidth: 1,
          stroke: 'black'
        }));

        self.c.add(line)

        self.c.on("mouse:move", move = e => {
          ({ x, y } = self.c.getPointer());

          line.set({ x2: x, y2: y });

          self.c.requestRenderAll();
        })   

        self.c.on("mouse:up", up = e => {
          this.add(line, 'lines')

          self.c.off("mouse:move", move);
          self.c.off("mouse:up", up);
        });
      })

      yield;

      self.c.off("mouse:down", down);
    },
    zoomIn: function*() {
      let up,
        self = this.canvas;

      self.c.on(
        "mouse:up",
        (up = e => {
          this.$store.commit({ type: "setZoom", zoom: self.zoom + 0.2, point: self.c.getPointer() });
        })
      );

      yield;

      self.c.off("mouse:up", up);
    },
    zoomOut: function*() {
      let up,
        self = this.canvas;

      self.c.on(
        "mouse:up",
        (up = e => {
          this.$store.commit({ type: "setZoom", zoom: self.zoom - 0.2, point: self.c.getPointer() });
        })
      );

      yield;

      self.c.off("mouse:up", up);
    }
  },
  updated() {},
  data() {
    return {
      tools: [
        'move',
        'pencil',
        'brush',
        'text',
        'pouring',
        'eraser',
        'square',
        'line',
        'zoomIn',
        'zoomOut'
      ],
      generator: null
    };
  }
};
</script>

<style lang="sass" scoped>
@import 'config-style'

.tools-wrapper
  flex-shrink: 0
  z-index: 1000
  background: var(--main-color)
  display: flex
  flex-wrap: wrap
  justify-content: center
  align-content: flex-start
  width: 40px
  transition: opacity .8s

.tool
  width: 100%
  height: 40px
  display: flex
  align-items: center
  justify-content: center
  cursor: pointer
  svg
    width: 19px
    height: 19px
.tool.active 
  background: var(--bg-color)

.swap-color
  position: relative
  &__icon  
    width: 10px
    height: 10px
    position: absolute
    right: 10%
    top: 10%
    display: flex
    transform: rotate(90deg)
    svg
      width: 100%
      height: 100%

</style>
