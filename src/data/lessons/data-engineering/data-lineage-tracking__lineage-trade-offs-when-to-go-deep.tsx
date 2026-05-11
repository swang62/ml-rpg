import type { Component } from "solid-js";

const LessonDataLineageTrackingLineageTradeOffsWhenToGoDeep: Component = () => (
  <div class="lesson-content">
    <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
      <div class="mb-4 p-4">
        <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
          Lineage Trade Offs: When to Go Deep
        </h1>
        <div
          class="card-content-area"
          style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
        >
          <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
            The Granularity Decision:
          </div>
          Choosing lineage granularity is not about picking the best option.
          It's about matching capability to actual need while controlling cost
          and complexity.
          <div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 8px; margin: 12px 0; align-items: stretch">
            <div style="padding: 12px; border: 2px solid; border-radius: 6px">
              <div style="font-weight: 700; margin-bottom: 4px; font-size: 13px">
                Table Level
              </div>
              <div style="font-size: 12px">
                Cheap, fast, good for impact analysis. Covers 80 to 90% of use
                cases.
              </div>
            </div>
            <div style="display: flex; align-items: center; font-weight: 800; font-size: 18px">
              vs
            </div>
            <div style="padding: 12px; border: 2px solid; border-radius: 6px">
              <div style="font-weight: 700; margin-bottom: 4px; font-size: 13px">
                Column Level
              </div>
              <div style="font-size: 12px">
                Precise for governance, but 100x more links and parsing
                overhead.
              </div>
            </div>
          </div>
          Table level lineage works when you need coarse dependency tracking. If
          you're doing pre deployment impact analysis (will changing this table
          break downstream jobs?), table level suffices. Your team can review
          affected jobs manually. The metadata volume is manageable: 10,000
          tables might have 50,000 dependency links. Column level lineage
          becomes necessary when you must answer precise questions. Compliance
          asks: does{" "}
          <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
            user.ssn
          </code>{" "}
          ever flow to the marketing database? Table level lineage says the{" "}
          <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
            users
          </code>{" "}
          table feeds{" "}
          <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
            marketing.campaigns
          </code>
          , but not whether that specific column does. Column level lineage
          gives a definitive answer. The cost is real. Those same 10,000 tables
          with average 50 columns each create 5 million+ potential column links.
          Query parsing or dataflow instrumentation adds compute overhead.
          Warehouses like BigQuery cap column links at 1,500 per job
          specifically to avoid metadata explosions.
          <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
            Automation vs Manual Curation:
          </div>
          Automatic lineage extraction from query logs covers 80 to 90% of flows
          with zero developer effort. Cloud warehouses do this natively. Spark
          and Flink have integrations via OpenLineage or proprietary APIs. High
          adoption, low friction. The downside: automatic lineage misses
          context. It knows{" "}
          <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
            table_a
          </code>{" "}
          feeds{" "}
          <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
            table_b
          </code>
          , but not that{" "}
          <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
            table_b
          </code>{" "}
          is the golden source for revenue reporting. It doesn't capture manual
          data imports, spreadsheet uploads, or business semantics. Manual
          annotations via data catalogs fix this. Teams tag critical datasets,
          document business owners, and link to runbooks. This increases
          accuracy and usefulness for non technical stakeholders. The trade off
          is ongoing process. Someone must maintain annotations as pipelines
          evolve. In practice, start with automatic lineage to get broad
          coverage fast. Layer manual curation on the 20% of datasets that
          matter most for compliance, revenue, or critical operations.
          <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
            Vendor Integration vs Open Standards:
          </div>
          Vendor solutions like Google Dataplex or AWS Glue give deep
          integration and polished UIs. BigQuery lineage appears automatically.
          The visualization is production ready. No infrastructure to manage.
          The fragmentation risk is real. If your stack spans BigQuery,
          Snowflake, Databricks, and Kafka, vendor lineage gives you three
          separate graphs. Cross system flows have gaps. During an incident,
          you're mentally stitching together multiple tools. OpenLineage offers
          a unified schema. Spark, Flink, Airflow, and warehouses can all emit
          to a central lineage backend you control. One graph, one query API,
          full visibility across your heterogeneous stack. The trade off: you
          own the reliability and scalability of that central service. You must
          handle ingestion spikes, query optimization, and retention. For
          smaller teams, vendor solutions are faster. For large multi cloud
          platforms, open standards avoid fragmentation.
          <div style="padding: 14px 16px; border-left: 4px solid; border-radius: 0 6px 6px 0; margin: 12px 0; font-style: italic">
            <div style="font-size: 14px; line-height: 1.5">
              "The question isn't whether to implement lineage. It's what
              granularity you need and whether you can afford the operational
              overhead of doing it right."
            </div>
          </div>
        </div>
        <div class="Learn_keyTakeaways p-4 mb-4">
          <div class="Learn_keyTakeawaysHeader mb-3 pb-3">💡 Key Takeaways</div>
          <div class="d-flex flex-column gap-2">
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Table level lineage handles 80 to 90% of use cases at 100x lower
                cost than column level, ideal for impact analysis and schema
                change planning
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Column level lineage is mandatory for compliance and governance
                questions requiring proof of specific data flows, but generates
                millions of links for large schemas
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Automatic lineage covers most flows with zero friction but
                misses business context, manual imports, and semantic meaning
                that manual curation provides
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Vendor lineage solutions offer zero ops overhead and polished
                UIs but fragment visibility across multi cloud stacks, while
                OpenLineage unifies at the cost of owning infrastructure
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                The right strategy starts with automatic table level lineage for
                broad coverage, then adds column level tracking and manual
                curation to the 20% of datasets that are compliance critical
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
                A financial services company uses column level lineage to prove
                to auditors that &lt;code&gt;customer.ssn&lt;/code&gt; never
                flows to any third party analytics system, satisfying regulatory
                requirements.
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">2</span>
              <span class="flex-grow-1 Learn_cardContent">
                A startup with 500 tables and a single cloud uses BigQuery
                native lineage with zero configuration. As they grow to 5,000
                tables across AWS and GCP, they migrate to OpenLineage to unify
                the graph.
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">3</span>
              <span class="flex-grow-1 Learn_cardContent">
                An e-commerce platform uses table level lineage for daily
                operations (impact analysis, debugging). They add column level
                tracking only for PII fields (email, address, payment info) to
                satisfy GDPR data mapping requirements.
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">4</span>
              <span class="flex-grow-1 Learn_cardContent">
                A media company annotates their top 100 datasets manually in
                their catalog with business owners and SLAs. Automatic lineage
                handles the other 9,900 tables, giving 90% coverage at 10% of
                the curation effort.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default LessonDataLineageTrackingLineageTradeOffsWhenToGoDeep;
