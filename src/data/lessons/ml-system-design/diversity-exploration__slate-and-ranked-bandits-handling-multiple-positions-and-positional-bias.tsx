import type { Component } from "solid-js";

const LessonDiversityExplorationSlateAndRankedBanditsHandlingMultiplePositionsAndPositionalBias: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Slate and Ranked Bandits: Handling Multiple Positions and Positional
            Bias
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
                <strong>Diversity constraints</strong> ensure recommendation
                lists cover multiple categories, brands, or content types. Even
                if the model predicts a user loves action movies, showing 20
                action movies creates a poor experience.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Maximal Marginal Relevance (MMR)
            </p>
            <p style="margin-top: 0">
              Score items by{" "}
              <code style="padding: 2px 6px; border-radius: 3px; font-family: monospace">
                MMR = lambda × relevance - (1-lambda) × similarity_to_selected
              </code>
              . Start with highest relevance item. Each subsequent item balances
              relevance against similarity to already-selected items. Lambda
              around 0.5-0.7 works for most applications.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Category Caps
            </p>
            <p style="margin-top: 0">
              Hard constraint: no more than N items from any single category.
              Simple and interpretable. Example: max 3 items per genre in a
              20-item list. Ensures coverage but may leave slots unfilled if
              categories are exhausted. Combine with relevance-based fallback.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Submodular Optimization
            </p>
            <p style="margin-top: 0">
              Define diversity as a submodular function: adding an item provides
              diminishing returns as similar items are already selected. Greedy
              selection with submodular objective gives theoretical guarantees
              on diversity. More principled than ad-hoc constraints but harder
              to implement and explain.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Interview Pattern:</strong> When asked about
              recommendation diversity, mention MMR first (balances relevance
              and diversity), then category caps (simple business rules), then
              submodular optimization (theoretically grounded). Interviewers
              appreciate seeing you know both practical and principled
              approaches.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 540px">
              <div style="display: flex; gap: 16px">
                <div style="flex: 1; border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px; display: block; margin-bottom: 8px">
                    Per-Position Bandits (Scribd)
                  </strong>
                  <div style="font-size: 11px; display: flex; flex-direction: column; gap: 6px">
                    <div style="border: 2px solid; padding: 6px; border-radius: 4px">
                      Pos 1: Bandit₁ → Row A
                    </div>
                    <div style="border: 2px solid; padding: 6px; border-radius: 4px">
                      Pos 2: Bandit₂ → Row D
                    </div>
                    <div style="border: 2px solid; padding: 6px; border-radius: 4px">
                      Pos 3: Bandit₃ → Row B
                    </div>
                    <div style="margin-top: 4px; font-size: 10px">
                      30 bandits total
                      <br />
                      (10 pos × 3 segments)
                      <br />
                      Each: 42 arms
                    </div>
                  </div>
                </div>
                <div style="flex: 1; border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px; display: block; margin-bottom: 8px">
                    Slate Bandit (Udemy)
                  </strong>
                  <div style="font-size: 11px; display: flex; flex-direction: column; gap: 6px">
                    <div style="border: 2px solid; padding: 6px; border-radius: 4px">
                      Sample all arms
                      <br />
                      Pick top k=3 samples
                    </div>
                    <div style="border: 2px solid; padding: 6px; border-radius: 4px">
                      Unit A (shown)
                    </div>
                    <div style="border: 2px solid; padding: 6px; border-radius: 4px">
                      Unit C (shown)
                    </div>
                    <div style="border: 2px solid; padding: 6px; border-radius: 4px">
                      Unit E (shown)
                    </div>
                    <div style="margin-top: 4px; font-size: 10px">
                      3 feedbacks per impression
                      <br />
                      Unordered top-k
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
                  Contextual bandits condition arm selection on context features
                  (user segment, device, time), learning per-context preferences
                  rather than global averages.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Per-position bandits run one independent bandit per slot,
                  treating each position as a separate decision point with its
                  own action space and reward signal.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Slate bandits optimize unordered top-k sets and observe
                  feedback from all k items per impression. More data-efficient
                  but requires handling inter-item dependencies.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Reward attribution becomes complex with slates. If a user
                  clicks position 2, positions 1 and 3 were also shown and
                  contributed to the decision context.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Traffic requirements scale with granularity. Running 30
                  simultaneous bandits (10 positions × 3 segments) requires
                  sufficient per-bandit traffic to converge.
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
                  When asked about contextual bandits: explain that context
                  features (user segment, device, time) modify arm selection;
                  models learn per-context preferences rather than global
                  averages.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  For slate optimization: describe selecting k items from n
                  candidates - sample all n, pick top k samples; accounts for
                  position effects and inter-item dependencies.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  When discussing scale: mention that separate bandits per
                  position (10 slots × 3 segments = 30 bandits) is common; each
                  optimizes independently with shared arm statistics.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonDiversityExplorationSlateAndRankedBanditsHandlingMultiplePositionsAndPositionalBias;
