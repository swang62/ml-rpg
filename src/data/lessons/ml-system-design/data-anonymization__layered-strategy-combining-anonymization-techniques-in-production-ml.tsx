import type { Component } from "solid-js";

const LessonDataAnonymizationLayeredStrategyCombiningAnonymizationTechniquesInProductionMl: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Layered Strategy: Combining Anonymization Techniques in Production
            ML
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="padding: 14px 16px; border: 2px solid; border-left: 4px solid; border-radius: 6px; margin: 0">
              <div style="font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px">
                Definition
              </div>
              <div style="font-size: 15px; line-height: 1.5">
                A <strong>layered anonymization strategy</strong> combines
                multiple techniques—PII removal, k-anonymity, differential
                privacy—at different pipeline stages for defense-in-depth.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              LAYER 1: DATA INGESTION
            </p>
            <p style="margin-top: 0">
              Remove direct identifiers immediately at collection. Strip names,
              emails, SSNs before data enters the pipeline. Use tokenization for
              fields needing longitudinal tracking. This prevents accidental PII
              exposure in logs, caches, or intermediate storage.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              LAYER 2: FEATURE ENGINEERING
            </p>
            <p style="margin-top: 0">
              Apply k-anonymity to quasi-identifiers before feature computation.
              Generalize zip codes to regions, ages to ranges. For
              high-cardinality categoricals, apply suppression or grouping to
              ensure minimum group sizes.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Key Insight:</strong> Derived features can leak more
              than raw data. Aggregations like "average transaction value" are
              safer than individual values. Feature design must consider privacy
              implications.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              LAYER 3: MODEL TRAINING
            </p>
            <p style="margin-top: 0">
              For sensitive applications, add differential privacy using DP-SGD
              (gradient clipping + noise). Prevents model from memorizing
              training examples. Set epsilon based on sensitivity: ε=1-3 for
              healthcare, ε=5-10 for behavioral data.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              LAYER 4: MODEL OUTPUT
            </p>
            <p style="margin-top: 0">
              Apply output perturbation for aggregate queries. Cap prediction
              confidence to prevent high-certainty outputs that leak
              information. Monitor for memorization through carefully crafted
              test queries.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Key Trade-off:</strong> Each layer adds privacy but
              compounds utility loss. A system with 5% loss per layer sees ~20%
              total loss. Balance layers based on threat model.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 580px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                  <strong>Ingestion: Pseudonymization</strong>
                  <div style="font-size: 12px; margin-top: 6px">
                    Token vault | 50K ops/sec | 60 day rotation
                    <br />
                    Internal linkage enabled
                  </div>
                </div>
                <div style="font-size: 18px; text-align: center; font-weight: bold">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                  <strong>Feature Store &amp; Training: K-Anonymity</strong>
                  <div style="font-size: 12px; margin-top: 6px">
                    k=5 internal | k=20 external | l-diversity for sensitive
                    attrs
                    <br />5 to 15 min microbatches
                  </div>
                </div>
                <div style="font-size: 18px; text-align: center; font-weight: bold">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                  <strong>Published Metrics: Differential Privacy</strong>
                  <div style="font-size: 12px; margin-top: 6px">
                    ε=1 to 8 per metric | Per user daily budget ε=10
                    <br />
                    Noise calibrated to sensitivity
                  </div>
                </div>
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
                  Layered approach: PII removal at ingestion, k-anonymity in
                  features, differential privacy in training
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Each layer compounds utility loss—balance based on threat
                  model
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Derived features can leak more than raw data; feature design
                  must consider privacy
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
                  Remove identifiers at ingestion, apply k-anonymity before
                  features, add DP during training if needed
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Set epsilon based on sensitivity: 1-3 for healthcare, 5-10 for
                  behavioral data
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonDataAnonymizationLayeredStrategyCombiningAnonymizationTechniquesInProductionMl;
