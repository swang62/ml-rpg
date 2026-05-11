import type { Component } from "solid-js";

const LessonConceptDriftWhatIsConceptDriftVsDataDriftVsModelDecay: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            What is Concept Drift vs Data Drift vs Model Decay?
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="padding: 14px 16px; border: 2px solid; border-left: 4px solid; border-radius: 6px; margin: 0">
              <div style="font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px">
                Key Distinction
              </div>
              <div style="font-size: 15px; line-height: 1.5">
                <strong>Concept drift</strong> means the relationship between
                inputs and outputs changes. <strong>Data drift</strong> means
                input distributions change. <strong>Model decay</strong> is the
                observed performance degradation caused by either.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              DATA DRIFT: INPUT DISTRIBUTION SHIFTS
            </p>
            <p>
              Data drift occurs when the statistical properties of input
              features change over time. The model was trained on one
              distribution but now receives data from a different distribution.
              Examples: user demographics shift, new product categories emerge,
              or seasonal patterns change.
            </p>
            <p>
              Data drift can occur without concept drift. If feature
              distributions shift but the relationship between features and
              outcomes remains stable, a well-generalized model may continue to
              perform well. However, most models overfit to training
              distributions and degrade when inputs shift.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              CONCEPT DRIFT: THE RULES CHANGE
            </p>
            <p>
              Concept drift occurs when the underlying relationship between
              inputs and outputs changes. The mapping{" "}
              <code style="padding: 2px 6px; border-radius: 3px; font-family: monospace">
                P(Y|X)
              </code>{" "}
              shifts. A fraud model trained when fraudsters used method A
              becomes less effective when they switch to method B—the input
              features might look similar, but they now indicate different
              outcomes.
            </p>
            <p>
              Concept drift is harder to detect than data drift because you
              cannot measure it directly from inputs alone. You need labeled
              outcomes to observe that predictions no longer match reality, and
              labels often arrive with significant delay.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              MODEL DECAY: THE OBSERVABLE SYMPTOM
            </p>
            <p>
              Model decay is performance degradation over time. It is the
              symptom, not the cause. Decay might result from data drift,
              concept drift, or both. Tracking decay metrics (accuracy, AUC,
              business metrics) tells you something is wrong but not what.
            </p>
            <p>
              Typical decay timeline: models degrade 1-5% per month without
              intervention. High-velocity domains (fraud, trending content)
              decay faster. Stable domains (document classification) decay
              slower.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Key Insight:</strong> Distinguish cause from symptom.
              Data drift and concept drift are causes. Model decay is what you
              observe. Knowing which drift type occurred determines your
              response.
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
                    Data Drift: P(X) changes
                  </strong>
                  <div style="margin-top: 8px; font-size: 13px">
                    Feature distribution shifts
                    <br />
                    Example: Device mix changes from 60% mobile to 80% mobile
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px">
                  <strong style="font-size: 14px">
                    Concept Drift: P(y|X) changes
                  </strong>
                  <div style="margin-top: 8px; font-size: 13px">
                    Input to target relationship shifts
                    <br />
                    Example: Same user features now predict different click
                    behavior
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 14px">Model Decay</strong>
                  <div style="margin-top: 8px; font-size: 13px">
                    AUC drops from 0.92 to 0.85
                    <br />
                    Mean Average Precision (MAP) falls 12%
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
                  Data drift: input distribution shifts (P(X) changes); concept
                  drift: relationship shifts (P(Y|X) changes)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Data drift is detectable from inputs; concept drift requires
                  labeled outcomes with potentially delayed feedback
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Model decay is the symptom (1-5% per month typical); data or
                  concept drift is the cause
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
                  Interview Tip: Clearly distinguish the three terms—data drift
                  affects inputs, concept drift affects the mapping, decay is
                  observed performance loss.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Give a fraud example—fraudsters changing
                  tactics is concept drift; new user demographics is data drift.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonConceptDriftWhatIsConceptDriftVsDataDriftVsModelDecay;
