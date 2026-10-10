const db = require('../config/database');

const obtenerTodos = () => db.query('SELECT * FROM Usuarios').then(([r]) => r);
const obtenerPorId = (id) => db.query('SELECT * FROM Usuarios WHERE CodUsuario = ?', [id]).then(([r]) => r[0]);
const crear = ({ NombreUsuario, Correo, Contraseña, CodEstudiante }) =>
    db.query('INSERT INTO Usuarios (NombreUsuario, Correo, Contraseña, CodEstudiante) VALUES (?,?,?,?)',
        [NombreUsuario, Correo, Contraseña, CodEstudiante]).then(([r]) => r);
const actualizar = (id, { NombreUsuario, Correo, Contraseña, CodEstudiante }) =>
    db.query('UPDATE Usuarios SET NombreUsuario=?, Correo=?, Contraseña=?, CodEstudiante=? WHERE CodUsuario=?',
        [NombreUsuario, Correo, Contraseña, CodEstudiante, id]).then(([r]) => r);
const eliminar = (id) => db.query('DELETE FROM Usuarios WHERE CodUsuario = ?', [id]).then(([r]) => r);
const login = (Correo, Contraseña) =>
    db.query('SELECT * FROM Usuarios WHERE Correo = ? AND Contraseña = ?', [Correo, Contraseña]).then(([r]) => r[0]);

module.exports = { obtenerTodos, obtenerPorId, crear, actualizar, eliminar, login };
