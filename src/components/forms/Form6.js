import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import './Forms.css';

const investmentItemSchema = Yup.object().shape({
  description: Yup.string().when('amount', {
    is: amount => amount && amount.trim() !== '',
    then: Yup.string().required('La descrizione è obbligatoria quando l\'importo è specificato')
  }),
  amount: Yup.string().matches(/^\d+(\.\d{1,2})?$/, {
    message: 'Inserisci un importo valido (es. 1000 o 1000.50)',
    excludeEmptyString: true
  })
});

const validationSchema = Yup.object().shape({
  currency: Yup.string().required('Seleziona una valuta'),
  investmentItems: Yup.array().of(investmentItemSchema)
});

const Form6 = ({ initialData, onSubmit }) => {
  const [totalInvestment, setTotalInvestment] = useState(0);
  const [formValues, setFormValues] = useState(null);

  const initialValues = {
    currency: initialData?.currency || 'EUR',
    investmentItems: initialData?.investmentItems || [
      { description: '', amount: '' },
      { description: '', amount: '' },
      { description: '', amount: '' }
    ]
  };

  // Questo useEffect è al livello del componente Form6, non in un callback
  useEffect(() => {
    if (formValues) {
      const newTotal = calculateTotal(formValues.investmentItems);
      setTotalInvestment(newTotal);
    }
  }, [formValues]);

  const handleSubmit = (values) => {
    // Filtriamo gli item vuoti
    const filteredItems = values.investmentItems.filter(
      item => item.description.trim() !== '' && item.amount.trim() !== ''
    );
    
    const submittedValues = {
      ...values,
      investmentItems: filteredItems,
      totalInvestment
    };
    
    onSubmit(submittedValues);
  };

  const calculateTotal = (investmentItems) => {
    return investmentItems.reduce((total, item) => {
      const amount = item.amount ? parseFloat(item.amount) : 0;
      return total + (isNaN(amount) ? 0 : amount);
    }, 0);
  };

  const getCurrencySymbol = (currencyCode) => {
    switch (currencyCode) {
      case 'EUR':
        return '€';
      case 'USD':
        return '$';
      case 'GBP':
        return '£';
      default:
        return currencyCode;
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Dettagli Investimenti</h2>
      <p className="form-description">
        Indica gli investimenti necessari per avviare o sviluppare la tua attività.
      </p>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, setFieldValue }) => {
          // Aggiorniamo lo stato quando cambiano i valori, ma senza useEffect
          // Questo è un modo sicuro per aggiornare lo state basato sui valori di Formik
          if (JSON.stringify(formValues) !== JSON.stringify(values)) {
            // Utilizziamo setTimeout per evitare l'aggiornamento durante il render
            setTimeout(() => {
              setFormValues(values);
            }, 0);
          }

          return (
            <Form>
              <div className="form-group">
                <label className="form-label required-field">
                  Scegliere la valuta
                </label>
                <Field as="select" name="currency" className="form-select">
                  <option value="EUR">Euro (€)</option>
                  <option value="USD">Dollaro USA ($)</option>
                  <option value="GBP">Sterlina (£)</option>
                </Field>
                <ErrorMessage name="currency" component="div" className="form-error" />
              </div>

              <h3 className="section-subtitle">Per cosa verrà speso il vostro investimento iniziale?</h3>

              <div className="investment-table">
                <div className="investment-table-header">
                  <div className="investment-description">Oggetto dell'investimento</div>
                  <div className="investment-amount">Importo dell'investimento</div>
                  <div className="investment-actions"></div>
                </div>

                <FieldArray name="investmentItems">
                  {({ push, remove }) => (
                    <>
                      {values.investmentItems.map((item, index) => (
                        <div key={index} className="investment-row">
                          <div className="investment-description">
                            <Field
                              type="text"
                              name={`investmentItems.${index}.description`}
                              placeholder="Es. Attrezzature e macchinari"
                              className="form-input"
                            />
                            <ErrorMessage
                              name={`investmentItems.${index}.description`}
                              component="div"
                              className="form-error"
                            />
                          </div>
                          <div className="investment-amount">
                            <div className="amount-input-container">
                              <span className="currency-symbol">{getCurrencySymbol(values.currency)}</span>
                              <Field
                                type="text"
                                name={`investmentItems.${index}.amount`}
                                placeholder="0.00"
                                className="form-input amount-input"
                              />
                            </div>
                            <ErrorMessage
                              name={`investmentItems.${index}.amount`}
                              component="div"
                              className="form-error"
                            />
                          </div>
                          <div className="investment-actions">
                            {index > 0 && (
                              <button
                                type="button"
                                onClick={() => remove(index)}
                                className="remove-button"
                              >
                                Rimuovi
                              </button>
                            )}
                          </div>
                        </div>
                      ))}

                      <button
                        type="button"
                        onClick={() => push({ description: '', amount: '' })}
                        className="add-button"
                      >
                        Aggiungi voce d'investimento
                      </button>
                    </>
                  )}
                </FieldArray>

                <div className="investment-total">
                  <div className="total-label">Investimento iniziale:</div>
                  <div className="total-amount">
                    {getCurrencySymbol(values.currency)}{totalInvestment.toLocaleString('it-IT', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })}
                  </div>
                </div>
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
          );
        }}
      </Formik>
    </div>
  );
};

export default Form6;