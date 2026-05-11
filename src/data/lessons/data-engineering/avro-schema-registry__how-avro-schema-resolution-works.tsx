import type { Component } from "solid-js";

const LessonAvroSchemaRegistryHowAvroSchemaResolutionWorks: Component = () => (
  <div class="lesson-content">
    <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
      <div class="mb-4 p-4">
        <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
          How Avro Schema Resolution Works
        </h1>
        <div
          class="card-content-area"
          style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
        >
          <strong>The Core Mechanism:</strong> Avro's power lies in dynamic
          schema resolution at read time. Unlike formats where schemas are
          compiled into code, Avro keeps writer and reader schemas separate and
          reconciles them during deserialization. This enables a critical
          capability: old code can read new data, and new code can read old
          data, as long as compatibility rules are followed.
          <div style="margin: 12px 0">
            <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
              <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                1
              </div>
              <div style="flex: 1; padding-top: 4px">
                <strong>Producer writes:</strong> Data is serialized using the
                writer schema known at production time. The schema ID is
                embedded in a 5 byte header (1 magic byte + 4 byte integer
                schema ID).
              </div>
            </div>
            <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
              <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                2
              </div>
              <div style="flex: 1; padding-top: 4px">
                <strong>Consumer reads:</strong> Extracts the schema ID, queries
                Schema Registry (caching the result locally), and retrieves the
                writer schema used to encode the message.
              </div>
            </div>
            <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
              <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                3
              </div>
              <div style="flex: 1; padding-top: 4px">
                <strong>Resolution happens:</strong> Avro compares writer schema
                to reader schema field by field. Fields in writer but not reader
                are ignored. Fields in reader but not writer use default values.
                Types must match or have defined promotions.
              </div>
            </div>
          </div>
          <strong>Concrete Example:</strong> A producer using schema version 5
          writes an event with fields{" "}
          <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
            user_id
          </code>
          ,{" "}
          <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
            email
          </code>
          , and{" "}
          <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
            created_at
          </code>
          . A consumer using schema version 7 expects{" "}
          <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
            user_id
          </code>
          ,{" "}
          <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
            email
          </code>
          , and a new{" "}
          <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
            phone_number
          </code>{" "}
          field with default null. Avro resolution maps the two shared fields
          directly and fills{" "}
          <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
            phone_number
          </code>{" "}
          with null. Reading succeeds without redeploying the producer.
          <strong>Performance Characteristics:</strong> Schema Registry lookups
          for new schema IDs typically complete in 5 to 15 milliseconds at p99.
          However, clients cache schemas aggressively. After the first lookup,
          subsequent deserializations use the cached schema, reducing overhead
          to microseconds per message. For steady state workloads at 50,000
          messages per second, registry queries might only occur dozens of times
          per second during deployments or restarts.
          <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
            <strong>✓ In Practice:</strong> LinkedIn's Kafka clusters handle
            trillions of messages daily using this pattern. Hundreds of teams
            evolve schemas independently. The registry ensures no team can break
            downstream consumers by enforcing compatibility checks at
            registration time.
          </div>
          The critical insight: this decoupling lets producers and consumers
          evolve at their own pace. A batch job reading three year old data uses
          the same resolution mechanism as a real time service reading fresh
          events.
        </div>
        <div class="Learn_keyTakeaways p-4 mb-4">
          <div class="Learn_keyTakeawaysHeader mb-3 pb-3">💡 Key Takeaways</div>
          <div class="d-flex flex-column gap-2">
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Schema resolution happens at read time by comparing writer
                schema (from message) to reader schema (from consumer code)
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Registry lookups are cached client side, so p99 latency of 5 to
                15 ms only affects first access to a new schema ID
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Fields present in writer but missing in reader are silently
                ignored, enabling forward compatibility
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Fields present in reader but missing in writer are filled with
                default values, enabling backward compatibility
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                This decoupling allows independent evolution: new code can read
                old data and old code can read new data within compatibility
                bounds
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
                A consumer deployed in 2021 with schema v10 can still read
                events written in 2018 using schema v3, as long as all
                intermediate schema changes were backward compatible
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">2</span>
              <span class="flex-grow-1 Learn_cardContent">
                During a schema rollout, 40% of producers use schema v8 while
                60% still use v7. Consumers with cached schemas for both
                versions handle the mixed traffic seamlessly without registry
                queries.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default LessonAvroSchemaRegistryHowAvroSchemaResolutionWorks;
