<?php
namespace app\miniapp\controller;
use think\Db;
use think\Request;
use think\Config;

class Currency
{
    public function formid(Request $request)
    {

    	$time =date('Y-m-d H:i:s',time());//获取当前时间

      $dbnum =db('formid')->where('openid',$request->param("useropenid"))->whereTime('create_time', 'today')->count();//查询今日点广告数
      if($dbnum > 10 ){
        return ['state'   => '200','message'  => "今天大于10啦不用加了!"] ;
      }


        $dbdata = ['id'=>'','openid' =>$request->param("useropenid"),'formid' =>$request->param("formid"),'channel' =>$request->param("channel"),'create_time' =>$time];
        $dbreturn=db('formid')->insert($dbdata);
        if($dbreturn==1){
        	return ['state'   => '200','message'  => "新增formid成功"] ;
        }
        else{
        	return ['state'   => '400','message'  => "新增formid失败"] ;
        }
             
    }

    public function shareconfig(){
      $data = db('config')->where('id', 3)->value('value');
      $adconfig=json_decode($data);
      // return $data ;  json_encode() 和 json_decode()
      $state=['state'   => '200','message'  => "shareconfig" ];
      $resdata=array_merge($state,array('shareconfig'=>$adconfig));
      return $resdata ;
  }



    
}
