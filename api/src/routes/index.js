const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const countRouter = require('./countries.js');
const activityRouter = require('./activity.js');



const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use ('/countries', countRouter);
router.use ('/activity', activityRouter);



module.exports = router;
