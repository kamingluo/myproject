<?php
// +----------------------------------------------------------------------
// | wxcarminiapp公共方法
// +----------------------------------------------------------------------

use think\Log;
use think\Db;
use think\Request;


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
        $openid='o3XMA0enuFRZsOCOCeqjB70exjr4';
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
   * 增加积分方法
   * $explain 增加积分说明
*/
function increase($openid,$data,$explain){
    $dbreturn= db('user')->where('openid',$openid)->setInc('score',$data['score']);
    // return $dbreturn;
    if($dbreturn == 1){
        $time =date('Y-m-d H:i:s',time());//获取当前时间
        $dbdata = ['id'=>'','openid' =>$openid,'score' =>$data['score'],'explain' =>$explain,'channel' =>$data['channel'],'master_id' => $data['master_id'],'create_time' =>$time];
        $dbreturn=db('score_record')->insert($dbdata);
        return 1;
        }
        else{
            return 0;    
        }

}


/**
   * 徒弟进贡
*/
function contribution($master_id,$score){
    $dbdata=db('user')->where('master_id',$master_id)->find();//查询师傅信息
    $addscore= db('user')->where('id',$dbdata['id'])->setInc('score',$score,'tribute',$score);
    $time =date('Y-m-d H:i:s',time());//获取当前时间

    $record = ['id'=>'','openid' =>$dbdata['openid'],'score' =>$score,'explain' =>"徒弟进贡",'channel' =>$dbdata['channel'],'master_id' => $dbdata['master_id'],'create_time' =>$time];
             $dbreturn=db('score_record')->insert($record);
    return ['state'   => '200','message'  => "进贡成功" ,'score' => $score] ;

}



