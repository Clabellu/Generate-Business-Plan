const express = require('express');
const jsonBridgeController = require('../controllers/jsonBridgeController');

const router = express.Router();

// Crea una nuova sessione
router.post('/sessions', jsonBridgeController.createSession);

// Salva i dati di un form
router.post('/sessions/form', jsonBridgeController.saveFormData);

// Ottieni i dati di una sessione
router.get('/sessions/:sessionId', jsonBridgeController.getSessionData);

module.exports = router;