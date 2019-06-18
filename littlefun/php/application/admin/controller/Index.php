<?php
namespace app\admin\controller;
use think\Db;

use think\Config;

class Index
{
    public function index()
    {

    	  $emaildata=sendEmail([['user_email'=>'954087620@qq.com','content'=>'签到推送完毕']]); //想推送不知道为啥不行
    }
    
   
}
