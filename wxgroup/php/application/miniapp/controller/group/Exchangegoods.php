<?php
namespace app\miniapp\controller\group;
use think\Db;
use think\Request;
use think\Config;

class Exchangegoods
{

    //用户的群兑换列表
    public function userchangelist(Request $request)
    {
    	$crowd_id=$request->param("crowd_id");//群id
    	$user_id=$request->param("user_id");//用户
    	$data=db('exchange_record')->where('crowd_id',$crowd_id)->where('user_id',$user_id)->order('id desc')->select();
    	$state=['state'   => '200','message'  => "用户的群兑换列表" ];
        $resdata=array_merge($state,array('data'=>$data));
        return $resdata ;
    }


      //用户的全部兑换列表
      public function userallchangelist(Request $request)
      {
        $openid=$request->param("openid");//用户的openid
        $data=db('exchange_record')->where('openid',$openid)->order('id desc')->select();
        $state=['state'   => '200','message'  => "用户的所有兑换列表" ];
        $resdata=array_merge($state,array('data'=>$data));
        return $resdata ;
      }
  




    //兑换记录详情
    public function exchangedetails(Request $request)
    {
    	$id=$request->param("exchange_id");//兑换记录id
    	$data=db('exchange_record')->where('id',$id)->find();
    	$state=['state'   => '200','message'  => "兑换记录详情" ];
        $resdata=array_merge($state,array('data'=>$data));
        return $resdata ;
    }



     //群主查看群兑换列表
    public function groupexchangelist(Request $request)
    {
    	$crowd_id=$request->param("crowd_id");//群id
    	$data=db('exchange_record')->where('crowd_id',$crowd_id)->order('id desc')->select();
    	$state=['state'   => '200','message'  => "群兑换列表" ];
        $resdata=array_merge($state,array('data'=>$data));
        return $resdata ;
    }



    //群主发货
    public function sendoutgoods(Request $request)
    {

    	$id=$request->param("exchange_id");//兑换记录id
    	$expressnumber=$request->param("expressnumber");//快递单号
    	$state=$request->param("state");//状态

    	if($state == 1){
    		//审核通过发货
    		$dbdata= db('exchange_record')->where('id',$id)->update(['expressnumber' => $expressnumber,'state' => 1]);
    		$state=['state'   => '200','message'  => "发货成功" ];
            $resdata=array_merge($state,array('dbdata'=>$dbdata));
           
            $temdata=delivergoods($id,$expressnumber);//推送消息给兑换的用户
            return $resdata ;
    	}
    	else{
    		$dbdata= db('exchange_record')->where('id',$id)->update(['state' => 2]);
    		$state=['state'   => '200','message'  => "发货审核失败" ];
            $resdata=array_merge($state,array('dbdata'=>$dbdata));
            return $resdata ;
    	}

    }





}

