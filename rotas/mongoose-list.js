var http = require('http');

var beer = require('./modules/db');

function callback(req, res, json){
    res.end(JSON.stringify(json));
}

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'application/json'});

  // beer.list(function(json){
  //   callback(req, res, json);
  // });

  // var id = "52423491665e81c9b6000001";
  // var data = { "_id": id};
  // beer.find(id, function(json){
  //   callback(req, res, json);
  // });

  // var dados = {
  //   name: "Teste",
  //   description: "Tem gosto de mijo de elefante",
  //   type: "Pilsen"
  // };
  // beer.create(dados, function(json){
  //   callback(req, res, json);
  // });

  // var beer_id = "524367ebbccac3cdc1000001";
  // var query = {_id: beer_id};
  // var dados = {
  //   type: "Weiss"
  // };
  // beer.update(query, dados, function(json){
  //   callback(req, res, json);
  // });

  var beer_id = "524367ebbccac3cdc1000001";
  var query = {name: "Teste"};
  beer.delete(query, function(json){
    callback(req, res, json);
  });

}).listen(3000);
console.log('Server running at http://localhost:3000/');




