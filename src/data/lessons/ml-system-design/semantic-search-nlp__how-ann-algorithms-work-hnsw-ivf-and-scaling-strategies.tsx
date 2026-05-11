import type { Component } from "solid-js";

const LessonSemanticSearchNlpHowAnnAlgorithmsWorkHnswIvfAndScalingStrategies: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            How ANN Algorithms Work: HNSW, IVF, and Scaling Strategies
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 0; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Scaling Problem
            </p>
            <p style="margin-top: 0">
              Finding the exact closest vectors requires comparing the query
              against every vector in your database. With 1 million documents at
              768 dimensions, that is 768 million floating point operations per
              query. At 10 queries per second, you need 7.68 billion operations
              per second just for similarity computation. This does not scale.
            </p>
            <p>
              Approximate Nearest Neighbor (ANN) algorithms solve this by
              trading a small amount of accuracy for massive speed improvements.
              Instead of finding the true top 10 closest vectors, ANN finds
              vectors that are very likely in the top 10 - typically 95%+ of the
              true nearest neighbors. The speed improvement is dramatic:
              milliseconds instead of seconds for million-scale datasets.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              How ANN Indices Work
            </p>
            <p style="margin-top: 0">
              ANN algorithms pre-process your vectors into index structures that
              enable fast approximate search. HNSW (Hierarchical Navigable Small
              World) builds a graph where similar vectors are connected.
              Searching navigates this graph, jumping between connected nodes
              until reaching high-similarity regions. IVF (Inverted File)
              clusters vectors into buckets; at query time, only the most
              relevant buckets are searched.
            </p>
            <p>
              Index building takes time - hours for millions of vectors. But
              once built, queries are fast. The index is essentially a
              precomputed map of vector neighborhoods that lets you skip most
              comparisons.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Key Insight:</strong> ANN is a recall-latency
              trade-off. Configure indices for higher recall (search more
              candidates) and you get better accuracy but slower queries.
              Configure for speed and you might miss some true matches. Tune
              based on your acceptable recall threshold.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Choosing an ANN Algorithm
            </p>
            <p style="margin-top: 0">
              HNSW offers the best recall at high speed but uses significant
              memory (often 2-3x the raw vector storage). IVF uses less memory
              but requires more tuning. Product Quantization compresses vectors
              for massive scale (billions of vectors) but reduces accuracy. For
              most applications under 100 million vectors, HNSW is the default
              choice. Beyond that, hybrid approaches combining IVF and
              quantization become necessary.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">Query Embedding</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    ~5ms on CPU
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">
                    ANN Search (100M vectors)
                  </strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    10–20ms p95, recall@10: 92%
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">
                    Cross Encoder Rerank (top 100)
                  </strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    20–40ms, +10% precision@10
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">
                    Metadata Fetch &amp; Return
                  </strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Total: 50–100ms p95
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
                  Exact nearest neighbor at 1M docs requires 768M ops per query
                  - ANN trades small accuracy loss (95%+ recall) for millisecond
                  queries
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  HNSW builds a graph connecting similar vectors; IVF clusters
                  vectors into buckets - both enable searching a fraction of the
                  data
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  ANN is a recall-latency trade-off: search more candidates for
                  better accuracy, fewer for faster queries
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  HNSW is default for under 100M vectors; beyond that, IVF with
                  quantization becomes necessary for memory constraints
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
                  Lead with the math: 1M docs at 768 dims = 768M operations per
                  query. At 10 QPS, that is 7.68B ops/sec - clearly not
                  scalable.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Explain HNSW intuitively: it is a graph where similar vectors
                  are neighbors. Search hops between neighbors toward
                  high-similarity regions.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Frame the recall trade-off: 95% recall means 5% of true top-10
                  results might be missed. Ask if that is acceptable for the use
                  case.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonSemanticSearchNlpHowAnnAlgorithmsWorkHnswIvfAndScalingStrategies;
