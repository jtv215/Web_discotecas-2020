'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ListsongSchema = Schema({
   
    list: {type:Schema.ObjectId, ref:'List'},
    song: {type:Schema.ObjectId, ref:'Song'}
    //guarda el id de un objeto de la base de datos por eso se pone type 
    //ref es la referencia para relacionarlo
})

module.exports = mongoose.model('Listsong',ListsongSchema);