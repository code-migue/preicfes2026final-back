const db = require('../config/database');


// ===================================
// Obtener todos los Estudiantes
// ===================================
const obtenerTodos = async (req, res) => {

    try {

        const [rows] = await db.query(`SELECT * FROM Estudiantes`);

        res.json(rows);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: 'Error del servidor'
        });

    }

};

const obtenerPorId = async (req, res) => {

    try {

        const { id } = req.params;

        const [rows] = await db.query(
            'SELECT * FROM Estudiantes WHERE CodEstudiante = ?',
            [id]
        );

        if (rows.length === 0) {

            return res.status(404).json({
                mensaje: 'Estudiante no encontrado'
            });

        }

        res.json(rows[0]);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: 'Error del servidor'
        });

    }

};

const crear = async (req, res) => {

    try {

        const {
            Nombre,
            Apellido,
            Grado,
            Seccion,
            DocDeIdentidad
        } = req.body;

        const [resultado] = await db.query(`
            INSERT INTO Estudiantes
            (
                Nombre,
            Apellido,
            Grado,
            Seccion,
            DocDeIdentidad
            )
            VALUES (?, ?, ?, ?, ?)
        `,
            [
                Nombre,
                Apellido,
                Grado,
                Seccion,
                DocDeIdentidad
            ]);

        res.status(201).json({
            mensaje: 'Estudiante creado',
            id: resultado.insertId
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: 'Error al crear estudiante'
        });

    }

};

const actualizar = async (req, res) => {

    try {

        const { id } = req.params;

        const {
            Nombre,
            Apellido,
            Grado,
            Seccion,
            DocDeIdentidad
        } = req.body;

        const [resultado] = await db.query(`
            UPDATE Estudiantes
            SET
                Nombre=?,
                Apellido=?,
                Grado=?,
                Seccion=?,
                DocDeIdentidad=?
            WHERE CodEstudiante=?
        `,
            [
                Nombre,
                Apellido,
                Grado,
                Seccion,
                DocDeIdentidad,
                id
            ]);

        res.json({
            mensaje: 'Estudiante actualizado',
            filasAfectadas: resultado.affectedRows
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: 'Error al actualizar'
        });

    }

};

const eliminar = async (req, res) => {

    try {

        const { id } = req.params;

        const [resultado] = await db.query(
            'DELETE FROM Estudiantes WHERE CodEstudiante = ?',
            [id]
        );

        res.json({
            mensaje: 'Estudiante eliminado',
            filasAfectadas: resultado.affectedRows
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: 'Error al eliminar'
        });

    }

};

module.exports = {
    obtenerTodos,
    obtenerPorId,
    crear,
    actualizar,
    eliminar
};
