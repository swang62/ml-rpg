import type { Component } from "solid-js";

const LessonApproximateNearestNeighborsHnswGraphBasedProximitySearch: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            HNSW: Graph Based Proximity Search
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              WHAT IS HNSW
            </p>
            <p>
              Hierarchical Navigable Small World (HNSW) organizes vectors into a
              multi-layer graph structure. Each vector is a node; edges connect
              nearby vectors. The hierarchy resembles a skip list: top layers
              have sparse long-range connections for fast navigation, bottom
              layers have dense local connections for precision.
            </p>
            <p>
              Search starts at a fixed entry point in the highest layer. From
              there, greedily walk toward the query by always moving to the
              neighbor closest to the query. When no closer neighbor exists,
              drop to the next layer and repeat. The bottom layer search finds
              the final candidates.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              HOW THE HIERARCHY WORKS
            </p>
            <p>
              Layer 0 (bottom) contains all vectors with dense
              connections—typically 32-64 edges per node. Higher layers contain
              exponentially fewer nodes, each with long-range connections
              spanning the embedding space.
            </p>
            <p>
              Example: 1M vectors. Layer 0 has 1M nodes. Layer 1 has ~100K.
              Layer 2 has ~10K. Layer 3 has ~1K. Search in top layers crosses
              large distances quickly (100 hops might traverse the whole space).
              Final search in layer 0 refines to exact local neighborhood.
            </p>
            <p>
              The probability of a node appearing in layer L is{" "}
              <code style="padding: 2px 6px; border-radius: 3px; font-family: monospace">
                p^L
              </code>{" "}
              where p is typically 1/M (M is the connectivity parameter). M=16
              means ~6% of nodes appear in layer 1, ~0.4% in layer 2.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              KEY PARAMETERS
            </p>
            <p>
              <strong>M (max connections per node):</strong> Higher M = better
              recall but more memory and slower construction. Typical values:
              16-64. Each doubling of M roughly doubles index size.
            </p>
            <p>
              <strong>efConstruction:</strong> How many candidates to consider
              when building the graph. Higher = better graph quality but slower
              indexing. Range: 100-500. Use higher values for one-time offline
              builds.
            </p>
            <p>
              <strong>efSearch:</strong> How many candidates to explore at query
              time. Higher = better recall but higher latency. Start at 64, tune
              up until recall target is met. This is your primary latency-recall
              knob.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              PERFORMANCE CHARACTERISTICS
            </p>
            <p>
              Memory: ~4 bytes per dimension + M × 4 bytes per link × layers.
              For 768-dim vectors with M=16, expect ~4KB per vector total. 1M
              vectors = 4GB index.
            </p>
            <p>
              Latency: 1-5ms for top-10 at recall 0.95 on 1M vectors. Scales as
              O(log N) with dataset size.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>✅ Best Practice:</strong> HNSW excels when you have RAM
              to spare and need low latency with high recall. It is the default
              choice for in-memory vector search. Trade-off: index build is slow
              (hours for 100M vectors) and updates are expensive.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 480px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <div style="font-weight: bold; margin-bottom: 6px">
                    Layer 2 (sparse)
                  </div>
                  <div style="font-size: 13px">Entry → Node A (long jumps)</div>
                </div>
                <div style="text-align: center; font-size: 20px; font-weight: bold">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <div style="font-weight: bold; margin-bottom: 6px">
                    Layer 1 (medium)
                  </div>
                  <div style="font-size: 13px">Node A → Node B → Node C</div>
                </div>
                <div style="text-align: center; font-size: 20px; font-weight: bold">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <div style="font-weight: bold; margin-bottom: 6px">
                    Layer 0 (dense, all vectors)
                  </div>
                  <div style="font-size: 13px">
                    Greedy walk collects efSearch=200 candidates
                  </div>
                </div>
              </div>
              <div style="margin-top: 12px; padding: 8px; border: 2px solid; border-radius: 6px; text-align: center; font-size: 12px">
                <strong>
                  M=16 neighbors per node, efSearch controls recall vs latency
                </strong>
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
                  HNSW uses multi-layer graph: sparse long-range connections at
                  top, dense local connections at bottom
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Search is greedy descent: start at top layer, walk toward
                  query, drop layers until bottom
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Key parameters: M (connections), efConstruction (build
                  quality), efSearch (recall-latency knob)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Memory: ~4KB per 768-dim vector with M=16. Latency: 1-5ms for
                  recall 0.95 on 1M vectors
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
                  Interview Tip: Explain the layer hierarchy with concrete
                  numbers—1M vectors, layers 0-3, node distribution.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Describe the efSearch parameter as the primary
                  tuning knob for recall vs latency tradeoff.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonApproximateNearestNeighborsHnswGraphBasedProximitySearch;
