import type { Component } from "solid-js";

const LessonDataDriftDetectionWhatIsDataDriftDetection: Component = () => (
  <div class="lesson-content">
    <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
      <div class="mb-4 p-4">
        <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
          What is Data Drift Detection?
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
              <strong>Data drift detection</strong> monitors changes in the
              statistical properties of input features over time, alerting you
              when production data differs significantly from training data.
            </div>
          </div>
          <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            WHY DATA DRIFT MATTERS
          </p>
          <p>
            ML models learn patterns from training data. When production data
            distributions differ from training distributions, predictions become
            unreliable. A model trained on users aged 25-45 will perform poorly
            when user demographics shift to include teenagers—even if the
            underlying relationship between features and outcomes has not
            changed.
          </p>
          <p>
            Data drift is detectable without labels. Unlike concept drift (which
            requires labels to observe), you can measure data drift from inputs
            alone. This makes it valuable for early warning before performance
            degradation becomes visible in downstream metrics.
          </p>
          <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            TYPES OF DATA DRIFT
          </p>
          <p>
            <strong>Covariate shift:</strong> Feature distributions change but
            the relationship between features and labels remains stable. Most
            common type. Example: age distribution shifts but age still predicts
            outcomes the same way.
          </p>
          <p>
            <strong>Prior probability shift:</strong> The distribution of labels
            changes. Example: fraud rate increases from 0.1% to 1%. Feature
            distributions may be unchanged, but class balance shifts.
          </p>
          <p>
            <strong>Feature schema drift:</strong> Features themselves
            change—new categories appear, features are renamed, or data types
            change. Often indicates upstream pipeline issues rather than genuine
            distribution shift.
          </p>
          <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            DRIFT VS NOISE
          </p>
          <p>
            Not all distribution changes are drift. Daily and weekly patterns,
            seasonal effects, and random sampling variation cause temporary
            distribution changes that are not drift. Drift is a sustained shift
            that affects model reliability.
          </p>
          <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
            <strong>💡 Key Insight:</strong> Data drift detection is an early
            warning system. It signals potential problems before labels arrive
            and performance metrics drop.
          </div>
        </div>
        <div
          class="card-diagram"
          style="margin-bottom: 24px; display: flex; justify-content: center"
        >
          <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
            <div style="display: flex; flex-direction: column; gap: 12px">
              <div style="display: flex; gap: 12px; align-items: center; justify-content: center">
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; flex: 1; text-align: center">
                  <strong style="font-size: 13px">Training Data</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Baseline Distribution
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold">vs</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; flex: 1; text-align: center">
                  <strong style="font-size: 13px">Production Traffic</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Current Window
                  </div>
                </div>
              </div>
              <div style="font-size: 22px; font-weight: bold; text-align: center">
                ↓
              </div>
              <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; text-align: center">
                <strong style="font-size: 14px">Statistical Tests</strong>
                <div style="font-size: 12px; margin-top: 6px">
                  KS Test, PSI, Chi-square
                </div>
              </div>
              <div style="font-size: 22px; font-weight: bold; text-align: center">
                ↓
              </div>
              <div style="display: flex; gap: 12px">
                <div style="border: 2px solid; padding: 10px 12px; border-radius: 6px; flex: 1; text-align: center; font-size: 13px">
                  <strong>No Drift</strong>
                  <div style="font-size: 11px; margin-top: 3px">
                    PSI &lt; 0.1
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px 12px; border-radius: 6px; flex: 1; text-align: center; font-size: 13px">
                  <strong>Minor Shift</strong>
                  <div style="font-size: 11px; margin-top: 3px">
                    PSI 0.1 to 0.25
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px 12px; border-radius: 6px; flex: 1; text-align: center; font-size: 13px">
                  <strong>Alert</strong>
                  <div style="font-size: 11px; margin-top: 3px">
                    PSI &gt; 0.25
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="Learn_keyTakeaways p-4 mb-4">
          <div class="Learn_keyTakeawaysHeader mb-3 pb-3">💡 Key Takeaways</div>
          <div class="d-flex flex-column gap-2">
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Data drift: input distributions change from training to
                production; detectable without labels (unlike concept drift)
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Types: covariate shift (features change), prior probability
                shift (label balance changes), schema drift (feature definitions
                change)
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Distinguish drift from noise: daily/weekly patterns and sampling
                variation are not drift; drift is sustained shift
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
                Interview Tip: Explain why data drift detection is
                valuable—early warning before performance metrics degrade.
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">2</span>
              <span class="flex-grow-1 Learn_cardContent">
                Interview Tip: Give examples of each drift type: age
                distribution shift, fraud rate increase, new category appearing.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default LessonDataDriftDetectionWhatIsDataDriftDetection;
