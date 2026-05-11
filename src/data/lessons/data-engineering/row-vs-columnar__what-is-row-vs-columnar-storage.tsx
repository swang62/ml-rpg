import type { Component } from "solid-js";

const LessonRowVsColumnarWhatIsRowVsColumnarStorage: Component = () => (
  <div class="lesson-content">
    <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
      <div class="mb-4 p-4">
        <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
          What is Row vs Columnar Storage?
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
              <strong>Storage format</strong> refers to how database systems
              physically organize data on disk. The two fundamental approaches
              are row based (storing complete records together) and columnar
              (storing values from the same field together).
            </div>
          </div>
          <strong>The Core Problem:</strong>
          Different workloads access data in completely different patterns. An
          Online Transaction Processing (OLTP) system handling orders or
          payments typically reads and writes whole records, a few at a time,
          with strict latency requirements like p99 under 20 milliseconds. An
          analytics system for reporting usually scans millions of rows but only
          needs a handful of columns, and can tolerate higher latency if
          throughput is good.
          <strong>Row Based Storage:</strong>
          Stores all columns of a row physically together on disk. A storage
          page might contain Row 1 with fields like{" "}
          <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
            user_id
          </code>
          ,{" "}
          <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
            name
          </code>
          ,{" "}
          <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
            email
          </code>
          ,{" "}
          <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
            signup_ts
          </code>
          , followed by Row 2 with the same structure. If your workload usually
          needs "the full user" or "the full order," this layout is ideal. You
          pay one disk seek and get the entire record. Traditional relational
          databases like MySQL and PostgreSQL use row based storage because they
          optimize for transactional workloads.
          <strong>Columnar Storage:</strong>
          Flips the layout completely. It stores values column by column. One
          block contains only{" "}
          <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
            user_id
          </code>{" "}
          values for thousands of rows, another block only{" "}
          <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
            country
          </code>
          , another{" "}
          <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
            last_login
          </code>
          . Analytical queries usually look like "compute an aggregate over a
          few columns across many rows." Columnar layouts minimize I/O because
          the engine reads only referenced columns. Systems like BigQuery,
          Snowflake, and file formats like Parquet and ORC use columnar storage.
          <div style="padding: 14px 16px; border-left: 4px solid; border-radius: 0 6px 6px 0; margin: 12px 0; font-style: italic">
            <div style="font-size: 14px; line-height: 1.5">
              "The format choice connects workload characteristics to storage
              layout, not just database brand names."
            </div>
          </div>
        </div>
        <div
          class="card-diagram"
          style="margin-bottom: 24px; display: flex; justify-content: center"
        >
          <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px">
              <div style="display: flex; flex-direction: column; gap: 8px">
                <div style="border: 2px solid; padding: 8px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 12px">Row Based</strong>
                </div>
                <div style="border: 2px solid; padding: 6px 8px; border-radius: 4px; font-size: 11px">
                  Row 1: id | name | email
                </div>
                <div style="border: 2px solid; padding: 6px 8px; border-radius: 4px; font-size: 11px">
                  Row 2: id | name | email
                </div>
                <div style="border: 2px solid; padding: 6px 8px; border-radius: 4px; font-size: 11px">
                  Row 3: id | name | email
                </div>
              </div>
              <div style="display: flex; flex-direction: column; gap: 8px">
                <div style="border: 2px solid; padding: 8px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 12px">Columnar</strong>
                </div>
                <div style="border: 2px solid; padding: 6px 8px; border-radius: 4px; font-size: 11px">
                  Column: id₁ id₂ id₃
                </div>
                <div style="border: 2px solid; padding: 6px 8px; border-radius: 4px; font-size: 11px">
                  Column: name₁ name₂ name₃
                </div>
                <div style="border: 2px solid; padding: 6px 8px; border-radius: 4px; font-size: 11px">
                  Column: email₁ email₂ email₃
                </div>
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
                Row based storage keeps all fields of a record together
                physically, optimized for reading or writing entire records with
                single disk access
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Columnar storage groups values by column across many records,
                optimized for scanning few columns across millions of rows
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                OLTP workloads with point queries under 20 milliseconds latency
                need row based format for efficient single record access
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Analytics workloads scanning billions of rows but only 5 to 10
                columns benefit from columnar format which reads only needed
                columns
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Columnar formats achieve 5x to 10x compression because similar
                data types stored together compress better than mixed record
                data
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
                MySQL storing user profiles row based: fetching one user reads
                all fields (name, email, address) in a single page access
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">2</span>
              <span class="flex-grow-1 Learn_cardContent">
                BigQuery storing event logs columnar: query "sum revenue by
                country" reads only revenue and country columns, skipping
                hundreds of other fields
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">3</span>
              <span class="flex-grow-1 Learn_cardContent">
                Parquet file with 1 billion events and 200 columns: analytics
                query touching 5 columns reads 2 GB instead of 400 GB with row
                format
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default LessonRowVsColumnarWhatIsRowVsColumnarStorage;
