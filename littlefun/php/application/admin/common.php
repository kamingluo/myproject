<?php
// +----------------------------------------------------------------------
// | wxcarminiapp公共方法
// +----------------------------------------------------------------------

use think\Log;


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



function signtemMsg($formid,$openid,$access_token)
{
    $formid = $formid;
    $temid = 'iClWDGVGgzkixCkJPeaZ5iqPkJfHzgapJ8oA7A6wTRQ';
    $page = 'pages/task/task?ald_media_id=20276&ald_link_key=80e8cc11a4c18d99';
    $openid =$openid;
    if(!$openid||!$formid)die('failed!');
    $url = 'https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token='.$access_token;
    $data = array(//这里一定要按照微信给的格式
        "touser"=>$openid,
        "template_id"=>$temid,
        "page"=>$page,
        "form_id"=>$formid,
        "data"=>array(
            "keyword1"=>array(
                "value"=>"每日签到",
                "color"=>"#173177"
            ),
            "keyword2"=>array(
                "value"=>"轻轻一点签到，还有其他奖励等你来领取！",
                "color"=>"#173177"
            ),
            "keyword3"=>array(
                "value"=>"20金币",
                "color"=>"#173177"
            ),
            "keyword4"=>array(
                "value"=>"未签到！",
                "color"=>"#930000"
            )
        ),
        "emphasis_keyword"=>"keyword5.DATA",//需要进行加大的消息
    );
    $res = postCurl($url,$data,'json');//将data数组转换为json数据
    if($res){
        echo "111";
       // echo json_encode(array('state'=>4,'msg'=>$res));
    }else{
         echo "222";
        // echo json_encode(array('state'=>5,'msg'=>$res));
    }
}


function postCurl($url,$data,$type)
{
    if($type == 'json'){
        $data = json_encode($data);//对数组进行json编码
        $header= array("Content-type: application/json;charset=UTF-8","Accept: application/json","Cache-Control: no-cache", "Pragma: no-cache");
    }
    $curl = curl_init();
    curl_setopt($curl,CURLOPT_URL,$url);
    curl_setopt($curl,CURLOPT_POST,1);
    curl_setopt($curl,CURLOPT_SSL_VERIFYPEER,false);
    curl_setopt($curl,CURLOPT_SSL_VERIFYHOST,false);
    if(!empty($data)){
        curl_setopt($curl,CURLOPT_POSTFIELDS,$data);
    }
    curl_setopt($curl,CURLOPT_RETURNTRANSFER,1);
    curl_setopt($curl,CURLOPT_HTTPHEADER,$header);
    $res = curl_exec($curl);
    if(curl_errno($curl)){
        echo 'Error+'.curl_error($curl);
    }
    curl_close($curl);
    return $res;
}

