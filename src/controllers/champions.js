const express = require('express');
const { createChampion, updateChampion, findChampion, findAllChampions, deleteChampion } = require('../services/champions.js');
const { authenticateToken } = require('../config/jwt');
const router = express.Router();


router.get('/', authenticateToken, async (req, res) => {
    try {
        console.log(req.user);
        const champions = await findAllChampions();
        res.json(champions);
    } catch (err) {
        res.status(404).json({ message: err });
    }
});


router.post('/', authenticateToken, async (req, res) => {
    const champion = req.body
    console.log(req.user.rol)
    if (req.user.rol !== 'administrador') return res.json({message: 'No cuentas con los permisos necesarios para ejecutar esta acción.'})
    try{
        console.log('Holis')
        const data = await createChampion(champion);
        res.status(200).json(data);
    } catch(err) {
        res.status(404).json({ message: err });
    }
});


router.get('/:championID', async(req, res) =>{
    const id = req.params.championID;
    try {
        const champion = await findChampion(id);
        res.status(200).json(champion);
    } catch (err) {
        res.status(404).json({ message: err });
    }
});


router.delete('/:championID', async(req, res) =>{
    const id = req.params.championID;
    try {
        const removedChampion = await deleteChampion(id);
        res.status(200).json(removedChampion);
    } catch (err) {
        res.status(404).json({ message: err });
    }
});


router.put('/:championID', async(req, res) =>{
    const champion = req.body;
    const id = req.params.championID
    try {
        const data = await updateChampion(champion, id); 
        res.status(200).json(data);
    } catch (err) {
        res.status(404).json({ message: err });
    }
});


module.exports = router;