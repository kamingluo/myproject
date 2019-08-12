<?php
namespace app\miniapp\controller\group;
use think\Db;
use think\Request;
use think\Config;

class Usergroup
{
    public function Usergroup(Request $request)
    {

    	// $sql= "SELECT rule FROM crowd where id=1 ;";
     //    $data = Db::query($sql); //拿到数据
        $dbnum =db('crowd')->where('id',2)->find();

        // return str_replace("\\","/",$dbnum["rule"]);
        // return $dbnum;
        echo $dbnum["rule"];



    	//  $wxcode =$request->param("code");
    	//  $openid=openid($wxcode);
    	//  $sql = "select crowd.*,user_crowd.user_type,user_crowd.score from crowd ,user_crowd where user_crowd.crowd_id=crowd.id and user_crowd.user_openid='o3XMA0enuFRZsOCOCeqjB70exjr4';";
     //     $msgdata = Db::query($sql); //拿到数据

    	// return  $msgdata;
    }
    
    

}


// {"1":"这是规则介绍1","2":"这是规则介绍2","3":"这是规则介绍3"}
// 
// [{"test":"这是规则介绍1"},{"test":"这是规则介绍2",{"test":"这是规则介绍3"}]