'use strict'
var express = require('express');
var ListController = require('../controllers/list');
var api = express.Router();
var mdAuth = require('../middleware/authenticated');
var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './uploads/lists'});

api.get('/list/:id', mdAuth.ensureAuth, ListController.getList);
api.get('/lists/:id', mdAuth.ensureAuth, ListController.getLists);
api.post('/list', mdAuth.ensureAuth, ListController.saveList);
api.put('/list/:id', mdAuth.ensureAuth, ListController.updateList);
api.post('/upload-image-list/:id', [mdAuth.ensureAuth, md_upload], ListController.uploadImage);
api.get('/get-image-list/:imageFile', ListController.getImageFile);


api.delete('/list/:id', mdAuth.ensureAuth, ListController.deleteList);


module.exports = api;