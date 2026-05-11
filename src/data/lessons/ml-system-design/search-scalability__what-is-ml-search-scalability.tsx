import type { Component } from "solid-js";

const LessonSearchScalabilityWhatIsMlSearchScalability: Component = () => (
  <div class="lesson-content">
    <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
      <div class="mb-4 p-4">
        <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
          What is ML Search Scalability and Why It Matters
        </h1>
        <div
          class="card-content-area"
          style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
        >
          <div style="padding: 14px 16px; border: 2px solid; border-left: 4px solid; border-radius: 6px; margin: 0">
            <div style="font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px">
              Definition
            </div>
            <div style="font-size: 15px; line-height: 1.5">
              <strong>ML Search Scalability</strong> combines three
              techniques—sharding, caching, and approximate search—to handle
              billions of documents and 100k+ QPS while keeping latency under
              100ms.
            </div>
          </div>
          <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            THE SCALABILITY CHALLENGE
          </p>
          <p style="margin-top: 0">
            A single machine cannot serve production ML search. At 1KB per
            embedding, a billion documents requires 1TB RAM. At 10ms per query,
            one machine handles ~100 QPS. A major platform needs 100k QPS with
            p99 under 50ms. The solution: distribute data (sharding), reduce
            computation (caching), and trade precision for speed (approximate
            search).
          </p>
          <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            THREE PILLARS OF SCALABILITY
          </p>
          <p style="margin-top: 0">
            <strong>Sharding:</strong> Split the index across machines. Each
            shard holds a portion of documents. Queries fan out to all shards,
            results merge. <strong>Caching:</strong> Store frequently accessed
            embeddings and features in memory. Cache hits avoid expensive
            computation. <strong>Approximate search:</strong> Use algorithms
            like HNSW that find 95%+ of true neighbors in 1ms instead of exact
            search taking 100ms+.
          </p>
          <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
            <strong>💡 Key Insight:</strong> These three techniques compound.
            Sharding alone gets you to 10k QPS. Add caching for 50k QPS. Add
            approximate search for 100k+ QPS with sub-50ms latency. You need all
            three at scale.
          </div>
          <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            SCALE NUMBERS TO KNOW
          </p>
          <p style="margin-top: 0">
            Embedding size: 256-1024 floats (1-4KB). Index size at 1B docs:
            1-4TB. Shard count: 20-100 for TB-scale indexes. Cache hit rate
            target: 80-95%. ANN recall target: 95-99%. Query fanout overhead:
            2-5ms per shard tier. Replication factor: 3x for fault tolerance.
          </p>
          <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
            <strong>⚠️ Key Trade-off:</strong> Each technique trades something.
            Sharding adds coordination latency. Caching uses memory and risks
            staleness. Approximate search sacrifices recall. Understand what you
            are giving up.
          </div>
        </div>
        <div
          class="card-diagram"
          style="margin-bottom: 24px; display: flex; justify-content: center"
        >
          <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
            <div style="display: flex; flex-direction: column; gap: 10px">
              <div style="text-align: center; font-weight: bold; margin-bottom: 8px; font-size: 15px">
                Sharding 1B Vectors Across Cluster
              </div>
              <div style="display: flex; gap: 12px; justify-content: center">
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center; flex: 1">
                  <strong style="font-size: 13px">Query Router</strong>
                  <div style="font-size: 11px; margin-top: 4px">120k QPS</div>
                </div>
              </div>
              <div style="font-size: 20px; font-weight: bold; text-align: center">
                ↓ Consistent Hash
              </div>
              <div style="display: flex; gap: 8px; justify-content: center; flex-wrap: wrap">
                <div style="border: 2px solid; padding: 8px 12px; border-radius: 6px; text-align: center; min-width: 90px">
                  <strong style="font-size: 12px">Shard 0</strong>
                  <div style="font-size: 10px; margin-top: 2px">
                    16M vectors
                  </div>
                  <div style="font-size: 10px">250 GB</div>
                </div>
                <div style="border: 2px solid; padding: 8px 12px; border-radius: 6px; text-align: center; min-width: 90px">
                  <strong style="font-size: 12px">Shard 1</strong>
                  <div style="font-size: 10px; margin-top: 2px">
                    16M vectors
                  </div>
                  <div style="font-size: 10px">250 GB</div>
                </div>
                <div style="border: 2px solid; padding: 8px 12px; border-radius: 6px; text-align: center; min-width: 90px">
                  <strong style="font-size: 12px">...</strong>
                  <div style="font-size: 10px; margin-top: 2px">60 shards</div>
                </div>
                <div style="border: 2px solid; padding: 8px 12px; border-radius: 6px; text-align: center; min-width: 90px">
                  <strong style="font-size: 12px">Shard 59</strong>
                  <div style="font-size: 10px; margin-top: 2px">
                    16M vectors
                  </div>
                  <div style="font-size: 10px">250 GB</div>
                </div>
              </div>
              <div style="margin-top: 8px; padding: 8px; border: 2px solid; border-radius: 6px; font-size: 11px; text-align: center">
                <strong>Each query hits ~16 shards</strong> to limit tail
                latency amplification
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
                Scalability combines sharding (distribute data), caching (reduce
                computation), and approximate search (trade precision for speed)
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Single machine limit: 1TB RAM for 1B embeddings, ~100 QPS at
                10ms per query
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                All three techniques compound—you need all at scale for 100k+
                QPS
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
                Start with the three pillars when asked about scaling search
                systems
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">2</span>
              <span class="flex-grow-1 Learn_cardContent">
                Mention concrete numbers: 1B docs = 1TB, target 80-95% cache hit
                rate
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default LessonSearchScalabilityWhatIsMlSearchScalability;
