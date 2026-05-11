import type { Component } from "solid-js";

const LessonDataLineageTrackingWhatIsDataLineageTracking: Component = () => (
  <div class="lesson-content">
    <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
      <div class="mb-4 p-4">
        <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
          What is Data Lineage Tracking?
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
              <strong>Data Lineage</strong> is a graph based system that tracks
              where data came from, how it was transformed, when it changed, and
              where it flows next across your data platform.
            </div>
          </div>
          <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
            The Core Problem:
          </div>
          Imagine you work at a company with thousands of data tables spread
          across multiple teams and systems. A critical dashboard suddenly shows
          wrong numbers. Where did the bad data come from? Which upstream tables
          are affected? Which downstream reports are now broken? Without
          lineage, you're looking at a black box. The problem becomes severe at
          scale. A single dashboard at Amazon might depend on hundreds of
          upstream tables, jobs spread across different clouds and regions. When
          that dashboard breaks at 3 AM, manual investigation could take hours
          or days.
          <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
            How Lineage Solves This:
          </div>
          Data lineage treats your data platform as a dependency graph with
          three core entities. First,{" "}
          <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
            processes
          </code>{" "}
          represent job definitions or pipeline steps. Second,{" "}
          <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
            runs
          </code>{" "}
          capture individual executions with timestamps and status. Third,{" "}
          <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
            events
          </code>{" "}
          record read and write operations on datasets. Each data processing job
          emits lineage events. When your batch job runs every 15 minutes
          processing 2 TB of clickstream data, it registers which datasets it
          read from and wrote to. Over time, these events build a complete graph
          connecting all your data flows.
          <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
            Real World Impact:
          </div>
          At Meta scale, this means tracking 10,000+ datasets, 5,000 scheduled
          jobs, and hundreds of dashboards. When a pipeline fails at 03:05 UTC,
          engineers can immediately see which reports downstream are now stale.
          When compliance asks where customer email addresses flow, you can
          trace from raw source through every transformation to final storage.
          Instead of hours of detective work, you get answers in seconds.
        </div>
        <div
          class="card-diagram"
          style="margin-bottom: 24px; display: flex; justify-content: center"
        >
          <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
            <div style="display: flex; flex-direction: column; gap: 12px; align-items: center">
              <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 160px; text-align: center">
                <strong style="font-size: 14px">Source: users_db</strong>
              </div>
              <div style="font-size: 24px; font-weight: bold">↓</div>
              <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 160px; text-align: center">
                <strong style="font-size: 14px">Process: ETL Job</strong>
                <div style="font-size: 11px; margin-top: 4px">
                  Ran: 03:15 UTC
                </div>
              </div>
              <div style="font-size: 24px; font-weight: bold">↓</div>
              <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 160px; text-align: center">
                <strong style="font-size: 14px">Output: analytics.users</strong>
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
                Lineage captures three entities: processes (job definitions),
                runs (executions with timestamps), and events (read/write
                operations on datasets)
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                At large organizations, lineage graphs can contain tens of
                millions of links connecting thousands of datasets across
                multiple systems and clouds
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Primary use cases include impact analysis before schema changes,
                incident debugging to find affected downstream systems, and
                compliance tracking for regulated data
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Without lineage, finding the root cause of bad data in a complex
                platform can take hours or days of manual investigation
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Lineage systems must handle scale limits, such as restricting
                graph traversals to 20 hops and 10,000 links to keep query
                latency under a few hundred milliseconds
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
                A batch job processes 2 TB of clickstream data every 15 minutes.
                It emits lineage events recording that it read from
                &lt;code&gt;raw.events&lt;/code&gt; at 03:15 UTC and wrote to
                &lt;code&gt;processed.user_sessions&lt;/code&gt;, creating a
                dependency link in the graph.
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">2</span>
              <span class="flex-grow-1 Learn_cardContent">
                When a critical fact table changes schema, engineers query
                lineage to discover it has 150 downstream dependencies including
                dashboards, ML models, and other tables. This prevents breaking
                production systems.
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">3</span>
              <span class="flex-grow-1 Learn_cardContent">
                During a production incident at 03:05 UTC, SREs use lineage to
                trace which downstream reports are stale. Instead of manually
                checking hundreds of jobs, they get a visual graph showing 47
                affected datasets within seconds.
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">4</span>
              <span class="flex-grow-1 Learn_cardContent">
                A compliance team needs to verify that EU customer data never
                flows to US only systems. They query column level lineage for
                the &lt;code&gt;user.region&lt;/code&gt; field and trace every
                downstream table and process that touches it.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default LessonDataLineageTrackingWhatIsDataLineageTracking;
