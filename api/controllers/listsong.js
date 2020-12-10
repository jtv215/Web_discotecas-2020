'user strict'
var ListSong = require('../models/listsong');
var moment = require('moment');

function saveListSong(req, res) {
    var listSong = new ListSong();
    var params = req.body;
    listSong.list = params.list;
    listSong.song = params.song;

    listSong.save((err, listSongStored) => {
        if (err) {
            res.status(500).send({ message: 'Error al guardar una lista' });
        } else {
            if (!listSongStored) {
                res.status(404).send({ message: 'La lista no ha sido creada' });
            } else {
                res.status(200).send({ listSong: listSongStored });
            }
        }
    });
}

function getListWithSongs(req, res) {
    var listId = req.params.id;

    var find = ListSong.find({ list: listId }).populate('song')

        .exec((err, listSong) => {
            if (err) {
                res.status(500).send({ message: 'Error en la petición.' });
            } else {
                if (!listSong) {
                    res.status(404).send({ message: 'No se ha encontrado ninguna lista' });
                } else {
                    res.status(200).send({ listSong });
                }
            }
        });
}

function getListSongsWithMusicMaxPoints(req, res) {
    var listId = req.params.id;
    let aux = moment().unix();

    var find = ListSong.find({ list: listId })
        .populate({
            path: 'song',
            match: { 'active_song': { $lt: aux } },
        })

    find.exec((err, listSong) => {
        if (err) {
            res.status(500).send({ message: 'Error en la petición.' });
        } else {
            if (!listSong) {
                res.status(404).send({ message: 'No se ha encontrado ninguna lista' });
            } else {
                var i;
                var result = [];
                for (i = 0; i < listSong.length; i++) {
                    var song = listSong[i].song; 
                    if(song!=null){
                        result.push(song);                
                    }
                }

                if(result[0]==null){

                }else{
                 var songs= result.sort(compareValues('total_points','desc'));
                }
                    res.status(200).send({songs});
                }
            }
        });
}

function compareValues(key, order = 'asc') {
    return function innerSort(a, b) {
    //   if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
    //     // property doesn't exist on either object
    //     return 0;
    //   }
      const varA = a[key] ;
      const varB = b[key];
  
      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return (
        (order === 'desc') ? (comparison * -1) : comparison
      );
    };
  }


function deleteListSong(req, res) {
    var listSongId = req.params.id;

    ListSong.findByIdAndRemove(listSongId, (err, ListSongRemoved) => {
        if (err) {
            res.status(500).send({ message: 'Error al borrar la canción' });
        } else {
            if (!ListSongRemoved) {
                res.status(404).send({ message: 'La canción no ha sido eliminada de la playList' });

            } else {
                res.status(200).send({ listSong: ListSongRemoved });
            }
        }
    });
}

module.exports = {
    saveListSong,
    getListWithSongs,
    deleteListSong,
    getListSongsWithMusicMaxPoints
}