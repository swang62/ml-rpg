import type { Component } from "solid-js";

const LessonEtlPipelinesBatchVsStreamingLatencyCostAndOperationalComplexity: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Batch vs Streaming: Latency, Cost, and Operational Complexity
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            Batch processing accumulates data over windows of minutes to hours,
            runs transformations on entire datasets, then writes results
            atomically. Streaming processing reacts to events as they arrive,
            maintaining incremental state and emitting results continuously. The
            choice hinges on latency requirements, operational cost, and
            tolerance for complexity. Streaming delivers sub-second to minute
            latency and enables fine-grained updates for operational dashboards,
            anomaly detection, and low-latency Machine Learning (ML) features.
            However, achieving exactly-once semantics with idempotent sinks and
            watermark management adds operational burden. Out-of-order events
            require careful windowing: if p99 event-time lateness is 12 minutes
            but spikes to 30 minutes during peak traffic, a 15 minute watermark
            will drop tail data unless you add a late-data sweeper job to
            backfill. Streaming compute is also costlier: maintaining stateful
            workers and handling rebalancing requires persistent infrastructure.
            Batch offers simplicity and high throughput at low cost. Set-based
            operations over entire partitions are easy to reason about and
            retry. Amazon retail teams run large batch jobs throttled to 100 to
            200 megabytes per second per table to avoid overwhelming downstream
            systems while meeting hourly or daily Service Level Agreements
            (SLAs). Batch is ideal for heavy dimensional modeling, large joins,
            and backfills. The tradeoff is latency: batch windows of 1 to 24
            hours are common. In practice, hybrid architectures dominate.
            LinkedIn publicly reports multi-million messages per second in
            streaming for real-time metrics, while batch jobs curate fact tables
            overnight. Amazon uses partitioned streams provisioned for 1
            megabyte per second writes and 2 megabytes per second reads per
            partition; for 100,000 events per second at 1 kilobyte each, teams
            provision around 100 write partitions with autoscaling headroom for
            2 to 5 times peak load. Micro-batch compaction runs every 5 to 10
            minutes, landing curated data with p95 end-to-end latency of 2 to 10
            minutes.
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 580px">
              <div style="display: flex; gap: 20px; justify-content: center">
                <div style="display: flex; flex-direction: column; gap: 8px; align-items: center; flex: 1">
                  <div style="border: 2px solid; padding: 12px; border-radius: 6px; width: 100%; text-align: center">
                    <strong style="font-size: 13px">Streaming</strong>
                  </div>
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; width: 100%; font-size: 12px">
                    <div>
                      <strong>Latency:</strong> sub-second to minutes
                    </div>
                    <div style="margin-top: 6px">
                      <strong>Use:</strong> dashboards, anomaly detection, ML
                      features
                    </div>
                    <div style="margin-top: 6px">
                      <strong>Cost:</strong> higher (stateful workers)
                    </div>
                    <div style="margin-top: 6px">
                      <strong>Complexity:</strong> watermarks, rebalancing
                    </div>
                  </div>
                </div>
                <div style="display: flex; flex-direction: column; gap: 8px; align-items: center; flex: 1">
                  <div style="border: 2px solid; padding: 12px; border-radius: 6px; width: 100%; text-align: center">
                    <strong style="font-size: 13px">Batch</strong>
                  </div>
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; width: 100%; font-size: 12px">
                    <div>
                      <strong>Latency:</strong> hours to daily
                    </div>
                    <div style="margin-top: 6px">
                      <strong>Use:</strong> dimensional models, backfills, heavy
                      joins
                    </div>
                    <div style="margin-top: 6px">
                      <strong>Cost:</strong> lower (ephemeral compute)
                    </div>
                    <div style="margin-top: 6px">
                      <strong>Complexity:</strong> simpler (set operations)
                    </div>
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
                  Streaming enables sub-second to minute latency for operational
                  use cases but requires stateful infrastructure and careful
                  watermark tuning for out-of-order events.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Batch provides simplicity and low cost for high-throughput
                  jobs with hourly to daily SLAs, ideal for dimensional modeling
                  and large joins.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  LinkedIn scale reference: multi-million messages per second
                  sustained, trillions per day. Amazon provisions around 100
                  stream partitions for 100,000 events per second with 2 to 5
                  times autoscaling headroom.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Watermark tuning is critical: p99 lateness of 12 minutes with
                  30 minute spikes requires a 15 minute base watermark plus
                  daily late-data sweeper jobs to avoid dropping tail events.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Hybrid architectures dominate: streams feed real-time metrics,
                  batch curates fact tables overnight. Amazon micro-batch
                  compaction achieves p95 end-to-end latency of 2 to 10 minutes
                  for curated tables.
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
                  Amazon retail backfills: throttle batch jobs to 100 to 200
                  MB/s per table to avoid overwhelming downstream systems during
                  peak promotional traffic spikes of 5 to 10 times normal load.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Micro-batch calculation: 200k events/s × 1 KB × 120 seconds =
                  24 GB raw per 2 minute window. After 8x columnar compression,
                  write ~3 GB per window. Downstream must sustain &gt;300 MB/s
                  aggregate write throughput to keep up.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonEtlPipelinesBatchVsStreamingLatencyCostAndOperationalComplexity;
