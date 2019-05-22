<?php
// +----------------------------------------------------------------------
// | 用户信息操作
// +----------------------------------------------------------------------
 

namespace app\admin\controller;
use think\Db;
use think\Request;
use think\Exception;
use think\Log;

class Clear
{
    //定时清理
    public function timingclear()
    {

        // return  "定时清理" ;
        $time =date('Y-m-d H:i:s',time());//获取当前时间
        $weekend=date("Y-m-d H:i:s", strtotime('-3 days'));//获取三天时间

        //清理积分增加减少三天前的记录
        $deletedata=db('score_record')-> where('create_time','< time', $weekend)->delete();


        return $deletedata ;
    }
   

}
