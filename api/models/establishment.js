'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// var uuid = require('uuid')
// const uuidv1 = require('uuid/dist/v1');
// _id: {
//     type: String, default: function genUUID() {
//       return  uuid.v1();
//         console.log( uuid.v1());
//     }
// },


var EstablishmentSchema = Schema({
 
    name: String,
    surname: String,
    email: String,
    password: String,
    sexo: String,
    birth_date: String,
    phone_user: String,
    role: String,
    name_establishment: String,
    address: String,
    phone_establishment: String,
    email_establishment: String,
    provincia: String,
    localidad: String,
    cp: Number,
    image: String,
    information: String,
    duration: String,
    time: String,
    create_at: String
})

module.exports = mongoose.model('Establishment', EstablishmentSchema);