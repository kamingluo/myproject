(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4c2e3b70"],{1294:function(t,e,n){"use strict";var i=n("b2f5"),s=n("2d43")(2);i(i.P+i.F*!n("119c")([].filter,!0),"Array",{filter:function(t){return s(this,t,arguments[1])}})},"1f98":function(t,e,n){"use strict";var i=n("f425"),s=RegExp.prototype.exec,r=String.prototype.replace,a=s,o="lastIndex",l=function(){var t=/a/,e=/b*/g;return s.call(t,"a"),s.call(e,"a"),0!==t[o]||0!==e[o]}(),c=void 0!==/()??/.exec("")[1],u=l||c;u&&(a=function(t){var e,n,a,u,d=this;return c&&(n=new RegExp("^"+d.source+"$(?!\\s)",i.call(d))),l&&(e=d[o]),a=s.call(d,t),l&&a&&(d[o]=d.global?a.index+a[0].length:e),c&&a&&a.length>1&&r.call(a[0],n,function(){for(u=1;u<arguments.length-2;u++)void 0===arguments[u]&&(a[u]=void 0)}),a}),t.exports=a},"2d43":function(t,e,n){var i=n("01f5"),s=n("6462"),r=n("db4b"),a=n("b146"),o=n("5824");t.exports=function(t,e){var n=1==t,l=2==t,c=3==t,u=4==t,d=6==t,f=5==t||d,h=e||o;return function(e,o,p){for(var v,m,g=r(e),b=s(g),x=i(o,p,3),w=a(b.length),C=0,_=n?h(e,w):l?h(e,0):void 0;w>C;C++)if((f||C in b)&&(v=b[C],m=x(v,C,g),t))if(n)_[C]=m;else if(m)switch(t){case 3:return!0;case 5:return v;case 6:return C;case 2:_.push(v)}else if(u)return!1;return d?-1:c||u?u:_}}},"2f03":function(t,e,n){var i=n("c481"),s=n("f01a");t.exports=function(t){return function(e,n){var r,a,o=String(s(e)),l=i(n),c=o.length;return l<0||l>=c?t?"":void 0:(r=o.charCodeAt(l),r<55296||r>56319||l+1===c||(a=o.charCodeAt(l+1))<56320||a>57343?t?o.charAt(l):r:t?o.slice(l,l+2):a-56320+(r-55296<<10)+65536)}}},"34a3":function(t,e,n){"use strict";var i=n("a013"),s=n("db4b"),r=n("b146"),a=n("c481"),o=n("b0f4"),l=n("35dd"),c=Math.max,u=Math.min,d=Math.floor,f=/\$([$&`']|\d\d?|<[^>]*>)/g,h=/\$([$&`']|\d\d?)/g,p=function(t){return void 0===t?t:String(t)};n("629c")("replace",2,function(t,e,n,v){return[function(i,s){var r=t(this),a=void 0==i?void 0:i[e];return void 0!==a?a.call(i,r,s):n.call(String(r),i,s)},function(t,e){var s=v(n,t,this,e);if(s.done)return s.value;var d=i(t),f=String(this),h="function"===typeof e;h||(e=String(e));var g=d.global;if(g){var b=d.unicode;d.lastIndex=0}var x=[];while(1){var w=l(d,f);if(null===w)break;if(x.push(w),!g)break;var C=String(w[0]);""===C&&(d.lastIndex=o(f,r(d.lastIndex),b))}for(var _="",y=0,k=0;k<x.length;k++){w=x[k];for(var $=String(w[0]),S=c(u(a(w.index),f.length),0),F=[],E=1;E<w.length;E++)F.push(p(w[E]));var L=w.groups;if(h){var A=[$].concat(F,S,f);void 0!==L&&A.push(L);var R=String(e.apply(void 0,A))}else R=m($,f,S,F,L,e);S>=y&&(_+=f.slice(y,S)+R,y=S+$.length)}return _+f.slice(y)}];function m(t,e,i,r,a,o){var l=i+t.length,c=r.length,u=h;return void 0!==a&&(a=s(a),u=f),n.call(o,u,function(n,s){var o;switch(s.charAt(0)){case"$":return"$";case"&":return t;case"`":return e.slice(0,i);case"'":return e.slice(l);case"<":o=a[s.slice(1,-1)];break;default:var u=+s;if(0===u)return n;if(u>c){var f=d(u/10);return 0===f?n:f<=c?void 0===r[f-1]?s.charAt(1):r[f-1]+s.charAt(1):n}o=r[u-1]}return void 0===o?"":o})}})},"35dd":function(t,e,n){"use strict";var i=n("4819"),s=RegExp.prototype.exec;t.exports=function(t,e){var n=t.exec;if("function"===typeof n){var r=n.call(t,e);if("object"!==typeof r)throw new TypeError("RegExp exec method returned something other than an Object or null");return r}if("RegExp"!==i(t))throw new TypeError("RegExp#exec called on incompatible receiver");return s.call(t,e)}},"3a59":function(t,e,n){"use strict";var i=n("1f98");n("b2f5")({target:"RegExp",proto:!0,forced:i!==/./.exec},{exec:i})},4072:function(t,e,n){"use strict";var i=n("b72b"),s=n.n(i);s.a},5824:function(t,e,n){var i=n("f691");t.exports=function(t,e){return new(i(t))(e)}},"5bd0":function(t,e,n){},"629c":function(t,e,n){"use strict";n("3a59");var i=n("e5ef"),s=n("743d"),r=n("b6f1"),a=n("f01a"),o=n("8b37"),l=n("1f98"),c=o("species"),u=!r(function(){var t=/./;return t.exec=function(){var t=[];return t.groups={a:"7"},t},"7"!=="".replace(t,"$<a>")}),d=function(){var t=/(?:)/,e=t.exec;t.exec=function(){return e.apply(this,arguments)};var n="ab".split(t);return 2===n.length&&"a"===n[0]&&"b"===n[1]}();t.exports=function(t,e,n){var f=o(t),h=!r(function(){var e={};return e[f]=function(){return 7},7!=""[t](e)}),p=h?!r(function(){var e=!1,n=/a/;return n.exec=function(){return e=!0,null},"split"===t&&(n.constructor={},n.constructor[c]=function(){return n}),n[f](""),!e}):void 0;if(!h||!p||"replace"===t&&!u||"split"===t&&!d){var v=/./[f],m=n(a,f,""[t],function(t,e,n,i,s){return e.exec===l?h&&!s?{done:!0,value:v.call(e,n,i)}:{done:!0,value:t.call(n,e,i)}:{done:!1}}),g=m[0],b=m[1];i(String.prototype,t,g),s(RegExp.prototype,f,2==e?function(t,e){return b.call(t,this,e)}:function(t){return b.call(t,this)})}}},7364:function(t,e,n){var i=n("ddf7").f,s=Function.prototype,r=/^\s*function ([^ (]*)/,a="name";a in s||n("dad2")&&i(s,a,{configurable:!0,get:function(){try{return(""+this).match(r)[1]}catch(t){return""}}})},"7ed4":function(t,e,n){"use strict";var i=n("eaf6"),s=new i["default"];e["a"]=s},b0d8:function(t,e,n){"use strict";var i=n("b2f5"),s=n("2d43")(3);i(i.P+i.F*!n("119c")([].some,!0),"Array",{some:function(t){return s(this,t,arguments[1])}})},b0f4:function(t,e,n){"use strict";var i=n("2f03")(!0);t.exports=function(t,e,n){return e+(n?i(t,e).length:1)}},b592:function(t,e,n){"use strict";var i=n("e558"),s=n.n(i);s.a},b5b8:function(t,e,n){var i=n("94ac");t.exports=Array.isArray||function(t){return"Array"==i(t)}},b72b:function(t,e,n){},bfe9:function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"wrapper"},[n("v-head"),n("v-sidebar"),n("div",{staticClass:"content-box",class:{"content-collapse":t.collapse}},[n("v-tags"),n("div",{staticClass:"content"},[n("transition",{attrs:{name:"move",mode:"out-in"}},[n("keep-alive",{attrs:{include:t.tagsList}},[n("router-view")],1)],1)],1)],1)],1)},s=[],r=(n("7364"),function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"header"},[n("div",{staticClass:"collapse-btn",on:{click:t.collapseChage}},[n("i",{staticClass:"el-icon-menu"})]),n("div",{staticClass:"logo"},[t._v("一点好玩后台管理系统")]),n("div",{staticClass:"header-right"},[n("div",{staticClass:"header-user-con"},[n("div",{staticClass:"btn-fullscreen",on:{click:t.handleFullScreen}},[n("el-tooltip",{attrs:{effect:"dark",content:t.fullscreen?"取消全屏":"全屏",placement:"bottom"}},[n("i",{staticClass:"el-icon-rank"})])],1),n("div",{staticClass:"btn-bell"},[n("el-tooltip",{attrs:{effect:"dark",content:t.message?"有"+t.message+"条未读消息":"消息中心",placement:"bottom"}},[n("router-link",{attrs:{to:"/tabs"}},[n("i",{staticClass:"el-icon-bell"})])],1),t.message?n("span",{staticClass:"btn-bell-badge"}):t._e()],1),t._m(0),n("el-dropdown",{staticClass:"user-name",attrs:{trigger:"click"},on:{command:t.handleCommand}},[n("span",{staticClass:"el-dropdown-link"},[t._v("\n                    "+t._s(t.username)+" "),n("i",{staticClass:"el-icon-caret-bottom"})]),n("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[n("el-dropdown-item",{attrs:{divided:"",command:"loginout"}},[t._v("退出登录")])],1)],1)],1)])])}),a=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"user-avator"},[i("img",{attrs:{src:n("da26")}})])}],o=n("7ed4"),l={data:function(){return{collapse:!1,fullscreen:!1,name:"linxin",message:2}},computed:{username:function(){var t=localStorage.getItem("ms_username");return t||this.name}},methods:{handleCommand:function(t){"loginout"==t&&(localStorage.removeItem("ms_username"),this.$router.push("/login"))},collapseChage:function(){this.collapse=!this.collapse,o["a"].$emit("collapse",this.collapse)},handleFullScreen:function(){var t=document.documentElement;this.fullscreen?document.exitFullscreen?document.exitFullscreen():document.webkitCancelFullScreen?document.webkitCancelFullScreen():document.mozCancelFullScreen?document.mozCancelFullScreen():document.msExitFullscreen&&document.msExitFullscreen():t.requestFullscreen?t.requestFullscreen():t.webkitRequestFullScreen?t.webkitRequestFullScreen():t.mozRequestFullScreen?t.mozRequestFullScreen():t.msRequestFullscreen&&t.msRequestFullscreen(),this.fullscreen=!this.fullscreen}},mounted:function(){document.body.clientWidth<1500&&this.collapseChage()}},c=l,u=(n("b592"),n("17cc")),d=Object(u["a"])(c,r,a,!1,null,"651e2ab2",null),f=d.exports,h=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"sidebar"},[n("el-menu",{staticClass:"sidebar-el-menu",attrs:{"default-active":t.onRoutes,collapse:t.collapse,"background-color":"#324157","text-color":"#bfcbd9","active-text-color":"#20a0ff","unique-opened":"",router:""}},[t._l(t.items,function(e){return[e.subs?[n("el-submenu",{key:e.index,attrs:{index:e.index}},[n("template",{slot:"title"},[n("i",{class:e.icon}),n("span",{attrs:{slot:"title"},slot:"title"},[t._v(t._s(e.title))])]),t._l(e.subs,function(e){return[e.subs?n("el-submenu",{key:e.index,attrs:{index:e.index}},[n("template",{slot:"title"},[t._v(t._s(e.title))]),t._l(e.subs,function(e,i){return n("el-menu-item",{key:i,attrs:{index:e.index}},[t._v("\n                                "+t._s(e.title)+"\n                            ")])})],2):n("el-menu-item",{key:e.index,attrs:{index:e.index}},[t._v("\n                            "+t._s(e.title)+"\n                        ")])]})],2)]:[n("el-menu-item",{key:e.index,attrs:{index:e.index}},[n("i",{class:e.icon}),n("span",{attrs:{slot:"title"},slot:"title"},[t._v(t._s(e.title))])])]]})],2)],1)},p=[],v=(n("34a3"),{data:function(){return{collapse:!1,items:[{icon:"el-icon-lx-home",index:"dashboard",title:"系统首页"},{icon:"el-icon-lx-cascades",index:"daycoins",title:"每日金币消耗"},{icon:"el-icon-lx-cascades",index:"table",title:"单页推广配置"},{icon:"el-icon-lx-copy",index:"tabs",title:"tab选项卡"},{icon:"el-icon-lx-calendar",index:"3",title:"表单相关",subs:[{index:"form",title:"基本表单"},{index:"3-2",title:"三级菜单",subs:[{index:"editor",title:"富文本编辑器"},{index:"markdown",title:"markdown编辑器"}]},{index:"upload",title:"文件上传"}]},{icon:"el-icon-lx-emoji",index:"icon",title:"自定义图标"},{icon:"el-icon-lx-favor",index:"charts",title:"schart图表"},{icon:"el-icon-rank",index:"drag",title:"拖拽列表"},{icon:"el-icon-lx-warn",index:"6",title:"错误处理",subs:[{index:"permission",title:"权限测试"},{index:"404",title:"404页面"}]}]}},computed:{onRoutes:function(){return this.$route.path.replace("/","")}},created:function(){var t=this;o["a"].$on("collapse",function(e){t.collapse=e})}}),m=v,g=(n("4072"),Object(u["a"])(m,h,p,!1,null,"505ac655",null)),b=g.exports,x=function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.showTags?n("div",{staticClass:"tags"},[n("ul",t._l(t.tagsList,function(e,i){return n("li",{key:i,staticClass:"tags-li",class:{active:t.isActive(e.path)}},[n("router-link",{staticClass:"tags-li-title",attrs:{to:e.path}},[t._v("\n                "+t._s(e.title)+"\n            ")]),n("span",{staticClass:"tags-li-icon",on:{click:function(e){return t.closeTags(i)}}},[n("i",{staticClass:"el-icon-close"})])],1)}),0),n("div",{staticClass:"tags-close-box"},[n("el-dropdown",{on:{command:t.handleTags}},[n("el-button",{attrs:{size:"mini",type:"primary"}},[t._v("\n                标签选项"),n("i",{staticClass:"el-icon-arrow-down el-icon--right"})]),n("el-dropdown-menu",{attrs:{slot:"dropdown",size:"small"},slot:"dropdown"},[n("el-dropdown-item",{attrs:{command:"other"}},[t._v("关闭其他")]),n("el-dropdown-item",{attrs:{command:"all"}},[t._v("关闭所有")])],1)],1)],1)]):t._e()},w=[],C=(n("b0d8"),n("1294"),{data:function(){return{tagsList:[]}},methods:{isActive:function(t){return t===this.$route.fullPath},closeTags:function(t){var e=this.tagsList.splice(t,1)[0],n=this.tagsList[t]?this.tagsList[t]:this.tagsList[t-1];n?e.path===this.$route.fullPath&&this.$router.push(n.path):this.$router.push("/")},closeAll:function(){this.tagsList=[],this.$router.push("/")},closeOther:function(){var t=this,e=this.tagsList.filter(function(e){return e.path===t.$route.fullPath});this.tagsList=e},setTags:function(t){var e=this.tagsList.some(function(e){return e.path===t.fullPath});e||(this.tagsList.length>=8&&this.tagsList.shift(),this.tagsList.push({title:t.meta.title,path:t.fullPath,name:t.matched[1].components.default.name})),o["a"].$emit("tags",this.tagsList)},handleTags:function(t){"other"===t?this.closeOther():this.closeAll()}},computed:{showTags:function(){return this.tagsList.length>0}},watch:{$route:function(t,e){this.setTags(t)}},created:function(){this.setTags(this.$route)}}),_=C,y=(n("c5f3"),Object(u["a"])(_,x,w,!1,null,null,null)),k=y.exports,$={data:function(){return{tagsList:[],collapse:!1}},components:{vHead:f,vSidebar:b,vTags:k},created:function(){var t=this;o["a"].$on("collapse",function(e){t.collapse=e}),o["a"].$on("tags",function(e){for(var n=[],i=0,s=e.length;i<s;i++)e[i].name&&n.push(e[i].name);t.tagsList=n})}},S=$,F=Object(u["a"])(S,i,s,!1,null,null,null);e["default"]=F.exports},c5f3:function(t,e,n){"use strict";var i=n("5bd0"),s=n.n(i);s.a},da26:function(t,e,n){t.exports=n.p+"img/img.146655c9.jpg"},e558:function(t,e,n){},f425:function(t,e,n){"use strict";var i=n("a013");t.exports=function(){var t=i(this),e="";return t.global&&(e+="g"),t.ignoreCase&&(e+="i"),t.multiline&&(e+="m"),t.unicode&&(e+="u"),t.sticky&&(e+="y"),e}},f691:function(t,e,n){var i=n("88dd"),s=n("b5b8"),r=n("8b37")("species");t.exports=function(t){var e;return s(t)&&(e=t.constructor,"function"!=typeof e||e!==Array&&!s(e.prototype)||(e=void 0),i(e)&&(e=e[r],null===e&&(e=void 0))),void 0===e?Array:e}}}]);