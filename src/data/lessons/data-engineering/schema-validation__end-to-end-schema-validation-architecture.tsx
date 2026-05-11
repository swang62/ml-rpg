import type { Component } from "solid-js";

const LessonSchemaValidationEndToEndSchemaValidationArchitecture: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            End to End Schema Validation Architecture
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              The Multi Layer Reality:
            </div>
            In production at companies like Netflix or Uber, data flows through
            multiple stages: microservices publish 100k to 500k events per
            second to a message bus like Kafka, streaming consumers aggregate
            data in real time, and batch ETL jobs load data into warehouses
            serving dashboards with sub second query latency (p95 under 1
            second). Schema validation cannot sit at just one point. You need
            defense in depth.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Three Critical Validation Boundaries:
            </div>
            <div style="margin: 12px 0">
              <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
                <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                  1
                </div>
                <div style="flex: 1; padding-top: 4px">
                  <strong>Producer Boundary:</strong> Services validate outgoing
                  events against shared schema definitions before publishing.
                  This prevents bad data from ever entering the message bus, but
                  tightly couples producers to governance and can block rapid
                  iteration.
                </div>
              </div>
              <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
                <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                  2
                </div>
                <div style="flex: 1; padding-top: 4px">
                  <strong>Message Bus Boundary:</strong> A schema registry
                  stores all topic schema versions. When producers publish, the
                  registry validates compatibility. LinkedIn uses this pattern
                  for Kafka topics to protect thousands of downstream consumers
                  with strong guarantees.
                </div>
              </div>
              <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
                <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                  3
                </div>
                <div style="flex: 1; padding-top: 4px">
                  <strong>Storage Boundary:</strong> When writing to data lake
                  tables or warehouses, systems like Delta Lake enforce table
                  schemas. Writes with extra columns or type mismatches are
                  rejected, catching issues from heterogeneous or untrusted
                  sources.
                </div>
              </div>
            </div>
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Real World Example:
            </div>
            Netflix uses validation at multiple layers: contracts in logging
            libraries, schema registries for event streams, and enforcement in
            storage formats. The goal is catching drift as early as possible
            while containing damage when something escapes early checks.
            Consider a payment service publishing events. At the library level,
            the SDK validates the{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              amount
            </code>{" "}
            field is an integer before serialization. At the registry, the
            schema version is checked for compatibility with existing consumers.
            At the data lake, Delta Lake verifies the event matches the table
            schema before committing.
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>✓ In Practice:</strong> At 200k events per second,
              validation overhead matters. Keep per message validation under 1
              ms p99 by pre materializing schema checks and avoiding reflection
              heavy logic. Otherwise you will need massive compute resources
              just for validation.
            </div>
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              The Latency Consideration:
            </div>
            Each validation layer adds latency. Producer side validation might
            add 0.5 to 2 ms. Registry checks add another 1 to 3 ms for remote
            lookups (less with caching). Storage validation happens
            asynchronously in batch writes. For systems with p99 publish latency
            budgets under 20 ms, you must carefully distribute validation work
            and use caching aggressively.
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 12px; align-items: center">
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 160px; text-align: center">
                  <strong style="font-size: 14px">Microservice</strong>
                  <div style="font-size: 10px; margin-top: 4px">
                    Validation Layer 1
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold">↓ +0.5-2ms</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 160px; text-align: center">
                  <strong style="font-size: 14px">Schema Registry</strong>
                  <div style="font-size: 10px; margin-top: 4px">
                    Validation Layer 2
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold">↓ +1-3ms</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 160px; text-align: center">
                  <strong style="font-size: 14px">Kafka Topic</strong>
                  <div style="font-size: 10px; margin-top: 4px">
                    100k events/sec
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 160px; text-align: center">
                  <strong style="font-size: 14px">Data Lake (Delta)</strong>
                  <div style="font-size: 10px; margin-top: 4px">
                    Validation Layer 3
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
                  At scale, validation happens at three boundaries: producer
                  (prevent bad data entry), message bus registry (protect
                  downstream consumers), and storage (catch heterogeneous
                  sources)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Companies like Netflix and LinkedIn use multi layer defense:
                  validation in logging libraries, schema registries for Kafka
                  topics, and enforcement in storage formats like Delta Lake
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Each validation layer adds latency: producer validation adds
                  0.5 to 2 ms, registry checks add 1 to 3 ms, requiring careful
                  optimization to meet p99 publish budgets under 20 ms
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  At 200k events per second, keep per message validation under 1
                  ms p99 by pre materializing schema checks and avoiding
                  expensive reflection or remote lookups
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
                  LinkedIn validates Kafka messages at the schema registry
                  boundary to protect thousands of downstream consumers from
                  incompatible schema changes
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  A payment service publishing 100k events per second validates
                  &lt;code&gt;amount&lt;/code&gt; fields at the SDK level,
                  checks schema compatibility at the registry, then Delta Lake
                  enforces table schema at write time
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  With validation overhead of 3 to 5 ms per message and 200k
                  events per second, you need significant compute resources
                  unless you optimize with caching and pre materialized checks
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonSchemaValidationEndToEndSchemaValidationArchitecture;
