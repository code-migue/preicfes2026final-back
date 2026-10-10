const db = require('../config/database');


// ===================================
// Obtener todos los Intentos
// ===================================
const obtenerTodos = async (req, res) => {

    try {

        const [rows] = await db.query(`SELECT * FROM Intentos`);

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
            'SELECT * FROM Intentos WHERE CodIntento = ?',
            [id]
        );

        if (rows.length === 0) {

            return res.status(404).json({
                mensaje: 'Intento no encontrado'
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
            CodUsuario,
            Fecha,
            Puntaje,
            Descripcion
        } = req.body;

        const [resultado] = await db.query(`
            INSERT INTO Intentos
            (
                CodUsuario,
            Fecha,
            Puntaje,
            Descripcion
            )
            VALUES (?, ?, ?, ?)
        `,
            [
                CodUsuario,
                Fecha,
                Puntaje,
                Descripcion
            ]);

        res.status(201).json({
            mensaje: 'Intento creado',
            id: resultado.insertId
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: 'Error al crear intento'
        });

    }

};

const actualizar = async (req, res) => {

    try {

        const { id } = req.params;

        const {
            CodUsuario,
            Fecha,
            Puntaje,
            Descripcion
        } = req.body;

        const [resultado] = await db.query(`
            UPDATE Intentos
            SET
                CodUsuario=?,
                Fecha=?,
                Puntaje=?,
                Descripcion=?
            WHERE CodIntento=?
        `,
            [
                CodUsuario,
                Fecha,
                Puntaje,
                Descripcion,
                id
            ]);

        res.json({
            mensaje: 'Intento actualizado',
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
            'DELETE FROM Intentos WHERE CodIntento = ?',
            [id]
        );

        res.json({
            mensaje: 'Intento eliminado',
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
