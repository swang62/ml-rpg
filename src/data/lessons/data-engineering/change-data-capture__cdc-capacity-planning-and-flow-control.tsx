import type { Component } from "solid-js";

const LessonChangeDataCaptureCdcCapacityPlanningAndFlowControl: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            CDC Capacity Planning and Flow Control
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            Sizing a CDC pipeline requires translating your change rate into
            concrete resource requirements across the entire flow: log
            generation, capture, transport, processing, and sink. Start with the
            fundamentals: event size multiplied by events per second determines
            bandwidth. If your events average 500 bytes and you expect 50,000
            events per second at peak, you need 25 megabytes per second of
            sustained throughput. Add 2x headroom for spikes and rebalances,
            bringing your requirement to 50 megabytes per second. Broker limits
            often become the bottleneck. Kinesis shards provide approximately 1
            megabyte per second and 1,000 records per second of write capacity
            per shard. For 50,000 events per second, the record rate limit
            dominates: you need at least 50 shards just for the record count,
            even though bandwidth only requires 25 shards. Always take the
            maximum of bandwidth driven and record driven shard counts. AWS
            Database Migration Service (DMS) commonly handles tens of thousands
            of row changes per second with sub second replication lag, but only
            if you provision enough target capacity. Log retention planning
            prevents catastrophic gaps. If your consumer falls behind longer
            than the source's log retention window, required logs will be purged
            and you'll have irreversible data loss. At 30 megabytes per second
            change volume, 24 hours of retention requires approximately 2.6
            terabytes of log storage. If you only provision 512 gigabytes, you
            have just 4.7 hours of headroom before purges begin. Monitor lag in
            both time (seconds since commit) and position (bytes or LSNs behind
            head). End to end latency budgets must account for every stage. For
            sub 1 second pipelines: capture should be under 100 milliseconds,
            broker under 200 milliseconds, stream processing under 300
            milliseconds, and sink write under 300 milliseconds under normal
            load. Netflix's Kafka based streaming achieves hundreds of
            milliseconds to seconds with trillions of messages per day by
            carefully budgeting each stage and using micro batches only where
            needed to bound tail latencies.
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 540px">
              <div style="font-weight: bold; font-size: 14px; margin-bottom: 12px; text-align: center">
                Capacity Sizing Example
              </div>
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <div style="font-weight: bold; font-size: 12px; margin-bottom: 4px">
                    Change Rate
                  </div>
                  <div style="font-size: 11px">
                    50,000 events/s × 500 bytes = <strong>25 MB/s</strong>
                  </div>
                </div>
                <div style="font-size: 20px; text-align: center; font-weight: bold">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <div style="font-weight: bold; font-size: 12px; margin-bottom: 4px">
                    Kinesis Shards Needed
                  </div>
                  <div style="font-size: 11px">
                    Bandwidth: 25 MB/s ÷ 1 MB/s = 25 shards
                  </div>
                  <div style="font-size: 11px">
                    Record rate: 50k ÷ 1k/s ={" "}
                    <strong style="padding: 1px 4px; border-radius: 3px">
                      50 shards
                    </strong>
                  </div>
                  <div style="font-size: 11px; margin-top: 4px; font-weight: bold">
                    With 2× headroom: 100 shards
                  </div>
                </div>
                <div style="font-size: 20px; text-align: center; font-weight: bold">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <div style="font-weight: bold; font-size: 12px; margin-bottom: 4px">
                    Log Retention (24h)
                  </div>
                  <div style="font-size: 11px">
                    30 MB/s × 86,400s = <strong>2.6 TB</strong> required
                  </div>
                  <div style="font-size: 11px; margin-top: 4px">
                    512 GB storage = only <strong>4.7 hours</strong> headroom
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
                  Calculate bandwidth as event size times events per second. At
                  500 bytes and 50,000 events per second, you need 25 megabytes
                  per second sustained, plus 2x headroom for spikes
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Kinesis shards provide approximately 1 megabyte per second and
                  1,000 records per second write capacity. Take the maximum of
                  bandwidth driven (25) and record driven (50) shard counts
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Log retention must cover worst case consumer outages. At 30
                  megabytes per second, 24 hours requires approximately 2.6
                  terabytes. With 512 gigabytes, you have only 4.7 hours before
                  purges
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  End to end sub 1 second latency requires careful stage
                  budgeting: capture under 100 milliseconds, broker under 200
                  milliseconds, processing under 300 milliseconds, sink under
                  300 milliseconds
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Monitor lag in both time (seconds since commit) and position
                  (bytes or LSNs behind). Position lag tells you how close to
                  log purge you are, time lag tells you data freshness
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Consumer processing rate must exceed peak production rate. If
                  consumers handle 2,500 events per second per partition and
                  peak is 50,000 events per second, you need at least 20
                  partitions minimum
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
                  AWS DMS steady state: Handles tens of thousands of row changes
                  per second with sub second to low second replication lag when
                  target can keep up and source logs are retained sufficiently
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Netflix Kafka streaming: Trillions of messages per day with
                  typical latencies of hundreds of milliseconds to seconds by
                  budgeting each pipeline stage
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Uber MySQL binlog CDC: Millions of messages per second across
                  Kafka clusters with sub second to low second latencies under
                  normal operation with proper capacity provisioning
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonChangeDataCaptureCdcCapacityPlanningAndFlowControl;
