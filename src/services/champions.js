const express = require('express');
const Champion = require('../models/Champion');

const findChampion = async (id) => {
  try {
    const champion = await Champion.findById(id);
    return champion;
  } catch (e) {
    throw new Error(e.message)
  }
}

const findAllChampions = async () => {
  try {
    const champions = await Champion.find();
    return champions;
  } catch (e) {
    throw new Error(e.message)
  }
}

const createChampion = async (champion) => {
    const championData = new Champion({
        nombre: champion.nombre,
        precio: champion.precio,
        descripcion: champion.descripcion,
        rol_primario: champion.rol_primario,
        rol_secundario: champion.rol_secundario,
        fecha_subido: champion.fecha_subido
    });
    try {
        const saveChampion = await championData.save();
        return saveChampion
    } catch(e) {
      throw new Error(e.message)
    }
}

const updateChampion = async (champion, id) => {
  try {
      const editedChampion = await Champion.updateOne(
        { _id: id }, 
        { $set:{ 
            nombre: champion.nombre,
            precio: champion.precio,
            descripcion: champion.descripcion,
            rol_primario: champion.rol_primario,
            rol_secundario: champion.rol_secundario,
            fecha_subido: champion.fecha_subido 
            } 
        }
      );
      return editedChampion
  } catch(e) {
    throw new Error(e.message)
  }
}

const deleteChampion = async (id) => {
  try {
    const deletedChampion = await Champion.deleteOne({ _id: id });
    return deletedChampion;
  } catch (e) {
    throw new Error(e.message)
  }
}
  
module.exports = {
  createChampion, 
  updateChampion,
  findChampion,
  findAllChampions,
  deleteChampion
}