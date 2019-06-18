<?php
namespace app\admin\controller;
use think\Db;

use think\Config;

class Index
{
    public function index()
    {

    	 if(sendMail("954087620@qq.com",'11111','2222')) {
             return "chegng";
           } else {
           return "shibai";
          }
    }
    
   
}
