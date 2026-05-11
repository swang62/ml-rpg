import type { Component } from "solid-js";

const LessonModelGovernanceGovernanceTradeOffsAndFailureModesInProduction: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Governance Trade-offs and Failure Modes in Production
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
                Governance involves trade-offs between{" "}
                <strong>control vs velocity</strong>,{" "}
                <strong>cost vs completeness</strong>, and{" "}
                <strong>privacy vs reproducibility</strong>. Understanding these
                tensions prevents compliance failures.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              LATENCY VS AUDIT DEPTH
            </p>
            <p style="margin-top: 0">
              Synchronous logging of rich metadata adds 5-15ms per request. At
              25K RPS, this is prohibitive. <strong>Solution:</strong> Async
              journals with minimal metadata (&lt;5ms p99), generate
              explanations on-demand.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              COST VS COMPLETENESS
            </p>
            <p style="margin-top: 0">
              At 10K RPS with 1KB logs, 864GB/day accumulates. 7 years online =
              2.2PB. <strong>Solution:</strong> Tiered storage (30 days hot, 7
              years cold). Trade-off: cold queries take minutes. Sampling
              low-risk at 10-20% reduces cost but creates forensic gaps.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Insight:</strong> A rare fraud pattern might be missed
              if it falls in unsampled traffic. For high-stakes decisions, log
              everything; sample only low-risk.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              PRIVACY VS REPRODUCIBILITY
            </p>
            <p style="margin-top: 0">
              Full feature snapshots enable reproduction but expose PII. Hashing
              + time-travel protects privacy but fails if data is purged.
              Differential privacy helps but may lose 2-5% AUC.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              COMMON FAILURE MODES
            </p>
            <p style="margin-top: 0">
              <strong>Missing lineage:</strong> Unsigned datasets break
              reproduction. <strong>Shadow deploys:</strong> Teams bypass
              registry. <strong>Clock skew:</strong> Timestamp misalignment.{" "}
              <strong>RL drift:</strong> Continuous updates bypass reviews.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Trade-off:</strong> No single configuration works for
              all. Tune governance depth by risk—stricter for
              lending/healthcare, lighter for recommendations.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 540px">
              <div style="display: flex; flex-direction: column; gap: 9px">
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Trade-off: Latency vs Audit Depth
                  </strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Sync logging: +15ms, full features | Async journal: +5ms,
                    feature hashes
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Trade-off: Cost vs Completeness
                  </strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Full logs 7yr hot: 2.2 PB | Tiered storage: 1 PB, cold
                    query: minutes
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Trade-off: Privacy vs Reproducibility
                  </strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Raw features: GDPR violation | Hashes + time travel:
                    complex, fails if store purged
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Failure Mode: Missing Lineage
                  </strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Unmaterialized dataset → late arriving rows → silent
                    reproduction errors
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Failure Mode: Clock Skew
                  </strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Request at 10:00:05, feature store snapshot at 10:00:03 →
                    stale features
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
                  Synchronous rich logging adds 5 to 15 milliseconds per
                  request, production systems use asynchronous journals with p99
                  enqueue under 5 milliseconds and defer detailed explanations
                  to batch or on demand to meet 50 millisecond Service Level
                  Objectives (SLOs)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  At 10,000 Requests Per Second (RPS), 7 years of full fidelity
                  logs require 2.2 petabytes, tiered storage (30 days hot,
                  remainder cold compressed) cuts this to under 1 petabyte but
                  increases query time from seconds to minutes for historical
                  investigations
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Privacy versus reproducibility dilemma: logging raw features
                  enables perfect reproduction but violates General Data
                  Protection Regulation (GDPR), hashing with feature store time
                  travel protects Personally Identifiable Information (PII) but
                  reproduction fails if store is purged by retention policies or
                  right to be forgotten
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Differential privacy with epsilon equals 1.0 can degrade fraud
                  model Area Under the Curve (AUC) by 2 to 5 percent, creating a
                  utility cost for privacy guarantees that must be balanced
                  against regulatory requirements
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Missing lineage from unmaterialized datasets causes silent
                  reproduction errors when late arriving data or schema changes
                  alter row membership, mitigation requires signed immutable
                  snapshots with cryptographic checksums
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Online learning and Reinforcement Learning (RL) systems
                  updating continuously can drift into noncompliance between
                  reviews, requiring parameter change guardrails, update rate
                  limits, and canary buffers that hold changes for manual review
                  before full deployment
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
                  Bank fraud model uses async journals with feature Hashed
                  Message Authentication Code (HMAC), adds only 5 milliseconds
                  to p99 latency, detailed Shapley Additive exPlanations (SHAP)
                  values generated in batch overnight for regulator access
                  within 24 hours, meeting both latency and audit requirements
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  E commerce recommendation system samples 20 percent of low
                  risk product suggestions (less than $50 value), logs 100
                  percent of high value recommendations (greater than $50),
                  reduces storage from 1.5 terabytes per day to 400 gigabytes
                  while maintaining full auditability for financially
                  significant decisions
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Right to be forgotten request deletes user records from
                  feature store at T plus 30 days per policy, reproduction for
                  decisions before T plus 30 works (features still available),
                  after T plus 30 reproduction fails (feature store purged),
                  system retains prediction outputs and aggregate statistics but
                  loses ability to regenerate exact intermediate states
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonModelGovernanceGovernanceTradeOffsAndFailureModesInProduction;
