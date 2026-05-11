import type { Component } from "solid-js";

const LessonRealtimeEmbeddingUpdatesDynamicVectorIndexesForContinuousUpdates: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Dynamic Vector Indexes for Continuous Updates
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              WHY STANDARD INDEXES STRUGGLE
            </p>
            <p>
              Standard vector indexes (IVF, HNSW) are built assuming data is
              static. IVF pre-computes cluster centroids from training data.
              When new vectors arrive with different distributions, existing
              centroids may poorly represent them. HNSW builds a fixed graph
              structure that becomes suboptimal as the data distribution shifts.
            </p>
            <p>
              For indexes handling 10K+ inserts per hour, these limitations
              become painful. Recall degrades 5-15% over weeks as the index
              drifts from optimal structure. Periodic rebuilds restore quality
              but create the freshness gap problem.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              DYNAMIC INDEX APPROACHES
            </p>
            <p>
              <strong>Mutable HNSW:</strong> Standard HNSW with in-place
              insertions. New nodes connect to existing graph neighbors. Works
              reasonably well for small update rates (&lt;1% of index size per
              day). Graph quality degrades with high update rates.
            </p>
            <p>
              <strong>Tiered indexes:</strong> Multiple HNSW indexes at
              different sizes. New vectors go to smallest tier. When tier fills,
              merge into next larger tier. Similar to LSM-tree design in
              databases. Balances insert speed and search quality.
            </p>
            <p>
              <strong>Streaming IVF:</strong> IVF index with dynamic centroid
              updates. Periodically retrain centroids on recent data. Requires
              balancing centroid stability (for routing consistency) against
              adaptation to data drift.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              IMPLEMENTATION COMPLEXITY
            </p>
            <p>
              Dynamic indexes add significant complexity. You need: concurrent
              insert/search handling (readers-writer locks or lock-free
              structures), memory management for growing indexes, background
              compaction without blocking queries, and monitoring for quality
              degradation.
            </p>
            <p>
              Most production systems choose simpler hot+main architecture over
              complex dynamic indexes. The operational overhead of dynamic
              indexes often exceeds the benefit unless freshness requirements
              are extreme (sub-minute).
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>When To Use:</strong> Dynamic indexes make sense for
              sub-minute freshness with high update rates. For minute-to-hour
              freshness, hot+main architecture is simpler and sufficient.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="text-align: center; font-weight: bold; font-size: 14px; margin-bottom: 4px">
                  HNSW Graph Insert Flow
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong>New Vector Arrives</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    768 dim embedding
                  </div>
                </div>
                <div style="text-align: center; font-size: 18px; font-weight: bold">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong>Find k Nearest Neighbors</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Graph traversal: 5 to 20ms
                  </div>
                </div>
                <div style="text-align: center; font-size: 18px; font-weight: bold">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong>Add Bidirectional Edges</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Connect to M=16 neighbors
                  </div>
                  <div style="font-size: 12px">Prune long range links</div>
                </div>
                <div style="text-align: center; font-size: 18px; font-weight: bold">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong>Queryable Immediately</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Total insert: 10 to 50ms
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
                  Standard IVF/HNSW assume static data—centroids and graph
                  structures become suboptimal as data distribution shifts
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Dynamic approaches: mutable HNSW, tiered indexes (LSM-style),
                  streaming IVF with adaptive centroids
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Hot+main architecture is simpler for most cases; dynamic
                  indexes only for sub-minute freshness requirements
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
                  Interview Tip: Explain WHY standard indexes struggle with
                  updates—pre-computed structures assume static distributions.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Compare tiered indexes to LSM-trees in
                  databases to show cross-domain knowledge.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonRealtimeEmbeddingUpdatesDynamicVectorIndexesForContinuousUpdates;
