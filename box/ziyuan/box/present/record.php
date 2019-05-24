<?php
header("Content-Type: text/html;charset=utf8");
mysqli_set_charset($con,"utf8");
$con = mysql_connect("qdm166654168.my3w.com", "qdm166654168", "a3216953B");

if (!$con)
  {
  die('Could not connect: ' . mysql_error());//数据库连接不上
  }

$db_selected = mysql_select_db("qdm166654168_db",$con);
if (!$db_selected)
  {
  die ("Can\'t use test_db : " . mysql_error());//没有这个数据库
  }

  if($_GET[userid]==null||$_GET[cash]==null||$_GET[alipay_name]==null||$_GET[alipay_id]==null){
  	 die ("不能为空，，，");
  }

  if($_GET[cash]>100000){
  	die ("人工审核，撸毛没用的，，，");
  }


mysql_query("set character set 'utf8'");//读库设置为utf8
$sql = "SELECT  score  FROM box_user where id = '$_GET[userid]' ";
//$result = $conn->query($sql);
$result = mysql_query($sql,$con);
//$num =mysql_num_rows($result);  //拿到今天有多少条数据
$row = mysql_fetch_assoc($result);
$score=$row["score"];
echo $score;
sleep(1);

if($_GET[cash]>$score){
    die ("金币不足提现");
}


  mysql_query("set names 'utf8'");//写库设置为utf8
  $usersql = "UPDATE box_user SET score = score -'$_GET[cash]'  WHERE id='$_GET[userid]'";
  $userresult = mysql_query($usersql,$con);
  echo "扣除用户金币成功";

  //接下来增加提现记录
  $alipaysql = "INSERT INTO box_present (`id`,`userid`,`cash`,`alipay_name`,`alipay_id`,`state`,`create_time`) VALUES ('', '$_GET[userid]','$_GET[cash]','$_GET[alipay_name]','$_GET[alipay_id]','0',now())";
  $alipayresult = mysql_query($alipaysql,$con);
  echo "添加自己金币数据记录成功，，，";


  //接下来为他增加金币操作记录
  $mysql = "INSERT INTO box_score_record (`id`,`userid`,`score`,`explain`,`create_time`) VALUES ('', '$_GET[userid]','$_GET[cash]','提现扣除',now())";
  $myresult = mysql_query($mysql,$con);
  echo "添加自己金币数据操作记录成功";







mysql_close($con);
?>