<?php


namespace app\admin\controller;
use think\Db;
use think\Request;
use think\Exception;
use think\Log;

class Statistics
{
   
    //统计前一天的相关数据，一般是凌晨执行
    public function payscore()
    {


         //所有的支出
        $all=db('score_record')->whereTime('create_time', 'yesterday')->sum('score');

        //签到支出
        $sign=db('sign')->whereTime('create_time', 'yesterday')->sum('score');

         //广点通广告
        $gdtad=db('gdt_ad_record')->whereTime('create_time', 'yesterday')->sum('score');

         //miniapp广告
        $miniappad=db('miniapp_ad_record')->whereTime('create_time', 'yesterday')->sum('score');

         //微量广告
        $wlad=db('wl_ad_record')->whereTime('create_time', 'yesterday')->sum('score');

        $time =date('Y-m-d H:i:s',time());//获取当前时间

        if($sign >= 0&&$all >= 0 && $gdtad >=0 && $miniappad >= 0&& $wlad >= 0){

          $dbdata = ['id'=>'','all' =>$all,'gdtad' =>$gdtad,'wlad' =>$wlad,'miniappad' =>$miniappad,'sign' =>$sign,'create_time' =>$time];
          $resdata=db('statistics')->insert($dbdata);

          return "统计成功(1为成功)-->" . $resdata ;



        }
        else{
        	 return  "统计失败";
        }

    }
   

}
