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


     //创建群
    public function setupgroup(Request $request)
    {
        $wxcode =$request->param("code");
        $crowd_name =$request->param("crowd_name");
        $introduce =$request->param("introduce");
        $logo=$request->param("logo");
        $openid=openid($wxcode);
        $groupowner=db('user')->where('openid',$openid)->find(); //群主信息
        $time =date('Y-m-d H:i:s',time());//获取当前时间


         //创建群成功
        $dbdata = ['id'=>'','crowd_name' =>$crowd_name,'crowd_ownerid' => $groupowner["id"],'introduce' => $introduce,'rule' => null,'logo' => $logo,'create_time' =>$time];
        $groupid= db('crowd')->insertGetId($dbdata);//返回自增ID

         //添加群主信息到群表
         $joingroup = ['id'=>'','user_id' => $groupowner["id"],'user_openid' =>  $groupowner["openid"],'crowd_id' => $groupid,'user_type' => 1,'score' =>0,'create_time' =>$time];
         $userjoingroup= db('user_crowd')->insertGetId($joingroup);//返回自增ID
        

        $state=['state'   => '200','message'  => "创建群成功" ];
        $resdata=array_merge($state,array('groupid'=>$groupid));
        return $resdata;

    }


}
