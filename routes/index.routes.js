const router = require('express').Router();
const authRoutes = require('./auth.routes');
const procedureRoutes = require('./procedure.routes');
const pathologyRoutes = require('./pathology.routes');
const usersRoutes = require('./users.routes');


router.use('/auth', authRoutes);
router.use('/procedures', procedureRoutes);
router.use('/pathology', pathologyRoutes);
router.use('/users', usersRoutes);

module.exports = router;
