import type { Component } from "solid-js";

const LessonAvroSchemaRegistryAvroVsAlternativesWhenToChooseWhat: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Avro vs Alternatives: When to Choose What
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <strong>The Core Trade Off:</strong> Avro with Schema Registry
            trades human readability and operational simplicity for strong data
            contracts, efficiency, and evolvability. Understanding when this
            trade off makes sense is critical for system design decisions.
            <div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 8px; margin: 12px 0; align-items: stretch">
              <div style="padding: 12px; border: 2px solid; border-radius: 6px">
                <div style="font-weight: 700; margin-bottom: 4px; font-size: 13px">
                  Avro + Registry
                </div>
                <div style="font-size: 12px">
                  Strong contracts, 60% smaller payloads, not human readable,
                  extra dependency
                </div>
              </div>
              <div style="display: flex; align-items: center; font-weight: 800; font-size: 18px">
                vs
              </div>
              <div style="padding: 12px; border: 2px solid; border-radius: 6px">
                <div style="font-weight: 700; margin-bottom: 4px; font-size: 13px">
                  Plain JSON
                </div>
                <div style="font-size: 12px">
                  Human readable, simple ops, 2x to 3x larger, no schema
                  enforcement
                </div>
              </div>
            </div>
            <strong>Avro vs Protocol Buffers (Protobuf):</strong> Both are
            binary, schema based formats. Protobuf is often preferred in service
            to service Remote Procedure Call (RPC) systems where schemas compile
            into strongly typed code and APIs are tightly coupled. Protobuf
            payloads can be 10 to 20 percent smaller than Avro due to more
            aggressive encoding. IDE support and tooling are mature. Avro shines
            in data engineering pipelines where dynamic schema discovery
            matters. You often need to read data written years ago using new
            processing jobs without recompiling everything. Avro's runtime
            schema resolution handles this elegantly. Protobuf with a registry
            is possible (and some companies use it), but the ecosystem and
            tooling around Avro plus Kafka plus Schema Registry are more mature
            for log based analytics. Decision criteria: choose Protobuf for RPC
            heavy microservices with synchronized deployments. Choose Avro for
            event streaming, CDC pipelines, and long term data warehousing where
            independent evolution at different speeds is critical.
            <strong>Avro vs Schema on Read (Data Lakes):</strong> Many data
            lakes ingest raw JSON or CSV and let readers define schemas
            dynamically using tools like Spark or Athena. This maximizes
            ingestion flexibility: you can dump arbitrary semi structured data
            without coordination. The trade off is data quality. Invalid or
            incompatible data enters the system, and problems surface only when
            queries fail. Avro with Schema Registry enforces schema on write.
            Producers must register valid schemas before publishing events. This
            prevents garbage from entering pipelines but reduces flexibility for
            ad hoc data sources. In interviews, articulate this clearly: schema
            on write (Avro) is ideal for governed, multi consumer data platforms
            where data quality is paramount. Schema on read is better for
            exploratory analytics on diverse, unstructured sources where upfront
            coordination is impractical.
            <div style="padding: 14px 16px; border-left: 4px solid; border-radius: 0 6px 6px 0; margin: 12px 0; font-style: italic">
              <div style="font-size: 14px; line-height: 1.5">
                "The decision isn't 'Avro everywhere.' It's: do I need strong
                contracts and independent evolution at scale, or do I prioritize
                simplicity and human readability for smaller, coordinated
                systems?"
              </div>
            </div>
            <strong>Decision Framework:</strong> Use Avro with Schema Registry
            when you have high volume event streams (over 10,000 events per
            second), multiple independent consumer teams, long term data
            retention (years), and need to enforce compatibility. Use JSON when
            system scale is modest (under 1,000 events per second), teams are
            small and coordinated, and operational simplicity trumps efficiency.
            Use Protobuf when your primary use case is synchronous RPC between
            tightly coupled services.
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Avro optimizes for independent evolution at scale, making it
                  ideal for event streaming and CDC pipelines with multiple
                  consumer teams evolving at different speeds
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Protobuf is 10 to 20 percent more compact and better for RPC
                  heavy microservices, but Avro's runtime schema resolution fits
                  analytics and long term data warehousing better
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Schema on write (Avro) enforces data quality at ingestion,
                  preventing invalid data from entering pipelines, whereas
                  schema on read maximizes flexibility for ad hoc sources
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  The operational cost of Schema Registry (another critical
                  dependency requiring replication and monitoring) is justified
                  only at scale with hundreds of schemas and teams
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Decision criteria: choose Avro for systems processing over
                  10,000 events per second with multi year retention, JSON for
                  coordinated teams under 1,000 events per second, Protobuf for
                  tightly coupled RPC services
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
                  A startup with 500 events per second and 3 consumer services
                  uses JSON on Kafka. Adding Avro and Schema Registry would
                  increase operational complexity without meaningful benefit.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  A data platform at Netflix scale (trillions of events daily,
                  hundreds of teams) requires Avro with Schema Registry to
                  prevent coordination chaos and ensure compatibility across
                  independent deployments.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  A payment processing system chooses Protobuf for synchronous
                  API calls between wallet, ledger, and notification services
                  where schemas are tightly coupled and compiled into code.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonAvroSchemaRegistryAvroVsAlternativesWhenToChooseWhat;
