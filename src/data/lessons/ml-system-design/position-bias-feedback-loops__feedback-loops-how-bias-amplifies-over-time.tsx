import type { Component } from "solid-js";

const LessonPositionBiasFeedbackLoopsFeedbackLoopsHowBiasAmplifiesOverTime: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Feedback Loops: How Bias Amplifies Over Time
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              AMPLIFICATION DYNAMICS
            </p>
            <p style="margin-top: 0">
              Feedback loops occur when model predictions influence future
              training data. Show item A at position 1, it gets clicks, model
              learns A is good, shows A at position 1 again, more clicks. After
              a few retraining cycles, item A dominates regardless of actual
              quality. Items never shown become invisible: no exposure means no
              clicks means no data to learn relevance.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              CONVERGENCE TO POPULARITY
            </p>
            <p style="margin-top: 0">
              Without intervention, recommendation systems converge to showing
              popular items to everyone. The rich get richer: popular items get
              more exposure, more clicks, appear more relevant, get even more
              exposure. Niche items that would delight specific users never
              surface. This hurts long tail discovery, reduces diversity, and
              eventually reduces overall engagement as recommendations become
              generic.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              BREAKING THE LOOP
            </p>
            <p style="margin-top: 0">
              Three strategies to break feedback loops: exploration (randomly
              show some items to gather unbiased data), counterfactual training
              (weight training examples by how surprising they were), and
              holdout groups (reserve some users who never see personalized
              recommendations to measure true baseline).
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Key Insight:</strong> A recommendation system without
              exploration is optimizing for yesterday preferences. It cannot
              discover that users would love something they have never been
              shown.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              MEASURING LOOP SEVERITY
            </p>
            <p style="margin-top: 0">
              Track diversity metrics over time. If catalog coverage (percentage
              of items shown to at least one user) drops from 80% to 40% over
              months, you have a severe feedback loop. If average item age keeps
              increasing, new items are not surfacing. If user engagement
              plateaus despite growing catalog, the system is stuck.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="text-align: center; margin-bottom: 12px">
                <strong style="font-size: 15px">
                  Position Aware Learning (PAL) Factorization
                </strong>
              </div>
              <div style="display: flex; gap: 16px; align-items: center; justify-content: center">
                <div style="border: 2px solid; padding: 12px; border-radius: 6px; flex: 1; text-align: center">
                  <strong style="font-size: 13px">Visibility Module</strong>
                  <div style="font-size: 12px; margin-top: 6px">
                    p(seen | position, context)
                  </div>
                  <div style="font-size: 11px; margin-top: 4px">
                    Pos 1: 95%
                    <br />
                    Pos 3: 60%
                    <br />
                    Pos 10: 10%
                  </div>
                </div>
                <div style="font-size: 22px; font-weight: bold">×</div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px; flex: 1; text-align: center">
                  <strong style="font-size: 13px">Relevance Module</strong>
                  <div style="font-size: 12px; margin-top: 6px">
                    p(click | item, seen)
                  </div>
                  <div style="font-size: 11px; margin-top: 4px">
                    Intrinsic quality
                    <br />
                    User item match
                  </div>
                </div>
              </div>
              <div style="margin-top: 12px; padding: 10px; border: 2px solid; border-radius: 6px; text-align: center">
                <strong style="font-size: 12px">Inference:</strong>
                <span style="font-size: 12px; margin-left: 6px">
                  Use ONLY relevance module to rank. Discard visibility
                  component.
                </span>
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
                  Model predictions influence training data: shown items get
                  clicks, unseen items get nothing
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Rich get richer: popular items get more exposure → more clicks
                  → appear more relevant
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Without intervention, systems converge to generic
                  recommendations that hurt long-tail discovery
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Break loops with exploration (random items), counterfactual
                  training, and holdout groups
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Monitor catalog coverage: dropping from 80% to 40% indicates
                  severe feedback loop
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
                  Describe the amplification: item A shown at pos 1 → clicks →
                  model ranks higher → more clicks
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Explain diversity metrics: catalog coverage, average item age,
                  engagement plateau
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Discuss holdout groups: 1-5% of users see non-personalized
                  results to measure baseline
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonPositionBiasFeedbackLoopsFeedbackLoopsHowBiasAmplifiesOverTime;
