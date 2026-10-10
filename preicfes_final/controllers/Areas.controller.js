const db = require('../config/database');


// ===================================
// Obtener todos los Areas
// ===================================
const obtenerTodos = async (req, res) => {

    try {

        const [rows] = await db.query(`SELECT * FROM Areas`);

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
            'SELECT * FROM Areas WHERE CodArea = ?',
            [id]
        );

        if (rows.length === 0) {

            return res.status(404).json({
                mensaje: 'Area no encontrado'
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
            NombreArea
        } = req.body;

        const [resultado] = await db.query(`
            INSERT INTO Areas
            (
                NombreArea
            )
            VALUES (?)
        `,
            [
                NombreArea
            ]);

        res.status(201).json({
            mensaje: 'Area creado',
            id: resultado.insertId
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: 'Error al crear area'
        });

    }

};

const actualizar = async (req, res) => {

    try {

        const { id } = req.params;

        const {
            NombreArea
        } = req.body;

        const [resultado] = await db.query(`
            UPDATE Areas
            SET
                NombreArea=?
            WHERE CodArea=?
        `,
            [
                NombreArea,
                id
            ]);

        res.json({
            mensaje: 'Area actualizado',
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
            'DELETE FROM Areas WHERE CodArea = ?',
            [id]
        );

        res.json({
            mensaje: 'Area eliminado',
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
