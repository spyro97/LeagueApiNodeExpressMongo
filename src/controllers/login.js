const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { generateAccessToken } = require('../config/jwt');
const { validateLogin, deleteRefreshToken, saveToken, validateToken } = require('../services/login.js');

router.post('/login', async (req, res) => {
    try {
        const username = req.body.usuario;
        const password = req.body.contrasena;
        const validateUser = await validateLogin(username, password);
        if ( validateUser == null) return res.json({ message: 'El usuario y contraseña no coinciden, intente de nuevo.'});
        const user = { username: username, id: validateUser._id, rol: validateUser.rol };

        const accessToken = await generateAccessToken(user);
        const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
        await saveToken(refreshToken);
        res.json({ usuario: username, accessToken: accessToken, refreshToken: refreshToken });
    } catch (err) {
        console.log(err)
        res.status(404).json({ message: err });
    }
});

router.post('/token', async (req, res) => {
    try {
        const refreshToken = req.body.token;
        if (refreshToken == null) return res.sendStatus(401);
        const tokenValidation = await validateToken(refreshToken);
        if (tokenValidation == null) return res.sendStatus(403);
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            if (err) return res.sendStatus(403);
            const accessToken = generateAccessToken({ username: user.username, id: user._id, rol: user.rol});
            res.json({ accessToken: accessToken });
        })
    } catch (err) {
        res.status(404).json({ message: err });
    }
});

router.delete('/logout', async (req, res) => {
    try {
        const token = req.body.token
        const data = await deleteRefreshToken(token);
        if (data){
            res.status(200).json({ message: data });
        }
    } catch (err) {
        res.status(404).json({ message: err });
    }
});

module.exports = router;
