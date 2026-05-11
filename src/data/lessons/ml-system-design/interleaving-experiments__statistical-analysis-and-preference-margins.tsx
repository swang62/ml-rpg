import type { Component } from "solid-js";

const LessonInterleavingExperimentsStatisticalAnalysisAndPreferenceMargins: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Statistical Analysis and Preference Margins
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 0; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              THE PREFERENCE MARGIN
            </p>
            <p style="margin-top: 0">
              Interleaving analysis estimates a{" "}
              <strong>preference margin</strong>: the proportion of competitive
              engagements won by the treatment model. For each query or session,
              count how many clicks landed on treatment team items versus
              control team items. Neutral items (where both models agreed) are
              excluded. The preference margin is:{" "}
              <code style="padding: 2px 6px; border-radius: 3px; font-family: monospace">
                treatment_clicks / (treatment_clicks + control_clicks)
              </code>
              .
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              STATISTICAL TESTING
            </p>
            <p style="margin-top: 0">
              The null hypothesis is that both models are equally good, meaning
              the expected preference margin is 0.5. You run a one sample t-test
              or z-test comparing the observed mean preference across sessions
              against 0.5. A p-value below 0.05 indicates statistically
              significant preference for one model.
            </p>
            <p>
              For binary outcomes (session had at least one competitive click),
              you can use a binomial test. For continuous outcomes (fraction of
              clicks per session), use a t-test. Both approaches are valid; the
              t-test is more common because it handles variable engagement rates
              better.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              SAMPLE SIZE AND POWER
            </p>
            <p style="margin-top: 0">
              Interleaving typically reaches 80% statistical power with
              400-2,000 competitive sessions, compared to 20,000-50,000 for A/B
              testing. This 50-100x efficiency comes from eliminating between
              user variance. One user who clicks 10 times and another who clicks
              once both contribute equally to preference estimation.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Key Insight:</strong> A 2% preference margin (52% vs
              48%) is detectable in days with interleaving but would take weeks
              with A/B testing to distinguish from noise.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              ATTRIBUTION METHODS
            </p>
            <p style="margin-top: 0">
              In multi query sessions, the same item might appear under
              different teams. <strong>First click attribution</strong> credits
              only the initial interaction.{" "}
              <strong>Last click attribution</strong> credits the final
              interaction before conversion.{" "}
              <strong>All clicks attribution</strong> counts every interaction.
              Empirically, first click attribution tends to correlate best with
              A/B test outcomes, showing 80-85% agreement on winner direction.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 480px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px">Query 1</strong>
                  <div style="margin-top: 6px; font-size: 12px">
                    Competitive clicks: 3 teamA, 5 teamB
                    <br />
                    Preference: 5 / (3+5) = <strong>0.625</strong>
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px">Query 2</strong>
                  <div style="margin-top: 6px; font-size: 12px">
                    Competitive clicks: 2 teamA, 1 teamB
                    <br />
                    Preference: 1 / (2+1) = <strong>0.333</strong>
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px">Query 3</strong>
                  <div style="margin-top: 6px; font-size: 12px">
                    Competitive clicks: 1 teamA, 4 teamB
                    <br />
                    Preference: 4 / (1+4) = <strong>0.800</strong>
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">
                    Mean Preference: 0.586
                  </strong>
                  <div style="margin-top: 4px; font-size: 12px">
                    One sample t test: H₀: μ = 0.5
                    <br />
                    If p &lt; 0.05 → Team B wins
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
                  Preference margin = treatment clicks / total competitive
                  clicks, tested against null hypothesis of 0.5
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Neutral items (both models agreed) are excluded from
                  attribution to focus power on actual ranking differences
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Typically 400-2,000 sessions to reach 80% power, compared to
                  20,000-50,000 for equivalent A/B test
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  First click attribution typically shows 80-85% agreement with
                  A/B test outcomes on winner direction
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
                  When discussing statistical analysis, explain the formula and
                  mention you are testing against 0.5 baseline with a one sample
                  t-test
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mention the attribution trade-off: first click works best for
                  ranking but last click may be better for conversion
                  optimization
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Show quantitative depth by citing 50-100x sample efficiency
                  and 80% power with hundreds to low thousands of sessions
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonInterleavingExperimentsStatisticalAnalysisAndPreferenceMargins;
