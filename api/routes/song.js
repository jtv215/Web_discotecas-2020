'use strict'
var express = require('express');
var SongController = require('../controllers/song');
var api = express.Router();
var mdAuth = require('../middleware/authenticated');
var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './uploads/songs'});
var md_uploadImage = multipart({uploadDir: './uploads/songImage'});


api.get('/song/:id', mdAuth.ensureAuth, SongController.getSong);
api.get('/songs/:id', mdAuth.ensureAuth, SongController.getSongs);
api.post('/song', mdAuth.ensureAuth, SongController.saveSong);
api.get('/max-points-songs/:id', mdAuth.ensureAuth, SongController.getSongsMaxPoints);
api.get('/get-image-song/:imageFile', SongController.getImageFile);
api.get('/get-file-song/:songFile', SongController.getSongFile);
api.post('/upload-file-song/:id', [mdAuth.ensureAuth, md_upload], SongController.uploadFile);
api.post('/upload-image-song/:id', [mdAuth.ensureAuth, md_uploadImage], SongController.uploadImage);
api.post('/reset-song', mdAuth.ensureAuth, SongController.resetSong);
api.post('/disabled-reset-song', mdAuth.ensureAuth, SongController.disableAndResetSong);
api.post('/reset-songs', mdAuth.ensureAuth, SongController.resetSongs);


api.put('/song/:id', mdAuth.ensureAuth, SongController.updateSong);
api.delete('/song/:id', mdAuth.ensureAuth, SongController.deleteSong);









module.exports = api;