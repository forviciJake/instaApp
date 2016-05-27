
var express = require('express');

var api = require('instagram-node').instagram();
var app = express();
 

api.use({
  client_id: '9cebba2d5c7e45ae9330cc4fb33e760f',
  client_secret: '4f98dc27c4dd47bb9dc51f85ffb8c1ed'
});

//app.use(express.statice(__dirname + '/public'));

app.get('/', function(req, res){

  api.media_popular(function(err, medias, remaining, limit) {

    console.log(medias);
    //res.render('index', { grams: medias });
  });

});

app.listen(3000);
console.log('server on');
 



