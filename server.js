/**
 *Created with JetBrains WebStorm.
 *
 * Date:2017/12/8
 *
 * AUthor: SQS
 *
 */
var http = require('http');
var fs = require('fs');

var server = http.createServer(function (req,res){
  fs.readFile('/',function(error,data){
    res.writeHead(200,{'Content-Type':'text/html'});
    res.end(data,'utf-8');
  });
}).listen(3001,"127.0.0.1");

console.log('Server running at http://127.0.0.1:3001/');

var io = require('socket.io').listen(server);

io.sockets.on('connection',function(socket){
  // console.log('User connected');

  socket.on('hi', function(data) {
    console.log(data);

    //触发客户端事件c_hi

    // 广播消息
    //给除了自己以外的客户端广播消息
    //socket.broadcast.emit("msg",{data:"hello,everyone"});
    //给所有客户端广播消息
    //io.sockets.emit("msg",{data:"hello,all"});

   // io.sockets.socket(socketid).emit(‘String’, data);//给指定的客户端发送消息
    io.sockets.sockets('1m2Ew8uWxbGdGbK8AAAO').emit('c_hi', { hello: 'world' });//给指定的客户端发送消息


    // io.sockets.emit('c_hi',{ hello: 'world' }) //时间广播

  });

  socket.on('disconnect',function(){
    console.log('User disconnected');
  });

});

// var express = require('express');
// var app = express();
//
// var server = require('http').createServer(app);
// var io = require('socket.io')(server);
//
// app.use('/', express.static(__dirname + '/public'));
//
// server.listen(80);
//
// console.log(11)
// //socket部分
// io.on('connection', function(socket) {
//   //接收并处理客户端的hi事件
//   socket.on('hi', function(data) {
//     console.log(data);
//
//     //触发客户端事件c_hi
//     socket.emit('c_hi','hello too!')
//   })
//
//   //断开事件
//   socket.on('disconnect', function(data) {
//     console.log('断开',data)
//     socket.emit('c_leave','离开');
//     //socket.broadcast用于向整个网络广播(除自己之外)
//     //socket.broadcast.emit('c_leave','某某人离开了')
//   })
//
// });
