'use strict'
var express = require('express');
var ListSongController = require('../controllers/listsong');
var api = express.Router();
var mdAuth = require('../middleware/authenticated');

api.get('/listandsongs/:id', mdAuth.ensureAuth, ListSongController.getListWithSongs);
api.get('/max-points-list-song/:id', mdAuth.ensureAuth, ListSongController.getListSongsWithMusicMaxPoints);
api.post('/listsong', mdAuth.ensureAuth, ListSongController.saveListSong);
api.delete('/listsong/:id', mdAuth.ensureAuth, ListSongController.deleteListSong);


module.exports = api;