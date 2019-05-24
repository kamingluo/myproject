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
 
$sql = "INSERT INTO box_gdt (`id`,`channel`,`openid`,`userid`,`master_id`,`location`,`create_time`) 
VALUES ('', '$_GET[channel]','$_GET[openid]','$_GET[userid]','$_GET[master_id]','$_GET[location]',now())";


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