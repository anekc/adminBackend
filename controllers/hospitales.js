const { response } = require('express');
const Hospital = require('../models/hospital');
const hospital = require('../models/hospital');


const getHospitales = async(req, res = response) => {

    const hospitales = await Hospital.find()
        .populate('usuario', 'nombre img');

    res.json({
        ok: true,
        hospitales
    });
};

const crearHospital = async(req, res = response) => {

    const uid = req.uid;
    const hospital = new Hospital({
        usuario: uid,
        ...req.body
    });

    try {

        const hospitalDB = await hospital.save();

        res.json({
            ok: true,
            hospital: hospitalDB
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'hable con el administrador del sistema'
        });
    }


    res.json({
        ok: true,
        msg: 'crear hospitales'
    });
};

const actualizarHospital = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;
    try {

        const hospitalDB = await Hospital.findById(id);
        if (!hospitalDB) {
            res.status(404).json({
                ok: true,
                msg: 'Hospital no encontrado por ID',
                id
            });
        }
        const cambiosHospital = {...req.body,
            usuario: uid
        };
        const hospitalActualizado = await Hospital.findByIdAndUpdate(id, cambiosHospital, { new: true });
        res.json({
            ok: true,
            msg: 'hospital actualizado',
            hospitalDB: hospitalActualizado
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'hable con el administrador'
        });

    }

};


const borrarHospital = async(req, res = response) => {

    const uid = req.params.id;
    try {

        const hospitalDB = await Hospital.findById(uid);
        if (!hospitalDB) {
            return res.status(404).json({
                ok: false,
                msg: 'no existe un hospital con ese id'
            });
        }
        await Hospital.findByIdAndDelete(uid);
        res.json({
            ok: true,
            msg: 'Hospital Eliminado'
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'contacte al administrador del sistema'
        });

    }

};







module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
};