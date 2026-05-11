import type { Component } from "solid-js";

const LessonRealtimeEmbeddingUpdatesHotIndexPlusMainIndexArchitecture: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Hot Index Plus Main Index Architecture
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              THE TWO-INDEX ARCHITECTURE
            </p>
            <p>
              The most common solution for real-time updates is maintaining two
              indexes: a small, frequently-updated "hot" index for recent items,
              and a large, optimized "main" index for historical data. Queries
              search both and merge results.
            </p>
            <p>
              <strong>Hot index:</strong> Small (10K-1M vectors), updated in
              real-time or near-real-time. Built for fast inserts, not maximum
              recall. Uses simpler structures (flat index or small HNSW).
              Accepts slightly lower search quality for insert speed.
            </p>
            <p>
              <strong>Main index:</strong> Large (10M-1B vectors), rebuilt
              periodically (daily or weekly). Optimized for search quality and
              throughput. Uses full IVF-PQ or HNSW with careful parameter
              tuning.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              QUERY FLOW
            </p>
            <p>
              When a query arrives, search both indexes in parallel. The hot
              index returns top-K recent items. The main index returns top-K
              historical items. An aggregator merges both result sets by
              distance score and returns the final top-K.
            </p>
            <p>
              Latency impact: if hot index search takes 5ms and main index takes
              20ms, total query latency is ~20ms (parallel execution). The small
              hot index adds minimal overhead.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              MERGE CYCLES
            </p>
            <p>
              Periodically (every few hours to daily), merge hot index contents
              into main index. This involves: extracting vectors from hot index,
              adding them to main index training data, rebuilding main index,
              and clearing the hot index.
            </p>
            <p>
              During merge, traffic continues to the old main index while the
              new one builds. Once ready, atomically swap traffic to the new
              main index. This ensures zero-downtime updates.
            </p>
            <p>
              Merge frequency trade-off: more frequent merges keep main index
              fresher but increase compute cost. Daily merges work for most
              cases. High-velocity systems (1M+ new vectors/day) may need 4-6
              hour cycles.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Key Trade-off:</strong> Hot index size matters. Too
              small: frequent merges needed. Too large: hot index search
              degrades. Sweet spot is usually 1-5% of main index size.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 540px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="display: flex; gap: 12px; justify-content: center">
                  <div style="border: 2px solid; padding: 12px; border-radius: 6px; flex: 1; max-width: 240px">
                    <strong style="font-size: 14px">Hot Index</strong>
                    <div style="font-size: 12px; margin-top: 6px">
                      1M to 10M items
                    </div>
                    <div style="font-size: 12px">Last 24 to 72 hours</div>
                    <div style="font-size: 12px">Refresh: 1 to 2 sec</div>
                    <div style="font-size: 12px">Memory: 4 to 20 GB</div>
                  </div>
                  <div style="border: 2px solid; padding: 12px; border-radius: 6px; flex: 1; max-width: 240px">
                    <strong style="font-size: 14px">Main Index</strong>
                    <div style="font-size: 12px; margin-top: 6px">
                      50M to 500M items
                    </div>
                    <div style="font-size: 12px">Older content</div>
                    <div style="font-size: 12px">Rebuild: daily</div>
                    <div style="font-size: 12px">Storage: SSD</div>
                  </div>
                </div>
                <div style="text-align: center; font-size: 20px; font-weight: bold">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 14px">Query Merges Results</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Fetch top k from each, deduplicate by version, rerank
                  </div>
                  <div style="font-size: 12px">
                    Total budget: 80ms retrieval + 20ms rerank
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
                  Hot index (10K-1M vectors): fast inserts, updated real-time;
                  Main index (10M-1B): optimized for search, rebuilt
                  periodically
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Query flow: search both indexes in parallel, merge results by
                  distance score, return global top-K
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Merge frequency trade-off: more frequent = fresher main index
                  but higher compute cost
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
                  Interview Tip: Draw the two-index architecture with query
                  flow—show parallel search and result merging.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Explain the merge process including atomic
                  swaps for zero-downtime updates.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonRealtimeEmbeddingUpdatesHotIndexPlusMainIndexArchitecture;
