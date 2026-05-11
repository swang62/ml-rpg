import type { Component } from "solid-js";

const LessonSearchScalabilityScalabilityFailureModes: Component = () => (
  <div class="lesson-content">
    <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
      <div class="mb-4 p-4">
        <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
          Failure Modes: Hot Shards, Stampedes, and Recall Regressions
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
              <strong>Scalability failure modes</strong> are production issues
              where sharding, caching, or approximate search breaks down—causing
              latency spikes, accuracy drops, or cascading failures.
            </div>
          </div>
          <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            HOT SHARDS
          </p>
          <p style="margin-top: 0">
            Uneven query distribution overloads specific shards. Causes: popular
            items clustered, trending queries hitting same partition. Symptoms:
            p99 spikes while p50 normal, one shard at 100% CPU. Fix: hash
            routing to spread items, replicate hot shards more heavily.
          </p>
          <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            CACHE STAMPEDES
          </p>
          <p style="margin-top: 0">
            Cached items expire simultaneously, all requests hit backend at
            once. Popular embedding expires: 1000 concurrent requests instead of
            1. Database overloads, latency spikes. Fix: jittered TTLs (random
            0-10% added), cache warming, request coalescing.
          </p>
          <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
            <strong>💡 Key Insight:</strong> Cache stampedes are self-inflicted
            DDoS. The more popular an item, the worse the stampede. Add jitter
            proportional to popularity.
          </div>
          <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            RECALL REGRESSIONS
          </p>
          <p style="margin-top: 0">
            ANN recall degrades silently as index grows. Index for 100M vectors
            has 98% recall; at 1B, drops to 90% without retuning. Symptoms:
            engagement declines gradually. Fix: monitor recall offline, retune
            as data grows, rebuild indexes periodically.
          </p>
          <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            CASCADING FAILURES
          </p>
          <p style="margin-top: 0">
            One failure overloads others. Cache fails, all requests hit
            database, database overloads, timeouts cascade. Fix: circuit
            breakers, graceful degradation (serve stale on failure), capacity
            planning with failure modes.
          </p>
          <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
            <strong>⚠️ Key Trade-off:</strong> Defensive measures add complexity.
            Circuit breakers, jittered TTLs all require effort. Prioritize based
            on blast radius.
          </div>
        </div>
        <div
          class="card-diagram"
          style="margin-bottom: 24px; display: flex; justify-content: center"
        >
          <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
            <div style="display: flex; flex-direction: column; gap: 12px">
              <div style="text-align: center; font-weight: bold; margin-bottom: 4px; font-size: 15px">
                Cache Stampede on Hot Key Expiry
              </div>
              <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                <strong style="font-size: 13px">Cache Entry Expires</strong>
                <div style="font-size: 11px; margin-top: 3px">
                  Trending topic key, TTL ends at midnight
                </div>
              </div>
              <div style="text-align: center; font-size: 20px; font-weight: bold">
                ↓
              </div>
              <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                <strong style="font-size: 13px">
                  10,000 Simultaneous Misses
                </strong>
                <div style="font-size: 11px; margin-top: 3px">
                  All requests hit backend at once
                </div>
              </div>
              <div style="text-align: center; font-size: 20px; font-weight: bold">
                ↓
              </div>
              <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                <strong style="font-size: 13px">Feature Store Overload</strong>
                <div style="font-size: 11px; margin-top: 3px">
                  Latency spikes 2 ms → 500 ms, timeouts cascade
                </div>
              </div>
              <div style="margin-top: 10px; padding: 10px; border: 2px solid; border-radius: 6px">
                <strong style="font-size: 12px; display: block; margin-bottom: 4px">
                  Mitigations:
                </strong>
                <div style="font-size: 11px; line-height: 1.6">
                  <strong>Single Flight:</strong> Only 1 request refreshes,
                  others wait
                  <br />
                  <strong>Jittered TTL:</strong> Random offsets prevent sync
                  expiry
                  <br />
                  <strong>Stale While Revalidate:</strong> Serve stale during
                  refresh
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="Learn_keyTakeaways p-4 mb-4">
          <div class="Learn_keyTakeawaysHeader mb-3 pb-3">💡 Key Takeaways</div>
          <div class="d-flex flex-column gap-2">
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Hot shards: uneven distribution causes spikes—hash routing or
                replicate hot shards
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Cache stampedes: simultaneous expiry overloads backend—use
                jittered TTLs
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Recall regressions: ANN degrades silently—monitor offline,
                rebuild periodically
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
                Describe stampede as self-inflicted DDoS with mitigation
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">2</span>
              <span class="flex-grow-1 Learn_cardContent">
                Mention recall regression as silent killer
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default LessonSearchScalabilityScalabilityFailureModes;
