import type { Component } from "solid-js";

const LessonCollaborativeFilteringImplicitVsExplicitFeedback: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Implicit vs Explicit Feedback
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
                <strong>Explicit feedback</strong> means users tell you their
                preferences directly: star ratings, thumbs up/down, reviews.{" "}
                <strong>Implicit feedback</strong> means you infer preferences
                from behavior: clicks, purchases, watch time, scroll depth. Most
                real systems have abundant implicit data but sparse explicit
                data.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Implicit Feedback Challenge
            </p>
            <p style="margin-top: 0">
              Implicit feedback only tells you what users did, not what they
              avoided. A missing interaction could mean: user has not seen the
              item, user saw it and was not interested, or user is interested
              but has not acted yet. You cannot distinguish these cases. This
              means you cannot treat missing interactions as negative examples.
            </p>
            <p>
              With explicit ratings, missing means unknown. With implicit,
              missing could be negative or unknown. Training methods must handle
              this asymmetry. Common approaches: weight observed interactions
              higher, sample negatives from unobserved pairs, or use specialized
              loss functions like Bayesian Personalized Ranking (BPR).
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Confidence Weighting
            </p>
            <p style="margin-top: 0">
              Not all implicit signals have equal strength. A purchase signals
              stronger preference than a click. Watching 90% of a video signals
              more than watching 10%. Weight training examples by confidence. A
              common formula: confidence = 1 + alpha * (interaction_count). More
              interactions with an item means higher confidence in the
              preference.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Interview Question:</strong> "How do you handle implicit
              feedback?" Explain the asymmetry problem first, then mention
              solutions: confidence weighting, negative sampling strategies, and
              ranking losses like BPR that optimize relative preferences rather
              than absolute predictions.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 540px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 12px; border-radius: 6px; text-align: center">
                  <strong>User Request</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    (100-200ms total budget)
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong>Step 1: Fetch/Compute User Vector</strong>
                  <div style="font-size: 12px; margin-top: 6px">
                    Cache lookup or aggregate last 50 plays
                    <br />
                    <strong>Latency: 1-5ms</strong>
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong>Step 2: ANN Search (100M items)</strong>
                  <div style="font-size: 12px; margin-top: 6px">
                    Return top 500 candidates at 90% recall
                    <br />
                    <strong>Latency: 5-10ms</strong>
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong>Step 3: Downstream Ranker</strong>
                  <div style="font-size: 12px; margin-top: 6px">
                    Rich features, deep model, business rules
                    <br />
                    <strong>Latency: 50-100ms</strong>
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
                  Explicit feedback: ratings, likes, thumbs up. Clear signal but
                  rare: &lt;1% of purchases get rated, 5-10% of watched content
                  gets rated
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Implicit feedback: clicks, views, purchases, time spent.
                  Abundant (1000x more data) but ambiguous (click without
                  purchase = dislike or distraction?)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Key ambiguity: no interaction could mean not interested OR
                  never saw it. Cannot distinguish without tracking exposure
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interpretation: 20 min watch time good or bad? Depends if
                  video is 25 min or 2 hours. Must normalize by context
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Handling implicit in CF: treat as confidence weights. View =
                  weak positive (confidence 1), purchase = strong positive
                  (confidence 10), non-interaction = weak negative (0.1)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Production systems use implicit feedback because it is
                  100-1000x more abundant. Challenge is interpretation, not
                  collection
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
                  For system design: draw the two-stage pipeline - MF retrieves
                  500-2000 candidates via ANN search (5-15ms), then a ranker
                  with richer features scores and sorts (10-30ms).
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  When asked about online updates: explain that user vectors can
                  be updated in real-time by re-solving least squares with new
                  interactions, while item vectors are batch-updated.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  For latency discussion: break down the budget - user vector
                  lookup/computation (1-3ms), ANN search over item embeddings
                  (3-10ms), network overhead (2-5ms).
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonCollaborativeFilteringImplicitVsExplicitFeedback;
