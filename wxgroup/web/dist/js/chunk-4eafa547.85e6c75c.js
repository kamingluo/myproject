(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4eafa547"],{"0a49":function(t,e,a){var s=a("9b43"),i=a("626a"),l=a("4bf8"),o=a("9def"),r=a("cd1c");t.exports=function(t,e){var a=1==t,n=2==t,c=3==t,d=4==t,u=6==t,f=5==t||u,p=e||r;return function(e,r,h){for(var m,b,g=l(e),v=i(g),_=s(r,h,3),w=o(v.length),y=0,x=a?p(e,w):n?p(e,0):void 0;w>y;y++)if((f||y in v)&&(m=v[y],b=_(m,y,g),t))if(a)x[y]=b;else if(b)switch(t){case 3:return!0;case 5:return m;case 6:return y;case 2:x.push(m)}else if(d)return!1;return u?-1:c||d?d:x}}},1169:function(t,e,a){var s=a("2d95");t.exports=Array.isArray||function(t){return"Array"==s(t)}},"17c1":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"table"},[a("div",{staticClass:"crumbs"},[a("el-breadcrumb",{attrs:{separator:"/"}},[a("el-breadcrumb-item",[a("i",{staticClass:"el-icon-lx-cascades"}),t._v(" 总群数："+t._s(t.datapages))])],1)],1),a("div",{staticClass:"container"},[a("div",{staticClass:"handle-box"},[a("el-select",{staticClass:"handle-select mr10",attrs:{placeholder:"筛选方式"},model:{value:t.select_cate,callback:function(e){t.select_cate=e},expression:"select_cate"}},[a("el-option",{key:"1",attrs:{label:"群名称",value:"0"}}),a("el-option",{key:"2",attrs:{label:"群ID",value:"1"}})],1),a("el-input",{staticClass:"handle-input mr10",attrs:{placeholder:"筛选关键词"},model:{value:t.select_word,callback:function(e){t.select_word=e},expression:"select_word"}}),a("el-button",{staticClass:"search",attrs:{type:"primary",icon:"search"},on:{click:t.search}},[t._v("搜索")]),a("el-button",{staticClass:"search",attrs:{type:"primary",icon:"search"},on:{click:t.newsearch}},[t._v("重置")])],1),a("div",{staticClass:"handle-box"}),a("el-table",{ref:"multipleTable",staticClass:"table",attrs:{data:t.tableData,border:""}},[a("el-table-column",{attrs:{prop:"id",label:"群id",width:"80"}}),a("el-table-column",{attrs:{prop:"logo",label:"群图标",width:"140"},scopedSlots:t._u([{key:"default",fn:function(t){return[a("img",{staticClass:"logo",attrs:{src:t.row.logo}})]}}])}),a("el-table-column",{attrs:{prop:"crowd_name",label:"群名称",width:"200"}}),a("el-table-column",{attrs:{prop:"crowd_ownerid",label:"群主id",width:"100"}}),a("el-table-column",{attrs:{prop:"introduce",label:"群介绍",width:"300"}}),a("el-table-column",{attrs:{prop:"create_time",label:"创建时间",width:"200"}}),a("el-table-column",{attrs:{label:"操作",width:"180",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{staticClass:"red",attrs:{type:"text",icon:"el-icon-delete"},on:{click:function(a){t.handleDelete(e.$index,e.row)}}},[t._v("删除")])]}}])})],1),a("div",{staticClass:"pagination"},[a("el-pagination",{attrs:{background:"",layout:"prev, pager, next",total:t.datapages},on:{"current-change":t.handleCurrentChange}})],1)],1),a("el-dialog",{attrs:{title:"删除群",visible:t.delVisible,width:"30%"},on:{"update:visible":function(e){t.delVisible=e}}},[a("el-form",{ref:"form",attrs:{model:t.form,"label-width":"120px"}},[a("el-text",[t._v("确认删除？？")])],1),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.delVisible=!1}}},[t._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:t.confirmdelete}},[t._v("确 定")])],1)],1),a("el-dialog",{attrs:{title:"编辑",visible:t.editVisible,width:"30%"},on:{"update:visible":function(e){t.editVisible=e}}},[a("el-form",{ref:"form",attrs:{model:t.form,"label-width":"120px"}},[a("el-form-item",{attrs:{label:"id"}},[a("el-input",{model:{value:t.form.id,callback:function(e){t.$set(t.form,"id",e)},expression:"form.id"}})],1),a("el-form-item",{attrs:{label:"支付宝姓名"}},[a("el-input",{model:{value:t.form.alipayName,callback:function(e){t.$set(t.form,"alipayName",e)},expression:"form.alipayName"}})],1),a("el-form-item",{attrs:{label:"支付宝账号"}},[a("el-input",{model:{value:t.form.alipayNumber,callback:function(e){t.$set(t.form,"alipayNumber",e)},expression:"form.alipayNumber"}})],1),a("el-form-item",{attrs:{label:"state(1过2失败)"}},[a("el-input",{model:{value:t.form.state,callback:function(e){t.$set(t.form,"state",e)},expression:"form.state"}})],1)],1),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.editVisible=!1}}},[t._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:t.saveEdit}},[t._v("确 定")])],1)],1)],1)},i=[],l=(a("7f7f"),a("d25f"),{name:"basetable",data:function(){return{url:"./static/vuetable.json",tableData:[],cur_page:1,multipleSelection:[],select_cate:"1",select_word:"",del_list:[],is_search:!1,editVisible:!1,userdataVisible:!1,adminuserdata:null,admintaskdata:null,admincoinsdata:null,form:{name:"",date:"",address:""},idx:-1,delVisible:!1,deleteid:"",datapages:0}},created:function(){this.getData()},computed:{data:function(){var t=this;return this.tableData.filter(function(e){for(var a=0;a<t.del_list.length;a++)if(e.name===t.del_list[a].name){!0;break}})}},methods:{handleCurrentChange:function(t){this.cur_page=t;var e=this.select_word;null==e||""==e?this.getData():this.gosearch(t)},getData:function(){var t=this;this.url="configure/desgroup/groupslist",this.$axios.post(this.url,{pages:this.cur_page}).then(function(e){console.log("群列表信息",e),t.tableData=e.data.data,t.datapages=e.data.countnumber})},newsearch:function(){var t=this;this.cur_page=1,this.select_word="",this.select_cate="1";var e="configure/desgroup/groupslist";this.$axios.post(e,{pages:1}).then(function(e){console.log("群列表信息",e),t.tableData=e.data.data,t.datapages=e.data.countnumber})},search:function(){console.log("点击筛选");var t=this.select_word;if(console.log("打印关键词",t),null==t||""==t)return console.log("11111111"),void this.$message.error("关键词不能为空！！！");console.log("去筛选"),this.gosearch(1)},gosearch:function(t){var e=this,a=this.select_cate,s=this.select_word;if(console.log("开始筛选",t),"1"==a)var i={pages:t,id:s};else i={pages:t,crowd_name:s};var l="configure/desgroup/groupslist";this.$axios.post(l,i).then(function(t){console.log("搜索群返回",t),e.$message.success("操作成功"),e.tableData=t.data.data,e.datapages=t.data.countnumber})},handleDelete:function(t,e){console.log("点击删除的id",e.id),this.deleteid=e.id,this.delVisible=!0},confirmdelete:function(){var t=this,e=this.deleteid,a="configure/desgroup/deletegroup?id="+e;this.$axios(a).then(function(e){console.log("删除群返回",e),t.$message.success("操作成功"),t.delVisible=!1,t.getData()})},handleEdit:function(t,e){console.log("点击编辑"),this.idx=t;var a=this.tableData[t];this.form=a,this.editVisible=!0},saveEdit:function(){var t=this;this.$set(this.tableData,this.idx,this.form),console.log("提交修改信息",this.form),this.editVisible=!1,this.$message.success("操作成功"),this.$axios.post("/admin.php/configure/examine/sendrewards",this.form).then(function(e){console.log("修改信息返回数据",e),t.getData()})},getuserData:function(t){var e=this;this.url="/admin.php/configure/dataquery/userdata",this.$axios.post(this.url,{openid:t}).then(function(t){console.log("用户操作信息",t.data),e.adminuserdata=t.data.userdata,e.admintaskdata=t.data.task,e.admincoinsdata=t.data.coins,e.userdataVisible=!0})},userdata:function(){this.userdataVisible=!0}}}),o=l,r=(a("36d2"),a("2877")),n=Object(r["a"])(o,s,i,!1,null,"50d7ec74",null);n.options.__file="Groups.vue";e["default"]=n.exports},"36d2":function(t,e,a){"use strict";var s=a("675a"),i=a.n(s);i.a},"675a":function(t,e,a){},"7f7f":function(t,e,a){var s=a("86cc").f,i=Function.prototype,l=/^\s*function ([^ (]*)/,o="name";o in i||a("9e1e")&&s(i,o,{configurable:!0,get:function(){try{return(""+this).match(l)[1]}catch(t){return""}}})},cd1c:function(t,e,a){var s=a("e853");t.exports=function(t,e){return new(s(t))(e)}},d25f:function(t,e,a){"use strict";var s=a("5ca1"),i=a("0a49")(2);s(s.P+s.F*!a("2f21")([].filter,!0),"Array",{filter:function(t){return i(this,t,arguments[1])}})},e853:function(t,e,a){var s=a("d3f4"),i=a("1169"),l=a("2b4c")("species");t.exports=function(t){var e;return i(t)&&(e=t.constructor,"function"!=typeof e||e!==Array&&!i(e.prototype)||(e=void 0),s(e)&&(e=e[l],null===e&&(e=void 0))),void 0===e?Array:e}}}]);