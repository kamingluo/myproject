<?php
namespace app\miniapp\controller\game;
use think\Db;
use think\Request;
use think\Config;
use think\cache\driver\Redis;

class Tenseconds
{
    public function index(Request $request)
    {

    	return  "十秒挑战" ;
    }


     public function usertensecondsdata(Request $request)
    {
    	  $wxcode =$request->param("code");
		  $openid=openid($wxcode);
    	  $redis = new Redis();  //实例化这个类
         
          $data=$redis->get($openid);
          return $data;
    }


    


 
}
