import type { Component } from "solid-js";

const LessonSearchScalabilityApproximateNearestNeighborHnswIvfPq: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Approximate Nearest Neighbor: HNSW vs IVF-PQ
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
                <strong>Approximate Nearest Neighbor (ANN)</strong> finds
                similar vectors without comparing every item—sacrificing some
                accuracy (95% recall) for speed (1ms vs 100ms+ for exact
                search).
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              WHY APPROXIMATE SEARCH
            </p>
            <p style="margin-top: 0">
              Exact search compares query against every vector. At 1B vectors,
              1μs per comparison = 1000 seconds. ANN algorithms build index
              structures eliminating most comparisons. HNSW and IVF-PQ are the
              two dominant approaches with different trade-offs.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              HNSW: GRAPH-BASED SEARCH
            </p>
            <p style="margin-top: 0">
              HNSW builds a multi-layer graph. Top layers have few nodes with
              long-range connections; bottom has all nodes with local
              connections. Search navigates top to bottom. Query: 1-10ms at
              billion scale. Memory: full vectors (1-4KB each). Best for: low
              latency, high recall.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Key Insight:</strong> HNSW has best latency-recall
              trade-off but needs full vectors in memory. At 1B × 1KB = 1TB RAM.
              For memory-constrained systems, use IVF-PQ.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              IVF-PQ: QUANTIZED SEARCH
            </p>
            <p style="margin-top: 0">
              IVF clusters vectors, searches relevant clusters only. PQ
              compresses vectors from 1KB to 64 bytes. Combined: search subset
              of compressed vectors. Query: 5-50ms. Memory: 16-64x less than
              HNSW. Best for: memory efficiency, acceptable latency trade-off.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              CHOOSING BETWEEN THEM
            </p>
            <p style="margin-top: 0">
              HNSW: latency critical (&lt;5ms), memory available, recall
              &gt;98%. IVF-PQ: memory constrained, 20-50ms acceptable, 90-95%
              recall OK. Hybrid: HNSW for hot data, IVF-PQ for cold.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Key Trade-off:</strong> HNSW: fast + accurate but
              expensive (memory). IVF-PQ: cheap but slower + less accurate.
              Choose based on constraints.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 540px">
              <div style="display: flex; flex-direction: column; gap: 14px">
                <div style="text-align: center; font-weight: bold; margin-bottom: 4px; font-size: 15px">
                  HNSW vs IVF-PQ for 1B Vectors
                </div>
                <div style="display: flex; gap: 12px">
                  <div style="border: 2px solid; padding: 12px; border-radius: 6px; flex: 1">
                    <strong style="font-size: 13px; display: block; margin-bottom: 6px">
                      HNSW
                    </strong>
                    <div style="font-size: 11px; line-height: 1.5">
                      <strong>Memory:</strong> 500-700 GB
                      <br />
                      <strong>Latency:</strong> 5-10 ms CPU
                      <br />
                      <strong>Recall:</strong> 0.95-0.98
                      <br />
                      <strong>Scale:</strong> 100M-500M
                      <br />
                      <strong>Cost:</strong> High memory
                    </div>
                  </div>
                  <div style="border: 2px solid; padding: 12px; border-radius: 6px; flex: 1">
                    <strong style="font-size: 13px; display: block; margin-bottom: 6px">
                      IVF-PQ
                    </strong>
                    <div style="font-size: 11px; line-height: 1.5">
                      <strong>Memory:</strong> 16-30 GB
                      <br />
                      <strong>Latency:</strong> 15-20 ms CPU
                      <br />
                      <strong>Recall:</strong> 0.88-0.92
                      <br />
                      <strong>Scale:</strong> 1B+
                      <br />
                      <strong>Cost:</strong> Low memory
                    </div>
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 12px; display: block; margin-bottom: 4px">
                    Compression: 512 bytes → 16 bytes per vector
                  </strong>
                  <div style="font-size: 11px">
                    128 dims × 4 bytes → 16 subvectors × 1 byte code
                  </div>
                </div>
                <div style="text-align: center; font-size: 11px; padding: 8px; border: 2px solid; border-radius: 6px">
                  GPU acceleration: <strong>5-10× faster</strong> for both,
                  favors IVF-PQ batching
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
                  HNSW: graph-based, 1-10ms, needs full vectors in memory (1TB
                  for 1B)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  IVF-PQ: quantized, 5-50ms, 16-64x less memory than HNSW
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  HNSW for latency-critical; IVF-PQ for memory-constrained
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
                  Compare HNSW vs IVF-PQ with memory and latency numbers
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Suggest hybrid: HNSW for hot data, IVF-PQ for cold
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonSearchScalabilityApproximateNearestNeighborHnswIvfPq;
