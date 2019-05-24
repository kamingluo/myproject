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

  if($_GET[userid]==null||$_GET[adid]==null||$_GET[score]==null||$_GET[master_id]==null){
  	 die ("不能为空，，，");
  }

  if($_GET[score]>200){
  	die ("人工审核，撸毛没用的，，，");
  }

  $score =  rand(80,100);  //随机一个广点通金额

  mysql_query("set character set 'utf8'");//读库设置为utf8

  if($_GET[adid]==999){
  	//echo "这是广点通广告每天奖励";
  	$sql = "SELECT  id  FROM box_click_gdt where userid = '$_GET[userid]' and  to_days(create_time)  = to_days(now())";
    $result = mysql_query($sql,$con);
    $num =mysql_num_rows($result);  //拿到今天有多少条数据
    if ($num >= 1) 
    {
      $data = ['state'   => '100']; //输出签到结果
//	echo "今天已经点击过广点通广告了，，，";//如果数据大于三条就不做操作
    }
    else{
    	   mysql_query("set names 'utf8'");//写库设置为utf8
	       $usersql = "UPDATE box_user SET score = score +'$score'  WHERE id='$_GET[userid]'";
           $userresult = mysql_query($usersql,$con);
          // echo "添加用户广点通金币成功，，，";

	       $sqlcharu = "INSERT INTO box_click_gdt (`id`,`userid`,`adid`,`adname`,`score`,`channel`,`create_time`) VALUES ('', '$_GET[userid]','$_GET[adid]','$_GET[adname]','$score','$_GET[channel]',now())";
	       $result = mysql_query($sqlcharu,$con);
		   //echo "添加点广点通数据记录成功，，，";

		   //接下来为他增加记录
		   $mysql = "INSERT INTO box_score_record (`id`,`userid`,`score`,`explain`,`create_time`) VALUES ('', '$_GET[userid]','$score','神秘奖励',now())";
	       $myresult = mysql_query($mysql,$con);
	       //echo "添加自己金币广点通数据记录成功，，，";
         $data = ['state'   => '200']; //输出签到结果
    }

  }


 else{
 $sql = "SELECT  id  FROM box_click_ad where userid = '$_GET[userid]' and  to_days(create_time)  = to_days(now())";
//$result = $conn->query($sql);
$result = mysql_query($sql,$con);
$num =mysql_num_rows($result);  //拿到今天有多少条数据
if ($num >= 3) 
    {
      $data = ['state'   => '100']; //输出签到结果
	//echo "今天已经点击了三条广告了，，，";//如果数据大于三条就不做操作
    }
else 
	{
	//数据小于三条做判断，这个用户这个位置今天有没有点击过广告
	$sqlcharu = "SELECT  id  FROM box_click_ad where userid = '$_GET[userid]' and  adid = '$_GET[adid]'   and  to_days(create_time)  = to_days(now())";
	$result = mysql_query($sqlcharu,$con);
	$position_num =mysql_num_rows($result);
	    if($position_num >= 1)
	    {
		   // echo "这个位置已经点击过了，，，";
       $data = ['state'   => '100']; //输出签到结果
	    }
	    else
	    {
	       mysql_query("set names 'utf8'");//写库设置为utf8
	       $usersql = "UPDATE box_user SET score = score +'$_GET[score]'  WHERE id='$_GET[userid]'";
           $userresult = mysql_query($usersql,$con);
          // echo "添加用户点广告金币成功，，，";
             
             $data = ['state'   => '200']; //输出签到结果


	       $sqlcharu = "INSERT INTO box_click_ad (`id`,`userid`,`adid`,`adname`,`score`,`channel`,`create_time`) VALUES ('', '$_GET[userid]','$_GET[adid]','$_GET[adname]','$_GET[score]','$_GET[channel]',now())";
	       $result = mysql_query($sqlcharu,$con);
		   //echo "添加点广告数据记录成功，，，";

		   //接下来为他增加记录
		   $mysql = "INSERT INTO box_score_record (`id`,`userid`,`score`,`explain`,`create_time`) VALUES ('', '$_GET[userid]','$_GET[score]','玩游戏',now())";
	       $myresult = mysql_query($mysql,$con);
	       //echo "添加自己金币数据记录成功，，，";


	       if($_GET['master_id']==0||$_GET['master_id']==null){
		      // echo "没有师傅";
	          }
	       else{
		    
		        $mastersql = "UPDATE box_user SET score = score +'15' , pay_tribute=pay_tribute+'15' WHERE id='$_GET[master_id]'";
                $masterresult = mysql_query($mastersql,$con);
               // echo "给师傅加金币成功，，，";

                $mastermysql = "INSERT INTO box_score_record (`id`,`userid`,`score`,`explain`,`create_time`) VALUES ('', '$_GET[master_id]','15','徒弟进贡',now())";
	            $mastermyresult = mysql_query($mastermysql,$con);
	           // echo "添加师傅金币数据记录成功，，，";

	           
                $tribute = "UPDATE box_tribute_table SET pay_tribute = pay_tribute +'15'  WHERE master_id='$_GET[master_id]' and openid ='$_GET[openid]'";
                $tributeresult = mysql_query($tribute,$con);
	           // echo "累计进贡表添加数据成功";


	         }

	     }
	}

  }


echo json_encode($data);
mysql_close($con);
?>