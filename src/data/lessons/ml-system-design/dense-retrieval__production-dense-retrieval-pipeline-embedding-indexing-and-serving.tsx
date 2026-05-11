import type { Component } from "solid-js";

const LessonDenseRetrievalProductionDenseRetrievalPipelineEmbeddingIndexingAndServing: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Production Dense Retrieval Pipeline: Embedding, Indexing, and
            Serving
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 0; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Offline Indexing Pipeline
            </p>
            <p style="margin-top: 0">
              Step 1: Encode all documents into embeddings using the document
              encoder. For 10M documents at 768 dimensions, this produces ~30GB
              of float32 vectors. Processing at 100 docs/second takes ~28 hours
              on a single GPU; parallelize across multiple GPUs or machines.
              Step 2: Build an ANN (Approximate Nearest Neighbor) index for fast
              retrieval. HNSW indices offer best accuracy (95-99% recall); IVF
              indices offer better memory efficiency. Step 3: Deploy index to
              serving infrastructure with health checks and fallback to stale
              index on failures.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Online Serving Pipeline
            </p>
            <p style="margin-top: 0">
              At query time: encode query with query encoder (10-50ms depending
              on model size), search ANN index for top-K candidates (1-10ms),
              optionally re-rank with a cross-encoder for higher precision.
              Total latency: 20-100ms depending on model size and index
              configuration. Throughput: 100-1000 QPS per replica. GPU encoding
              is faster but more expensive; CPU works for lower-traffic
              applications. Cache frequent query embeddings to skip encoding.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Index Update Strategies
            </p>
            <p style="margin-top: 0">
              <strong>Full rebuild:</strong> Re-encode all documents, rebuild
              index from scratch. Simple but slow (hours). Good for daily or
              weekly updates. <strong>Incremental:</strong> Add new document
              embeddings to existing index without full rebuild. Faster but
              index quality degrades over time; periodic full rebuilds needed.{" "}
              <strong>Streaming:</strong> Real-time updates with specialized
              indices. Higher complexity but enables minute-level freshness for
              time-sensitive content.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Scaling:</strong> Shard the index across machines. Each
              shard handles a subset of documents. Query broadcasts to all
              shards, results merge and re-rank. Sharding enables horizontal
              scaling to billions of documents.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Query Encoding: 2 to 5ms (GPU batched)
                  </strong>
                </div>
                <div style="text-align: center; font-size: 20px; font-weight: bold">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    ANN Search (10 shards parallel): 5 to 20ms
                    <br />
                    Retrieve top 100 per shard = 1000 total
                  </strong>
                </div>
                <div style="text-align: center; font-size: 20px; font-weight: bold">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Merge &amp; Deduplicate: 5 to 10ms
                    <br />
                    Top 200 candidates
                  </strong>
                </div>
                <div style="text-align: center; font-size: 20px; font-weight: bold">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Cross Encoder Re-rank: 20 to 80ms
                    <br />
                    Score top 50 to 200, return top 20
                  </strong>
                </div>
                <div style="margin-top: 6px; padding: 10px; border: 2px solid; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Total P95 Latency: &lt;150ms
                  </strong>
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
                  Offline: encode documents → build ANN index (HNSW 95-99%
                  recall, IVF for memory); hours for large corpora
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  10M docs at 768 dims = ~30GB vectors; 100 docs/sec means ~28
                  hours on single GPU
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Online: encode query (10-50ms) → ANN search (1-10ms) →
                  optional cross-encoder re-rank
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Update strategies: full rebuild (daily), incremental
                  (degrades), streaming (minute-level freshness)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Shard index across machines for horizontal scaling to billions
                  of documents
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
                  Give specific latency breakdown (encode 10-50ms, search
                  1-10ms) for production credibility
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mention index size calculation (10M × 768 dims = 30GB) to show
                  capacity planning ability
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Describe three update strategies (rebuild, incremental,
                  streaming) with trade-offs
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonDenseRetrievalProductionDenseRetrievalPipelineEmbeddingIndexingAndServing;
