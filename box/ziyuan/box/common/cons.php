
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

 mysql_query("set names 'utf8'");//写库设置为utf8

if ($_GET[type] == 0 || $_GET[type]==1 ||$_GET[type] == null ) {
	//减积分
	$sql = "UPDATE box_user SET score = score - '$_GET[score]'  WHERE id='$_GET[userid]'";
    $result = mysql_query($sql,$con);
    echo "减积分成功，，，";

    //接下来为他增加金币操作记录
  $mysql = "INSERT INTO box_score_record (`id`,`userid`,`score`,`explain`,`create_time`) VALUES ('', '$_GET[userid]','$_GET[score]','竞猜扣除',now())";
  $myresult = mysql_query($mysql,$con);
  echo "添加自己金币数据操作记录成功";
}
else{//加积分

	       $usersql = "UPDATE box_user SET score = score +'$_GET[score]'  WHERE id='$_GET[userid]'";
           $userresult = mysql_query($usersql,$con);
           echo "加积分成功，，，";
           $mysql = "INSERT INTO box_score_record (`id`,`userid`,`score`,`explain`,`create_time`) VALUES ('', '$_GET[userid]','$_GET[score]','竞猜收益',now())";
           $myresult = mysql_query($mysql,$con);
           echo "11添加自己金币数据操作记录成功";
}






mysql_close($con);
?>