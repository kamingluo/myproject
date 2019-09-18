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


}

