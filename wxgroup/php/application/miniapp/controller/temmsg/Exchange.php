<?php
namespace app\miniapp\controller\temmsg;
use think\Db;
use think\Request;
use think\Config;

class Exchange
{

	 //用户兑换给群主通知
    public function exchangesuccess(Request $request)
    {

    	//找出该群该群主最远的推送id;
    	//根据群id找到群主的openid
    	// $crowd_id=2;
    	// $crowd_owner_id=db('user_crowd')->where('crowd_id',$crowd_id)->where('user_type',1)->value('user_openid'); //拿到群主的openid
    	// // return $crowd_owner_id;
    	// $temmsg_formid=db('formid')->where('openid',$crowd_owner_id)->value('formid');//拿到推送id
    	// return $temmsg_formid;

        $nickName="兑换昵称";
        $goodsname="商品名称";
        $price=100;
        $crowd_id=2;



    	 $temmsg=userexchange($nickName,$goodsname,$price,$crowd_id);
 
    	
    	return   $temmsg;

     
    }


     //用户兑换给群主通知
    public function exchangetest(Request $request)
    {

    	
    	
    	$exchange_id=$request->param("exchange_id");//兑换记录id
        $expressnumber=$request->param("expressnumber");//快递单号

       //  $exchangedata=db('exchange_record')->where('id',$exchange_id)->find(); //根据id找到兑换详情
       //  $temmsg_openid=$exchangedata["openid"];
       //  $temmsg_formid=db('formid')->where('openid',$temmsg_openid)->value('formid');//拿到推送id
       //  return $temmsg_openid;
       //  $crowd_name=$exchangedata["crowd_name"];
       //  $goodsname=$exchangedata["goodsname"];
       //  if(!$expressnumber){
       //      $expressnumber="无快递单号";
       //  }
       // $time =date('Y-m-d H:i:s',time());//获取当前时间

    	
 
    	$temdata=delivergoods($exchange_id,$expressnumber);
    	return   $temdata;

     
    }

   
    

    

}

