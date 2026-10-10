const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/Estudiantes.controller');

router.get('/', ctrl.obtenerTodos);
router.get('/:id', ctrl.obtenerPorId);
router.post('/', ctrl.crear);
router.put('/:id', ctrl.actualizar);
router.delete('/:id', ctrl.eliminar);

module.exports = router;
