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

if($_GET[openid] == null || $_GET[formid] ==null){
	 die("不能为空");
}
 
$sql = "INSERT INTO box_sign_msg (`id`,`openid`,`formid`,`create_time`) 
VALUES ('', '$_GET[openid]','$_GET[formid]',now())";


mysqli_select_db( $conn, 'qdm166654168_db' );
$retval = mysqli_query( $conn, $sql );

if(! $retval )
{
    die('插入数据失败: ' . mysqli_error($conn));
}
echo '插入数据成功';

 
mysqli_close($conn);
$conn->close();
?>