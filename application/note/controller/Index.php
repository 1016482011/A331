<?php
namespace app\note\controller;

use think\View;
class Index
{
    public function index()
    {
        $view=new View();
        $list = db('data')->order('time desc')->select();
        $folder = db('folder')->select();
        $tag = db('tag')->select();
        $location = db('location')->select();
        $view->assign([
            'list'=>$list,
            'folder'=>$folder,
            'tag'=>$tag,
            'location'=>$location,
        ]);        
        
        return $view->fetch("index");
    }
}
