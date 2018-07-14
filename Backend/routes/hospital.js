//===========================//
//      RUTAS HOSPITAL      //
//==========================//

const express = require('express');
const auth = require('../middlewares/auth');
const app = express();

const Hospital = require('../models/hospital');

// GET
app.get('/',  (req, res, next) => {
    
    let desde = req.query.desde || 0;

    desde = Number(desde);

    Hospital.find({})
    .populate('usuario', 'nombre email')
    .skip(desde)
    .limit(5)
        .exec(
            (err, hospitales) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando hospitales: ' + err
                    });
                }

                Hospital.count({}, (err, conteo)=> {
                    res.status(200).json({
                        ok: true,
                        hospitales: hospitales,
                        total: conteo
                    }
                    );
                })
                
            });
});

// POST
app.post('/', auth.validToken, (req, res) => {
    var body = req.body;

    var hospital = new Hospital({
        nombre: body.nombre,
        img: body.img,
        usuario: body.usuario,
    });

    hospital.save((err, hospitalSaved) => {
        if (err) {

            return res.status(400).json({
                ok: false,
                mensaje: 'Error guardando hospital: ' + err
            });
        }

        res.status(201).json(
            {
                ok: true,
                msg: 'hospital guardado: ' + hospitalSaved
            }
        );
    });

});


// update

app.put('/:id', auth.validToken, (req, res) => {

    var id = req.params.id;
    var body = req.body;

    Hospital.findById(id, (err, hospital) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar Hospital: ' + err
            });
        }

        if (!hospital) {
            console.log('dos');
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe el Hospital: ' + id,
                error: { message: 'no existe el Hospital' }
            }
            );
        }

        hospital.nombre = body.nombre,
            hospital.img = body.img,
            hospital.user = body.usuario

        hospital.save(
            (err, hospital) => {
                if (err) {
                    res.status(400).json(
                        {
                            ok: false,
                            msg: 'error al guardar hospital: ' + err
                        }
                    )
                }


                res.status(200).json({ hospital: hospital });

            }
        );


    });
});


//borra un hospital
app.delete('/:id',  auth.validToken, (req, res) => {

    var id = req.params.id;

    Hospital.findByIdAndRemove(id, (err, hospital) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar hospital: ' + err
            });
        }

        if (!hospital) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe el hospital: ' + id,
                error: { message: 'no existe el hospital' }
            }
            );
        }

        res.status(200).json({
            ok: true,
            msg: 'hospital borrado: ' + hospital
        });

    }); });




module.exports = app;