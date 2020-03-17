<?php
    header('content-type:text/html;charset="utf-8"');

    // var_dump($_POST)
    //定义一个统一的返回格式
    $responseData = array("code" => 0, "message" => "");

    //将前端传输到后端的数据全部加载在页面上
    $username = $_POST['username'];
    $password = $_POST['password'];
    $repassword = $_POST['repassword'];
    $createTime = $_POST["createtime"];

    //先给所有获取到的数据做一个简单的表单验证
    if(!$username){
        $responseData['code'] = 1;
        $responseData["message"] = "用户名不能为空";
        //将数据按统一数据返回格式返回
        echo json_encode($responseData);
        exit;
    }
    if(!$password){
        $responseData['code'] = 2;
        $responseData["message"] = "密码不能为空";
        //将数据按统一数据返回格式返回
        echo json_encode($responseData);
        exit;
    }
    if($password != $repassword){
        $responseData['code'] = 3;
        $responseData["message"] = "两次输入密码不一致";
        //将数据按统一数据返回格式返回
        echo json_encode($responseData);
        exit;
    }
    // 1.连接数据库
    $link = mysql_connect("localhost", "root", "123456");

    // 2.判断是否连接成功
    if(!$link){
        echo "连接失败";
        $responseData['code'] = 4;
        $responseData["message"] = "数据库连接失败";
        //将数据按统一数据返回格式返回
        echo json_encode($responseData);
        exit; // 终止后续所有代码
    }

    // 3.设置字符集
    mysql_set_charset("utf-8");

    // 4.选择数据库
    mysql_select_db("xiaomi");

    // 5.准备sql 验证用户名是否重名
    $sql1 = "SELECT * FROM users WHERE username ='{$username}'";

    // 6.发送sql语句
    $res = mysql_query($sql1);

    // 7.取出mysql一行数据
    $row = mysql_fetch_assoc($res);
    if($row){
        // 用户名重名
        $responseData['code'] = 5;
        $responseData["message"] = "用户名已存在";
        //将数据按统一数据返回格式返回
        echo json_encode($responseData);
        exit;
    }
    
    // MD5加密
    $str = md5(md5(md5($password)."xxx")."yyy");

    // 8.准备sql语句将数据插入到数据库中
    $sql2 = "INSERT INTO users(username,password,create_time) VALUES('{$username}', '{$str}', '{$createTime}')";
    $res = mysql_query($sql2);
    if(!$res){
        $responseData['code'] = 6;
        $responseData["message"] = "注册失败";
        echo json_encode($responseData);
    }else{
        $responseData['code'] = 0;
        $responseData["message"] = "注册成功";
        echo json_encode($responseData);
    }

    mysql_close($link);

?>