var express=require('express');
var app =express();
var qs = require("querystring");
var mysql = require('mysql');
var bodyParser  = require("body-parser");
let https = require("https");
let fs = require("fs");

const request = require('request');
const querystring = require('querystring');

app.use(bodyParser.json({limit: '1mb'}));  //body-parser 解析json格式数据
app.use(bodyParser.urlencoded({            //此项必须在 bodyParser.json 下面,为参数编码
  extended: true
}));

const httpsOption = {
  key : fs.readFileSync("./https/2000022733.zhangqx.com.key"),
  cert: fs.readFileSync("./https/2000022733.zhangqx.com.pem")
}

var pool = mysql.createPool({
  host     : '49.232.12.60',
  port     : 3306,
  database : 'miniprogram',
  user     : 'root',
  password : 'CXgdzhcjy123@'
});

//app.listen(80);

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1');
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

app.get('/', function(req, res){
  res.send('Hello,myServer, ChenJY');
});

app.get('/a', function(req, res){
  res.send('Hello,myServer, a');
});



app.post('/getopenid', function (req, res) {
  res.send('WeiXin');

  console.log(req.body) //查看请求的body里面的内容
  var data = {
    'appid': 'wx50c92d074c005d57',
    'secret': 'cfafed3e092ea13ad1bb490ee3b64422',
    'js_code': req.body.code,
    'grant_type': 'authorization_code'
  };
  console.log(data);
  
  var content = querystring.stringify(data);
  
  var url = 'https://api.weixin.qq.com/sns/jscode2session?' + content;

  request.get({
    'url': url
  }, (error, response, body) => {

    let result = JSON.parse(body);
    console.log(result)
    let sql = `select * from openid_to_user where openid='${result.openid}'`;
    console.log(sql)
    pool.getConnection(function(err, connection){
      connection.query(sql,function(err, rows){
        if(err) {
          console.log('err:', err.message);
        }else{
          if(rows.length ==0){
            let sql = `insert into openid_to_user(openid) values('${result.openid}')`;
            console.log(sql)
            connection.query(sql, function (err, rows) {
              if (err) {
                console.log('err:', err.message);
              }else{
                console.log(rows);
                result.id=rows.insertId
                result.userid =null
                console.log(result);
                res.json(result)
              }
            });
          }else{
            console.log(rows);
            result.id=rows[0].id
            result.userid=rows[0].userid
            console.log(result);
            res.json(result)
          }
        }
      });
      connection.release();
    });

  })
})

app.post('/favorite', function (req, res) {
  let result = req.body;
  console.log(result)

  var url = 'https://2000022733.zhangqx.com';

  request.get({
    'url': url
  }, (error, response, body) => {

    pool.getConnection(function(err, connection){
        let sql = `insert into favorite(openid,song) values('${result.openid}','${result.song}')`;
        console.log(sql)
        connection.query(sql, function (err, rows) {
          if (err) {
            console.log('err:', err.message);
          }else{
            console.log(rows);

          }
        });

      connection.release();
    });

  })
})




var server = app.listen(80, function () {
  var port = server.address().port;
  console.log('App listening at %s', port);
})

https.createServer(httpsOption, app).listen(443);
