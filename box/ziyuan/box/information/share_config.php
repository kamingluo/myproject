<?php
header('Content-type: text/html; charset=UTF8'); 
$servername = "qdm166654168.my3w.com";
$username = "qdm166654168";
$password = "a3216953B";
$dbname = "qdm166654168_db";
 
 // 创建连接
$conn = new mysqli($servername, $username, $password, $dbname);
mysqli_set_charset($conn,'utf8');
// Check connection
if ($conn->connect_error) {
    die("连接失败: " . $conn->connect_error);
} 
$sql = "SELECT  *  FROM box_share_config ";
$result = $conn->query($sql);

require "response.php";    //引入返回信息类
//准备返回数据
$code = 200;
$message = "信息请求成功";
$arr = array(); 
// 输出每行数据 
while($row = $result->fetch_assoc()) { 
  $count=count($row);//不能在循环语句中，由于每次删除row数组长度都减小 
  for($i=0;$i<$count;$i++){ 
    unset($row[$i]);//删除冗余数据 
  } 
  array_push($arr,$row); 
  
} 

$response = new Response;
//返回数据
echo $response -> json($code,$message,$arr);
$conn->close(); 
?>