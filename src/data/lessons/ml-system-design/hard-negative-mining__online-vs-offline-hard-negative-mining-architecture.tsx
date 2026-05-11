import type { Component } from "solid-js";

const LessonHardNegativeMiningOnlineVsOfflineHardNegativeMiningArchitecture: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Online vs Offline Hard Negative Mining Architecture
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              OFFLINE HARD NEGATIVE MINING
            </p>
            <p>
              Offline mining selects hard negatives before training begins.
              Process: embed all items using current model, query for nearest
              neighbors, label those that are known negatives as hard negatives.
              Store these pairs for training.
            </p>
            <p>
              Advantage: can mine exhaustively across the entire corpus. Find
              the globally hardest negatives, not just those in a batch.
              Disadvantage: hard negatives become stale as model improves. What
              was hard at epoch 1 may be trivial at epoch 10.
            </p>
            <p>
              Refresh strategy: re-mine hard negatives every N epochs (typically
              1-5). Re-embed corpus with updated model, regenerate hard negative
              pairs. Adds computational overhead but keeps negatives challenging
              throughout training.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              ONLINE HARD NEGATIVE MINING
            </p>
            <p>
              Online mining selects hard negatives during training using the
              current batch. Compute embeddings for batch items, find hardest
              negatives within the batch for each anchor. No pre-computation
              needed.
            </p>
            <p>
              <strong>In-batch negatives:</strong> Other positives in batch
              serve as negatives. Fast, no extra computation. Batch size limits
              negative diversity—512 batch = 511 candidates.
            </p>
            <p>
              <strong>Hardest-in-batch:</strong> Select the negative with
              smallest distance to anchor. Can be too aggressive—may repeatedly
              select mislabeled positives.
            </p>
            <p>
              <strong>Semi-hard negatives:</strong> Select negatives harder than
              positive but not the hardest.{" "}
              <code style="padding: 2px 6px; border-radius: 3px; font-family: monospace">
                d(anchor, positive) &lt; d(anchor, negative) &lt; d(anchor,
                positive) + margin
              </code>
              . Balances difficulty and stability.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              CHOOSING BETWEEN THEM
            </p>
            <p>
              Use offline mining when: you have a large corpus, can afford
              re-mining overhead, need globally hard negatives that batch may
              miss.
            </p>
            <p>
              Use online mining when: corpus changes frequently, computational
              budget is limited, batch size is large enough for diversity
              (512+).
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>✅ Best Practice:</strong> Start with in-batch negatives
              (simplest). If recall plateaus, add offline mining with periodic
              refresh. Monitor for false negative issues.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="text-align: center; font-weight: bold; margin-bottom: 8px; font-size: 15px">
                  Hybrid Mining Architecture
                </div>
                <div style="display: flex; gap: 10px">
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; flex: 1">
                    <strong style="font-size: 12px">Online Mining</strong>
                    <div style="font-size: 11px; margin-top: 6px">
                      Batch size: 2048
                      <br />
                      Negatives: 2047
                      <br />
                      Latency: 0ms
                      <br />
                      Coverage: Current batch
                    </div>
                  </div>
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; flex: 1">
                    <strong style="font-size: 12px">Offline Mining</strong>
                    <div style="font-size: 11px; margin-top: 6px">
                      Pool: 200 candidates
                      <br />
                      Negatives: 2 to 4 sampled
                      <br />
                      Refresh: 24 to 72 hours
                      <br />
                      Coverage: Full corpus
                    </div>
                  </div>
                </div>
                <div style="font-size: 18px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">Training Step</strong>
                  <div style="font-size: 11px; margin-top: 6px">
                    Total negatives per anchor: 2049 to 2051
                    <br />
                    Mix: 99% online + 1% offline for diversity
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
                  Offline mining: exhaustive across corpus but hard negatives go
                  stale; refresh every 1-5 epochs
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Online mining: uses batch; in-batch is simple, semi-hard
                  balances difficulty and stability
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Start with in-batch negatives; add offline mining if recall
                  plateaus
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
                  Interview Tip: Explain semi-hard selection—harder than
                  positive but not hardest; avoids mislabeled positives.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Describe when to choose each—offline for large
                  static corpus, online for changing data.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonHardNegativeMiningOnlineVsOfflineHardNegativeMiningArchitecture;
