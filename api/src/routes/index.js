const { Router } = require('express');

const countRouter = require('./countries.js');
const activityRouter = require('./activity.js');



const router = Router();


router.use ('/countries', countRouter);
router.use ('/activity', activityRouter);



module.exports = router;
