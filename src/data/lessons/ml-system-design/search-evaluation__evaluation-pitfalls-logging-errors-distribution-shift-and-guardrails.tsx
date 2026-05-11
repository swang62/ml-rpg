import type { Component } from "solid-js";

const LessonSearchEvaluationEvaluationPitfallsLoggingErrorsDistributionShiftAndGuardrails: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Evaluation Pitfalls: Logging Errors, Distribution Shift, and
            Guardrails
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="padding: 14px 16px; border: 2px solid; border-left: 4px solid; border-radius: 6px; margin: 0">
              <div style="font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px">
                Key Insight
              </div>
              <div style="font-size: 15px; line-height: 1.5">
                Evaluation fails silently when logging is broken, distributions
                shift, or guardrails are missing. These pitfalls corrupt metrics
                without obvious errors.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Logging Bugs That Corrupt Metrics
            </p>
            <p style="margin-top: 0">
              Metrics depend on accurate logging. Common bugs: duplicate events
              (inflating impressions or clicks), missing events (mobile app
              fails to log), timestamp misalignment (click logged before
              impression), and sampling errors (1% sample is not
              representative). A logging bug that doubles impressions cuts your
              measured CTR in half. You think ranking got worse; actually
              logging broke.
            </p>
            <p>
              Always validate logging: compare client-side and server-side
              counts, check for duplicates, verify timestamps are ordered
              correctly. Run sanity checks: does total click count roughly match
              revenue? Do impression counts match load balancer traffic?
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Distribution Shift
            </p>
            <p style="margin-top: 0">
              Models are trained on past data but serve future traffic. If the
              distribution shifts, metrics become unreliable. Seasonal shifts
              (holiday shopping vs normal), population shifts (new user
              demographics), and query shifts (trending topics) all change what
              good rankings look like.
            </p>
            <p>
              A model trained on desktop users may fail on mobile. A model
              trained on US users may fail in new markets. Monitor segment-level
              metrics, not just aggregates. A flat overall CTR might hide a 20%
              drop in mobile offset by 10% gain in desktop.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Guardrail Metrics
            </p>
            <p style="margin-top: 0">
              Primary metrics (NDCG, CTR) tell you if ranking improved.
              Guardrail metrics catch unintended harm: revenue per session,
              diversity of results shown, coverage of catalog, latency
              percentiles. A model that improves CTR 3% but crashes revenue 10%
              should not ship. Define guardrails before experiments and never
              violate them for metric gains.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Rule:</strong> Before trusting any metric movement, ask:
              is logging correct? Has distribution shifted? Are guardrails
              passing?
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
                  Logging bugs corrupt metrics silently: duplicates inflate
                  impressions, missing events hide clicks, timestamps misalign.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Validate logging: compare client/server counts, check for
                  duplicates, sanity-check against revenue/traffic.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Distribution shift makes past data unreliable: seasonal,
                  demographic, and query patterns change.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Monitor segment-level metrics. Flat aggregates can hide 20%
                  drop in one segment offset by gains elsewhere.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Guardrails (revenue, diversity, latency) catch unintended
                  harm. Never violate for primary metric gains.
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
                  Give logging bug example: duplicated impressions cut measured
                  CTR in half. Looks like ranking regressed; actually logging
                  broke.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Explain distribution shift with segments: desktop gains
                  masking mobile losses in flat aggregate.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Describe guardrails: CTR +3% but revenue -10% should not ship.
                  Define guardrails before experiments.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonSearchEvaluationEvaluationPitfallsLoggingErrorsDistributionShiftAndGuardrails;
