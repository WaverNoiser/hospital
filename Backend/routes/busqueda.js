//=================================//
//       RUTAS DE BUSQUEDA         //
//=================================//

var express = require('express');
var app = express();
const Hospital = require('../models/hospital');
const Medico = require('../models/medico');
const Usuario = require('../models/usuario');

app.get('/todo/:busqueda', (req, res, next) => {

    var busqueda = req.params.busqueda;
    var regex = new RegExp(busqueda, 'i');

    Promise.all([
        buscarHospitales(busqueda, regex),
        buscarMedicos(busqueda, regex),
        buscarUsuarios(busqueda, regex)
    ]
    ).then(respuestas => {
        res.status(200)
            .json(
                {
                    ok: true,
                    hospitales: respuestas[0],
                    medicos: respuestas[1],
                    usuarios: respuestas[2]
                });
    });



});


//=============================//
//     BUSCAR POR COLECCIONES  //
//=============================//

app.get('/coleccion/:coleccion/:busqueda', (req, res, next) => {

    var busqueda = req.params.busqueda;
    var coleccion = req.params.coleccion;
    var promesa;
    var regex = new RegExp(busqueda, 'i');

    switch (coleccion) {

        case 'hospital':
            promesa = buscarHospitales(busqueda, regex);
            break;

        case 'medico':
            promesa = buscarMedicos(busqueda, regex);
            break;

        case 'usuario':
            promesa = buscarUsuarios(busqueda, regex);
            break;

        default:
            return res.status(400).json({
                ok: false,
                mensaje: 'no existe la coleccion: ' + coleccion
            });
    }

    promesa.then(
        respuesta => {
            res.status(200)
            .json({ [coleccion]: respuesta })
        });
});



function buscarHospitales(busqueda, regex) {
    return new Promise((resolve, reject) => {
        Hospital.find({ nombre: regex })
            .populate('usuario', 'nombre email')
            .exec(
                (err, hospitales) => {
                    if (err) {
                        reject('error al cargar los hospitales', + err);
                    } else {
                        resolve(hospitales);
                    }
                });
    });
}

function buscarMedicos(busqueda, regex) {
    return new Promise((resolve, reject) => {
        Medico.find({ nombre: regex })
            .populate('usuario', 'nombre email')
            .populate('hospital')
            .exec((err, medicos) => {
                if (err) {
                    reject('error al cargar los medicos', + err);
                } else {
                    resolve(medicos);
                }
            });
    });
}

function buscarUsuarios(busqueda, regex) {
    return new Promise((resolve, reject) => {
        Usuario.find({}, 'nombre email')
            .or([
                { 'nombre': regex },
                { 'email': regex }])
            .exec((err, usuarios) => {
                if (err) {
                    reject('error al buscar en usuarios: ' + err);
                } else {
                    resolve(usuarios);
                }
            });
    });
}
module.exports = app;