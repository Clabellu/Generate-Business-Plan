import React, { useState, useEffect, useMemo } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './Forms.css';

const validationSchema = Yup.object().shape({
  firstYearSales: Yup.number()
    .required('Le vendite previste sono obbligatorie')
    .positive('Le vendite devono essere un numero positivo'),
  annualGrowthRate: Yup.number()
    .required('La crescita annuale è obbligatoria')
    .min(-100, 'La crescita minima è -100%')
    .max(1000, 'La crescita massima è 1000%'),
  breakEvenTime: Yup.string()
    .required('Seleziona il tempo stimato per raggiungere il pareggio'),
  costPercentages: Yup.object().shape({
    costOfGoodsSold: Yup.number().min(0, 'Il valore minimo è 0%').max(100, 'Il valore massimo è 100%'),
    salariesAndBenefits: Yup.number().min(0, 'Il valore minimo è 0%').max(100, 'Il valore massimo è 100%'),
    marketing: Yup.number().min(0, 'Il valore minimo è 0%').max(100, 'Il valore massimo è 100%'),
    rent: Yup.number().min(0, 'Il valore minimo è 0%').max(100, 'Il valore massimo è 100%'),
    generalAndAdmin: Yup.number().min(0, 'Il valore minimo è 0%').max(100, 'Il valore massimo è 100%'),
    depreciation: Yup.number().min(0, 'Il valore minimo è 0%').max(100, 'Il valore massimo è 100%'),
    utilities: Yup.number().min(0, 'Il valore minimo è 0%').max(100, 'Il valore massimo è 100%'),
    otherExpenses: Yup.number().min(0, 'Il valore minimo è 0%').max(100, 'Il valore massimo è 100%'),
    interestExpense: Yup.number().min(0, 'Il valore minimo è 0%').max(100, 'Il valore massimo è 100%'),
    incomeTax: Yup.number().min(0, 'Il valore minimo è 0%').max(100, 'Il valore massimo è 100%')
  })
});

const Form7 = ({ initialData, onSubmit }) => {
  const [costTotals, setCostTotals] = useState({});
  const [totalCostPercentage, setTotalCostPercentage] = useState(0);
  const [profitPercentage, setProfitPercentage] = useState(0);
  const [profitAmount, setProfitAmount] = useState(0);
  const [formData, setFormData] = useState(null);

  // Usa useMemo per evitare ricreazioni non necessarie
  const initialValues = useMemo(() => ({
    firstYearSales: initialData?.firstYearSales || 100000,
    annualGrowthRate: initialData?.annualGrowthRate || 10,
    breakEvenTime: initialData?.breakEvenTime || '1-2 anni',
    costPercentages: initialData?.costPercentages || {
      costOfGoodsSold: 40,
      salariesAndBenefits: 6,
      marketing: 5,
      rent: 0,
      generalAndAdmin: 1,
      depreciation: 2,
      utilities: 0,
      otherExpenses: 1,
      interestExpense: 0,
      incomeTax: 20
    }
  }), [initialData]);

  // Inizializzazione sicura con initialValues nelle dipendenze
  useEffect(() => {
    setFormData(initialValues);
  }, [initialValues]);

  // Calcolo dei costi quando formData cambia
  useEffect(() => {
    if (formData) {
      const newCostTotals = calculateCosts(
        formData.firstYearSales,
        formData.costPercentages
      );
      setCostTotals(newCostTotals);
    }
  }, [formData]);

  const handleSubmit = (values) => {
    // Aggiungi i calcoli finali ai valori inviati
    const submittedValues = {
      ...values,
      calculatedResults: {
        totalCostPercentage,
        profitPercentage,
        profitAmount,
        costTotals
      }
    };
    
    onSubmit(submittedValues);
  };

  const calculateCosts = (sales, percentages) => {
    if (!sales || !percentages) return {};

    const result = {};
    let totalPercentage = 0;

    // Calcola ogni costo individuale
    Object.keys(percentages).forEach(key => {
      const percentage = percentages[key] || 0;
      result[key] = (sales * percentage) / 100;
      totalPercentage += percentage;
    });

    // Calcola il totale e l'utile
    result.total = Object.values(result).reduce((sum, cost) => sum + cost, 0);
    
    setTotalCostPercentage(totalPercentage);
    setProfitPercentage(100 - totalPercentage);
    setProfitAmount(sales - result.total);

    return result;
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Dettagli Finanziari</h2>
      <p className="form-description">
        Fornisci le previsioni finanziarie per la tua attività.
      </p>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        {({ values, setFieldValue }) => {
          // Aggiorna formData quando i valori cambiano, senza usare useEffect
          if (JSON.stringify(formData) !== JSON.stringify(values)) {
            // Utilizziamo setTimeout per evitare l'aggiornamento durante il render
            setTimeout(() => {
              setFormData(values);
            }, 0);
          }

          return (
            <Form>
              <div className="form-group">
                <label className="form-label required-field">
                  1. Vendite previste nel primo anno (€)
                </label>
                <Field
                  type="number"
                  name="firstYearSales"
                  className="form-input"
                  min="0"
                />
                <ErrorMessage name="firstYearSales" component="div" className="form-error" />
              </div>

              <div className="form-group">
                <label className="form-label required-field">
                  2. Quanto prevede di crescere il suo fatturato ogni anno? (%)
                </label>
                <Field
                  type="number"
                  name="annualGrowthRate"
                  className="form-input"
                  min="-100"
                  max="1000"
                />
                <ErrorMessage name="annualGrowthRate" component="div" className="form-error" />
              </div>

              <div className="form-group">
                <label className="form-label required-field">
                  3. Tempo stimato per raggiungere il pareggio (break-even)
                </label>
                <div className="radio-group">
                  <div className="radio-option">
                    <Field
                      type="radio"
                      id="breakEven-1"
                      name="breakEvenTime"
                      value="Meno di 1 anno"
                    />
                    <label htmlFor="breakEven-1" className="radio-label">
                      Meno di 1 anno
                    </label>
                  </div>
                  <div className="radio-option">
                    <Field
                      type="radio"
                      id="breakEven-2"
                      name="breakEvenTime"
                      value="1-2 anni"
                    />
                    <label htmlFor="breakEven-2" className="radio-label">
                      1-2 anni
                    </label>
                  </div>
                  <div className="radio-option">
                    <Field
                      type="radio"
                      id="breakEven-3"
                      name="breakEvenTime"
                      value="2-3 anni"
                    />
                    <label htmlFor="breakEven-3" className="radio-label">
                      2-3 anni
                    </label>
                  </div>
                  <div className="radio-option">
                    <Field
                      type="radio"
                      id="breakEven-4"
                      name="breakEvenTime"
                      value="Più di 3 anni"
                    />
                    <label htmlFor="breakEven-4" className="radio-label">
                      Più di 3 anni
                    </label>
                  </div>
                </div>
                <ErrorMessage name="breakEvenTime" component="div" className="form-error" />
              </div>

              <h3 className="section-subtitle">Dettaglio costi come percentuale delle vendite</h3>

              <div className="costs-table">
                <div className="costs-table-header">
                  <div className="cost-category">Voce di costo</div>
                  <div className="cost-percentage">% delle vendite</div>
                  <div className="cost-total">Costi totali (€)</div>
                </div>

                <div className="costs-row">
                  <div className="cost-category">Costo del venduto</div>
                  <div className="cost-percentage">
                    <Field
                      type="number"
                      name="costPercentages.costOfGoodsSold"
                      className="form-input percentage-input"
                      min="0"
                      max="100"
                    />
                    <span>%</span>
                  </div>
                  <div className="cost-total">
                    {costTotals.costOfGoodsSold ? costTotals.costOfGoodsSold.toLocaleString('it-IT', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    }) : '0.00'}
                  </div>
                </div>

                {/* Il resto della tabella rimane uguale */}
                {/* ...altre righe di costi... */}

                <div className="costs-row total-row">
                  <div className="cost-category"><strong>TOTALE COSTI</strong></div>
                  <div className="cost-percentage"><strong>{totalCostPercentage}%</strong></div>
                  <div className="cost-total">
                    <strong>
                      {costTotals.total ? costTotals.total.toLocaleString('it-IT', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      }) : '0.00'}
                    </strong>
                  </div>
                </div>

                <div className="costs-row profit-row">
                  <div className="cost-category"><strong>UTILE PREVISTO</strong></div>
                  <div className="cost-percentage"><strong>{profitPercentage}%</strong></div>
                  <div className="cost-total">
                    <strong>
                      {profitAmount.toLocaleString('it-IT', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}
                    </strong>
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

export default Form7;