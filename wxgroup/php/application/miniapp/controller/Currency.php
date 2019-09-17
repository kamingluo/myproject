<?php
namespace app\miniapp\controller;
vendor('Qiniu.autoload');
use think\Db;
use think\Request;
use think\Config;
use Qiniu\Auth;
use Qiniu\Storage\UploadManager;

class Currency
{


   public function qiniu()
    {

        // Vendor('phpmailer.phpmailer'); 
        $accessKey = 'cOtKv4WjF_QrS7Cb98oOo0zQrmzbJNmJGeoCsQB3';
          $secretKey = 'tk2gLlSppyxjOWP6LGOsK4SNboyjIh44BAicYBXB';
          $auth = new Auth($accessKey, $secretKey);
          $bucket = 'group';
          // 生成上传Token
         $upToken  = $auth->uploadToken($bucket);

        // return  $upToken;
         $ret = array('message' => "生成七牛上传Token成功",'uptoken' => $upToken);
         return $ret;
    
          // // 要上传文件的本地路径
          // $filePath = './logo.png';
          // // 上传到七牛后保存的文件名
          // $key = 'logo.png';
          // // 初始化 UploadManager 对象并进行文件的上传。
          // $uploadMgr = new UploadManager();
          // // 调用 UploadManager 的 putFile 方法进行文件的上传。
          // list($ret, $err) = $uploadMgr->putFile($upToken, $key, $filePath);
          // //echo "\n====> putFile result: \n";
          // if ($err !== null) {
          //    return $err;
          //  } 
          // else 
          // {
          //    return $ret;
          // }
     }

     public function qiniumaterial()
    {

        $accessKey = 'cOtKv4WjF_QrS7Cb98oOo0zQrmzbJNmJGeoCsQB3';
          $secretKey = 'tk2gLlSppyxjOWP6LGOsK4SNboyjIh44BAicYBXB';
          $auth = new Auth($accessKey, $secretKey);
          $bucket = 'material';
          // 生成上传Token
         $upToken  = $auth->uploadToken($bucket);

        // return  $upToken;
         $ret = array('message' => "生成material七牛上传Token成功",'uptoken' => $upToken);
         return $ret;
     }


  public function formid(Request $request)
    {

    	$time =date('Y-m-d H:i:s',time());//获取当前时间
      $openid=$request->param("openid");
      $channel=$request->param("channel");
      $formid=$request->param("formid");

      $dbnum =db('formid')->where('openid',$openid)->whereTime('create_time', 'today')->count();//查询今日点广告数
      if($dbnum > 3 ){
        return ['state'   => '200','message'  => "今天大于3啦不用加了!"] ;
      }


        $dbdata = ['id'=>'','openid' =>$openid,'formid' =>$formid,'channel' =>$channel,'create_time' =>$time];
        $dbreturn=db('formid')->insert($dbdata);
        if($dbreturn==1){
        	return ['state'   => '200','message'  => "新增formid成功"] ;
        }
        else{
        	return ['state'   => '400','message'  => "新增formid失败"] ;
        }
             
    }

public function getqrcode(Request $request)
 {
  $crowd_id=$request->param("crowd_id");
  if (is_file('./qrcode/'.$crowd_id.'.png')){
    return ['state'   => '200','message'  => "二维码已经存在" ,'type' => 'success'] ;
  }else{
    
    $data['appid']=Config('appid');
    $data['secret']= Config('secret');
    $data['grant_type']= 'client_credential';
    $api = "https://api.weixin.qq.com/cgi-bin/token";//拿token接口
    $str = http($api, $data,'GET');
    $token = json_decode($str,true);
    $access_token=$token['access_token'];//拿到token
    $url = "https://api.weixin.qq.com/wxa/getwxacode?access_token=$access_token";
     //阿拉丁统计链接pages/index/index?channel=1000&ald_media_id=26447&ald_link_key=6f92ad04b6256d10
    $data = json_encode(array("path"=>"pages/index/index?crowd_id=$crowd_id&channel=1000&ald_media_id=26447&ald_link_key=6f92ad04b6256d10","width"=> 150));
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_HEADER, 'image/gif');
    curl_setopt($ch, CURLOPT_URL,$url);
    curl_setopt($ch, CURLOPT_POSTFIELDS,$data);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        'Content-Type: application/json',
        'Content-Length: ' . strlen($data)
    ));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER,1); //如果需要将结果直接返回到变量里，那加上这句。
    $res = curl_exec($ch);
    $image = 'data:image/jpeg;base64,'.base64_encode($res);//补全base64加密字符串头
    if (strstr($image,",")){
       $image = explode(',',$image);
       $image = $image[1];
    }
    $path = "./qrcode";
    if (!is_dir($path)){ //判断目录是否存在 不存在就创建
       mkdir($path,0777,true);
    }
    $imageSrc= $path."/". $crowd_id.'.png'; //图片名字
    $r = file_put_contents($imageSrc, base64_decode($image));//返回的是字节数
    if ($r) {
      return ['state'   => '200','message'  => "二维码生成成功" ,'type' => 'success'] ;
    }else{
      return ['state'   => '400','message'  => "二维码生成失败" ,'type' => 'fail'] ;
    }
  }

}



       function nonceStr() {
        $time =date('Y-m-d H:i:s',time());//获取当前时间
        for ($v=0; $v< 10; $v++) { 
             $seed = array(0,1,2,3,4,5,6,7,8,9);
            $str = '';
            for($i=0;$i<8;$i++) {
                $rand = rand(0,count($seed)-1);
                $temp = $seed[$rand];
                $str .= $temp;
                unset($seed[$rand]);
                $seed = array_values($seed);
            }
             $data = ['id'=>'','code' =>$str,'create_time' =>$time];
             $dbreturn=db('group_code')->insert($data);
         }
         return ['state'   => '200','message'  => "群邀请码生成成功"] ;
      }


}
