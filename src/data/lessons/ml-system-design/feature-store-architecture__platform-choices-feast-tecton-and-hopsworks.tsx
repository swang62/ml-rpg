import type { Component } from "solid-js";

const LessonFeatureStoreArchitecturePlatformChoicesFeastTectonAndHopsworks: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Platform Choices: Feast, Tecton, and Hopsworks
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Feast (Thin Control Plane)
            </p>
            <p style="margin-top: 0">
              You bring your own data lake (Snowflake, BigQuery), streaming
              infrastructure (Kafka, Flink), and online key value store (Redis,
              DynamoDB). Feast provides the metadata registry, transformation
              definitions, and orchestration to tie these together. The
              advantage is maximum flexibility and cost control; you own SLAs,
              scaling, and observability. The tradeoff is operational burden:
              you build and maintain the materialization pipelines, backfill
              jobs, monitoring dashboards, and data quality checks. Feast fits
              mature teams with existing data infrastructure who want minimal
              vendor coupling.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Tecton (Managed Platform)
            </p>
            <p style="margin-top: 0">
              Opinionated streaming and batch pipelines, built in governance,
              and enforced online offline consistency. You define features using
              their declarative syntax, and Tecton handles materialization,
              freshness monitoring, and p99 latency SLOs out of the box. The
              online store is managed with sub 10ms guarantees; offline
              backfills run on their infrastructure. This accelerates adoption
              for teams without mature data platforms, reducing time to
              production from months to weeks. The cost is higher platform fees
              (often 50 to 200 thousand dollars per year) and coupling to
              Tecton's abstractions.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Hopsworks (Integrated Stack)
            </p>
            <p style="margin-top: 0">
              A DataFrame first API for Python users, strong time travel via
              Apache Hudi based copy on write tables, and a bundled high
              throughput online key value store (RonDB with hundreds of
              microseconds latency at 100,000 to 1 million ops per second). The
              integration delivers end to end lineage from raw data to model
              serving without stitching separate systems. This fits teams
              wanting a turnkey experience with time travel and lineage built
              in.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Selection Criteria
            </p>
            <p style="margin-top: 0">
              Choose Feast when you have mature lake, streaming, and key value
              infrastructure and want flexibility. Choose Tecton when you need
              rapid deployment, governance, and managed SLAs without building a
              platform team. Choose Hopsworks when you prioritize time travel,
              DataFrame workflows, and a bundled stack. Smaller teams under 50
              data scientists often prefer managed platforms to avoid 2 to 4
              FTEs maintaining a custom feature store.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong>Feast (Thin Control Plane)</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Bring your own: Lake + Streaming + KV store
                    <br />
                    Max flexibility, you own SLAs and ops
                    <br />
                    Fit: Mature infra, minimal vendor coupling
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong>Tecton (Managed Platform)</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Opinionated pipelines + governance + SLOs
                    <br />
                    Sub 10ms guarantees, higher cost ($50-200K/yr)
                    <br />
                    Fit: Fast deployment, no platform team needed
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong>Hopsworks (Integrated Stack)</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    RonDB online + Hudi offline + Time travel
                    <br />
                    DataFrame API, 100us-1ms at 100K-1M ops/s
                    <br />
                    Fit: Turnkey lineage, adopt their stack
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
                  Feast thin control plane lets you bring your own data lake,
                  streaming, and key value infrastructure with maximum
                  flexibility but requires 2 to 4 full time equivalents to
                  maintain pipelines, monitoring, and data quality
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Tecton managed platform provides opinionated batch and
                  streaming pipelines, governance, and sub 10 millisecond
                  Service Level Objective guarantees out of the box at 50 to 200
                  thousand dollars per year, accelerating deployment from months
                  to weeks
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Hopsworks integrates RonDB online key value (hundreds of
                  microseconds at 100,000 to 1 million ops per second) with Hudi
                  offline tables for strong time travel and end to end lineage
                  via DataFrame Application Programming Interface
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Selection criteria: Feast when you have mature infrastructure
                  and want control, Tecton when you need rapid deployment
                  without a platform team, Hopsworks when you prioritize time
                  travel and a bundled stack
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Scale matters: LinkedIn built custom at petabyte scale and
                  millions of Queries Per Second to justify investment, while
                  teams under 50 data scientists save 2 to 4 full time
                  equivalents by using managed platforms
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
                  A Series B startup with 20 data scientists adopted Tecton to
                  launch feature pipelines in 4 weeks instead of building a
                  custom platform over 6 months with 3 engineers
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  A fintech company with mature Snowflake and Redis
                  infrastructure chose Feast to retain control over Service
                  Level Agreements and avoid 150 thousand dollars per year
                  platform fees, staffing 2 engineers to maintain pipelines
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonFeatureStoreArchitecturePlatformChoicesFeastTectonAndHopsworks;
