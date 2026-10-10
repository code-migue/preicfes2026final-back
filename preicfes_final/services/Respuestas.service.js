const db = require('../config/database');

const obtenerTodos = () => db.query('SELECT * FROM Respuestas').then(([r]) => r);
const obtenerPorId = (id) => db.query('SELECT * FROM Respuestas WHERE CodRespuesta = ?', [id]).then(([r]) => r[0]);
const crear = ({ TextoRespuesta, Estado, CodPregunta }) =>
    db.query('INSERT INTO Respuestas (TextoRespuesta, Estado, CodPregunta) VALUES (?,?,?)',
        [TextoRespuesta, Estado, CodPregunta]).then(([r]) => r);
const actualizar = (id, { TextoRespuesta, Estado, CodPregunta }) =>
    db.query('UPDATE Respuestas SET TextoRespuesta=?, Estado=?, CodPregunta=? WHERE CodRespuesta=?',
        [TextoRespuesta, Estado, CodPregunta, id]).then(([r]) => r);
const eliminar = (id) => db.query('DELETE FROM Respuestas WHERE CodRespuesta = ?', [id]).then(([r]) => r);

module.exports = { obtenerTodos, obtenerPorId, crear, actualizar, eliminar };
