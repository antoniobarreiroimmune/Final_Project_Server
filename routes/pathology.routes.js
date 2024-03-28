const express = require('express');
const router = express.Router();
const passport = require('passport');
const pathologyController = require('../controllers/pathology.controller');
const roleMiddleware = require('../middleware/auth.middleware');


router.get('/list', [passport.authenticate('jwt', { session: false }), roleMiddleware(['Pathologist', 'Guard'])], pathologyController.getAllPathologys);
router.get('/:id', [passport.authenticate('jwt', { session: false }), roleMiddleware(['Pathologist', 'Guard'])], pathologyController.getPathologyById);
router.put('/edit/:id', [passport.authenticate('jwt', { session: false }), roleMiddleware('Pathologist')], pathologyController.updatePathology);

module.exports = router;
