(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{105:function(t,e,n){var o=n(215);"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);(0,n(0).default)("5921020c",o,!1,{})},106:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={components:{EnterPropTool:()=>n.e(6).then(n.bind(null,94))},data:()=>({props:{strokeLineCap:{id:1,label:"наконечник:",setting:"strokeLineCap",type:"select",options:[{label:"обрезанный",value:"butt"},{label:"круглый",value:"round"},{label:"квадратный",value:"square"}]},strokeLineJoin:{id:2,label:"соединение линий:",setting:"strokeLineJoin",type:"select",options:[{label:"bevil",value:"bevil"},{label:"круглое",value:"round"},{label:"острое",value:"miter"}]},strokeWidth:{id:5,label:"ширина границуы",setting:"strokeWidth",type:"input",number:!0}},tool:"pencil"})}},107:function(t,e,n){"use strict";n.r(e);var o=n(106),l=n.n(o);for(var r in o)"default"!==r&&function(t){n.d(e,t,function(){return o[t]})}(r);e.default=l.a},188:function(t,e,n){"use strict";var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"pencil-tools"},[t._l(["strokeLineCap","strokeLineJoin"],function(e){return n("div",{key:t.props[e].id,staticClass:"col-center"},[n("EnterPropTool",t._b({attrs:{tool:t.tool}},"EnterPropTool",t.props[e],!1))],1)}),t._v(" "),t._l([["strokeWidth"]],function(e){return n("div",{key:t.props[e[0]].id,staticClass:"col-space"},t._l(e,function(e){return n("EnterPropTool",t._b({key:e.id,attrs:{tool:t.tool}},"EnterPropTool",t.props[e],!1))}))})],2)},l=[];o._withStripped=!0,n.d(e,"a",function(){return o}),n.d(e,"b",function(){return l})},215:function(t,e,n){(t.exports=n(1)(!1)).push([t.i,"\n.col-center {\n  display: flex;\n  justify-content: center;\n}\n.col-space {\n  display: flex;\n  justify-content: space-between;\n}\n.col-around {\n  display: flex;\n  justify-content: space-around;\n}\n",""])},216:function(t,e,n){"use strict";var o=n(105);n.n(o).a},217:function(t,e,n){"use strict";n.r(e);var o=n(188),l=n(107);for(var r in l)"default"!==r&&function(t){n.d(e,t,function(){return l[t]})}(r);n(216);var i=n(2),s=Object(i.a)(l.default,o.a,o.b,!1,null,null,null);s.options.__file="src/js/components/tools/pencil-tools.vue",e.default=s.exports}}]);