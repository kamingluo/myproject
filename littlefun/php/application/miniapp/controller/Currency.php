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
        $dbdata = ['id'=>'','openid' =>$request->param("useropenid"),'formid' =>$request->param("formid"),'channel' =>$request->param("channel"),'create_time' =>$time];
        $dbreturn=db('formid')->insert($dbdata);
        if($dbreturn==1){
        	return ['state'   => '200','message'  => "新增formid成功"] ;
        }
        else{
        	return ['state'   => '400','message'  => "新增formid失败"] ;
        }
             
    }
    
}
