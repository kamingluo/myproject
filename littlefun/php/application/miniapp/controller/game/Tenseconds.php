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
           $gamenum=$redis->get($openid);
        
          // return $gamenum;

          if( $gamenum == false ){
          	echo "不存在";

          	 //缓存不存在
          	// $redis->set($openid, 0); //存入缓存，
          	// echo "----";
          	// $gamenum =0; //下发为0 
          	// return 	$gamenum;
          	 
          	
          }else{
          	echo "存在";
          	 //缓存存在
          	  // return 	$gamenum;

          }
        
    }


   

 
}
