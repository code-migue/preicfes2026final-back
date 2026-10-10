const db = require('../config/database');

const obtenerTodos = () => db.query('SELECT * FROM Areas').then(([r]) => r);
const obtenerPorId = (id) => db.query('SELECT * FROM Areas WHERE CodArea = ?', [id]).then(([r]) => r[0]);
const crear = ({ NombreArea }) =>
    db.query('INSERT INTO Areas (NombreArea) VALUES (?)', [NombreArea]).then(([r]) => r);
const actualizar = (id, { NombreArea }) =>
    db.query('UPDATE Areas SET NombreArea=? WHERE CodArea=?', [NombreArea, id]).then(([r]) => r);
const eliminar = (id) => db.query('DELETE FROM Areas WHERE CodArea = ?', [id]).then(([r]) => r);

module.exports = { obtenerTodos, obtenerPorId, crear, actualizar, eliminar };
