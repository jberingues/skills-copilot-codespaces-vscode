// Create web server to handle comments
// 
// 1. Load the http module to create an http server.
var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
// 2. Create a server
http.createServer(function (request, response) {
  var path = url.parse(request.url).pathname;
  console.log("Path: " + path);
  switch(path){
    case '/':
      response.writeHead(200, {'Content-Type': 'text/html'});
      response.write('Hello, World.');
      response.end();
      break;
    case '/comments':
      switch(request.method){
        case 'POST':
          var body = '';
          request.on('data', function(data){
            body += data;
          });
          request.on('end', function(){
            var post = qs.parse(body);
            fs.appendFile('comments.txt', post['name'] + " : " + post['comment'] + "\n", function (err) {
              if (err) throw err;
              console.log('It\'s saved!');
            });
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.write('Thanks for the comment!');
            response.end();
          });
          break;
        case 'GET':
          fs.readFile('comments.txt', function(error, data){
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.write(data);
            response.end();
          });
          break;
      }
      break;
    default:
      response.writeHead(404);
      response.write("opps this doesn't exist - 404");
      response.end();
      break;
  }
}).listen(8001);
console.log('Server running at http://
