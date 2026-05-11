import type { Component } from "solid-js";

const LessonColdStartProblemColdStartFailureModesPopularityLoopsAndSparseSignalOverreaction: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Cold Start Failure Modes: Popularity Loops and Sparse Signal
            Overreaction
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="padding: 14px 16px; border: 2px solid; border-left: 4px solid; border-radius: 6px; margin: 0">
              <div style="font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px">
                Core Concept
              </div>
              <div style="font-size: 15px; line-height: 1.5">
                Cold start mitigation strategies can create their own failure
                modes. Over-reliance on popularity creates loops. Over-weighting
                sparse signals causes erratic behavior.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Popularity Feedback Loops
            </p>
            <p style="margin-top: 0">
              If cold items default to popularity-based recommendations, popular
              items get more exposure, accumulate more interactions, and become
              even more popular. Cold items stay cold. The long tail never gets
              discovered. Metric: track what percentage of impressions go to
              items with fewer than 100 interactions.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Sparse Signal Overreaction
            </p>
            <p style="margin-top: 0">
              With 3 interactions, a 100% conversion rate means nothing
              statistically. But models might rank that item highly. Then it
              fails badly for the next 97 users. Solution: require minimum
              interaction count before trusting engagement rates. Use smoothed
              estimates:{" "}
              <code style="padding: 2px 6px; border-radius: 3px; font-family: monospace">
                smoothed_rate = (successes + prior) / (attempts + prior_weight)
              </code>
              .
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Onboarding Dropout
            </p>
            <p style="margin-top: 0">
              Aggressive onboarding collects great signal but loses users. Track
              completion rates at each step. If asking for genre preferences
              drops completion from 80% to 60%, that 20% lost users never get
              personalized. Sometimes it is better to start with popularity and
              collect implicit signals than to optimize for explicit preferences
              and lose users.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>❗ Interview Deep-Dive:</strong> "What can go wrong with
              cold start mitigation?" signals an experienced interviewer.
              Discuss: popularity loops (rich-get-richer), sparse signal
              overreaction (statistical instability), and the
              exploration-exploitation trade-off. Quantify: "We track cold item
              exposure share; if it drops below 15%, we increase exploration
              budget."
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="text-align: center; font-weight: bold; font-size: 14px; margin-bottom: 4px">
                  Popularity Feedback Loop
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center">
                  <strong>Popular Item</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    High impressions → More clicks → Higher rank
                  </div>
                </div>
                <div style="text-align: center; font-size: 18px; font-weight: bold">
                  ⟳
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center">
                  <strong>New/Niche Item</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Zero impressions → No clicks → Stays suppressed
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px; margin-top: 8px">
                  <strong style="font-size: 12px">
                    Sparse Signal Overreaction Example
                  </strong>
                  <div style="font-size: 11px; margin-top: 6px; line-height: 1.5">
                    New product: 3 clicks / 5 impressions = 60% CTR
                    <br />
                    Category average: 5% CTR
                    <br />
                    <span style="font-weight: bold">
                      ❌ Naïve system promotes aggressively
                    </span>
                    <br />
                    <span style="font-weight: bold">
                      ✓ Bayesian smoothing: regress to 8% until 100+ impressions
                    </span>
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
                  Filter bubble risk: without exploration, popular items
                  dominate, new items never surface, and the recommendation
                  graph ossifies over time.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Seasonal and event-driven shifts can invalidate models trained
                  on stale data; short-term signals and recent retraining
                  windows help adapt.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Exploration budget (5-10% of impressions to cold items)
                  balances discovery with exploitation; too little causes
                  winner-take-all, too much hurts short-term metrics.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Adversarial exploitation via duplicate listings or fake early
                  engagement can game cold start boosts; mitigation requires
                  content deduplication and quality filters.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Monitor diversity metrics over time - declining catalog
                  coverage and increasing popularity concentration indicate
                  feedback loop effects taking hold.
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
                  When asked about exploration abuse: explain that malicious
                  sellers create duplicate listings to repeatedly trigger cold
                  start boosts; deduplication and quality filters are essential.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  For diversity collapse: mention that without exploration,
                  popular items dominate, new items never get exposure, and the
                  recommendation graph ossifies; reserve exploration budget.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  When discussing seasonal shift: explain that models trained on
                  stale data fail during behavioral changes (holidays, events);
                  short-term signals and recent retraining help.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonColdStartProblemColdStartFailureModesPopularityLoopsAndSparseSignalOverreaction;
