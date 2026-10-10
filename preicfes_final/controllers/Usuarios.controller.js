const db = require('../config/database');

const normalizarRol = (rol) => {
    const valor = String(rol || '').trim().toLowerCase();
    if (valor === 'admin' || valor === 'administrador') return 'administrador';
    if (valor === 'estudiante') return 'estudiante';
    return '';
};

// ===================================
// Obtener todos los Usuarios
// ===================================
const obtenerTodos = async (req, res) => {

    try {

        const [rows] = await db.query(`SELECT * FROM Usuarios`);

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
            'SELECT * FROM Usuarios WHERE CodUsuario = ?',
            [id]
        );

        if (rows.length === 0) {

            return res.status(404).json({
                mensaje: 'Usuario no encontrado'
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
            NombreUsuario,
            Correo,
            Contraseña,
            CodEstudiante
        } = req.body;

        const [resultado] = await db.query(`
            INSERT INTO Usuarios
            (
                NombreUsuario,
            Correo,
            Contraseña,
            CodEstudiante
            )
            VALUES (?, ?, ?, ?)
        `,
            [
                NombreUsuario,
                Correo,
                Contraseña,
                CodEstudiante
            ]);

        res.status(201).json({
            mensaje: 'Usuario creado',
            id: resultado.insertId
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: 'Error al crear usuario'
        });

    }

};

const actualizar = async (req, res) => {

    try {

        const { id } = req.params;

        const {
            NombreUsuario,
            Correo,
            Contraseña,
            CodEstudiante
        } = req.body;

        const [resultado] = await db.query(`
            UPDATE Usuarios
            SET
                NombreUsuario=?,
                Correo=?,
                Contraseña=?,
                CodEstudiante=?
            WHERE CodUsuario=?
        `,
            [
                NombreUsuario,
                Correo,
                Contraseña,
                CodEstudiante,
                id
            ]);

        res.json({
            mensaje: 'Usuario actualizado',
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
            'DELETE FROM Usuarios WHERE CodUsuario = ?',
            [id]
        );

        res.json({
            mensaje: 'Usuario eliminado',
            filasAfectadas: resultado.affectedRows
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: 'Error al eliminar'
        });

    }

};

const login = async (req, res) => {
    try {
        const body = req.body || {};
        const { Correo, Contraseña } = body;
        const rolSolicitado = normalizarRol(body.Rol || body.rol);

        if (
            typeof Correo !== 'string' ||
            !Correo.trim() ||
            typeof Contraseña !== 'string' ||
            !Contraseña ||
            !rolSolicitado
        ) {
            return res.status(400).json({
                mensaje: 'Correo, contraseña y rol son obligatorios'
            });
        }

        const [rows] = await db.query(
            `SELECT CodUsuario, NombreUsuario, Correo, Contraseña, Rol, CodEstudiante
             FROM Usuarios
             WHERE Correo = ? AND Contraseña = ?`,
            [Correo, Contraseña]
        );
        if (rows.length === 0) {
            return res.status(401).json({ mensaje: 'Correo o contraseña incorrectos' });
        }
        const u = rows[0];
        const rolUsuario = normalizarRol(u.Rol);

        if (!rolUsuario || rolUsuario !== rolSolicitado) {
            return res.status(403).json({
                mensaje: 'El rol seleccionado no corresponde al usuario'
            });
        }

        res.json({
            CodUsuario: u.CodUsuario,
            NombreUsuario: u.NombreUsuario,
            Correo: u.Correo,
            Rol: rolUsuario,
            CodEstudiante: u.CodEstudiante
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error del servidor' });
    }
};

module.exports = {
    obtenerTodos,
    obtenerPorId,
    crear,
    actualizar,
    eliminar,
    login
};
