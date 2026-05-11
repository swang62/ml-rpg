import type { Component } from "solid-js";

const LessonInterleavingExperimentsInterleavingVsAbTestingTradeOffs: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Interleaving vs A/B Testing Trade-offs
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 0; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              WHAT INTERLEAVING GIVES YOU
            </p>
            <p style="margin-top: 0">
              <strong>Speed:</strong> 50-100x faster statistical significance.
              What takes 4 weeks in A/B testing takes 2-5 days with
              interleaving. <strong>Efficiency:</strong> Uses the same user as
              their own control, eliminating between user variance.{" "}
              <strong>Iteration velocity:</strong> Test more ranking hypotheses
              per quarter because each experiment takes days instead of weeks.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              WHAT INTERLEAVING DOES NOT GIVE YOU
            </p>
            <p style="margin-top: 0">
              <strong>Absolute impact:</strong> You learn Model A is preferred
              over Model B, but not by how much CTR or revenue actually changes.{" "}
              <strong>Delayed outcomes:</strong> Interleaving runs for days, too
              short to measure delayed conversions like subscriptions or repeat
              purchases. <strong>Business metrics:</strong> Guardrail metrics
              like page load time, error rates, or revenue require traditional
              A/B testing with full traffic exposure.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Key Trade-off:</strong> Interleaving trades absolute
              metric measurement for iteration speed. Use it for rapid ranking
              quality comparisons, not for business KPI validation.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              THE THREE STAGE FUNNEL
            </p>
            <p style="margin-top: 0">
              Production ML teams typically use a three stage evaluation funnel:
              <br />
              <strong>Stage 1:</strong> Offline metrics (NDCG, MRR) filter 90%
              of candidates in hours with zero production traffic.
              <br />
              <strong>Stage 2:</strong> Interleaving ranks the remaining 10% in
              2-5 days with 5-20% of traffic.
              <br />
              <strong>Stage 3:</strong> A/B testing validates the top 1-2
              winners over 2-4 weeks with full traffic exposure.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              WHEN TO SKIP INTERLEAVING
            </p>
            <p style="margin-top: 0">
              Skip interleaving when: (1) Models are very different and blending
              creates incoherent results. (2) You need diversity or fairness
              constraints that apply to the entire result slate. (3) Your metric
              requires weeks of observation (subscription retention). (4) You
              are testing UI changes that affect user browsing behavior
              independent of ranking.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">Stage 1: Offline</strong>
                  <div style="margin-top: 4px; font-size: 12px">
                    100 candidates → NDCG on test set
                    <br />
                    Latency: hours | Cost: $100 compute
                    <br />
                    Output: 10 survivors
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">Stage 2: Interleaving</strong>
                  <div style="margin-top: 4px; font-size: 12px">
                    10 candidates → Head to head preference
                    <br />
                    Latency: 2-5 days | Sample: 400-2000 queries
                    <br />
                    Output: 1-2 winners
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">Stage 3: A/B Test</strong>
                  <div style="margin-top: 4px; font-size: 12px">
                    1-2 finalists → Revenue, retention KPIs
                    <br />
                    Latency: 2-4 weeks | Sample: 40K-100K users
                    <br />
                    Output: Production launch
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
                  Interleaving provides 50-100x faster significance but only
                  relative preference, not absolute CTR or revenue impact
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Three stage funnel: offline metrics filter 90%, interleaving
                  ranks remaining 10%, A/B validates top winners
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Skip interleaving for slate level constraints (diversity,
                  fairness), delayed conversions, or non ranking changes
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Use interleaving for rapid iteration on ranking quality; use
                  A/B for business metrics and guardrails
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
                  When asked about evaluation strategy, describe the three stage
                  funnel: offline filters 90%, interleaving ranks survivors, A/B
                  validates winners
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Explain that interleaving tells you which model is better but
                  not how much revenue changes, which is why A/B is still
                  required
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mention that diversity constraints break with interleaving
                  because the blended list does not preserve slate level
                  properties
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonInterleavingExperimentsInterleavingVsAbTestingTradeOffs;
