import type { Component } from "solid-js";

const LessonEmbeddingQualityEvaluationDimensionalityAndQuantizationTradeOffs: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Dimensionality and Quantization Trade-offs
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            Higher dimensionality improves expressivity and recall by giving
            embeddings more degrees of freedom to separate semantically distinct
            items. Moving from 384 to 768 dimensions often yields 2 to 5 point
            gains in Recall at 10 and 1 to 3 point nDCG improvements. However,
            dimensionality doubles memory footprint and increases compute. At
            100 million documents with 768 dimensions in float16 (2 bytes per
            value), raw vectors consume 768 × 2 × 100M = 153.6 GB. Doubling to
            1536 dimensions adds another 153.6 GB, which at cloud storage rates
            of $0.02 per GB per month costs an extra $3,000 monthly just for
            storage, before indexing overhead or serving costs. Search latency
            also grows with dimension. Approximate Nearest Neighbor (ANN) index
            construction time scales roughly linearly or worse with dimension.
            Query time inner product or cosine similarity computation scales
            linearly with dimension, adding microseconds per comparison but
            accumulating across millions of comparisons. Meta reports that
            moving from 512 to 1024 dimensions increased index build time by 80%
            and query latency by 30 to 40% at billion scale. Quantization
            compresses embeddings by reducing precision: float32 to float16 cuts
            size by half, float16 to int8 cuts by another half (4x total), and
            product quantization or binary codes can achieve 8 to 32x
            compression. Pinterest uses 8 bit quantization on billions of pin
            embeddings, reducing memory from 1.2 TB to 300 GB while maintaining
            Recall at 100 within 1 point of uncompressed. However, quantization
            reduces fine grained similarity resolution. Hard negative pairs
            (items that share keywords but differ semantically) become harder to
            separate, potentially dropping nDCG by 1 to 5 points depending on
            domain and compression level. The decision hinges on your
            constraint. If you are memory bound (mobile app, edge device, or
            cost sensitive cloud deployment), quantization is essential. If you
            are latency bound and have memory headroom, higher dimension without
            quantization might be optimal. Spotify uses 256 dimensions with
            float16 for track embeddings because the 50 GB memory footprint fits
            comfortably in serving nodes and the 10 to 15 ms query encoding plus
            20 ms ANN search stays within budget. Google experiments show 768
            dimensions with 8 bit quantization often beats 1536 dimensions
            uncompressed because the memory savings allow larger in memory
            indexes and faster retrieval.<p></p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 560px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">384D float16</strong>
                  <div style="margin-top: 4px; font-size: 12px">
                    Memory: 76.8 GB (100M docs)
                    <br />
                    Recall@10: 68
                    <br />
                    Latency: 15ms
                  </div>
                </div>
                <div style="text-align: center; font-size: 18px; font-weight: bold">
                  ↓ Double dimension
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">768D float16</strong>
                  <div style="margin-top: 4px; font-size: 12px">
                    Memory: 153.6 GB (+100%)
                    <br />
                    Recall@10: 72 (+4 points)
                    <br />
                    Latency: 22ms (+47%)
                  </div>
                </div>
                <div style="text-align: center; font-size: 18px; font-weight: bold">
                  ↓ Add quantization
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">768D int8 quantized</strong>
                  <div style="margin-top: 4px; font-size: 12px">
                    Memory: 76.8 GB (50% of float16)
                    <br />
                    Recall@10: 71 (within 1 point)
                    <br />
                    Latency: 18ms (faster retrieval)
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
                  Doubling from 384 to 768 dimensions yields 2 to 5 point
                  Recall@10 gain but doubles memory (76.8 GB to 153.6 GB for
                  100M docs) and increases latency 30 to 50%
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  At 100 million documents, 768D float16 uses 153.6 GB raw
                  storage, costing $3,000 monthly extra vs 384D at cloud rates
                  of $0.02 per GB per month
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Quantization from float16 to int8 cuts memory by 50%, float32
                  to int8 by 75%, with typical nDCG drop of 1 to 5 points
                  depending on compression and domain
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Pinterest uses 8 bit quantization on billions of pins,
                  reducing memory from 1.2 TB to 300 GB while keeping Recall@100
                  within 1 point of uncompressed
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Google experiments show 768D int8 often outperforms 1536D
                  float16 because memory savings enable larger in memory indexes
                  and faster retrieval
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Meta reports moving from 512D to 1024D increased index build
                  time by 80% and query latency by 30 to 40% at billion scale,
                  limiting practical dimension choices
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
                  Spotify uses 256D float16 for track embeddings (50 GB memory
                  for 100M tracks) because it fits serving nodes and keeps query
                  encoding at 10 to 15 ms plus 20 ms ANN search
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  A mobile app requiring on device embedding limits to 128D int8
                  (64 MB for 500k items) to fit memory constraints, accepting 3
                  point nDCG drop vs server 768D float16
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Pinterest reduces 768D float32 embeddings (3 bytes becomes 1
                  byte with quantization) from 1.2 TB to 300 GB, saving $18,000
                  annually in storage and serving costs
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonEmbeddingQualityEvaluationDimensionalityAndQuantizationTradeOffs;
