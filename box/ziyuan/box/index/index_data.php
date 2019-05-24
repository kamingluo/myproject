<?php
header('Content-type: text/html; charset=UTF8');
$servername = "qdm166654168.my3w.com";
$username   = "qdm166654168";
$password   = "a3216953B";
$dbname     = "qdm166654168_db";

// 创建连接
$conn = new mysqli($servername, $username, $password, $dbname);
mysqli_set_charset($conn, 'utf8');
// Check connection
if ($conn->connect_error) {
	die("连接失败: " . $conn->connect_error);
}
$sql    = "select * from index_banner" ; //查询轮播图
$result = $conn->query($sql);

$mysql    = "select * from index_icon";//查询icon
$myresult = $conn->query($mysql);

$mysql2    = "select * from index_information";//查询icon
$myresult2 = $conn->query($mysql2);

$mysql3    = "select * from index_box WHERE box_type = 1  ORDER BY id ASC ";//查询box
$myresult3 = $conn->query($mysql3);

require "response.class.php"; //引入返回信息类

//准备返回数据
//$code = 200;
//$message = "稳的一批";
$arr = array();
// 输出每行数据
while ($row = $result->fetch_assoc()) {
	$count = count($row); //不能在循环语句中，由于每次删除row数组长度都减小
	for ($i = 0; $i < $count; $i++) {
		unset($row[$i]); //删除冗余数据
	}
	array_push($arr, $row);
}
$myarr = array();
// 输出每行数据
while ($myrow = $myresult->fetch_assoc()) {
	$mycount = count($myrow); //不能在循环语句中，由于每次删除row数组长度都减小
	for ($j = 0; $j < $mycount; $j++) {
		unset($myrow[$j]); //删除冗余数据
	}
	array_push($myarr, $myrow);
}


$myarr2 = array();
// 输出每行数据
while ($myrow2 = $myresult2->fetch_assoc()) {
	$mycount2 = count($myrow2); //不能在循环语句中，由于每次删除row数组长度都减小
	for ($v = 0; $v < $mycount2; $v++) {
		unset($myrow2[$v]); //删除冗余数据
	}
	array_push($myarr2, $myrow2);
}


$myarr3 = array();
// 输出每行数据
while ($myrow3 = $myresult3->fetch_assoc()) {
	$mycount3 = count($myrow3); //不能在循环语句中，由于每次删除row数组长度都减小
	for ($t = 0; $t < $mycount3; $t++) {
		unset($myrow3[$t]); //删除冗余数据
	}
	array_push($myarr3, $myrow3);
}






//实例化response类
$response = new Response;
//返回数据
echo $response->json($arr, $myarr, $myarr2, $myarr3); //把数据转入response类，response.class
$conn->close();
?>