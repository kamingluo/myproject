(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-64605024"],{"002c":function(e,t,i){"use strict";i.r(t);var l=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"table"},[i("div",{staticClass:"crumbs"},[i("el-breadcrumb",{attrs:{separator:"/"}},[i("el-breadcrumb-item",[i("i",{staticClass:"el-icon-lx-cascades"}),e._v(" 首页miniappad配置")])],1)],1),i("div",{staticClass:"container"},[i("div",{staticClass:"handle-box"},[i("el-button",{staticClass:"handle-del mr10",attrs:{type:"primary"},on:{click:e.add}},[e._v("新增数据")])],1),i("el-table",{ref:"multipleTable",staticClass:"table",attrs:{data:e.tableData,border:""},on:{"selection-change":e.handleSelectionChange}},[i("el-table-column",{attrs:{prop:"id",label:"id",width:"80"}}),i("el-table-column",{attrs:{prop:"name",label:"name",width:"150"}}),i("el-table-column",{attrs:{prop:"appid",label:"appid",width:"180"}}),i("el-table-column",{attrs:{prop:"open",label:"open(0开1关)",width:"130"}}),i("el-table-column",{attrs:{prop:"playtime",label:"playtime",width:"100"}}),i("el-table-column",{attrs:{prop:"score",label:"score",width:"100"}}),i("el-table-column",{attrs:{prop:"type",label:"type(0直跳1图片)",width:"150"}}),i("el-table-column",{attrs:{prop:"Jump",label:"跳转链接",width:"250"}}),i("el-table-column",{attrs:{prop:"describe",label:"简介",width:"180"}}),i("el-table-column",{attrs:{prop:"extradata",label:"extradata",width:"100"}}),i("el-table-column",{attrs:{prop:"imgurl",label:"图片链接",width:"390"}}),i("el-table-column",{attrs:{label:"操作",width:"180",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("el-button",{attrs:{type:"text",icon:"el-icon-edit"},on:{click:function(i){return e.handleEdit(t.$index,t.row)}}},[e._v("编辑")]),i("el-button",{staticClass:"red",attrs:{type:"text",icon:"el-icon-delete"},on:{click:function(i){return e.handleDelete(t.$index,t.row)}}},[e._v("删除")])]}}])})],1)],1),i("el-dialog",{attrs:{title:"编辑",visible:e.editVisible,width:"30%"},on:{"update:visible":function(t){e.editVisible=t}}},[i("el-form",{ref:"form",attrs:{model:e.form,"label-width":"120px"}},[i("el-form-item",{attrs:{label:"newid"}},[i("el-input",{attrs:{placeholder:"为空就是不改变id值"},model:{value:e.form.newid,callback:function(t){e.$set(e.form,"newid",t)},expression:"form.newid"}})],1),i("el-form-item",{attrs:{label:"id"}},[i("el-input",{model:{value:e.form.id,callback:function(t){e.$set(e.form,"id",t)},expression:"form.id"}})],1),i("el-form-item",{attrs:{label:"名称"}},[i("el-input",{model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),i("el-form-item",{attrs:{label:"appid"}},[i("el-input",{model:{value:e.form.appid,callback:function(t){e.$set(e.form,"appid",t)},expression:"form.appid"}})],1),i("el-form-item",{attrs:{label:"跳转链接"}},[i("el-input",{model:{value:e.form.Jump,callback:function(t){e.$set(e.form,"Jump",t)},expression:"form.Jump"}})],1),i("el-form-item",{attrs:{label:"简介"}},[i("el-input",{model:{value:e.form.describe,callback:function(t){e.$set(e.form,"describe",t)},expression:"form.describe"}})],1),i("el-form-item",{attrs:{label:"extradata"}},[i("el-input",{model:{value:e.form.extradata,callback:function(t){e.$set(e.form,"extradata",t)},expression:"form.extradata"}})],1),i("el-form-item",{attrs:{label:"图片链接"}},[i("el-input",{model:{value:e.form.imgurl,callback:function(t){e.$set(e.form,"imgurl",t)},expression:"form.imgurl"}})],1),i("el-form-item",{attrs:{label:"open"}},[i("el-input",{model:{value:e.form.open,callback:function(t){e.$set(e.form,"open",t)},expression:"form.open"}})],1),i("el-form-item",{attrs:{label:"playtime"}},[i("el-input",{model:{value:e.form.playtime,callback:function(t){e.$set(e.form,"playtime",t)},expression:"form.playtime"}})],1),i("el-form-item",{attrs:{label:"score"}},[i("el-input",{model:{value:e.form.score,callback:function(t){e.$set(e.form,"score",t)},expression:"form.score"}})],1),i("el-form-item",{attrs:{label:"type"}},[i("el-input",{model:{value:e.form.type,callback:function(t){e.$set(e.form,"type",t)},expression:"form.type"}})],1)],1),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(t){e.editVisible=!1}}},[e._v("取 消")]),i("el-button",{attrs:{type:"primary"},on:{click:e.saveEdit}},[e._v("确 定")])],1)],1),i("el-dialog",{attrs:{title:"提示",visible:e.delVisible,width:"300px",center:""},on:{"update:visible":function(t){e.delVisible=t}}},[i("div",{staticClass:"del-dialog-cnt"},[e._v("删除不可恢复，是否确定删除？")]),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(t){e.delVisible=!1}}},[e._v("取 消")]),i("el-button",{attrs:{type:"primary"},on:{click:e.deleteRow}},[e._v("确 定")])],1)])],1)},a=[],o=(i("7364"),i("1294"),{name:"basetable",data:function(){return{url:"./static/vuetable.json",tableData:[],cur_page:1,multipleSelection:[],select_cate:"",select_word:"",del_list:[],is_search:!1,editVisible:!1,delVisible:!1,form:{},idx:-1,deleteid:""}},created:function(){this.getData()},computed:{data:function(){var e=this;return this.tableData.filter(function(t){for(var i=0;i<e.del_list.length;i++)if(t.name===e.del_list[i].name){!0;break}})}},methods:{handleCurrentChange:function(e){this.cur_page=e,this.getData()},getData:function(){var e=this;this.url="/admin.php/configure/indexminiappad/data",this.$axios.post(this.url).then(function(t){console.log("基础表格请求返回数据",t.data.data),e.tableData=t.data.data})},add:function(){console.log("点击新增"),this.form={},this.editVisible=!0},search:function(){this.is_search=!0},formatter:function(e,t){return e.address},filterTag:function(e,t){return t.tag===e},handleEdit:function(e,t){console.log("点击编辑"),this.idx=e;var i=this.tableData[e];this.form=i,this.editVisible=!0},handleDelete:function(e,t){console.log("点击删除按钮",e,"删除id",t.id),this.idx=e,this.deleteid=t.id,this.delVisible=!0},delAll:function(){var e=this.multipleSelection.length,t="";this.del_list=this.del_list.concat(this.multipleSelection);for(var i=0;i<e;i++)t+=this.multipleSelection[i].name+" ";this.$message.error("删除了"+t),this.multipleSelection=[]},handleSelectionChange:function(e){this.multipleSelection=e},saveEdit:function(){var e=this;this.$set(this.tableData,this.idx,this.form),console.log("提交修改信息",this.form),this.editVisible=!1,this.$message.success("操作成功"),this.$axios.post("/admin.php/configure/indexminiappad/addandupdate",this.form).then(function(t){console.log("修改信息返回数据",t),e.getData()})},deleteRow:function(){this.tableData.splice(this.idx,1),console.log("删除提交数据id",this.deleteid),this.$axios.post("/admin.php/configure/indexminiappad/deletedata",{id:this.deleteid}).then(function(e){console.log("删除信息返回数据",e)}),this.$message.success("删除成功"),this.delVisible=!1}}}),n=o,r=(i("213e"),i("17cc")),s=Object(r["a"])(n,l,a,!1,null,"5a03cfe7",null);t["default"]=s.exports},1294:function(e,t,i){"use strict";var l=i("b2f5"),a=i("2d43")(2);l(l.P+l.F*!i("119c")([].filter,!0),"Array",{filter:function(e){return a(this,e,arguments[1])}})},"213e":function(e,t,i){"use strict";var l=i("d6c1"),a=i.n(l);a.a},"2d43":function(e,t,i){var l=i("01f5"),a=i("6462"),o=i("db4b"),n=i("b146"),r=i("5824");e.exports=function(e,t){var i=1==e,s=2==e,c=3==e,d=4==e,u=6==e,f=5==e||u,m=t||r;return function(t,r,p){for(var b,h,v=o(t),x=a(v),g=l(r,p,3),w=n(x.length),y=0,k=i?m(t,w):s?m(t,0):void 0;w>y;y++)if((f||y in x)&&(b=x[y],h=g(b,y,v),e))if(i)k[y]=h;else if(h)switch(e){case 3:return!0;case 5:return b;case 6:return y;case 2:k.push(b)}else if(d)return!1;return u?-1:c||d?d:k}}},5824:function(e,t,i){var l=i("f691");e.exports=function(e,t){return new(l(e))(t)}},7364:function(e,t,i){var l=i("ddf7").f,a=Function.prototype,o=/^\s*function ([^ (]*)/,n="name";n in a||i("dad2")&&l(a,n,{configurable:!0,get:function(){try{return(""+this).match(o)[1]}catch(e){return""}}})},b5b8:function(e,t,i){var l=i("94ac");e.exports=Array.isArray||function(e){return"Array"==l(e)}},d6c1:function(e,t,i){},f691:function(e,t,i){var l=i("88dd"),a=i("b5b8"),o=i("8b37")("species");e.exports=function(e){var t;return a(e)&&(t=e.constructor,"function"!=typeof t||t!==Array&&!a(t.prototype)||(t=void 0),l(t)&&(t=t[o],null===t&&(t=void 0))),void 0===t?Array:t}}}]);