//const http = require("http");
// grâce à esm on peut utiliser import à la place du require
import http from 'http';

http.createServer((request, response) => {
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Mon premier serveur Node...");
    response.end();
}).listen(8888);


// Même chose que ci-dessus mais en callback.
const callback = (request, response) => {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Mon premier serveur Node!");
  response.end();
}

const server = http.createServer(callback);
server.listen(8888);