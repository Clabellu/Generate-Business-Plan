import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Form1 from './forms/Form1';
import Form2 from './forms/Form2';
import Form3 from './forms/Form3';
import Form4 from './forms/Form4';
import Form5 from './forms/Form5';
import Form6 from './forms/Form6';
import Form7 from './forms/Form7';
import Form8 from './forms/Form8';
import Form9 from './forms/Form9';
import ProgressBar from './ProgressBar';
import './FormContainer.css';

const FormContainer = () => {
  const [currentForm, setCurrentForm] = useState(1);
  const [sessionId, setSessionId] = useState('');
  const [progress, setProgress] = useState(0);
  const [formData, setFormData] = useState({
    form1: null,
    form2: null,
    form3: null,
    form4: null,
    form5: null,
    form6: null,
    form7: null,
    form8: null,
    form9: null
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const navigate = useNavigate();

  // Crea una nuova sessione all'avvio
  useEffect(() => {
    const createSession = async () => {
      try {
        const response = await axios.post('/api/sessions', { language: 'italiano' });
        setSessionId(response.data.sessionId);
      } catch (error) {
        console.error('Errore nella creazione della sessione:', error);
        alert('Errore nella creazione della sessione. Riprova più tardi.');
      }
    };

    createSession();
  }, []);

  // Gestisce il salvataggio dei dati del form
  const handleFormSubmit = async (formNumber, data) => {
    try {
      // Aggiorna lo stato locale
      setFormData({ ...formData, [`form${formNumber}`]: data });
      
      // Salva i dati nel server
      const response = await axios.post('/api/sessions/form', {
        sessionId,
        formNumber,
        formData: data
      });
      
      // Aggiorna il progresso
      setProgress(response.data.progress || 0);
      
      // Passa al form successivo o genera il business plan
      if (formNumber < 9) {
        setCurrentForm(formNumber + 1);
      } else {
        // Ultimo form completato, chiedi di generare il business plan
        if (window.confirm('Hai completato tutti i form! Vuoi generare il business plan?')) {
          generateBusinessPlan();
        }
      }
    } catch (error) {
      console.error(`Errore nel salvataggio del form ${formNumber}:`, error);
      alert(`Errore nel salvataggio del form ${formNumber}. Riprova.`);
    }
  };

  // Genera il business plan completo
  const generateBusinessPlan = async () => {
    try {
      setIsGenerating(true);
      
      // Chiamata API per generare il business plan
      await axios.post('/api/generate/full', { sessionId });
      
      // Reindirizza alla pagina di visualizzazione del business plan
      navigate(`/business-plan/${sessionId}`);
    } catch (error) {
      console.error('Errore nella generazione del business plan:', error);
      alert('Errore nella generazione del business plan. Riprova più tardi.');
      setIsGenerating(false);
    }
  };

  // Passa al form precedente
  const handlePrevForm = () => {
    if (currentForm > 1) {
      setCurrentForm(currentForm - 1);
    }
  };

  // Renderizza il form corrente
  const renderCurrentForm = () => {
    switch (currentForm) {
      case 1:
        return <Form1 onSubmit={(data) => handleFormSubmit(1, data)} initialData={formData.form1} />;
      case 2:
        return <Form2 onSubmit={(data) => handleFormSubmit(2, data)} initialData={formData.form2} />;
      case 3:
        return <Form3 onSubmit={(data) => handleFormSubmit(3, data)} initialData={formData.form3} />;
      case 4:
        return <Form4 onSubmit={(data) => handleFormSubmit(4, data)} initialData={formData.form4} />;
      case 5:
        return <Form5 onSubmit={(data) => handleFormSubmit(5, data)} initialData={formData.form5} />;
      case 6:
        return <Form6 onSubmit={(data) => handleFormSubmit(6, data)} initialData={formData.form6} />;
      case 7:
        return <Form7 onSubmit={(data) => handleFormSubmit(7, data)} initialData={formData.form7} />;
      case 8:
        return <Form8 onSubmit={(data) => handleFormSubmit(8, data)} initialData={formData.form8} />;
      case 9:
        return <Form9 onSubmit={(data) => handleFormSubmit(9, data)} initialData={formData.form9} />;
      default:
        return <div>Form non valido</div>;
    }
  };

  return (
    <div className="form-container">
      <ProgressBar progress={progress} />
      <div className="form-navigation">
        <span>Form {currentForm} di 9</span>
        {currentForm > 1 && (
          <button onClick={handlePrevForm} disabled={isGenerating}>
            Precedente
          </button>
        )}
      </div>
      {isGenerating ? (
        <div className="generating-message">
          <h3>Generazione del Business Plan in corso...</h3>
          <p>Questo processo potrebbe richiedere alcuni minuti.</p>
        </div>
      ) : (
        <div className="form-content">
          {renderCurrentForm()}
        </div>
      )}
    </div>
  );
};

export default FormContainer;