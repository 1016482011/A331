<?php
namespace app\note\controller;

use think\View;
class edit
{
    public function index()
    {
        $view=new View();
        $folder = db('folder')->select();
        $location = db('location')->select();
        $view->assign([
            'folder' => $folder,
            'location' => $location,
        ]);
        return $view->fetch();
    }
    public function submit()
    {
        if (request()->isPost()) {
            $view=new View();
            $data['title'] = input('post.editTitle');
            $data['content'] = input('post.editText');
            $data['folder'] = input('post.editFolder');
            $data['label'] = input('post.editFolder');
            $data['location'] = input('post.editLocation');
            $data['time'] = input('post.time');

//            $id=db('data')->insert($data);
//            if ($id){
            $list = db('data')->order('time desc')->select();
            $view->assign([
                'list' => $list,
            ]);
            return $view->fetch();
//            }else{
//                $msg="数据存储错误";
//                return $msg;
//            }
        }
    }
    public function subRead()
    {
        $view=new View();
        $list = db('data')->order('time desc')->select();
        $view->assign([
            'list' => $list,
        ]);
        return $view->fetch("submit");
    }
}