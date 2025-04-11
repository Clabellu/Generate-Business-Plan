import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-container">
      <div className="landing-content">
        <h1>Crea il tuo Business Plan professionale con l'AI</h1>
        <p className="landing-subtitle">
          Genera facilmente un business plan personalizzato per la tua azienda
          utilizzando l'intelligenza artificiale
        </p>
        
        <div className="landing-features">
          <div className="feature">
            <div className="feature-icon">⏱️</div>
            <h3>Risparmia tempo</h3>
            <p>Crea un business plan completo in pochi minuti anziché giorni</p>
          </div>
          
          <div className="feature">
            <div className="feature-icon">📊</div>
            <h3>Di qualità professionale</h3>
            <p>Risultati ben strutturati e pronti per essere presentati a banche o investitori</p>
          </div>
          
          <div className="feature">
            <div className="feature-icon">🔄</div>
            <h3>Personalizzabile</h3>
            <p>Adattato alle specifiche esigenze della tua azienda</p>
          </div>
        </div>
        
        <div className="landing-cta">
          <Link to="/create" className="cta-button">
            Inizia ora
          </Link>
        </div>
        
        <div className="landing-info">
          <p>
            Il nostro generatore ti guiderà attraverso una serie di domande 
            per raccogliere le informazioni necessarie per creare un business plan 
            personalizzato e pronto all'uso.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;