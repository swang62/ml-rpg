import type { Component } from "solid-js";

const LessonTwoTowerModelsTradeOffsAndWhenToUseTwoTower: Component = () => (
  <div class="lesson-content">
    <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
      <div class="mb-4 p-4">
        <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
          Trade-offs and When to Use Two-Tower
        </h1>
        <div
          class="card-content-area"
          style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
        >
          <div style="padding: 14px 16px; border: 2px solid; border-left: 4px solid; border-radius: 6px; margin: 0">
            <div style="font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px">
              Key Question
            </div>
            <div style="font-size: 15px; line-height: 1.5">
              When should you use two-tower models versus alternatives like
              matrix factorization or neural collaborative filtering? The answer
              depends on your scale, latency requirements, and whether you need
              to capture cross-features between user and item.
            </div>
          </div>
          <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            Two-Tower Wins When
          </p>
          <p style="margin-top: 0">
            <strong>Catalog exceeds 100K items:</strong> At this scale, scoring
            every item per request becomes impractical. Two-tower with ANN
            search is the only way to retrieve from millions of items in
            milliseconds. Matrix factorization cannot scale to this candidate
            pool size for real-time retrieval.
          </p>
          <p>
            <strong>You need content features:</strong> Matrix factorization
            only learns from interactions, so new items with zero history get
            random embeddings. Two-tower item towers can use content features
            (title, category, images) to embed new items meaningfully from day
            one. Cold start is less severe.
          </p>
          <p>
            <strong>Latency is critical:</strong> If you need results in under
            50ms, the two-tower architecture shines. User embedding (5ms) plus
            ANN search (10ms) beats any architecture that must score user-item
            pairs jointly.
          </p>
          <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            Two-Tower Loses When
          </p>
          <p style="margin-top: 0">
            <strong>Cross-features matter:</strong> The fundamental limitation:
            user and item towers never see each other. You cannot learn "this
            user prefers items priced 20% below their historical average"
            because that requires knowing both user history and item price
            simultaneously. If cross-features drive your business value,
            two-tower retrieval must feed into a ranking model that can capture
            these interactions.
          </p>
          <p>
            <strong>Catalog is small:</strong> With under 10K items, you can
            score all items per request using a neural collaborative filtering
            model. The added complexity of ANN indexes and separate towers
            provides no benefit. A simple dot-product model scores 10K items in
            1ms.
          </p>
          <p>
            <strong>Interactions are sparse:</strong> Two-tower models need
            substantial training data. With fewer than 100K interactions,
            simpler models like matrix factorization or nearest-neighbor
            baselines often outperform. The neural towers lack enough signal to
            learn meaningful embeddings.
          </p>
          <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            The Hybrid Pattern
          </p>
          <p style="margin-top: 0">
            Most production systems use two-tower for retrieval (find 1000
            candidates from 10M items) then a ranking model for final ordering.
            The ranking model sees both user features and item features together
            and can learn cross-features. It only scores 1000 items, so it can
            be slower and more complex.
          </p>
          <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
            <strong>⚠️ Interview Pattern:</strong> When asked "design a
            recommendation system", clarify the architecture early: two-tower
            for candidate retrieval (find 1000 from 10M), then a separate
            ranking model for final ordering (rank 1000 to show 20). This
            two-stage pattern appears in nearly every large-scale recommendation
            interview. Explain why: retrieval must be fast (latency), ranking
            must be accurate (cross-features).
          </div>
        </div>
        <div
          class="card-diagram"
          style="margin-bottom: 24px; display: flex; justify-content: center"
        >
          <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
            <div style="display: flex; flex-direction: column; gap: 12px">
              <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                <strong style="font-size: 13px">Popularity Bias</strong>
                <div style="font-size: 11px; margin-top: 6px">
                  In batch negatives oversample popular items → PMI scores
                </div>
                <div style="font-size: 11px; margin-top: 4px">
                  Fix: Subtract log(item_freq) or learn bias terms
                </div>
                <div style="font-size: 11px; margin-top: 4px">
                  Impact: +10–20% catalog coverage after correction
                </div>
              </div>
              <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                <strong style="font-size: 13px">ANN Recall Gap</strong>
                <div style="font-size: 11px; margin-top: 6px">
                  Index at 85% recall → 0.75 offline recall → 0.64 effective
                </div>
                <div style="font-size: 11px; margin-top: 4px">
                  15% recall loss causes 3–8% CTR drop online
                </div>
                <div style="font-size: 11px; margin-top: 4px">
                  Monitor: Shadow brute force on sample queries
                </div>
              </div>
              <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                <strong style="font-size: 13px">Cold Start</strong>
                <div style="font-size: 11px; margin-top: 6px">
                  New users/items have no ID embeddings learned
                </div>
                <div style="font-size: 11px; margin-top: 4px">
                  Fix: Emphasize metadata, text, recent interactions over IDs
                </div>
                <div style="font-size: 11px; margin-top: 4px">
                  Frozen BERT embeddings give immediate similarity
                </div>
              </div>
              <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                <strong style="font-size: 13px">Temporal Drift</strong>
                <div style="font-size: 11px; margin-top: 6px">
                  Embeddings trained on old data degrade as behavior shifts
                </div>
                <div style="font-size: 11px; margin-top: 4px">
                  Fix: Recency weighted training, daily retraining, online
                  adapters
                </div>
                <div style="font-size: 11px; margin-top: 4px">
                  Netflix retrained daily during pandemic to maintain quality
                </div>
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
                Gain: 100M+ items in &lt;50ms. Only practical architecture at
                this scale. Also efficient updates - new item = one embedding,
                not full retrain
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Lose: cross-feature interactions. Cannot learn "age 25 + vintage
                = boost" because user/item only meet at dot product
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Cross-encoder alternative: processes [user, item] together
                through shared layers. Can learn specific feature combinations.
                2-5% more accurate but must score every pair
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Use two-tower when: &gt;1M items, need &lt;100ms latency. Skip
                when: &lt;100K items, can afford to score all with cross-encoder
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Production pattern: two-tower retrieves 500-2000 candidates
                (10-20ms) → cross-encoder ranks them (50-100ms) → business rules
                finalize
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Cascade gets best of both: two-tower handles scale,
                cross-encoder handles accuracy, expensive model only runs on
                pre-filtered candidates
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
                When discussing production issues: explain ANN recall
                degradation - a 10% drop in recall@100 can cause 5%+ degradation
                in downstream metrics like CTR, often unnoticed until business
                metrics suffer.
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">2</span>
              <span class="flex-grow-1 Learn_cardContent">
                For cold start handling: describe the pattern of initializing
                new item embeddings from content features (text/image models) to
                enable immediate retrieval before behavioral signals exist.
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">3</span>
              <span class="flex-grow-1 Learn_cardContent">
                When asked about monitoring: mention tracking ANN recall metrics
                against exact search baseline, and alerting when recall drops
                below threshold (typically 85-95%).
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default LessonTwoTowerModelsTradeOffsAndWhenToUseTwoTower;
