import type { Component } from "solid-js";

const LessonModelGovernanceWhatIsModelGovernanceInMlSystems: Component = () => (
  <div class="lesson-content">
    <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
      <div class="mb-4 p-4">
        <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
          What is Model Governance in ML Systems?
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
              <strong>Model governance</strong> is the framework of policies,
              processes, and technical controls ensuring ML systems remain
              compliant, accountable, and auditable—covering regulations (GDPR,
              CCPA, HIPAA) and traceability so any prediction can be reproduced
              and explained.
            </div>
          </div>
          <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            TECHNICAL REQUIREMENTS
          </p>
          <p style="margin-top: 0">
            Every artifact (model, dataset, feature definition) must be
            versioned and immutable. Every change requires documented approval
            and audit log entry. Every runtime decision traces back to specific
            model build, dataset snapshot, and exact feature values.
          </p>
          <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
            <strong>💡 Example:</strong> Fraud detection at 25K predictions/sec
            must capture request ID, model version, dataset fingerprint, feature
            hash, and decision explanation without violating latency SLOs.
          </div>
          <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            REGULATORY STAKES
          </p>
          <p style="margin-top: 0">
            GDPR: fines up to 4% of annual global turnover. EU AI Act introduces
            risk classifications requiring documentation for high-risk systems.
            Financial Model Risk Management guidance requires seven-year
            retention of decision records.
          </p>
          <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            MODEL CARDS
          </p>
          <p style="margin-top: 0">
            Standardized documentation of intended use, evaluation metrics,
            limitations, and ethical considerations. Major organizations now
            require responsible AI reviews and model cards for sensitive use
            cases before deployment.
          </p>
          <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            BALANCING CONTROL AND VELOCITY
          </p>
          <p style="margin-top: 0">
            Patterns: immutable artifact registries, approval workflows with
            separation of duties (trainer cannot deploy), append-only audit
            logs, continuous monitoring for accuracy drift, data distribution
            shifts (PSI), and bias across protected groups.
          </p>
          <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
            <strong>⚠️ Goal:</strong> Every prediction traceable, every change
            approved, compliance checks continuous not episodic.
          </div>
        </div>
        <div
          class="card-diagram"
          style="margin-bottom: 24px; display: flex; justify-content: center"
        >
          <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
            <div style="display: flex; flex-direction: column; gap: 10px">
              <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center">
                <strong style="font-size: 13px">Data Collection</strong>
                <div style="font-size: 11px; margin-top: 4px">
                  GDPR consent, purpose tags, lineage tracking
                </div>
              </div>
              <div style="font-size: 20px; font-weight: bold; text-align: center">
                ↓
              </div>
              <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center">
                <strong style="font-size: 13px">Model Training</strong>
                <div style="font-size: 11px; margin-top: 4px">
                  Immutable datasets, experiment tracking, fairness gates
                </div>
              </div>
              <div style="font-size: 20px; font-weight: bold; text-align: center">
                ↓
              </div>
              <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center">
                <strong style="font-size: 13px">Deployment</strong>
                <div style="font-size: 11px; margin-top: 4px">
                  Two person approval, security scan, change ticket
                </div>
              </div>
              <div style="font-size: 20px; font-weight: bold; text-align: center">
                ↓
              </div>
              <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center">
                <strong style="font-size: 13px">Runtime Predictions</strong>
                <div style="font-size: 11px; margin-top: 4px">
                  Prediction journal: request ID, model version, feature hashes
                </div>
              </div>
              <div style="font-size: 20px; font-weight: bold; text-align: center">
                ↓
              </div>
              <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center">
                <strong style="font-size: 13px">Continuous Monitoring</strong>
                <div style="font-size: 11px; margin-top: 4px">
                  Drift detection (PSI &lt; 0.2), bias metrics, audit logs (7
                  years)
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="Learn_keyTakeaways p-4 mb-4">
          <div class="Learn_keyTakeawaysHeader mb-3 pb-3">💡 Key Takeaways</div>
          <div class="d-flex flex-column gap-2">
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Compliance with regulations like GDPR (4% revenue fines), CCPA,
                HIPAA, and EU AI Act requires data privacy controls, fairness
                evaluations, and documented model risk management throughout the
                ML lifecycle
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Auditability demands complete traceability where every
                prediction can be reproduced using the exact model version,
                dataset snapshot, and feature values from decision time, even at
                high throughput like 25,000 requests per second
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Technical implementation uses immutable artifact registries with
                cryptographic hashes, approval workflows with separation of
                duties (trainer cannot deploy), and append only audit logs that
                cannot be tampered with
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Production systems balance governance with performance by using
                asynchronous prediction journals that log metadata (request ID,
                model version, feature hashes) with p99 enqueue latency under 5
                milliseconds to meet overall 50 millisecond SLOs
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Model cards standardized by Google and required by Microsoft
                document intended use, limitations, evaluation metrics, and
                subgroup performance before any deployment to production
                environments
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Continuous monitoring tracks data drift using Population
                Stability Index (PSI) with alerts when PSI exceeds 0.2 for three
                consecutive windows, and bias metrics across protected groups to
                detect harmful changes between formal reviews
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
                Bank fraud detection at 25,000 predictions per second logs each
                decision to append only storage, accumulating 1.7 TB per day
                (800 bytes per log), kept hot for 30 days and archived for 7
                years to satisfy SR 11 to 7 audit requirements
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">2</span>
              <span class="flex-grow-1 Learn_cardContent">
                Microsoft Responsible AI process requires formal reviews for
                sensitive use cases, model cards with documented limitations and
                fairness metrics, and security scanning before any high risk
                model moves to production
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">3</span>
              <span class="flex-grow-1 Learn_cardContent">
                Amazon enforces separation of duties where the data scientist
                who trains a model cannot directly deploy it, requiring approval
                from a separate release engineer and a formal change ticket for
                audit trails
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default LessonModelGovernanceWhatIsModelGovernanceInMlSystems;
