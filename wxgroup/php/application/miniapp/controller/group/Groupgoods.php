<?php
namespace app\miniapp\controller\group;
use think\Db;
use think\Request;
use think\Config;

class Groupgoods
{

    //查询群商品列表
    public function goodslist(Request $request)
    {
         $crowd_id=$request->param("crowd_id");
         $data=db('crowd_goods')->where('crowd_id',$crowd_id)->order('id desc')->select();
         $state=['state'   => '200','message'  => "群商品列表查询成功" ];
         $resdata=array_merge($state,array('data'=>$data));
         return $resdata ;
        
    }


       //发布群商品
    public function pushgoods(Request $request)
    {
         $crowd_id=$request->param("crowd_id");
         $goodsname=$request->param("goodsname");
         $images=$request->param("images");
         $price=$request->param("price");
         $introduce=$request->param("introduce");
         $time =date('Y-m-d H:i:s',time());//获取当前时间
         $data = ['id'=>'','goodsname' =>$goodsname,'introduce' =>$introduce,'images' => $images,'price' => $price,'crowd_id' => $crowd_id,'create_time' =>$time];
         $goods_id= db('crowd_goods')->insertGetId($data);//返回自增ID
         $state=['state'   => '200','message'  => "发布群商品成功" ];
         $resdata=array_merge($state,array('goods_id'=>$goods_id));
         return $resdata ;
    }



    //用户商品
    public function exchangegoods(Request $request)
    {
        $wxcode =$request->param("code");
        $openid=openid($wxcode);
        $goods_id=$request->param("goods_id");//商品id
        $address_id=$request->param("address_id");//地址id
        $remarks=$request->param("remarks");//兑换备注
        $crowd_id=$request->param("crowd_id");//群id
        $crowd_name=$request->param("crowd_name");//群名称
        $time =date('Y-m-d H:i:s',time());//获取当前时间


        $goods_data=db('crowd_goods')->where('id',$goods_id)->find(); //拿到商品信息
        $address_data=db('user_address')->where('id',$address_id)->find(); //拿到地址信息
        $user_crowd_data=db('user_crowd')->where('user_openid',$openid)->where('crowd_id',$crowd_id)->find(); //用户的群信息
        $user_data=db('user')->where('openid',$openid)->find(); //拿到用户信息

        if($user_crowd_data["score"] >= $goods_data["price"] ){


       //增加兑换记录
        $exchangedata = ['id'=>'','user_id' =>$user_data["id"],'openid' => $openid,'nickName' => $user_data["nickName"],'crowd_id' => $crowd_id,'crowd_name' => $crowd_name,'userName' =>  $address_data["userName"],'postalCode' => $address_data["postalCode"],'provinceName'=>$address_data["provinceName"],'cityName' =>$address_data["cityName"],'countyName' =>$address_data["countyName"],'detailInfo' => $address_data["detailInfo"],'nationalCode' =>$address_data["nationalCode"],'telNumber' => $address_data["telNumber"],'goodsname' => $goods_data["goodsname"],'introduce' => $goods_data["introduce"],'images'=> $goods_data["images"],'price' => $goods_data["price"],'expressnumber' =>null,'remarks' => $remarks,'state' => 0,'create_time' =>$time];
         $exchange_id= db('exchange_record')->insertGetId($exchangedata);//返回自增ID


         //减少用户积分
         $reduce_score= db('user_crowd')->where('user_openid',$openid)->where('crowd_id',$crowd_id)->setDec('score', $goods_data["price"]);

         //增加用户积分消耗记录
         $score_record_data = ['id'=>'','openid' =>$openid,'user_id' =>$user_data["id"],'crowd_id' =>$crowd_id,'score' =>$goods_data["price"],'explain' => "兑换商品",'state' =>1,'create_time' =>$time];
         $score_record_id=db('score_record')->insert($score_record_data);

         $state=['state'   => '200','message'  => "兑换成功" ];
         return $state;
        }
        else{
               $state=['state'   => '400','message'  => "兑换失败，积分不足！" ];
               return $state;
        }


    }









}

