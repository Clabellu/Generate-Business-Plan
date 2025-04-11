import React from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import './Forms.css';

const validationSchema = Yup.object().shape({
  clients: Yup.array().of(
    Yup.object().shape({
      description: Yup.string().when('includeClient', {
        is: true,
        then: Yup.string().required('La descrizione del cliente è obbligatoria')
      }),
      incomeLevel: Yup.string().when('includeClient', {
        is: true,
        then: Yup.string().required('Seleziona un livello di reddito')
      }),
      needsSolved: Yup.string().when('includeClient', {
        is: true,
        then: Yup.string().required('Questo campo è obbligatorio')
      }),
      includeClient: Yup.boolean()
    })
  ).test(
    'at-least-one-client',
    'Devi includere almeno un tipo di cliente',
    (clients) => clients && clients.some(client => client.includeClient)
  )
});

const initialClientTemplate = {
  description: '',
  incomeLevel: '',
  needsSolved: '',
  includeClient: false
};

const Form3 = ({ initialData, onSubmit }) => {
  const initialValues = {
    clients: initialData?.clients || [
      { ...initialClientTemplate, includeClient: true },
      { ...initialClientTemplate },
      { ...initialClientTemplate }
    ]
  };

  const handleSubmit = (values) => {
    // Filtriamo i clienti non inclusi prima di inviare
    const filteredValues = {
      ...values,
      clients: values.clients.filter(client => client.includeClient)
    };
    onSubmit(filteredValues);
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Dettagli Clienti</h2>
      <p className="form-description">
        Descrivi i tipi di clienti che la tua azienda serve o intende servire.
      </p>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched }) => (
          <Form>
            <FieldArray name="clients">
              {({ push, remove }) => (
                <div>
                  {values.clients && values.clients.length > 0 ? (
                    values.clients.map((client, index) => (
                      <div key={index} className="client-section">
                        <div className="client-header">
                          <h3>Cliente {index + 1}</h3>
                          <div className="client-toggle">
                            <Field
                              type="checkbox"
                              name={`clients.${index}.includeClient`}
                              id={`includeClient-${index}`}
                            />
                            <label htmlFor={`includeClient-${index}`}>
                              {values.clients[index].includeClient ? 'Cliente attivo' : 'Attiva questo cliente'}
                            </label>
                          </div>
                        </div>

                        {values.clients[index].includeClient && (
                          <div className="client-details">
                            <div className="form-group">
                              <label className="form-label required-field">
                                Descrizione del cliente
                              </label>
                              <Field
                                as="textarea"
                                name={`clients.${index}.description`}
                                className="form-textarea"
                                placeholder="Es. Piccole e medie imprese nel settore tecnologico"
                              />
                              <ErrorMessage
                                name={`clients.${index}.description`}
                                component="div"
                                className="form-error"
                              />
                            </div>

                            <div className="form-group">
                              <label className="form-label required-field">
                                Livello di reddito
                              </label>
                              <Field
                                as="select"
                                name={`clients.${index}.incomeLevel`}
                                className="form-select"
                              >
                                <option value="">Seleziona un livello</option>
                                <option value="Basso reddito">Basso reddito</option>
                                <option value="Medio reddito">Medio reddito</option>
                                <option value="Alto reddito">Alto reddito</option>
                              </Field>
                              <ErrorMessage
                                name={`clients.${index}.incomeLevel`}
                                component="div"
                                className="form-error"
                              />
                            </div>

                            <div className="form-group">
                              <label className="form-label required-field">
                                Quali esigenze o problemi risolve il vostro prodotto/servizio per questo cliente?
                              </label>
                              <Field
                                as="textarea"
                                name={`clients.${index}.needsSolved`}
                                className="form-textarea"
                                placeholder="Es. Il nostro prodotto consente alle PMI di automatizzare i processi amministrativi, riducendo i costi e gli errori"
                              />
                              <ErrorMessage
                                name={`clients.${index}.needsSolved`}
                                component="div"
                                className="form-error"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div>Nessun cliente aggiunto</div>
                  )}

                  {values.clients.length < 5 && (
                    <button
                      type="button"
                      className="add-button"
                      onClick={() => push({ ...initialClientTemplate })}
                    >
                      Aggiungi un altro cliente
                    </button>
                  )}

                  {typeof errors.clients === 'string' && (
                    <div className="form-error">{errors.clients}</div>
                  )}
                </div>
              )}
            </FieldArray>

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

export default Form3;