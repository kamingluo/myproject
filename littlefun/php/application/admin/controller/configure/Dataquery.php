<?php
namespace app\admin\controller\configure;
use think\Db;
use think\Request;
use think\Config;

class Dataquery
{
    public function coinstatistics() //每日金币统计数据
    {
    	  $data=db('statistics')->order('id desc')->select();
        $state=['state'   => '200','message'  => "每日金币统计数据" ];
        $resdata=array_merge($state,array('data'=>$data));
        return $resdata ;
	}
	
    
}
