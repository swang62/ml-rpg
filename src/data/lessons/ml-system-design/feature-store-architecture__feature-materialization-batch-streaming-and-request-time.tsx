import type { Component } from "solid-js";

const LessonFeatureStoreArchitectureFeatureMaterializationBatchStreamingAndRequestTime: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Feature Materialization: Batch, Streaming, and Request Time
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Batch Materialization
            </p>
            <p style="margin-top: 0">
              Runs on a schedule (hourly or daily) to backfill the offline store
              and upsert the online store. It is cost efficient and
              reproducible: a daily Spark job processing 500 gigabytes of events
              to generate 100 million feature rows might cost 20 to 50 dollars
              on cloud compute. Incremental backfills that only process changes
              since the last watermark cut compute time by 5 to 10x and reduce
              the blast radius of schema errors. Batch is the workhorse for user
              aggregates, historical trends, and any feature tolerating hours of
              staleness.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Streaming Materialization
            </p>
            <p style="margin-top: 0">
              Processes events from Kafka or Kinesis in near real time,
              computing windowed aggregates with event time semantics. Uber's
              fraud detection and ETA models rely on features updated within
              seconds to minutes. The complexity is significant: exactly once
              semantics require idempotent upserts keyed by entity, window end,
              and version; late events need watermarks and correction paths; and
              duplicate events must be deduped. Streaming infrastructure
              typically costs 2 to 5x more than equivalent batch for the same
              features due to always on clusters and state management.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Request Time Transforms
            </p>
            <p style="margin-top: 0">
              Compute features per inference request from raw signals. Examples
              include session length, time since last event, or lightweight
              encodings. This is always fresh and avoids duplicating storage
              across millions of entities, but adds per request CPU cost and
              latency variance. A 2ms request time transform consuming 10
              percent of a 50ms SLA is manageable; a 20ms transform blows your
              budget. Netflix uses request time enrichments for session context
              features that cannot be precomputed.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Late and Duplicate Events
            </p>
            <p style="margin-top: 0">
              The failure mode in streaming causing incorrect aggregates. A
              duplicate click event double counts in a 7 day click count,
              degrading precision and recall. Mitigation uses event time
              processing with watermarks to handle late arrivals, idempotent
              upserts that overwrite duplicates, and dedupe buffers based on
              event UUIDs. Compensating updates can correct past windows when
              very late events arrive beyond the watermark.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong>Batch Materialization</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Hourly/Daily schedule • Hours latency • $20-50 per 500GB
                    <br />
                    Use: User aggregates, historical trends, hours staleness OK
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong>Streaming Materialization</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Kafka/Flink • Seconds to minutes latency • 2-5x batch cost
                    <br />
                    Use: Fraud, ETA, real time aggregates, exactly once hard
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong>Request Time Transforms</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Computed per inference • Always fresh • 1-2ms CPU budget
                    <br />
                    Use: Session features, time deltas, lightweight encodings
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
                  Batch materialization runs on schedule (hourly or daily) with
                  hours latency but high cost efficiency; processing 500
                  gigabytes to generate 100 million feature rows costs 20 to 50
                  dollars with incremental upserts reducing compute by 5 to 10
                  times
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Streaming materialization via Kafka or Flink achieves seconds
                  to minutes freshness for fraud or Estimated Time of Arrival
                  features, but costs 2 to 5 times more than batch due to always
                  on clusters and exactly once complexity
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Request time transforms compute per inference (session length,
                  time deltas) with zero staleness but consume inference latency
                  budget; keep under 1 to 2 milliseconds to avoid blowing 50
                  millisecond Service Level Agreements
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Late and duplicate events in streaming cause incorrect window
                  aggregates (double counting); mitigation requires event time
                  watermarks, idempotent upserts keyed by entity and window end,
                  and dedupe buffers using event Universally Unique Identifiers
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Pattern selection: batch for user history with hours staleness
                  tolerance, streaming for real time signals when 2 to 5 times
                  higher cost is justified, request time for per session signals
                  with lightweight compute
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
                  Uber Michelangelo uses Kafka to Flink streaming pipelines to
                  update Estimated Time of Arrival features within seconds,
                  processing millions of trip events per second with idempotent
                  upserts to a Cassandra backed online store
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Airbnb Zipline runs daily Spark backfills for search ranking
                  features, computing 7 day user engagement aggregates overnight
                  with partition pruning to process only new data since the last
                  watermark
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonFeatureStoreArchitectureFeatureMaterializationBatchStreamingAndRequestTime;
