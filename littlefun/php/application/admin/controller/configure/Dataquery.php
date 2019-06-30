<?php
namespace app\admin\controller\configure;
use think\Db;
use think\Request;
use think\Config;

class Dataquery
{
    public function coinstatistics(Request $request) //每日金币统计数据
    {
        $pages=$request->param("pages");
        $countnumber=$data=db('statistics')->count();
        if($pages == 1 || $pages==null  ){
          $data=db('statistics')->order('id desc')->limit(0,10)->select();
          $state=['state'   => '200','message'  => "每日金币统计数据" ];
          $resdata=array_merge($state,array('countnumber'=>$countnumber),array('data'=>$data));
          return $resdata ;
        }
        else{
          $number=($pages - 1)*10 ;
          $data=db('statistics')->order('id desc')->limit($number,10)->select();
          $state=['state'   => '200','message'  => "每日金币统计数据非第一页数据" ];
          $resdata=array_merge($state,array('countnumber'=>$countnumber),array('data'=>$data));
          return $resdata ;
        }
        
        
	}
	
    
}
