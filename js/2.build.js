(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{146:function(n,t,e){var o=e(253);"string"==typeof o&&(o=[[n.i,o,""]]),o.locals&&(n.exports=o.locals);(0,e(0).default)("69e76098",o,!1,{})},167:function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={components:{Icon:()=>e.e(5).then(e.bind(null,93)),EnterPropTool:()=>e.e(6).then(e.bind(null,94))},computed:Vuex.mapState(["activeTool"]),props:["fields","tool"],mounted(){console.log(this.fields,this.id)},date:()=>({})}},168:function(n,t,e){"use strict";e.r(t);var o=e(167),i=e.n(o);for(var l in o)"default"!==l&&function(n){e.d(t,n,function(){return o[n]})}(l);t.default=i.a},203:function(n,t,e){"use strict";var o=function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("div",{staticClass:"toolbar-item"},[e("div",{staticClass:"toolbar-item__icon"},[e("Icon",{attrs:{icon:n.tool}})],1),n._v(" "),n._l(n.fields,function(t,o){return e("EnterPropTool",n._b({key:o,attrs:{onlyGlobal:!0,setting:o,tool:n.tool,icon:o}},"EnterPropTool",t,!1))})],2)},i=[];o._withStripped=!0,e.d(t,"a",function(){return o}),e.d(t,"b",function(){return i})},253:function(n,t,e){(n.exports=e(1)(!1)).push([n.i,'\n.toolbar-item {\n  display: flex;\n  align-items: center;\n}\n.toolbar-item__icon {\n    margin: 0 15px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n}\n.toolbar-item label {\n    margin-left: 10px;\n    display: flex;\n    align-items: center;\n    color: var(--label-color);\n}\n.toolbar-item input[type="color"] {\n    background: transparent;\n    width: 40px;\n    height: 25px;\n    padding: 0;\n}\n.toolbar-item > label {\n  display: flex;\n  align-items: center;\n}\n',""])},254:function(n,t,e){"use strict";var o=e(146);e.n(o).a},91:function(n,t,e){"use strict";e.r(t);var o=e(203),i=e(168);for(var l in i)"default"!==l&&function(n){e.d(t,n,function(){return i[n]})}(l);e(254);var r=e(2),a=Object(r.a)(i.default,o.a,o.b,!1,null,null,null);a.options.__file="src/js/components/toolbar-item.vue",t.default=a.exports}}]);