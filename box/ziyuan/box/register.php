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

$channel = $_GET['channel'];
if($channel==null){
	echo "执行重新定义";
	$channel = 0;
}



mysql_query("set character set 'utf8'");//读库设置为utf8
$sql = "SELECT * FROM box_user WHERE openid = '$_GET[openid]' ";
$result = mysql_query($sql,$con);
$num =mysql_num_rows($result);
//echo mysql_num_rows($result);//输出多少条数据
if ($num > 0) 
    {
	$sqlcharu = "UPDATE box_user SET updata_time = now() WHERE openid='$_GET[openid]'";
	$result = mysql_query($sqlcharu,$con);
	echo "更新数据成功";
    }
else
	{
	mysql_query("set names 'utf8'");//写库设置为utf8
	$sqlcharu = "INSERT INTO box_user (`id`,`openid`,`score`,`pay_tribute`,`channel`,`master_id`,`create_time`,`updata_time`) VALUES ('', '$_GET[openid]','0','0','$_GET[channel]','$_GET[master_id]',now(),now())";
	$result = mysql_query($sqlcharu,$con);
	//echo "添加数据成功";

	if($_GET['master_id']==null){
		echo "没有师傅";
	}
	else{
		
		$sql = "UPDATE box_user SET score = score +'100' , pay_tribute=pay_tribute+'100'  WHERE id='$_GET[master_id]'";
        $result = mysql_query($sql,$con);
        echo "给师傅加积分成功";

        $mastermysql = "INSERT INTO box_score_record (`id`,`userid`,`score`,`explain`,`create_time`) VALUES ('', '$_GET[master_id]','100','邀请收徒',now())";
	    $mastermyresult = mysql_query($mastermysql,$con);
	    echo "添加师傅金币数据记录成功，，，";

	    $tribute = "INSERT INTO box_tribute_table (`id`,`master_id`,`openid`,`pay_tribute`,`create_time`) VALUES ('', '$_GET[master_id]','$_GET[openid]','100',now())";
	    $tributeresult = mysql_query($tribute,$con);
	    echo "累计进贡表插入数据";


	}


	}


//echo mysql_num_rows($result);//输出多少条数据

mysql_close($con);
?>