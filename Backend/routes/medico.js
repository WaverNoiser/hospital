//=========================//
//      RUTAS MEDICO       //
//========================//        

const express = require('express');
const auth = require('../middlewares/auth');
const app = express();

const Medico = require('../models/medico');

// GET
app.get('/',  (req, res, next) => {

    let desde = req.query.desde || 0;

    desde = Number(desde);


    Medico.find({})
    .populate('usuario', 'nombre email')
    .populate('hospital')
    .skip(desde)
    .limit(5)
        .exec(
            (err, medicos) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando medicos: ' + err
                    });
                }

                Medico.count({}, (err, conteo)=>{
                    res.status(200).json({
                        ok: true,
                        medicos: medicos,
                        total: conteo
                    }
                    );
                })
            });
});

// POST
app.post('/', auth.validToken, (req, res) => {
    var body = req.body;

    var medico = new Medico({
        nombre: body.nombre,
        img: body.img,
        usuario: body.usuario,
        hospital: body.hospital
    });

    medico.save((err, medicoSaved) => {
        if (err) {

            return res.status(400).json({
                ok: false,
                mensaje: 'Error guardando el medico: ' + err
            });
        }

        res.status(201).json(
            {
                ok: true,
                msg: 'medico guardado: ' + medicoSaved
            }
        );
    });

});


// update

app.put('/:id', auth.validToken, (req, res) => {

    var id = req.params.id;
    var body = req.body;

    Medico.findById(id, (err, medico) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar el Medico: ' + err
            });
        }

        if (!medico) {
            console.log('dos');
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe el Medico: ' + id,
                error: { message: 'no existe el Medico' }
            }
            );
        }

        medico.nombre = body.nombre,
            medico.img = body.img,
            medico.user = body.usuario

        medico.save(
            (err, medico) => {
                if (err) {
                    res.status(400).json(
                        {
                            ok: false,
                            msg: 'error al guardar medico: ' + err
                        }
                    )
                }


                res.status(200).json({ medico: medico });

            }
        );


    });
});


//borra un medico
app.delete('/:id',  auth.validToken, (req, res) => {

    var id = req.params.id;

    Medico.findByIdAndRemove(id, (err, medico) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar al medico: ' + err
            });
        }

        if (!medico) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe el medico: ' + id,
                error: { message: 'no existe el medico' }
            }
            );
        }

        res.status(200).json({
            ok: true,
            msg: 'medico borrado: ' + medico
        });

    }); });




module.exports = app;