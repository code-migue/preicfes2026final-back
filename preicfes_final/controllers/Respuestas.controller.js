const db = require('../config/database');


// ===================================
// Obtener todos los Respuestas
// ===================================
const obtenerTodos = async (req, res) => {

    try {

        const [rows] = await db.query(`SELECT * FROM Respuestas`);

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
            'SELECT * FROM Respuestas WHERE CodRespuesta = ?',
            [id]
        );

        if (rows.length === 0) {

            return res.status(404).json({
                mensaje: 'Respuesta no encontrado'
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
            TextoRespuesta,
            Estado,
            CodPregunta
        } = req.body;

        const [resultado] = await db.query(`
            INSERT INTO Respuestas
            (
                TextoRespuesta,
            Estado,
            CodPregunta
            )
            VALUES (?, ?, ?)
        `,
            [
                TextoRespuesta,
                Estado,
                CodPregunta
            ]);

        res.status(201).json({
            mensaje: 'Respuesta creado',
            id: resultado.insertId
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: 'Error al crear respuesta'
        });

    }

};

const actualizar = async (req, res) => {

    try {

        const { id } = req.params;

        const {
            TextoRespuesta,
            Estado,
            CodPregunta
        } = req.body;

        const [resultado] = await db.query(`
            UPDATE Respuestas
            SET
                TextoRespuesta=?,
                Estado=?,
                CodPregunta=?
            WHERE CodRespuesta=?
        `,
            [
                TextoRespuesta,
                Estado,
                CodPregunta,
                id
            ]);

        res.json({
            mensaje: 'Respuesta actualizado',
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
            'DELETE FROM Respuestas WHERE CodRespuesta = ?',
            [id]
        );

        res.json({
            mensaje: 'Respuesta eliminado',
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
