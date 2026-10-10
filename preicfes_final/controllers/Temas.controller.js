const db = require('../config/database');


// ===================================
// Obtener todos los Temas
// ===================================
const obtenerTodos = async (req, res) => {

    try {

        const [rows] = await db.query(`SELECT * FROM Temas`);

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
            'SELECT * FROM Temas WHERE CodTema = ?',
            [id]
        );

        if (rows.length === 0) {

            return res.status(404).json({
                mensaje: 'Tema no encontrado'
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
            NombreTema,
            Competencia,
            CodArea
        } = req.body;

        const [resultado] = await db.query(`
            INSERT INTO Temas
            (
                NombreTema,
            Competencia,
            CodArea
            )
            VALUES (?, ?, ?)
        `,
            [
                NombreTema,
                Competencia,
                CodArea
            ]);

        res.status(201).json({
            mensaje: 'Tema creado',
            id: resultado.insertId
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: 'Error al crear tema'
        });

    }

};

const actualizar = async (req, res) => {

    try {

        const { id } = req.params;

        const {
            NombreTema,
            Competencia,
            CodArea
        } = req.body;

        const [resultado] = await db.query(`
            UPDATE Temas
            SET
                NombreTema=?,
                Competencia=?,
                CodArea=?
            WHERE CodTema=?
        `,
            [
                NombreTema,
                Competencia,
                CodArea,
                id
            ]);

        res.json({
            mensaje: 'Tema actualizado',
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
            'DELETE FROM Temas WHERE CodTema = ?',
            [id]
        );

        res.json({
            mensaje: 'Tema eliminado',
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
