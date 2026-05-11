import type { Component } from "solid-js";

const LessonSearchRelevanceFeedbackWhatIsInversePropensityScoringAndWhenDoesItFail: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            What is Inverse Propensity Scoring and When Does It Fail?
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
                <strong>Inverse Propensity Scoring (IPS)</strong> reweights each
                training example by the inverse of its probability of being
                observed. Items at low visibility positions get higher weights
                to compensate for fewer chances to receive clicks.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              How IPS Corrects Position Bias
            </p>
            <p style="margin-top: 0">
              If an item at position 10 has only 10% chance of being examined,
              any click it receives should count 10 times more than a click at
              position 1 (where examination probability is 90%). Multiply each
              click by{" "}
              <code style="padding: 2px 6px; border-radius: 3px; font-family: monospace">
                1 / propensity
              </code>
              . Position 10 weight: 1/0.10 = 10. Position 1 weight: 1/0.90 =
              1.1. This cancels out position bias, treating clicks from all
              positions as equally informative about relevance.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              When IPS Fails: High Variance
            </p>
            <p style="margin-top: 0">
              IPS has a variance problem. When propensity is very low, the
              inverse weight becomes huge. Position 20 with 2% examination
              probability gets weight 50. A single accidental click there
              contributes 50x as much to training as a deliberate click at
              position 1. A few noisy clicks at low positions can dominate your
              training signal and push the model in wrong directions.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              When IPS Fails: Propensity Estimation Errors
            </p>
            <p style="margin-top: 0">
              IPS only works if you know the true propensities. But propensities
              are estimated from data, always with some error. Underestimating
              propensity at position 8 means you overweight clicks there. The
              problem compounds at low visibility positions where you have less
              data for accurate estimates, yet those positions get the largest
              IPS weights.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Key Trade-off:</strong> IPS trades bias for variance.
              Weight clipping (capping at 10 or 20) reduces variance but
              reintroduces some bias. In practice, clipped IPS often works
              better than pure IPS.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="text-align: center; font-weight: 700; font-size: 15px; margin-bottom: 6px">
                  IPS Weight Calculation
                </div>
                <div style="display: flex; gap: 10px; align-items: center">
                  <div style="border: 2px solid; padding: 10px 12px; border-radius: 6px; flex: 1; text-align: center">
                    <strong>Position 1</strong>
                    <div style="margin-top: 4px; font-size: 13px">
                      p(seen) = 0.90
                    </div>
                    <div style="margin-top: 4px; font-size: 13px; font-weight: 700">
                      weight = 1.11
                    </div>
                  </div>
                  <div style="border: 2px solid; padding: 10px 12px; border-radius: 6px; flex: 1; text-align: center">
                    <strong>Position 5</strong>
                    <div style="margin-top: 4px; font-size: 13px">
                      p(seen) = 0.30
                    </div>
                    <div style="margin-top: 4px; font-size: 13px; font-weight: 700">
                      weight = 3.33
                    </div>
                  </div>
                </div>
                <div style="display: flex; gap: 10px; align-items: center">
                  <div style="border: 2px solid; padding: 10px 12px; border-radius: 6px; flex: 1; text-align: center">
                    <strong>Position 10</strong>
                    <div style="margin-top: 4px; font-size: 13px">
                      p(seen) = 0.08
                    </div>
                    <div style="margin-top: 4px; font-size: 13px; font-weight: 700">
                      weight = 12.5
                    </div>
                  </div>
                  <div style="border: 2px solid; padding: 10px 12px; border-radius: 6px; flex: 1; text-align: center">
                    <strong>Position 15</strong>
                    <div style="margin-top: 4px; font-size: 13px">
                      p(seen) = 0.02
                    </div>
                    <div style="margin-top: 4px; font-size: 13px; font-weight: 700">
                      weight = 50 → clip to 20
                    </div>
                  </div>
                </div>
                <div style="margin-top: 8px; padding: 10px; border: 2px solid; border-radius: 6px; text-align: center; font-size: 12px">
                  <strong>Variance Explosion:</strong> Low propensity positions
                  create huge weights, causing unstable training
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
                  IPS reweights by 1/propensity: position 10 (10% examination)
                  gets weight 10, position 1 (90%) gets weight 1.1
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  High variance is the main failure: positions with 2%
                  propensity create weights of 50, amplifying noise
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Propensity estimation errors are amplified by IPS, especially
                  at low visibility positions with sparse data
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Weight clipping trades small bias for reduced variance and
                  more stable training
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
                  Explain the bias variance tradeoff: IPS is mathematically
                  unbiased but high variance. Clipped IPS works better in
                  practice.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Walk through the math: position 10 has 10% propensity, weight
                  = 10. Position 1 has 90%, weight = 1.1. This equalizes
                  contribution.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Emphasize that propensity estimation errors compound with IPS.
                  Accurate propensities are critical.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonSearchRelevanceFeedbackWhatIsInversePropensityScoringAndWhenDoesItFail;
