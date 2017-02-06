<?php
namespace app\index\controller;

use think\View;
class Index
{
    public function index()
    {
        $view=new View();
        $view->assign([
            'read'=>url('read/index/index'),
            'note'=>url('note/index/index'),
            'chat'=>url('chat/index/home'),
        ]);
        return $view->fetch("home");
    }
}
