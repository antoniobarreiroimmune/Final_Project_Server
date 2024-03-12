const express = require('express');
const router = express.Router();
const passport = require('passport');
const pathologyController = require('../controllers/pathology.controller');
const roleMiddleware = require('../middleware/auth.middleware');


router.get('/', [passport.authenticate('jwt', { session: false }), roleMiddleware('Pathologyst')], pathologyController.getAllPathologys);
router.put('/:id', [passport.authenticate('jwt', { session: false }), roleMiddleware('Pathologyst')], pathologyController.updatePathology);

module.exports = router;
