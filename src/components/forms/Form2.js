import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './Forms.css';

const validationSchema = Yup.object().shape({
  companyName: Yup.string().required('Il nome dell\'azienda è obbligatorio'),
  companyDescription: Yup.string().required('La descrizione dell\'azienda è obbligatoria'),
  numberOfEmployees: Yup.number()
    .required('Il numero di dipendenti è obbligatorio')
    .integer('Inserisci un numero intero')
    .min(0, 'Il numero deve essere maggiore o uguale a 0'),
  offeringType: Yup.string().required('Seleziona almeno un\'opzione'),
  deliveryMethod: Yup.string().required('Seleziona almeno un\'opzione'),
  serviceArea: Yup.string().required('Indica dove servite i vostri clienti'),
  missionStatement: Yup.string(),
  foundingYear: Yup.number()
    .nullable()
    .transform((v, o) => o === '' ? null : v)
    .integer('Inserisci un anno valido')
    .min(1900, 'L\'anno deve essere maggiore o uguale a 1900')
    .max(new Date().getFullYear() + 10, `L'anno deve essere minore o uguale a ${new Date().getFullYear() + 10}`)
});

const Form2 = ({ initialData, onSubmit }) => {
  const initialValues = {
    companyName: initialData?.companyName || '',
    companyDescription: initialData?.companyDescription || '',
    numberOfEmployees: initialData?.numberOfEmployees || '',
    offeringType: initialData?.offeringType || '',
    deliveryMethod: initialData?.deliveryMethod || '',
    serviceArea: initialData?.serviceArea || '',
    missionStatement: initialData?.missionStatement || '',
    foundingYear: initialData?.foundingYear || ''
  };

  const handleSubmit = (values) => {
    onSubmit(values);
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Informazioni Aziendali</h2>
      <p className="form-description">
        Fornisci informazioni dettagliate sulla tua azienda.
      </p>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="form-group">
              <label className="form-label required-field">
                1. Nome dell'azienda
              </label>
              <Field
                type="text"
                name="companyName"
                className="form-input"
                placeholder="Es. Innovatech S.r.l."
              />
              <ErrorMessage name="companyName" component="div" className="form-error" />
            </div>

            <div className="form-group">
              <label className="form-label required-field">
                2. Descrizione dell'azienda
              </label>
              <Field
                as="textarea"
                name="companyDescription"
                className="form-textarea"
                placeholder="Es. Hotel di lusso a 5 stelle / Ristorante di cucina mediterranea / Negozio d'abbigliamento specializzato in moda sostenibile"
              />
              <ErrorMessage name="companyDescription" component="div" className="form-error" />
            </div>

            <div className="form-group">
              <label className="form-label required-field">
                3. Numero di dipendenti
              </label>
              <Field
                type="number"
                name="numberOfEmployees"
                className="form-input"
                min="0"
              />
              <ErrorMessage name="numberOfEmployees" component="div" className="form-error" />
            </div>

            <div className="form-group">
              <label className="form-label required-field">
                4. Offrite un prodotto o un servizio?
              </label>
              <div className="radio-group">
                <div className="radio-option">
                  <Field
                    type="radio"
                    id="offeringType-product"
                    name="offeringType"
                    value="Prodotto"
                  />
                  <label htmlFor="offeringType-product" className="radio-label">
                    Prodotto
                  </label>
                </div>
                <div className="radio-option">
                  <Field
                    type="radio"
                    id="offeringType-service"
                    name="offeringType"
                    value="Servizio"
                  />
                  <label htmlFor="offeringType-service" className="radio-label">
                    Servizio
                  </label>
                </div>
                <div className="radio-option">
                  <Field
                    type="radio"
                    id="offeringType-both"
                    name="offeringType"
                    value="Entrambi"
                  />
                  <label htmlFor="offeringType-both" className="radio-label">
                    Entrambi
                  </label>
                </div>
              </div>
              <ErrorMessage name="offeringType" component="div" className="form-error" />
            </div>

            <div className="form-group">
              <label className="form-label required-field">
                5. Come può il cliente ricevere il vostro prodotto o servizio?
              </label>
              <div className="radio-group">
                <div className="radio-option">
                  <Field
                    type="radio"
                    id="deliveryMethod-online"
                    name="deliveryMethod"
                    value="Online"
                  />
                  <label htmlFor="deliveryMethod-online" className="radio-label">
                    Online
                  </label>
                </div>
                <div className="radio-option">
                  <Field
                    type="radio"
                    id="deliveryMethod-physical"
                    name="deliveryMethod"
                    value="Posizione fisica"
                  />
                  <label htmlFor="deliveryMethod-physical" className="radio-label">
                    Posizione fisica
                  </label>
                </div>
                <div className="radio-option">
                  <Field
                    type="radio"
                    id="deliveryMethod-both"
                    name="deliveryMethod"
                    value="Sia online che in sede fisica"
                  />
                  <label htmlFor="deliveryMethod-both" className="radio-label">
                    Sia online che in sede fisica
                  </label>
                </div>
              </div>
              <ErrorMessage name="deliveryMethod" component="div" className="form-error" />
            </div>

            <div className="form-group">
              <label className="form-label required-field">
                6. Dove servite i vostri clienti?
              </label>
              <Field
                type="text"
                name="serviceArea"
                className="form-input"
                placeholder="Es. Milano, Italia / Europa e Nord America / Globalmente"
              />
              <ErrorMessage name="serviceArea" component="div" className="form-error" />
            </div>

            <div className="form-group">
              <label className="form-label">
                7. Qual è la missione della vostra azienda?
              </label>
              <Field
                as="textarea"
                name="missionStatement"
                className="form-textarea"
                placeholder="Es. Offrire soluzioni tecnologiche innovative che migliorino la produttività delle piccole imprese"
              />
              <p className="form-hint">Opzionale</p>
              <ErrorMessage name="missionStatement" component="div" className="form-error" />
            </div>

            <div className="form-group">
              <label className="form-label">
                8. Anno di fondazione o data prevista di avvio
              </label>
              <Field
                type="number"
                name="foundingYear"
                className="form-input"
                placeholder="Es. 2023"
                min="1900"
                max={new Date().getFullYear() + 10}
              />
              <p className="form-hint">Opzionale</p>
              <ErrorMessage name="foundingYear" component="div" className="form-error" />
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

export default Form2;