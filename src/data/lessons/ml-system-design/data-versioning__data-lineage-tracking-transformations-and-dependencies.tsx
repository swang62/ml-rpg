import type { Component } from "solid-js";

const LessonDataVersioningDataLineageTrackingTransformationsAndDependencies: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Data Lineage: Tracking Transformations and Dependencies
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              What Data Lineage Captures
            </p>
            <p style="margin-top: 0">
              Data lineage captures where data came from and every
              transformation applied to it, forming a directed graph where nodes
              are datasets, columns, features, or models, and edges represent
              operations like joins, aggregations, or training runs. This graph
              connects data versions, code versions, environment specifications,
              and model artifacts into a complete audit trail.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Lineage Granularity Trade-offs
            </p>
            <p style="margin-top: 0">
              Lineage operates at different granularities with corresponding
              cost trade-offs. Table level lineage tracks dependencies between
              whole datasets, costing minimal overhead and scaling to millions
              of nodes. Column level lineage maps which output columns depend on
              which input columns, essential for schema evolution safety and
              adding moderate metadata overhead. Row level lineage traces
              individual output rows back to specific input rows, inflating
              storage 5 to 20 times and doubling CPU costs, reserved for
              regulated workloads and sensitive PII transformations.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Implementation Architecture
            </p>
            <p style="margin-top: 0">
              Production lineage systems store raw event logs as append only
              streams and build derived graph indexes with denormalized
              adjacency lists. At scale, lineage graphs reach millions of nodes
              and tens of millions of edges. Keeping common queries under 500
              milliseconds requires precomputing two to three hop neighborhoods,
              caching hot paths, and periodic compaction to collapse identical
              edges across daily partitions.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Payoff
            </p>
            <p style="margin-top: 0">
              The payoff is impact analysis answering what breaks if an upstream
              schema changes, reproducibility for any historical experiment, and
              root cause analysis when model accuracy suddenly drops.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 10px; align-items: center">
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center; min-width: 120px">
                  <strong style="font-size: 13px">Raw Events</strong>
                  <div style="font-size: 11px; margin-top: 2px">
                    v1: offset 0 to 5M
                  </div>
                </div>
                <div style="font-size: 22px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center; min-width: 120px">
                  <strong style="font-size: 13px">Feature Pipeline</strong>
                  <div style="font-size: 11px; margin-top: 2px">
                    code: commit 7a3f2b
                  </div>
                </div>
                <div style="font-size: 22px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center; min-width: 120px">
                  <strong style="font-size: 13px">Training Set</strong>
                  <div style="font-size: 11px; margin-top: 2px">
                    hash: abc123xyz
                  </div>
                </div>
                <div style="font-size: 22px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center; min-width: 120px">
                  <strong style="font-size: 13px">Model v42</strong>
                  <div style="font-size: 11px; margin-top: 2px">
                    AUC: 0.87, 150ms p99
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
                  Table level lineage provides coarse impact analysis at minimal
                  cost, suitable for warehouse scale tracking across thousands
                  of datasets with subsecond query performance
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Column level lineage enables precise schema evolution safety
                  and feature level audits, tracking which output columns derive
                  from which input columns with moderate metadata overhead
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Row level lineage inflates storage 5 to 20 times and doubles
                  compute costs, justified only for regulated workloads or
                  sensitive join operations requiring full audit trails
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Lineage graphs at enterprise scale contain millions of nodes
                  and tens of millions of edges, requiring denormalized
                  adjacency lists and precomputed summaries to keep queries
                  under 500 milliseconds
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Centralized orchestrator based lineage achieves consistent
                  coverage for scheduled jobs but misses ad hoc notebooks; app
                  instrumented approaches capture heterogeneous workloads but
                  require developer discipline
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
                  Uber Michelangelo tracks features as versioned, timestamped
                  entities with lineage connecting models to feature sets and
                  back to raw sources, preventing training serving skew through
                  consistent offline and online stores
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Airbnb Minerva defines canonical metrics as versioned
                  transformations with full lineage, enabling impact analysis
                  across dashboards, experiments, and ML models to guarantee
                  consistent governance
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  A lineage query finding all downstream impacts within 3 hops
                  of a schema change runs in under 500 milliseconds by
                  precomputing neighborhood summaries and caching frequently
                  accessed paths in a graph optimized store
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonDataVersioningDataLineageTrackingTransformationsAndDependencies;
