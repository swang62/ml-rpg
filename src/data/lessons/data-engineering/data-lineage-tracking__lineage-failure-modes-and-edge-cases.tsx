import type { Component } from "solid-js";

const LessonDataLineageTrackingLineageFailureModesAndEdgeCases: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Lineage Failure Modes and Edge Cases
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Incomplete Lineage:
            </div>
            The most dangerous failure mode is gaps in your lineage graph. If
            some jobs emit events but others don't, you have blind spots. During
            an incident, this leads to wrong conclusions. Real scenario: A
            metric drops 30%. Lineage traces it to source system A. You debug
            system A for an hour, find nothing wrong. Turns out a non
            instrumented Python script joined in data from system B, which had
            bad data. Because that script didn't emit lineage, your graph showed
            a direct edge from A to the metric, hiding the real culprit. Cloud
            platforms have subtle gaps. BigQuery records lineage for standard
            query and load jobs. But certain API operations, routine executions,
            or external table reads may not emit events. That means column level
            lineage can be missing for parts of your flow.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Schema Evolution Breaks Precision:
            </div>
            Column level lineage relies on parsing queries or instrumenting
            dataflow plans. When transformations involve complex user defined
            functions, machine learning models, or dynamic SQL generation,
            static analysis fails. A Spark job uses a UDF that combines three
            input columns via custom business logic you can't inspect. The
            lineage system either skips the link (creating a gap) or
            conservatively marks all output columns as dependent on all input
            columns (over linking). Over linking reduces precision: when you
            query which columns depend on{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              user.email
            </code>
            , you get 50 false positives.
            <div style="margin: 8px 0; display: flex; flex-direction: column; align-items: center">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
                Lineage Accuracy Problem
              </div>
              <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap; justify-content: center">
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 10px; font-weight: 600">GAP</div>
                  <div style="font-size: 16px; font-weight: 800">
                    Missing links
                  </div>
                </div>
                <div style="font-size: 18px; font-weight: 800">or</div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 10px; font-weight: 600">NOISE</div>
                  <div style="font-size: 16px; font-weight: 800">
                    50 false deps
                  </div>
                </div>
              </div>
            </div>
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Graph Explosion at Scale:
            </div>
            A heavily reused dimension table creates a hub node with thousands
            of downstream edges. Visualization tools try to render this and
            either crash or become unusably slow. Query engines hit their
            traversal limits. Production systems mitigate this with hard caps.
            Google Dataplex limits traversals to 10,000 links. When you exceed
            that, the UI shows 'Results truncated, refine your query.' You must
            add filters (time range, specific teams, or dataset patterns) to
            narrow the graph. In an interview, you should explicitly state you'd
            implement pagination, summarization nodes (showing '237 downstream
            dashboards' as one collapsed node), and depth limited search to keep
            latency under 200 to 500 ms at p95. Trying to render every edge is
            not feasible.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Cross Region and Manual Flows:
            </div>
            Some lineage systems only track within a single region or cloud. If
            your pipeline reads from us-east-1 and writes to eu-west-1, the
            lineage graph may show no direct connection. This breaks compliance
            analysis that needs to prove data never crosses regional boundaries.
            Manual data movement is even worse. A team exports a CSV from system
            A, does some Excel analysis, then uploads to system B. There's no
            automatic lineage unless they call a custom API to register the
            flow. Over months, these undocumented hops accumulate, fragmenting
            your end to end traceability. To detect gaps, monitor lineage
            coverage metrics. What percentage of your datasets have upstream
            lineage? For critical tables, require that new pipelines emit
            lineage before going to production. For legacy systems, backfill by
            instrumenting orchestration metadata or adding shims that emit
            events.
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>❗ Remember:</strong> Lineage is only as reliable as your
              instrumentation coverage. A 90% instrumented platform means 10% of
              incidents will send you down the wrong path. Prioritize
              instrumenting the critical 20% of flows that handle revenue,
              compliance, or core product metrics.
            </div>
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Retention and Forensics:
            </div>
            Keeping lineage forever is expensive. Most platforms retain hot
            lineage for 30 days, then archive or downsample. This works until
            you need to audit an ML model trained 6 months ago or investigate a
            data breach from last year. Archived lineage is slower to query and
            may lack full column level detail. Your forensic process must handle
            this: fast queries for recent incidents, slower batch reconstruction
            for older audits. Design your retention policy with compliance
            requirements in mind. Financial services may need 7 years of lineage
            history. Consumer apps might only need 90 days.
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 12px; align-items: center">
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 160px; text-align: center">
                  <strong style="font-size: 14px">Source System A</strong>
                </div>
                <div style="display: flex; gap: 12px; align-items: center">
                  <div style="font-size: 20px; font-weight: bold">→</div>
                  <div style="border: 2px dashed; padding: 10px 14px; border-radius: 6px; text-align: center">
                    <strong style="font-size: 12px">Mystery Script</strong>
                    <div style="font-size: 10px; margin-top: 2px">
                      No lineage
                    </div>
                  </div>
                  <div style="font-size: 20px; font-weight: bold">→</div>
                </div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 160px; text-align: center">
                  <strong style="font-size: 14px">Bad Metric</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Shows wrong upstream
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
                  Incomplete lineage is the most dangerous failure mode:
                  uninstrumented jobs create gaps that lead to incorrect root
                  cause analysis during incidents
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Complex transformations (UDFs, ML models, dynamic SQL) force
                  systems to either skip links or over link, reducing precision
                  for compliance queries
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Hub nodes with thousands of edges require hard limits (10,000
                  links per query), pagination, and summarization to keep UI
                  rendering under 500ms at p95
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Cross region flows and manual data movement (CSV exports,
                  spreadsheet uploads) break automatic lineage unless teams
                  explicitly register these hops via API
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Archive lineage for cost reasons (keeping 30 days hot is
                  common) but design forensic workflows to handle slower batch
                  reconstruction for audits beyond retention window
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
                  A Python script joins data from two systems but doesn't emit
                  lineage. When debugging a bad metric, engineers waste an hour
                  investigating the wrong upstream source because lineage shows
                  only half the flow.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  A Spark job uses a complex UDF combining three columns. The
                  lineage system conservatively marks all 20 output columns as
                  dependent on all 50 input columns, making compliance queries
                  return 200 false positives.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  A central dimension table has 3,000 downstream dependencies.
                  Querying its full lineage returns 'Results limited to 10,000
                  edges.' You filter to the last 7 days and your team's datasets
                  to see a usable subset.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">4</span>
                <span class="flex-grow-1 Learn_cardContent">
                  An ML team needs to audit a fraud model trained 8 months ago
                  for regulatory review. Hot lineage only goes back 30 days, so
                  they trigger a batch job to reconstruct the full dependency
                  graph from archived events, which takes 45 minutes.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonDataLineageTrackingLineageFailureModesAndEdgeCases;
