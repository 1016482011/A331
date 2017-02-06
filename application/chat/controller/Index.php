<?php
namespace app\chat\controller;

use think\View;
class Index
{
    public function user()
    {
        $view=new View();
        return $view->fetch("user");
    }

    public function home()
    {
        $view=new View();
        return $view->fetch("home");
    }
}
