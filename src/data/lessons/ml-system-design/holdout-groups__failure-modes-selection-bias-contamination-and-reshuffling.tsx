import type { Component } from "solid-js";

const LessonHoldoutGroupsFailureModesSelectionBiasContaminationAndReshuffling: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Failure Modes: Selection Bias, Contamination, and Reshuffling
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
                <strong>Holdout failures</strong> corrupt long-term measurement
                through selection bias, contamination, or improper reshuffling.
                These failures can invalidate months or years of accumulated
                data.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Selection Bias
            </p>
            <p style="margin-top: 0">
              If holdout assignment correlates with user characteristics (power
              users, region, tenure), all comparisons are invalid. Caused by:
              using non-random identifiers, different enrollment paths, or bugs
              in hash function. Detect by comparing pre-holdout characteristics
              between groups - they should be statistically identical.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Contamination
            </p>
            <p style="margin-top: 0">
              Holdout users see production features due to: gating bugs (forgot
              holdout check), shared accounts (family sharing), network effects
              (holdout users interact with production user content). If holdout
              users interact with production users who share content, invites,
              or recommendations, the holdout experience is contaminated.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Key Insight:</strong> Social networks and marketplaces
              have inherent contamination: holdout users see content created by
              production users with new features. This limits holdout validity
              for these product types.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Reshuffling Problems
            </p>
            <p style="margin-top: 0">
              Changing the holdout salt mid-stream breaks continuity. Users who
              move from holdout to production suddenly see years of features at
              once - their behavior change isnt comparable to gradual adoption.
              Either maintain permanent holdout or clearly restart all
              measurement after reshuffle with new baseline.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 540px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px">
                  <strong style="font-size: 14px">
                    Initial 50/50 A/B Test
                  </strong>
                  <div style="margin-top: 6px; font-size: 12px">
                    Control: 50% | Treatment: 50%
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold; text-align: center">
                  ↓ Reshuffling
                </div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px">
                  <strong style="font-size: 14px">
                    New 5/95 Holdout Assignment
                  </strong>
                  <div style="margin-top: 6px; font-size: 12px">
                    Holdout: 5% (mixed from old control + treatment)
                    <br />
                    Shipped: 95%
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold; text-align: center">
                  ↓ Problem
                </div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px">
                  <strong style="font-size: 14px">Interstellar Problem</strong>
                  <div style="margin-top: 6px; font-size: 12px">
                    Some holdout users <strong>lose features</strong> they had
                    in treatment
                    <br />→ Engagement drops
                    <br />→ Unrepresentative baseline
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
                  Selection bias: holdout assignment correlates with user
                  characteristics due to non-random identifiers or bugs
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Contamination: holdout users see production features via bugs,
                  shared accounts, or network effects
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Social/marketplace products have inherent contamination from
                  holdout users seeing production content
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Reshuffling breaks continuity: users moving from holdout
                  suddenly see years of features
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
                  When detecting bias: compare pre-holdout characteristics
                  between groups before trusting comparisons
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  For contamination: audit feature exposure logs to verify
                  holdout users actually see holdout experience
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonHoldoutGroupsFailureModesSelectionBiasContaminationAndReshuffling;
