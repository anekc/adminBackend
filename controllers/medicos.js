const { response } = require('express');
const Medico = require('../models/medicos');



const getMedico = async(req, res = response) => {

    const medicos = await Medico.find()
        .populate('usuario', 'nombre img ')
        .populate('hospital', 'nombre img');



    res.json({
        ok: true,
        medicos
    });
};

const crearMedico = async(req, res = response) => {

    const uid = req.uid;
    const medico = new Medico({
        usuario: uid,
        ...req.body
    });


    try {
        const medicoDB = await medico.save();

        res.json({
            ok: true,
            medico: medicoDB
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'contacte al administrador del sistema'
        });
    }

};

const actualizarMedico = async(req, res = response) => {
    const uid = req.uid;
    const id = req.params.id;

    try {


        const medicoDB = await Medico.findById(id);
        if (!medicoDB) {
            res.status(404).json({
                ok: true,
                msg: 'medico no encontrado por ID',
                id
            });

        }

        const cambiosMedico = {...req.body,
            usuario: uid

        };

        const medicoActualizado = await Medico.findByIdAndUpdate(id, cambiosMedico, { new: true });

        res.json({
            ok: true,
            msg: 'medico actualizado',
            medicoDB: medicoActualizado

        });


    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'contacte al administrador del sistema'
        });

    }



};


const borrarMedico = async(req, res = response) => {

    const id = req.params.id;

    try {
        const medicoDB = await Medico.findById(id);
        if (!medicoDB) {
            return res.status(404).json({
                ok: false,
                msg: 'no existe un medico con ese id'
            });
        }

        await Medico.findByIdAndDelete(id);
        res.json({
            ok: true,
            msg: 'Médico Eliminado'
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'contacte al adminstrador'
        });

    }

};







module.exports = {
    getMedico,
    crearMedico,
    actualizarMedico,
    borrarMedico
};