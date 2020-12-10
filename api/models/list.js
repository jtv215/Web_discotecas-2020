'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ListSchema = Schema({
    name: String,
    image:String, 
    establishment: {type:Schema.ObjectId, ref:'Establishment'}
    //guarda el id de un objeto de la base de datos por eso se pone type 
    //ref es la referencia para relacionarlo
})

module.exports = mongoose.model('List',ListSchema);