var http = require('http'),
    fs = require('fs');

var beer = require('./modules/db');

var beers_listagem = fs.readFileSync('./beers.html');


function callback(req, res, json){
    res.write(JSON.stringify(json));
}

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});

  var url = req.url;
  var method = req.method;

  console.log('url', url);
  console.log('method', method);

  // if(url === '/beers'){

  //   // beer.list(function(json){
  //   //   callback(req, res, json);
  //   // });
  //   res.write(beers_listagem);
  // }

  // res.end();

}).listen(3000);
console.log('Server running at http://localhost:3000/');