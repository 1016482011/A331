<?php
namespace app\note\controller;

class Tag
{
    public function write()
    {
        $data['content'] = input('post.addTagText');
        //     $id=db('tag')->insert($data);
        $list = db('tag')->select();
        return $list;
    }
    public function read()
    {
        $list = db('tag')->select();
        return $list;
    }
}