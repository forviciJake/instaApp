var http = require('http');
var express = require('express');
var api = require('instagram-node').instagram();
var app = express();
 
 
api.use({
  client_id: '9cebba2d5c7e45ae9330cc4fb33e760f',
  client_secret: '4f98dc27c4dd47bb9dc51f85ffb8c1ed'
});

api.use({ access_token: '3262479491.9cebba2.3fd366250e1e49e5bd1f8c1fb6612e35' });

 
var redirect_uri = 'http://localhost:3000/';

 
exports.authorize_user = function(req, res) {
  res.redirect(api.get_authorization_url(redirect_uri, { scope: ['likes'], state: 'a state' }));
};

exports.handleauth = function(req, res) {
  api.authorize_user(req.query.code, redirect_uri, function(err, result) {
    if (err) {
      console.log(err.body);
      res.send("Didn't work");
    } else {
      console.log('Yay! Access token is ' + result.access_token);
      res.send(result);
    }
  });
};


//ig.media_popular(function(err, medias, remaining, limit) {});


exports.popular = function(req, res){
  api.media_popular(function(err, medias, remaining, limit) {
    if (err) {
      console.log(err.body);
      res.send(err.body);
    } else {
      console.log('Yay! Access token is ' );
      res.send(medias);
    }
  });
};




 
// This is where you would initially send users to authorize 
app.get('/authorize_user', exports.authorize_user);
// This is your redirect URI 
app.get('/', exports.handleauth);

app.get('/popular', exports.popular);
 
app.listen(3000);