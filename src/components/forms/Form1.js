import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './Forms.css';

const validationSchema = Yup.object().shape({
  companyType: Yup.string().required('Seleziona il tipo di azienda'),
  businessPlanPurpose: Yup.string().required('Seleziona lo scopo del business plan'),
  language: Yup.string().required('Seleziona la lingua'),
  planningPeriod: Yup.string().required('Seleziona il periodo di pianificazione')
});

const Form1 = ({ initialData, onSubmit }) => {
  const initialValues = {
    companyType: initialData?.companyType || '',
    businessPlanPurpose: initialData?.businessPlanPurpose || '',
    language: initialData?.language || 'italiano',
    planningPeriod: initialData?.planningPeriod || '3 anni'
  };

  const handleSubmit = (values) => {
    onSubmit(values);
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Informazioni Preliminari</h2>
      <p className="form-description">
        Iniziamo con alcune informazioni di base per il tuo business plan.
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
                1. Si tratta di un'azienda esistente o in fase di sviluppo?
              </label>
              <div className="radio-group">
                <div className="radio-option">
                  <Field
                    type="radio"
                    id="companyType-existing"
                    name="companyType"
                    value="Azienda esistente"
                  />
                  <label htmlFor="companyType-existing" className="radio-label">
                    Azienda esistente
                  </label>
                </div>
                <div className="radio-option">
                  <Field
                    type="radio"
                    id="companyType-new"
                    name="companyType"
                    value="Azienda da costituire"
                  />
                  <label htmlFor="companyType-new" className="radio-label">
                    Azienda da costituire
                  </label>
                </div>
              </div>
              <ErrorMessage name="companyType" component="div" className="form-error" />
            </div>

            <div className="form-group">
              <label className="form-label required-field">
                2. A cosa servirà questo business plan?
              </label>
              <div className="radio-group">
                <div className="radio-option">
                  <Field
                    type="radio"
                    id="purpose-investors"
                    name="businessPlanPurpose"
                    value="Utilizzare per richiedere fondi agli investitori"
                  />
                  <label htmlFor="purpose-investors" className="radio-label">
                    Utilizzare per richiedere fondi agli investitori
                  </label>
                </div>
                <div className="radio-option">
                  <Field
                    type="radio"
                    id="purpose-banks"
                    name="businessPlanPurpose"
                    value="Utilizzare per richiedere fondi alle banche"
                  />
                  <label htmlFor="purpose-banks" className="radio-label">
                    Utilizzare per richiedere fondi alle banche
                  </label>
                </div>
                <div className="radio-option">
                  <Field
                    type="radio"
                    id="purpose-grants"
                    name="businessPlanPurpose"
                    value="Utilizzare per richiedere fondi attraverso bandi"
                  />
                  <label htmlFor="purpose-grants" className="radio-label">
                    Utilizzare per richiedere fondi attraverso bandi
                  </label>
                </div>
                <div className="radio-option">
                  <Field
                    type="radio"
                    id="purpose-internal"
                    name="businessPlanPurpose"
                    value="Pianificazione interna"
                  />
                  <label htmlFor="purpose-internal" className="radio-label">
                    Pianificazione interna
                  </label>
                </div>
              </div>
              <ErrorMessage name="businessPlanPurpose" component="div" className="form-error" />
            </div>

            <div className="form-group">
              <label className="form-label required-field">3. Lingua</label>
              <Field as="select" name="language" className="form-select">
                <option value="">Seleziona una lingua</option>
                <option value="italiano">Italiano</option>
                <option value="inglese">Inglese</option>
                <option value="francese">Francese</option>
                <option value="spagnolo">Spagnolo</option>
                <option value="tedesco">Tedesco</option>
              </Field>
              <ErrorMessage name="language" component="div" className="form-error" />
            </div>

            <div className="form-group">
              <label className="form-label required-field">
                4. Per quale periodo di tempo vuoi pianificare?
              </label>
              <div className="radio-group">
                <div className="radio-option">
                  <Field
                    type="radio"
                    id="period-1"
                    name="planningPeriod"
                    value="1 anno"
                  />
                  <label htmlFor="period-1" className="radio-label">
                    1 anno
                  </label>
                </div>
                <div className="radio-option">
                  <Field
                    type="radio"
                    id="period-3"
                    name="planningPeriod"
                    value="3 anni"
                  />
                  <label htmlFor="period-3" className="radio-label">
                    3 anni
                  </label>
                </div>
                <div className="radio-option">
                  <Field
                    type="radio"
                    id="period-5"
                    name="planningPeriod"
                    value="5 anni"
                  />
                  <label htmlFor="period-5" className="radio-label">
                    5 anni
                  </label>
                </div>
              </div>
              <ErrorMessage name="planningPeriod" component="div" className="form-error" />
            </div>

            <div className="form-buttons">
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

export default Form1;