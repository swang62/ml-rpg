import type { Component } from "solid-js";

const LessonRecsysScalabilityMemoryVsDiskTradeOffsWhenDataExceedsRam: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Memory vs Disk Trade-offs: When Data Exceeds RAM
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              MEMORY VS LATENCY
            </p>
            <p style="margin-top: 0">
              HNSW achieves sub-millisecond latency but requires all vectors in
              RAM. IVF-PQ compresses vectors 50 to 100x but queries take 10 to
              50ms. For real time recommendations requiring under 10ms response,
              HNSW is the only option. For batch processing or less latency
              sensitive applications, IVF-PQ saves significant infrastructure
              cost.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              ACCURACY VS SPEED
            </p>
            <p style="margin-top: 0">
              Every ANN algorithm has tunable parameters that trade accuracy for
              speed. HNSW ef parameter: ef=50 gives 95% recall at 1ms, ef=500
              gives 99.5% recall at 5ms. IVF nprobe parameter: checking 10
              clusters gives 90% recall, checking 100 clusters gives 98% recall
              at 10x latency. Choose based on your accuracy requirements and
              latency budget.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>🎯 Decision Framework:</strong> Under 10ms + fits in RAM →
              HNSW. Under 50ms + needs compression → IVF-PQ. Billions of vectors
              → sharded IVF-PQ or ScaNN.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              BUILD TIME VS QUERY TIME
            </p>
            <p style="margin-top: 0">
              Some indexes are fast to build but slow to query; others are slow
              to build but fast to query. HNSW takes hours to build for 100M
              vectors but queries in under 1ms. A flat index (no structure)
              builds instantly but queries in seconds. If your index changes
              frequently (new products hourly), build time matters. If it
              changes rarely, optimize for query speed.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              DISK VS RAM
            </p>
            <p style="margin-top: 0">
              When vectors exceed RAM, options are: disk based indexes (IVF with
              memory mapped files), smaller compressed representations (PQ), or
              sharding across machines. Disk adds 1 to 10ms latency per page
              fault. Memory mapping helps with sequential access but random
              access to large indexes still hits disk. Plan for data growth: if
              you have 100M vectors today and expect 1B in a year, design for
              disk from the start.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="display: flex; gap: 10px">
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; flex: 1">
                    <strong style="font-size: 12px">In-Memory (FAISS)</strong>
                    <div style="margin-top: 6px; font-size: 11px">
                      1M vectors: 978 QPS
                      <br />
                      p99: 8ms
                      <br />
                      RAM: 18 GB
                      <br />
                      Cost: High
                    </div>
                  </div>
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; flex: 1">
                    <strong style="font-size: 12px">Disk-Optimized</strong>
                    <div style="margin-top: 6px; font-size: 11px">
                      1M: 178 QPS (in-mem)
                      <br />
                      3M: 142 QPS (disk)
                      <br />
                      20% degradation
                      <br />
                      Cost: Low
                    </div>
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 12px">Design for disk when:</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Dataset &gt; 2× available RAM OR latency budget &gt; 50ms OR
                    cost is primary constraint
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
                  HNSW: sub-ms latency, requires all vectors in RAM. IVF-PQ:
                  10-50ms, 50-100x compression
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Accuracy tuning: HNSW ef=50 → 95% recall at 1ms, ef=500 →
                  99.5% at 5ms
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  IVF nprobe: 10 clusters → 90% recall, 100 clusters → 98%
                  recall at 10x latency
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Build time matters for frequently changing indexes; HNSW takes
                  hours for 100M vectors
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Disk adds 1-10ms per page fault; design for disk from start if
                  expecting 10x growth
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
                  Provide decision framework: real-time + fits RAM → HNSW; batch
                  + compression → IVF-PQ
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Discuss parameter tuning: start with default (ef=50), increase
                  if recall too low
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Plan for growth: 100M now, 1B in a year means design for
                  disk-based from start
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonRecsysScalabilityMemoryVsDiskTradeOffsWhenDataExceedsRam;
