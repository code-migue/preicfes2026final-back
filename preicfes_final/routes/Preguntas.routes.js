const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/Preguntas.controller');

router.get('/', ctrl.obtenerTodos);
router.get('/porArea/:codArea', ctrl.obtenerPorArea);
router.get('/porTema/:tema', ctrl.obtenerPorTema);
router.get('/aleatorio', ctrl.obtenerAleatorio);
router.get('/:id', ctrl.obtenerPorId);
router.post('/', ctrl.crear);
router.put('/:id', ctrl.actualizar);
router.delete('/:id', ctrl.eliminar);

module.exports = router;
