import React from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import * as Yup from 'yup';
import './Forms.css';

const validationSchema = Yup.object().shape({
  strengths: Yup.array().of(
    Yup.string()
  ).test(
    'at-least-one-strength',
    'Indica almeno un punto di forza',
    arr => arr && arr.length > 0 && arr[0].trim() !== ''
  ),
  weaknesses: Yup.array().of(
    Yup.string()
  ).test(
    'at-least-one-weakness',
    'Indica almeno una debolezza',
    arr => arr && arr.length > 0 && arr[0].trim() !== ''
  ),
  opportunities: Yup.array().of(
    Yup.string()
  ).test(
    'at-least-one-opportunity',
    'Indica almeno un\'opportunità',
    arr => arr && arr.length > 0 && arr[0].trim() !== ''
  ),
  threats: Yup.array().of(
    Yup.string()
  ).test(
    'at-least-one-threat',
    'Indica almeno una minaccia',
    arr => arr && arr.length > 0 && arr[0].trim() !== ''
  )
});

const Form5 = ({ initialData, onSubmit }) => {
  const initialValues = {
    strengths: initialData?.strengths || ['', '', ''],
    weaknesses: initialData?.weaknesses || ['', '', ''],
    opportunities: initialData?.opportunities || ['', ''],
    threats: initialData?.threats || ['', '']
  };

  const handleSubmit = (values) => {
    // Filtriamo i campi vuoti
    const filteredValues = {
      strengths: values.strengths.filter(item => item.trim() !== ''),
      weaknesses: values.weaknesses.filter(item => item.trim() !== ''),
      opportunities: values.opportunities.filter(item => item.trim() !== ''),
      threats: values.threats.filter(item => item.trim() !== '')
    };
    onSubmit(filteredValues);
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Fattori di Successo e Debolezze</h2>
      <p className="form-description">
        Analizza i punti di forza, le debolezze, le opportunità e le minacce per la tua azienda (analisi SWOT).
      </p>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched }) => (
          <Form>
            {/* PUNTI DI FORZA */}
            <div className="swot-section">
              <h3 className="swot-title">Punti di Forza</h3>
              <p className="swot-description">Quali sono i vantaggi distintivi della tua azienda?</p>

              <FieldArray name="strengths">
                {({ push, remove }) => (
                  <div>
                    {values.strengths.map((strength, index) => (
                      <div key={index} className="swot-item-container">
                        <div className="form-group">
                          <label className={`form-label ${index === 0 ? 'required-field' : ''}`}>
                            Punto di forza {index + 1}
                          </label>
                          <Field
                            type="text"
                            name={`strengths.${index}`}
                            className="form-input"
                            placeholder="Es. Prodotto di alta qualità / Team esperto / Tecnologia innovativa"
                          />
                        </div>
                        {index > 0 && (
                          <button
                            type="button"
                            className="remove-button"
                            onClick={() => remove(index)}
                          >
                            Rimuovi
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      className="add-button"
                      onClick={() => push('')}
                    >
                      Aggiungi punto di forza
                    </button>
                    {typeof errors.strengths === 'string' && (
                      <div className="form-error">{errors.strengths}</div>
                    )}
                  </div>
                )}
              </FieldArray>
            </div>

            {/* DEBOLEZZE */}
            <div className="swot-section">
              <h3 className="swot-title">Debolezze</h3>
              <p className="swot-description">Quali fattori potrebbero costituire uno svantaggio?</p>

              <FieldArray name="weaknesses">
                {({ push, remove }) => (
                  <div>
                    {values.weaknesses.map((weakness, index) => (
                      <div key={index} className="swot-item-container">
                        <div className="form-group">
                          <label className={`form-label ${index === 0 ? 'required-field' : ''}`}>
                            Debolezza {index + 1}
                          </label>
                          <Field
                            type="text"
                            name={`weaknesses.${index}`}
                            className="form-input"
                            placeholder="Es. Risorse limitate / Nuovo operatore di mercato / Poca esperienza nel settore"
                          />
                        </div>
                        {index > 0 && (
                          <button
                            type="button"
                            className="remove-button"
                            onClick={() => remove(index)}
                          >
                            Rimuovi
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      className="add-button"
                      onClick={() => push('')}
                    >
                      Aggiungi debolezza
                    </button>
                    {typeof errors.weaknesses === 'string' && (
                      <div className="form-error">{errors.weaknesses}</div>
                    )}
                  </div>
                )}
              </FieldArray>
            </div>

            {/* OPPORTUNITÀ */}
            <div className="swot-section">
              <h3 className="swot-title">Opportunità</h3>
              <p className="swot-description">Quali tendenze o condizioni esterne potrebbero favorire la tua azienda?</p>

              <FieldArray name="opportunities">
                {({ push, remove }) => (
                  <div>
                    {values.opportunities.map((opportunity, index) => (
                      <div key={index} className="swot-item-container">
                        <div className="form-group">
                          <label className={`form-label ${index === 0 ? 'required-field' : ''}`}>
                            Opportunità {index + 1}
                          </label>
                          <Field
                            type="text"
                            name={`opportunities.${index}`}
                            className="form-input"
                            placeholder="Es. Crescente domanda di prodotti sostenibili / Espansione in nuovi mercati"
                          />
                        </div>
                        {index > 0 && (
                          <button
                            type="button"
                            className="remove-button"
                            onClick={() => remove(index)}
                          >
                            Rimuovi
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      className="add-button"
                      onClick={() => push('')}
                    >
                      Aggiungi opportunità
                    </button>
                    {typeof errors.opportunities === 'string' && (
                      <div className="form-error">{errors.opportunities}</div>
                    )}
                  </div>
                )}
              </FieldArray>
            </div>

            {/* MINACCE */}
            <div className="swot-section">
              <h3 className="swot-title">Minacce</h3>
              <p className="swot-description">Quali fattori esterni potrebbero ostacolare il successo della tua azienda?</p>

              <FieldArray name="threats">
                {({ push, remove }) => (
                  <div>
                    {values.threats.map((threat, index) => (
                      <div key={index} className="swot-item-container">
                        <div className="form-group">
                          <label className={`form-label ${index === 0 ? 'required-field' : ''}`}>
                            Minaccia {index + 1}
                          </label>
                          <Field
                            type="text"
                            name={`threats.${index}`}
                            className="form-input"
                            placeholder="Es. Ingresso di grandi competitor / Cambiamenti normativi sfavorevoli"
                          />
                        </div>
                        {index > 0 && (
                          <button
                            type="button"
                            className="remove-button"
                            onClick={() => remove(index)}
                          >
                            Rimuovi
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      className="add-button"
                      onClick={() => push('')}
                    >
                      Aggiungi minaccia
                    </button>
                    {typeof errors.threats === 'string' && (
                      <div className="form-error">{errors.threats}</div>
                    )}
                  </div>
                )}
              </FieldArray>
            </div>

            <div className="form-buttons">
              <button type="button" className="form-button button-secondary" onClick={() => window.history.back()}>
                Indietro
              </button>
              <button type="submit" className="form-button button-primary">
                Avanti
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Form5;