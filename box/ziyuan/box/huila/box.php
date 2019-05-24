<?php
header('Content-type: text/html; charset=UTF8'); 
$servername = "qdm166654168.my3w.com";
$username = "qdm166654168";
$password = "a3216953B";
$dbname = "qdm166654168_db";
include 'getcurl.php';//封装了发送get请求的php
include 'postCurl.php';//封装了发送post请求的php
$appid = "wx057fdbd3cdbeba6c";
//配置appscret
$secret = "55ca4c12f16177e109ec45d5c1f4d153";
//api接口
$api = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid={$appid}&secret={$secret}";
$str = httpGet($api);
$str = json_decode($str,true);
$b=$str['access_token'];//拿到token
$conn = new mysqli($servername, $username, $password, $dbname);//连接数据库
mysqli_set_charset($conn,'utf8');
// Check connection
if ($conn->connect_error) {
    die("连接失败: " . $conn->connect_error);
} 
$sql    = "select * from box_msg_copy1" ; //查询提交到数据库的信息
$result = $conn->query($sql);
//echo "准备推送";
while($row = $result->fetch_assoc()) { //循环操作推送
	$username="点点好玩";
	$userformid=$row["formid"];
	$useropenid=$row["openid"];
	temMsg($username,$userformid,$useropenid,$b);
}
echo "推送完成啦";
$mysql    = "truncate box_msg_copy1" ; //清空数据表
$result = $conn->query($mysql);
echo "把表清空啦";
//temMsg();
function temMsg($username,$userformid,$useropenid,$b)
{
    $name = $username;
    $formid = $userformid;
    $temid = 'zNAXZFULivpPe60FxFTvHotI992z_pLqsZZEggGHkOc';
    $page = 'pages/index/index?ald_media_id=8868&ald_link_key=231611a9e471031d';
    $openid =$useropenid;
    if(!$openid||!$formid)die('failed!');
    $key1 = $name;//发送的消息
    $key2 ='100';
    $access_token =$b;//拿到token的值赋值过去
    $url = 'https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token='.$access_token;
    $data = array(//这里一定要按照微信给的格式
        "touser"=>$openid,
        "template_id"=>$temid,
        "page"=>$page,
        "form_id"=>$formid,
        "data"=>array(
            "keyword1"=>array(
                "value"=>$key1,
                "color"=>"#173177"
            ),
            "keyword2"=>array(
                "value"=>"1000金币，等你来拿...",
                "color"=>"#173177"
            ),
            "keyword3"=>array(
                "value"=>"玩游戏奖励拿不停，推荐页等你来看！",
                "color"=>"#173177"
            ),
            "keyword4"=>array(
                "value"=>"我的页面现已开启神秘大礼，快去看看吧！",
                "color"=>"#FF0000"
            )
        ),
        "emphasis_keyword"=>"keyword5.DATA",//需要进行加大的消息
    );
    $res = postCurl($url,$data,'json');//将data数组转换为json数据
    if($res){
       // echo json_encode(array('state'=>4,'msg'=>$res));
    }else{
        echo json_encode(array('state'=>5,'msg'=>$res));
    }
}
//获取GET请求 拿token
function httpGet($url){
    $curl = curl_init();
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_TIMEOUT, 500);
    curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, true);
    curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, true);
    curl_setopt($curl, CURLOPT_URL, $url);
    $res = curl_exec($curl);
    curl_close($curl);
    return $res;
}

$conn->close();

?>
