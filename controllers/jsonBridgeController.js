const JsonBridge = require('../models/jsonBridgeModel');
const { v4: uuidv4 } = require('uuid');

// Crea una nuova sessione JSON Bridge
exports.createSession = async (req, res) => {
  try {
    const sessionId = uuidv4();
    const newSession = new JsonBridge({
      metadata: {
        sessionId,
        language: req.body.language || "italiano"
      }
    });
    
    const savedSession = await newSession.save();
    res.status(201).json({
      success: true,
      sessionId,
      message: "Sessione creata con successo"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Errore nella creazione della sessione",
      error: error.message
    });
  }
};

// Salva i dati di un form specifico
exports.saveFormData = async (req, res) => {
  try {
    const { sessionId, formNumber, formData } = req.body;
    
    if (!sessionId || !formNumber || !formData) {
      return res.status(400).json({
        success: false,
        message: "Dati mancanti. Richiesti: sessionId, formNumber e formData"
      });
    }
    
    const formField = `userInputs.form${formNumber}`;
    const formsCompleted = `metadata.completionStatus.formsCompleted`;
    
    const session = await JsonBridge.findOneAndUpdate(
      { "metadata.sessionId": sessionId },
      { 
        $set: { [formField]: formData },
        $addToSet: { [formsCompleted]: `form${formNumber}` }
      },
      { new: true }
    );
    
    if (!session) {
      return res.status(404).json({
        success: false,
        message: "Sessione non trovata"
      });
    }
    
    // Calcola il progresso
    const totalForms = 9; // Abbiamo 9 form in totale
    const completedForms = session.metadata.completionStatus.formsCompleted.length;
    const progress = Math.floor((completedForms / totalForms) * 100);
    
    // Aggiorna il progresso
    await JsonBridge.updateOne(
      { "metadata.sessionId": sessionId },
      { $set: { "metadata.completionStatus.overallProgress": progress } }
    );
    
    res.status(200).json({
      success: true,
      message: `Form ${formNumber} salvato con successo`,
      progress
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Errore nel salvataggio dei dati del form",
      error: error.message
    });
  }
};

// Ottieni tutti i dati di una sessione
exports.getSessionData = async (req, res) => {
  try {
    const { sessionId } = req.params;
    
    const session = await JsonBridge.findOne({ "metadata.sessionId": sessionId });
    
    if (!session) {
      return res.status(404).json({
        success: false,
        message: "Sessione non trovata"
      });
    }
    
    res.status(200).json({
      success: true,
      data: session
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Errore nel recupero dei dati della sessione",
      error: error.message
    });
  }
};