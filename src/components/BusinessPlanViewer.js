import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './BusinessPlanViewer.css';

const BusinessPlanViewer = () => {
  const { sessionId } = useParams();
  const [businessPlan, setBusinessPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBusinessPlan = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/business-plans/${sessionId}`);
        setBusinessPlan(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Errore nel recupero del business plan:', err);
        setError('Impossibile caricare il business plan. Riprova più tardi.');
        setLoading(false);
      }
    };

    fetchBusinessPlan();
  }, [sessionId]);

  const handleDownloadPDF = async () => {
    try {
      // Implementare la logica per scaricare il PDF
      alert('Funzionalità di download PDF in sviluppo');
    } catch (err) {
      console.error('Errore nel download del PDF:', err);
      alert('Errore nel download del PDF. Riprova più tardi.');
    }
  };

  if (loading) {
    return (
      <div className="business-plan-container">
        <div className="loading-message">
          <h2>Caricamento del business plan...</h2>
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="business-plan-container">
        <div className="error-message">
          <h2>Si è verificato un errore</h2>
          <p>{error}</p>
          <Link to="/" className="error-button">Torna alla home</Link>
        </div>
      </div>
    );
  }

  if (!businessPlan) {
    return (
      <div className="business-plan-container">
        <div className="error-message">
          <h2>Business plan non trovato</h2>
          <p>Non è stato possibile trovare il business plan richiesto.</p>
          <Link to="/" className="error-button">Torna alla home</Link>
        </div>
      </div>
    );
  }

  // Placeholder per il rendering del business plan
  return (
    <div className="business-plan-container">
      <div className="business-plan-header">
        <h1>{businessPlan.companyName || 'Business Plan'}</h1>
        <div className="business-plan-actions">
          <button onClick={handleDownloadPDF} className="download-button">
            Scarica PDF
          </button>
          <Link to="/" className="home-button">
            Torna alla home
          </Link>
        </div>
      </div>

      <div className="business-plan-content">
        <p className="placeholder-text">
          Questa è una pagina segnaposto per la visualizzazione del business plan.
          In una versione completa, qui verrebbe mostrato il business plan generato.
        </p>
        
        {/* Qui verrebbe renderizzato il contenuto del business plan */}
        <div className="placeholder-sections">
          <div className="placeholder-section">Riassunto Esecutivo</div>
          <div className="placeholder-section">Analisi della situazione</div>
          <div className="placeholder-section">Marketing</div>
          <div className="placeholder-section">Operazioni</div>
          <div className="placeholder-section">Gestione</div>
          <div className="placeholder-section">Strategia di Crescita</div>
          <div className="placeholder-section">Finanza</div>
          <div className="placeholder-section">Rischio e Mitigazione</div>
        </div>
      </div>
    </div>
  );
};

export default BusinessPlanViewer;