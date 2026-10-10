const db = require('../config/database');

const obtenerTodos = () => db.query('SELECT * FROM Intentos').then(([r]) => r);
const obtenerPorId = (id) => db.query('SELECT * FROM Intentos WHERE CodIntento = ?', [id]).then(([r]) => r[0]);
const crear = ({ CodUsuario, Fecha, Puntaje, Descripcion }) =>
    db.query('INSERT INTO Intentos (CodUsuario, Fecha, Puntaje, Descripcion) VALUES (?,?,?,?)',
        [CodUsuario, Fecha, Puntaje, Descripcion]).then(([r]) => r);
const actualizar = (id, { CodUsuario, Fecha, Puntaje, Descripcion }) =>
    db.query('UPDATE Intentos SET CodUsuario=?, Fecha=?, Puntaje=?, Descripcion=? WHERE CodIntento=?',
        [CodUsuario, Fecha, Puntaje, Descripcion, id]).then(([r]) => r);
const eliminar = (id) => db.query('DELETE FROM Intentos WHERE CodIntento = ?', [id]).then(([r]) => r);

module.exports = { obtenerTodos, obtenerPorId, crear, actualizar, eliminar };
