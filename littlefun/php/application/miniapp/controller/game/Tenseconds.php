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

          if( $gamenum == false){
          	 //缓存不存在
          	$redis->set($openid, 0); //存入缓存，
          	$gamenum =0; //下发为0 
          	$state=['state'   => '200','message'  => "查询用户十秒挑战次数" ];
            $resdata=array_merge($state,array('gamenumber'=>$gamenum));
            return  $resdata;
          	
          }else{
          	 //缓存存在
          	 $newgame= $gamenum+0;
          	 $state=['state'   => '200','message'  => "查询用户十秒挑战次数" ];
             $resdata=array_merge($state,array('gamenumber'=>$newgame));
             return  $resdata;
          }
        
    }



    public function add(Request $request)
    {
    	  $wxcode =$request->param("code");
		  $openid=openid($wxcode);
    	  $redis = new Redis();  //实例化这个类
          $gamenum=$redis->get($openid);
          $newgame =$gamenum + 1 ;
          $redis->set($openid,$newgame); //存入缓存，

          $state=['state'   => '200','message'  => "增加十秒挑战次数" ];

          $resdata=array_merge($state,array('gamenumber'=>$newgame));
          return  $resdata;
    }




    public function reduce(Request $request)
    {
    	  $wxcode =$request->param("code");
		  $openid=openid($wxcode);
    	  $redis = new Redis();  //实例化这个类
          $gamenum=$redis->get($openid);
          if( $gamenum == false){
          	$state=['state'   => '400','message'  => "已经等于0了不能再减了" ];
          	return $state;
          }
          else{
          	 $newgame =$gamenum - 1 ;
             $redis->set($openid,$newgame); //存入缓存，
             $state=['state'   => '200','message'  => "减少十秒挑战次数" ];
             $resdata=array_merge($state,array('gamenumber'=>$newgame));
             return  $resdata;
          }
        
    }


   

 
}
