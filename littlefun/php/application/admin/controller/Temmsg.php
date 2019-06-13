<?php


namespace app\admin\controller;
use think\Db;
use think\Request;
use think\Exception;
use think\Log;

class Temmsg
{
   
    
    public function signmsg(Request $request) //签到推送
    {
    	set_time_limit(0);//设置超时时间
      $data['appid']=Config('appid');
      $data['secret']= Config('secret');
      $data['grant_type']= 'client_credential';
      $api = "https://api.weixin.qq.com/cgi-bin/token";//拿token接口
      $str = http($api, $data,'GET');
      $token = json_decode($str,true);
      $access_token=$token['access_token'];//拿到token
      // return $access_token;

      $sql = "Select formid1.* from formid1,(Select openid,min(id) as id from formid1 GROUP BY openid )  a  where formid1.openid=a.openid and formid1.id=a.id;";
      $msgdata = Db::query($sql); //拿到数据
      $count = count($msgdata);//拿到数值条数

      
      foreach($msgdata as $count  => $data){
         // echo $data["formid"];
         // echo $data["openid"];
         $resdata=signtemMsg($data["formid"],$data["openid"],$access_token);
         $clear=db('formid1')-> where('formid', $data["formid"])->delete();
       }

        $emaildata=sendEmail([['user_email'=>'954087620@qq.com','content'=>'签到推送完毕']]);
        return   $emaildata;

    }
   

}
