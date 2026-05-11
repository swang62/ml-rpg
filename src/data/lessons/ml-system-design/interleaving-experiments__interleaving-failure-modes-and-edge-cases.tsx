import type { Component } from "solid-js";

const LessonInterleavingExperimentsInterleavingFailureModesAndEdgeCases: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Interleaving Failure Modes and Edge Cases
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 0; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              HIGH OVERLAP PROBLEM
            </p>
            <p style="margin-top: 0">
              When both models produce nearly identical rankings, most slots
              become neutral (no team credit). If the top 10 items match for 80%
              of queries, you only get competitive signal from 20% of slots.
              This dramatically reduces effective sample size. Monitor{" "}
              <strong>competitive coverage</strong>: the fraction of slots that
              are non neutral. If coverage drops below 30%, you need 3-5x more
              samples or longer experiment duration.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              POSITION BIAS RESIDUALS
            </p>
            <p style="margin-top: 0">
              Users click higher positions more often regardless of item
              quality. Position 1 gets 5-10x more clicks than position 5. If one
              model systematically wins the coin flip more often for top
              positions, it will appear better even if the models are equal.
              Monitor <strong>first position balance</strong>: each team should
              start first in approximately 50% of rounds, within 2% tolerance.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Key Trade-off:</strong> Strict position balancing adds
              complexity but is essential when click propensity drops steeply
              across ranks.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              SLATE LEVEL CONSTRAINTS
            </p>
            <p style="margin-top: 0">
              Models that optimize diversity (show 3 different content types) or
              fairness (balance across item categories) break under
              interleaving. The blended list destroys intended slate level
              properties. A diversity optimized model might ensure 3 genres in
              top 10, but after interleaving with an engagement optimized model,
              you might get 5 items from one genre. The diversity model looks
              worse because its constraint was violated.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              SESSION ATTRIBUTION LEAKAGE
            </p>
            <p style="margin-top: 0">
              In multi query sessions, the same item may appear under different
              teams across queries. User sees item X as Team A in search, then
              as Team B in recommendations. If they click, which team gets
              credit? <strong>First click attribution</strong> credits the
              initial exposure. <strong>Competitive pairs attribution</strong>{" "}
              only credits items where models disagreed on rank, reducing
              variance by 30-40%.
            </p>
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  High overlap (80%+ identical top items) reduces competitive
                  slots, requiring 3-5x more samples when coverage falls below
                  30%
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Position bias residuals occur if coin flips favor one team for
                  top positions; monitor first position balance within 2%
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Slate level constraints (diversity, fairness) break because
                  blending destroys intended result set properties
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Session attribution leakage when same item appears under
                  different teams; first click or competitive pairs attribution
                  resolves this
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
                  When discussing failure modes, explain high overlap problem:
                  80% identical rankings means only 20% competitive signal,
                  requiring much larger samples
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mention that diversity optimized models look worse in
                  interleaving because the blend breaks their intended slate
                  balance
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Show depth by discussing competitive pairs attribution which
                  credits only items with different ranks, reducing variance
                  30-40%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonInterleavingExperimentsInterleavingFailureModesAndEdgeCases;
