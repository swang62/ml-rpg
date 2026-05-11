import type { Component } from "solid-js";

const LessonDiversityExplorationDiversityConstraintsAndConvergenceMonitoringInProductionBandits: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Diversity Constraints and Convergence Monitoring in Production
            Bandits
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
                Measuring diversity and exploration impact requires metrics
                beyond click-through rate. Standard engagement metrics favor
                exploitation. You need separate metrics to track exploration
                health.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Coverage Metrics
            </p>
            <p style="margin-top: 0">
              <strong>Catalog coverage:</strong> What percentage of items
              received at least one impression this week? Low coverage indicates
              the system favors a small subset. Target: 80%+ of active items
              should get some exposure.
            </p>
            <p>
              <strong>Category coverage per user:</strong> How many distinct
              categories appear in recommendations per user session? Higher is
              better for diversity but may reduce relevance.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Exploration Effectiveness
            </p>
            <p style="margin-top: 0">
              <strong>Cold item conversion rate:</strong> For items with fewer
              than 100 prior impressions, what is the engagement rate when
              shown? Should be within 50-80% of warm item rate. If much lower,
              exploration is showing irrelevant items.
            </p>
            <p>
              <strong>Information gain:</strong> How much does showing an item
              reduce uncertainty about its true reward? High information gain
              means exploration is learning efficiently.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Long-Term Impact
            </p>
            <p style="margin-top: 0">
              Run long-term holdout experiments. Compare groups with different
              exploration rates over 4-8 weeks. Measure not just immediate
              engagement but also user retention, long-tail item sales, and
              model prediction accuracy over time.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>✅ Best Practice:</strong> Track diversity metrics
              alongside engagement metrics in dashboards. If CTR improves but
              catalog coverage drops, investigate. Healthy systems show stable
              coverage with improving engagement.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px">
                  <strong style="font-size: 14px">
                    Candidate Curation (Expedia)
                  </strong>
                  <div style="margin-top: 6px; font-size: 11px; display: flex; gap: 4px; flex-wrap: wrap">
                    <span style="border: 1px solid; padding: 3px 6px; border-radius: 3px">
                      Room
                    </span>
                    <span style="border: 1px solid; padding: 3px 6px; border-radius: 3px">
                      Lobby
                    </span>
                    <span style="border: 1px solid; padding: 3px 6px; border-radius: 3px">
                      Exterior
                    </span>
                    <span style="border: 1px solid; padding: 3px 6px; border-radius: 3px">
                      Pool
                    </span>
                    <span style="border: 1px solid; padding: 3px 6px; border-radius: 3px">
                      Dining
                    </span>
                  </div>
                  <div style="margin-top: 6px; font-size: 11px">
                    Max 10 images, enforced category diversity
                  </div>
                </div>
                <div style="font-size: 18px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px">
                  <strong style="font-size: 14px">
                    Convergence Monitoring (Udemy)
                  </strong>
                  <div style="margin-top: 6px; font-size: 11px">
                    <strong>Rate of change in top-k:</strong>
                    <br />
                    Week 1: 40% churn → exploring
                    <br />
                    Week 2: 25% churn → learning
                    <br />
                    Week 3: 8% churn → converging
                    <br />
                    Week 4: 2% churn →{" "}
                    <strong>stable, taper exploration</strong>
                  </div>
                </div>
                <div style="font-size: 18px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px">
                  <strong style="font-size: 14px">Guardrails (Expedia)</strong>
                  <div style="margin-top: 6px; font-size: 11px">
                    New image adopted only if:
                    <br />✓ Highest CTR among candidates
                    <br />✓ Statistical significance vs incumbent
                    <br />✓ No regression on bookings (A/B validation)
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
                  Pure CTR optimization creates filter bubbles and homogeneous
                  recommendations. Clickbait images may increase clicks but
                  decrease downstream conversion and satisfaction.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Candidate curation limits the action space while enforcing
                  diversity. Use up to N images per category with enforced
                  category coverage constraints.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Convergence monitoring via top-k stability measures what
                  percentage of the slate changes between time windows. High
                  churn indicates ongoing exploration; stability indicates
                  convergence.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Guardrails prevent exploration from harming business metrics.
                  Require statistical significance and metric improvement
                  thresholds before declaring a winner.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Multi-phase campaigns balance learning and validation: initial
                  exploration phase (Thompson Sampling with uniform priors),
                  then validation phase with winner holdout testing.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Long-tail entities (low traffic items, niche content) never
                  converge because they lack sufficient samples. Pool into
                  umbrella groups or use hierarchical bandits.
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
                  When asked about monitoring: explain tracking week-over-week
                  churn in top selections - high churn (40%+) indicates
                  exploration phase, low churn (&lt;5%) indicates convergence.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  For cold start handling: describe initial uniform exploration
                  period (first week or first 1000 impressions) to seed all arms
                  before allowing Thompson Sampling to specialize.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  When discussing diversity constraints: mention enforcing
                  category coverage (at least one item from each category in top
                  positions) alongside bandit optimization.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonDiversityExplorationDiversityConstraintsAndConvergenceMonitoringInProductionBandits;
