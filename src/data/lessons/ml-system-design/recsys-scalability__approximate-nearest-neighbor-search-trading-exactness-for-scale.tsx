import type { Component } from "solid-js";

const LessonRecsysScalabilityApproximateNearestNeighborSearchTradingExactnessForScale: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Approximate Nearest Neighbor Search: Trading Exactness for Scale
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
                <strong>Approximate Nearest Neighbor (ANN)</strong> search finds
                the most similar items to a query by trading a small amount of
                accuracy for massive speed gains. Instead of comparing against
                every item (exact search), it uses clever data structures to
                find 95% or more of the true nearest neighbors in milliseconds.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              THE PROBLEM WITH EXACT SEARCH
            </p>
            <p style="margin-top: 0">
              Each item is represented as a vector (a list of numbers, typically
              64 to 256 dimensions). To find similar items, compute the distance
              between the query vector and every item vector. With 100 million
              items and 128 dimensions, that is 12.8 billion floating point
              operations per query. At 10 GFLOPS per core, one query takes 1.3
              seconds. Users expect results in 50 milliseconds. Exact search is
              fundamentally too slow at scale.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              HOW ANN WORKS
            </p>
            <p style="margin-top: 0">
              ANN algorithms build index structures during an offline phase. At
              query time, they navigate these structures to quickly find
              candidate regions likely to contain nearest neighbors. Instead of
              checking 100 million items, they check perhaps 10,000. The index
              structure trades preprocessing time and memory for query speed.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Key Insight:</strong> ANN is not a single algorithm. It
              is a family of techniques: tree based, graph based, hash based,
              and quantization based. Each has different trade-offs for memory,
              speed, and accuracy.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              RECALL AS THE QUALITY METRIC
            </p>
            <p style="margin-top: 0">
              ANN quality is measured by recall at k: what fraction of the true
              k nearest neighbors does the algorithm find? Recall of 0.95 means
              95 of 100 true neighbors are returned. Most applications tolerate
              95% recall for 100x speed improvement.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="display: flex; gap: 12px; align-items: center">
                  <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; flex: 1; text-align: center">
                    <strong style="font-size: 13px">Exhaustive Search</strong>
                    <div style="margin-top: 8px; font-size: 12px">
                      100M comparisons
                      <br />
                      ~5000ms latency
                      <br />
                      100% recall
                    </div>
                  </div>
                  <div style="font-size: 24px; font-weight: bold">vs</div>
                  <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; flex: 1; text-align: center">
                    <strong style="font-size: 13px">ANN Search</strong>
                    <div style="margin-top: 8px; font-size: 12px">
                      ~10K comparisons
                      <br />
                      ~10ms latency
                      <br />
                      95% recall
                    </div>
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 12px">
                    Trade off: 5% accuracy for 500× speedup
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
                  Exact search over 100M 128-dim vectors takes 1.3 seconds per
                  query - fundamentally too slow
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  ANN trades accuracy (finding 95% of true neighbors) for speed
                  (milliseconds instead of seconds)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Index structures precompute organization offline, enabling
                  fast query-time navigation
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Recall@k measures quality: 0.95 means 95 of 100 true neighbors
                  found, acceptable for most uses
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  ANN families: tree-based, graph-based, hash-based,
                  quantization-based with different trade-offs
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
                  Walk through the math: 100M items × 128 dims = 12.8B FLOPs =
                  1.3 seconds at 10 GFLOPS
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Explain recall: returning 95 of 100 true neighbors is usually
                  acceptable for recommendations
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Discuss the trade-off: 100x speedup for 5% accuracy loss is a
                  worthwhile trade in most systems
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonRecsysScalabilityApproximateNearestNeighborSearchTradingExactnessForScale;
