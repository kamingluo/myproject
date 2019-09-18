<?php
// +----------------------------------------------------------------------
// | wxcarminiapp公共方法
// +----------------------------------------------------------------------

use think\Log;
use think\Db;
use think\Request;

use think\Controller;



//测试方法
function test(){
    return "test";

}


/**
   * 调取微信接口获取openid
   * 传入值code从小程序login API获取
   * @return string
*/
function openid($wxcode){
    if($wxcode == 'kaming'){
        $openid='o3XMA0eQOt1z2SH8FcoXf2n5ga7Y';
        return $openid;

    }
    $url = 'https://api.weixin.qq.com/sns/jscode2session';
    $data['appid']=Config('appid');
    $data['secret']= Config('secret');
    $data['js_code']= $wxcode;
    $data['grant_type']= 'authorization_code';
    $wxopenid = http($url, $data, 'GET');
    $openiddata=json_decode($wxopenid,true);
    $rest=array_key_exists("errcode",$openiddata);//判断返回值存在errcode证明code有误
        if($rest){ 
             Log::record('code错误或者过期了！传入微信code-->'.$wxcode,'error');
            echo  json_encode(['state'   => '400','message'  => "code错误或者过期了！" ] ) ;
            die ();
        }
        else{
        	$openid=$openiddata['openid'];
        	return $openid;
        }
}


/**
   * 调取微信接口获取openid
   * 传入值code从小程序login API获取
   * @return string
*/
function joingroup($crowd_id, $user_id, $user_openid){

        if($crowd_id == 0 || $crowd_id == null){
            return  "不执行加群，直接返回";
        }
        $time =date('Y-m-d H:i:s',time());
       
        $dbres =db('user_crowd')->where('user_id',$user_id)->where('crowd_id',$crowd_id)->find();//查询用户有没有加入群
        if($dbres){
            $resdata=['state'   => '200','message'  => "已经加入该群了" ];
            return $resdata;
        }else{

            $dbdata = ['id'=>'','user_id' =>$user_id,'user_openid' => $user_openid,'crowd_id' => $crowd_id,'user_type' => 0,'score' =>0,'remarks' =>null,'create_time' =>$time];
            $user_crowdid= db('user_crowd')->insertGetId($dbdata);//返回自增ID
            $state=['state'   => '200','message'  => "用户加入群成功" ];
            $resdata=array_merge($state,array('user_crowdid'=>$user_crowdid));
            return $resdata;
        }
}
