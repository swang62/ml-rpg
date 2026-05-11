import type { Component } from "solid-js";

const LessonWarehouseCostOptimizationWorkloadIsolationAndRightSizingCompute: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Workload Isolation and Right Sizing Compute
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <strong>The Production Reality:</strong> A reasonably large
            analytics platform processes 500,000 events per second, runs
            hundreds of Extract Transform Load pipelines, and serves 500 to
            2,000 Business Intelligence users. Without workload isolation, a
            single expensive exploratory query can starve critical production
            ETL, missing Service Level Agreements. The solution is to separate
            compute resources by workload type, then dynamically size each pool
            based on actual demand.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Workload Isolation Pattern:
            </div>
            Modern warehouses support multiple independent compute pools. On
            Snowflake these are virtual warehouses. On Databricks or Spark these
            are separate autoscaling clusters or job queues. The typical split
            is three pools: First, ETL and batch processing. These are scheduled
            jobs with predictable windows, for example nightly aggregations from
            2 a.m. to 6 a.m. You can size this pool larger during its window and
            shut it down completely outside that window. A typical configuration
            might scale between 8 and 32 worker nodes during the batch window.
            Second, interactive Business Intelligence queries. These run
            throughout business hours with high concurrency but generally
            smaller scans. This pool might scale between 2 and 16 nodes, with
            auto-scaling reacting to queue depth. Target latency is subsecond to
            low single digit seconds for dashboards. Third, ad hoc exploration
            and data science. These workloads are unpredictable and can be
            expensive (full table scans, complex joins). Isolating them prevents
            a data scientist accidentally running a cartesian join from blocking
            dashboard refreshes. This pool might have strict query timeouts and
            lower priority scheduling.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Right Sizing the Math:
            </div>
            Suppose your nightly ETL processes 10 TB of source data to produce 2
            TB of curated warehouse tables, targeting 2 hour completion. With a
            cluster processing 100 GB per minute per 8 worker nodes, you need
            10,000 GB / 100 GB per minute equals 100 minutes with 8 workers. To
            hit the 2 hour (120 minute) target with headroom, 8 workers is
            sufficient. But if source volume spikes to 30 TB (3x normal), the
            same cluster takes 300 minutes (5 hours), missing the 6 a.m. SLA.
            With auto-scaling up to 24 workers (3x capacity), you process 300 GB
            per minute, completing in 100 minutes and staying within SLA even
            during spikes.
            <div style="margin: 8px 0; display: flex; flex-direction: column; align-items: center">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
                ETL Completion Time
              </div>
              <div style="display: inline-flex; gap: 12px; flex-wrap: wrap; justify-content: center">
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">100 min</div>
                  <div style="font-size: 10px; font-weight: 600">
                    NORMAL (10 TB)
                  </div>
                </div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">300 min</div>
                  <div style="font-size: 10px; font-weight: 600">
                    SPIKE (30 TB, NO SCALE)
                  </div>
                </div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">100 min</div>
                  <div style="font-size: 10px; font-weight: 600">
                    SPIKE (30 TB, AUTO-SCALE)
                  </div>
                </div>
              </div>
            </div>
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Reserved vs On-Demand Trade-offs:
            </div>
            For steady predictable workloads like nightly ETL, reserved capacity
            or committed use discounts reduce unit costs by 30 to 60 percent.
            You commit to running a certain size cluster for 1 to 3 years. The
            risk is over-commitment: if your workload shrinks or you migrate
            platforms, you still pay. For bursty or experimental workloads,
            on-demand pricing costs more per hour but you pay only for actual
            usage. A data science team that runs heavy training jobs twice a
            week should use on-demand. An ETL pipeline running every night for 4
            hours should consider reserved.
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>✓ In Practice:</strong> Large production systems often use
              hybrid models: reserved capacity for the baseline load that always
              runs, with auto-scaling to on-demand nodes for spikes above that
              baseline. This optimizes cost while maintaining SLA headroom.
            </div>
            Orchestration matters too. Azure Data Factory, Airflow, or similar
            tools manage hundreds of pipelines with different priorities. High
            priority jobs might run on cloud hosted auto-scaling runtimes.
            Steady nightly aggregations can use cheaper self-hosted runtimes or
            reserved capacity where you run at higher utilization and lower unit
            cost.
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 14px">
                <div style="text-align: center; font-weight: 700; font-size: 14px; margin-bottom: 4px">
                  Isolated Workload Pools
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px">ETL Pool</strong>
                  <div style="margin-top: 6px; font-size: 12px">
                    8-32 workers | 2am-6am window
                  </div>
                  <div style="margin-top: 4px; font-size: 11px">
                    Processes 10-30 TB nightly
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px">BI Query Pool</strong>
                  <div style="margin-top: 6px; font-size: 12px">
                    2-16 workers | Business hours
                  </div>
                  <div style="margin-top: 4px; font-size: 11px">
                    Target p95 latency: 2-5 seconds
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px">Ad Hoc Exploration</strong>
                  <div style="margin-top: 6px; font-size: 12px">
                    Variable size | Query timeouts enabled
                  </div>
                  <div style="margin-top: 4px; font-size: 11px">
                    Isolated to prevent blocking production
                  </div>
                </div>
                <div style="margin-top: 8px; padding: 10px; border: 2px dashed; border-radius: 6px; text-align: center; font-size: 12px; font-style: italic">
                  Each pool scales independently based on workload demand
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
                  Workload isolation prevents a single expensive ad hoc query
                  from starving critical ETL pipelines that must meet SLAs
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Auto-scaling between 8 and 32 workers allows nightly ETL to
                  handle 3x traffic spikes (10 TB to 30 TB) while completing in
                  the same 2 hour window
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Reserved capacity reduces unit costs by 30 to 60 percent for
                  predictable workloads but risks over-commitment if usage
                  patterns change
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Hybrid models use reserved capacity for baseline load plus
                  on-demand auto-scaling for spikes, optimizing both cost and
                  SLA compliance
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
                  A production system runs nightly ETL with 8 workers baseline
                  on reserved capacity at $2 per worker hour. During normal 10
                  TB loads this costs $16 for 2 hours. When volumes spike to 30
                  TB, auto-scaling to 24 on-demand workers at $3 per hour costs
                  $72, but prevents missing the 6 a.m. SLA.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Snowflake virtual warehouses can be configured with separate
                  sizes: SMALL (2 workers) for BI queries, LARGE (8 workers) for
                  ETL, and auto-suspend after 5 minutes of inactivity to avoid
                  paying for idle compute.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonWarehouseCostOptimizationWorkloadIsolationAndRightSizingCompute;
