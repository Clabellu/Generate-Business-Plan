import React from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import './Forms.css';

const productValidationSchema = Yup.object().shape({
  name: Yup.string().when('includeProduct', {
    is: true,
    then: Yup.string().required('Il nome del prodotto o servizio è obbligatorio')
  }),
  description: Yup.string().when('includeProduct', {
    is: true,
    then: Yup.string().required('La descrizione è obbligatoria')
  }),
  price: Yup.string().when('includeProduct', {
    is: true,
    then: Yup.string().required('Il prezzo o fascia di prezzo è obbligatorio')
  }),
  developmentPhase: Yup.string().when('includeProduct', {
    is: true,
    then: Yup.string().required('Seleziona la fase di sviluppo')
  }),
  includeProduct: Yup.boolean()
});

const validationSchema = Yup.object().shape({
  products: Yup.array().of(productValidationSchema)
    .test(
      'at-least-one-product',
      'Devi includere almeno un prodotto o servizio',
      (products) => products && products.some(product => product.includeProduct)
    )
});

const initialProductTemplate = {
  name: '',
  description: '',
  price: '',
  developmentPhase: '',
  includeProduct: false
};

const Form4 = ({ initialData, onSubmit }) => {
  const initialValues = {
    products: initialData?.products || [
      { ...initialProductTemplate, includeProduct: true },
      { ...initialProductTemplate },
      { ...initialProductTemplate },
      { ...initialProductTemplate },
      { ...initialProductTemplate }
    ]
  };

  const handleSubmit = (values) => {
    // Filtriamo i prodotti non inclusi prima di inviare
    const filteredValues = {
      ...values,
      products: values.products.filter(product => product.includeProduct)
    };
    onSubmit(filteredValues);
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Dettagli Prodotto</h2>
      <p className="form-description">
        Descrivi i prodotti o servizi che la tua azienda offre o intende offrire.
      </p>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched }) => (
          <Form>
            <FieldArray name="products">
              {({ push, remove }) => (
                <div>
                  {values.products && values.products.length > 0 ? (
                    values.products.map((product, index) => (
                      <div key={index} className="product-section">
                        <div className="product-header">
                          <h3>Prodotto o servizio {index + 1}</h3>
                          <div className="product-toggle">
                            <Field
                              type="checkbox"
                              name={`products.${index}.includeProduct`}
                              id={`includeProduct-${index}`}
                            />
                            <label htmlFor={`includeProduct-${index}`}>
                              {values.products[index].includeProduct ? 'Prodotto attivo' : 'Attiva questo prodotto'}
                            </label>
                          </div>
                        </div>

                        {values.products[index].includeProduct && (
                          <div className="product-details">
                            <div className="form-group">
                              <label className="form-label required-field">
                                Nome del prodotto o servizio
                              </label>
                              <Field
                                type="text"
                                name={`products.${index}.name`}
                                className="form-input"
                                placeholder="Es. Software di gestione contabile"
                              />
                              <ErrorMessage
                                name={`products.${index}.name`}
                                component="div"
                                className="form-error"
                              />
                            </div>

                            <div className="form-group">
                              <label className="form-label required-field">
                                Descrizione del prodotto o servizio
                              </label>
                              <Field
                                as="textarea"
                                name={`products.${index}.description`}
                                className="form-textarea"
                                placeholder="Es. Software che automatizza la gestione contabile per le piccole imprese"
                              />
                              <ErrorMessage
                                name={`products.${index}.description`}
                                component="div"
                                className="form-error"
                              />
                            </div>

                            <div className="form-group">
                              <label className="form-label required-field">
                                Prezzo o fascia di prezzo
                              </label>
                              <Field
                                type="text"
                                name={`products.${index}.price`}
                                className="form-input"
                                placeholder="Es. €99/mese o €25.000-35.000"
                              />
                              <ErrorMessage
                                name={`products.${index}.price`}
                                component="div"
                                className="form-error"
                              />
                            </div>

                            <div className="form-group">
                              <label className="form-label required-field">
                                Fase di sviluppo
                              </label>
                              <Field
                                as="select"
                                name={`products.${index}.developmentPhase`}
                                className="form-select"
                              >
                                <option value="">Seleziona una fase</option>
                                <option value="Idea/Concept">Idea/Concept</option>
                                <option value="Prototipo/Sviluppo">Prototipo/Sviluppo</option>
                                <option value="Pronto per il mercato">Pronto per il mercato</option>
                                <option value="Già in vendita">Già in vendita</option>
                              </Field>
                              <ErrorMessage
                                name={`products.${index}.developmentPhase`}
                                component="div"
                                className="form-error"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div>Nessun prodotto aggiunto</div>
                  )}

                  {values.products.length < 10 && (
                    <button
                      type="button"
                      className="add-button"
                      onClick={() => push({ ...initialProductTemplate })}
                    >
                      Aggiungi un altro prodotto/servizio
                    </button>
                  )}

                  {typeof errors.products === 'string' && (
                    <div className="form-error">{errors.products}</div>
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

export default Form4;