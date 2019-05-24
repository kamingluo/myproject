<?php
header("Content-Type: text/json;charset=utf8");//设置jsno格式
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

  if($_GET[userid]==null){
  	 die ("不能为空，，，");
  }



mysql_query("set character set 'utf8'");//读库设置为utf8
$sql = "SELECT  id  FROM box_sign where userid = '$_GET[userid]' and  to_days(create_time)  = to_days(now())";
//$result = $conn->query($sql);
$result = mysql_query($sql,$con);
$num =mysql_num_rows($result);  //拿到今天有多少条数据
if ($num >= 1) 
    {
          $data = ['state'   => '100','message' => '今天已经签到过了']; 
    }
else 
	{      
        $data = ['state'   => '200','message' =>  '今天未签到']; 
	}

// 格式化成 json
echo json_encode($data);

mysql_close($con);
?>