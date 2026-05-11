import type { Component } from "solid-js";

const LessonDataLineageTrackingLineageGranularityLevelsTableVsColumn: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Lineage Granularity Levels: Table vs Column
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              The Granularity Spectrum:
            </div>
            Data lineage operates at different levels of detail, each with
            distinct trade offs. The two critical levels are table level and
            column level lineage, though cross system lineage adds another
            dimension.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Table Level Lineage:
            </div>
            This tracks dependencies between entire datasets. If table B depends
            on table A, you capture that relationship. Simple and cheap to
            compute. Your lineage system records that the job read from{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              orders
            </code>{" "}
            and{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              customers
            </code>{" "}
            tables, then wrote to{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              order_summary
            </code>
            . You know if{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              orders
            </code>{" "}
            changes,{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              order_summary
            </code>{" "}
            might be affected. This works well for coarse impact analysis. If
            you're changing a table schema, table level lineage tells you which
            downstream jobs to check. At scale, a platform with 10,000 datasets
            might have 50,000 table level links, which is manageable.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Column Level Lineage:
            </div>
            This tracks that{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              order_summary.total_price
            </code>{" "}
            was derived specifically from{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              orders.unit_price
            </code>{" "}
            and{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              orders.tax_rate
            </code>
            . Much more powerful for governance and debugging. If a regulator
            asks where the{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              customer_email
            </code>{" "}
            field originates and where it flows, column level lineage gives
            precise answers. The catch is complexity. To derive column level
            dependencies, you must parse query text, build abstract syntax
            trees, or instrument dataflow plans. For very wide tables with
            hundreds of columns, or heavily denormalized schemas, the number of
            column links explodes. BigQuery limits this to roughly 1,500 column
            level links per job to keep metadata volume manageable.
            <div style="margin: 8px 0; display: flex; flex-direction: column; align-items: center">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
                Storage &amp; Compute Cost
              </div>
              <div style="display: inline-flex; gap: 12px; flex-wrap: wrap; justify-content: center">
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">50K</div>
                  <div style="font-size: 10px; font-weight: 600">
                    TABLE LINKS
                  </div>
                </div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">5M+</div>
                  <div style="font-size: 10px; font-weight: 600">
                    COLUMN LINKS
                  </div>
                </div>
              </div>
            </div>
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Cross System Lineage:
            </div>
            This connects objects across platforms. A Kafka topic feeds a Spark
            job that writes to a warehouse that powers a BI dashboard. Each
            system uses different naming conventions and metadata formats. Cross
            system lineage stitches these together into a unified graph, letting
            you trace from business report all the way back to raw event logs.
            At production scale with multi cloud deployments, this becomes
            essential. Your data might flow from AWS S3 to Google BigQuery to
            Tableau. Without cross system lineage, the graph has breaks, and you
            lose end to end visibility.
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>⚠️ Common Pitfall:</strong> Column level lineage requires
              parsing complex queries or instrumenting dataflow engines. User
              defined functions and ML transforms may not yield precise column
              mappings, leading to conservative over linking where many columns
              appear dependent even if they're not.
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
                  Table level lineage is cheaper and sufficient for coarse
                  impact analysis, typically generating 50,000 links for 10,000
                  datasets
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Column level lineage provides precision for governance and
                  compliance but can generate millions of links and requires
                  query parsing or dataflow instrumentation
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  BigQuery and similar warehouses limit column level links to
                  roughly 1,500 per job to control metadata volume and
                  computation overhead
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Cross system lineage connects multiple platforms (Kafka,
                  Spark, warehouses, BI tools) into a unified graph, critical
                  for multi cloud environments
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Column level tracking becomes expensive for wide tables with
                  hundreds of columns or denormalized schemas, forcing teams to
                  choose which fields to track
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
                  Table level: Job reads &lt;code&gt;orders&lt;/code&gt; and
                  &lt;code&gt;customers&lt;/code&gt;, writes
                  &lt;code&gt;order_summary&lt;/code&gt;. If
                  &lt;code&gt;orders&lt;/code&gt; schema changes, you know to
                  check &lt;code&gt;order_summary&lt;/code&gt;.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Column level:
                  &lt;code&gt;order_summary.total_price&lt;/code&gt; =
                  &lt;code&gt;orders.unit_price&lt;/code&gt; *
                  &lt;code&gt;orders.quantity&lt;/code&gt; +
                  &lt;code&gt;orders.tax&lt;/code&gt;. If you remove
                  &lt;code&gt;orders.tax&lt;/code&gt;, lineage shows exactly
                  which downstream columns break.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Cross system: Event originates in Kafka topic
                  &lt;code&gt;user.clicks&lt;/code&gt;, flows to Spark job
                  &lt;code&gt;sessionize_clicks&lt;/code&gt;, lands in BigQuery
                  table &lt;code&gt;analytics.sessions&lt;/code&gt;, feeds
                  Tableau dashboard &lt;code&gt;daily_engagement&lt;/code&gt;.
                  One unbroken lineage chain.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">4</span>
                <span class="flex-grow-1 Learn_cardContent">
                  A compliance audit asks where
                  &lt;code&gt;user.ssn&lt;/code&gt; flows. Column level lineage
                  traces it through 23 transformations across 5 systems, proving
                  it never enters the marketing database.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonDataLineageTrackingLineageGranularityLevelsTableVsColumn;
