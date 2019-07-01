<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="8">
                <el-card shadow="hover" class="mgb20" style="height:252px;">
                    <div class="user-info">
                        <img src="../../assets/images/img.jpg" class="user-avator" alt="">
                        <div class="user-info-cont">
                            <div class="user-info-name">{{name}}</div>
                            <div>{{role}}</div>
                        </div>
                    </div>
                    <div class="user-info-list">上次登录时间：<span>2018-01-01</span></div>
                    <div class="user-info-list">上次登录地点：<span>东莞</span></div>
                </el-card>
                <el-card shadow="hover" style="height:252px;">
                    <div slot="header" class="clearfix">
                        <span>渠道用户比例</span>
                    </div>
                    微量推广
                    <el-progress :percentage="71.3" color="#42b983"></el-progress>
                    云享社区
                    <el-progress :percentage="24.1" color="#f1e05a"></el-progress>
                    来钱道
                    <el-progress :percentage="3.7"></el-progress>
                    蚂蚁帮扶
                    <el-progress :percentage="0.9" color="#f56c6c"></el-progress>
                </el-card>
            </el-col>
            <el-col :span="16">
                <el-row :gutter="20" class="mgb20">
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                        
                            <div class="grid-content grid-con-1">
                                <i class="el-icon-lx-people grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{usersdata.allusersnumber}}</div>
                                    <div>总注册用户数</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-1">
                                <i class="el-icon-lx-people grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{usersdata.todayregisterusersnumber}}</div>
                                    <div>今日注册用户数</div>
                                </div>
                                 <div class="grid-cont-right">
                                    <div class="grid-num">{{usersdata.yesterdayregisterusersnumber}}</div>
                                    <div>昨日注册用户数</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                     <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-1">
                                <i class="el-icon-lx-people grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{usersdata.todayactiveusersnumber}}</div>
                                    <div>今日活跃用户数</div>
                                </div>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{usersdata.yesterdayactiveusersnumber}}</div>
                                    <div>昨日活跃用户数</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>

                     <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-3">
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{historycoins.whole}}</div>
                                    <div>历史总金币流水</div>
                                </div>
                                <div class="grid-cont-jia">
                                    <div> 加</div>
                                    </div>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{todaycoins.whole }}</div>
                                    <div>今日总流水</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>


                     <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                           <div class="grid-content grid-con-3">
                                
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{historycoins.gdtad}}</div>
                                    <div>历史广点通广告支出</div>
                                </div>
                                <div class="grid-cont-jia">
                                    <div> 加</div>
                                    </div>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{todaycoins.gdtad }}</div>
                                    <div>今日广点通广告支出</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>



                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                          <div class="grid-content grid-con-3">
                                
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{historycoins.wlad}}</div>
                                    <div>历史微量广告支出</div>
                                </div>
                                <div class="grid-cont-jia">
                                    <div> 加</div>
                                    </div>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{todaycoins.wlad }}</div>
                                    <div>今日微量广告支出</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>

                     <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-3">
                                
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{historycoins.miniappad}}</div>
                                    <div>历史小程序ad支出</div>
                                </div>
                                <div class="grid-cont-jia">
                                    <div> 加</div>
                                    </div>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{todaycoins.miniappad }}</div>
                                    <div>今日小程序ad支出</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                     <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                          <div class="grid-content grid-con-3">
                                
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{historycoins.sign}}</div>
                                    <div>历史签到支出</div>
                                </div>
                                <div class="grid-cont-jia">
                                    <div> 加</div>
                                    </div>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{todaycoins.sign }}</div>
                                    <div>今日签到支出</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>

                     <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                           <div class="grid-content grid-con-3">
                                
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{historycoins.share}}</div>
                                    <div>历史分享支出</div>
                                </div>
                                <div class="grid-cont-jia">
                                    <div> 加</div>
                                    </div>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{todaycoins.share }}</div>
                                    <div>今日分享支出</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>


                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                     <div class="grid-content grid-con-3">
                                
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{historycoins.paytribute}}</div>
                                    <div>历史进贡支出</div>
                                </div>
                                <div class="grid-cont-jia">
                                    <div> 加</div>
                                    </div>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{todaycoins.paytribute }}</div>
                                    <div>今日进贡支出</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>

                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                     <div class="grid-content grid-con-3">
                                
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{historycoins.dicewin}}</div>
                                    <div>历史猜大小赢得</div>
                                </div>
                                <div class="grid-cont-jia">
                                    <div> 加</div>
                                    </div>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{todaycoins.dicewin }}</div>
                                    <div>今日猜大小赢得</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>

                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                         <div class="grid-content grid-con-3">
                               
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{historycoins.dicelose}}</div>
                                    <div>历史猜大小输了</div>
                                </div>
                                <div class="grid-cont-jia">
                                    <div> 加</div>
                                    </div>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{todaycoins.dicelose }}</div>
                                    <div>今日猜大小输了</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>

                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-3">
                                
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{historycoins.caiquanwin}}</div>
                                    <div>历史猜拳赢得</div>
                                </div>
                                <div class="grid-cont-jia">
                                    <div> 加</div>
                                    </div>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{todaycoins.caiquanwin }}</div>
                                    <div>今日猜拳赢得</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>

                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-3">
                               
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{historycoins.caiquanlose}}</div>
                                    <div>历史猜拳输了</div>
                                </div>
                                <div class="grid-cont-jia">
                                    <div> 加</div>
                                    </div>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{todaycoins.caiquanlose }}</div>
                                    <div>今日猜拳输了</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>

                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-3">
                                
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{historycoins.exchangecoin}}</div>
                                    <div>历史兑换总数</div>
                                </div>
                                <div class="grid-cont-jia">
                                    <div> 加</div>
                                    </div>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{todaycoins.exchangecoin }}</div>
                                    <div>今日兑换</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>


                </el-row>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="12">
                <el-card shadow="hover">
                    <schart ref="bar" class="schart" canvasId="bar" :data="data" type="bar" :options="options"></schart>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card shadow="hover">
                    <schart ref="line" class="schart" canvasId="line" :data="data" type="line" :options="options2"></schart>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import Schart from 'vue-schart';
    import bus from '../common/bus';
    export default {
        name: 'dashboard',
        data() {
            return {
                name: localStorage.getItem('ms_username'),
                todaycoins:'',
                usersdata:'',
                historycoins:'',
                data: [{
                        name: '2018/09/04',
                        value: 1083
                    },
                    {
                        name: '2018/09/05',
                        value: 941
                    },
                    {
                        name: '2018/09/06',
                        value: 1139
                    },
                    {
                        name: '2018/09/07',
                        value: 816
                    },
                    {
                        name: '2018/09/08',
                        value: 327
                    },
                    {
                        name: '2018/09/09',
                        value: 228
                    },
                    {
                        name: '2018/09/10',
                        value: 1065
                    }
                ],
                options: {
                    title: '最近七天每天的用户访问量',
                    showValue: false,
                    fillColor: 'rgb(45, 140, 240)',
                    bottomPadding: 30,
                    topPadding: 30
                },
                options2: {
                    title: '最近七天用户访问趋势',
                    fillColor: '#FC6FA1',
                    axisColor: '#008ACD',
                    contentColor: '#EEEEEE',
                    bgColor: '#F5F8FD',
                    bottomPadding: 30,
                    topPadding: 30
                }
            }
        },
        components: {
            Schart
        },
        computed: {
            role() {
                return this.name === 'admin' ? '超级管理员' : '普通用户';
            }
        },
       
        created(){
            this.handleListener();
            this.changeDate();
            this.admintodaycoins();
            this.adminhistorycoins();
            this.adminusersdata();
        },
        activated(){
            this.handleListener();
        },
        deactivated(){
            window.removeEventListener('resize', this.renderChart);
            bus.$off('collapse', this.handleBus);
        },
        methods: {
             //拿到今天的消耗数据  
            admintodaycoins() {
                //this.url = '/admin.php/configure/extension/extension';
                this.$axios.post('/admin.php/index/todaycoins').then((res) => {
                    console.log("拿到今天的消耗数据",res.data)
                    this.todaycoins = res.data.data;
                })
            },

             //拿到历史的消耗数据
            adminhistorycoins() {
                //this.url = '/admin.php/index/historycoins';
                this.$axios.post('/admin.php/index/historycoins').then((res) => {
                    console.log("拿到历史的消耗数据",res.data)
                   this.historycoins = res.data[0];
                })
            },
            //拿到用户数据
            adminusersdata() {
                //this.url = '/admin.php/configure/extension/extension';
                this.$axios.post('/admin.php/index/usersdata').then((res) => {
                    console.log("拿到用户数据",res.data)
                    this.usersdata = res.data.data;
                })
            },
            changeDate(){
                const now = new Date().getTime();
                this.data.forEach((item, index) => {
                    const date = new Date(now - (6 - index) * 86400000);
                    item.name = `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}`
                })
            },
            handleListener(){
                bus.$on('collapse', this.handleBus);
                // 调用renderChart方法对图表进行重新渲染
                window.addEventListener('resize', this.renderChart)
            },
            handleBus(msg){
                setTimeout(() => {
                    this.renderChart()
                }, 300);
            },
            renderChart(){
                this.$refs.bar.renderChart();
                this.$refs.line.renderChart();
            }
        }
    }

</script>


<style scoped>
    .el-row {
        margin-bottom: 20px;
    }

    .grid-content {
        display: flex;
        align-items: center;
        height: 100px;
    }

    .grid-cont-right {
        flex: 1;
        text-align: center;
        font-size: 14px;
        color: #999;
    }
    .grid-cont-jia {
        font-size: 18px;
         color: #999;
         text-align: center;
    }

    .grid-num {
        font-size: 30px;
        font-weight: bold;
    }

    .grid-con-icon {
        font-size: 50px;
        width: 100px;
        height: 100px;
        text-align: center;
        line-height: 100px;
        color: #fff;
    }

    .grid-con-1 .grid-con-icon {
        background: rgb(45, 140, 240);
    }

    .grid-con-1 .grid-num {
        color: rgb(45, 140, 240);
    }

    .grid-con-2 .grid-con-icon {
        background: rgb(100, 213, 114);
    }

    .grid-con-2 .grid-num {
        color: rgb(45, 140, 240);
    }

    .grid-con-3 .grid-con-icon {
        background: rgb(242, 94, 67);
    }

    .grid-con-3 .grid-num {
        color: rgb(242, 94, 67);
    }

    .user-info {
        display: flex;
        align-items: center;
        padding-bottom: 20px;
        border-bottom: 2px solid #ccc;
        margin-bottom: 20px;
    }

    .user-avator {
        width: 120px;
        height: 120px;
        border-radius: 50%;
    }

    .user-info-cont {
        padding-left: 50px;
        flex: 1;
        font-size: 14px;
        color: #999;
    }

    .user-info-cont div:first-child {
        font-size: 30px;
        color: #222;
    }

    .user-info-list {
        font-size: 14px;
        color: #999;
        line-height: 25px;
    }

    .user-info-list span {
        margin-left: 70px;
    }

    .mgb20 {
        margin-bottom: 20px;
    }

    .todo-item {
        font-size: 14px;
    }

    .todo-item-del {
        text-decoration: line-through;
        color: #999;
    }

    .schart {
        width: 100%;
        height: 300px;
    }

</style>
