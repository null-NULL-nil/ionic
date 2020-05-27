"use strict";
const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.all('*', function (req, res, next)
{
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Headers", 'Content-Type,Content-Length,Authorization,Accept,X-Requested-With');
    res.header("Access-Control-Allow-Methods", 'PUT,POST,GET,DELETE,OPTIONS');
    res.header("x-Powered-By", '3.2.1')
    if (req.method == "OPTIONS") res.send(200);
    else next();
})
var index_user = 0;
var USERS = [];

///////////////mysql//////////////
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    port: 3306,
    database: 'mojia',
})
//get  all  user
function Alluser()
{
    var sql = 'select * from user';
    connection.query(sql, function (error, results, fields)
    {
        if (error)
        {
            console.log(error.message);
            return;
        }
        console.log(results);
        USERS = [];
        for (let i of results)
        {
            index_user += 1;
            USERS.push(
                {
                    id: i.id,
                    username: i.username,
                    password: i.password,
                    administration: i.administration
                }
            );
        }
        console.log('select * from user done !');
    })
}

//登陆验证
app.post('/authentication', function (req, resp)
{
    Alluser();
    console.log(req.body);
    console.log(USERS);
    for (let user of USERS)
    {
        if (user.username === req.body.username && user.password === req.body.password)
        {
            resp.send(
                {
                    succ: true,
                }
            );
            resp.end();
            return;
        }
    }
    resp.send({
        succ: false,
        msg: '用户名或密码错误'
    });
    resp.end();
});

app.get('/users', function (req, resp)
{
    Alluser();
    resp.send(USERS);
    resp.end();
});

app.post('/users', function (req, resp)
{
    Alluser();
    console.log(req.body);
    const id = req.body.id;
    for (let user of USERS)
    {
        if (user.id === id)
        {
            resp.send([user]);
            resp.end();
            return;
        }
    }
    resp.send(
        {
            succ: false,
            msg: '找不到用户'
        }
    );
    resp.end();
});

//添加用户
app.post('/user', function (req, resp)
{
    USERS.push(req.body);
    resp.send({ succ: true });
    resp.end();
});

//修改用户
app.put('/user', function (req, resp)
{
    let founded = false;
    for (let user of USERS)
    {
        if (user.id === req.body.id)
        {
            user.userName = req.body.userName;
            user.password = req.body.password;
            founded = true;
            break;
        }
    }
    if (founded)
    {
        resp.send({ succ: true });
    }
    else
    {
        resp.send({ succ: false, msg: '没有找到用户!' });
    }
    resp.end();
});

//删除用户
app.delete('/user/:id', function (req, resp)
{
    let founded = false;
    let index = 0;
    for (let user of USERS)
    {
        if (user.id == req.params.id)
        {
            USERS.splice(index, 1)
            founded = true;
            break;
        }
        index++;
    }

    if (founded)
    {
        resp.send({ succ: true });
    }
    else
    {
        resp.send({ succ: false, msg: '没有找到用户!' });
    }
    resp.end();
});
///////////////////////////////////////////////////
app.listen(8080, function ()
{
    mysqlconnect();
    Alluser();
    console.log('服务器在8080端口启动!  mysql  connect!');
});
//数据库连接  不断开
function mysqlconnect()
{
    connection.connect(function (err)
    {
        if (err)
        {
            console.error('error connecting: ' + err);
            return;
        }
        console.log('connected succeed ! ');
    });
}