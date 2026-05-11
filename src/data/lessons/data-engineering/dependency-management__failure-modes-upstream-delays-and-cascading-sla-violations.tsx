import type { Component } from "solid-js";

const LessonDependencyManagementFailureModesUpstreamDelaysAndCascadingSlaViolations: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Failure Modes: Upstream Delays and Cascading SLA Violations
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <strong>The Ripple Effect Problem:</strong>
            The most common and dangerous failure mode in cross pipeline systems
            is upstream delay rippling through many downstream pipelines,
            causing cascading SLA violations. A single bottleneck can create a
            domino effect that impacts dozens of dependent jobs. Consider a real
            scenario. Pipeline A ingests clickstream data with expected runtime
            of 1 hour, finishing at 1:00 AM. Pipeline B normalizes that data,
            taking 20 minutes, finishing at 1:20 AM. Pipelines C, D, E, and F
            depend on B, each taking 30 to 60 minutes, all expected to finish by
            3:00 AM for morning business reports. One night, traffic spikes 3x
            due to a viral event. Pipeline A now takes 3 hours, finishing at
            3:00 AM instead of 1:00 AM. Pipeline B starts late and finishes at
            3:20 AM. Now pipelines C through F all start 2 hours late and finish
            between 4:00 AM and 5:00 AM, completely missing their 3:00 AM SLA.
            Business stakeholders see stale data and trust in the platform
            erodes.
            <div style="margin: 8px 0; display: flex; flex-direction: column; align-items: center">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
                Cascading Failure Timeline
              </div>
              <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap; justify-content: center">
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 10px; font-weight: 600">NORMAL</div>
                  <div style="font-size: 16px; font-weight: 800">1:00 AM</div>
                </div>
                <div style="font-size: 18px; font-weight: 800">→</div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 10px; font-weight: 600">DELAYED</div>
                  <div style="font-size: 16px; font-weight: 800">3:00 AM</div>
                </div>
                <div style="font-size: 18px; font-weight: 800">→</div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 10px; font-weight: 600">CASCADED</div>
                  <div style="font-size: 16px; font-weight: 800">5:00 AM</div>
                </div>
              </div>
            </div>
            <strong>The Invisible Data Quality Failure:</strong>A more subtle
            and dangerous failure mode is when upstream produces partial or
            corrupted data but does not fail visibly. Suppose an ingestion job
            has a bug that causes it to write only 50% of expected rows, but the
            job still exits with success code because it did not crash. Or a
            schema change upstream breaks an assumption downstream, but data
            validation is weak. Downstream pipelines happily run and produce
            incorrect metrics. Revenue reports show half the actual numbers.
            Recommendation features train on biased samples. These bugs can go
            undetected for days or weeks because the pipelines show green status
            in monitoring.
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>❗ Remember:</strong> Dependency management must track not
              just "job finished" but data quality thresholds. Expected row
              counts, null rates, distribution anomalies, and schema conformance
              must be part of the completion contract, not optional checks.
            </div>
            <strong>Handling Delays with Explicit States:</strong>
            Robust systems do not just mark partitions as SUCCESS or FAILED.
            They use explicit LATE or DELAYED states in metadata. When pipeline
            A misses its expected completion time by some threshold (for
            example, 30 minutes), metadata is updated to{" "}
            <code>status=LATE</code>. Downstream pipelines B and C can then make
            policy decisions: First, skip and proceed with degraded inputs if
            the data is optional. Second, wait up to a timeout threshold then
            fail explicitly to prevent invalid results. Third, send alerts to on
            call engineers while continuing to wait. Fourth, fall back to
            previous day's data if business logic allows. This requires
            configuration at the dependency level:{" "}
            <code>wait_policy=TIMEOUT</code>, <code>max_wait_minutes=60</code>,{" "}
            <code>fallback_partition=PREVIOUS_DAY</code>. Without explicit
            policies, you get unpredictable behavior where some jobs timeout
            arbitrarily and others wait forever.
            <strong>Backfills and Version Aware Dependencies:</strong>
            Backfilling is particularly tricky. Suppose you discover a bug
            affecting the last 7 days. You fix pipeline A and rerun it for those
            dates. How do dependent pipelines B and C detect that newer versions
            of data are available? Without version tracking, you risk mixing old
            and new data. Pipeline B might have already run for Dec 20 using
            buggy data from A. When A reruns Dec 20, B does not automatically
            reprocess unless you manually trigger it. At scale with hundreds of
            dependent jobs, manual triggering is error prone. Solution:
            partition plus version keys. Metadata tracks{" "}
            <code>dataset=events</code>, <code>partition=2025-12-20</code>,{" "}
            <code>version=2</code>. When A backfills, it writes version 2.
            Dependencies are configured to always use latest version:{" "}
            <code>required_version=LATEST</code>. The orchestrator detects the
            new version and automatically schedules dependent backfills for the
            affected date range.
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>✓ In Practice:</strong> Platforms like Dagster support
              asset versioning natively. When you rematerialize an upstream
              asset, downstream assets that depend on it are automatically
              marked as stale and can be configured to rematerialize
              recursively, propagating backfills across the entire dependency
              graph.
            </div>
            <strong>Cross Platform and Cyclic Dependencies:</strong>
            Another edge case appears with cross platform or cross environment
            dependencies. For example, a dbt project owned by Team A in one
            environment is used by Team B's Airflow DAG in another environment.
            Authentication, network access, and package versioning issues create
            failures like "permission denied" when cloning private repositories
            at runtime. Some teams solve this by packaging shared code or models
            and deploying them with the orchestrator runtime rather than
            fetching dynamically. The failure mode is pipelines running with
            stale shared code if deployment coordination is weak. Cyclic
            dependencies can creep in over time. Pipeline A depends on
            aggregated metrics computed by Pipeline C, which itself depends on
            transformations from Pipeline B, which depends on A. In a single DAG
            this is rejected as a cycle. Across separate pipelines, it is hidden
            and causes deadlocks or infinite retries. Governance and dependency
            analysis tools are needed to detect and prevent such topologies.
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Upstream delays cause cascading SLA violations: a 2 hour delay
                  in one pipeline can ripple to 4+ downstream jobs, missing
                  business critical deadlines like morning reports
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Partial or corrupted data with SUCCESS status is more
                  dangerous than failures: downstream produces invalid metrics
                  for days without detection unless quality thresholds are in
                  completion contracts
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Explicit LATE or DELAYED states with configurable policies
                  (skip, wait with timeout, fallback to previous data) prevent
                  unpredictable behavior during upstream delays
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Backfills without version tracking cause data inconsistency:
                  partition plus version keys (for example,
                  &lt;code&gt;date=2025-12-20&lt;/code&gt;,
                  &lt;code&gt;version=2&lt;/code&gt;) enable automatic
                  propagation of reruns across dependency graphs
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Cross platform dependencies and cyclic dependencies are hidden
                  failure modes requiring packaging strategies and dependency
                  analysis tools to prevent deadlocks at scale
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
                  Viral social media event causes 3x traffic spike, delaying
                  ingestion pipeline by 2 hours and cascading to 15 downstream
                  analytics jobs missing their 3:00 AM SLA, detected only when
                  business teams report stale dashboards
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Schema change in upstream events dataset breaks downstream
                  feature pipeline but job shows SUCCESS status. ML model trains
                  on nulls for 5 days before precision metrics drop enough to
                  trigger investigation
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonDependencyManagementFailureModesUpstreamDelaysAndCascadingSlaViolations;
