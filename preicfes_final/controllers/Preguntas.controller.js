const db = require('../config/database');


// ===================================
// Obtener todos los Preguntas
// ===================================
const obtenerTodos = async (req, res) => {

    try {

        const [rows] = await db.query(`SELECT * FROM Preguntas`);

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
            'SELECT * FROM Preguntas WHERE CodPregunta = ?',
            [id]
        );

        if (rows.length === 0) {

            return res.status(404).json({
                mensaje: 'Pregunta no encontrado'
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
            TextoPregunta,
            CodTema
        } = req.body;

        const [resultado] = await db.query(`
            INSERT INTO Preguntas
            (
                TextoPregunta,
            CodTema
            )
            VALUES (?, ?)
        `,
            [
                TextoPregunta,
                CodTema
            ]);

        res.status(201).json({
            mensaje: 'Pregunta creado',
            id: resultado.insertId
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: 'Error al crear pregunta'
        });

    }

};

const actualizar = async (req, res) => {

    try {

        const { id } = req.params;

        const {
            TextoPregunta,
            CodTema
        } = req.body;

        const [resultado] = await db.query(`
            UPDATE Preguntas
            SET
                TextoPregunta=?,
                CodTema=?
            WHERE CodPregunta=?
        `,
            [
                TextoPregunta,
                CodTema,
                id
            ]);

        res.json({
            mensaje: 'Pregunta actualizado',
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
            'DELETE FROM Preguntas WHERE CodPregunta = ?',
            [id]
        );

        res.json({
            mensaje: 'Pregunta eliminado',
            filasAfectadas: resultado.affectedRows
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: 'Error al eliminar'
        });

    }

};

const obtenerPorArea = async (req, res) => {
    try {
        const { codArea } = req.params;
        const [rows] = await db.query(`
            SELECT p.*, r.CodRespuesta, r.TextoRespuesta, r.Estado
            FROM Preguntas p
            JOIN Temas t ON p.CodTema = t.CodTema
            JOIN Respuestas r ON r.CodPregunta = p.CodPregunta
            WHERE t.CodArea = ?
        `, [codArea]);
        res.json(agruparPreguntas(rows));
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error del servidor' });
    }
};

const obtenerPorTema = async (req, res) => {
    try {
        const { tema } = req.params;
        const esCodigo = /^\d+$/.test(tema);
        const filtro = esCodigo
            ? 't.CodTema = ?'
            : 'LOWER(TRIM(t.NombreTema)) = LOWER(TRIM(?))';
        const valorFiltro = esCodigo ? Number(tema) : tema;

        const [rows] = await db.query(`
            SELECT p.CodPregunta, p.TextoPregunta, p.CodTema,
                   r.CodRespuesta, r.TextoRespuesta, r.Estado
            FROM Preguntas p
            JOIN Temas t ON p.CodTema = t.CodTema
            JOIN Respuestas r ON r.CodPregunta = p.CodPregunta
            WHERE ${filtro}
        `, [valorFiltro]);

        res.json(agruparPreguntas(rows));
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error del servidor' });
    }
};

const obtenerAleatorio = async (req, res) => {
    try {
        const [pregs] = await db.query(`
            SELECT CodPregunta FROM Preguntas ORDER BY RAND() LIMIT 20
        `);
        const ids = pregs.map(p => p.CodPregunta);
        if (ids.length === 0) return res.json([]);
        const [rows] = await db.query(`
            SELECT p.CodPregunta, p.TextoPregunta, p.CodTema, r.CodRespuesta, r.TextoRespuesta, r.Estado
            FROM Preguntas p
            JOIN Respuestas r ON r.CodPregunta = p.CodPregunta
            WHERE p.CodPregunta IN (?)
        `, [ids]);
        res.json(agruparPreguntas(rows));
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error del servidor' });
    }
};

function agruparPreguntas(rows) {
    var mapa = {};
    rows.forEach(function(r) {
        if (!mapa[r.CodPregunta]) {
            mapa[r.CodPregunta] = { CodPregunta: r.CodPregunta, TextoPregunta: r.TextoPregunta, CodTema: r.CodTema, respuestas: [] };
        }
        mapa[r.CodPregunta].respuestas.push({ CodRespuesta: r.CodRespuesta, TextoRespuesta: r.TextoRespuesta, Estado: r.Estado });
    });
    return Object.values(mapa);
}

module.exports = {
    obtenerTodos,
    obtenerPorId,
    obtenerPorArea,
    obtenerPorTema,
    obtenerAleatorio,
    crear,
    actualizar,
    eliminar
};
