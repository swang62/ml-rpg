import type { Component } from "solid-js";

const LessonAvroSchemaRegistryWhatIsAvroSchemaRegistry: Component = () => (
  <div class="lesson-content">
    <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
      <div class="mb-4 p-4">
        <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
          What is Avro &amp; Schema Registry?
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
              <strong>Apache Avro</strong> is a binary, schema based
              serialization format that encodes data compactly while preserving
              strong types. A <strong>Schema Registry</strong> is a centralized
              service that stores schema versions, tracks evolution history, and
              enforces compatibility rules to prevent breaking changes.
            </div>
          </div>
          <strong>The Fundamental Problem:</strong> Imagine hundreds of
          microservices and data pipelines exchanging messages over years. A
          producer changes a field from{" "}
          <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
            user_email
          </code>{" "}
          to{" "}
          <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
            email_address
          </code>{" "}
          in its JSON output. Older consumers reading from a Kafka topic
          suddenly fail because they expect the old field name. You cannot
          coordinate a simultaneous upgrade across all systems. This is the long
          term data compatibility problem. Avro solves this by separating schema
          from data. Every record is encoded according to a writer schema.
          Readers decode using their own reader schema. As long as the two
          schemas are compatible, reading succeeds. Avro defines clear rules:
          adding a field with a default value is safe (backward compatible), but
          changing a field type from string to integer breaks compatibility.
          <strong>Schema Registry as Coordinator:</strong> The registry stores
          every schema version under a subject (typically one per Kafka topic).
          When producers write messages, they embed a tiny schema identifier
          (just 5 bytes) instead of the full schema. Consumers use this
          identifier to fetch the correct schema from the registry, then Avro
          handles the writer to reader mapping.
          <div style="margin: 8px 0; display: flex; flex-direction: column; align-items: center">
            <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
              Payload Size Comparison
            </div>
            <div style="display: inline-flex; gap: 12px; flex-wrap: wrap; justify-content: center">
              <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                <div style="font-size: 18px; font-weight: 800">1 KB</div>
                <div style="font-size: 10px; font-weight: 600">JSON</div>
              </div>
              <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                <div style="font-size: 18px; font-weight: 800">400 B</div>
                <div style="font-size: 10px; font-weight: 600">AVRO</div>
              </div>
            </div>
          </div>
          This registry prevents breaking changes from being deployed. If a
          producer tries to register an incompatible schema, the registry
          rejects it. This acts as a contract enforcement layer, similar to how
          an API gateway governs REST endpoints.
        </div>
        <div
          class="card-diagram"
          style="margin-bottom: 24px; display: flex; justify-content: center"
        >
          <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
            <div style="display: flex; flex-direction: column; gap: 12px; align-items: center">
              <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 160px; text-align: center">
                <strong style="font-size: 14px">Producer</strong>
                <div style="font-size: 11px; margin-top: 4px">
                  Registers schema v3
                </div>
              </div>
              <div style="font-size: 24px; font-weight: bold">↓</div>
              <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 160px; text-align: center">
                <strong style="font-size: 14px">Schema Registry</strong>
                <div style="font-size: 11px; margin-top: 4px">
                  Returns ID: 42
                </div>
              </div>
              <div style="font-size: 24px; font-weight: bold">↓</div>
              <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 160px; text-align: center">
                <strong style="font-size: 14px">Kafka Topic</strong>
                <div style="font-size: 11px; margin-top: 4px">
                  Message: [ID:42][Avro bytes]
                </div>
              </div>
              <div style="font-size: 24px; font-weight: bold">↓</div>
              <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 160px; text-align: center">
                <strong style="font-size: 14px">Consumer</strong>
                <div style="font-size: 11px; margin-top: 4px">
                  Fetches schema 42, decodes
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
                Avro encodes data in binary format with schemas defined
                separately, reducing payload size by 30 to 70 percent compared
                to JSON
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Schema Registry acts as a centralized contract enforcement
                layer, storing all schema versions and preventing incompatible
                changes
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Producers embed only a 5 byte schema identifier in messages, not
                the full schema, keeping overhead minimal
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Consumers fetch writer schemas from the registry and use Avro
                resolution to map fields to their own reader schema
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Compatibility rules (backward, forward, full) define what
                changes are safe, such as adding fields with defaults versus
                changing field types
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
                A retail CDC pipeline ingesting 50,000 events per second uses
                Avro to reduce JSON payloads from 1 KB to 400 bytes, cutting
                network bandwidth from 400 Mbps to 160 Mbps
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">2</span>
              <span class="flex-grow-1 Learn_cardContent">
                A producer registers a new schema version adding an optional
                &lt;code&gt;phone_number&lt;/code&gt; field with a default null
                value. The registry accepts it as backward compatible because
                old consumers can safely ignore the new field.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default LessonAvroSchemaRegistryWhatIsAvroSchemaRegistry;
