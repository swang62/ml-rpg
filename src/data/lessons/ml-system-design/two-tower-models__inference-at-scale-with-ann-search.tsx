import type { Component } from "solid-js";

const LessonTwoTowerModelsInferenceAtScaleWithAnnSearch: Component = () => (
  <div class="lesson-content">
    <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
      <div class="mb-4 p-4">
        <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
          Inference at Scale with ANN Search
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
              At inference time, compute the user embedding once (1-5ms), then
              use Approximate Nearest Neighbor (ANN) search to find the top 1000
              items from millions (5-10ms). Total retrieval: under 20ms. The
              key: item embeddings are pre-computed and indexed offline.
            </div>
          </div>
          <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            Building The Item Index
          </p>
          <p style="margin-top: 0">
            After training, run the item tower on every item in the catalog. A
            catalog of 10 million items takes 10-30 minutes on a single GPU.
            Store these vectors in an ANN index. Popular choices: HNSW
            (Hierarchical Navigable Small World) graphs, IVF (Inverted File)
            with product quantization, or ScaNN from Google.
          </p>
          <p>
            HNSW builds a graph where each vector connects to its approximate
            neighbors. To query, start at a random entry point and greedily
            navigate toward the query vector. With proper tuning, HNSW finds 95%
            of true top-100 neighbors while scanning only 0.1% of the index.
            Memory overhead is 1.5-2x the vector storage. For 10M items with
            128-dimension vectors (5GB), the index needs 7-10GB RAM.
          </p>
          <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            Request Time Flow
          </p>
          <p style="margin-top: 0">
            When a user requests recommendations: (1) Gather user features from
            the feature store including real-time session data. (2) Run the user
            tower to get their embedding (1-5ms on GPU, 5-15ms on CPU). (3)
            Query the ANN index to retrieve top-K candidates (5-10ms for
            K=1000). (4) Return candidates to the ranking stage.
          </p>
          <p>
            The user tower runs on fresh data every request. If the user just
            clicked an item, that click immediately influences their embedding.
            This enables real-time personalization without reindexing. The item
            index updates in batch: hourly for high-churn catalogs, daily for
            stable catalogs. New items get indexed immediately via incremental
            addition to HNSW.
          </p>
          <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            Scaling To Billions
          </p>
          <p style="margin-top: 0">
            For catalogs exceeding 100 million items, single-node ANN becomes
            impractical. Solutions: (1) Shard the index across multiple
            machines, query all shards in parallel, merge results. (2) Use a
            coarse filter first (category, availability) to reduce candidates
            before ANN search. (3) Use product quantization (PQ) to compress
            vectors: 128 dimensions become 16 bytes instead of 512, enabling 32x
            more items per machine.
          </p>
          <p>
            PQ introduces recall loss: instead of 95% recall, you might get 85%.
            The trade-off is worth it at scale. A billion items with PQ fits in
            16GB RAM versus 500GB without compression. Query latency stays under
            10ms because compressed vectors mean better cache utilization.
          </p>
          <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
            <strong>✅ Design Principle:</strong> Pre-filter before ANN search
            whenever possible. Geographic availability, category constraints,
            and stock status can reduce candidates by 10-100x before vector
            search. This simultaneously improves latency and relevance. A common
            interview follow-up: "How do you handle filters that change often?"
            Answer: maintain multiple filtered indexes for common filter
            combinations, or use metadata filtering during ANN search.
          </div>
        </div>
        <div class="Learn_keyTakeaways p-4 mb-4">
          <div class="Learn_keyTakeawaysHeader mb-3 pb-3">💡 Key Takeaways</div>
          <div class="d-flex flex-column gap-2">
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Serving: compute user embedding (1-10ms) then ANN search over
                pre-indexed items (5-15ms). Total retrieval under 50ms for 100M+
                items
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Exact search on 100M items at 128 dims = 12.8B operations per
                query = seconds. ANN achieves milliseconds by narrowing
                candidates via clever data structures
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                HNSW: graph where nodes connect to similar nodes, navigate in
                log time. IVF: cluster items, search only nearby clusters. Both
                trade small accuracy for huge speedup
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                ANN recall: fraction of true top-k in ANN results. 90% recall =
                find 90 of best 100. Raising recall from 85% to 95% might double
                latency from 5ms to 10ms
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Memory: 200M items × 128 dims × 4 bytes = 102 GB raw. Index
                overhead adds 20-100%. 8-bit quantization reduces 4x with ~1-2%
                quality loss
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Sharding: query fans out to all shards, each returns top-k,
                results merge. Latency = slowest shard + merge time. Typical
                shard holds 10-50M items
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
                When asked what goes into user tower: mention recent
                interactions (last 10-50 items), session context (device, time,
                location), and precomputed user segments or embeddings.
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">2</span>
              <span class="flex-grow-1 Learn_cardContent">
                For item tower features: explain the mix of content (text,
                images, categories) and behavioral (popularity, engagement
                rates) signals that enable cold start handling.
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">3</span>
              <span class="flex-grow-1 Learn_cardContent">
                When discussing updates: explain that item embeddings are
                batch-updated (daily/hourly) while user context is computed
                online per request for freshness.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default LessonTwoTowerModelsInferenceAtScaleWithAnnSearch;
