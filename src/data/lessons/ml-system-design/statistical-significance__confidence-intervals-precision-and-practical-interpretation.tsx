import type { Component } from "solid-js";

const LessonStatisticalSignificanceConfidenceIntervalsPrecisionAndPracticalInterpretation: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Confidence Intervals: Precision and Practical Interpretation
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 0; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              WHAT CONFIDENCE INTERVALS MEAN
            </p>
            <p style="margin-top: 0">
              A 95% confidence interval means the <em>procedure</em> captures
              the true value 95% of the time across repeated samples. It does
              NOT mean there is a 95% probability that this specific interval
              contains the true value. The interval is fixed; the true parameter
              is fixed; the 95% refers to the long run frequency of the
              procedure.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              INTERVALS SHOW BOTH SIGNIFICANCE AND MAGNITUDE
            </p>
            <p style="margin-top: 0">
              Unlike p-values, confidence intervals convey both whether an
              effect exists and how large it might be. CTR lift of 0.10
              percentage points with 95% CI [0.06, 0.14] tells you: (1) effect
              is significant (interval excludes zero), (2) effect is meaningful
              (lower bound 0.06 is still useful). If the CI were [0.01, 0.19],
              the effect is significant but might be negligibly small.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              CALCULATING INTERVALS
            </p>
            <p style="margin-top: 0">
              For large samples, use z critical value: 1.96 for 95% CI. For
              small samples, use t critical value with n-1 degrees of freedom.
              Formula:{" "}
              <code style="padding: 2px 6px; border-radius: 3px; font-family: monospace">
                CI = mean ± z × (std_dev / sqrt(n))
              </code>
              . For proportions near 0% or 100%, Wilson or Agresti-Coull
              intervals have better coverage than normal approximation.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Key Insight:</strong> Production decisions pair
              intervals with thresholds: ship if lower bound for engagement
              exceeds zero AND upper bound for latency stays under 10ms.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              BOOTSTRAP FOR HEAVY TAILS
            </p>
            <p style="margin-top: 0">
              Heavy-tailed metrics like revenue or p95 latency violate normal
              assumptions. Bootstrap intervals resample the data thousands of
              times to estimate the sampling distribution empirically. This
              handles outliers gracefully but costs 10-100x more computation
              than parametric methods.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 550px">
              <div style="display: flex; flex-direction: column; gap: 16px">
                <div style="text-align: center; font-weight: bold; font-size: 15px; margin-bottom: 8px">
                  CTR Lift: 0.10 percentage points
                </div>
                <div style="position: relative; height: 80px; border-left: 2px solid; border-bottom: 2px solid; padding-left: 12px; padding-bottom: 12px">
                  <div style="position: absolute; bottom: 12px; left: 12px; right: 12px; height: 40px; border: 2px solid; border-radius: 6px"></div>
                  <div style="position: absolute; bottom: 12px; left: 12px; width: 2px; height: 50px"></div>
                  <div style="position: absolute; bottom: 58px; left: 0px; font-size: 12px; font-weight: bold">
                    0.06
                  </div>
                  <div style="position: absolute; bottom: 12px; right: 12px; width: 2px; height: 50px"></div>
                  <div style="position: absolute; bottom: 58px; right: 0px; font-size: 12px; font-weight: bold">
                    0.14
                  </div>
                  <div style="position: absolute; bottom: 12px; left: 50%; transform: translateX(-50%); width: 3px; height: 50px"></div>
                  <div style="position: absolute; bottom: 58px; left: 50%; transform: translateX(-50%); font-size: 13px; font-weight: bold">
                    0.10
                  </div>
                  <div style="position: absolute; bottom: -8px; left: 50%; transform: translateX(-50%); width: 2px; height: 20px; border-left: 2px dashed"></div>
                  <div style="position: absolute; bottom: -28px; left: 50%; transform: translateX(-50%); font-size: 11px">
                    0
                  </div>
                </div>
                <div style="display: flex; gap: 12px; margin-top: 24px">
                  <div style="flex: 1; border: 2px solid; padding: 10px; border-radius: 6px">
                    <div style="font-size: 12px; font-weight: bold">
                      Interpretation
                    </div>
                    <div style="font-size: 11px; margin-top: 4px">
                      Interval excludes zero → statistically significant at p
                      &lt; 0.05
                    </div>
                  </div>
                  <div style="flex: 1; border: 2px solid; padding: 10px; border-radius: 6px">
                    <div style="font-size: 12px; font-weight: bold">
                      Business Value
                    </div>
                    <div style="font-size: 11px; margin-top: 4px">
                      Lower bound 0.06 still meaningful → ship it
                    </div>
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
                  95% CI means the procedure captures the true value 95% of the
                  time, not a 95% probability for this specific interval
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Intervals show significance AND magnitude: CI [0.06, 0.14]
                  means effect is real and lower bound is meaningful
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Use z=1.96 for large samples, t-distribution for small
                  samples; Wilson intervals for proportions near 0 or 100%
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Bootstrap intervals handle heavy tailed metrics but cost
                  10-100x more computation
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
                  Explain the correct interpretation: the procedure works 95% of
                  the time, not a probability statement about this interval
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Show how intervals inform decisions: ship if engagement lower
                  bound &gt; 0 AND latency upper bound &lt; threshold
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mention Wilson intervals for rare events (0.1% conversion)
                  where normal approximation fails
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonStatisticalSignificanceConfidenceIntervalsPrecisionAndPracticalInterpretation;
