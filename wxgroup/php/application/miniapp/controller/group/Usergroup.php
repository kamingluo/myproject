<?php
namespace app\miniapp\controller\group;
use think\Db;
use think\Request;
use think\Config;

class Usergroup
{

    //查询用户拥有的群列表
    public function Usergroup(Request $request)
    {

    	$wxcode =$request->param("code");
    	$openid=openid($wxcode);
    	$sql = "select crowd.*,user_crowd.user_type,user_crowd.score from crowd ,user_crowd where user_crowd.crowd_id=crowd.id and user_crowd.user_openid='". $openid."';" ;
        $data = Db::query($sql); //拿到数据
        $state=['state'   => '200','message'  => "拿到用户加入群的列表" ];
        $resdata=array_merge($state,array('usergrouplist'=>$data));
        return $resdata ;
    }
}
