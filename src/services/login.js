const express = require('express');
const User = require('../models/User');
const RefreshToken = require('../models/RefreshTokens');

const validateLogin = async (username, password) => {
  try {
    const champion = await User.findOne({usuario : username, contrasena: password});
    return champion;
  } catch (e) {
    throw new Error(e.message)
  }
}

const saveToken = async (token) => {
  try {
    const tokenData = new RefreshToken({
    token: token
    });
    const saveToken = await tokenData.save();
    return saveToken;
  } catch (e) {
    throw new Error(e.message)
  }
}

const validateToken = async (token) =>{
  try {
    const refreshToken = await RefreshToken.findOne({ token: token });
    return refreshToken;
  } catch (e) {
    throw new Error(e.message)
  }
}

const deleteRefreshToken = async (token) => {
  try {
    const deleteToken = await RefreshToken.deleteOne({ token: token });
    return 'Eliminado';
  } catch (e) {
    throw new Error(e.message)
  }
}

module.exports = {
  validateLogin,
  saveToken,
  deleteRefreshToken,
  validateToken
}