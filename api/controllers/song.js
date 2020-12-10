'user strict'
var fs = require('fs'); //sistema de ficheros
var path = require('path');
var mongoosePaginate = require('mongoose-pagination');
var Song = require('../models/song');
var ListSong = require('../models/listsong');
var moment = require('moment');

function getSong(req, res) {
    var songId = req.params.id;

    Song.findById(songId).populate({ path: 'album' }).exec((err, song) => {
        if (err) {
            res.status(500).send({ message: 'Error en la petición' });
        } else {
            if (!song) {
                res.status(404).send({ message: 'La canción no existe.' });
            } else {
                res.status(200).send({ song: song });
            }
        }
    });
}

function getSongs(req, res) {
    var establishmentId = req.params.id;

    var find = Song.find({ establishment: establishmentId }).sort('title');

    find.exec(function (err, songs) {
        if (err) {
            res.status(500).send({ message: 'Error en la petición.' });
        } else {
            if (!songs) {
                res.status(404).send({ message: 'No hay canciones' });
            } else {
                res.status(200).send({ song: songs });
            }
        }

    });

}

function resetSongs(req, res) {

    var params = req.body;

    if (params.listSongId) { //reseteo toda la list
        var listId = params.listSongId;

        var find = ListSong.find({ list: listId })
            .populate({ path: 'song' });

        find.exec((err, listSong) => {
            if (err) {
                res.status(500).send({ message: 'Error en la petición.' });
            } else {
                if (!listSong) {
                    res.status(404).send({ message: 'No se ha encontrado ninguna lista' });
                } else {
                    var i;
                    var result = []; //extraigo la parte song
                    for (i = 0; i < listSong.length; i++) {
                        var song = listSong[i].song;
                        if (song != null) {
                            result.push(song);
                        }
                    }

                    //reseteo activeSong a 0
                    result.forEach(function (obj) {
                        Song.update({ "_id": obj._id }, { "$set": { "active_song": '0' } }, (err, listSong) => {
                        });
                    });

                    res.status(200).send({ songs: result });



                }
            }
        });


    } else {  //Reseteo toda la song
        let establishmentId = params.establishmentId;

        var find = Song.find({ establishment: establishmentId });
        find.exec(function (err, songs) {
            if (err) {
                res.status(500).send({ message: 'Error en la petición.' });
            } else {
                if (!songs) {
                    res.status(404).send({ message: 'No hay canciones' });
                } else {

                    //reseteo la el activeSong a 0
                    songs.forEach(function (obj) {
                        Song.update({ "_id": obj._id }, { "$set": { "active_song": '0' } }, (err, listSong) => {
                        });
                    });

                    res.status(200).send({ songs: songs });

                }
            }

        });


    }


}

/** puede que haya una errata */
function resetSong(req, res) {
    var params = req.body;
    var idSong =  params.id;

    Song.update({ "_id": idSong }, { "$set": { "active_song": '0' } }, (err, songUpdate) => {
        if (err) {
            res.status(500).send({ message: 'Error al actualizar el usuario.' });
        } else {
            if (!songUpdate) {
                res.status(404).send({ message: 'No se ha podido cambiar la contraseña del usuario.' });
            } else {
                res.status(200).send({ song: songUpdate });
            }
        }
    });

}

function getSongsMaxPoints(req, res) {
    var establishmentId = req.params.id;
    let aux = moment().unix();

    var find = Song.find({ establishment: establishmentId })
        .where('active_song').lt(aux)
        .sort({ 'total_points': 'desc' });

    find.exec(function (err, songs) {
        if (err) {
            res.status(500).send({ message: 'Error en la petición.' });
        } else {
            if (!songs) {
                res.status(404).send({ message: 'No hay canciones' });
            } else {
                res.status(200).send({ song: songs });
            }
        }

    });

}

function disableAndResetSong(req, res) {
    var params = req.body;

    let songId = params.id;
    let number = params.number; //20 min , 30,40, 1 h 2 h
    let time = params.time;   // minutes, hours

    var update = {
        'total_votes': 0,
        'total_points': 0,
        'active_song': moment().add(number, time).unix()
    }

    Song.findByIdAndUpdate(songId, update, (err, songUpdated) => {
        if (err) {
            res.status(500).send({ message: 'Error al guardar al actualizar canción' });
        } else {
            if (!songUpdated) {
                res.status(404).send({ message: 'La canción no se ha sido actualizado' });

            } else {
                res.status(200).send({ song: songUpdated });
            }
        }
    });

}




function updateSong(req, res) {
    var songId = req.params.id;
    var update = req.body;

    Song.findByIdAndUpdate(songId, update, (err, songUpdated) => {
        if (err) {
            res.status(500).send({ message: 'Error al guardar al actualizar canción' });
        } else {
            if (!songUpdated) {
                res.status(404).send({ message: 'La canción no se ha sido actualizado' });

            } else {
                res.status(200).send({ song: songUpdated });
            }
        }
    });
}

function saveSong(req, res) {
    var song = new Song();
    var params = req.body;
    song.title = params.title;
    song.artist = params.artist;
    song.duration = params.duration;
    song.file = '';
    song.image = '';
    song.cost_song = params.cost_song;
    song.total_votes = params.total_votes,
        song.total_points = params.total_points;
    song.active_song = params.active_song;
    song.establishment = params.establishment;
    song.save((err, songStored) => {
        if (err) {
            res.status(500).send({ message: 'Error al guardar la canción' });
        } else {
            if (!songStored) {
                res.status(404).send({ message: 'La canción no ha sido guardado' });
            } else {
                res.status(200).send({ song: songStored });
            }
        }
    });
}

function deleteSong(req, res) {
    var songId = req.params.id;
    Song.findByIdAndRemove(songId, (err, songRemoved) => {
        if (err) {
            res.status(500).send({ message: 'Error al borrar el canción' });
        } else {
            if (!songRemoved) {
                res.status(404).send({ message: 'La canción no ha sido eliminada' });
            } else {

                //eliminar canción
                var file_path = './uploads/songs/' + songRemoved.file;
                try {
                    fs.unlinkSync(file_path);
                } catch (err) {

                }
                //eliminar imagen asociada
                if (songRemoved == '') {
                } else {
                    var file_path = './uploads/songImage/' + songRemoved.image;
                    try {
                        fs.unlinkSync(file_path);
                    } catch (err) {
                    }

                }

                //buscar en toda la play list el id de esa musica y borrarla que pertenezca a la usuario
                var find = ListSong.find({ song: songId });

                find.remove((err, ListSongRemoved) => {
                    if (err) {
                        res.status(500).send({ message: 'Error al guardar al actualizar canción' });
                    } else {
                        if (!ListSongRemoved) {
                            res.status(404).send({ message: 'La canción no se ha sido de la list' });

                        } else {
                            res.status(200).send({ song: songRemoved });
                        }
                    }
                });



            }
        }
    });
}



function uploadFile(req, res) {
    var songId = req.params.id;
    var file_name = 'No subido...';

    if (req.files) {
        var file_path = req.files.file.path;
        var file_split = file_path.split('\\');
        var file_name = file_split[2];

        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];
        console.log(file_ext);//errata por que entra jpg y otro formattos**************!!!!

        if (file_ext == 'mp3' || file_ext == 'ogg' || file_ext == 'm4v') {

            Song.findByIdAndUpdate(songId, { file: file_name }, (err, songUpdated) => {

                if (!songUpdated) {
                    res.status(404).send({ message: 'No se ha podido actualizar la canción' });
                } else {
                    res.status(200).send({ song: songUpdated });

                    var file_path = './uploads/songs/' + songUpdated.file;
                    try {
                        fs.unlinkSync(file_path);//borrar fichero antiguo
                    } catch (err) {
                        //console.error(err)
                    }


                }
            });

        } else {
            res.status(200).send({ message: 'Extensión del archivo no es válida' });
        }
    } else {
        res.status(200).send({ message: 'No se ha subido ninguna imagen' });
    }
}

function getSongFile(req, res) {
    var songFile = req.params.songFile;
    var path_file = './uploads/songs/' + songFile;

    fs.exists(path_file, function (exists) {
        if (exists) {
            res.sendFile(path.resolve(path_file));
        } else {
            res.status(200).send({ message: 'No existe la canción' });
        }
    });
}




function uploadImage(req, res) {
    var songId = req.params.id;
    var file_name = 'No subido...';

    if (req.files) {
        var file_path = req.files.image.path;
        var file_split = file_path.split('\\');
        var file_name = file_split[2];
        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1].toLowerCase();

        if (file_ext == "png" || file_ext == 'jpg' || file_ext == 'jpeg' || file_ext == 'gif') {

            Song.findByIdAndUpdate(songId, { image: file_name }, (err, songUpdated) => {
                if (!songUpdated) {
                    res.status(404).send({ message: 'No se ha podido actualizar el usuario usuario' });
                } else {
                    res.status(200).send({ song: songUpdated });

                    var file_path = './uploads/songImage/' + songUpdated.image;
                    try {
                        fs.unlinkSync(file_path);//borrar fichero antiguo
                    } catch (err) {
                        //console.error(err)
                    }
                }
            });

        } else {
            res.status(200).send({ message: 'Extensión del archivo no es válida' });
        }
    } else {
        res.status(200).send({ message: 'No se ha subido ninguna imagen' });

    }
}



function getImageFile(req, res) {
    var imageFile = req.params.imageFile;
    var path_file = './uploads/songImage/' + imageFile;

    fs.exists(path_file, function (exists) {
        if (exists) {
            res.sendFile(path.resolve(path_file));

        } else {
            res.status(200).send({ message: 'No existe la imagen' });

        }
    });
}

module.exports = {
    getSong,
    saveSong,
    getSongs,
    updateSong,
    deleteSong,
    uploadFile,
    getSongFile,
    uploadImage,
    getImageFile,
    getSongsMaxPoints,
    disableAndResetSong,
    resetSongs,
    resetSong
}