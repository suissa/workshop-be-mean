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

exports.create = function(data, callback){
  // CREATE
  console.log('cadastrando inicio');
  var beer = new Beer(data);
  beer.save(function(err) {
    if(err){
      console.log(err);
    } else {
      console.log('Cerveja cadastrada com sucesso');
      // callback(data);
    }
  });
  console.log('cadastrando fim');
};

exports.find = function(data, callback){
  // RETRIEVE 
  Beer.findOne(data, function (err, beers) {
    console.log('achou algo?');
    if(err) {
      console.log('Houve algum erro, tente novamente', err);
    } else {
      console.log(beers);
      callback(beers);
    }
  });
};

exports.list = function(callback){

  Beer.find({}, function (err, beers) {
    console.log('achou algo?');
    if(err) {
      console.log('Houve algum erro, tente novamente', err);
    } else {
      callback(beers);
      console.log(beers);
    }
  });
};

exports.update = function(query, data, callback){
  // UPDATE
  Beer.update(query, data, function(err, beer) {
    if(err) {
      console.log(err);
    } else {
      console.log('Cerveja atualizada com sucesso');

      Beer.find(query, function (err, beers) {
        console.log('achou algo?');
        if(err) {
          console.log('Houve algum erro, tente novamente', err);
        } else {
          callback(beers);
        }
      });

    }
  });
};

exports.delete = function(query, callback){
  // RETRIEVE 
  Beer.remove(query, function (err, beers) {
    console.log('achou algo?');
    if(err) {
      console.log('Houve algum erro, tente novamente', err);
    } else {
      console.log('Cerveja deletada', query);
      callback(beers);
    }
  });
};


