const db = require('../config/database');

const obtenerTodos = () => db.query('SELECT * FROM IntentosRespuestas').then(([r]) => r);
const obtenerPorId = (id) => db.query('SELECT * FROM IntentosRespuestas WHERE CodIntentoRespuesta = ?', [id]).then(([r]) => r[0]);
const crear = ({ CodIntento, CodRespuesta }) =>
    db.query('INSERT INTO IntentosRespuestas (CodIntento, CodRespuesta) VALUES (?,?)',
        [CodIntento, CodRespuesta]).then(([r]) => r);
const actualizar = (id, { CodIntento, CodRespuesta }) =>
    db.query('UPDATE IntentosRespuestas SET CodIntento=?, CodRespuesta=? WHERE CodIntentoRespuesta=?',
        [CodIntento, CodRespuesta, id]).then(([r]) => r);
const eliminar = (id) => db.query('DELETE FROM IntentosRespuestas WHERE CodIntentoRespuesta = ?', [id]).then(([r]) => r);

module.exports = { obtenerTodos, obtenerPorId, crear, actualizar, eliminar };
