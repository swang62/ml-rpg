import type { Component } from "solid-js";

const LessonIndexManagementFailureModesEncoderMismatchAndHotShardSkew: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Failure Modes: Encoder Mismatch and Hot Shard Skew
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              INDEX CORRUPTION
            </p>
            <p>
              Index files can become corrupted during writes, crashes, or disk
              failures. Symptoms: queries return wrong results, crashes during
              search, inconsistent recall across requests.
            </p>
            <p>
              Prevention: write indexes atomically (write to temp file, rename
              on success). Use checksums to verify integrity after write. Keep
              previous version for rollback.
            </p>
            <p>
              Detection: periodic integrity checks comparing index behavior to
              ground truth. If recall drops suddenly without model changes,
              suspect corruption.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              STALE CENTROIDS
            </p>
            <p>
              IVF centroids trained on old data become misaligned as vector
              distribution shifts. New vectors cluster poorly, recall drops for
              recent content.
            </p>
            <p>
              Detection: monitor per-partition sizes. Healthy distribution:
              partitions within 2x of average. Unhealthy: some partitions have
              10x+ vectors (new content clustering badly), others are nearly
              empty.
            </p>
            <p>
              Fix: retrain centroids on recent data. Schedule centroid refresh
              every 2-4 weeks for active content domains.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              HOT SHARDS
            </p>
            <p>
              Semantic sharding can create hot spots. If one cluster (shard)
              contains popular items, that shard handles disproportionate
              traffic. Latency spikes, SLO violations.
            </p>
            <p>
              Detection: monitor per-shard QPS and latency. Healthy: shards
              within 2x of each other. Unhealthy: some shards at 5-10x average
              load.
            </p>
            <p>
              Mitigation: replicate hot shards more heavily. Redistribute
              items—break large semantic clusters into smaller sub-shards.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              VERSION SKEW
            </p>
            <p>
              During rolling deployment, some replicas serve old index while
              others serve new. If query fans out to mixed versions, results are
              inconsistent—some candidates from old embeddings, some from new.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>❗ Critical:</strong> Route each query to a single index
              version. Use version-aware routing or blue-green deployment to
              avoid mixing old and new embeddings in one response.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="border: 2px solid; padding: 14px; border-radius: 6px; margin-bottom: 14px">
                <div style="font-weight: bold; font-size: 14px; margin-bottom: 10px">
                  Encoder Mismatch
                </div>
                <div style="font-size: 13px; line-height: 1.6">
                  <strong>Old Encoder:</strong> Query → [0.8, 0.3, 0.5]
                  <br />
                  <strong>New Encoder:</strong> Query → [0.5, 0.7, 0.2]
                  <br />
                  <strong>Index:</strong> Still uses old space
                  <br />
                  <div style="margin-top: 8px; padding: 8px; border: 2px solid; border-radius: 4px">
                    <strong>Recall:</strong> 98% → 86% drop
                    <br />
                    <strong>Fix:</strong> Rebuild index with new encoder
                  </div>
                </div>
              </div>
              <div style="border: 2px solid; padding: 14px; border-radius: 6px">
                <div style="font-weight: bold; font-size: 14px; margin-bottom: 10px">
                  Hot Shard Skew
                </div>
                <div style="font-size: 13px; line-height: 1.6">
                  <strong>Shard A (trending):</strong> 15k QPS, 80ms p99
                  <br />
                  <strong>Shard B (normal):</strong> 3k QPS, 18ms p99
                  <br />
                  <strong>Shard C (normal):</strong> 2k QPS, 16ms p99
                  <br />
                  <div style="margin-top: 8px; padding: 8px; border: 2px solid; border-radius: 4px">
                    <strong>Impact:</strong> System p99 = 80ms (limited by A)
                    <br />
                    <strong>Fix:</strong> 3 replicas for A, hedging requests
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
                  Index corruption: write atomically, verify checksums, keep
                  rollback version
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Stale centroids: monitor partition size distribution; retrain
                  every 2-4 weeks
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Hot shards: monitor per-shard QPS; replicate heavily or split
                  large clusters
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
                  Interview Tip: Explain version skew risk—mixed old/new
                  embeddings produce inconsistent results.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Describe stale centroid detection—partition
                  sizes should be within 2x of average.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonIndexManagementFailureModesEncoderMismatchAndHotShardSkew;
