import type { Component } from "solid-js";

const LessonPipelineArchitecturePatternsPipelineArchitectureTradeOffsAndAlternatives: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Pipeline Architecture Trade Offs and Alternatives
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <strong>When to Choose Pipeline Architecture:</strong>
            Pipeline architecture is not always the right choice. The decision
            depends on team structure, data volume, latency requirements, and
            how frequently logic changes.
            <div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 8px; margin: 12px 0; align-items: stretch">
              <div style="padding: 12px; border: 2px solid; border-radius: 6px">
                <div style="font-weight: 700; margin-bottom: 4px; font-size: 13px">
                  Monolithic Job
                </div>
                <div style="font-size: 12px">
                  Simpler, lower overhead, 1 min runtime. Hard to scale parts
                  independently.
                </div>
              </div>
              <div style="display: flex; align-items: center; font-weight: 800; font-size: 18px">
                vs
              </div>
              <div style="padding: 12px; border: 2px solid; border-radius: 6px">
                <div style="font-weight: 700; margin-bottom: 4px; font-size: 13px">
                  5 Stage Pipeline
                </div>
                <div style="font-size: 12px">
                  Modular, scales per stage, 2 to 3 min end to end due to
                  overhead.
                </div>
              </div>
            </div>
            Choose pipelines when you have multiple teams contributing logic.
            Each team can own specific stages with clear contracts, enabling
            independent development and deployment. Choose pipelines when
            different transformations have vastly different resource needs. Your
            join stage might need 10 times more memory than your validation
            stage. With pipelines, you scale them independently. Choose
            pipelines when you need reusability. The same cleaning or enrichment
            stages are used by multiple downstream consumers, reducing
            duplicated code. Avoid pipelines for small scale or single team
            projects where simplicity matters more than modularity. A monolithic
            batch job that runs in 1 minute is easier to understand, deploy, and
            debug than 5 pipeline stages that take 2 to 3 minutes end to end due
            to serialization and queue overhead.
            <strong>Alternative: Monolithic Batch Job</strong>
            For batch workloads under a few terabytes with a single team, a
            monolithic job is often better. You write one program that reads
            input, performs all transformations, and writes output. Deployment
            is simpler: one artifact, one scheduler entry. Debugging is easier:
            stack traces show the full context. Performance can be better: no
            network hops, no serialization between stages, and the query
            optimizer can optimize across the entire workflow. The downside is
            scaling. If your aggregation logic is the bottleneck, you must scale
            the entire job, overprovisioning for the other steps. As data grows
            from 2 TB to 20 TB, the monolith becomes unwieldy.
            <strong>Alternative: Interactive Query Engine</strong>
            If your primary use case is ad hoc analytics, not continuous
            processing, an interactive query engine (like Presto, BigQuery, or
            Athena) is better than pipelines. Analysts write SQL queries against
            your data lake and get results in seconds to minutes. There is no
            pipeline to build or maintain. But query engines are not suitable
            for complex multi step transformations with intermediate state, or
            for low latency requirements. Query engines typically target
            latencies of 5 to 30 seconds, not sub second.
            <strong>Alternative: Serverless Workflow Orchestrators</strong>
            Serverless platforms (like AWS Step Functions or Google Cloud
            Workflows) can model pipelines as state machines. Each stage is a
            serverless function invocation. This simplifies operations: no
            servers to manage. You pay per execution, not for idle capacity. The
            trade offs: cold starts add 100 to 500 milliseconds latency, making
            this unsuitable for low latency real time pipelines. Execution time
            limits (often 15 minutes per function) constrain long running
            transformations. Cost per invocation becomes expensive at high
            throughput: 10 million function invocations per day at $0.20 per
            million is $2 per day, but 1 billion invocations is $200 per day,
            where dedicated pipeline infrastructure might cost less.
            <div style="padding: 14px 16px; border-left: 4px solid; border-radius: 0 6px 6px 0; margin: 12px 0; font-style: italic">
              <div style="font-size: 14px; line-height: 1.5">
                "Choose pipelines when you have multiple teams, vastly different
                resource needs per stage, or require reusability. Choose
                monolithic jobs for small scale single team projects where
                simplicity trumps modularity."
              </div>
            </div>
            <strong>Decision Criteria:</strong>
            Use this framework. If your data is under 5 TB daily and one team
            owns all logic, start with a monolithic job. If you have 2 or more
            teams contributing transformations or stages have different scaling
            needs (one needs 10x more CPU than another), use pipelines. If
            primary use is ad hoc queries, use an interactive engine. If you
            want zero operational overhead and can tolerate cold start latency,
            try serverless workflows. Also consider change frequency. If logic
            changes weekly, the overhead of managing pipeline stages is worth it
            for testability and isolated deployments. If logic is stable for
            months, a simpler monolith reduces complexity.
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Pipelines add 2 to 3x runtime overhead versus monolithic jobs
                  due to serialization, network hops, and queue waits, but
                  enable independent scaling and team ownership
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Choose monolithic jobs for under 5 TB daily, single team
                  ownership, and stable logic; choose pipelines for multiple
                  teams, heterogeneous resource needs, or frequent logic changes
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interactive query engines (Presto, BigQuery) are better for ad
                  hoc analytics with 5 to 30 second latency; pipelines are
                  better for continuous processing with complex state
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Serverless workflows simplify operations but add 100 to 500ms
                  cold start latency and become expensive beyond 10 million
                  invocations daily
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
                  A startup with 2 TB daily event data and 3 engineers uses a
                  single Spark job that completes in 20 minutes. As they grow to
                  20 TB and 5 teams, they decompose into pipelines: one team
                  owns enrichment, another owns aggregation.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  An analytics team runs ad hoc queries on user behavior using
                  BigQuery, getting results in 10 to 20 seconds. They do not
                  need pipelines. A separate team building real time fraud
                  detection with sub second latency uses streaming pipelines.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonPipelineArchitecturePatternsPipelineArchitectureTradeOffsAndAlternatives;
