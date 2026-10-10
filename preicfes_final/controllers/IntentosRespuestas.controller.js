const db = require('../config/database');


// ===================================
// Obtener todos los IntentosRespuestas
// ===================================
const obtenerTodos = async (req, res) => {

    try {

        const [rows] = await db.query(`SELECT * FROM IntentosRespuestas`);

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
            'SELECT * FROM IntentosRespuestas WHERE CodIntentoRespuesta = ?',
            [id]
        );

        if (rows.length === 0) {

            return res.status(404).json({
                mensaje: 'IntentoRespuesta no encontrado'
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
            CodIntento,
            CodRespuesta
        } = req.body;

        const [resultado] = await db.query(`
            INSERT INTO IntentosRespuestas
            (
                CodIntento,
            CodRespuesta
            )
            VALUES (?, ?)
        `,
            [
                CodIntento,
                CodRespuesta
            ]);

        res.status(201).json({
            mensaje: 'IntentoRespuesta creado',
            id: resultado.insertId
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: 'Error al crear intentorespuesta'
        });

    }

};

const actualizar = async (req, res) => {

    try {

        const { id } = req.params;

        const {
            CodIntento,
            CodRespuesta
        } = req.body;

        const [resultado] = await db.query(`
            UPDATE IntentosRespuestas
            SET
                CodIntento=?,
                CodRespuesta=?
            WHERE CodIntentoRespuesta=?
        `,
            [
                CodIntento,
                CodRespuesta,
                id
            ]);

        res.json({
            mensaje: 'IntentoRespuesta actualizado',
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
            'DELETE FROM IntentosRespuestas WHERE CodIntentoRespuesta = ?',
            [id]
        );

        res.json({
            mensaje: 'IntentoRespuesta eliminado',
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
