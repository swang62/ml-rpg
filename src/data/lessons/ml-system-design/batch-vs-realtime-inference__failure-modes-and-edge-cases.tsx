import type { Component } from "solid-js";

const LessonBatchVsRealtimeInferenceFailureModesAndEdgeCases: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Failure Modes and Edge Cases
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Batch Specific Failures
            </p>
            <p style="margin-top: 0">
              Staleness is the classic batch failure. Your system precomputes
              recommendations overnight, then a flash sale starts at noon.
              Precomputed predictions recommend out of stock items for hours
              until the next batch run. Revenue lost, user experience degraded.
              Mitigation: either shorten batch cycles (expensive, diminishing
              returns) or add a lightweight online filter to remove unavailable
              items. The pattern is: batch generates candidates with known
              staleness, online applies fresh filters.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Straggler Catastrophe
            </p>
            <p style="margin-top: 0">
              Data skew causes a few partitions to take 10x longer than the
              median. Maybe 99% of users finish in 1 hour, but the 1% with
              massive interaction histories take 10 hours. Your job completion
              time is the slowest partition. The batch window misses its cutoff.
              Downstream systems see partial writes: a mix of yesterday's
              predictions and today's for different users. Production solution:
              use speculative execution (launch duplicate tasks for slow
              partitions) or cap per entity work (process only last N
              interactions). Snapshot semantics help: write to{" "}
              <code>predictions_v124</code>, validate coverage, then atomically
              switch consumers.
            </p>
            <div style="margin: 20px 0; display: flex; flex-direction: column; align-items: center">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
                Batch Job Completion Timeline
              </div>
              <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap; justify-content: center">
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 10px; font-weight: 600">MEDIAN</div>
                  <div style="font-size: 16px; font-weight: 800">1 hour</div>
                </div>
                <div style="font-size: 18px; font-weight: 800">→</div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 10px; font-weight: 600">STRAGGLER</div>
                  <div style="font-size: 16px; font-weight: 800">10 hours</div>
                </div>
              </div>
            </div>
            <p style="margin-top: 16px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Real-time Tail Latency Spikes
            </p>
            <p style="margin-top: 0">
              Cold starts destroy p99 latency. A new instance takes 5 to 30
              seconds to load a large model into memory. During this window,
              requests either time out or queue up, causing cascading delays.
              When the instance finally comes online, it processes the backlog
              but every request has already breached Service Level Objectives
              (SLOs). Solution: maintain warm pools. Keep a fraction of capacity
              always loaded and ready. Yes, you pay for idle capacity, but you
              buy p99 latency protection. Autoscaling helps for gradual traffic
              growth but cannot save you from sudden spikes.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Feature Unavailability at Inference Time
            </p>
            <p style="margin-top: 0">
              Training serving skew is the nightmare scenario. Your model trains
              on batch features computed with 24 hour aggregation windows. At
              serving time, the feature store has a 2 minute replication lag and
              returns stale or missing features. Model accuracy drops 20% in
              production compared to offline validation. This is especially
              painful for real-time systems. A fraud model expects the{" "}
              <code>transactions_last_hour</code> feature. The feature store has
              a 5 minute lag. Fresh fraud patterns slip through because the
              model cannot see recent activity. Mitigation: lock down feature
              definitions with schema validation. Compute identical
              transformations offline and online. Monitor feature freshness and
              coverage. Have fallback logic when features are missing: default
              values, cached last known good, or degrade to a simpler model.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Feedback Loops in Real-time Systems
            </p>
            <p style="margin-top: 0">
              Real-time decisions change the data distribution immediately. A
              recommendation model that always shows popular items makes them
              more popular, creating a filter bubble. New or niche content never
              gets exposure, utility collapses over time. Another example: fraud
              models that block too aggressively train on their own decisions.
              Legitimate users get blocked, cannot complete transactions, so the
              model never sees the negative feedback. The system becomes
              increasingly aggressive. Solution: inject exploration. Reserve 5
              to 10% of traffic for random or diverse recommendations. Cap the
              feedback loop: limit how much one decision can influence future
              training data.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>❗ Remember:</strong> Failures in batch jobs degrade
              silently (stale predictions), but failures in real-time serving
              are immediately user visible (timeouts, errors). Design batch for
              idempotency and versioning. Design real-time for graceful
              degradation and circuit breaking.
            </div>
            <p style="margin-top: 16px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Version Skew Problem
            </p>
            <p style="margin-top: 0">
              Hybrid systems have two inference paths: batch and online. When
              you deploy a new model, the batch job starts using version 2
              immediately. But the online ranker still expects version 1 feature
              schema. Predictions become nonsensical until both paths align.
              This gets worse with multiple models in a pipeline. Candidate
              generator uses model version N, ranker uses version N+1, both
              expect different feature schemas. Debugging is a nightmare because
              every component looks correct in isolation. Production solution:
              version everything. Prediction schema, feature schema, model
              version. Enforce that batch and online paths read from the same
              versioned feature store snapshots. Deploy with atomic cutover:
              both paths switch to new version simultaneously, with instant
              rollback if metrics degrade.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Time To Live and Cache Invalidation
            </p>
            <p style="margin-top: 0">
              Batch predictions have a Time To Live (TTL). Set it too long and
              you serve stale predictions. Set it too short and you have cache
              misses, forcing expensive recomputation. Worse, if your online
              ranker TTL is 10 minutes but candidate cache TTL is 1 hour, you
              re-rank the same stale candidates. A user sees: recommended video
              list changes every 10 minutes but includes videos you already
              watched because the candidate set is 1 hour old. Confusing and
              broken experience.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 12px; align-items: center">
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 200px; text-align: center">
                  <strong style="font-size: 14px">Normal State</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    p99 latency: 40ms
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 200px; text-align: center">
                  <strong style="font-size: 14px">Cold Start Event</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    New instance loads model: 15s
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 200px; text-align: center">
                  <strong style="font-size: 14px">Request Queue Full</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    p99 spikes to 8 seconds
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 200px; text-align: center">
                  <strong style="font-size: 14px">Recovery</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Warm pool prevents recurrence
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
                  Batch staleness failures occur when real world state changes
                  faster than batch refresh cycle (flash sales, breaking news,
                  stock outages)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Straggler tasks from data skew dominate job completion time;
                  1% of partitions taking 10x longer delays entire batch,
                  causing partial writes
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Cold starts in real-time systems add 5 to 30 seconds of model
                  loading time, destroying p99 latency and causing cascading
                  queue buildup
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Training serving skew from feature lag or schema mismatches
                  drops model accuracy 20% in production, especially painful for
                  real-time fraud detection
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Feedback loops in real-time recommendations create filter
                  bubbles; models trained on their own decisions become
                  increasingly biased without exploration
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
                  Recommendation batch job with data skew: 99% of users finish
                  in 1 hour, but 1% with massive histories take 10 hours,
                  causing partial prediction writes
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Fraud model with 5 minute feature store lag misses fresh fraud
                  patterns because
                  &lt;code&gt;transactions_last_hour&lt;/code&gt; feature is
                  stale at inference time
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Version skew in hybrid system: batch uses model v2 with new
                  feature schema while online ranker still expects v1, causing
                  nonsensical predictions until both paths align
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonBatchVsRealtimeInferenceFailureModesAndEdgeCases;
