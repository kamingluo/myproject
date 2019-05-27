<?php


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


        $seven=date("Y-m-d H:i:s", strtotime('-7 days'));//获取三天时间

        //清理积分增加减少三天前的记录
        $score=db('score_record')-> where('create_time','< time', $weekend)->delete();

        //广点通广告三天数据清理
        $gdt=db('gdt_ad_record')-> where('create_time','< time', $weekend)->delete();

        //微量广告三天数据清理
        $wl=db('wl_ad_record')-> where('create_time','< time', $weekend)->delete();


        //miniappad广告三天数据清理
        $miniapp=db('miniapp_ad_record')-> where('create_time','< time', $weekend)->delete();

         //签到七天数据清理
        $sign=db('sign')-> where('create_time','< time', $seven)->delete();
         //分享七天数据清理
        $share=db('share_record')-> where('create_time','< time', $seven)->delete();

        if($miniapp >= 0&&$score >= 0 && $gdt >=0 && $wl >= 0){
             return " 共清理积分记录-->".$score. "    广点通数据-->" .$gdt ."    微量数据-->" .$wl ."    miniapp数据-->". $miniapp.   "     签到数据-->" .$sign.  "     分享数据-->" .$share ;
        }
        else{
             return "清理失败";
        }


       
    }


    //统计前一天的相关数据，一般是凌晨执行
    public function statistics()
    {

        // $sign=db('sign')->whereTime('create_time', 'yesterday')->sum('score');
         $time =date("Y-m-d", strtotime("-1 day"));//获取当前时间的前一天
         
        return  $time ;


    }
   

}
