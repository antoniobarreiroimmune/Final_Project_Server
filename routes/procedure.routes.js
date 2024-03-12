const express = require('express');
const router = express.Router();
const passport = require('passport');
const procedureController = require('../controllers/procedureController');
const roleMiddleware = require('../middleware/auth.middleware');


router.post('/', [passport.authenticate('jwt', { session: false }), roleMiddleware('Guard')], procedureController.createProcedure);
router.get('/', [passport.authenticate('jwt', { session: false }), roleMiddleware('Guard')], procedureController.getAllProcedures);
router.put('/:id', [passport.authenticate('jwt', { session: false }), roleMiddleware('Guard')], procedureController.updateProcedure);

module.exports = router;
