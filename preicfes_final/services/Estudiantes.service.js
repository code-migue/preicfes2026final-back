const db = require('../config/database');

const obtenerTodos = () => db.query('SELECT * FROM Estudiantes').then(([r]) => r);
const obtenerPorId = (id) => db.query('SELECT * FROM Estudiantes WHERE CodEstudiante = ?', [id]).then(([r]) => r[0]);
const crear = ({ Nombre, Apellido, Grado, Seccion, DocDeIdentidad }) =>
    db.query('INSERT INTO Estudiantes (Nombre, Apellido, Grado, Seccion, DocDeIdentidad) VALUES (?,?,?,?,?)',
        [Nombre, Apellido, Grado, Seccion, DocDeIdentidad]).then(([r]) => r);
const actualizar = (id, { Nombre, Apellido, Grado, Seccion, DocDeIdentidad }) =>
    db.query('UPDATE Estudiantes SET Nombre=?, Apellido=?, Grado=?, Seccion=?, DocDeIdentidad=? WHERE CodEstudiante=?',
        [Nombre, Apellido, Grado, Seccion, DocDeIdentidad, id]).then(([r]) => r);
const eliminar = (id) => db.query('DELETE FROM Estudiantes WHERE CodEstudiante = ?', [id]).then(([r]) => r);

module.exports = { obtenerTodos, obtenerPorId, crear, actualizar, eliminar };
