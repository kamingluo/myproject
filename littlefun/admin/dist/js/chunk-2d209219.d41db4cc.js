(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d209219"],{a86b:function(a,t,e){"use strict";e.r(t);var l=function(){var a=this,t=a.$createElement,e=a._self._c||t;return e("div",{staticClass:"table"},[e("div",{staticClass:"crumbs"},[e("el-breadcrumb",{attrs:{separator:"/"}},[e("el-breadcrumb-item",[e("i",{staticClass:"el-icon-lx-cascades"}),a._v(" 每日金币消耗")])],1)],1),e("div",{staticClass:"container"},[e("el-table",{ref:"multipleTable",staticClass:"table",attrs:{data:a.tableData,border:""}},[e("el-table-column",{attrs:{prop:"create_time",label:"日期"}}),e("el-table-column",{attrs:{prop:"whole",label:"全部流水"}}),e("el-table-column",{attrs:{prop:"gdtad",label:"广点通ad"}}),e("el-table-column",{attrs:{prop:"wlad",label:"微量ad"}}),e("el-table-column",{attrs:{prop:"miniappad",label:"miniappad"}}),e("el-table-column",{attrs:{prop:"share",label:"分享消耗"}}),e("el-table-column",{attrs:{prop:"sign",label:"签到消耗"}}),e("el-table-column",{attrs:{prop:"paytribute",label:"进贡消耗"}}),e("el-table-column",{attrs:{prop:"caiquanwin",label:"用户猜拳赢了"}}),e("el-table-column",{attrs:{prop:"caiquanlose",label:"用户猜拳输了"}}),e("el-table-column",{attrs:{prop:"dicewin",label:"用户猜大小赢了"}}),e("el-table-column",{attrs:{prop:"dicelose",label:"用户猜大小输了"}}),e("el-table-column",{attrs:{prop:"exchangecoin",label:"兑换商品"}})],1),e("div",{staticClass:"pagination"},[e("el-pagination",{attrs:{background:"",layout:"prev, pager, next",total:a.countnumber},on:{"current-change":a.handleCurrentChange}})],1)],1)])},n=[],r=(e("cadf"),e("551c"),e("097d"),{name:"daycoins",data:function(){return{tableData:[],cur_page:1,countnumber:10}},created:function(){this.getData()},methods:{handleCurrentChange:function(a){this.cur_page=a,this.getData()},getData:function(){var a=this;this.url="/admin.php/configure/dataquery/coinstatistics",this.$axios.post(this.url,{pages:this.cur_page}).then(function(t){console.log("基础每日消耗返回数据",t.data.data),a.tableData=t.data.data,a.countnumber=t.data.countnumber})}}}),s=r,o=e("2877"),c=Object(o["a"])(s,l,n,!1,null,null,null);c.options.__file="DayCoins.vue";t["default"]=c.exports}}]);