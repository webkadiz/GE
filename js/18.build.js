(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{111:function(t,n,e){var o=e(221);"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);(0,e(0).default)("561eaa8d",o,!1,{})},112:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default={components:{EnterPropTool:()=>e.e(6).then(e.bind(null,94))},data:()=>({props:{fontStyle:{width:100,label:"стиль шрифта:",type:"select",options:[{label:"обычный",value:"normal"},{label:"курсивный",value:"italic"},{label:"жирный",value:"bold"}]},fontSize:{width:50,type:"input",number:!0},lineHeight:{width:50,type:"input",number:!0},charSpacing:{width:50,type:"input",number:!0},text:{width:50,label:"Текст:",type:"textarea"},underline:{width:50,type:"checkbox"},overline:{width:50,label:"overline",type:"checkbox"}},tool:"text"})}},113:function(t,n,e){"use strict";e.r(n);var o=e(112),a=e.n(o);for(var l in o)"default"!==l&&function(t){e.d(n,t,function(){return o[t]})}(l);n.default=a.a},198:function(t,n,e){"use strict";var o=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"text-tools"},t._l(t.props,function(n,o){return e("EnterPropTool",t._b({key:o,attrs:{setting:o,icon:o,tool:t.tool}},"EnterPropTool",n,!1))}))},a=[];o._withStripped=!0,e.d(n,"a",function(){return o}),e.d(n,"b",function(){return a})},221:function(t,n,e){(t.exports=e(1)(!1)).push([t.i,"\n.text-tools[data-v-0097c5ca] {\n  padding: 10px;\n  display: flex;\n  flex-wrap: wrap;\n  width: 225px;\n}\n.col-center[data-v-0097c5ca] {\n  display: flex;\n  justify-content: center;\n}\n.col-space[data-v-0097c5ca] {\n  display: flex;\n  justify-content: space-between;\n}\n.col-around[data-v-0097c5ca] {\n  display: flex;\n  justify-content: space-around;\n}\n",""])},222:function(t,n,e){"use strict";var o=e(111);e.n(o).a},223:function(t,n,e){"use strict";e.r(n);var o=e(198),a=e(113);for(var l in a)"default"!==l&&function(t){e.d(n,t,function(){return a[t]})}(l);e(222);var i=e(2),r=Object(i.a)(a.default,o.a,o.b,!1,null,"0097c5ca",null);r.options.__file="src/js/components/tools/text-tools.vue",n.default=r.exports}}]);