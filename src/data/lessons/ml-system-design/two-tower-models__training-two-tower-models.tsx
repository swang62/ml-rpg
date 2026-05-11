import type { Component } from "solid-js";

const LessonTwoTowerModelsTrainingTwoTowerModels: Component = () => (
  <div class="lesson-content">
    <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
      <div class="mb-4 p-4">
        <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
          Training Two-Tower Models
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
              Two-tower training teaches the model to place user and item
              vectors close together when there is a positive interaction
              (click, purchase) and far apart otherwise. The challenge: you have
              billions of negative pairs but only millions of positive pairs.
              How you sample negatives determines model quality.
            </div>
          </div>
          <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            The Training Signal
          </p>
          <p style="margin-top: 0">
            For each positive pair (user U clicked item I), you need negatives:
            items U did not click. With 10 million items, you have 10 million
            potential negatives per positive. You cannot use all of them.
            Typical batch sizes sample 100-1000 negatives per positive.
          </p>
          <p>
            The loss function says: score(U, I_positive) should be higher than
            score(U, I_negative) for all negatives. Softmax cross-entropy is
            common: compute softmax over the positive score and all negative
            scores, then minimize negative log-likelihood of the positive. This
            pushes positive scores up and negative scores down simultaneously.
          </p>
          <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            In Batch Negatives
          </p>
          <p style="margin-top: 0">
            The simplest approach: within a batch of 512 user-item pairs, use
            the 511 other items as negatives for each user. You already computed
            their embeddings, so this adds zero extra computation. For user U
            with positive item I, the 511 items from other users become
            negatives.
          </p>
          <p>
            The problem: batch negatives are random samples from the interaction
            distribution. They skew toward popular items and may be too easy. If
            the model just learns "user U does not want item I because I is a
            completely different category", it learns nothing useful. You need
            harder negatives that force the model to make fine distinctions.
          </p>
          <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            Hard Negative Mining
          </p>
          <p style="margin-top: 0">
            Hard negatives are items similar to the positive that the user did
            not interact with. If user U clicked a blue Nike running shoe, a
            hard negative is a blue Adidas running shoe they saw but did not
            click. The model must learn why U preferred Nike over Adidas, not
            just "U likes shoes over laptops".
          </p>
          <p>
            To find hard negatives: after initial training, run the model to
            find items with high scores that lack positive interactions. These
            are items the model thinks the user would like but they did not
            engage with. Mine these as negatives and retrain. This iterative
            process produces increasingly discriminative models. Two to three
            rounds of hard negative mining typically improve retrieval recall by
            5-15%.
          </p>
          <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
            <strong>⚠️ Interview Question:</strong> "How do you handle negative
            sampling?" Start by explaining in-batch negatives (free, efficient),
            then discuss why hard negatives improve quality (force fine-grained
            distinctions). Mention temperature tuning: start at 0.1, tune based
            on validation recall. If asked about scale, note that 2-3 rounds of
            hard negative mining typically improves recall by 5-15%.
          </div>
        </div>
        <div
          class="card-diagram"
          style="margin-bottom: 24px; display: flex; justify-content: center"
        >
          <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
            <div style="display: flex; flex-direction: column; gap: 12px">
              <div style="display: flex; gap: 12px">
                <div style="flex: 1; border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">OFFLINE</strong>
                  <div style="font-size: 11px; margin-top: 6px">
                    Batch job: Item tower → All item embeddings
                  </div>
                  <div style="font-size: 11px; margin-top: 4px">
                    Build FAISS/ScaNN index
                  </div>
                  <div style="font-size: 11px; margin-top: 4px">
                    Deploy to serving hosts
                  </div>
                </div>
                <div style="flex: 1; border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">ONLINE</strong>
                  <div style="font-size: 11px; margin-top: 6px">
                    Request → User tower → User embedding
                  </div>
                  <div style="font-size: 11px; margin-top: 4px">
                    ANN search: top K neighbors
                  </div>
                  <div style="font-size: 11px; margin-top: 4px">
                    Return candidates (1–5 ms)
                  </div>
                </div>
              </div>
              <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                <strong style="font-size: 13px">Example Scale</strong>
                <div style="font-size: 11px; margin-top: 6px">
                  200M items × 128 dims × 1 byte (quantized) = 25.6 GB
                </div>
                <div style="font-size: 11px; margin-top: 4px">
                  HNSW index adds 20–100% overhead → ~40 GB/shard
                </div>
                <div style="font-size: 11px; margin-top: 4px">
                  Query: 5–15ms p95 at 90% recall on GPU (FAISS)
                </div>
              </div>
              <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                <strong style="font-size: 12px">
                  Prefilter by locale/category → ANN search → 200–1000
                  candidates → Ranker
                </strong>
              </div>
            </div>
          </div>
        </div>
        <div class="Learn_keyTakeaways p-4 mb-4">
          <div class="Learn_keyTakeawaysHeader mb-3 pb-3">💡 Key Takeaways</div>
          <div class="d-flex flex-column gap-2">
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Training goal: high similarity for clicks (positive pairs), low
                similarity for non-clicks (negative pairs). Model adjusts tower
                weights to push positives together, negatives apart
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Problem: 100M items means cannot compare against all for each
                example. Computing 100M similarities per training step is
                impossibly slow
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                In-batch negatives: batch of 512 pairs → each user treats 511
                other items as negatives. Embeddings already computed, so
                negatives are free. 100-500x more efficient
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Why it works: for each user, model computes similarity to
                positive item and 511 batch items, then adjusts weights so
                positive scores highest
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Popularity trap: popular items appear as negatives more often,
                so model learns to score them low. A popular item negative
                1000x, positive 100x → model undervalues it
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Bias fix: track negative/positive ratio per item, add correction
                proportional to log(ratio). Improves popular item
                recommendations by 10-20%
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
                For latency-focused questions: explain the recall-latency
                tradeoff in ANN - higher recall requires checking more
                candidates, increasing latency from 2ms to 15ms+ depending on
                configuration.
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">2</span>
              <span class="flex-grow-1 Learn_cardContent">
                When asked about sharding: mention that billion-scale indexes
                are typically sharded (10-100M vectors per shard), with each
                shard replicated 3-10x for fault tolerance and load
                distribution.
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">3</span>
              <span class="flex-grow-1 Learn_cardContent">
                For capacity planning: give concrete numbers - 64-dim float32
                embeddings use 256 bytes per item; 100M items = 25GB raw, plus
                2-3x for index structures.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default LessonTwoTowerModelsTrainingTwoTowerModels;
