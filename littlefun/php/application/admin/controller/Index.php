<?php
namespace app\admin\controller;
use think\Db;

use think\Config;

class Index
{
    public function index()
    {
    	$data=sendMail('954087620@qq.com',"这是一条邮件","这是一条邮件");
    	return $data;

    	 // if(sendMail('954087620@qq.com',"这是一条邮件","这是一条邮件")) {
      //        return "chegng";
      //      } else {
      //      return "shibai";
      //     }
    }
    
   
}
