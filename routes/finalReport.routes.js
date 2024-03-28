const express = require('express');
const router = express.Router();
const passport = require('passport');
const finalReportController = require('../controllers/finalReport.controller');
const roleMiddleware = require('../middleware/auth.middleware');

router.get('/list', [passport.authenticate('jwt', { session: false }), roleMiddleware(['Pathologist', 'Guard'])], finalReportController.getAllReports);
router.put('/edit/:id', [passport.authenticate('jwt', { session: false }), roleMiddleware(['Pathologist', 'Guard'])], finalReportController.updateReport);
router.get('/:id', [passport.authenticate('jwt', { session: false }), roleMiddleware(['Pathologist', 'Guard'])], finalReportController.getFinalReportById);
module.exports = router;