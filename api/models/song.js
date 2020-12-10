'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SongSchema = Schema({
    title: String,
    artist: String,
    duration: String,
    file: String,
    image: String,
    cost_song: Number,
    total_votes: Number,
    total_points: Number,
    active_song: String,
    establishment: { type: Schema.ObjectId, ref: 'Establishment' }
})

module.exports = mongoose.model('Song', SongSchema);