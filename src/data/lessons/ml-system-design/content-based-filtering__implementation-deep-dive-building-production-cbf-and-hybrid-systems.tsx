import type { Component } from "solid-js";

const LessonContentBasedFilteringImplementationDeepDiveBuildingProductionCbfAndHybridSystems: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Implementation Deep Dive: Building Production CBF and Hybrid Systems
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
                Building content-based systems in production requires careful
                feature engineering, efficient indexing, and real-time profile
                updates. This card covers practical implementation patterns.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Content Feature Engineering
            </p>
            <p style="margin-top: 0">
              <strong>Text features:</strong> Use pretrained language models
              (BERT, sentence transformers) to embed titles, descriptions, and
              reviews. Typical dimension: 384-768. Compute once per item, store
              in feature store.
            </p>
            <p>
              <strong>Categorical features:</strong> Embed categories, brands,
              and tags. Use learned embeddings (32-64 dimensions) trained on
              click data. Multiple categories become averaged or concatenated
              embeddings.
            </p>
            <p>
              <strong>Image features:</strong> Use pretrained vision models
              (ResNet, CLIP) to extract visual embeddings from product images.
              Useful for fashion, furniture, and visual search.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              User Profile Updates
            </p>
            <p style="margin-top: 0">
              User profiles must update in near real-time. If user clicks an
              item, that item features should influence their profile within
              seconds. Common pattern: maintain a sliding window of recent
              interactions (last 50 items) and compute profile as weighted
              average of their embeddings. Weight by recency: items from today
              get 2x weight versus items from last week.
            </p>
            <p>
              Store profiles in a fast key-value store (Redis, Memcached).
              Profile update is a write on every interaction. Profile read is on
              every recommendation request. Size per user: typically 512-2048
              bytes for embedding plus metadata.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Key Insight:</strong> Content features are expensive to
              compute but cheap to serve. Precompute item embeddings in batch.
              User profile updates are cheap (averaging) but must be fast.
              Design your system around these asymmetries.
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
                  Offline: extract multi modal features, train CF on
                  interactions, build ANN indices with quantization (100M items
                  at 256 dims drops from 102 GB float32 to under 10 to 20 GB
                  with product quantization), recompute daily with streaming hot
                  updates
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Online: construct user profile as recency weighted sum with 7
                  to 14 day exponential decay and interaction weights, retrieve
                  from multiple indices (CBF top 500 to 5,000, CF top 1,000 to
                  10,000) in 5 to 30ms P95 each
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Re rank 200 to 1,000 merged candidates with learned ranker
                  using similarity scores, recency, popularity, diversity
                  features in 50 to 150ms P95, then apply post rank constraints
                  for policy, safety, deduplication
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Weighted blending learns context conditional weights via
                  calibration models refreshed weekly: Score = w_cf × s_cf +
                  w_cb × s_cb + w_pop × s_pop, with higher content weight for
                  new items and CF weight for established
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Evaluation combines offline metrics (Recall at k and NDCG at k
                  for cold start slices) with online A/B tests (click through,
                  watch time, conversion) plus guardrails (diversity, latency
                  P95 and P99, policy violations)
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
                  For system design: draw the full hybrid pipeline - parallel
                  retrieval paths, score normalization (z-score or rank-based),
                  blending with learned or tuned weights, then unified ranking.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  When asked about diversity: explain MMR (maximal marginal
                  relevance) in re-ranking - balance relevance with
                  dissimilarity to already-selected items to prevent filter
                  bubbles.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  For A/B testing discussion: mention that hybrid weight tuning
                  requires careful metric selection - optimizing clicks may hurt
                  diversity; track multiple engagement depths.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonContentBasedFilteringImplementationDeepDiveBuildingProductionCbfAndHybridSystems;
