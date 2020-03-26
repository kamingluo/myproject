<?php
namespace app\admin\controller\configure;
use think\Db;
use think\Request;

class Tasks
{
   
    //任务列表页面
   public function taskslist(Request $request){
        $pages=$request->param("pages");
        $countnumber=db('task_record')->count();
        if($pages == 1 || $pages==null  ){
        $data=db('task_record')->order('id desc')->limit(0,10)->select();
        $state=['state'   => '200','message'  => "任务列表查询成功" ];
        $resdata=array_merge($state,array('countnumber'=>$countnumber),array('data'=>$data));
        return $resdata ;
        }
        else{
        $number=($pages - 1)*10 ;
        $data=db('task_record')->order('id desc')->limit($number,10)->select();
        $state=['state'   => '200','message'  => "任务列表查询成功" ];
        $resdata=array_merge($state,array('countnumber'=>$countnumber),array('data'=>$data));
        return $resdata ;
        }
    }

   //删除一条任务
   public function deletetask(Request $request){
        $data=db('task_record')-> where('id', $request->param("id"))->delete();
        $state=['state'   => '200','message'  => "任务删除成功" ];
        $resdata=array_merge($state,array('data'=>$data));
        return $resdata ;
   }



}