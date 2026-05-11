import type { Component } from "solid-js";

const LessonFeatureTransformationPipelinesProductionFailureModesBackpressureSkewAndStateExplosion: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Production Failure Modes: Backpressure, Skew, and State Explosion
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Aggregation Consistency
            </p>
            <p style="margin-top: 0">
              Batch and streaming pipelines must produce identical aggregation
              results for the same input data. Subtle differences in window
              boundary handling, null treatment, or floating point arithmetic
              cause training serving skew. A batch job computing "average order
              value in last 7 days" must match the streaming pipeline exactly:
              same window boundaries aligned to midnight UTC, same handling of
              null prices (excluded vs zero), same rounding behavior.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Testing Strategies
            </p>
            <p style="margin-top: 0">
              Shadow mode runs streaming pipeline alongside batch, comparing
              outputs for overlapping time periods. Expect exact match for
              deterministic aggregations (count, sum) and bounded difference for
              floating point (average, standard deviation). Alert on divergence
              exceeding 0.1 percent of values or 1 percent magnitude difference.
              Continuous shadow comparison runs across hundreds of feature
              pipelines at major ML companies.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Schema Evolution
            </p>
            <p style="margin-top: 0">
              Adding, removing, or changing feature columns requires coordinated
              updates across batch jobs, streaming jobs, online stores, and
              model serving. A new feature added to streaming but not batch
              creates training serving skew. Feature stores enforce schema
              versioning: features have explicit version numbers, models declare
              required feature versions, and the serving layer validates
              compatibility at request time.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Failure Recovery
            </p>
            <p style="margin-top: 0">
              Batch jobs fail and retry at the job level. Streaming jobs fail
              and recover from checkpoints, replaying events since last
              checkpoint. For exactly once semantics, outputs must be
              idempotent: upserting to key value stores with entity plus window
              as key ensures replayed events produce same final state. Non
              idempotent sinks (append only logs) require deduplication
              downstream.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 600px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">Backpressure Cascade</strong>
                  <div style="margin-top: 6px; font-size: 12px">
                    Sink: 200ms → 2s latency
                    <br />→ Network buffers fill (95% full)
                    <br />→ Watermark stalls (+30s lag)
                    <br />→ P99 latency: 50ms → 3s
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">Data Skew Hotspot</strong>
                  <div style="margin-top: 6px; font-size: 12px">
                    user_12345: 50% of traffic
                    <br />→ Partition 7: 100% CPU, 5s backlog
                    <br />→ Other partitions: 20% CPU, idle
                    <br />
                    <strong>Fix:</strong> Salt key → user_12345_r0..r9
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">State Explosion</strong>
                  <div style="margin-top: 6px; font-size: 12px">
                    Keys: 10M → 500M (no TTL)
                    <br />
                    State: 100GB → 5TB
                    <br />
                    Checkpoint: 30s → 10min
                    <br />
                    Recovery: 2min → 1 hour
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
                  Backpressure cascades when sinks degrade from 200ms to 2
                  second latency cause network buffers to fill, watermarks to
                  stall, and P99 latency to spike from 50ms to 3 seconds across
                  the entire pipeline
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Data skew with 1% of keys generating 50% of traffic creates
                  hot partitions at 100% CPU while others idle. Key salting
                  distributes hot keys across partitions by appending random
                  suffixes
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  State explosion from unbounded keys without TTLs grows state
                  from 100GB to multi-terabyte, increasing checkpoint duration
                  from 30 seconds to 10 minutes and recovery time from 2 minutes
                  to 1 hour
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Late data handling requires calibrating watermark lag to P99
                  inter-arrival times. 10 second lag drops 60 second late
                  events, causing feature undercounts. 2 minute lag captures
                  more but delays outputs
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Incremental checkpoints reduce overhead by only writing
                  changed state, cutting checkpoint time from 5 minutes to under
                  1 minute for typical 500GB state workloads
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Monitor key metrics: watermark lag (alert if exceeds 2x
                  expected), backpressure ratio (alert above 80%), checkpoint
                  duration (alert if exceeds interval), and per-partition CPU
                  skew (alert if max/min ratio exceeds 3x)
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
                  LinkedIn activity streaming: Experienced backpressure when
                  feature store writes degraded during database failover.
                  Network buffers filled to 95%, watermark lag jumped from 5
                  seconds to 2 minutes. Fixed by adding write buffering and
                  circuit breakers to shed load during degradation.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Uber marketplace features: Hot driver IDs (drivers in high
                  demand areas) caused 10x CPU skew across partitions.
                  Implemented two-level aggregation: local 1 minute
                  pre-aggregate per partition, then global combine, reducing hot
                  partition load by 80%.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Netflix viewing pipeline: Session window state without TTL
                  grew to 3TB over 1 week, causing 15 minute checkpoints. Added
                  7 day TTL aligned to feature horizon, reduced state to 200GB,
                  checkpoint time to 45 seconds, and recovery time from 30
                  minutes to 3 minutes.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonFeatureTransformationPipelinesProductionFailureModesBackpressureSkewAndStateExplosion;
