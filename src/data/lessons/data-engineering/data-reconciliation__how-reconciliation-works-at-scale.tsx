import type { Component } from "solid-js";

const LessonDataReconciliationHowReconciliationWorksAtScale: Component = () => (
  <div class="lesson-content">
    <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
      <div class="mb-4 p-4">
        <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
          How Reconciliation Works at Scale
        </h1>
        <div
          class="card-content-area"
          style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
        >
          <strong>The Architecture Pattern:</strong> Production reconciliation
          systems follow a configuration driven pipeline. Teams define which
          tables or entities to reconcile, how to match records (the join key),
          and which columns or metrics to compare. An orchestrator triggers jobs
          per entity or per source pair on a schedule, typically hourly or
          daily. Each reconciliation job has three stages that process data in a
          distributed compute environment like Spark.
          <div style="margin: 12px 0">
            <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
              <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                1
              </div>
              <div style="flex: 1; padding-top: 4px">
                <strong>Preprocess:</strong> Extract data from each source,
                limited by partitions like day or hour to manage volume.
                Normalize types and formats into a canonical schema, resolving
                time zones, numeric precision, and encodings. Perform a
                distributed join on configured keys.
              </div>
            </div>
            <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
              <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                2
              </div>
              <div style="flex: 1; padding-top: 4px">
                <strong>Compare:</strong> Walk each joined row and apply rules
                per column. Check equality, apply tolerances (currency within
                0.01, timestamps within 5 seconds), or compute similarity
                scores. Generate per row mismatch flags.
              </div>
            </div>
            <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
              <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                3
              </div>
              <div style="flex: 1; padding-top: 4px">
                <strong>Postprocess:</strong> Aggregate mismatch counts per
                column and compute match percentages. Apply thresholds to
                generate health labels (green for 99.9%, amber for 98%, red
                below). Store results in a metrics store and trigger alerts when
                thresholds are breached.
              </div>
            </div>
          </div>
          <strong>Real World Scale Example:</strong> Consider reconciling an on
          premises billing system against a new cloud based system. You have
          hundreds of tables with billions of rows total. A Spark cluster
          processes each table, extracting data from both sides and performing
          distributed joins. For a single orders table with 500 million records,
          the system might find that 99.97% of{" "}
          <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
            amount
          </code>{" "}
          values match, 99.95% of{" "}
          <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
            currency
          </code>{" "}
          values match, and 99.8% of records match across all checked columns.
          <div style="margin: 8px 0; display: flex; flex-direction: column; align-items: center">
            <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
              Typical Performance Metrics
            </div>
            <div style="display: inline-flex; gap: 12px; flex-wrap: wrap; justify-content: center">
              <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                <div style="font-size: 18px; font-weight: 800">5-10 min</div>
                <div style="font-size: 10px; font-weight: 600">P50 LATENCY</div>
              </div>
              <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                <div style="font-size: 18px; font-weight: 800">30 min</div>
                <div style="font-size: 10px; font-weight: 600">P99 TARGET</div>
              </div>
              <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                <div style="font-size: 18px; font-weight: 800">1M+</div>
                <div style="font-size: 10px; font-weight: 600">ROWS/MINUTE</div>
              </div>
            </div>
          </div>
          <strong>The Integration Story:</strong> Reconciliation is not a
          standalone tool. At companies like Netflix and Airbnb, reconciliation
          checks are wired into workflow orchestrators. Yesterday's batch ETL
          job won't publish dashboards to business users until reconciliation
          validates that aggregates are consistent. This tight integration means
          data quality issues are caught before they impact decisions.
          <div style="padding: 14px 16px; border-left: 4px solid; border-radius: 0 6px 6px 0; margin: 12px 0; font-style: italic">
            <div style="font-size: 14px; line-height: 1.5">
              "Reconciliation is tightly integrated with ingestion,
              transformation, monitoring, and incident management. It's part of
              your system reliability story, not an offline audit tool."
            </div>
          </div>
        </div>
        <div
          class="card-diagram"
          style="margin-bottom: 24px; display: flex; justify-content: center"
        >
          <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
            <div style="display: flex; flex-direction: column; gap: 10px">
              <div style="display: flex; gap: 12px; align-items: center">
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; flex: 1; text-align: center">
                  <strong style="font-size: 13px">Billing DB</strong>
                  <div style="font-size: 10px; margin-top: 4px">500M rows</div>
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; flex: 1; text-align: center">
                  <strong style="font-size: 13px">Cloud DB</strong>
                  <div style="font-size: 10px; margin-top: 4px">500M rows</div>
                </div>
              </div>
              <div style="text-align: center; font-size: 20px; font-weight: bold">
                ↓
              </div>
              <div style="border: 2px solid; padding: 12px; border-radius: 6px; text-align: center">
                <strong style="font-size: 13px">Spark Cluster</strong>
                <div style="font-size: 10px; margin-top: 4px">
                  Join on order_id + Compare fields
                </div>
              </div>
              <div style="text-align: center; font-size: 20px; font-weight: bold">
                ↓
              </div>
              <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                <div style="font-size: 12px; font-weight: 600; margin-bottom: 6px">
                  Results:
                </div>
                <div style="font-size: 11px; line-height: 1.6">
                  amount: 99.97% match
                  <br />
                  currency: 99.95% match
                  <br />
                  Overall: 99.8% ✓ GREEN
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
                Reconciliation jobs run as distributed compute pipelines with
                three stages: preprocess (extract and normalize), compare (apply
                per column rules), and postprocess (aggregate metrics and alert)
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                At scale, systems process millions of records per minute,
                targeting p50 latency of 5 to 10 minutes and p99 under 30
                minutes for hourly reconciliation jobs running on medium sized
                clusters
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Results are aggregated at three levels: per column match rates
                (99.97% of amount values), per table match rates (99.8%
                overall), and health labels (green/amber/red based on
                thresholds)
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Production systems integrate reconciliation into workflow
                orchestrators, blocking downstream dashboards or reports until
                data quality is validated
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
                A billing reconciliation between on premises and cloud systems
                with 500 million order records might use Spark to join on
                order_id, compare amount and currency fields, and produce column
                level summaries showing 99.97% match rate on amounts
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">2</span>
              <span class="flex-grow-1 Learn_cardContent">
                Netflix style data platforms wire reconciliation checks into
                Airflow DAGs, ensuring yesterday's ETL job validates aggregates
                before updating executive dashboards
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default LessonDataReconciliationHowReconciliationWorksAtScale;
