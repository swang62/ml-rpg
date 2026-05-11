import type { Component } from "solid-js";

const LessonDependencyManagementWhatIsCrossPipelineDependencyManagement: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            What is Cross-Pipeline Dependency Management?
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
                <strong>Cross-Pipeline Dependency Management</strong> is the
                coordination layer that ensures one data pipeline only runs when
                another pipeline has produced the right data, at the right
                version, with the right quality, without coupling them into a
                single monolith.
              </div>
            </div>
            <strong>The Core Problem:</strong>
            In modern data platforms, you rarely have just one ETL (Extract,
            Transform, Load) job. Instead, you have dozens or hundreds of
            pipelines owned by different teams. For example, you might have an
            ingestion pipeline that lands raw clickstream data from 8:00 PM to
            1:00 AM, a normalization pipeline that cleans it from 1:00 AM to
            1:20 AM, and then multiple downstream pipelines that need that
            cleaned data: recommendation features, billing reports, fraud
            detection. If each team independently schedules their pipeline at a
            fixed cron time like "run at 1:30 AM", you get race conditions.
            Sometimes the upstream normalization job runs longer due to a data
            volume spike, taking until 1:45 AM instead of 1:20 AM. The
            downstream job starting at 1:30 AM processes incomplete data,
            creating inconsistent metrics and very hard to debug issues.
            <strong>The Solution Framework:</strong>
            Instead of time based scheduling, pipelines declare explicit
            dependencies on data artifacts. The upstream pipeline writes its
            output and records completion in a metadata store:{" "}
            <code>dataset=user_events</code>, <code>date=2025-12-24</code>,{" "}
            <code>status=SUCCESS</code>, <code>row_count=3.2B</code>. The
            downstream pipeline waits for that specific signal before starting.
            Three types of dependencies exist. First, temporal dependencies like
            "run after pipeline X finishes for partition Y". Second, data
            dependencies like "run when dataset D version v is available and
            complete". Third, semantic dependencies like "run only when upstream
            conforms to schema contract S".
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>⚠️ Key Distinction:</strong> The data plane is where actual
              data files, tables, and streams live. The control plane is where
              statuses, events, and dependencies are managed. Robust systems
              separate these concerns. Implicit dependencies like "check if a
              file exists in storage" are fragile at scale compared to explicit
              dependencies tracked by a central orchestration or metadata
              system.
            </div>
            This coordination is typically handled by orchestrators like Apache
            Airflow, Dagster, or Prefect, or through event driven systems using
            Kafka topics or cloud pub/sub services.
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Modern data platforms have hundreds of pipelines owned by
                  different teams that need to coordinate their execution order
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Fixed time based scheduling creates race conditions where
                  downstream jobs process incomplete data if upstream jobs run
                  late
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Dependencies are modeled as explicit contracts on data
                  artifacts with status, version, and quality metadata, not just
                  task completion
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Three dependency types exist: temporal (when), data (what
                  version), and semantic (schema contracts)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Control plane (orchestration and metadata) must be separated
                  from data plane (actual storage) for robust dependency
                  management at scale
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
                  Streaming service ingests 5 to 10 TB of events from 8 PM to 1
                  AM, normalizes until 1:20 AM, then triggers recommendation
                  pipeline only when &lt;code&gt;status=SUCCESS&lt;/code&gt; and
                  &lt;code&gt;row_count&lt;/code&gt; meets threshold
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  E-commerce platform where billing pipeline waits for
                  &lt;code&gt;orders_normalized&lt;/code&gt; dataset version 2.3
                  before generating invoices, preventing billing errors from
                  outdated schemas
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonDependencyManagementWhatIsCrossPipelineDependencyManagement;
