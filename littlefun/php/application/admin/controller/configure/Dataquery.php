<?php
namespace app\admin\controller\configure;
use think\Db;
use think\Request;
use think\Config;

class Dataquery
{
    public function coinstatistics(Request $request) //每日金币统计数据
    {
        $pages=$request->param("pages");
        $countnumber=db('statistics')->count();
        if($pages == 1 || $pages==null  ){
          $data=db('statistics')->order('id desc')->limit(0,10)->select();
          $state=['state'   => '200','message'  => "每日金币统计数据" ];
          $resdata=array_merge($state,array('countnumber'=>$countnumber),array('data'=>$data));
          return $resdata ;
        }
        else{
          $number=($pages - 1)*10 ;
          $data=db('statistics')->order('id desc')->limit($number,10)->select();
          $state=['state'   => '200','message'  => "每日金币统计数据非第一页数据" ];
          $resdata=array_merge($state,array('countnumber'=>$countnumber),array('data'=>$data));
          return $resdata ;
        }
        
        
	}

 public function userdata(Request $request) //用户信息
 {

    $openid=$request->param("openid");
    $userdata = db('user')->where('openid',$openid)->find();//查询用户信息

    $gdtbanner=db('gdt_ad_record')->where('openid',$openid)->where('adtype',1)->sum('score');//查询7天点击banner数
    $gdtvideo=db('gdt_ad_record')->where('openid',$openid)->where('adtype',2)->sum('score');//查询7天点击banner数
    $sign=db('sign')->where('openid',$openid)->sum('score');//查询7天签到数
    $miniapp=db('miniapp_ad_record')->where('openid',$openid)->sum('score');//查询7天点击小程序跳转广告成功
    $wlad=db('wl_ad_record')->where('openid',$openid)->sum('score');//查询7天点击微量广告成功
    $share=db('share_record')->where('openid',$openid)->sum('score');//查询7天分享任务成功

    //徒弟进贡
    $tribute=db('score_record')->where('openid',$openid)-> where('explain',"徒弟进贡")->sum('score');

    //骰子赢得
    $dicewin=db('score_record')->where('openid',$openid)-> where('explain',"猜大小赢得")->sum('score');
    //骰子输了
    $dicelose=db('score_record')->where('openid',$openid)-> where('explain',"猜大小输了")->sum('score');
    //猜拳赢得
    $caiquanwin=db('score_record')->where('openid',$openid)-> where('explain',"猜拳赢得")->sum('score');
    //猜拳输了
    $caiquanlose=db('score_record')->where('openid',$openid)-> where('explain',"猜拳输了")->sum('score');
    //7日兑换数
    $exchange=db('score_record')->where('openid',$openid)-> where('explain',"金币兑换礼品")->sum('score');
    

    $task=['gdtbanner' => $gdtbanner,'gdtvideo'  => $gdtvideo ,'sign'  => $sign,'miniapp'  => $miniapp,'wlad'  => $wlad,'share'  => $share];
    $coins=['tribute' => $tribute,'dicewin' => $dicewin,'dicelose'  => $dicelose ,'caiquanwin'  => $caiquanwin,'caiquanlose'  => $caiquanlose,'exchange'  => $exchange];
    $state=['state'   => '200','message'  => "用户数据" ];
    $resdata=array_merge($state,array('userdata'=>$userdata),array('task'=>$task),array('coins'=>$coins));


    return $resdata;

 }




  public function channeldata(Request $request) //用户信息
 {

    $channel=$request->param("channel");
   

    $gdtbanner=db('gdt_ad_record')->where('channel',$channel)->where('adtype',1)->sum('score');//查询7天点击banner数
    $gdtvideo=db('gdt_ad_record')->where('channel',$channel)->where('adtype',2)->sum('score');//查询7天点击banner数
    $sign=db('sign')->where('channel',$channel)->sum('score');//查询7天签到数
    $miniapp=db('miniapp_ad_record')->where('channel',$channel)->sum('score');//查询7天点击小程序跳转广告成功
    $wlad=db('wl_ad_record')->where('channel',$channel)->sum('score');//查询7天点击微量广告成功
    $share=db('share_record')->where('channel',$channel)->sum('score');//查询7天分享任务成功

    //徒弟进贡
    $tribute=db('score_record')->where('channel',$channel)-> where('explain',"徒弟进贡")->sum('score');

    //骰子赢得
    $dicewin=db('score_record')->where('channel',$channel)-> where('explain',"猜大小赢得")->sum('score');
    //骰子输了
    $dicelose=db('score_record')->where('channel',$channel)-> where('explain',"猜大小输了")->sum('score');
    //猜拳赢得
    $caiquanwin=db('score_record')->where('channel',$channel)-> where('explain',"猜拳赢得")->sum('score');
    //猜拳输了
    $caiquanlose=db('score_record')->where('channel',$channel)-> where('explain',"猜拳输了")->sum('score');
    //7日兑换数
    $exchange=db('score_record')->where('channel',$channel)-> where('explain',"金币兑换礼品")->sum('score');
    

    $task=['gdtbanner' => $gdtbanner,'gdtvideo'  => $gdtvideo ,'sign'  => $sign,'miniapp'  => $miniapp,'wlad'  => $wlad,'share'  => $share];
    $coins=['tribute' => $tribute,'dicewin' => $dicewin,'dicelose'  => $dicelose ,'caiquanwin'  => $caiquanwin,'caiquanlose'  => $caiquanlose,'exchange'  => $exchange];
    $state=['state'   => '200','message'  => "渠道数据" ];
    $resdata=array_merge($state,array('task'=>$task),array('coins'=>$coins));


    return $resdata;

 }


	
    
}
