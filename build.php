<?php
// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006~2016 http://thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: liu21st <liu21st@gmail.com>
// +----------------------------------------------------------------------

return [
    // 生成应用公共文件
    '__file__' => ['common.php', 'config.php', 'database.php'],

    // 定义模块的自动生成 （按照实际定义的文件名生成）
    'index'     => [
        '__file__'   => ['common.php'],
        '__dir__'    => ['controller', 'model', 'view'],
        'controller' => ['Index'],
        'model'      => [],
        'view'       => ['index/index','index/home'],
    ],
    'read'     => [
        '__file__'   => ['common.php'],
        '__dir__'    => ['controller', 'model', 'view'],
        'controller' => ['Index'],
        'model'      => ['data'],
        'view'       => ['index/index','public/base'],
    ],
    'note'     => [
        '__file__'   => ['common.php'],
        '__dir__'    => ['controller', 'model', 'view'],
        'controller' => ['Index','Edit','Folder','Tag','Location'],
        'view'       => ['index/index','public/base','edit/index','edit/submit'],
    ],
    'chat'     => [
        '__file__'   => ['common.php'],
        '__dir__'    => ['controller', 'model', 'view'],
        'controller' => ['Index'],
        'model'      => [],
        'view'       => ['index/home','index/user','public/base'],
    ],

];
