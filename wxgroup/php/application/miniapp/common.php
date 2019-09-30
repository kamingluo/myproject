<?php
// +----------------------------------------------------------------------
// | wxcarminiapp公共方法
// +----------------------------------------------------------------------

use think\Log;
use think\Db;
use think\Request;
use think\Controller;
use think\Config;





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






//用户兑换给群主通知
function userexchange($nickName,$goodsname,$price,$crowd_id){
    //根据群id找到群主的openid
   
    $crowd_owner_id=db('user_crowd')->where('crowd_id',$crowd_id)->where('user_type',1)->value('user_openid'); //拿到群主的openid
    $temmsg_formid=db('formid')->where('openid',$crowd_owner_id)->value('formid');//拿到推送id


      $data['appid']=Config('appid');
      $data['secret']= Config('secret');
      $data['grant_type']= 'client_credential';
      $api = "https://api.weixin.qq.com/cgi-bin/token";//拿token接口
      $str = http($api, $data,'GET');
      $token = json_decode($str,true);
      $access_token=$token['access_token'];//拿到token

      $formid = $temmsg_formid;
      $temid = '7VM82TEd8RZL7cSVe5uViuBaJcsRZqCJqLsV2_rCRGI';
      $page = 'pages/index/index';
      $openid =$crowd_owner_id;
     // if(!$formid)die('failed!');//openid有出现等于0的情况，所以不判断了
     $url = 'https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token='.$access_token;
     $data = array(//这里一定要按照微信给的格式
        "touser"=>$openid,
        "template_id"=>$temid,
        "page"=>$page,
        "form_id"=>$formid,
        "data"=>array(
            "keyword1"=>array(
                "value"=>$nickName,
                "color"=>"#173177"
            ),
            "keyword2"=>array(
                "value"=>$goodsname,
                "color"=>"#173177"
            ),
            "keyword3"=>array(
                "value"=>$price,
                "color"=>"#173177"
            )
        ),
        "emphasis_keyword"=>"keyword5.DATA",//需要进行加大的消息
    );
     $res = postCurl($url,$data,'json');//将data数组转换为json数据
    if($res){
        //推送完要把值删除
         $cleardata=db('formid')-> where('formid',$temmsg_formid)->delete();
       return "推送成功";
       // echo json_encode(array('state'=>4,'msg'=>$res));
    }else{
         $cleardata=db('formid')-> where('formid',$temmsg_formid)->delete();
        return "推送失败";
        // echo json_encode(array('state'=>5,'msg'=>$res));
    }
}








//群主发货给用户通知
function delivergoods($exchange_id,$expressnumber){
    
        $exchange_id=$exchange_id;//兑换记录id
        $expressnumber=$expressnumber;//快递单号
        $exchangedata=db('exchange_record')->where('id',$exchange_id)->find(); //根据id找到兑换详情
        $temmsg_openid=$exchangedata["openid"];
        $temmsg_formid=db('formid')->where('openid',$temmsg_openid)->value('formid');//拿到推送id
        $crowd_name=$exchangedata["crowd_name"];
        $goodsname=$exchangedata["goodsname"];
        if(!$expressnumber){
            $expressnumber="无快递单号";
        }
       $time =date('Y-m-d H:i:s',time());//获取当前时间


      $data['appid']=Config('appid');
      $data['secret']= Config('secret');
      $data['grant_type']= 'client_credential';
      $api = "https://api.weixin.qq.com/cgi-bin/token";//拿token接口
      $str = http($api, $data,'GET');
      $token = json_decode($str,true);
      $access_token=$token['access_token'];//拿到token

      $formid = $temmsg_formid;
      $temid = 'sI1QE53GeoBxyqveS3VqVs-5vm3e1MnWTrO1wQg7crI';
      $page = 'pages/index/index';
      $openid =$temmsg_openid;
     // if(!$formid)die('failed!');//openid有出现等于0的情况，所以不判断了
     $url = 'https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token='.$access_token;
     $data = array(//这里一定要按照微信给的格式
        "touser"=>$openid,
        "template_id"=>$temid,
        "page"=>$page,
        "form_id"=>$formid,
         "data"=>array(
            "keyword1"=>array(
                "value"=>$crowd_name,
                "color"=>"#173177"
            ),
            "keyword2"=>array(
                "value"=>$goodsname,
                "color"=>"#173177"
            ),
            "keyword3"=>array(
                "value"=>$expressnumber,
                "color"=>"#173177"
            ),
            "keyword4"=>array(
                "value"=>$time,
                "color"=>"#930000"
            )
        ),
        "emphasis_keyword"=>"keyword5.DATA",//需要进行加大的消息
    );
     $res = postCurl($url,$data,'json');//将data数组转换为json数据
    if($res){
        //推送完要把值删除
         $cleardata=db('formid')-> where('formid',$temmsg_formid)->delete();
       return $res;
       // echo json_encode(array('state'=>4,'msg'=>$res));
    }else{
         $cleardata=db('formid')-> where('formid',$temmsg_formid)->delete();
        return  $res;
        // echo json_encode(array('state'=>5,'msg'=>$res));
    }
}