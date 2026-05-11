import type { Component } from "solid-js";

const LessonApproximateNearestNeighborsWhatIsApproximateNearestNeighborAnnSearch: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            What is Approximate Nearest Neighbor (ANN) Search?
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
                vectors "close enough" to a query vector in high-dimensional
                space, trading small accuracy losses (finding 95% of true
                nearest neighbors instead of 100%) for massive speedups
                (milliseconds instead of hours).
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              THE EXACT SEARCH PROBLEM
            </p>
            <p>
              Exact nearest neighbor search compares the query against every
              vector in the dataset. For 10 million 768-dimensional vectors,
              that is 10M × 768 = 7.68 billion floating point operations per
              query. At 100 GFLOPS, that takes 77 milliseconds per query. For
              real-time applications needing &lt;10ms latency, exact search is
              impossible at scale.
            </p>
            <p>
              The math gets worse as datasets grow. 1 billion vectors takes 7.7
              seconds per query with exact search. Batch processing overnight
              might work, but real-time recommendations need sub-10ms latency.
              You need algorithms that examine only a tiny fraction of vectors
              while still finding most true neighbors.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              HOW ANN ALGORITHMS WORK
            </p>
            <p>
              ANN algorithms use index structures to skip most comparisons.
              Instead of O(N) comparisons, they achieve O(log N) or O(√N) by
              organizing vectors into hierarchies, clusters, or graphs. The
              index guides search toward promising regions, pruning most of the
              search space.
            </p>
            <p>
              <strong>Clustering-based (IVF):</strong> Partition vectors into
              clusters. At query time, find nearest cluster centroids, search
              only within those clusters. Checking 20 clusters out of 1000
              reduces work by 50x.
            </p>
            <p>
              <strong>Graph-based (HNSW):</strong> Build a navigable graph where
              nearby vectors are connected. Walk the graph from entry point
              toward query, following edges to closer neighbors. Typically
              examines 100-300 nodes to find top-10 in a million-vector index.
            </p>
            <p>
              <strong>Quantization-based (PQ):</strong> Compress vectors to
              reduce memory and speed up distance computation. 768-dim float32
              (3KB) becomes 64-byte code. Distance computed via lookup tables
              instead of full dot product.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              RECALL VS LATENCY TRADEOFF
            </p>
            <p>
              <strong>Recall@K:</strong> What fraction of the true K nearest
              neighbors does ANN return? Recall@10 of 0.95 means 9.5 of the true
              top-10 are found on average.
            </p>
            <p>
              Tighter search (more clusters probed, more graph nodes visited)
              improves recall but increases latency. Typical production targets:
              recall@10 ≥ 0.95 with latency &lt;10ms. You tune index parameters
              to hit this balance for your data distribution.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Key Trade-off:</strong> Recall and latency are directly
              linked. Increasing recall from 90% to 99% might double latency.
              Choose the minimum recall your application can tolerate.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; justify-content: space-between; gap: 16px">
                <div style="flex: 1; border: 2px solid; padding: 12px; border-radius: 6px; text-align: center">
                  <div style="font-weight: bold; margin-bottom: 8px">
                    Exact Search
                  </div>
                  <div style="font-size: 13px; line-height: 1.4">
                    100M vectors
                    <br />
                    768 dims
                    <br />
                    ~50 seconds
                    <br />
                    <strong>100% recall</strong>
                  </div>
                </div>
                <div style="flex: 1; border: 2px solid; padding: 12px; border-radius: 6px; text-align: center">
                  <div style="font-weight: bold; margin-bottom: 8px">
                    ANN Search
                  </div>
                  <div style="font-size: 13px; line-height: 1.4">
                    100M vectors
                    <br />
                    768 dims
                    <br />
                    ~10 milliseconds
                    <br />
                    <strong>97% recall</strong>
                  </div>
                </div>
              </div>
              <div style="margin-top: 12px; padding: 10px; border: 2px solid; border-radius: 6px; text-align: center; font-size: 13px">
                <strong>5000x faster, 3% accuracy loss</strong>
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
                  ANN trades accuracy for speed: find 95% of true neighbors in
                  milliseconds vs hours for exact search
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Exact search is O(N) comparisons; ANN achieves O(log N) or
                  O(√N) via index structures
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Three main approaches: clustering (IVF), graphs (HNSW), and
                  compression (PQ)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Recall@K measures quality: 0.95 means 9.5 of true top-10 found
                  on average
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
                  Interview Tip: Explain why exact search fails at scale—10M
                  vectors × 768 dims = 77ms per query, far above real-time
                  budgets.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Describe the recall vs latency tradeoff and how
                  you would tune for a specific application requirement.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Compare the three ANN approaches and when each
                  is preferred (memory-constrained, latency-critical, etc.).
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonApproximateNearestNeighborsWhatIsApproximateNearestNeighborAnnSearch;
