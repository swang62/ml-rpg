import type { Component } from "solid-js";

const LessonDependencyManagementProductionScaleMetadataStoresAndDatasetTracking: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Production Scale: Metadata Stores and Dataset Tracking
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <strong>The Metadata Architecture:</strong>
            At scale, you need a centralized metadata store that tracks pipeline
            runs, dataset states, and dependency relationships. This becomes the
            source of truth for the control plane. For each pipeline run, you
            record pipeline ID, run ID, partition key (like date or region),
            status (RUNNING, SUCCESS, FAILED), timestamps, row counts, quality
            metrics, and upstream lineage. For each dataset or table, you track
            partitions and versions. When an upstream pipeline completes, it
            follows a heartbeat then finalize pattern. First, mark the partition
            as <code>status=RUNNING</code> with a timestamp. Then, after data is
            fully written and validated, atomically update to{" "}
            <code>status=SUCCESS</code> and publish an event. This prevents
            downstream jobs from starting on partially written data.
            <div style="margin: 12px 0">
              <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
                <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                  1
                </div>
                <div style="flex: 1; padding-top: 4px">
                  <strong>Write Start Signal:</strong> Pipeline begins writing
                  partition and records <code>status=RUNNING</code> with{" "}
                  <code>start_time</code> in metadata store.
                </div>
              </div>
              <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
                <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                  2
                </div>
                <div style="flex: 1; padding-top: 4px">
                  <strong>Data Quality Checks:</strong> After write completes,
                  validate row counts, null rates, schema conformance against
                  expected thresholds.
                </div>
              </div>
              <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
                <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                  3
                </div>
                <div style="flex: 1; padding-top: 4px">
                  <strong>Atomic Finalize:</strong> Update metadata to{" "}
                  <code>status=SUCCESS</code>, <code>row_count=3.2B</code>,{" "}
                  <code>quality_passed=true</code>, and publish event to trigger
                  downstream.
                </div>
              </div>
            </div>
            <strong>Real World Scale Numbers:</strong>A large Airflow deployment
            at a company like Uber or Airbnb manages 500 to 2,000 DAGs with
            10,000 to 50,000 tasks executing per day. Typical SLA expectations
            are p50 task start latency under 30 seconds after dependency
            satisfaction, p99 under 2 minutes, with end to end pipeline SLAs
            like "recommendation features ready by 2:00 AM with 99.5% success
            rate". Netflix has documented processing terabytes of data daily
            across hundreds of interdependent pipelines. Their metadata layer
            tracks millions of partition states, with updates happening at 1,000
            to 10,000 events per second during peak hours. The metadata store
            must handle high write throughput while supporting low latency reads
            for dependency checks.
            <div style="margin: 8px 0; display: flex; flex-direction: column; align-items: center">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
                Typical Production Metrics
              </div>
              <div style="display: inline-flex; gap: 12px; flex-wrap: wrap; justify-content: center">
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">2,000</div>
                  <div style="font-size: 10px; font-weight: 600">DAGs</div>
                </div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">50K</div>
                  <div style="font-size: 10px; font-weight: 600">TASKS/DAY</div>
                </div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">99.5%</div>
                  <div style="font-size: 10px; font-weight: 600">
                    SLA SUCCESS
                  </div>
                </div>
              </div>
            </div>
            <strong>File Based Markers:</strong>A common pattern for storage
            layer coordination is writing a small success marker file like{" "}
            <code>_SUCCESS</code> or <code>.DONE</code> to indicate all data
            files for a partition are complete. Downstream jobs check for this
            marker instead of scanning directories or listing files, avoiding
            race conditions where data is still being written. For example, an
            ingestion job writes 10,000 Parquet files to{" "}
            <code>s3://data/events/date=2025-12-24/</code> over 20 minutes. Only
            after all files are written does it write{" "}
            <code>s3://data/events/date=2025-12-24/_SUCCESS</code>. Downstream
            jobs poll or receive an event about the marker file, not the
            individual data files, ensuring they never read incomplete
            partitions.
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Centralized metadata stores track millions of partition states
                  with 1,000 to 10,000 updates per second during peak, requiring
                  high write throughput and low read latency
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Heartbeat then finalize pattern prevents downstream jobs from
                  reading partial data: write start signal, validate quality,
                  atomically mark SUCCESS and publish event
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Production Airflow deployments manage 500 to 2,000 DAGs
                  executing 10,000 to 50,000 tasks daily with p50 start latency
                  under 30 seconds, p99 under 2 minutes
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  File based success markers like
                  &lt;code&gt;_SUCCESS&lt;/code&gt; eliminate race conditions by
                  signaling partition completeness without requiring directory
                  scans
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  SLA tracking is critical: platforms target 99.5% success rates
                  with specific deadlines like "features ready by 2:00 AM" for
                  business operations
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
                  Netflix metadata layer processes terabytes daily across
                  hundreds of pipelines, tracking partition states with quality
                  metrics like &lt;code&gt;row_count=3.2B&lt;/code&gt; and
                  &lt;code&gt;null_rate=0.02%&lt;/code&gt;
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Spark jobs writing to S3 output
                  &lt;code&gt;_SUCCESS&lt;/code&gt; marker only after all tasks
                  commit, preventing Hive queries from reading partial results
                  during multi hour writes
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonDependencyManagementProductionScaleMetadataStoresAndDatasetTracking;
