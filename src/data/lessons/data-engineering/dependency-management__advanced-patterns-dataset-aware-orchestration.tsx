import type { Component } from "solid-js";

const LessonDependencyManagementAdvancedPatternsDatasetAwareOrchestration: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Advanced Patterns: Dataset Aware Orchestration
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <strong>Beyond Task Dependencies:</strong>
            Traditional orchestrators reason about tasks and their execution
            order. You say "Task B depends on Task A". But at scale, this
            abstraction leaks. What you really care about is data: "Analytics
            pipeline needs <code>user_events</code> dataset for partition{" "}
            <code>2025-12-24</code> with quality validation passed". The task is
            just a means to produce or consume that data. Dataset aware
            orchestration shifts the mental model. Instead of declaring task
            level dependencies, you declare dependencies on data artifacts. The
            orchestrator understands datasets as first class entities with
            lineage, versions, partitions, and quality metadata. This leads to
            more robust and maintainable systems at scale.
            <strong>How Airflow Datasets Work:</strong>
            Starting with Airflow 2.4, you can define datasets as URIs like{" "}
            <code>s3://bucket/events/date=2025-12-24</code> or logical names
            like <code>dataset://warehouse/user_events</code>. Upstream DAGs
            declare they produce these datasets. Downstream DAGs declare they
            are triggered by these datasets. When an upstream task completes, it
            emits a dataset update event. Airflow tracks which datasets have
            been updated and automatically schedules downstream DAGs that depend
            on them, without polling or explicit sensors. This reduces scheduler
            overhead dramatically. Instead of 10,000 sensors polling metadata,
            you have event driven triggers. The benefit compounds with complex
            dependencies. If Pipeline C depends on both <code>user_events</code>{" "}
            and <code>purchase_events</code>, it only runs when both datasets
            are ready for the same partition. The orchestrator handles the
            coordination logic automatically.
            <div style="margin: 12px 0; border: 2px solid; border-radius: 6px; overflow: hidden">
              <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; font-weight: 700; font-size: 12px">
                <div style="padding: 8px 12px; border-right: 1px solid">
                  Feature
                </div>
                <div style="padding: 8px 12px; border-right: 1px solid">
                  Task Dependencies
                </div>
                <div style="padding: 8px 12px">Dataset Dependencies</div>
              </div>
              <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; font-size: 12px">
                <div style="padding: 8px 12px; border-right: 1px solid; border-bottom: 1px solid; font-weight: 600">
                  Abstraction
                </div>
                <div style="padding: 8px 12px; border-right: 1px solid; border-bottom: 1px solid">
                  Execution order
                </div>
                <div style="padding: 8px 12px; border-bottom: 1px solid">
                  Data artifacts
                </div>
              </div>
              <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; font-size: 12px">
                <div style="padding: 8px 12px; border-right: 1px solid; border-bottom: 1px solid; font-weight: 600">
                  Cross DAG
                </div>
                <div style="padding: 8px 12px; border-right: 1px solid; border-bottom: 1px solid">
                  Sensors + polling
                </div>
                <div style="padding: 8px 12px; border-bottom: 1px solid">
                  Event driven
                </div>
              </div>
              <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; font-size: 12px">
                <div style="padding: 8px 12px; border-right: 1px solid; font-weight: 600">
                  Lineage
                </div>
                <div style="padding: 8px 12px; border-right: 1px solid">
                  Implicit
                </div>
                <div style="padding: 8px 12px">Explicit &amp; tracked</div>
              </div>
            </div>
            <strong>Dagster Assets:</strong>
            Dagster takes this further with software defined assets. An asset is
            a Python function decorated with <code>@asset</code> that produces a
            data artifact. Dependencies are declared via function parameters: if
            asset <code>normalized_events</code> takes <code>raw_events</code>{" "}
            as a parameter, Dagster automatically infers the dependency. The key
            insight is assets know their own materialization logic. You can view
            the dependency graph, see which assets are stale because upstream
            changed, and selectively rematerialize parts of the graph. Backfills
            become semantic: "rematerialize this asset and all downstream for
            date range X" propagates automatically. Dagster tracks asset
            versions using content hashing. If the code for an asset changes,
            downstream assets that depend on it are marked stale. This enables
            impact analysis: "If I change this transformation, which 50
            downstream assets need recomputation?"
            <div style="padding: 14px 16px; border-left: 4px solid; border-radius: 0 6px 6px 0; margin: 12px 0; font-style: italic">
              <div style="font-size: 14px; line-height: 1.5">
                "Dataset aware orchestration shifts debugging from 'why did this
                task fail' to 'which data is missing or stale'. The latter is
                the question data engineers actually need to answer."
              </div>
            </div>
            <strong>Multi Project dbt Stacks:</strong>
            For transformation heavy pipelines, dbt (data build tool) projects
            themselves become dependency units. A parent dbt project defines
            core data models. Child projects in separate repositories depend on
            those models using the <code>ref()</code> function across projects.
            The challenge is runtime coordination. If you clone the parent
            project from a private Git repository at runtime, you need
            authentication tokens, network access, and correct version pinning.
            Production failures appear as "permission denied" or "model not
            found" errors. A more robust pattern packages the parent project and
            deploys it with the orchestrator. The child project references
            models via installed package names rather than dynamic Git clones.
            This requires strict version management: parent releases new version
            1.5, child must explicitly upgrade its dependency. But it eliminates
            runtime authentication issues and makes dependencies testable in
            CI/CD.
            <strong>Observability and Impact Analysis:</strong>
            With dataset aware systems, you can build powerful observability
            tools. A lineage graph shows all upstream producers and downstream
            consumers for any data artifact. You can answer questions like "If
            this pipeline is delayed by 1 hour, which 30 downstream jobs miss
            their SLAs?" or "This dataset has 10% more nulls than yesterday,
            which reports are affected?" Metrics like number of blocked runs,
            average dependency wait time, and failure propagation depth help
            operators spot systemic issues. At Netflix scale with hundreds of
            interdependent pipelines, these views are critical for platform
            health. Without them, debugging becomes "grep logs for 2 hours
            hoping to find the root cause".
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>✓ In Practice:</strong> Companies like Airbnb and LinkedIn
              have built internal lineage platforms that ingest metadata from
              Airflow, Spark, Hive, and Presto to build a unified view. When an
              upstream table schema changes, they can proactively alert owners
              of 50+ downstream dashboards and pipelines before breakage occurs.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 550px">
              <div style="text-align: center; font-weight: 700; margin-bottom: 12px; font-size: 14px">
                Dataset-Aware Dependency Graph
              </div>
              <div style="display: flex; flex-direction: column; gap: 14px; align-items: center">
                <div style="display: flex; gap: 12px; align-items: center">
                  <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center; min-width: 120px">
                    <strong style="font-size: 13px">Ingestion DAG</strong>
                    <div style="font-size: 10px; margin-top: 4px">produces</div>
                  </div>
                  <div style="font-size: 20px; font-weight: bold">→</div>
                  <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center; min-width: 140px">
                    <strong style="font-size: 13px">raw_events</strong>
                    <div style="font-size: 10px; margin-top: 4px">
                      date=2025-12-24
                    </div>
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold">↓ triggers</div>
                <div style="display: flex; gap: 12px; align-items: center">
                  <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center; min-width: 120px">
                    <strong style="font-size: 13px">Transform DAG</strong>
                    <div style="font-size: 10px; margin-top: 4px">
                      consumes &amp; produces
                    </div>
                  </div>
                  <div style="font-size: 20px; font-weight: bold">→</div>
                  <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center; min-width: 140px">
                    <strong style="font-size: 13px">clean_events</strong>
                    <div style="font-size: 10px; margin-top: 4px">
                      v2, quality_passed
                    </div>
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold">↓ triggers</div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center; min-width: 140px">
                  <strong style="font-size: 13px">Analytics DAGs</strong>
                  <div style="font-size: 10px; margin-top: 4px">
                    auto-scheduled
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
                  Dataset aware orchestration reasons about data artifacts as
                  first class entities rather than task execution order,
                  reducing scheduler overhead by replacing polling sensors with
                  event driven triggers
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Airflow 2.4+ datasets enable automatic cross DAG triggering
                  when data artifacts are ready, handling complex multi dataset
                  dependencies without explicit sensor tasks
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Dagster assets use content hashing for version tracking,
                  automatically marking downstream assets as stale when upstream
                  code or data changes, enabling precise impact analysis
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Multi project dbt stacks require packaging parent projects
                  with orchestrator deployments rather than runtime Git clones
                  to eliminate authentication failures in production
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Lineage graphs at Netflix and Airbnb scale ingest metadata
                  from multiple systems to answer impact questions like "If this
                  pipeline delays 1 hour, which 30 downstream SLAs are
                  violated?"
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
                  Airflow dataset triggers: upstream DAG emits
                  &lt;code&gt;dataset://warehouse/user_events&lt;/code&gt;
                  update, automatically scheduling 5 downstream DAGs that depend
                  on it within seconds without polling overhead
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Dagster asset
                  &lt;code&gt;normalized_events(raw_events)&lt;/code&gt;
                  automatically infers dependency, tracks version via code hash,
                  and rematerializes all 20 downstream assets when
                  transformation logic changes
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonDependencyManagementAdvancedPatternsDatasetAwareOrchestration;
