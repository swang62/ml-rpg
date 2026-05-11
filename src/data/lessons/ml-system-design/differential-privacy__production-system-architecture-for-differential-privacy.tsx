import type { Component } from "solid-js";

const LessonDifferentialPrivacyProductionSystemArchitectureForDifferentialPrivacy: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Production System Architecture for Differential Privacy
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>DP System Architecture:</strong> Production differential
              privacy requires infrastructure for privacy budget tracking, noise
              calibration, query validation, and audit logging. A single
              misconfigured query can exhaust the entire privacy budget or leak
              raw data.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Privacy Budget Manager
            </p>
            <p>
              The central component tracking cumulative epsilon spent across all
              queries. Each query specifies its epsilon cost; the manager
              deducts from the budget and rejects queries that would exceed
              limits. Implementation: maintain per-dataset budget counters, log
              every query with timestamp and epsilon cost, alert when budget
              approaches threshold (e.g., 80% consumed). Budget decisions are
              policy choices: annual budget reset, per-user budgets, or lifetime
              budgets. The manager enforces whatever policy is configured.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Query Validation Layer
            </p>
            <p>
              Before executing any query, validate it satisfies DP constraints.
              Check: sensitivity is bounded (query cannot return unbounded
              values), noise mechanism matches query type (Laplace for counts,
              Gaussian for vectors), epsilon is within allowed range for this
              query type. Reject malformed queries before they touch data. This
              layer prevents accidental privacy violations from analyst errors.
              Common pattern: provide a limited query API with pre-approved
              query templates rather than arbitrary SQL access.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Noise Generation Service
            </p>
            <p>
              Centralized service for generating cryptographically secure random
              noise. Requirements: use cryptographic RNG (not pseudo-random),
              generate noise with correct distribution (Laplace, Gaussian),
              scale noise to query sensitivity and epsilon. Never reuse noise
              across queries—each query needs fresh randomness. Audit trail: log
              noise parameters (not values) for each query to enable privacy
              accounting verification.
            </p>
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Defense in Depth:</strong> Multiple layers prevent privacy
              breaches: query validation catches malformed requests, budget
              manager blocks excessive queries, audit logs enable post-hoc
              investigation. No single component failure should leak raw data.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">
                    Ingest &amp; Identity Linking
                  </strong>
                  <div style="font-size: 11px; margin-top: 3px">
                    1B events/day, 10M users
                  </div>
                </div>
                <div style="font-size: 18px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">Contribution Bounding</strong>
                  <div style="font-size: 11px; margin-top: 3px">
                    Cap: 1 count/partition/day per user
                  </div>
                </div>
                <div style="font-size: 18px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">Pre Aggregation</strong>
                  <div style="font-size: 11px; margin-top: 3px">
                    Group to counts, sums, histograms
                  </div>
                </div>
                <div style="font-size: 18px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">Privacy Transform</strong>
                  <div style="font-size: 11px; margin-top: 3px">
                    Add noise, log to ledger, ε=1 per metric
                  </div>
                </div>
                <div style="font-size: 18px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">Release &amp; Hygiene</strong>
                  <div style="font-size: 11px; margin-top: 3px">
                    Threshold, round, consistency checks
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
                  Budget manager tracks cumulative epsilon and rejects queries
                  exceeding limits
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Query validation layer rejects malformed queries before
                  touching data
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Use cryptographic RNG for noise, never reuse noise across
                  queries
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
                  Alert when 80% of privacy budget consumed
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Pre-approved query templates safer than arbitrary SQL access
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonDifferentialPrivacyProductionSystemArchitectureForDifferentialPrivacy;
