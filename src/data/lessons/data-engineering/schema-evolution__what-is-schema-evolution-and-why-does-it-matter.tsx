import type { Component } from "solid-js";

const LessonSchemaEvolutionWhatIsSchemaEvolutionAndWhyDoesItMatter: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            What is Schema Evolution and Why Does it Matter?
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              The Core Problem:
            </div>
            Imagine you have a data platform processing millions of events per
            day. Your clickstream event contains user_id, url, and timestamp.
            Next week, the product team wants to add device_type and
            experiment_bucket fields. Without schema evolution, you face a
            terrible choice: Either shut down the entire pipeline to migrate
            historical data and upgrade every consumer simultaneously, or create
            a completely new event type and maintain two parallel systems.
            Schema evolution solves this by letting your data structures change
            over time while existing data and applications keep working. It is
            not just about adding fields. It is a disciplined approach to
            managing structural change across producers, storage, and consumers
            that may deploy at different times.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              How It Works:
            </div>
            The key insight is treating schema as a versioned contract with
            explicit compatibility rules. When someone wants to add those new
            fields, they create schema version 2. Each message or file gets
            tagged with its schema version identifier. Producers upgrade to
            version 2 over a day. Old consumers continue using their reader
            schema (version 1) and simply ignore the new fields they do not
            understand. Their processing stays stable at, for example, 50
            thousand events per second with p99 latency under 100 milliseconds.
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>✓ In Practice:</strong> LinkedIn processes trillions of
              events per day through Kafka clusters. Schemas change weekly as
              teams add features. Without evolution support, this would require
              coordinating deployments across thousands of microservices
              simultaneously, which is operationally impossible at that scale.
            </div>
            The system maintains a schema history in a central registry or table
            metadata. Query engines and stream processors consult this history
            to translate between versions automatically. A batch job reading
            from your data lake sees a logical table view. When it encounters
            files written with version 1 (missing the new fields), the engine
            treats those fields as null. When it reads version 2 files, it gets
            the actual values. Your ETL job continues running in 30 minutes for
            a 2 terabyte partition, regardless of schema changes upstream.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              The Business Impact:
            </div>
            Without proper schema evolution, teams face a painful trade off.
            Either they slow down product development by requiring lockstep
            deployments across every service, or they accumulate technical debt
            through duplicated event types and fragile custom logic. Schema
            evolution enables independent deployment cadences while keeping your
            data ecosystem coherent and queryable over years of change.
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="text-align: center; font-weight: 700; font-size: 15px; margin-bottom: 8px">
                  Schema Evolution Timeline
                </div>
                <div style="display: flex; gap: 16px; align-items: center">
                  <div style="border: 2px solid; padding: 12px; border-radius: 6px; flex: 1">
                    <strong style="font-size: 13px">Version 1 (Day 1)</strong>
                    <div style="margin-top: 8px; font-size: 12px; font-family: monospace">
                      user_id
                      <br />
                      url
                      <br />
                      timestamp
                    </div>
                  </div>
                  <div style="font-size: 24px; font-weight: bold">→</div>
                  <div style="border: 2px solid; padding: 12px; border-radius: 6px; flex: 1">
                    <strong style="font-size: 13px">Version 2 (Day 8)</strong>
                    <div style="margin-top: 8px; font-size: 12px; font-family: monospace">
                      user_id
                      <br />
                      url
                      <br />
                      timestamp
                      <br />
                      <span style="font-weight: bold">device_type*</span>
                      <br />
                      <span style="font-weight: bold">experiment_bucket*</span>
                    </div>
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px; margin-top: 8px">
                  <div style="font-size: 12px">
                    <strong>Old Consumer:</strong> Reads both versions, ignores
                    new fields
                    <br />
                    <strong>New Consumer:</strong> Reads both versions, uses
                    defaults for v1 data
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
                  Schema evolution enables independent deployment of producers
                  and consumers without requiring lockstep upgrades or data
                  migration
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Each data artifact (message, file, row) is tagged with a
                  schema version identifier that references its structure at
                  write time
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Consumers use schema resolution algorithms to translate
                  between writer and reader schema versions, filling defaults
                  for missing fields automatically
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Real systems like LinkedIn process trillions of events daily
                  with schemas changing weekly, which would be impossible
                  without evolution support
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  The alternative to schema evolution is maintaining parallel
                  systems for each version or coordinating downtime across
                  thousands of services
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
                  Clickstream event evolution: Start with user_id, url,
                  timestamp in v1. Add device_type and experiment_bucket in v2.
                  Old fraud detection service continues processing at 50k
                  events/sec without code changes.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Data lake with mixed schema versions: Hourly Parquet files
                  contain v1 through v5. Query engine reads logical table view,
                  returning null for fields missing in older files, keeping ETL
                  at 30 minutes for 2TB partition.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonSchemaEvolutionWhatIsSchemaEvolutionAndWhyDoesItMatter;
