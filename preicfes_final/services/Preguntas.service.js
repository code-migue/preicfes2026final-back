const db = require('../config/database');

const obtenerTodos = () => db.query('SELECT * FROM Preguntas').then(([r]) => r);
const obtenerPorId = (id) => db.query('SELECT * FROM Preguntas WHERE CodPregunta = ?', [id]).then(([r]) => r[0]);
const crear = ({ TextoPregunta, CodTema }) =>
    db.query('INSERT INTO Preguntas (TextoPregunta, CodTema) VALUES (?,?)',
        [TextoPregunta, CodTema]).then(([r]) => r);
const actualizar = (id, { TextoPregunta, CodTema }) =>
    db.query('UPDATE Preguntas SET TextoPregunta=?, CodTema=? WHERE CodPregunta=?',
        [TextoPregunta, CodTema, id]).then(([r]) => r);
const eliminar = (id) => db.query('DELETE FROM Preguntas WHERE CodPregunta = ?', [id]).then(([r]) => r);

module.exports = { obtenerTodos, obtenerPorId, crear, actualizar, eliminar };
