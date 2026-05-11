import type { Component } from "solid-js";

const LessonRecsysScalabilityChoosingTheRightIndexDecisionFrameworkAndCapacityPlanning: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Choosing the Right Index: Decision Framework and Capacity Planning
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              CHOOSING AN INDEX TYPE
            </p>
            <p style="margin-top: 0">
              <strong>Under 1 million vectors:</strong> Flat index (exact
              search) may be fast enough. Benchmark before adding complexity.{" "}
              <strong>1 to 100 million vectors:</strong> HNSW if latency
              critical (under 10ms) and vectors fit in RAM.{" "}
              <strong>100 million to 1 billion:</strong> IVF-PQ for memory
              efficiency or sharded HNSW across multiple machines.{" "}
              <strong>Over 1 billion:</strong> Distributed solutions with
              sharding, typically IVF-PQ with disk storage.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              CAPACITY PLANNING
            </p>
            <p style="margin-top: 0">
              Calculate memory needs before choosing infrastructure. HNSW:
              vectors + graph = approximately 1.5x raw vector size. For 100M 128
              dim vectors: 100M × 128 × 4 bytes × 1.5 = 77 GB RAM needed per
              replica. IVF-PQ: roughly 8 to 16 bytes per vector. 100M vectors =
              0.8 to 1.6 GB. Add replicas for query throughput: if one replica
              handles 100 QPS and you need 500 QPS, deploy 5 replicas.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>✅ Best Practice:</strong> Always benchmark with your
              actual data. Published benchmarks use synthetic data with uniform
              distribution. Real data has clusters and outliers that change
              performance significantly.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              WHEN TO SHARD
            </p>
            <p style="margin-top: 0">
              Shard when single machine cannot hold the index or cannot serve
              required throughput. Sharding strategies: by vector ID range
              (simple but hot spots possible), by cluster (IVF clusters map to
              shards), or random (uniform load but complex routing). Sharding
              adds coordination overhead: query fans out to all shards, results
              merge. Expect 2 to 5ms overhead per shard added.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              LIBRARIES AND TOOLS
            </p>
            <p style="margin-top: 0">
              FAISS provides IVF, PQ, and flat indexes with GPU acceleration.
              Hnswlib is a lightweight HNSW implementation. ScaNN optimizes for
              modern CPUs with SIMD instructions. Milvus and Pinecone provide
              managed services with sharding and replication built in. Start
              with FAISS for prototyping, move to managed services for
              production if operational complexity is a concern.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 540px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">HNSW</strong>
                  <div style="margin-top: 6px; font-size: 11px">
                    <strong>When:</strong> Dataset fits in RAM (with 30-50%
                    headroom), need &lt;10ms p99, high recall &gt;0.95
                    <br />
                    <strong>Scale:</strong> Up to 50M vectors on 128 GB RAM
                    <br />
                    <strong>Cost:</strong> High memory, low latency
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">IVF+PQ (FAISS)</strong>
                  <div style="margin-top: 6px; font-size: 11px">
                    <strong>When:</strong> Dataset &gt; 2× RAM, need 10-20ms
                    latency, batch friendly, GPU available
                    <br />
                    <strong>Scale:</strong> 100M to 1B+ vectors on 64-256 GB RAM
                    <br />
                    <strong>Cost:</strong> Low memory, moderate latency
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">Disk-Optimized</strong>
                  <div style="margin-top: 6px; font-size: 11px">
                    <strong>When:</strong> Dataset &gt;&gt; RAM, latency budget
                    50-100ms, cost critical, downstream is slow (LLM)
                    <br />
                    <strong>Scale:</strong> 1B+ vectors on NVMe SSD
                    <br />
                    <strong>Cost:</strong> Lowest, higher latency
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
                  Under 1M: flat index may suffice. 1-100M: HNSW if fits in RAM.
                  100M-1B: IVF-PQ. Over 1B: sharded
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  HNSW memory: 1.5x raw vector size. 100M × 128 × 4 bytes × 1.5
                  = 77 GB per replica
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  IVF-PQ memory: 8-16 bytes per vector. 100M vectors = 0.8-1.6
                  GB per replica
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Sharding adds 2-5ms overhead per shard; shard by cluster for
                  natural load distribution
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  FAISS for prototyping, managed services (Milvus, Pinecone) for
                  production operational simplicity
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
                  Walk through capacity: 500 QPS target, 100 QPS per replica → 5
                  replicas needed
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Explain sharding decision: single 77 GB replica vs two 40 GB
                  shards with fan-out overhead
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Discuss benchmarking: always test with real data, not
                  synthetic uniform distribution
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonRecsysScalabilityChoosingTheRightIndexDecisionFrameworkAndCapacityPlanning;
