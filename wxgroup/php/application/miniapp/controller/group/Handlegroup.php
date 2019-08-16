<?php
namespace app\miniapp\controller\group;
use think\Db;
use think\Request;
use think\Config;

class Handlegroup
{

    //查询群用户列表
    public function groupuserlist(Request $request)
    {
    	$crowd_id=$request->param("crowd_id");//群id
    	$pages=$request->param("pages");
    	$endnumber=$pages*10 ; //结束查询条数
    	$startnumber=$endnumber -10;//开始查询条数
        $sql = "select user.*,user_crowd.user_type,user_crowd.score,user_crowd.create_time as joincrowd_time from user,user_crowd where user.id=user_crowd.user_id and user_crowd.crowd_id = ".$crowd_id." order BY user_crowd.score desc LIMIT ".$startnumber.",".$endnumber.";";
        $groupuserlist = Db::query($sql); //拿到数据
        $state=['state'   => '200','message'  => "查询群用户列表成功" ];
        $resdata=array_merge($state,array('groupuserlist'=>$groupuserlist));
        return $resdata ;

    }
    

     //根据用户昵称模糊查询
    public function querygroupuser(Request $request)
    {
        $crowd_id=$request->param("crowd_id");//群id
        $nickName=$request->param("nickName");
        $sql = "select user.*,user_crowd.user_type,user_crowd.score,user_crowd.create_time as joincrowd_time from user,user_crowd where user.id=user_crowd.user_id and user_crowd.crowd_id = " .$crowd_id. " and user.nickName  LIKE '%".$nickName."%' order BY user_crowd.score desc;";
        // return $sql;
        $querygroupuser = Db::query($sql); //拿到数据
        $state=['state'   => '200','message'  => "根据用户昵称模糊查询成功" ];
        $resdata=array_merge($state,array('querygroupuser'=>$querygroupuser));
        return $resdata ;

    }



     //修改用户的群积分账户
    public function updateusergroupscore(Request $request)
    {
        $crowd_id=$request->param("crowd_id");//群ID
        $user_id=$request->param("user_id");//用户ID
        $score=$request->param("score");//用户ID
        if(is_numeric($score) && $score > 0){
        	 $updateres= db('user_crowd')->where('crowd_id',$crowd_id)->where('user_id',$user_id)->update(['score' =>$score]);
        	 $state=['state'   => '200','message'  => "修改用户积分成功" ];
        	 $resdata=array_merge($state,array('updateres'=>$updateres));
        	 return $resdata ;
        }
        else{
        	 $state=['state'   => '200','message'  => "数据错误" ];
             $resdata=array_merge($state,array('updateres'=> 0 ));
             return $resdata ;

        }
      
    }

   //设置群管理员
   public function setupadministrators(Request $request) 
   {

        $crowd_id=$request->param("crowd_id");//群ID
        $user_id=$request->param("user_id");//用户ID
        $updateres= db('user_crowd')->where('crowd_id',$crowd_id)->where('user_id',$user_id)->update(['user_type' => 2 ]);
        $state=['state'   => '200','message'  => "设置群管理员成功" ];
        $resdata=array_merge($state,array('updateres'=>$updateres));
        return $resdata ;

   }


   //取消群管理员
   public function canceladministrators(Request $request) 
   {

        $crowd_id=$request->param("crowd_id");//群ID
        $user_id=$request->param("user_id");//用户ID
        $updateres= db('user_crowd')->where('crowd_id',$crowd_id)->where('user_id',$user_id)->update(['user_type' => 0 ]);
        $state=['state'   => '200','message'  => "取消群管理员成功" ];
        $resdata=array_merge($state,array('updateres'=>$updateres));
        return $resdata ;

   }



    

}

