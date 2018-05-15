---
layout: left-none
title:  JavaScript表单验证
date:   2018-5-15 00:00:00 +0800
tag: 进击JavaScript核心
---
* content
{:toc}
<hr>

#### js验证

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>表单验证</title>
    <style>
        html * {
            margin: 0;
            padding: 0;
            font-size: 14px;
        }

        .content {
            width: 600px;
            height: auto;
            margin: 100px auto 0 auto;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
            padding: 20px;
            border: 1px solid #ddd;
            overflow: auto;
        }

        .form-item {
            position: relative;
            width: 100%;
            text-align: center;
            margin-bottom: 20px;
        }

        .form-item label {
            display: inline-block;
            width: 20%;
            height: 40px;
            line-height: 40px;
            text-align: right;
        }

        .form-item input,.form-item select {
            display: inline-block;
            width: 70%;
            height: 40px;
            outline: none;
            text-indent: 10px;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
        }

        .form-item .tipText {
            position: absolute;
            left: 25%;
            bottom: -20px;
            color: red;
        }

        .form-item .btn {
            display: inline-block;
            color: white;
            background-color: #29a9ff;
            padding: 8px 20px;
            border: none;
            outline: none;
            -webkit-border-radius: 5px;
            -moz-border-radius: 5px;
            border-radius: 5px;
            cursor: pointer;
        }
    </style>
</head>
<body>
<form class="content">
    <div class="form-item">
        <label>用户名：</label>
        <input type="text" name="userAccount" id="userAccount">
        <span class="tipText"></span>
    </div>
    <div class="form-item">
        <label>密码：</label>
        <input type="password" name="password" id="password">
        <span class="tipText"></span>
    </div>
    <div class="form-item">
        <label>确认密码：</label>
        <input type="password" name="password_" id="password_">
        <span class="tipText"></span>
    </div>
    <div class="form-item">
        <label>姓名：</label>
        <input type="text" name="userAccount" id="userName">
        <span class="tipText"></span>
    </div>
    <div class="form-item">
        <label>身份证号：</label>
        <input type="text" name="information" id="information">
        <span class="tipText"></span>
    </div>
    <div class="form-item">
        <label>邮箱：</label>
        <input type="text" name="email" id="email">
        <span class="tipText"></span>
    </div>
    <div class="form-item">
        <label>手机：</label>
        <input type="text" name="tel" id="tel">
        <span class="tipText"></span>
    </div>
    <div class="form-item">
        <button class="btn" id="submitBtn">提交</button>
    </div>
</form>
<script>
    var reg = {
        null:'',//空
        userAccount:/^\w{6,18}$/,//用户名
        password:/^\w{6,18}$/,//密码
        userName:/^[\u4e00-\u9fa5]{2,5}$/,//姓名
        information:/^\d{17}[0-9x]$/,//身份证
        email:/^\w+@\w+\.[a-zA-Z_]{2,4}$/,//邮箱
        tel:/^\d{11}$/,//邮箱
    };

    var userAccount = _getID('userAccount');
    var password = _getID('password');
    var password_ = _getID('password_');
    var userName = _getID('userName');
    var information = _getID('information');
    var email = _getID('email');
    var tel = _getID('tel');
    var submitBtn = _getID('submitBtn');
    var input1 = false;
    var input2 = false;
    var input3 = false;
    var input4 = false;
    var input5 = false;
    var input6 = false;
    var input7 = false;

    userAccount.addEventListener('blur',function () {//验证用户名
        if(this.value === reg.null ){
            this.parentNode.getElementsByTagName('span')[0].innerHTML = '请输入用户名';
            this.parentNode.getElementsByTagName('span')[0].style.color = 'red';
        }else{
            if(!reg.userAccount.exec(userAccount.value)){
                this.parentNode.getElementsByTagName('span')[0].innerHTML = '请输入6-18位数字、字母、_';
                this.parentNode.getElementsByTagName('span')[0].style.color = 'red';
            }else{
                this.parentNode.getElementsByTagName('span')[0].innerHTML = '格式正确';
                this.parentNode.getElementsByTagName('span')[0].style.color = 'green';
            }
        }
    });

    password.addEventListener('focus',function () {//验证密码
        this.parentNode.getElementsByTagName('span')[0].innerHTML = '请输入6-18位数字、字母、_';
        this.parentNode.getElementsByTagName('span')[0].style.color = 'green';
        input1 = true;
    });

    password.addEventListener('blur',function () {//验证密码
        if(this.value === reg.null ){
            this.parentNode.getElementsByTagName('span')[0].innerHTML = '请输入密码';
            this.parentNode.getElementsByTagName('span')[0].style.color = 'red';
        }else{
            if(!reg.password.exec(password.value)){
                this.parentNode.getElementsByTagName('span')[0].innerHTML = '请输入6-18位数字、字母、_';
                this.parentNode.getElementsByTagName('span')[0].style.color = 'red';
            }else{
                this.parentNode.getElementsByTagName('span')[0].innerHTML = '格式正确';
                this.parentNode.getElementsByTagName('span')[0].style.color = 'green';
                input2 = true;
            }
        }
    });

    password_.addEventListener('focus',function () {//确认密码
        this.parentNode.getElementsByTagName('span')[0].innerHTML = '请确认两次密码一致';
        this.parentNode.getElementsByTagName('span')[0].style.color = 'green';
    });

    password_.addEventListener('blur',function () {//确认密码
        if(this.value === reg.null ){
            this.parentNode.getElementsByTagName('span')[0].innerHTML = '确认密码不能为空';
            this.parentNode.getElementsByTagName('span')[0].style.color = 'red';
        }else{
            if(this.value != password.value){
                this.parentNode.getElementsByTagName('span')[0].innerHTML = '两次密码不同';
                this.parentNode.getElementsByTagName('span')[0].style.color = 'red';
            }else{
                this.parentNode.getElementsByTagName('span')[0].innerHTML = '密码一致';
                this.parentNode.getElementsByTagName('span')[0].style.color = 'green';
                input3 = true;
            }
        }
    });

    userName.addEventListener('focus',function () {
        this.parentNode.getElementsByTagName('span')[0].innerHTML = '请输入中文姓名';
        this.parentNode.getElementsByTagName('span')[0].style.color = 'green';
    });

    userName.addEventListener('blur',function () {
        if(this.value === reg.null ){
            this.parentNode.getElementsByTagName('span')[0].innerHTML = '姓名不能为空';
            this.parentNode.getElementsByTagName('span')[0].style.color = 'red';
        }else{
            if(!reg.userName.exec(userName.value)){
                this.parentNode.getElementsByTagName('span')[0].innerHTML = '请输入正确的中文名字';
                this.parentNode.getElementsByTagName('span')[0].style.color = 'red';
            }else{
                this.parentNode.getElementsByTagName('span')[0].innerHTML = '格式正确';
                this.parentNode.getElementsByTagName('span')[0].style.color = 'green';
                input4 = true;
            }
        }
    });

    information.addEventListener('focus',function () {
        this.parentNode.getElementsByTagName('span')[0].innerHTML = '请输入身份证';
        this.parentNode.getElementsByTagName('span')[0].style.color = 'green';
    });

    information.addEventListener('blur',function () {
        if(this.value === reg.null ){
            this.parentNode.getElementsByTagName('span')[0].innerHTML = '身份证不能为空';
            this.parentNode.getElementsByTagName('span')[0].style.color = 'red';
        }else{
            if(!reg.information.exec(information.value)){
                this.parentNode.getElementsByTagName('span')[0].innerHTML = '身份证格式不对';
                this.parentNode.getElementsByTagName('span')[0].style.color = 'red';
            }else{
                this.parentNode.getElementsByTagName('span')[0].innerHTML = '格式正确';
                this.parentNode.getElementsByTagName('span')[0].style.color = 'green';
                input5 = true;
            }
        }
    });

    email.addEventListener('focus',function () {
        this.parentNode.getElementsByTagName('span')[0].innerHTML = '请输入邮箱';
        this.parentNode.getElementsByTagName('span')[0].style.color = 'green';
    });

    email.addEventListener('blur',function () {
        if(this.value === reg.null ){
            this.parentNode.getElementsByTagName('span')[0].innerHTML = '邮箱不能为空';
            this.parentNode.getElementsByTagName('span')[0].style.color = 'red';
        }else{
            if(!reg.email.exec(email.value)){
                this.parentNode.getElementsByTagName('span')[0].innerHTML = '邮箱格式不对';
                this.parentNode.getElementsByTagName('span')[0].style.color = 'red';
            }else{
                this.parentNode.getElementsByTagName('span')[0].innerHTML = '格式正确';
                this.parentNode.getElementsByTagName('span')[0].style.color = 'green';
                input6 = true;
            }
        }
    });

    tel.addEventListener('focus',function () {
        this.parentNode.getElementsByTagName('span')[0].innerHTML = '请输入手机号';
        this.parentNode.getElementsByTagName('span')[0].style.color = 'green';
    });

    tel.addEventListener('blur',function () {
        if(this.value === reg.null ){
            this.parentNode.getElementsByTagName('span')[0].innerHTML = '手机号不能为空';
            this.parentNode.getElementsByTagName('span')[0].style.color = 'red';
        }else{
            if(!reg.tel.exec(tel.value)){
                this.parentNode.getElementsByTagName('span')[0].innerHTML = '手机号格式不对';
                this.parentNode.getElementsByTagName('span')[0].style.color = 'red';
            }else{
                this.parentNode.getElementsByTagName('span')[0].innerHTML = '格式正确';
                this.parentNode.getElementsByTagName('span')[0].style.color = 'green';
                input7 = true;
            }
        }
    });

    submitBtn.addEventListener('click',function (event) {
        if(!input1 || !input2 || !input3 || !input4 || !input5 || !input6 || !input7){
            alert('请填写正确的表单');
            event.preventDefault();
        }
    });

     function _getID(id) {
        if(typeof id != 'string')return id;
        return document.getElementById(id);
    }
</script>
</body>
</html>
```