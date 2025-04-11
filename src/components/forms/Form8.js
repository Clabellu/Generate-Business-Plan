import React from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import './Forms.css';

const competitorSchema = Yup.object().shape({
  name: Yup.string().when('includeCompetitor', {
    is: true,
    then: Yup.string().required('Il nome del concorrente è obbligatorio')
  }),
  strengths: Yup.string().when('includeCompetitor', {
    is: true,
    then: Yup.string().required('I punti di forza sono obbligatori')
  }),
  weaknesses: Yup.string().when('includeCompetitor', {
    is: true,
    then: Yup.string().required('I punti di debolezza sono obbligatori')
  }),
  marketShare: Yup.number().when('includeCompetitor', {
    is: true,
    then: Yup.number()
      .nullable()
      .transform((v, o) => o === '' ? null : v)
      .min(0, 'La quota deve essere maggiore o uguale a 0')
      .max(100, 'La quota deve essere minore o uguale a 100')
  }),
  includeCompetitor: Yup.boolean()
});

const validationSchema = Yup.object().shape({
  competitors: Yup.array().of(competitorSchema)
    .test(
      'at-least-one-competitor',
      'Devi includere almeno un concorrente',
      (competitors) => competitors && competitors.some(competitor => competitor.includeCompetitor)
    ),
  competitiveAdvantage: Yup.string().required('Il vantaggio competitivo è obbligatorio')
});

const initialCompetitorTemplate = {
  name: '',
  strengths: '',
  weaknesses: '',
  marketShare: '',
  includeCompetitor: false
};

const Form8 = ({ initialData, onSubmit }) => {
  const initialValues = {
    competitors: initialData?.competitors || [
      { ...initialCompetitorTemplate, includeCompetitor: true },
      { ...initialCompetitorTemplate },
      { ...initialCompetitorTemplate }
    ],
    competitiveAdvantage: initialData?.competitiveAdvantage || ''
  };

  const handleSubmit = (values) => {
    // Filtriamo i concorrenti non inclusi
    const filteredValues = {
      ...values,
      competitors: values.competitors.filter(competitor => competitor.includeCompetitor)
    };
    onSubmit(filteredValues);
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Analisi Concorrenza</h2>
      <p className="form-description">
        Identifica i principali concorrenti e il tuo vantaggio competitivo.
      </p>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched }) => (
          <Form>
            <FieldArray name="competitors">
              {({ push, remove }) => (
                <div>
                  {values.competitors && values.competitors.length > 0 ? (
                    values.competitors.map((competitor, index) => (
                      <div key={index} className="competitor-section">
                        <div className="competitor-header">
                          <h3>Concorrente {index + 1}</h3>
                          <div className="competitor-toggle">
                            <Field
                              type="checkbox"
                              name={`competitors.${index}.includeCompetitor`}
                              id={`includeCompetitor-${index}`}
                            />
                            <label htmlFor={`includeCompetitor-${index}`}>
                              {values.competitors[index].includeCompetitor ? 'Concorrente attivo' : 'Attiva questo concorrente'}
                            </label>
                          </div>
                        </div>

                        {values.competitors[index].includeCompetitor && (
                          <div className="competitor-details">
                            <div className="form-group">
                              <label className="form-label required-field">
                                Nome del concorrente
                              </label>
                              <Field
                                type="text"
                                name={`competitors.${index}.name`}
                                className="form-input"
                                placeholder="Es. Azienda XYZ"
                              />
                              <ErrorMessage
                                name={`competitors.${index}.name`}
                                component="div"
                                className="form-error"
                              />
                            </div>

                            <div className="form-group">
                              <label className="form-label required-field">
                                Punti di forza
                              </label>
                              <Field
                                as="textarea"
                                name={`competitors.${index}.strengths`}
                                className="form-textarea"
                                placeholder="Es. Forte presenza sul mercato, qualità del prodotto, brand riconosciuto"
                              />
                              <ErrorMessage
                                name={`competitors.${index}.strengths`}
                                component="div"
                                className="form-error"
                              />
                            </div>

                            <div className="form-group">
                              <label className="form-label required-field">
                                Punti di debolezza
                              </label>
                              <Field
                                as="textarea"
                                name={`competitors.${index}.weaknesses`}
                                className="form-textarea"
                                placeholder="Es. Prezzi elevati, scarso servizio clienti, lentezza nell'innovazione"
                              />
                              <ErrorMessage
                                name={`competitors.${index}.weaknesses`}
                                component="div"
                                className="form-error"
                              />
                            </div>

                            <div className="form-group">
                              <label className="form-label">
                                Quota di mercato stimata (%)
                              </label>
                              <Field
                                type="number"
                                name={`competitors.${index}.marketShare`}
                                className="form-input"
                                placeholder="Es. 25"
                                min="0"
                                max="100"
                              />
                              <p className="form-hint">Opzionale</p>
                              <ErrorMessage
                                name={`competitors.${index}.marketShare`}
                                component="div"
                                className="form-error"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div>Nessun concorrente aggiunto</div>
                  )}

                  {values.competitors.length < 5 && (
                    <button
                      type="button"
                      className="add-button"
                      onClick={() => push({ ...initialCompetitorTemplate })}
                    >
                      Aggiungi un altro concorrente
                    </button>
                  )}

                  {typeof errors.competitors === 'string' && (
                    <div className="form-error">{errors.competitors}</div>
                  )}
                </div>
              )}
            </FieldArray>

            <div className="form-group">
              <label className="form-label required-field">
                Vantaggio competitivo
              </label>
              <p className="form-subtitle">
                Cosa distingue la vostra azienda dai concorrenti?
              </p>
              <Field
                as="textarea"
                name="competitiveAdvantage"
                className="form-textarea"
                placeholder="Es. tecnologia proprietaria, prezzo più competitivo, servizio clienti superiore, esperienza nel settore"
              />
              <ErrorMessage name="competitiveAdvantage" component="div" className="form-error" />
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

export default Form8;