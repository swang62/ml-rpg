import type { Component } from "solid-js";

const LessonModelMonitoringObservabilityContinuousEvaluationAndSafeRolloutForLlms: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Continuous Evaluation and Safe Rollout for LLMs
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Why Continuous Evaluation Matters
            </p>
            <p style="margin-top: 0">
              LLMs are probabilistic and nondeterministic, making continuous
              evaluation and controlled rollouts essential. You cannot set and
              forget. Production teams maintain golden datasets segmented by
              scenario: short question answer, multi turn conversation, safety
              edge cases, domain specific tasks. These datasets run nightly in
              CI pipelines and after every model, prompt template, or provider
              change. Evaluation combines automated LLM as a judge scoring with
              periodic human review on sampled outputs.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Shadow and Canary Deployments
            </p>
            <p style="margin-top: 0">
              Shadow mode routes 1 to 10 percent of live traffic to the new
              model without serving results to users, logging outputs for
              offline comparison. This detects silent failures like refusal rate
              spikes, verbosity changes, or hallucination increases that only
              surface with real traffic diversity. Canary rollouts gradually
              shift 1 percent, 5 percent, 10 percent of traffic to the new
              model, with automatic rollback triggered when: p95 latency exceeds
              2 seconds, refusal rate increases more than 2 percentage points,
              groundedness score drops below 0.75, or cost per request rises
              more than 30 percent.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Vendor Model Update Risks
            </p>
            <p style="margin-top: 0">
              When a provider ships version x plus 1, teams observe semantic
              style shifts, changed refusal rates, tokenization differences
              causing context overflow, or cost changes from longer default
              outputs. The mitigation is pinning model versions explicitly in
              production, recording decoding parameters (temperature, top k, top
              p) with each trace, and running A/B tests with matched prompts
              before promoting. Gate promotion on equal or better latency, cost,
              refusal rate, and groundedness at p95.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Observability Blind Spots
            </p>
            <p style="margin-top: 0">
              Over aggressive log sampling (1 percent sampling) removes the
              exact tail events needed to debug rare hallucinations or prompt
              injection attempts. High cardinality labels explode metrics
              storage, forcing teams to drop dimensions and hide cohort specific
              regressions. Security blind spots emerge when input output
              classification is missing; toxic or PII outputs slip through.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 540px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">Shadow: 1–10% traffic</strong>
                  <div style="margin-top: 4px; font-size: 12px">
                    Log outputs, no user impact
                    <br />
                    Detect refusal/hallucination spikes
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">Canary: 1% → 5% → 10%</strong>
                  <div style="margin-top: 4px; font-size: 12px">
                    Gradual rollout with metrics
                    <br />
                    Auto rollback on threshold breach
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">Full Rollout</strong>
                  <div style="margin-top: 4px; font-size: 12px">
                    100% traffic after validation
                    <br />
                    Pin model version + params
                  </div>
                </div>
              </div>
              <div style="margin-top: 12px; padding: 10px; border: 2px solid; border-radius: 6px; font-size: 12px">
                <strong>Rollback Triggers:</strong>
                <br />
                p95 latency &gt;2s OR refusal rate +2pp OR groundedness &lt;0.75
                OR cost per request +30%
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
                  Maintain golden datasets by scenario (short question answer,
                  multi turn, safety) and run nightly in CI plus after every
                  model or prompt change, combining LLM as a judge with periodic
                  human review
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Shadow deployments on 1 to 10 percent of traffic detect silent
                  failures (refusal spikes, verbosity changes, hallucinations)
                  without user impact before canary rollout begins
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Canary rollouts gradually shift 1 percent, 5 percent, 10
                  percent of traffic with automatic rollback when p95 latency
                  exceeds 2 seconds, refusal rate increases more than 2
                  percentage points, groundedness drops below 0.75, or cost
                  rises more than 30 percent
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Pin model versions explicitly and record decoding parameters
                  (temperature, top k, top p) with each trace; vendor updates
                  often cause semantic style shifts, refusal changes, or cost
                  blowouts requiring A/B validation
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Over aggressive log sampling (1 percent) removes tail events
                  needed to debug rare hallucinations; high cardinality labels
                  force dropping dimensions and hide cohort specific regressions
                  like non English prompt degradation
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
                  Meta content moderation: vendor LLM update changed refusal
                  rate from 2 percent to 8 percent, caught by shadow deployment
                  with A/B comparison before full rollout prevented user facing
                  failures
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Netflix recommendation descriptions: shadow mode on 5 percent
                  traffic detected 15 percent hallucination rate increase from
                  stale retrieval index, triggered rollback and index refresh
                  before canary
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Uber customer support: pinned model version with temperature
                  equals 0.7 and top p equals 0.9 in production config, new
                  provider default temperature equals 1.0 caused verbose
                  responses costing 40 percent more tokens until config override
                  deployed
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">4</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Airbnb search assistant: canary rollout to 10 percent
                  triggered automatic rollback when p95 latency spiked from 1.8
                  seconds to 3.2 seconds due to longer context in new prompt
                  template, reverted within 5 minutes
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonModelMonitoringObservabilityContinuousEvaluationAndSafeRolloutForLlms;
