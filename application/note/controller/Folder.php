<?php
namespace app\note\controller;

class folder
{
    public function write()
    {
        $data['content'] = input('post.addModalText');
      //     $id=db('folder')->insert($data);
        $list = db('folder')->select();
        return $list;
    }
    public function read()
    {
        $list = db('folder')->select();
        return $list;
    }
}