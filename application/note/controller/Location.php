<?php
namespace app\note\controller;

class location
{
    public function write()
    {
        $data['content'] = input('post.addLocationText');
        //     $id=db('location')->insert($data);
        $list = db('location')->select();
        return $list;
    }
    public function read()
    {
        $list = db('location')->select();
        return $list;
    }
}