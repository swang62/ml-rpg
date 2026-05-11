import type { Component } from "solid-js";

const LessonModelInterpretabilityImplementationPatternsFromPrototypingToProductionGovernance: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Implementation Patterns: From Prototyping to Production Governance
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Prototyping Phase
            </p>
            <p style="margin-top: 0">
              Start with library defaults. Use{" "}
              <code style="padding: 2px 6px; border-radius: 3px; font-family: monospace">
                shap.Explainer(model)
              </code>{" "}
              or LIME with standard settings. Generate explanations for a
              sample. Visualize to validate: if random noise features rank
              highly, debug before proceeding. Goal: confirm the approach works
              for your model and data. Typical time: 1-2 days.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Production Integration
            </p>
            <p style="margin-top: 0">
              Build explanation service separate from prediction. API: given
              prediction ID, return cached explanation or compute on-demand.
              Storage: JSON with feature names, values, importances. Indexed by
              prediction ID and timestamp. Set 90-day retention for regulated
              domains. Add circuit breakers: if explanation fails, log error but
              do not fail the prediction request.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Governance and Audit
            </p>
            <p style="margin-top: 0">
              <strong>Model cards:</strong> Document explanation method,
              limitations, and failure modes. <strong>Versioning:</strong> Store
              model version with each explanation since they change with model
              updates. <strong>Audit log:</strong> Record who accessed which
              explanations. <strong>Human review:</strong> Periodically sample
              explanations for domain expert validation.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              User-Facing Explanations
            </p>
            <p style="margin-top: 0">
              Raw SHAP values are not user-friendly. Translate: "income: -0.3"
              becomes "Your income of ,000 is below the typical approved range."
              Use templates with thresholds. Top-3 features only. Users prefer
              contrastive explanations: "if income were K instead of K, approval
              would increase 15%."
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Key Insight:</strong> Technical explanations are for
              engineers and auditors. User explanations need translation into
              actionable, natural language.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 540px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px; display: block; margin-bottom: 6px">
                    Feature Vector (shared)
                  </strong>
                  <div style="font-size: 11px">
                    Serialized Arrow/Parquet → Model + Explainer
                    <br />
                    Ensures no feature divergence
                  </div>
                </div>
                <div style="display: flex; gap: 10px">
                  <div style="flex: 1; border: 2px solid; padding: 10px; border-radius: 6px">
                    <strong style="font-size: 12px; display: block; margin-bottom: 6px">
                      SHAP Config
                    </strong>
                    <div style="font-size: 11px">
                      <strong>Background:</strong> 500-2000 stratified samples
                      <br />
                      <strong>Refresh:</strong> Monthly or 5% PSI drift
                      <br />
                      <strong>Trees:</strong> 100 trees, depth 6<br />
                      <strong>Latency:</strong> 2-5ms per instance
                    </div>
                  </div>
                  <div style="flex: 1; border: 2px solid; padding: 10px; border-radius: 6px">
                    <strong style="font-size: 12px; display: block; margin-bottom: 6px">
                      Serving Infrastructure
                    </strong>
                    <div style="font-size: 11px">
                      <strong>Throughput:</strong> 1,000 rps (10% traffic)
                      <br />
                      <strong>Provision:</strong> 20-50 vCPU + 30% headroom
                      <br />
                      <strong>Cache:</strong> 24hr at edge
                      <br />
                      <strong>Rate limit:</strong> 10/user/hour
                    </div>
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 12px; display: block; margin-bottom: 6px">
                    Governance &amp; Storage
                  </strong>
                  <div style="font-size: 11px">
                    <strong>Versioning:</strong> model_version +
                    feature_manifest + background_id + config
                    <br />
                    <strong>Quality checks:</strong> Stability (top 5 features
                    &lt;20% change), sign consistency, protected attribute
                    coverage
                    <br />
                    <strong>Monitoring:</strong> Attribution drift (7 day
                    rolling window), top feature distribution shift &gt;10%
                    triggers alert
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 12px">Circuit Breaker</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Fallback to precomputed top K if p95 latency exceeds budget
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
                  Start with library defaults, validate top features make sense
                  before production
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Separate explanation service: cache results, handle failures
                  gracefully
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Store model version with each explanation for audit when
                  models update
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  90-day retention for regulated domains with access logging
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Translate SHAP to natural language: contrastive explanations
                  (if X were Y, result changes Z%)
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
                  User preference: contrastive format ("if X were Y, probability
                  increases Z%")
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Governance: model cards document method, limitations, failure
                  modes
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonModelInterpretabilityImplementationPatternsFromPrototypingToProductionGovernance;
