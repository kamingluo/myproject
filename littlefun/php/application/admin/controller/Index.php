<?php
namespace app\admin\controller;
use think\Db;

use think\Config;

class Index
{
    public function index()
    {

    	return  "admin" ;
    }
    
     public function test()
    {

        return  "admin-test" ;
    }
    //首页下面第三方小程序广告配置列表
    public function bottomminiappad()
    {
       $dbdata=db('index_bottom_miniapp_ad')->where('open',0)->order('id asc')->select();//查询小盟广告配置信息
        $state=['state'   => '200','message'  => "首页下面第三方小程序列表查询成功" ];
        $resdata=array_merge($state,array('indexminiappdata'=>$dbdata));
        return $resdata ;
    }

    //首页顶部轮播图配置
     public function topswiper()
    {
        $dbdata=db('index_top_swiper')->where('open',0)->order('id asc')->select();//查询小盟广告配置信息
        $state=['state'   => '200','message'  => "首页顶部轮播图列表查询成功" ];
        $resdata=array_merge($state,array('indexminiappdata'=>$dbdata));
        return $resdata ;
    }
}
