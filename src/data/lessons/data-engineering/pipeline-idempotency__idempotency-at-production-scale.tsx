import type { Component } from "solid-js";

const LessonPipelineIdempotencyIdempotencyAtProductionScale: Component = () => (
  <div class="lesson-content">
    <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
      <div class="mb-4 p-4">
        <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
          Idempotency at Production Scale
        </h1>
        <div
          class="card-content-area"
          style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
        >
          <strong>The Architecture:</strong>
          At companies like Uber and Netflix, idempotency is designed into every
          layer of the pipeline, from ingestion to final materialization. The
          pattern that works at petabyte scale separates concerns: raw ingestion
          is append only and cheap, while derived tables enforce strict
          idempotency. Consider an ads analytics platform processing 200,000
          events per second at peak. Mobile and web clients send impression and
          click events into Kafka. The raw topic is append only, accepting
          duplicates to maximize ingestion throughput. Write latency stays under
          10ms at p99 because there's no dedupe or coordination overhead.
          <strong>Layer by Layer:</strong>
          The streaming layer computes real time metrics with 10 second end to
          end latency at p99. It uses windowed deduplication: maintains a set of
          seen <code>event_id</code> values for the last 2 hours in memory,
          sharded by key hash across worker instances. For 200,000 events per
          second over 2 hours, that's 1.44 billion event IDs to track. Using a
          compact representation, this fits in 10 to 20 GB of memory distributed
          across the cluster. The batch layer recomputes daily and hourly
          aggregates. Jobs are designed to be fully rerunnable. A daily job for
          campaign metrics computes from the raw append only log and writes
          results with a composite key of <code>campaign_id</code> plus{" "}
          <code>date</code>. If yesterday's job had a bug, you fix the code and
          rerun it. The upsert overwrites the bad data.
          <div style="margin: 8px 0; display: flex; flex-direction: column; align-items: center">
            <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
              Processing Cost Comparison
            </div>
            <div style="display: inline-flex; gap: 12px; flex-wrap: wrap; justify-content: center">
              <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                <div style="font-size: 18px; font-weight: 800">10ms</div>
                <div style="font-size: 10px; font-weight: 600">RAW APPEND</div>
              </div>
              <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                <div style="font-size: 18px; font-weight: 800">50ms</div>
                <div style="font-size: 10px; font-weight: 600">
                  DEDUPE + UPSERT
                </div>
              </div>
            </div>
          </div>
          The data warehouse receives cleaned, deduped events via a batch loader
          that runs hourly. Each load is idempotent because it either replaces
          entire partitions (for example, DROP PARTITION for hour X, then INSERT
          new data for hour X) or uses MERGE statements keyed by{" "}
          <code>event_id</code>. Backfills work the same way: to reprocess March
          2024, you run the pipeline for those dates and let it overwrite the
          existing partitions.
          <strong>Feature Store Integration:</strong>
          ML feature stores have tight freshness requirements, often less than 5
          minutes for 95% of features. These systems use upserts keyed by{" "}
          <code>user_id</code> plus <code>feature_name</code> plus{" "}
          <code>timestamp</code>. When a pipeline recomputes features for the
          last hour due to late data, it simply upserts the new values. The
          inference service always reads the latest value per key.
          <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
            <strong>✓ In Practice:</strong> Netflix processes petabytes of
            viewing data monthly. They can replay months of logs to add new
            features or fix computation bugs, confident that idempotent
            materializations won't corrupt downstream tables.
          </div>
        </div>
        <div
          class="card-diagram"
          style="margin-bottom: 24px; display: flex; justify-content: center"
        >
          <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
            <div style="display: flex; flex-direction: column; gap: 10px">
              <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; text-align: center">
                <strong style="font-size: 13px">
                  Raw Ingestion (Append Only)
                </strong>
                <div style="font-size: 11px; margin-top: 4px">
                  200k events/sec, duplicates OK
                </div>
              </div>
              <div style="display: flex; gap: 10px">
                <div style="flex: 1; border: 2px solid; padding: 10px 12px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 12px">Stream Layer</strong>
                  <div style="font-size: 10px; margin-top: 4px">
                    Windowed dedupe
                  </div>
                </div>
                <div style="flex: 1; border: 2px solid; padding: 10px 12px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 12px">Batch Layer</strong>
                  <div style="font-size: 10px; margin-top: 4px">
                    Recompute + upsert
                  </div>
                </div>
              </div>
              <div style="display: flex; gap: 10px">
                <div style="flex: 1; border: 2px solid; padding: 10px 12px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 12px">Warehouse</strong>
                  <div style="font-size: 10px; margin-top: 4px">
                    Partition replace
                  </div>
                </div>
                <div style="flex: 1; border: 2px solid; padding: 10px 12px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 12px">Feature Store</strong>
                  <div style="font-size: 10px; margin-top: 4px">
                    Upsert by user_id
                  </div>
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
                Separate raw append only ingestion (cheap, fast) from idempotent
                derived materializations (correct, replayable)
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Streaming dedupe at 200,000 events per second requires ~10 to 20
                GB memory for 2 hour window of event IDs
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Batch jobs designed for full reruns using partition replacement
                or upserts enable safe backfills of months of data
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Feature stores use composite keys like
                &lt;code&gt;user_id&lt;/code&gt; plus
                &lt;code&gt;feature_name&lt;/code&gt; to maintain freshness
                under 5 minutes while supporting replays
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                At petabyte scale, idempotency is what enables operational
                flexibility: resharding, migrations, bug fixes via reprocessing
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
                Uber's event stream: Raw trip events append to Kafka at 100k+
                events/sec. Derived tables like driver_daily_earnings use
                &lt;code&gt;driver_id&lt;/code&gt; plus
                &lt;code&gt;date&lt;/code&gt; keys for idempotent daily batch
                jobs.
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">2</span>
              <span class="flex-grow-1 Learn_cardContent">
                Warehouse partition replacement: &lt;code&gt;ALTER TABLE events
                DROP PARTITION (date='2024-03-15'); INSERT INTO events PARTITION
                (date='2024-03-15') SELECT * FROM reprocessed_events WHERE
                date='2024-03-15';&lt;/code&gt;
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">3</span>
              <span class="flex-grow-1 Learn_cardContent">
                Streaming windowed dedupe: Flink state stores seen
                &lt;code&gt;event_id&lt;/code&gt; values per 2 hour window,
                evicting older entries. Memory usage bounded at ~15 GB for 200k
                events/sec stream.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default LessonPipelineIdempotencyIdempotencyAtProductionScale;
