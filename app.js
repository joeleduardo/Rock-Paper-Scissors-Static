const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer(function(req, res){
  if(req.url === "/"){
    fs.readFile("./public/index.html", "UTF-8", function(err, html){
      res.writeHead(200, {"Content-Type": "text/html"});
      res.end(html);
    });
  } else if(req.url.match("\.css$")){
    const cssPath = path.join(__dirname, 'public', req.url);
    const fileStream = fs.createReadStream(cssPath, "UTF-8");
    res.writeHead(200, {"Content-Type": "text/css"});
    fileStream.pipe(res);
  } else if(req.url.match("\.js$")){
    const jsPath = path.join(__dirname, 'public', req.url);
    const fileStream = fs.createReadStream(jsPath, "UTF-8");
    res.writeHead(200, {"Content-Type": "text/javascript"});
    fileStream.pipe(res);
  } else if(req.url.match("\.png$")){
    const pngPath = path.join(__dirname, 'public', req.url);
    const fileStream = fs.createReadStream(pngPath);
    res.writeHead(200, {"Content-Type": "image/png"});
    fileStream.pipe(res);
  } else {
    res.writeHead(404, {"Content-Type": "text/html"});
    res.end("No Page Found");
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});