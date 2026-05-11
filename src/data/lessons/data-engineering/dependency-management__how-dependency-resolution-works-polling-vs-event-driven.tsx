import type { Component } from "solid-js";

const LessonDependencyManagementHowDependencyResolutionWorksPollingVsEventDriven: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            How Dependency Resolution Works: Polling vs Event-Driven
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <strong>The Coordination Challenge:</strong>
            Once you have explicit dependencies declared, the orchestrator needs
            a mechanism to detect when upstream conditions are satisfied. Two
            patterns dominate: polling (pull) and event driven (push). Each
            trades off latency, resource consumption, and operational
            complexity.
            <strong>Polling Pattern (Pull):</strong>
            Downstream jobs use sensors that periodically query a metadata store
            to check if upstream conditions are met. For example, a sensor
            queries every 60 seconds: "Is <code>dataset=user_events</code>,{" "}
            <code>partition=2025-12-24</code>, <code>status=SUCCESS</code>?"
            When the condition is true, the downstream task starts. The math
            matters here. With a 60 second polling interval, average latency to
            detect completion is 30 seconds (half the interval). If you have
            10,000 concurrent sensors polling every minute, that is 167 queries
            per second against your metadata store. At FAANG scale with 500 to
            2,000 DAGs running 10,000 to 50,000 tasks per day, this can
            overwhelm a single database.
            <div style="margin: 8px 0; display: flex; flex-direction: column; align-items: center">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
                Polling Performance Impact
              </div>
              <div style="display: inline-flex; gap: 12px; flex-wrap: wrap; justify-content: center">
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">30s</div>
                  <div style="font-size: 10px; font-weight: 600">
                    AVG LATENCY
                  </div>
                </div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">167/s</div>
                  <div style="font-size: 10px; font-weight: 600">QUERIES</div>
                </div>
              </div>
            </div>
            <strong>Event Driven Pattern (Push):</strong>
            Upstream pipelines publish events when they complete. For instance,
            after writing and validating data, the pipeline publishes to a Kafka
            topic or cloud pub/sub:{" "}
            <code>
              &#123;"dataset": "user_events", "partition": "2025-12-24",
              "status": "SUCCESS", "row_count": 3200000000&#125;
            </code>
            . The orchestrator subscribes to these events and immediately
            enqueues dependent tasks. Latency drops dramatically. Typical
            production systems achieve p50 task start latency under 5 seconds
            and p99 under 30 seconds after upstream completion. Event throughput
            can reach 1,000 to 10,000 events per second for large platforms like
            Netflix or Uber. However, you now need robust event handling. Events
            can be duplicated due to retries, so downstream must be idempotent.
            Network partitions or orchestrator restarts can cause missed events,
            requiring fallback polling or event replay. You also need exactly
            once or at least once semantics, which adds complexity.
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>✓ In Practice:</strong> Many production systems use hybrid
              approaches. Critical paths with tight SLAs use event driven
              triggering for sub 10 second latency. Less time sensitive
              pipelines use polling with longer intervals to reduce load. Airbnb
              and LinkedIn have documented similar architectures in their
              engineering blogs.
            </div>
            <strong>The Idempotency Requirement:</strong>
            Regardless of pattern, pipelines must be safe to rerun for a given
            partition and version. Since events can duplicate and sensors can
            retry, you typically write to new locations or versions, then
            atomically swap pointers, or use upserts with deterministic
            transformations. Without this, any hiccup in signaling causes double
            counting or corrupted aggregates.
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 600px">
              <div style="display: flex; gap: 24px; align-items: flex-start; justify-content: center">
                <div style="flex: 1; display: flex; flex-direction: column; gap: 10px; align-items: center">
                  <div style="font-weight: 700; font-size: 13px; margin-bottom: 4px; text-align: center">
                    POLLING (PULL)
                  </div>
                  <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center; width: 100%">
                    <strong style="font-size: 13px">Downstream Job</strong>
                    <div style="font-size: 11px; margin-top: 4px">
                      polls every 60s
                    </div>
                  </div>
                  <div style="font-size: 20px; font-weight: bold">↓ query</div>
                  <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center; width: 100%">
                    <strong style="font-size: 13px">Metadata Store</strong>
                    <div style="font-size: 11px; margin-top: 4px">
                      status: SUCCESS?
                    </div>
                  </div>
                  <div style="font-size: 11px; text-align: center; margin-top: 4px">
                    Avg latency: 30s
                  </div>
                </div>
                <div style="flex: 1; display: flex; flex-direction: column; gap: 10px; align-items: center">
                  <div style="font-weight: 700; font-size: 13px; margin-bottom: 4px; text-align: center">
                    EVENT-DRIVEN (PUSH)
                  </div>
                  <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center; width: 100%">
                    <strong style="font-size: 13px">Upstream Job</strong>
                    <div style="font-size: 11px; margin-top: 4px">
                      publishes event
                    </div>
                  </div>
                  <div style="font-size: 20px; font-weight: bold">↓ event</div>
                  <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center; width: 100%">
                    <strong style="font-size: 13px">Pub/Sub Topic</strong>
                    <div style="font-size: 11px; margin-top: 4px">
                      triggers downstream
                    </div>
                  </div>
                  <div style="font-size: 11px; text-align: center; margin-top: 4px">
                    p50 latency: &lt;5s
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
                  Polling queries metadata every N seconds with average
                  detection latency of N/2, creating load on metadata stores at
                  scale (167 queries per second for 10,000 sensors at 60 second
                  intervals)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Event driven systems achieve p50 latency under 5 seconds by
                  publishing completion events that immediately trigger
                  downstream tasks, but require robust deduplication and replay
                  logic
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Production systems at Netflix and Uber handle 1,000 to 10,000
                  dependency events per second using pub/sub infrastructure like
                  Kafka
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Idempotency is mandatory: pipelines must safely rerun for the
                  same partition and version since events duplicate and sensors
                  retry on transient failures
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Hybrid approaches are common: critical paths use event driven
                  for sub 10 second latency, less urgent pipelines use polling
                  to reduce infrastructure complexity
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
                  Airflow ExternalTaskSensor polls every 60 seconds to check if
                  upstream DAG task succeeded, with poke_interval configurable
                  to balance latency vs scheduler load
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Dagster asset sensors subscribe to S3 event notifications via
                  SNS, triggering materialization within 2 to 5 seconds of
                  upstream file writes with at least once delivery
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonDependencyManagementHowDependencyResolutionWorksPollingVsEventDriven;
