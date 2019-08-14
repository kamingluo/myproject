<?php
namespace app\miniapp\controller\task;
use think\Db;
use think\Request;
use think\Config;

class Usertask
{

    //查询用户的任务列表
    public function usertasklist(Request $request)
    {
    	$wxcode =$request->param("code");
        $openid=openid($wxcode);
        $usertasklist =db('task_record')->where('openid',$openid)->order('id desc')->select();
        $state=['state'   => '200','message'  => "查询用户的任务列表数据成功" ];
        $resdata=array_merge($state,array('usertasklist'=>$usertasklist));
        return $resdata ;
      
    }
    

     //用户提交任务
    public function usersubmittask(Request $request)
    {
        $wxcode =$request->param("code");
        $openid=openid($wxcode);
        //$score =$request->param("score");
        $explain =$request->param("explain");
        $crowd_id =$request->param("crowd_id");
        $crowd_name =$request->param("crowd_name");
        $imagesdata =$request->param("images");
        $images= htmlspecialchars_decode($imagesdata);
        $time =date('Y-m-d H:i:s',time());//获取当前时间
        $userdata=db('user')->where('openid',$openid)->find();//查询用户信息
  
        $dbdata = ['id'=>'','openid' =>$openid,'user_id' =>$userdata["id"],'channel' =>$userdata["channel"],'score' =>0,'explain' =>$explain,'crowd_id' =>$crowd_id,'crowd_name' =>$crowd_name,'nickName' =>$userdata["nickName"],'images' =>$images,'result' =>null,'state' =>0,'create_time' =>$time];
        	 $dbreturn=db('task_record')->insert($dbdata);

        $state=['state'   => '200','message'  => "提交任务成功" ];
        $resdata=array_merge($state,array('dbreturn'=>$dbreturn));
        return $resdata ;
    }
    

}

