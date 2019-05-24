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

  if($_GET[userid]==null||$_GET[adid]==null){
  	 die ("不能为空，，，");
  }


$score =  rand(40,60);  //随机一个签到金额


mysql_query("set character set 'utf8'");//读库设置为utf8
$sql = "SELECT  id  FROM box_click_msad where userid = '$_GET[userid]' and  to_days(create_time)  = to_days(now())";
//$result = $conn->query($sql);
$result = mysql_query($sql,$con);
$num =mysql_num_rows($result);  //拿到今天有多少条数据
if ($num >= 3) 
    {
	echo "今天已经点击了三条广告了，，，";//如果数据大于三条就不做操作
    }
else 
	{
	//数据小于三条做判断，这个用户这个位置今天有没有点击过广告
	$sqlcharu = "SELECT  id  FROM box_click_msad where userid = '$_GET[userid]' and  adid = '$_GET[adid]'   and  to_days(create_time)  = to_days(now())";
	$result = mysql_query($sqlcharu,$con);
	$position_num =mysql_num_rows($result);
	    if($position_num >= 1)
	    {
		    echo "这个位置已经点击过了，，，";
	    }
	    else
	    {
	       mysql_query("set names 'utf8'");//写库设置为utf8
	       $usersql = "UPDATE box_user SET score = score +'$score'  WHERE id='$_GET[userid]'";
           $userresult = mysql_query($usersql,$con);
            echo "添加用户点广告金币成功，，，";



	       $sqlcharu = "INSERT INTO box_click_msad (`id`,`userid`,`adid`,`adname`,`score`,`channel`,`create_time`) VALUES ('', '$_GET[userid]','$_GET[adid]','$_GET[adname]','$score','$_GET[channel]',now())";
	       $result = mysql_query($sqlcharu,$con);
		   echo "添加点广告数据记录成功，，，";

		   //接下来为他增加记录
		   $mysql = "INSERT INTO box_score_record (`id`,`userid`,`score`,`explain`,`create_time`) VALUES ('', '$_GET[userid]','$score','推荐页广告',now())";
	       $myresult = mysql_query($mysql,$con);
	       echo "添加自己金币数据记录成功，，，";


	     }
	}


mysql_close($con);
?>