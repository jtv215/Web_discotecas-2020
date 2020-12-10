'use strict'
var express = require('express');
var bodyParser = require('body-parser');
var app = express();



var establishment_routes = require('./routes/establishment');
var list_routes = require('./routes/list');
var song_routes = require('./routes/song');
var listsong_routes = require('./routes/listsong');




app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); //el texto lo convierte en json

// configurar cabeceras http
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
 
    next();
});

//ruta base "intermediaria para poner /api"
/*app.use('/api', user_routes);
app.use('/api', artist_routes);
*/
app.use('/api', establishment_routes);
app.use('/api', list_routes);
app.use('/api', song_routes);
app.use('/api', listsong_routes);





module.exports = app;
