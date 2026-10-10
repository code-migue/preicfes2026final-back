// Framework principal
const express = require('express');

// Permite peticiones desde otros dominios
const cors = require('cors');

const app = express();

// Middleware para recibir JSON
app.use(express.json());

// Middleware CORS
app.use(cors());

// Importar rutas
const areasRoutes = require('./routes/Areas.routes');
const estudiantesRoutes = require('./routes/Estudiantes.routes');
const usuariosRoutes = require('./routes/Usuarios.routes');
const temasRoutes = require('./routes/Temas.routes');
const preguntasRoutes = require('./routes/Preguntas.routes');
const respuestasRoutes = require('./routes/Respuestas.routes');
const intentosRoutes = require('./routes/Intentos.routes');
const intentosrespuestasRoutes = require('./routes/IntentosRespuestas.routes');

// Registrar rutas
app.use('/api/areas', areasRoutes);
app.use('/api/estudiantes', estudiantesRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/temas', temasRoutes);
app.use('/api/preguntas', preguntasRoutes);
app.use('/api/respuestas', respuestasRoutes);
app.use('/api/intentos', intentosRoutes);
app.use('/api/intentosrespuestas', intentosrespuestasRoutes);

// Puerto del servidor
const PORT = 3000;

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en puerto ${PORT}`);
});
