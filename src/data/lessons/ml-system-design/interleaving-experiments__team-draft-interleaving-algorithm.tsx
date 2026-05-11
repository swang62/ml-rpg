import type { Component } from "solid-js";

const LessonInterleavingExperimentsTeamDraftInterleavingAlgorithm: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Team Draft Interleaving Algorithm
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 0; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              THE TEAM DRAFT PROCESS
            </p>
            <p style="margin-top: 0">
              Team Draft constructs the blended result list through a round
              based selection process inspired by sports team drafts. In each
              round, both models propose their highest ranked item that has not
              yet been added to the blended list. A coin flip determines which
              model places its item first in that round. This random alternation
              eliminates systematic position bias.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              HANDLING DUPLICATES
            </p>
            <p style="margin-top: 0">
              When both models propose the same item (which happens frequently
              since top results often overlap), the item is included once and
              marked as <strong>neutral</strong>. Neutral items receive no team
              credit because both models agreed on them. This focuses
              attribution on the items where models actually disagreed,
              increasing statistical power.
            </p>
            <p>
              For example, if both models rank the same item as their #1, it
              goes into slot 1 as neutral. The next round, both propose their #2
              ranked items, and the coin flip decides which goes to slot 2
              versus slot 3.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              ALGORITHM COMPLEXITY
            </p>
            <p style="margin-top: 0">
              The merge algorithm runs in O(K) time where K is the number of
              items in the result list (typically 10-50). It uses pointer
              operations rather than copying items, adding under 1 millisecond
              to request latency. The real computational cost is running both
              rankers, which can double inference time. This is mitigated by
              caching shared features like user embeddings and item metadata.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Key Trade-off:</strong> Dual ranker inference typically
              adds 10-30ms latency. Feature caching and parallel execution can
              reduce this to under 10ms overhead.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              REQUIRED LOGGING
            </p>
            <p style="margin-top: 0">
              Every interleaved request must log: query ID, item ID, slot
              position, team assignment (A, B, or neutral), coin flip seed (for
              reproducibility), and all subsequent engagement signals (clicks,
              time spent, conversions). This data powers the statistical
              analysis that determines the winner.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Round 1: Coin → A first
                  </strong>
                  <div style="margin-top: 6px; font-size: 12px">
                    A proposes: Doc1 | B proposes: Doc1
                    <br />
                    <span>→ Output: [Doc1 neutral]</span>
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Round 2: Coin → B first
                  </strong>
                  <div style="margin-top: 6px; font-size: 12px">
                    A proposes: Doc2 | B proposes: Doc3
                    <br />
                    <span>
                      → Output: [Doc1 neutral, Doc3 teamB, Doc2 teamA]
                    </span>
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Round 3: Coin → A first
                  </strong>
                  <div style="margin-top: 6px; font-size: 12px">
                    A proposes: Doc4 | B proposes: Doc2
                    <br />
                    <span>→ Output: [..., Doc4 teamA, Doc2 teamB]</span>
                  </div>
                </div>
                <div style="text-align: center; margin-top: 8px; font-size: 12px">
                  User clicks Doc3 → credited to Team B
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
                  Each round: both models propose their top unassigned item,
                  coin flip decides placement order, eliminating systematic
                  position bias
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Items proposed by both models are marked neutral and excluded
                  from attribution, focusing statistical power on actual
                  disagreements
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Merge algorithm is O(K) with under 1ms latency; the real cost
                  is dual ranker inference (10-30ms added)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Logging must capture query ID, item ID, slot position, team
                  label, neutral flag, coin flip seed, and all engagement
                  signals
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
                  When asked about interleaving mechanics, walk through a
                  concrete example: Model A ranks [X,Y,Z], Model B ranks
                  [X,Z,W], explain how Team Draft merges them with neutral
                  handling
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mention the latency trade-off: merge is cheap (&lt;1ms) but
                  dual inference is expensive, mitigated by feature caching
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  If discussing implementation, emphasize that reproducibility
                  requires logging coin flip seeds so you can replay the exact
                  merge
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonInterleavingExperimentsTeamDraftInterleavingAlgorithm;
