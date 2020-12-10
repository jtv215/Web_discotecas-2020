'user strict'
var fs = require('fs'); //sistema de ficheros
var path = require('path');
var mongoosePaginate = require('mongoose-pagination');

var Establishment = require('../models/establishment');
var List = require('../models/list');
var Song = require('../models/song');
var ListSong = require('../models/listsong');
 


function getList(req, res) {
    var listId = req.params.id;

    List.findById(listId).exec((err, list) => {
        if (err) {
            res.status(500).send({ message: 'Error en la petición.' });
        } else {
            if (!list) {
                res.status(404).send({ message: 'No se ha creado ninguna lista' });
            } else {
                res.status(200).send({ list });
            }
        }
    });
}



function getLists(req, res) {
    var establishmentId = req.params.id;
  
    var find = List.find({ establishment: establishmentId });

    find.populate({ path: 'Establishment' }).exec((err, lists) => {
        if (err) {
            res.status(500).send({ message: 'Error en la petición.' });
        } else {
            if (!lists) {
                res.status(404).send({ message: 'No hay lista' });
            } else {
                res.status(200).send({ lists });
            }
        }
    });



}


function saveList(req, res) {
    var list = new List();
    var params = req.body;
    list.name = params.name;
    list.image = '';
    list.establishment = params.establishment;

    list.save((err, listStored) => {
        if (err) {
            res.status(500).send({ message: 'Error al guardar una lista' });
        } else {
            if (!listStored) {
                res.status(404).send({ message: 'La lista no ha sido creada' });
            } else {
                res.status(200).send({ list: listStored });
            }
        }
    });
}

function updateList(req, res) {
    var listId = req.params.id;
    var update = req.body;
    List.findByIdAndUpdate(listId, update, (err, listUpdated) => {
        if (err) {
            res.status(500).send({ message: 'Error al actualizar el Album' });
        } else {
            if (!listUpdated) {
                res.status(404).send({ message: 'No se ha actualizado el album' });
            } else {
                res.status(200).send({ list: listUpdated, });
            }
        }
    });
}



function deleteList(req, res) {
    var listId = req.params.id;

    //Eliminar list como si fuese en escalado
    List.findByIdAndRemove(listId, (err, ListRemoved) => {
        if (err) {
            res.status(500).send({ message: 'Error al borrar La lista' });
        } else {
            if (!ListRemoved) {
                res.status(404).send({ message: 'No se ha eliminado la lista' });
            } else {

                //Eliminar imagenes asociadas a la lista
                var file_path = './uploads/lists/' + ListRemoved.image;
                try {
                    fs.unlinkSync(file_path);//borrar fichero antiguo
                } catch (err) {
                   
                }

                //Eliminar las canciones que hay asociadas
                ListSong.find({ list: ListRemoved._id }).remove((err, ListSongRemoved) => {
                    if (err) {
                        res.status(500).send({ message: 'Error al borrar la Canción' });
                    } else {
                        if (!ListSongRemoved) {
                            res.status(404).send({ message: 'La canción no ha sido eliminado' });

                        } else {
                            res.status(200).send({ list: ListRemoved });
                        }
                    }
                });
            }
        }
    });

}

function uploadImage(req, res) {
    var listId = req.params.id;
    var file_name = 'No subido...';

    if (req.files) {
        var file_path = req.files.image.path;
        var file_split = file_path.split('\\');
        var file_name = file_split[2];
        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];

        if (file_ext == "png" || file_ext == 'jpg' || file_ext == 'gif') {

            List.findByIdAndUpdate(listId, { image: file_name }, (err, listUpdate) => {
                if (!listUpdate) {
                    res.status(404).send({ message: 'No se ha podido actualizar el usuario usuario' });
                } else {
                    res.status(200).send({ list: listUpdate });

                    var file_path = './uploads/lists/' + listUpdate.image;
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
    var path_file = './uploads/lists/' + imageFile;

    fs.exists(path_file, function (exists) {
        if (exists) {
            res.sendFile(path.resolve(path_file));

        } else {
            res.status(200).send({ message: 'No existe la imagen' });

        }
    });
}


module.exports = {
    getList,
    saveList,
    getLists,
    updateList,
    deleteList,
    uploadImage,
    getImageFile,
    //getListWithSongs,
}