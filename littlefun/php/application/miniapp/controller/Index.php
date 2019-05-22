<?php
namespace app\miniapp\controller;
use think\Db;
use think\Request;
use think\Config;

class Index
{
    public function index(Request $request)
    {

    	// return  "一点好玩" ;
       $time =date('Y-m-d H:i:s',time());//获取当前时间
        $weekend=date("Y-m-d H:i:s", strtotime('-7 days'));//一周之内的数据
        $dbdata=db('score_record')-> where('create_time','< time', $weekend)->select();
        return $dbdata;


    }
    
    //首页下面第三方小程序广告配置列表
    public function bottomminiappad(Request $request)
    {
       $dbdata=db('index_bottom_miniapp_ad')->where('open',0)->order('id asc')->select();//查询小盟广告配置信息
        $state=['state'   => '200','message'  => "首页下面第三方小程序列表查询成功" ];
        $resdata=array_merge($state,array('indexminiappdata'=>$dbdata));
        return $resdata ;
    }

    //首页顶部轮播图配置
     public function topswiper(Request $request)
    {
        $dbdata=db('index_top_swiper')->where('open',0)->order('id asc')->select();//查询小盟广告配置信息
        $state=['state'   => '200','message'  => "首页顶部轮播图列表查询成功" ];
        $resdata=array_merge($state,array('indexminiappdata'=>$dbdata));
        return $resdata ;
    }
}
