import type { Component } from "solid-js";

const LessonModelMonitoringObservabilityCostAndSecurityTelemetryForProductionMl: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Cost and Security Telemetry for Production ML
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Cost Observability
            </p>
            <p style="margin-top: 0">
              Cost and security observability are often afterthoughts but become
              critical at scale. For LLMs, track tokens in, tokens out, context
              length, generation length, and per request cost. Alert on cost
              anomalies when tokens per request increases more than 30 percent
              over baseline, as this often signals prompt template changes,
              context bloat, or abuse. Monitor cost per 1000 requests daily,
              comparing to weekly moving average to catch gradual cost drift
              before monthly bills spike. A sudden jump from 200 to 300 tokens
              per request can double infrastructure spend if undetected.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Security Telemetry
            </p>
            <p style="margin-top: 0">
              Monitor refusal rate, toxicity rate, PII leakage rate, and prompt
              injection attempts per 1000 requests. Baseline refusal rate might
              be 1 to 3 percent for a well tuned system; a spike to 8 to 10
              percent indicates either a vendor model update increasing false
              positives or an attack pattern (jailbreak attempts). Toxicity and
              PII detection require input and output classification, with alerts
              triggered when rates exceed thresholds (toxicity greater than 0.5
              percent, PII leakage greater than 0.1 percent).
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Abuse Detection
            </p>
            <p style="margin-top: 0">
              DDoS or scraping spikes show up as sudden QPS increases (from 1000
              to 10000 QPS) with abnormal distribution of user agents or source
              IP addresses. These spikes cause cascading latency violations and
              cost blowouts if not caught early. Monitor QPS per user identifier
              or IP prefix, alert when any single cohort exceeds 10x baseline,
              and enforce per user rate limits with exponential backoff.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Sampling and Cardinality Failures
            </p>
            <p style="margin-top: 0">
              Over aggressive log sampling (1 percent) misses rare but high
              impact events like PII leakage in long tail prompts or
              sophisticated prompt injection attempts. High cardinality labels
              (per user, per prompt template) explode metrics storage costs,
              forcing teams to drop dimensions and lose visibility into cohort
              specific abuse or cost patterns. The solution is stratified
              sampling that over samples rare events (errors, refusals, long
              generations) and uses approximate cardinality techniques
              (HyperLogLog) to track high cardinality dimensions.
            </p>
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Track tokens in, tokens out, context length, generation
                  length, and per request cost; alert when tokens per request
                  increases more than 30 percent over baseline to catch prompt
                  bloat or abuse before monthly bills spike
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Monitor refusal rate (baseline 1 to 3 percent), toxicity rate
                  (threshold greater than 0.5 percent), PII leakage (threshold
                  greater than 0.1 percent), and prompt injection attempts per
                  1000 requests with input and output classification
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Abuse patterns (DDoS, scraping) manifest as sudden QPS spikes
                  from 1000 to 10000 QPS with abnormal user agent or IP
                  distribution, causing cascading latency violations and cost
                  blowouts
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Enforce per user or IP prefix rate limits, alert when any
                  single cohort exceeds 10× baseline QPS, use adaptive rate
                  limiting that tightens during abuse and loosens during normal
                  traffic
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Use stratified sampling to over sample rare events (errors,
                  refusals, long generations) and approximate cardinality
                  techniques (HyperLogLog) to track high cardinality dimensions
                  without full enumeration avoiding metrics explosion
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
                  Uber customer support: tokens per request jumped from 180 to
                  420 after prompt template change added verbose examples,
                  caught by 30 percent cost anomaly alert, reverted within 2
                  hours saving $15K per day
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Airbnb search assistant: refusal rate spiked from 2 percent to
                  9 percent after vendor model update, detected within 1 hour
                  via continuous monitoring, prompted rollback and prompt
                  template tuning
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Netflix recommendation: DDoS attack increased QPS from 2000 to
                  25000 per second, per IP rate limiting kicked in at 10×
                  baseline, blocked 98 percent of attack traffic while
                  maintaining service for legitimate users
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">4</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Meta content moderation: PII leakage in 0.08 percent of
                  outputs detected via output classification, triggered alert at
                  0.1 percent threshold, investigation found edge case in
                  anonymization logic fixed within 4 hours
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonModelMonitoringObservabilityCostAndSecurityTelemetryForProductionMl;
