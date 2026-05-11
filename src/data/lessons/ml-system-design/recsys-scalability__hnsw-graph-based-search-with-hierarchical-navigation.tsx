import type { Component } from "solid-js";

const LessonRecsysScalabilityHnswGraphBasedSearchWithHierarchicalNavigation: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            HNSW: Graph Based Search with Hierarchical Navigation
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              WHAT IS HNSW
            </p>
            <p style="margin-top: 0">
              Hierarchical Navigable Small World (HNSW) is a graph based ANN
              algorithm. Each vector becomes a node in a graph, connected to its
              nearest neighbors. To find neighbors for a query, you start at a
              random node and greedily move to the neighbor closest to the
              query, repeating until you reach a local minimum. The hierarchical
              part adds skip connections: upper layers have fewer nodes but
              longer jumps, like express trains that skip local stops.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              HOW THE GRAPH IS BUILT
            </p>
            <p style="margin-top: 0">
              Insert each vector one at a time. For each new vector, find its
              nearest neighbors in the existing graph and connect to them. The
              number of connections per node (M parameter) controls graph
              density: M=16 means each node connects to 16 neighbors. Higher M
              increases recall but uses more memory. The construction algorithm
              assigns nodes to layers probabilistically, with most nodes only in
              the bottom layer and few in upper layers.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              QUERY ALGORITHM
            </p>
            <p style="margin-top: 0">
              Start at a fixed entry point in the top layer. Greedily descend:
              at each layer, find the closest node to the query by checking
              neighbors, then move to the next layer down from that node. At the
              bottom layer, do a more thorough search by checking ef (expansion
              factor) candidates. Higher ef increases recall but slows queries.
              Typical values: ef=50 for 95% recall, ef=200 for 99% recall.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Trade-off:</strong> HNSW offers excellent query speed
              (sub-millisecond for millions of vectors) but requires all vectors
              in RAM. Memory usage is high: 128 dim × 4 bytes × 100M vectors =
              51 GB just for vectors, plus graph structure.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              WHEN TO USE HNSW
            </p>
            <p style="margin-top: 0">
              HNSW is best when you need very low latency (under 5ms), data fits
              in RAM (up to a few hundred million vectors), and you can afford
              the memory cost. It is the default choice for most recommendation
              and semantic search systems at moderate scale.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 480px">
              <div style="display: flex; flex-direction: column; gap: 8px">
                <div style="border: 2px solid; padding: 8px 12px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 12px">
                    Layer 2 (sparse): 4 nodes, long jumps
                  </strong>
                </div>
                <div style="font-size: 20px; text-align: center; font-weight: bold">
                  ↓ Descend
                </div>
                <div style="border: 2px solid; padding: 8px 12px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 12px">
                    Layer 1 (medium): 40 nodes, M=16 edges
                  </strong>
                </div>
                <div style="font-size: 20px; text-align: center; font-weight: bold">
                  ↓ Refine
                </div>
                <div style="border: 2px solid; padding: 8px 12px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 12px">
                    Layer 0 (dense): all 100M nodes, fine navigation
                  </strong>
                </div>
                <div style="margin-top: 8px; padding: 8px; border-radius: 4px; text-align: center; font-size: 11px">
                  <strong>Query path:</strong> Start top → greedy follow best
                  edge each layer → arrive at nearest neighbors bottom
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
                  Graph-based: each vector is a node connected to M nearest
                  neighbors (typically M=16)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Hierarchical layers: upper layers have fewer nodes but longer
                  jumps for fast initial navigation
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Query: start at top layer entry point, greedily descend,
                  thorough search at bottom with ef candidates
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  ef=50 gives 95% recall, ef=200 gives 99% recall; higher ef
                  means slower but more accurate
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Memory intensive: 100M 128-dim vectors = 51 GB just for
                  vectors, plus graph overhead
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
                  Explain the hierarchy: express train (top layers) to local
                  stops (bottom layer)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Walk through a query: entry point → greedy descent → thorough
                  bottom-layer search
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Discuss memory: 100M vectors × 128 dims × 4 bytes = 51 GB
                  minimum
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonRecsysScalabilityHnswGraphBasedSearchWithHierarchicalNavigation;
