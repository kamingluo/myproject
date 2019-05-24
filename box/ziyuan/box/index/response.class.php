<?php
header('Content-type: text/html; charset=UTF8'); 

/**
 *description 用于返回指定数据格式的类
 *@param $data [array] 需要返回的数据
 *@param $data2 [array] 需要返回的数据\
 *@param $data3 [array2] 需要返回的数据
 *@param $data4 [array3] 需要返回的数据
 *
 */

class Response{
    public function json($arr,$myarr,$myarr2,$myarr3){
        $result = array(
                "data" => $arr,
                "data2" => $myarr,
                "data3" => $myarr2,
                "data4" => $myarr3
            );
        return json_encode($result);
    }
}