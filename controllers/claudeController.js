const axios = require('axios');
const JsonBridge = require('../models/jsonBridgeModel');

// Funzione per generare una sezione del business plan
exports.generateSection = async (req, res) => {
  try {
    const { sessionId, section } = req.body;
    
    if (!sessionId || !section) {
      return res.status(400).json({
        success: false,
        message: "Dati mancanti. Richiesti: sessionId e section"
      });
    }
    
    // Recupera i dati della sessione
    const session = await JsonBridge.findOne({ "metadata.sessionId": sessionId });
    
    if (!session) {
      return res.status(404).json({
        success: false,
        message: "Sessione non trovata"
      });
    }
    
    // Verifica che ci siano abbastanza dati per generare la sezione
    if (Object.keys(session.userInputs).filter(key => session.userInputs[key] !== null).length < 1) {
      return res.status(400).json({
        success: false,
        message: "Dati insufficienti per generare la sezione. Compila almeno un form."
      });
    }
    
    // Crea il prompt per Claude in base alla sezione richiesta
    const prompt = createPromptForSection(section, session.userInputs);
    
    // Chiama Claude API
    const claudeResponse = await callClaudeAPI(prompt);
    
    // Aggiorna la sezione nel JSON Bridge
    const sectionField = `aiGeneratedContent.${section}`;
    await JsonBridge.updateOne(
      { "metadata.sessionId": sessionId },
      { 
        $set: { 
          [`${sectionField}.content`]: claudeResponse,
          [`${sectionField}.status`]: "completed",
          [`${sectionField}.lastUpdated`]: new Date(),
          "processingMetadata.currentSection": section
        }
      }
    );
    
    res.status(200).json({
      success: true,
      message: `Sezione ${section} generata con successo`,
      content: claudeResponse
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Errore nella generazione della sezione",
      error: error.message
    });
  }
};

// Funzione per chiamare l'API di Claude
const callClaudeAPI = async (prompt) => {
  try {
    const response = await axios.post(
      'https://api.anthropic.com/v1/messages',
      {
        model: "claude-3-opus-20240229",
        max_tokens: 4000,
        messages: [
          {
            role: "user",
            content: prompt
          }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.CLAUDE_API_KEY,
          'anthropic-version': '2023-06-01'
        }
      }
    );
    
    return response.data.content[0].text;
  } catch (error) {
    console.error('Errore API Claude:', error.response?.data || error.message);
    throw new Error('Errore nella chiamata API a Claude');
  }
};

// Funzione per creare prompt specifici per ogni sezione
const createPromptForSection = (section, userInputs) => {
  // Base del prompt per tutte le sezioni
  let basePrompt = `Sei un consulente aziendale esperto. Stai creando un business plan professionale in italiano. 
  
  Ecco i dati inseriti dall'utente:
  ${JSON.stringify(userInputs, null, 2)}
  
  `;
  
  // Prompt specifici per ogni sezione
  switch(section) {
    case 'executiveSummary':
      basePrompt += `Genera il "Riassunto Esecutivo" del business plan. Questa sezione deve includere:
      - Panoramica dell'azienda
      - Origini dell'azienda
      - Vantaggio competitivo
      - Riassunto finanziario
      
      Il riassunto deve essere conciso, professionale e catturare l'essenza dell'azienda in circa 400-500 parole.`;
      break;
      
    case 'situationAnalysis':
      basePrompt += `Genera la sezione "Analisi della Situazione" del business plan. Questa sezione deve includere:
      - Panoramica del settore
      - Principali tendenze di mercato
      - Analisi SWOT dettagliata (punti di forza, debolezze, opportunità, minacce)
      
      L'analisi deve essere approfondita e basata sui dati forniti dall'utente.`;
      break;
      
    // Aggiungi altre sezioni come necessario...
    
    default:
      basePrompt += `Genera la sezione "${section}" del business plan, seguendo le best practice del settore e utilizzando i dati forniti dall'utente.`;
  }
  
  return basePrompt;
};

// Funzione per generare l'intero business plan
exports.generateFullBusinessPlan = async (req, res) => {
  try {
    const { sessionId } = req.body;
    
    if (!sessionId) {
      return res.status(400).json({
        success: false,
        message: "SessionId mancante"
      });
    }
    
    // Recupera i dati della sessione
    const session = await JsonBridge.findOne({ "metadata.sessionId": sessionId });
    
    if (!session) {
      return res.status(404).json({
        success: false,
        message: "Sessione non trovata"
      });
    }
    
    // Array di tutte le sezioni da generare
    const sections = [
      'executiveSummary',
      'situationAnalysis',
      'marketing',
      'operations',
      'management',
      'growthStrategy',
      'finance',
      'riskMitigation'
    ];
    
    // Genera ogni sezione
    for (const section of sections) {
      // Verifica se la sezione è già stata generata
      if (session.aiGeneratedContent[section].status === 'completed') {
        continue;
      }
      
      // Crea il prompt per Claude in base alla sezione
      const prompt = createPromptForSection(section, session.userInputs);
      
      // Chiama Claude API
      const claudeResponse = await callClaudeAPI(prompt);
      
      // Aggiorna la sezione nel JSON Bridge
      const sectionField = `aiGeneratedContent.${section}`;
      await JsonBridge.updateOne(
        { "metadata.sessionId": sessionId },
        { 
          $set: { 
            [`${sectionField}.content`]: claudeResponse,
            [`${sectionField}.status`]: "completed",
            [`${sectionField}.lastUpdated`]: new Date(),
            "processingMetadata.currentSection": section
          }
        }
      );
    }
    
    res.status(200).json({
      success: true,
      message: "Business plan completo generato con successo"
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Errore nella generazione del business plan completo",
      error: error.message
    });
  }
};