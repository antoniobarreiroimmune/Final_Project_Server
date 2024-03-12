const router = require('express').Router();
const authRoutes = require('./auth.routes');
const procedureRoutes = require('./procedure.routes');
const pathologyRoutes = require('./pathology.routes');


router.use('/auth', authRoutes);
router.use('/procedure', procedureRoutes);
router.use('/pathology', pathologyRoutes);

module.exports = router;
