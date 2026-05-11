import type { Component } from "solid-js";

const LessonModelMonitoringObservabilityDetectingModelDriftDataConceptAndSemanticShifts: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Detecting Model Drift: Data, Concept, and Semantic Shifts
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Three Types of Drift
            </p>
            <p style="margin-top: 0">
              Drift is the degradation of model behavior when live data
              distributions, input output mappings, or external context change
              over time. It manifests in three layers. Data drift occurs when
              feature distributions shift, detected via PSI, KL divergence, or
              KS tests on features and embeddings. A PSI greater than 0.2 to 0.3
              warrants investigation, while PSI greater than 0.4 signals high
              risk. Concept drift means the underlying input output relationship
              changes, even if input distributions stay stable. Semantic drift
              in LLMs includes style shifts, refusal rate changes,
              hallucinations, or compliance failures, often triggered by vendor
              model updates.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Layered Detection Approach
            </p>
            <p style="margin-top: 0">
              Production drift detection uses a layered approach combining
              statistical signals, model side signals, semantic alignment
              checks, and product metrics. Monitor perplexity or loss on a fixed
              versioned evaluation set; rising values beyond a control band
              indicate model or data drift. For LLMs, track embedding similarity
              between outputs and retrieved sources to measure groundedness.
              Product metrics like CTR, CSAT, deflection rates, and re-ask rates
              provide business level signals.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Sensitivity vs Alert Fatigue
            </p>
            <p style="margin-top: 0">
              Low PSI thresholds catch issues early but page teams on benign
              seasonal shifts. Use multi window detectors that compare short
              term windows (1 day) to medium term baselines (7 to 14 days) and
              long term seasonal patterns (same weekday last month). Composite
              triggers requiring both statistical drift (PSI greater than 0.3)
              and quality degradation (perplexity up 10 percent) reduce noise.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Silent Drift Failures
            </p>
            <p style="margin-top: 0">
              Stale retrieval indexes or null inflation in feature pipelines
              create groundedness loss; the LLM fills in gaps with
              hallucinations that pass validation but fail fact checking. Vendor
              model updates change tokenization, refusal policies, or decoding
              defaults, causing cost or style shifts that break downstream user
              experience. Over aggressive log sampling removes the tail events
              needed to debug drift.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 540px">
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px">
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px">Data Drift</strong>
                  <div style="margin-top: 6px; font-size: 12px">
                    PSI/KL/KS on features
                    <br />
                    PSI &gt;0.2: investigate
                    <br />
                    PSI &gt;0.4: high risk
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px">Concept Drift</strong>
                  <div style="margin-top: 6px; font-size: 12px">
                    Perplexity/loss rising
                    <br />
                    on fixed eval set
                    <br />
                    beyond control band
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px">Semantic Drift</strong>
                  <div style="margin-top: 6px; font-size: 12px">
                    Embedding similarity
                    <br />
                    Groundedness score
                    <br />
                    Hallucination rate
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px">Product Drift</strong>
                  <div style="margin-top: 6px; font-size: 12px">
                    CTR/CSAT drop
                    <br />
                    Deflection rate change
                    <br />
                    Re-ask rate spike
                  </div>
                </div>
              </div>
              <div style="margin-top: 12px; padding: 10px; border: 2px solid; border-radius: 6px; text-align: center; font-size: 12px">
                <strong>Composite Trigger:</strong> PSI &gt;0.3 AND perplexity
                +10% AND CTR drop &gt;5%
              </div>
            </div>
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Data drift detected via PSI (Population Stability Index), KL
                  divergence, or KS tests: PSI greater than 0.2 to 0.3 warrants
                  investigation, PSI greater than 0.4 signals high risk
                  requiring immediate action
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Concept drift manifests as rising perplexity or loss on a
                  fixed versioned evaluation set, indicating the input output
                  mapping has changed even if feature distributions remain
                  stable
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Semantic drift in LLMs includes style shifts, refusal rate
                  changes, and hallucination spikes, often caused by vendor
                  model updates that alter tokenization or decoding defaults
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Layered detection combines statistical signals (PSI, KL),
                  model signals (perplexity), semantic checks (embedding
                  similarity, groundedness), and product metrics (CTR, CSAT,
                  deflection rate) to reduce false positives
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Use multi window detectors with seasonality aware baselines:
                  compare 1 day short term to 7 to 14 day medium term and same
                  weekday last month to filter benign seasonal shifts and reduce
                  alert fatigue
                </span>
              </div>
            </div>
          </div>
          <div class="Learn_examplesSection p-4 mb-4">
            <div class="Learn_examplesHeader mb-3 pb-3">📌 Interview Tips</div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">1</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Airbnb pricing model: PSI monitoring on booking features
                  flagged 0.35 PSI spike during holiday season, combined with
                  stable conversion rate indicated seasonal shift not model
                  failure
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Uber ETA prediction: null inflation in traffic feature
                  pipeline caused 15 percent accuracy drop, detected via rising
                  Mean Absolute Error (MAE) before PSI triggered, requiring
                  feature schema validation
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Meta content moderation: vendor LLM update changed refusal
                  rate from 2 percent to 8 percent, caught by shadow deployment
                  showing style shift before full rollout, requiring prompt
                  template adjustment
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">4</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Netflix recommendation: embedding similarity between generated
                  descriptions and source metadata dropped from 0.82 to 0.68
                  after index refresh, signaling stale retrieval causing
                  hallucinations
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonModelMonitoringObservabilityDetectingModelDriftDataConceptAndSemanticShifts;
