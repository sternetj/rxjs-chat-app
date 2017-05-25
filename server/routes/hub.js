let connections = [];
let clients = {};
const MAX_REQUESTS = 15;

module.exports = function(ws, req) {
  connections.push(ws);
  let ip = req.connection.remoteAddress;
  clients[ip] = []

  ws.on('message', function(msg) {
    let now = new Date();
    clients[ip].push(now);
    clients[ip] = clients[ip].filter((d) => d > new Date(now.getTime() - 5*1000));
    if(clients[ip].length > MAX_REQUESTS){
      clients[ip] = new Array(MAX_REQUESTS).fill(new Date(now.getTime() + 30*1000));
      console.log(ip + ": " + clients[ip].length, clients[ip][0]);
      return;
    }

    console.log(msg);
    connections.forEach((ws) => ws.send(msg));
  });

  ws.on('close', function(msg) {
    console.log("closing socket");
    connections = connections.filter((conn) => conn !== ws);
  });

  console.log('socket connect to: ', ip);
};