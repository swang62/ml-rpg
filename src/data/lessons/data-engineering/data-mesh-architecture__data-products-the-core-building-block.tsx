import type { Component } from "solid-js";

const LessonDataMeshArchitectureDataProductsTheCoreBuildingBlock: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Data Products: The Core Building Block
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <strong>What Makes It a Product:</strong>A data product is not just
            a table or dataset. It is an architectural quantum that bundles
            code, data, metadata, and infrastructure into an independently
            deployable unit. Think of it like a microservice, but for analytical
            data. The code includes ingestion logic that pulls from operational
            systems, transformation pipelines that clean and shape the data,
            access enforcement that restricts who can query what, and automated
            quality checks that validate freshness and accuracy. The data itself
            is the stored analytical representation, typically partitioned
            tables, time series streams, or aggregated views. Metadata includes
            schemas registered in a central catalog, lineage showing where data
            originates and flows to, data dictionaries explaining field
            meanings, and SLOs that define guarantees like "data freshness under
            10 minutes at p95" or "null rate below 1%."
            <strong>Contract Driven Design:</strong>
            Each data product exposes a clear contract. When the Payments domain
            publishes a Payment Failed Events product, the contract specifies
            the schema with exact field types, the update frequency (for
            example, near real time with under 5 minute lag), the data retention
            policy (perhaps 90 days for raw events, 2 years for aggregates), and
            access requirements (PII fields are masked unless you have specific
            approval). Consumers can discover this contract in the catalog and
            depend on it. This is fundamentally different from a traditional
            data warehouse where a central team might change a column name or
            data type without warning, breaking downstream reports. With data
            products, breaking changes require versioning. You publish Payment
            Failed Events v2 alongside v1, give consumers time to migrate, then
            deprecate the old version on a defined schedule.
            <div style="margin: 8px 0; display: flex; flex-direction: column; align-items: center">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
                Typical Production Metrics
              </div>
              <div style="display: inline-flex; gap: 12px; flex-wrap: wrap; justify-content: center">
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">1-3 sec</div>
                  <div style="font-size: 10px; font-weight: 600">
                    P50 QUERY LATENCY
                  </div>
                </div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">
                    &lt; 10 sec
                  </div>
                  <div style="font-size: 10px; font-weight: 600">
                    P99 QUERY LATENCY
                  </div>
                </div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">
                    &lt; 10 min
                  </div>
                  <div style="font-size: 10px; font-weight: 600">
                    DATA FRESHNESS P95
                  </div>
                </div>
              </div>
            </div>
            <strong>Observability and Quality:</strong>
            Every data product should expose operational metrics. Ingestion lag
            tells you how far behind real time you are. If the Orders domain
            processes 20,000 events per second and your ingestion lag spikes to
            30 minutes, something is wrong. Query latency metrics (p50, p99)
            show how responsive the product is for analysts. Data quality
            indicators track null rates, duplicate rates, and schema violations.
            Usage metrics are equally important. How many distinct consumers
            query this product daily? How many queries per day? If a product has
            zero consumers for 90 days, it is a candidate for deprecation,
            freeing up resources. At Zalando scale with over 200 data products,
            without this observability you would have no idea which products are
            critical and which are abandoned.
            <strong>Infrastructure Automation:</strong>
            The self serve platform automates infrastructure provisioning. When
            a domain creates a new data product, they declare requirements at a
            high level: "I need a partitioned table, updated every 5 minutes
            from this event stream, with PII fields tagged." The platform
            automatically provisions storage buckets, configures encryption at
            rest, sets up role based access control, registers schemas, applies
            retention policies, and creates monitoring dashboards. Domain teams
            do not manually configure security groups or storage quotas. This
            automation is what makes data products scalable. Without it, each
            domain would need deep infrastructure expertise, and setup time
            would balloon from minutes to weeks.
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 550px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="text-align: center; font-weight: 700; font-size: 14px; margin-bottom: 4px">
                  Data Product Anatomy
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px">Code Layer</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Ingestion + Transforms + Quality Checks
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px">Data Layer</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Partitioned Tables + Time Series
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px">Metadata Layer</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Schema + Lineage + SLOs + Dictionary
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px">Infrastructure Layer</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Storage + Compute + Access Control + Monitoring
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
                  A data product bundles code, data, metadata, and
                  infrastructure into an independently deployable unit with
                  clear ownership and SLOs
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Contracts specify schema, update frequency, retention policy,
                  and access requirements. Breaking changes require versioning
                  (v1 alongside v2) with migration periods
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Typical query latency for a single domain product is 1 to 3
                  seconds at p50, under 10 seconds at p99 at moderate
                  concurrency
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Every product exposes metrics: ingestion lag, query latency,
                  data quality indicators (null rate, duplicate rate), and usage
                  statistics (distinct consumers, queries per day)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  The self serve platform automates infrastructure provisioning
                  (storage, encryption, access control, monitoring), reducing
                  setup time from weeks to minutes
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
                  The Payments domain publishes Payment Failed Events v1 with
                  schema including &lt;code&gt;transaction_id&lt;/code&gt;,
                  &lt;code&gt;failure_reason&lt;/code&gt;,
                  &lt;code&gt;timestamp&lt;/code&gt;. SLOs guarantee under 5
                  minute lag and null rate below 1%. PII fields like
                  &lt;code&gt;customer_email&lt;/code&gt; are automatically
                  masked unless consumer has approval.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  At Zalando with over 200 data products, observability metrics
                  identify that a legacy Customer Segmentation product has zero
                  consumers for 90 days, triggering deprecation to free
                  resources
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  When Orders domain processes 20k events per second and
                  ingestion lag spikes to 30 minutes (versus SLO of under 10
                  minutes), automated alerts notify the domain team to
                  investigate pipeline bottlenecks
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonDataMeshArchitectureDataProductsTheCoreBuildingBlock;
