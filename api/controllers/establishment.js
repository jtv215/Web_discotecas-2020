'user strict'
var bcrypt = require('bcrypt-nodejs');
var Establishment = require('../models/establishment');
var jwt = require('../service/jwt');
var fs = require('fs');
var path = require('path');



function pruebas(req, res) {
    res.status(200).send({
        message: 'Probando una acción del controlador de usuario con Node y Mongo'
    });
}


function saveEstablishment(req, res) {
    var establishment = new Establishment();
    var params = req.body;

    establishment.name = params.name;
    establishment.surname = '';
    establishment.email = params.email;
    establishment.sexo = '';
    establishment.birth_date = '';
    establishment.phone_user = '';

    establishment.role = 'ROLE_ESTABLISHMENT';
    establishment.name_establishment = '';
    establishment.address = '';
    establishment.phone_establishment = '';
    establishment.email_establishment = '';
    establishment.provincia = '';
    establishment.localidad = '';
    establishment.cp = null;
    establishment.image = '';
    establishment.information = '';
    establishment.duration = '30';
    establishment.time = 'minutes';
    establishment.create_at = new Date();


    if (params.password && params.name && params.email) {
        //encriptar contraseña y guaradar datos
        bcrypt.hash(params.password, null, null, function (err, hash) {
            establishment.password = hash;

            if (establishment.email != null) {
                //guar usuario
                establishment.save((err, establishmentStored) => {
                    if (err) {
                        res.status(500).send({ message: 'Error al guardar usuario' + err });
                    } else {
                        if (!establishment) {
                            res.status(404).send({ message: 'No se ha registrado el usuario usuario' });

                        } else {
                            res.status(200).send({ establishment: establishmentStored });

                        }

                    }
                });

            } else {
                res.status(200).send({ message: 'Rellana todos los campos' });

            }
        })

    } else {
        res.status(200).send({ message: 'Introduce todos los campos' });
    }
}


function loginEstableshment(req, res) {
    var params = req.body;
    var email = params.email;
    var password = params.password;

    Establishment.findOne({ email: email.toLowerCase() }, (err, establishment) => {
        if (err) {
            res.status(500).send({ message: 'Error en la petición' });
        } else {
            if (!establishment) {
                res.status(404).send({ message: 'Correo o contraseña incorrecta!' });

            } else {
                //si existe el usuario comprobamos contraseña
                bcrypt.compare(password, establishment.password, function (err, check) {
                    if (check) {
                        if (params.gethash) {
                            //devolver un token jwt
                            res.status(200).send({
                                token: jwt.createToken(establishment)

                            })

                        } else {
                            res.status(200).send({ establishment });

                        }
                    } else {
                        res.status(404).send({ message: 'Correo o contraseña incorrecta' });

                    }
                });
            }
        }
    });

}

function getEstablishments(req, res) {

    var find = Establishment.find({});

    find.exec(function (err, establishments) {
        if (err) {
            res.status(500).send({ message: 'Error en la petición.' });
        } else {
            if (!establishments) {
                res.status(404).send({ message: 'No hay canciones' });
            } else {
                res.status(200).send({ establishment: establishments });
            }
        }

    });

}

function getEstablishment(req, res) {
    var establishmentId = req.params.id;


    Establishment.findById(establishmentId, (err, establishment) => {
        if (err) {
            res.status(500).send({ message: 'Error en la petición.' });
        } else {
            if (!establishment) {
                res.status(404).send({ message: 'No se ha encontrado el usuario' });
            } else {
                res.status(200).send({ establishment: establishment });
            }
        }

    });

}
function updateEstablishment(req, res) {
    var establishmentId = req.params.id;
    var update = req.body;


    if (establishmentId != req.user.sub) { //req.user.
        return res.status(500).send({ message: 'No tienes permiso para actualizar este usuario' });
    }

    Establishment.findByIdAndUpdate(establishmentId, update, (err, establishmentUpdate) => {
        if (err) {
            res.status(500).send({ message: 'Error al actualizar el usuario' });
        } else {
            if (!establishmentUpdate) {
                res.status(404).send({ message: 'No se ha podido actualizar el usuario usuario' });
            } else {
                res.status(200).send({ establishment: establishmentUpdate }); //el usuario antes de actualizarse
            }
        }
    });
}

function changePassword(req, res) {
    var establishmentId = req.params.id;
    var params = req.body;

    var passwordCurrent = params.passwordCurrent;
    var password1 = params.password1;
    var password2 = params.password2;


    if (establishmentId != req.user.sub) { //req.user.
        return res.status(404).send({ message: 'No tienes permiso para actualizar este usuario' });
    }
    if (password1 == '' || password2 == '') {
        return res.status(404).send({ message: 'Los campos estan vacios' });
    }
    // if (password1.length < 6 || password2.length < 6) {
    //     return res.status(404).send({ message: 'la contraseña tiene menos de 6 caracteres' });
    // }

    if (password1 != password2) {
        return res.status(500).send({ message: 'La contraseña son distintas, intentelo de nuevo.' });
    }

    Establishment.findById(establishmentId, (err, establishment) => {
        if (err) {
            res.status(500).send({ message: 'Error en la petición.' });
        } else {
            if (!establishment) {
                res.status(404).send({ message: 'No se ha encontrado el usuario.' });
            } else {

                bcrypt.compare(passwordCurrent, establishment.password, function (err, check) {
                    if (check) {

                        bcrypt.hash(password1, null, null, function (err, hash) {
                            Establishment.update({ "_id": establishment._id }, { "$set": { "password": hash } }, (err, establishmentUpdate) => {
                                if (err) {
                                    res.status(500).send({ message: 'Error al actualizar el usuario.' });
                                } else {
                                    if (!establishmentUpdate) {
                                        res.status(404).send({ message: 'No se ha podido cambiar la contraseña del usuario.' });
                                    } else {
                                        res.status(200).send({ message: 'La contraseña se ha cambiado correctamente.' });
                                    }
                                }
                            });

                        });

                    } else {
                        return res.status(404).send({ message: 'La contraseña actual no coincide con la bd' });

                    }

                });

            }
        }

    });


}


function uploadImage(req, res) {
    var establishmentId = req.params.id;

    var file_name = 'No subido...';

    if (req.files) {
        var file_path = req.files.image.path;

        var file_split = file_path.split('\\');
        var file_name = file_split[2];

        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];

        if (file_ext == "png" || file_ext == 'jpg' || file_ext == 'gif') {

            Establishment.findByIdAndUpdate(establishmentId, { image: file_name }, (err, establishmentUpdate) => {

                if (!establishmentUpdate) {
                    res.status(404).send({ message: 'No se ha podido actualizar el usuario usuario' });
                } else {
                    res.status(200).send({
                        image: file_name,
                        establishment: establishmentUpdate
                    });

                    var file_path = './uploads/establishments/' + establishmentUpdate.image;

                    try {
                        fs.unlinkSync(file_path);//borrar fichero antiguo
                    } catch (err) {
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
    var path_file = './uploads/establishments/' + imageFile;

    fs.exists(path_file, function (exists) {
        if (exists) {
            res.sendFile(path.resolve(path_file));
        } else {
            res.status(200).send({ message: 'No existe la imagen' });
        }
    })
}

module.exports = {
    pruebas,
    saveEstablishment,
    loginEstableshment,
    getEstablishments,
    updateEstablishment,
    uploadImage,
    getImageFile,
    getEstablishment,
    changePassword,

};