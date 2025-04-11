const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Carica le variabili d'ambiente
dotenv.config();

// Crea l'app Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Rotta di test
app.get('/api/test', (req, res) => {
  res.json({ message: 'API funzionante!' });
});

// Importa le rotte
const jsonBridgeRoutes = require('./routes/jsonBridgeRoutes');
app.use('/api', jsonBridgeRoutes);

const claudeRoutes = require('./routes/claudeRoutes');
app.use('/api', claudeRoutes);

// Connessione al database MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connesso a MongoDB'))
  .catch(err => console.error('Errore di connessione a MongoDB:', err));

// Avvia il server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server in esecuzione sulla porta ${PORT}`);
});