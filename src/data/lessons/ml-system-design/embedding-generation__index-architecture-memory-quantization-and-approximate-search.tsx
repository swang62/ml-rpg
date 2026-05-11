import type { Component } from "solid-js";

const LessonEmbeddingGenerationIndexArchitectureMemoryQuantizationAndApproximateSearch: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Index Architecture: Memory, Quantization, and Approximate Search
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              MEMORY REQUIREMENTS
            </p>
            <p>
              Raw storage: 768-dimensional float32 vectors require 768 × 4 bytes
              = 3KB per embedding. At scale: 1 billion embeddings × 3KB = 3
              terabytes just for vector storage. Brute-force search over 3TB is
              prohibitively slow and expensive. Solutions: vector quantization
              to reduce storage and approximate search to reduce computation.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              QUANTIZATION OPTIONS
            </p>
            <p>
              <strong>Scalar quantization:</strong> Convert each float32 to
              int8. 4x compression with 2-5% recall loss. Simple implementation,
              fast inference. Good default choice.
            </p>
            <p>
              <strong>Product quantization (PQ):</strong> Split vector into M
              subvectors (typically 8-32), quantize each to 256 centroids
              represented as 1 byte. 768 dims → 64 bytes = 48x compression.
              Distance computed via pre-computed lookup tables instead of full
              dot product. 5-10% recall loss.
            </p>
            <p>
              <strong>Binary quantization:</strong> Each dimension becomes 1
              bit. 768 dims → 96 bytes = 32x compression. Use Hamming distance
              for fast comparison. Works for coarse filtering but too lossy for
              final ranking.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              APPROXIMATE SEARCH ALGORITHMS
            </p>
            <p>
              <strong>HNSW:</strong> Build a navigable graph where nearby
              vectors are connected. Search via greedy graph traversal starting
              from entry point. High recall (95%+) at 1-5ms latency. Trade-off:
              memory-intensive (stores full vectors plus graph edges).
            </p>
            <p>
              <strong>IVF (Inverted File):</strong> Cluster vectors into
              centroids, store vectors per cluster. At query time, search only
              the nearest clusters. Lower recall per cluster probed, but much
              more memory-efficient. Combine IVF with PQ for best memory
              efficiency at scale.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Key Trade-off:</strong> More compression = less memory =
              lower recall. Always tune by measuring recall@K on held-out
              validation data. Target: 95% recall with minimum memory footprint
              for your latency budget.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 580px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">
                    100M Vectors × 768 Dims × 4 Bytes
                  </strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Raw: ~307 GB memory (infeasible)
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓ Compression
                </div>
                <div style="display: flex; gap: 8px">
                  <div style="flex: 1; border: 2px solid; padding: 8px; border-radius: 6px; font-size: 11px; text-align: center">
                    <strong>Float16</strong>
                    <div style="margin-top: 4px">~154 GB</div>
                    <div style="margin-top: 2px">Minimal loss</div>
                  </div>
                  <div style="flex: 1; border: 2px solid; padding: 8px; border-radius: 6px; font-size: 11px; text-align: center">
                    <strong>Product Quantization</strong>
                    <div style="margin-top: 4px">~1.6 GB (16 bytes/vec)</div>
                    <div style="margin-top: 2px">Small recall loss</div>
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓ Index Type
                </div>
                <div style="display: flex; gap: 8px">
                  <div style="flex: 1; border: 2px solid; padding: 8px; border-radius: 6px; font-size: 11px">
                    <strong>IVF (Inverted File)</strong>
                    <div style="margin-top: 4px">Cluster into buckets</div>
                    <div style="margin-top: 2px">Probe 10 to 100 clusters</div>
                    <div style="margin-top: 2px">Good for daily refresh</div>
                  </div>
                  <div style="flex: 1; border: 2px solid; padding: 8px; border-radius: 6px; font-size: 11px">
                    <strong>HNSW</strong>
                    <div style="margin-top: 4px">Multi layer graph</div>
                    <div style="margin-top: 2px">Greedy navigate layers</div>
                    <div style="margin-top: 2px">Supports online inserts</div>
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">
                    Query: &lt;10ms latency, 0.9 recall
                  </strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    GPU: 1M to 100M vectors | Sharded: 1B+ vectors
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
                  Raw storage: 768-dim = 3KB per vector; 1B vectors = 3TB
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  PQ: 48x compression with 5-10% recall loss via lookup tables
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  HNSW: high recall but expensive memory; IVF+PQ: best memory
                  efficiency
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
                  Interview Tip: Explain the memory math—1B × 3KB = 3TB
                  uncompressed, then describe compression options.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Compare HNSW vs IVF—HNSW for latency, IVF+PQ
                  for memory-constrained environments.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonEmbeddingGenerationIndexArchitectureMemoryQuantizationAndApproximateSearch;
