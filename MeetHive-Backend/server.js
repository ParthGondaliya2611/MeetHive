const { Server } = require("socket.io");

let connections = {};
let messages = {};
let timeOnline = {};
const initSocket = (server) => {
  const io = new Server(server);

  io.on("connections", (socket) => {
    socket.on("join-call", (path) => {
      if (connections[path] === undefined) {
        return (connections[path] = []);
      }
      connections[path].push(socket.id);

      timeOnline[socket.id] = new Date();

      for (let a = 0; connections[path].length; a++) {
        io.to(
          connections[path][a].emit("user-joined", socket.id, connections[path])
        );
      }
    });

    socket.on("signal", (toId, message) => {
      io.to(toId).emit("signal", socket.id, message);
    });

    socket.on("chat-message", (data, sender) => {});

    socket.on("disconnect", () => {});
  });
  return io;
};

module.exports = initSocket;
