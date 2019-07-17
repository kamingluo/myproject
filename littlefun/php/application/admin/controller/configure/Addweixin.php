<?php
namespace app\admin\controller\configure;
use think\Db;
use think\Request;
use think\Config;

class Addweixin
{
   
   public function addweixin(Request $request){
    $userid=$request->param("userid");
    $time =date('Y-m-d H:i:s',time());//获取当前时间
    $count = db('addweixin')->where('userid', $userid)->count();
    if($count > 0){
      //已经完成过了
      $resdata=['state' => '200','message'  => "已经完成过任务了，添加不成功" ];
      return $resdata ;
    }
    else{
      //还没完成
      $dbdata = ['id'=>'','userid' =>$userid,'score' => 100 ,'create_time' =>$time];
      $dbreturn=db('addweixin')->insert($dbdata);
      $resdata=['state' => '200','message'  => "添加成功"];
      return $resdata ;
    }


    }



}