import type { Component } from "solid-js";

const LessonSemanticSearchNlpWhyApproximateNearestNeighborAnnAndCoreAlgorithmFamilies: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Why Approximate Nearest Neighbor (ANN) and Core Algorithm Families
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 0; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Scaling Problem
            </p>
            <p style="margin-top: 0">
              Finding exact nearest neighbors requires comparing the query
              against every vector. With 1 million documents at 768 dimensions,
              that is 768 million floating point operations per query. At 10
              queries per second, you need 7.68 billion ops/sec just for
              similarity. This does not scale. Approximate Nearest Neighbor
              (ANN) algorithms trade small accuracy loss for massive speed gains
              - finding 95%+ of true nearest neighbors in milliseconds instead
              of seconds.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              HNSW (Hierarchical Navigable Small World)
            </p>
            <p style="margin-top: 0">
              HNSW builds a multi-layer graph where similar vectors connect as
              neighbors. The top layer has few, widely-spaced nodes for fast
              global navigation. Lower layers add more nodes for fine-grained
              local search. Query processing starts at top layer, greedily moves
              toward high-similarity regions, then descends layers for
              precision. HNSW offers excellent recall (98%+) with
              sub-millisecond queries, but uses 2-3x memory over raw vectors.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              IVF (Inverted File Index)
            </p>
            <p style="margin-top: 0">
              IVF clusters vectors into buckets using k-means. At query time,
              find the closest cluster centroids, then search only vectors in
              those clusters. With 1000 clusters and searching the top 10, you
              examine 1% of vectors. Memory efficient but requires tuning: too
              few clusters means searching too many vectors, too many clusters
              means centroids are unreliable.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Key Insight:</strong> HNSW is the default for under
              100M vectors - best recall-speed trade-off. IVF shines at massive
              scale where HNSW memory becomes prohibitive. Product Quantization
              compresses vectors for billion-scale but sacrifices accuracy.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Choosing an Algorithm
            </p>
            <p style="margin-top: 0">
              Under 10M vectors: HNSW with default parameters. 10-100M vectors:
              HNSW with memory tuning or IVF-HNSW hybrid. 100M+ vectors: IVF
              with Product Quantization. Always benchmark on your data -
              published numbers rarely match real workloads.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 540px">
              <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px">
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <div style="font-weight: bold; font-size: 14px; margin-bottom: 8px; text-align: center">
                    Graph (HNSW)
                  </div>
                  <div style="font-size: 12px; line-height: 1.5">
                    <strong>Latency:</strong> 1–5ms p50
                    <br />
                    <strong>Memory:</strong> 1.5–2× raw
                    <br />
                    <strong>Recall@10:</strong> 95%+
                    <br />
                    <strong>Best for:</strong> 1–20M vectors, fast CPU queries
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <div style="font-weight: bold; font-size: 14px; margin-bottom: 8px; text-align: center">
                    Quantization (IVF+PQ)
                  </div>
                  <div style="font-size: 12px; line-height: 1.5">
                    <strong>Latency:</strong> 5–20ms p95
                    <br />
                    <strong>Memory:</strong> 50–100× compression
                    <br />
                    <strong>Recall@10:</strong> 90–95%
                    <br />
                    <strong>Best for:</strong> 20M–1B vectors, memory
                    constrained
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <div style="font-weight: bold; font-size: 14px; margin-bottom: 8px; text-align: center">
                    Tree (Annoy)
                  </div>
                  <div style="font-size: 12px; line-height: 1.5">
                    <strong>Latency:</strong> 3–10ms
                    <br />
                    <strong>Memory:</strong> 1.2× raw
                    <br />
                    <strong>Recall@10:</strong> 85–90%
                    <br />
                    <strong>Best for:</strong> 1–50M vectors, simple
                    implementation
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
                  Exact nearest neighbor at 1M docs needs 768M ops per query -
                  ANN trades 5% accuracy for 100-1000x speed
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  HNSW builds multi-layer graph for fast navigation: 98%+
                  recall, sub-ms queries, but 2-3x memory overhead
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  IVF clusters vectors into buckets, searches only relevant
                  clusters - memory efficient but needs tuning
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Default choice: HNSW under 100M vectors, IVF with quantization
                  beyond that
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
                  Lead with math: 1M docs at 768 dims = 768M ops per query. That
                  frames why ANN is necessary.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Explain HNSW as a multi-layer graph: top layers for global
                  navigation, bottom layers for precision.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Give concrete thresholds: HNSW under 100M, IVF beyond. Shows
                  you know when to use what.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonSemanticSearchNlpWhyApproximateNearestNeighborAnnAndCoreAlgorithmFamilies;
