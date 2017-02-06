<?php
namespace app\read\controller;

use think\View ;
class Index
{
    public function index()
    {
        $nav = db('data')->field("id,list,dataId,dataCap")->select();
        $view=new View();
        $view->assign([
           'nav'=>$nav,
           'navUrl'=>url("read/index/index"),
           'index'=>url('index/index/index'),
        ]);
        return $view->fetch("index");
    }

    public function pageAjax($page)
    {
        $data['dataId'] = $page;
        $content = db("data")->where($data)->field("content")->select();
        return $content;
    }
}
