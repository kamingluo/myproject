<template>



  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item
          ><i class="el-icon-lx-cascades"></i> 总群数：{{datapages}}</el-breadcrumb-item
        >
      </el-breadcrumb>
    </div>
    <div class="container">

    <div class="handle-box">
        <el-select
          v-model="select_cate"
          placeholder="筛选方式"
          class="handle-select mr10"
        >
          <el-option key="1" label="群名称" value="0" ></el-option>
          <el-option key="2" label="群ID" value="1"></el-option>
        </el-select>
        <el-input
          v-model="select_word"
          placeholder="筛选关键词"
          class="handle-input mr10"
        ></el-input>
        <el-button type="primary" icon="search" class="search" @click="search"
          >搜索</el-button
        >
        <el-button type="primary" icon="search" class="search" @click="newsearch"
          >重置</el-button
        >
      </div>

      <!-- <div class="handle-box">
        <el-button type="primary" class="handle-del mr10" @click="add"
          >新增数据</el-button
        >
        <el-button
          type="primary"
          icon="delete"
          class="handle-del mr10"
          @click="delAll"
          >批量删除</el-button
        >
      </div> -->
      <div class="handle-box"></div>
      <el-table :data="tableData" border class="table" ref="multipleTable">
        <el-table-column prop="id" label="群id" width="80"> </el-table-column>
        <el-table-column prop="logo" label="群图标" width="140">
          <template slot-scope="scope" style="height:100px">
            <img class="logo" :src="scope.row.logo"></img>
            <!--<el-text>{{scope.row.logo}}</el-text>-->
          </template>
        </el-table-column>
        <el-table-column prop="crowd_name" label="群名称" width="200">
        </el-table-column>
        <el-table-column prop="crowd_ownerid" label="群主id" width="100">
        </el-table-column>
        <el-table-column prop="introduce" label="群介绍" width="300">
        </el-table-column>
        <el-table-column prop="create_time" label="创建时间" width="200">
        </el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <!--<el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">审核</el-button>-->
            <el-button
              type="text"
              icon="el-icon-delete"
              class="red"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination">
        <el-pagination
          background
          @current-change="handleCurrentChange"
          layout="prev, pager, next"
          :total="datapages"
        >
        </el-pagination>
      </div>
    </div>


     <!-- 编辑弹出框 -->
    <el-dialog title="删除群" :visible.sync="delVisible" width="30%">
      <el-form ref="form" :model="form" label-width="120px">
        <el-text>确认删除？？</el-text>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmdelete">确 定</el-button>
      </span>
    </el-dialog>


    <!-- 编辑弹出框 -->
    <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="id">
          <el-input v-model="form.id"></el-input>
        </el-form-item>
        <el-form-item label="支付宝姓名">
          <el-input v-model="form.alipayName"></el-input>
        </el-form-item>
        <el-form-item label="支付宝账号">
          <el-input v-model="form.alipayNumber"></el-input>
        </el-form-item>
        <el-form-item label="state(1过2失败)">
          <el-input v-model="form.state"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveEdit">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
export default {
  name: "basetable",
  data() {
    return {
      url: "./static/vuetable.json",
      tableData: [],
      cur_page: 1,
      multipleSelection: [],
      select_cate: "1",
      select_word: "",
      del_list: [],
      is_search: false,
      editVisible: false,
      userdataVisible: false,
      adminuserdata: null,
      admintaskdata: null,
      admincoinsdata: null,
      form: {
        name: "",
        date: "",
        address: ""
      },
      idx: -1,
      delVisible: false,
      deleteid: "",
      datapages: 0
    };
  },
  created() {
    this.getData();
  },
  computed: {
    data() {
      return this.tableData.filter(d => {
        let is_del = false;
        for (let i = 0; i < this.del_list.length; i++) {
          if (d.name === this.del_list[i].name) {
            is_del = true;
            break;
          }
        }
      });
    }
  },
  methods: {
    // 分页导航
    handleCurrentChange(val) {
      this.cur_page = val;
      let select_word=this.select_word;
      if(select_word ==  null || select_word == ""){
          this.getData();
      }
      else{
          this.gosearch(val);
      }
    },

    getData() {
      this.url = "configure/desgroup/groupslist";
      this.$axios.post(this.url, { pages: this.cur_page }).then(res => {
        console.log("群列表信息", res);
        this.tableData = res.data.data;
        this.datapages = res.data.countnumber;
      });
    },

    newsearch(){
        this.cur_page = 1;
        this.select_word="";
        this.select_cate="1";
        let url = "configure/desgroup/groupslist";
        this.$axios.post(url, { pages:1 }).then(res => {
        console.log("群列表信息", res);
        this.tableData = res.data.data;
        this.datapages = res.data.countnumber;
      });

    },

    //筛选
    search(){
        console.log("点击筛选")
        let select_word=this.select_word;//关键词
        console.log("打印关键词",select_word)
        if(select_word == null || select_word == ""){
            console.log("11111111")
            this.$message.error(`关键词不能为空！！！`);
            return ;
        }

        console.log("去筛选")
        this.gosearch(1)

    },

    gosearch(pages){
        let select_cate=this.select_cate;//筛选方式
        let select_word=this.select_word;//关键词
        console.log("开始筛选",pages)
        if(select_cate == "1"){
            var resdata={
                pages:pages,
                id:select_word
            };
        }
        else{
            var resdata={
                pages:pages,
                crowd_name:select_word
            };
        }
        let url = "configure/desgroup/groupslist";
        this.$axios.post(url,resdata).then(res => {
        console.log("搜索群返回", res);
        this.$message.success(`操作成功`);
        this.tableData = res.data.data;
        this.datapages = res.data.countnumber;
        });
    },


    //调起删除
    handleDelete(index, row){
        console.log("点击删除的id",row.id)
        this.deleteid=row.id;
        this.delVisible=true;

    },

    //确认删除
    confirmdelete(){
     let id=this.deleteid;
     let url = "configure/desgroup/deletegroup?id=" + id;
      this.$axios(url).then(res => {
        console.log("删除群返回", res);
        this.$message.success(`操作成功`);
        this.delVisible=false;
        this.getData();
      });
    },

    handleEdit(index, row) {
      console.log("点击编辑");
      this.idx = index;
      const item = this.tableData[index];
      this.form = item;
      this.editVisible = true;
    },
    // 保存编辑
    saveEdit() {
      this.$set(this.tableData, this.idx, this.form);
      console.log("提交修改信息", this.form);
      this.editVisible = false;
      this.$message.success(`操作成功`);

      this.$axios
        .post("/admin.php/configure/examine/sendrewards", this.form)
        .then(res => {
          console.log("修改信息返回数据", res);
          this.getData();
        });
    },

    getuserData(openid) {
      this.url = "/admin.php/configure/dataquery/userdata";
      this.$axios.post(this.url, { openid: openid }).then(res => {
        console.log("用户操作信息", res.data);
        this.adminuserdata = res.data.userdata;
        this.admintaskdata = res.data.task;
        this.admincoinsdata = res.data.coins;
        this.userdataVisible = true;
      });
    },

    userdata() {
      this.userdataVisible = true;
    }
  }
};
</script>

<style scoped>
.logo {
  width: 70px;
  height: 70px;
}

.bodaydata {
  margin-top: 25px;
}
.userdatadiv {
  display: inline;
  margin-left: 15px;
}
.userdatatitle {
  font-size: 30px;
}

.keyname {
  font-size: 20px;
}
.keyvalue {
  font-size: 25px;
  color: red;
  font-weight: 600;
}
.handle-box {
  margin-bottom: 20px;
}

.handle-select {
  width: 120px;
}

.handle-input {
  width: 300px;
  display: inline-block;
}
.del-dialog-cnt {
  font-size: 16px;
  text-align: center;
}
.table {
  width: 100%;
  font-size: 14px;
}
.red {
  color: #ff0000;
}
</style>
