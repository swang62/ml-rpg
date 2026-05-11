import type { Component } from "solid-js";

const LessonRealtimeForecastingUpdatesProductionFailureModesInRealTimeWindowingSystems: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Production Failure Modes in Real Time Windowing Systems
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Core Failure Modes:</strong> Real-time windowing systems
              fail through clock skew, out-of-order arrivals, backpressure
              cascades, and state explosion. Each failure degrades feature
              quality silently—the system continues producing values, but those
              values no longer reflect reality.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Clock Skew and Time Drift
            </p>
            <p>
              Distributed systems have clocks that drift apart. If producer
              servers are 2 seconds ahead and consumer servers 1 second behind,
              events appear 3 seconds in the future or past relative to
              processing time. This causes events to land in wrong windows or be
              marked as late when they are actually on time. Mitigation: use
              synchronized time sources (NTP, GPS), embed event timestamps at
              the source, and monitor clock drift across the fleet. Alert when
              drift exceeds half your smallest bucket size.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              State Explosion Under Cardinality Growth
            </p>
            <p>
              Windowing systems maintain state per entity (user, session,
              device). If you window over user_id and user population grows 10x,
              memory usage grows 10x. Worse: high-cardinality group keys
              (user_id crossed with item_id) can exhaust memory. Sudden traffic
              spikes from new users or bot attacks trigger out-of-memory
              crashes. Mitigation: monitor active entity count, implement
              cardinality limits with eviction policies (LRU for old entities,
              threshold for low-activity entities), use probabilistic data
              structures (Count-Min Sketch, HyperLogLog) where approximate
              counts suffice.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Backpressure and Lag Accumulation
            </p>
            <p>
              When processing cannot keep up with arrival rate, queues grow and
              latency increases. A 5-minute feature might be computed from data
              that is 30 minutes stale. The system reports success (features
              computed!) but values are meaningless for real-time decisions.
              Mitigation: monitor lag between event time and processing time,
              alert when lag exceeds acceptable threshold (typically half the
              window size), implement load shedding that drops oldest events
              first to prioritize recency.
            </p>
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Monitoring Priority:</strong> Track three metrics: lag
              (freshness), entity count (memory), and late data ratio
              (accuracy). Degradation in any indicates feature quality problems
              even if the system appears healthy.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 560px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                  <strong>Common Failure Modes and Impacts</strong>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong>Hot Key Skew</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Celebrity gets 50K events/sec → partition state grows to 5GB
                    → p99 latency spikes from 200ms to 8 seconds → drops events
                  </div>
                  <div style="margin-top: 6px; font-size: 11px; font-weight: bold">
                    Fix: Key splitting, detect at 1K events/sec threshold, split
                    to 10 subkeys
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong>Duplicate Events</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Retry causes 3% duplicate rate → non idempotent count window
                    overcounts by 3% → billing errors and metric drift
                  </div>
                  <div style="margin-top: 6px; font-size: 11px; font-weight: bold">
                    Fix: Dedup cache per key, track event IDs for window +
                    lateness duration (10 min)
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong>Clock Drift</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Mobile device clock off by 2 minutes → events land in wrong
                    5 min window → undercounts real behavior
                  </div>
                  <div style="margin-top: 6px; font-size: 11px; font-weight: bold">
                    Fix: Reject events with timestamps &gt; 5 min future or &gt;
                    1 hour past server time
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong>State Explosion</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    10M users × 1M items × 24 hourly windows = 240 trillion
                    potential states → out of memory crash
                  </div>
                  <div style="margin-top: 6px; font-size: 11px; font-weight: bold">
                    Fix: Aggressive TTL, evict inactive keys, use RocksDB with
                    disk spill, limit to 1GB per partition
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
                  Clock skew causes events to land in wrong windows silently
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  High-cardinality keys can trigger state explosion and OOM
                  crashes
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Backpressure makes features stale without surfacing obvious
                  errors
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
                  Alert when clock drift exceeds half the smallest bucket size
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Monitor lag, entity count, and late data ratio for early
                  warning
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonRealtimeForecastingUpdatesProductionFailureModesInRealTimeWindowingSystems;
