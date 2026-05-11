import type { Component } from "solid-js";

const LessonAvroSchemaRegistryAvroInProductionDataPipelines: Component = () => (
  <div class="lesson-content">
    <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
      <div class="mb-4 p-4">
        <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
          Avro in Production Data Pipelines
        </h1>
        <div
          class="card-content-area"
          style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
        >
          <strong>The End to End Flow:</strong> In a real streaming platform,
          Avro with Schema Registry sits at the heart of data contracts.
          Consider a retail company running Change Data Capture (CDC) on
          operational databases. Database changes flow into Kafka topics at
          50,000 records per second. Multiple downstream systems consume these
          events: a streaming engine (Spark or Flink) for real time aggregations
          targeting p99 end to end latency under 3 seconds, batch jobs for
          nightly warehouse loads, and microservices for search indexes and
          fraud detection. Without Avro, JSON payloads average 1 KB each. At
          50,000 records per second, that generates 400 Mbps sustained network
          bandwidth and roughly 4 TB of raw data per day. Avro typically
          compresses this to 400 to 600 bytes per record, cutting bandwidth to
          160 to 240 Mbps and storage to 1.7 to 2.6 TB per day. Over a year,
          this saves petabytes of storage and reduces serialization CPU cycles
          significantly.
          <div style="margin: 8px 0; display: flex; flex-direction: column; align-items: center">
            <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
              Daily Data Volume at 50K Events/Sec
            </div>
            <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap; justify-content: center">
              <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                <div style="font-size: 10px; font-weight: 600">JSON</div>
                <div style="font-size: 16px; font-weight: 800">4 TB</div>
              </div>
              <div style="font-size: 18px; font-weight: 800">→</div>
              <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                <div style="font-size: 10px; font-weight: 600">AVRO</div>
                <div style="font-size: 16px; font-weight: 800">1.7 TB</div>
              </div>
            </div>
          </div>
          <strong>Real World Architecture:</strong> The CDC connector captures
          database row changes and maps them to Avro schemas registered in the
          Schema Registry. Each topic might represent a logical data stream like{" "}
          <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
            orders
          </code>
          ,{" "}
          <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
            customers
          </code>
          , or{" "}
          <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
            inventory
          </code>
          . Keys contain stable identifiers (typically primary keys). Values
          contain before and after images or just the new state. All fields are
          often nullable to support partial updates and deletes. Tombstones
          (null values with keys) signal record deletion. Downstream consumers
          use these conventions to maintain materialized views. A search service
          rebuilds its indexes incrementally. A data warehouse uses Spark to
          read Avro topics and merge changes into partitioned Parquet tables.
          The Schema Registry ensures all these diverse consumers can evolve
          their code independently while maintaining consistent interpretation
          of the events.
          <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
            <strong>⚠️ Common Pitfall:</strong> Many teams underestimate the
            operational burden. Schema Registry becomes a critical dependency.
            If it goes down during a schema evolution window, deployments stall.
            Multi node registry with replication and p99 latency monitoring
            under 100 ms is essential.
          </div>
          At companies like Uber and Netflix, central data platform teams
          enforce schema governance through the registry. They set default
          compatibility modes (typically backward or backward transitive) and
          require review for exceptions. This governance scales to hundreds of
          teams producing thousands of event types without coordination chaos.
        </div>
        <div
          class="card-diagram"
          style="margin-bottom: 24px; display: flex; justify-content: center"
        >
          <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
            <div style="display: flex; flex-direction: column; gap: 10px">
              <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center">
                <strong style="font-size: 13px">Database CDC</strong>
                <div style="font-size: 11px; margin-top: 2px">
                  50K events/sec
                </div>
              </div>
              <div style="text-align: center; font-size: 20px; font-weight: bold">
                ↓
              </div>
              <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center">
                <strong style="font-size: 13px">Schema Registry</strong>
                <div style="font-size: 11px; margin-top: 2px">
                  Validates + Assigns IDs
                </div>
              </div>
              <div style="text-align: center; font-size: 20px; font-weight: bold">
                ↓
              </div>
              <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center">
                <strong style="font-size: 13px">Kafka Topics</strong>
                <div style="font-size: 11px; margin-top: 2px">
                  Avro encoded: 400B avg
                </div>
              </div>
              <div style="text-align: center; font-size: 20px; font-weight: bold">
                ↓
              </div>
              <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px">
                <div style="border: 2px solid; padding: 8px; border-radius: 6px; text-align: center; font-size: 11px">
                  <strong>Streaming</strong>
                  <div style="font-size: 10px">p99 &lt; 3s</div>
                </div>
                <div style="border: 2px solid; padding: 8px; border-radius: 6px; text-align: center; font-size: 11px">
                  <strong>Batch Jobs</strong>
                  <div style="font-size: 10px">Nightly</div>
                </div>
                <div style="border: 2px solid; padding: 8px; border-radius: 6px; text-align: center; font-size: 11px">
                  <strong>Services</strong>
                  <div style="font-size: 10px">Search/Fraud</div>
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
                Avro reduces payload sizes from 1 KB JSON to 400 to 600 bytes,
                cutting network bandwidth by 2x to 3x and saving petabytes of
                storage annually
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                CDC pipelines use Avro to encode row level change events with
                keys as stable identifiers and values as before/after state
                images
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Schema Registry acts as the central governance layer, preventing
                breaking changes and enabling hundreds of teams to evolve
                independently
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                At scale, registry must be multi node with replication and p99
                latency under 100 ms to avoid blocking deployments during schema
                evolution
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Downstream systems (streaming engines, batch jobs,
                microservices) all consume the same Avro topics using schemas
                from the registry for consistent interpretation
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
                A retail company processes 50,000 CDC events per second. With
                JSON at 1 KB each, daily volume would be 4 TB. Avro at 400 bytes
                reduces this to 1.7 TB, saving 60% in storage and network costs.
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">2</span>
              <span class="flex-grow-1 Learn_cardContent">
                Uber's data platform uses Schema Registry to coordinate schemas
                across hundreds of teams producing thousands of event types into
                Kafka, with central enforcement of backward transitive
                compatibility.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default LessonAvroSchemaRegistryAvroInProductionDataPipelines;
