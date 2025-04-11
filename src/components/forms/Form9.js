import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './Forms.css';

const validationSchema = Yup.object().shape({
  marketingChannels: Yup.array()
    .min(1, 'Seleziona almeno un canale di marketing')
    .of(Yup.string()),
  socialMediaPlatforms: Yup.array()
    .when('marketingChannels', {
      is: channels => channels && channels.includes('Social media'),
      then: Yup.array().min(1, 'Seleziona almeno una piattaforma social').of(Yup.string()),
      otherwise: Yup.array().of(Yup.string())
    }),
  otherChannel: Yup.string()
    .when('marketingChannels', {
      is: channels => channels && channels.includes('Altro'),
      then: Yup.string().required('Specifica gli altri canali'),
      otherwise: Yup.string()
    }),
  marketingBudget: Yup.string().required('Il budget di marketing è obbligatorio'),
  pricingStrategy: Yup.string().required('Seleziona una strategia di prezzo'),
  otherPricingStrategy: Yup.string()
    .when('pricingStrategy', {
      is: 'Altro',
      then: Yup.string().required('Specifica la strategia di prezzo'),
      otherwise: Yup.string()
    }),
  mainMarketingActivities: Yup.string().required('Le attività principali sono obbligatorie'),
  customerAcquisitionStrategy: Yup.string().required('La strategia di acquisizione clienti è obbligatoria')
});

const Form9 = ({ initialData, onSubmit }) => {
  const [showSocialMediaOptions, setShowSocialMediaOptions] = useState(
    initialData?.marketingChannels?.includes('Social media') || false
  );
  const [showOtherChannelField, setShowOtherChannelField] = useState(
    initialData?.marketingChannels?.includes('Altro') || false
  );
  const [showOtherPricingField, setShowOtherPricingField] = useState(
    initialData?.pricingStrategy === 'Altro' || false
  );

  const initialValues = {
    marketingChannels: initialData?.marketingChannels || [],
    socialMediaPlatforms: initialData?.socialMediaPlatforms || [],
    otherChannel: initialData?.otherChannel || '',
    marketingBudget: initialData?.marketingBudget || '',
    pricingStrategy: initialData?.pricingStrategy || '',
    otherPricingStrategy: initialData?.otherPricingStrategy || '',
    mainMarketingActivities: initialData?.mainMarketingActivities || '',
    customerAcquisitionStrategy: initialData?.customerAcquisitionStrategy || ''
  };

  const handleSubmit = (values) => {
    onSubmit(values);
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Strategia di Marketing</h2>
      <p className="form-description">
        Definisci come promuoverai la tua azienda e acquisirai clienti.
      </p>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, setFieldValue }) => {
          // Aggiorna i flag quando cambiano i valori corrispondenti
          const handleMarketingChannelsChange = (e) => {
            const { checked, value } = e.target;
            const currentChannels = [...values.marketingChannels];
            
            if (checked) {
              currentChannels.push(value);
            } else {
              const index = currentChannels.indexOf(value);
              if (index > -1) {
                currentChannels.splice(index, 1);
              }
            }
            
            setFieldValue('marketingChannels', currentChannels);
            
            // Aggiorna i flag
            setShowSocialMediaOptions(currentChannels.includes('Social media'));
            setShowOtherChannelField(currentChannels.includes('Altro'));
            
            // Se il canale social media viene deselezionato, pulisci l'array delle piattaforme
            if (!currentChannels.includes('Social media')) {
              setFieldValue('socialMediaPlatforms', []);
            }
            
            // Se il canale "Altro" viene deselezionato, pulisci il campo altro
            if (!currentChannels.includes('Altro')) {
              setFieldValue('otherChannel', '');
            }
          };
          
          const handlePricingStrategyChange = (e) => {
            const { value } = e.target;
            setFieldValue('pricingStrategy', value);
            setShowOtherPricingField(value === 'Altro');
            
            if (value !== 'Altro') {
              setFieldValue('otherPricingStrategy', '');
            }
          };

          return (
            <Form>
              <div className="form-group">
                <label className="form-label required-field">
                  Canali di marketing
                </label>
                <p className="form-subtitle">Seleziona i canali che utilizzerai per promuovere la tua azienda</p>
                <div className="checkbox-group">
                  <div className="checkbox-option">
                    <Field
                      type="checkbox"
                      id="channel-social"
                      name="marketingChannels"
                      value="Social media"
                      onChange={handleMarketingChannelsChange}
                    />
                    <label htmlFor="channel-social" className="checkbox-label">Social media</label>
                  </div>
                  <div className="checkbox-option">
                    <Field
                      type="checkbox"
                      id="channel-email"
                      name="marketingChannels"
                      value="Email marketing"
                      onChange={handleMarketingChannelsChange}
                    />
                    <label htmlFor="channel-email" className="checkbox-label">Email marketing</label>
                  </div>
                  <div className="checkbox-option">
                    <Field
                      type="checkbox"
                      id="channel-content"
                      name="marketingChannels"
                      value="Content marketing"
                      onChange={handleMarketingChannelsChange}
                    />
                    <label htmlFor="channel-content" className="checkbox-label">Content marketing (blog, video)</label>
                  </div>
                  <div className="checkbox-option">
                    <Field
                      type="checkbox"
                      id="channel-online-ads"
                      name="marketingChannels"
                      value="Pubblicità online"
                      onChange={handleMarketingChannelsChange}
                    />
                    <label htmlFor="channel-online-ads" className="checkbox-label">Pubblicità online</label>
                  </div>
                  <div className="checkbox-option">
                    <Field
                      type="checkbox"
                      id="channel-traditional"
                      name="marketingChannels"
                      value="Pubblicità tradizionale"
                      onChange={handleMarketingChannelsChange}
                    />
                    <label htmlFor="channel-traditional" className="checkbox-label">Pubblicità tradizionale (radio, TV, stampa)</label>
                  </div>
                  <div className="checkbox-option">
                    <Field
                      type="checkbox"
                      id="channel-events"
                      name="marketingChannels"
                      value="Eventi e fiere"
                      onChange={handleMarketingChannelsChange}
                    />
                    <label htmlFor="channel-events" className="checkbox-label">Eventi e fiere</label>
                  </div>
                  <div className="checkbox-option">
                    <Field
                      type="checkbox"
                      id="channel-partnerships"
                      name="marketingChannels"
                      value="Partnership e affiliazioni"
                      onChange={handleMarketingChannelsChange}
                    />
                    <label htmlFor="channel-partnerships" className="checkbox-label">Partnership e affiliazioni</label>
                  </div>
                  <div className="checkbox-option">
                    <Field
                      type="checkbox"
                      id="channel-direct"
                      name="marketingChannels"
                      value="Marketing diretto"
                      onChange={handleMarketingChannelsChange}
                    />
                    <label htmlFor="channel-direct" className="checkbox-label">Marketing diretto</label>
                  </div>
                  <div className="checkbox-option">
                    <Field
                      type="checkbox"
                      id="channel-other"
                      name="marketingChannels"
                      value="Altro"
                      onChange={handleMarketingChannelsChange}
                    />
                    <label htmlFor="channel-other" className="checkbox-label">Altro (specificare)</label>
                  </div>
                </div>
                
                {typeof errors.marketingChannels === 'string' && touched.marketingChannels && (
                  <div className="form-error">{errors.marketingChannels}</div>
                )}
                
                {showSocialMediaOptions && (
                  <div className="form-subgroup">
                    <label className="form-label required-field">Piattaforme social media</label>
                    <p className="form-subtitle">Seleziona le piattaforme social che utilizzerai</p>
                    <div className="checkbox-group">
                      <div className="checkbox-option">
                        <Field
                          type="checkbox"
                          id="social-facebook"
                          name="socialMediaPlatforms"
                          value="Facebook"
                        />
                        <label htmlFor="social-facebook" className="checkbox-label">Facebook</label>
                      </div>
                      <div className="checkbox-option">
                        <Field
                          type="checkbox"
                          id="social-instagram"
                          name="socialMediaPlatforms"
                          value="Instagram"
                        />
                        <label htmlFor="social-instagram" className="checkbox-label">Instagram</label>
                      </div>
                      <div className="checkbox-option">
                        <Field
                          type="checkbox"
                          id="social-linkedin"
                          name="socialMediaPlatforms"
                          value="LinkedIn"
                        />
                        <label htmlFor="social-linkedin" className="checkbox-label">LinkedIn</label>
                      </div>
                      <div className="checkbox-option">
                        <Field
                          type="checkbox"
                          id="social-twitter"
                          name="socialMediaPlatforms"
                          value="Twitter/X"
                        />
                        <label htmlFor="social-twitter" className="checkbox-label">Twitter/X</label>
                      </div>
                      <div className="checkbox-option">
                        <Field
                          type="checkbox"
                          id="social-youtube"
                          name="socialMediaPlatforms"
                          value="YouTube"
                        />
                        <label htmlFor="social-youtube" className="checkbox-label">YouTube</label>
                      </div>
                      <div className="checkbox-option">
                        <Field
                          type="checkbox"
                          id="social-tiktok"
                          name="socialMediaPlatforms"
                          value="TikTok"
                        />
                        <label htmlFor="social-tiktok" className="checkbox-label">TikTok</label>
                      </div>
                      <div className="checkbox-option">
                        <Field
                          type="checkbox"
                          id="social-pinterest"
                          name="socialMediaPlatforms"
                          value="Pinterest"
                        />
                        <label htmlFor="social-pinterest" className="checkbox-label">Pinterest</label>
                      </div>
                    </div>
                    
                    {typeof errors.socialMediaPlatforms === 'string' && touched.socialMediaPlatforms && (
                      <div className="form-error">{errors.socialMediaPlatforms}</div>
                    )}
                  </div>
                )}
                
                {showOtherChannelField && (
                  <div className="form-subgroup">
                    <label className="form-label required-field">Specifica gli altri canali</label>
                    <Field
                      type="text"
                      name="otherChannel"
                      className="form-input"
                      placeholder="Es. Marketing tramite influencer, podcast, newsletter"
                    />
                    <ErrorMessage name="otherChannel" component="div" className="form-error" />
                  </div>
                )}
              </div>

              <div className="form-group">
                <label className="form-label required-field">
                  Budget marketing
                </label>
                <Field
                  type="text"
                  name="marketingBudget"
                  className="form-input"
                  placeholder="Es. €10.000 annui o 10% delle vendite"
                />
                <ErrorMessage name="marketingBudget" component="div" className="form-error" />
              </div>

              <div className="form-group">
                <label className="form-label required-field">
                  Strategia di prezzo
                </label>
                <div className="radio-group">
                  <div className="radio-option">
                    <Field
                      type="radio"
                      id="pricing-premium"
                      name="pricingStrategy"
                      value="Premium"
                      onChange={handlePricingStrategyChange}
                    />
                    <label htmlFor="pricing-premium" className="radio-label">
                      Premium (prezzo alto, qualità alta)
                    </label>
                  </div>
                  <div className="radio-option">
                    <Field
                      type="radio"
                      id="pricing-value"
                      name="pricingStrategy"
                      value="Valore"
                      onChange={handlePricingStrategyChange}
                    />
                    <label htmlFor="pricing-value" className="radio-label">
                      Valore (qualità buona a prezzo medio)
                    </label>
                  </div>
                  <div className="radio-option">
                    <Field
                      type="radio"
                      id="pricing-economy"
                      name="pricingStrategy"
                      value="Economy"
                      onChange={handlePricingStrategyChange}
                    />
                    <label htmlFor="pricing-economy" className="radio-label">
                      Economy (prezzo basso)
                    </label>
                  </div>
                  <div className="radio-option">
                    <Field
                      type="radio"
                      id="pricing-freemium"
                      name="pricingStrategy"
                      value="Freemium"
                      onChange={handlePricingStrategyChange}
                    />
                    <label htmlFor="pricing-freemium" className="radio-label">
                      Freemium (base gratuita, funzionalità premium a pagamento)
                    </label>
                  </div>
                  <div className="radio-option">
                    <Field
                      type="radio"
                      id="pricing-subscription"
                      name="pricingStrategy"
                      value="Abbonamento"
                      onChange={handlePricingStrategyChange}
                    />
                    <label htmlFor="pricing-subscription" className="radio-label">
                      Abbonamento
                    </label>
                  </div>
                  <div className="radio-option">
                    <Field
                      type="radio"
                      id="pricing-pay-per-use"
                      name="pricingStrategy"
                      value="Pay-per-use"
                      onChange={handlePricingStrategyChange}
                    />
                    <label htmlFor="pricing-pay-per-use" className="radio-label">
                      Pay-per-use
                    </label>
                  </div>
                  <div className="radio-option">
                    <Field
                      type="radio"
                      id="pricing-other"
                      name="pricingStrategy"
                      value="Altro"
                      onChange={handlePricingStrategyChange}
                    />
                    <label htmlFor="pricing-other" className="radio-label">
                      Altro (specificare)
                    </label>
                  </div>
                </div>
                <ErrorMessage name="pricingStrategy" component="div" className="form-error" />
                
                {showOtherPricingField && (
                  <div className="form-subgroup">
                    <label className="form-label required-field">Specifica la strategia di prezzo</label>
                    <Field
                      type="text"
                      name="otherPricingStrategy"
                      className="form-input"
                      placeholder="Es. Prezzi dinamici, bundle, prezzi stagionali"
                    />
                    <ErrorMessage name="otherPricingStrategy" component="div" className="form-error" />
                  </div>
                )}
              </div>

              <div className="form-group">
                <label className="form-label required-field">
                  Attività di marketing principali
                </label>
                <p className="form-subtitle">
                  Descrivi le principali attività di marketing pianificate per i primi 12 mesi
                </p>
                <Field
                  as="textarea"
                  name="mainMarketingActivities"
                  className="form-textarea"
                  placeholder="Es. Campagne social media mensili, evento di lancio, newsletter settimanale"
                />
                <ErrorMessage name="mainMarketingActivities" component="div" className="form-error" />
              </div>

              <div className="form-group">
                <label className="form-label required-field">
                  Strategia di acquisizione clienti
                </label>
                <p className="form-subtitle">
                  Come prevede di acquisire i primi clienti?
                </p>
                <Field
                  as="textarea"
                  name="customerAcquisitionStrategy"
                  className="form-textarea"
                  placeholder="Es. Offerte di lancio, programma di referral, campagne di lead generation"
                />
                <ErrorMessage name="customerAcquisitionStrategy" component="div" className="form-error" />
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

export default Form9;