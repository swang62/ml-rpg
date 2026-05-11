import type { Component } from "solid-js";

const LessonSchemaEvolutionSchemaRegistryCentralizedGovernanceAndVersionControl: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Schema Registry: Centralized Governance and Version Control
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Why Registries Exist:
            </div>
            Without a schema registry, each producer invents its own JSON
            structure. Over time, you end up with dozens of similar but
            incompatible event types for the same concept. One team uses user_id
            as a string, another uses userId as an integer. Downstream consumers
            need brittle custom logic for each variant. This is schema drift,
            and it makes data platforms unmaintainable at scale. A schema
            registry treats schema as a first class artifact with versions,
            metadata, and enforced compatibility rules. Instead of embedding
            schemas in every message, you store them centrally and reference
            them by a small identifier (typically 4 bytes). When a producer
            wants to publish data, it first registers the schema. The registry
            validates it against existing versions using the configured
            compatibility mode. Only after validation does the producer get a
            schema ID to embed in messages.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              How It Works at Runtime:
            </div>
            Each message carries a magic byte and schema ID in the first 5
            bytes, followed by the payload. When a consumer reads a message, it
            extracts the schema ID, fetches the writer schema from the registry
            (usually caching it locally), and applies schema resolution using
            its own reader schema. This separation of writer and reader schemas
            is what enables independent evolution. Confluent Schema Registry,
            widely used with Kafka, stores schemas in a compacted Kafka topic
            for durability and serves them over a REST API for low latency
            lookups. A typical setup handles millions of schema fetches per
            second across a large cluster, with local caching reducing registry
            load by 99 percent after the first fetch per consumer process.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Governance and Compatibility Enforcement:
            </div>
            The registry is also a governance chokepoint. Before a breaking
            change reaches production, it fails at registration time. For
            example, if your payments topic uses full compatibility mode and
            someone tries to remove a required amount field, the registry
            returns a 409 conflict error immediately. This shifts schema
            validation left, catching issues in development or continuous
            integration instead of in production dashboards. At companies like
            LinkedIn, schema changes in high value domains trigger approval
            workflows. A pull request that modifies a schema runs compatibility
            checks and contract tests for key consumers. Changes must be
            reviewed in governance tools before being registered. This prevents
            accidental breaking changes at scale, where a missing field in a
            core event type could corrupt dashboards used by thousands of
            internal users.
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>❗ Remember:</strong> A centralized registry is a critical
              dependency and single point of failure. If it goes down, new
              producers cannot register schemas and consumers cannot resolve
              unknown schema IDs. High availability and aggressive caching are
              essential. Some systems use per domain registries to reduce blast
              radius.
            </div>
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              The Centralization Trade Off:
            </div>
            A single global registry enforces consistency but becomes a
            coordination bottleneck. Decentralized approaches, such as per
            domain registries or table local schema histories in Delta Lake and
            Iceberg, reduce blast radius and allow domain autonomy. They also
            increase the risk of inconsistent conventions and duplicated
            concepts across teams. Most large platforms start centralized and
            selectively decentralize for specific high volume or isolated
            domains.
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 12px; align-items: center">
                <div style="text-align: center; font-weight: 700; font-size: 15px; margin-bottom: 4px">
                  Schema Registry Flow
                </div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 200px; text-align: center">
                  <strong style="font-size: 14px">Producer</strong>
                  <div style="font-size: 12px; margin-top: 6px">
                    Registers schema v2
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 200px; text-align: center">
                  <strong style="font-size: 14px">Schema Registry</strong>
                  <div style="font-size: 12px; margin-top: 6px">
                    Validates compatibility
                    <br />
                    Returns ID: 42
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 200px; text-align: center">
                  <strong style="font-size: 14px">Kafka Message</strong>
                  <div style="font-size: 11px; font-family: monospace; margin-top: 6px; text-align: left">
                    [magic][ID:42][payload...]
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 200px; text-align: center">
                  <strong style="font-size: 14px">Consumer</strong>
                  <div style="font-size: 12px; margin-top: 6px">
                    Fetches schema 42
                    <br />
                    Resolves to reader schema
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
                  Schema registry stores schemas centrally and assigns small
                  identifiers (typically 4 bytes) embedded in each message,
                  avoiding schema duplication in payloads
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Registry enforces compatibility rules at registration time,
                  rejecting breaking changes with 409 errors before they reach
                  production consumers
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Confluent Schema Registry handles millions of schema fetches
                  per second with local caching reducing registry load by 99
                  percent after first fetch per process
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Centralized registries enforce consistency but become critical
                  dependencies and coordination bottlenecks, requiring high
                  availability and aggressive caching
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Large platforms start with centralized registries and
                  selectively decentralize for high volume or isolated domains
                  to reduce blast radius while managing consistency trade offs
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
                  Confluent Schema Registry with Kafka: Producer registers Avro
                  schema for clickstream events. Registry validates backward
                  compatibility, returns schema ID 1337. Producer embeds 5 byte
                  header [magic byte][ID:1337] before payload. Consumer extracts
                  ID, fetches schema (cached locally), resolves to reader
                  schema.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Breaking change prevention: Team tries to remove required
                  amount field from payments event using full compatibility
                  mode. Registry returns 409 conflict during registration in CI
                  pipeline, preventing deployment.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonSchemaEvolutionSchemaRegistryCentralizedGovernanceAndVersionControl;
