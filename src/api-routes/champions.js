const express = require('express');
const Champion = require('../models/Champion');
const router = express.Router();



router.get('/', async (req, res) => {
    try {
        const champions = await Champion.find();
        res.json(champions);
    } catch (err) {
        res.status(404).json({ message: err });
    }
});


router.post('/', async (req, res) => {
    const champion = new Champion({
        nombre: req.body.nombre,
        precio: req.body.precio,
        descripcion: req.body.descripcion,
        rol_primario: req.body.rol_primario,
        rol_secundario: req.body.rol_secundario,
        fecha_subido: req.body.fecha_subido
    });
    try{
        const saveChampion = await champion.save();
        res.status(200).json(saveChampion);
    } catch(err) {
        res.status(404).json({ message: err });
    }
});


router.get('/:championID', async(req, res) =>{
    try {
        const champion = await Champion.findById(req.params.championID);
        res.status(200).json(champion);
    } catch (err) {
        res.status(404).json({ message: err });
    }
});


router.delete('/:championID', async(req, res) =>{
    try {
        const removedChampion = await Champion.remove({ _id: req.params.championID });
        res.status(200).json(removedChampion);
    } catch (err) {
        res.status(404).json({ message: err });
    }
});


router.put('/:championID', async(req, res) =>{
    try {
        const editedChampion = await Champion.updateOne(
            { _id: req.params.postID }, 
            { $set:{ 
                nombre: req.body.nombre,
                precio: req.body.precio,
                descripcion: req.body.descripcion,
                rol_primario: req.body.rol_primario,
                rol_secundario: req.body.rol_secundario,
                fecha_subido: req.body.fecha_subido 
                } 
            }
        );
        res.status(200).json(editedChampion);
    } catch (err) {
        res.status(404).json({ message: err });
    }
});


module.exports = router;