'use strict'
var express = require('express');
var EstablishmentController = require('../controllers/establishment');
var api = express.Router();
var mdAuth = require('../middleware/authenticated');
var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './uploads/establishments' });


api.get('/prueba', EstablishmentController.pruebas);
api.post('/register', EstablishmentController.saveEstablishment);
api.post('/login', EstablishmentController.loginEstableshment);
api.get('/establishments', EstablishmentController.getEstablishments);
api.get('/establishment/:id', EstablishmentController.getEstablishment);
api.put('/update-establishment/:id', mdAuth.ensureAuth, EstablishmentController.updateEstablishment);
api.post('/upload-file-establishment/:id', [mdAuth.ensureAuth, md_upload], EstablishmentController.uploadImage);
api.get('/get-file-establishment/:imageFile', EstablishmentController.getImageFile);
api.put('/change-password/:id', mdAuth.ensureAuth,EstablishmentController.changePassword);

module.exports = api;