<?php


namespace app\admin\controller;
use think\Db;
use think\Request;
use think\Exception;
use think\Log;

class Appconfig
{
   
    
    public function addconfig(Request $request) //增加或者更新config,一般不会去删除也不会更改id
    {
         $dbnum=db('config')->where('id',$request->param("id"))->count();
         // return  $dbnum;
         if($dbnum == 1){ //更新
         	$value=$request->param("value/a");
         	$dareturn=db('config')->where('id',$request->param("id"))->update(['name' => $request->param("name"),'value' => json_encode($value,JSON_UNESCAPED_UNICODE)]);
         	return "更新成功";

         }else{ //添加
         	// return "添加";
         	  // $adconfig=json_decode($data);
        $value=$request->param("value/a");
        // return  json_encode($value,JSON_UNESCAPED_UNICODE);
        $dbdata = ['id'=>$request->param("id"),'name' =>$request->param("name"),'value' =>json_encode($value,JSON_UNESCAPED_UNICODE)];
        $dbreturn=db('config')->insert($dbdata);
        return "添加成功";

         }
    }
   

}
