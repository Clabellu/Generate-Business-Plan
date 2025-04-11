const express = require('express');
const claudeController = require('../controllers/claudeController');

const router = express.Router();

// Genera una sezione specifica del business plan
router.post('/generate/section', claudeController.generateSection);

// Genera l'intero business plan
router.post('/generate/full', claudeController.generateFullBusinessPlan);

module.exports = router;