import type { Component } from "solid-js";

const LessonRecsysEvaluationProductionEvaluationScaleDebiasingAndFailureModes: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Production Evaluation: Scale, Debiasing, and Failure Modes
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
                <strong>Offline metrics</strong> evaluate models on historical
                data before deployment. Fast iteration, no user impact. But
                offline success does not guarantee online success. The gap
                between offline and online performance is one of the hardest
                problems in recommendation systems.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Why Offline and Online Diverge
            </p>
            <p style="margin-top: 0">
              <strong>Selection bias:</strong> Offline data only contains items
              users actually saw. If old model never showed item X to user Y,
              you have no signal for that pair. Your new model might think X is
              great for Y, but you cannot verify offline.
            </p>
            <p>
              <strong>Position bias:</strong> Users click position 1 more than
              position 10 regardless of relevance. Offline data does not
              separate "clicked because relevant" from "clicked because
              visible." Models trained on this data inherit the bias.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Mitigating the Gap
            </p>
            <p style="margin-top: 0">
              <strong>Randomized data collection:</strong> Reserve 5-10% of
              traffic for random or uniformly sampled recommendations. This
              exploration data is essential for unbiased model comparison. This
              creates unbiased data for offline evaluation. Hurts short-term
              engagement but improves model quality long-term.
            </p>
            <p>
              <strong>Inverse propensity weighting:</strong> Weight each offline
              example by 1/(probability it was shown). Items shown rarely get
              high weight, correcting for selection bias. Requires logging which
              items were candidates, not just which were shown.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>✅ Best Practice:</strong> Never deploy based on offline
              metrics alone. Always A/B test. A model with 5% higher NDCG
              offline might show 0% improvement online or even regress. The
              correlation between offline and online varies by system. Track and
              quantify this correlation for your specific use case.
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
                  Production evaluation scale: hundreds of millions to billions
                  of predictions per sweep, nightly distributed compute,
                  bootstrap confidence intervals to detect sub 1% changes
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Position bias correction mandatory: clicks biased by rank,
                  debias with inverse propensity weighting (reweight by 1 over
                  examination probability), randomized interleaving, or unbiased
                  logging via randomized slots
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Sparse ground truth handling: macro average across users with
                  minimum 3 to 5 positives, exclude cold start users or report
                  user coverage separately (fraction with at least 1 relevant),
                  avoid volatile per user scores
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Temporal staleness: labels older than 4 weeks overestimate
                  performance on fresh content, stratify by content age (0 to 7
                  days, 7 to 30 days, 30 plus days), use rolling 7 to 28 day
                  windows
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Offline to online correlation: expect 10% to 30% of offline
                  wins to fail online due to bias, covariate shift, seasonality,
                  use offline for filtering then validate top 2 to 3 models in
                  A/B tests with business metrics
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Metric gaming: optimizing 30 second watch threshold
                  incentivizes clickbait, add negative signals (early exit,
                  hide, dislike) and multiple engagement thresholds as
                  guardrails
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
                  When asked about offline evaluation: explain using held-out
                  test sets with logged interactions; compute metrics on
                  historical data before expensive online experiments.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  For bias correction: mention that logged data has position
                  bias (top items clicked more); use IPS (inverse propensity
                  scoring) or unbiased labels from randomized traffic.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  When discussing correlation: explain that offline gains dont
                  always translate online - a 5% offline NDCG improvement might
                  yield 0-2% online metric lift; establish offline-online
                  correlation for your domain.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonRecsysEvaluationProductionEvaluationScaleDebiasingAndFailureModes;
