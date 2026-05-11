import type { Component } from "solid-js";

const LessonHardNegativeMiningTripletLossAndContrastiveLossFormulations: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Triplet Loss and Contrastive Loss Formulations
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              TRIPLET LOSS
            </p>
            <p>
              Triplet loss trains embeddings using three items: an anchor, a
              positive (similar to anchor), and a negative (different from
              anchor). The loss pushes anchor closer to positive and farther
              from negative.
            </p>
            <p>
              Formula:{" "}
              <code style="padding: 2px 6px; border-radius: 3px; font-family: monospace">
                loss = max(0, d(anchor, positive) - d(anchor, negative) +
                margin)
              </code>
              . The margin (typically 0.2-1.0) specifies how much farther the
              negative should be than the positive. If the constraint is already
              satisfied, loss is zero.
            </p>
            <p>
              Training dynamic: as the model improves, easy triplets contribute
              zero loss. Only hard triplets (where negative is close to anchor)
              provide gradient signal. This motivates hard negative
              mining—without it, most triplets become uninformative.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              CONTRASTIVE LOSS (INFONCE)
            </p>
            <p>
              Contrastive loss (InfoNCE) compares one positive against many
              negatives simultaneously. For each anchor, compute similarity to
              the positive and to all negatives in the batch. The loss is
              softmax cross-entropy: the positive should have the highest
              similarity.
            </p>
            <p>
              Formula:{" "}
              <code style="padding: 2px 6px; border-radius: 3px; font-family: monospace">
                loss = -log(exp(sim(a,p)/τ) / Σexp(sim(a,n)/τ))
              </code>{" "}
              where τ is temperature. Lower temperature (0.05-0.1) makes the
              distribution sharper, pushing harder on near-negatives.
            </p>
            <p>
              Advantage over triplet loss: uses all negatives in batch, not just
              one. More negative comparisons per forward pass. Batch size of 512
              means 511 negatives per anchor.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              CHOOSING BETWEEN THEM
            </p>
            <p>
              <strong>Triplet loss:</strong> Simple, works with any batch size.
              Better when you have curated hard negatives. Slower convergence
              (only 1 negative per triplet).
            </p>
            <p>
              <strong>Contrastive loss:</strong> Requires large batches (512+)
              for sufficient negatives. Better when you can afford large batch
              training. Faster convergence via multi-negative comparison.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Key Insight:</strong> Temperature τ in contrastive loss
              controls hardness. Lower temperature focuses learning on hardest
              negatives. Start at 0.07-0.1 and tune based on convergence.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="text-align: center; font-weight: bold; margin-bottom: 6px; font-size: 15px">
                  Triplet Loss vs Contrastive Loss
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px">Triplet Loss</strong>
                  <div style="font-size: 12px; margin-top: 6px">
                    max(0, d(A,P) − d(A,N) + margin)
                  </div>
                  <div style="font-size: 11px; margin-top: 4px">
                    1 anchor, 1 positive, 1 negative per step
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    InfoNCE Contrastive Loss
                  </strong>
                  <div style="font-size: 12px; margin-top: 6px">
                    −log( exp(sim(A,P)/τ) / Σ exp(sim(A,N_i)/τ) )
                  </div>
                  <div style="font-size: 11px; margin-top: 4px">
                    1 anchor, 1 positive, N negatives per step
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Supervised Contrastive Loss
                  </strong>
                  <div style="font-size: 12px; margin-top: 6px">
                    Average over multiple positives
                  </div>
                  <div style="font-size: 11px; margin-top: 4px">
                    1 anchor, M positives, N negatives per step
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
                  Triplet loss: anchor-positive-negative with margin; uses 1
                  negative per sample
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Contrastive loss: 1 positive vs many negatives via softmax;
                  uses batch_size-1 negatives
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Temperature in contrastive loss controls hardness—lower =
                  sharper focus on hard negatives
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
                  Interview Tip: Compare the two losses—triplet uses curated
                  negatives, contrastive leverages batch for multi-negative
                  learning.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Explain temperature tuning—lower temperature
                  focuses on hardest negatives but can destabilize training.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonHardNegativeMiningTripletLossAndContrastiveLossFormulations;
