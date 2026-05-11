import type { Component } from "solid-js";

const LessonConceptDriftLabelDelayAndTwoStageLearning: Component = () => (
  <div class="lesson-content">
    <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
      <div class="mb-4 p-4">
        <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
          Label Delay and Two Stage Learning
        </h1>
        <div
          class="card-content-area"
          style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
        >
          <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            THE LABEL DELAY PROBLEM
          </p>
          <p>
            Most ML systems face a gap between prediction and ground truth. A
            fraud model predicts at transaction time, but fraud confirmation
            arrives 30-90 days later after investigation. A recommendation model
            predicts clicks, but conversions happen days or weeks later.
          </p>
          <p>
            This delay creates a blind spot. You cannot measure true model
            performance until labels arrive. By then, the model may have been
            wrong for weeks. In fast-changing domains, the model that was wrong
            for 30 days has already caused significant damage.
          </p>
          <p>
            Delay varies by domain: click labels arrive in seconds, conversion
            labels in days, fraud labels in weeks, churn labels in months.
            Design monitoring strategies around your specific label latency.
          </p>
          <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            TWO-STAGE LEARNING
          </p>
          <p>
            <strong>Stage 1 - Proxy model:</strong> Train on fast-arriving
            labels (clicks, views, engagement). Update frequently. Provides
            responsiveness to drift.
          </p>
          <p>
            <strong>Stage 2 - Outcome model:</strong> Train on delayed labels
            (conversions, fraud confirmation). Update less frequently. Provides
            accuracy on true outcomes.
          </p>
          <p>
            Combine stages: proxy model provides immediate signal; outcome model
            corrects for proxy-outcome mismatch. Weight toward proxy model for
            recent predictions (labels not yet available), shift toward outcome
            model as labels arrive.
          </p>
          <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            HANDLING PARTIAL LABELS
          </p>
          <p>
            <strong>Label imputation:</strong> For unlabeled recent data, use
            model predictions as pseudo-labels. Risky: if the model is wrong,
            you reinforce errors. Use only when confident in model stability.
          </p>
          <p>
            <strong>Semi-supervised learning:</strong> Train on both labeled
            (old) and unlabeled (recent) data. Consistency regularization
            encourages similar predictions for similar inputs regardless of
            label availability.
          </p>
          <p>
            <strong>Active labeling:</strong> Prioritize labeling for samples
            where the model is uncertain or drift is detected. Targeted labeling
            provides maximum information per label.
          </p>
          <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
            <strong>⚠️ Key Trade-off:</strong> Two-stage learning adds
            complexity. Simple domains may not need it. Use when label delay
            exceeds drift rate—if concepts change faster than labels arrive,
            proxy models are essential.
          </div>
        </div>
        <div class="Learn_keyTakeaways p-4 mb-4">
          <div class="Learn_keyTakeawaysHeader mb-3 pb-3">💡 Key Takeaways</div>
          <div class="d-flex flex-column gap-2">
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Label delay varies: clicks (seconds), conversions (days), fraud
                (weeks), churn (months)—design monitoring around your latency
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Two-stage learning: proxy model on fast labels for
                responsiveness, outcome model on delayed labels for accuracy
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Partial label strategies: imputation (risky), semi-supervised
                learning, active labeling for uncertain samples
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
                Interview Tip: Explain the label delay problem with concrete
                timelines for your domain.
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">2</span>
              <span class="flex-grow-1 Learn_cardContent">
                Interview Tip: Describe two-stage learning architecture—when to
                weight proxy vs outcome model.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default LessonConceptDriftLabelDelayAndTwoStageLearning;
