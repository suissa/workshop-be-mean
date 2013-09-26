var mongoose = require("mongoose")
  , Schema = mongoose.Schema
  , url = require("url");

mongoose.connect('mongodb://localhost/workshop-sampa');

var db = mongoose.connection;
db.on('error', function(err){
    console.log('Erro de conexao.', err)
});

db.once('open', function () {
  console.log('Conexão aberta.')
});

var BeerSchema = new Schema({
  name: { type: String, default: '' },
  description: { type: String, default: '' },
  type: { type: String, default: '' }
});

var Beer = mongoose.model('Beer', BeerSchema);

function beerFind(){
  Beer.find({}, function (err, beers) {
    console.log('achou algo?');
    if(err) {
      console.log('Houve algum erro, tente novamente', err);
    } else {
      res.render('beer_list', {cervejas: beers, title: "Minhas cervejas"});
      console.log(beers);
    }
  });
}

exports.create = function(req, res){
  // CREATE
  console.log('cadastrando inicio');

  var data = req.body;

  var beer = new Beer(data);
  beer.save(function(err) {
    if(err){
      console.log(err);
    } else {
      console.log('Cerveja cadastrada com sucesso');
      res.render('beer_create', {cerveja: data});
    }
  });
  console.log('cadastrando fim');
};

exports.findOne = function(req, res){
  // RETRIEVE 
  var id = req.params.id;
  var query = {_id: id};
  Beer.findOne(query, function (err, beer) {
    console.log('achou algo?');
    if(err) {
      console.log('Houve algum erro, tente novamente', err);
    } else {
      res.render('beer_findone', {cerveja: beer})
    }
  });
};

exports.find = function(req, res){
  // RETRIEVE 
  Beer.find(data, function (err, beers) {
    console.log('achou algo?');
    if(err) {
      console.log('Houve algum erro, tente novamente', err);
    } else {
      console.log(beers);
      callback(beers);
    }
  });
};

exports.list = function(req, res){

  Beer.find({}, function (err, beers) {
    console.log('achou algo?');
    if(err) {
      console.log('Houve algum erro, tente novamente', err);
    } else {
      res.render('beer_list', {cervejas: beers, title: "Minhas cervejas"});
      console.log(beers);
    }
  });
};

exports.update = function(req, res){
  // UPDATE
  Beer.update(query, data, function(err, beer) {
    if(err) {
      console.log(err);
    } else {
      console.log('Cerveja atualizada com sucesso');

      var query = {};
      beerFind(query);

    }
  });
};

exports.delete = function(req, res){
  // RETRIEVE 
  var id = req.params.id;
  var query = {_id: id};

  Beer.remove(query, function (err, beers) {
    console.log('achou algo?');
    if(err) {
      console.log('Houve algum erro, tente novamente', err);
    } else {
      console.log('Cerveja deletada', query);

      var query = {};
      beerFind(query);
    }
  });
};

// Expose das views
exports.renderCreate = function(req, res){
  res.render('beer_create');
}



