const db = require('../config/database');

const obtenerTodos = () => db.query('SELECT * FROM Temas').then(([r]) => r);
const obtenerPorId = (id) => db.query('SELECT * FROM Temas WHERE CodTema = ?', [id]).then(([r]) => r[0]);
const crear = ({ NombreTema, Competencia, CodArea }) =>
    db.query('INSERT INTO Temas (NombreTema, Competencia, CodArea) VALUES (?,?,?)',
        [NombreTema, Competencia, CodArea]).then(([r]) => r);
const actualizar = (id, { NombreTema, Competencia, CodArea }) =>
    db.query('UPDATE Temas SET NombreTema=?, Competencia=?, CodArea=? WHERE CodTema=?',
        [NombreTema, Competencia, CodArea, id]).then(([r]) => r);
const eliminar = (id) => db.query('DELETE FROM Temas WHERE CodTema = ?', [id]).then(([r]) => r);

module.exports = { obtenerTodos, obtenerPorId, crear, actualizar, eliminar };
