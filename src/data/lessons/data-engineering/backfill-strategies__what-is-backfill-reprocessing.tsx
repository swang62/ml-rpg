import type { Component } from "solid-js";

const LessonBackfillStrategiesWhatIsBackfillReprocessing: Component = () => (
  <div class="lesson-content">
    <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
      <div class="mb-4 p-4">
        <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
          What is Backfill &amp; Reprocessing?
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
              <strong>Backfilling</strong> means loading or correcting
              historical data that was never processed correctly.{" "}
              <strong>Reprocessing</strong> means running existing data through
              new or fixed logic to repair incorrect results.
            </div>
          </div>
          <strong>The Core Problem:</strong>
          Imagine you ship a bug in your analytics pipeline. For 90 days, your
          "active users" metric counted bots as real users. Now your dashboard
          shows inflated numbers, your ML model trained on wrong labels, and
          your CFO made decisions based on bad data. The raw event logs are
          still there, untouched in storage. But every derived table, aggregate,
          and report is now polluted. This is what backfill and reprocessing
          solve: repairing your data history when logic changes or bugs are
          discovered.
          <strong>Backfill Versus Reprocessing:</strong>
          Think of backfill as filling gaps. You add a new data source but it
          has 2 years of history you never processed. Or a daily job failed for
          a week, leaving missing partitions. Backfill loads that historical
          data from scratch, often from raw logs or database snapshots.
          Reprocessing is different. The data was already processed, but the
          transformation logic changed. Maybe you fixed a bug, redefined a
          business metric, or upgraded a feature calculation. You take the same
          raw input and run it through new logic to overwrite old incorrect
          outputs.
          <strong>Why This Matters at Scale:</strong>
          At companies like Netflix or Uber, pipelines process hundreds of
          thousands of events per second into petabytes of derived data. When
          logic changes, you might need to recompute 10 terabytes per day across
          90 days. That is 900 terabytes of data movement. Without a systematic
          strategy, you either leave data inconsistent (old logic for 2023, new
          logic for 2024) or overwhelm your infrastructure trying to fix
          everything at once.
          <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
            <strong>✓ In Practice:</strong> Production systems treat backfill
            and reprocessing as first class operations, not one-off scripts.
            They are orchestrated workflows with throttling, validation, and
            rollback mechanisms built in.
          </div>
        </div>
        <div class="Learn_keyTakeaways p-4 mb-4">
          <div class="Learn_keyTakeawaysHeader mb-3 pb-3">💡 Key Takeaways</div>
          <div class="d-flex flex-column gap-2">
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Backfill loads historical data that was never processed, filling
                gaps from missed jobs or new data sources
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Reprocessing reruns existing data through updated logic to fix
                bugs or apply new business rules
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                At scale, backfilling 90 days at 10 TB per day means moving 900
                TB, requiring careful resource management
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Without systematic strategies, data becomes inconsistent across
                time periods, polluting dashboards and models
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
                Backfill example: A new Kafka topic starts collecting payment
                events. You need to load 18 months of payment history from
                database archives to make reporting complete.
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">2</span>
              <span class="flex-grow-1 Learn_cardContent">
                Reprocessing example: Your revenue calculation had a tax bug for
                6 months. Raw events are correct, but all daily revenue
                aggregates need recomputation with fixed logic.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default LessonBackfillStrategiesWhatIsBackfillReprocessing;
