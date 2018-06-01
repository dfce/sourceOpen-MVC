class Ws_socketio {
  constructor (io = false) {
      this.IO = io;
      this.initSocket();
  }

  initSocket () {
      this.IO.on('connection', this.onConnect);
  }

  /**
   * @function onConnect
   * @desc 事件注册
   * @param {socket} socket 
   */
  onConnect (socket) {
    /** @desc 上传经度返回 */
    socket.on('progress', data => {
      if (data.socketID) { // 只返回给上传客户端
          let socketID = data.socketID;
          delete data.socketID;
          socket.to(socketID).emit("getMsg", data);
      } else {
          // socket.broadcast.emit("getMsg", data);
      }
    })
  }

  /**
   * @function __onConnect
   * @desc 事件速查表
   * @param {socket} socket 
   */
  __onConnect (socket) {
    /**
     * @desc 以下事件是保留的，不应该在应用中用作事件名称:
     *   error
     *   connect
     *   disconnect
     *   disconnecting
     *   newListener
     *   removeListener
     *   ping
     *   pong
     */

    //  // 发送给当前客户端
    // socket.emit('hello', 'can you hear me?', 1, 2, 'abc');

    // // 发送给所有客户端，除了发送者
    // socket.broadcast.emit('broadcast', 'hello friends!');

    // // 发送给同在 'game' 房间的所有客户端，除了发送者
    // socket.to('game').emit('nice game', "let's play a game");

    // // 发送给同在 'game1' 或 'game2' 房间的所有客户端，除了发送者
    // socket.to('game1').to('game2').emit('nice game', "let's play a game (too)");

    // // 发送给同在 'game' 房间的所有客户端，包括发送者
    // io.in('game').emit('big-announcement', 'the game will start soon');

    // // 发送给同在 'myNamespace' 命名空间下的所有客户端，包括发送者
    // io.of('myNamespace').emit('bigger-announcement', 'the tournament will start soon');

    // // 发送给指定 socketid 的客户端（私密消息）
    // let socketid = socket.id;
    // socket.to(`${socketid}`).emit('hey', 'I just met you');

    // // 包含回执的消息
    // socket.emit('question', 'do you think so?', function (answer) {});

    // // 不压缩，直接发送
    // socket.compress(false).emit('uncompressed', "that's rough");

    // // 如果客户端还不能接收消息，那么消息可能丢失
    // socket.volatile.emit('maybe', 'do you really need it?');

    // // 发送给当前 node 实例下的所有客户端（在使用多个 node 实例的情况下）
    // io.local.emit('hi', 'my lovely babies');
  }
}

module.exports = Ws_socketio;