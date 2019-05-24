<?php
header('Content-type: text/html; charset=UTF8'); 

/**
 *description 用于返回指定数据格式的类
 *@param $data [array] 需要返回的数据
 *
 */

class Response{
    public function json($arr,$myarr,$myarr2,$myarr3){
        $result = array(
                "data" => $arr
            );
        return json_encode($result);
    }
}