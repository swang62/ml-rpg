import type { Component } from "solid-js";

const LessonMultiCloudIntegrationWhatIsMultiCloudDataIntegration: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            What is Multi-Cloud Data Integration?
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
                <strong>Multi-cloud data integration</strong> is the practice of
                moving, synchronizing, and governing data across multiple cloud
                providers (AWS, GCP, Azure) and on-premises systems so that the
                entire business sees a unified, logical data platform despite
                physically fragmented infrastructure.
              </div>
            </div>
            <strong>The Core Problem:</strong> Modern enterprises rarely live in
            a single cloud. Customer-facing services might run in AWS, analytics
            workloads in GCP, and regulatory systems on-premises. Acquisitions
            bring their own cloud preferences. Without integration, each
            environment becomes a data silo. Teams cannot answer simple
            questions like "What is our actual revenue today?" because the data
            is scattered. Multi-cloud integration solves this by treating
            different clouds as specialized capabilities rather than competing
            options. You use each provider where it makes the most sense: AWS
            for operational databases, GCP for machine learning infrastructure,
            Snowflake for cross-cloud analytics.
            <strong>Three Logical Planes:</strong> The architecture separates
            concerns into three layers. First, the{" "}
            <strong>control plane</strong> defines pipelines, schemas,
            governance rules, and policies in one central place. Second, the{" "}
            <strong>data plane</strong> is where actual data flows and
            processing happens, deployed close to data sources to minimize
            latency and transfer costs. Third, the{" "}
            <strong>metadata and governance plane</strong> tracks lineage,
            quality metrics, ownership, and access controls across all
            environments.
            <strong>Real World Scale:</strong> A typical implementation moves 1
            to 10 terabytes per day across clouds. User actions in one cloud
            generate events that reach analytics systems in another cloud within
            50 to 100 milliseconds at the 99th percentile. Change Data Capture
            (CDC) streams capture tens of thousands of database updates per
            second from operational stores and forward them to cross-cloud event
            buses. The goal is not just connectivity. It is predictable Service
            Level Agreements (SLAs) across clouds: under 200 milliseconds p99
            for critical cross-cloud reads, under 5 minutes end to end latency
            for analytics materializations.
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; margin-bottom: 16px">
                <div style="border: 2px solid; padding: 12px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">AWS</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    User Services
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">GCP</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    ML Workloads
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">On-Prem</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Legacy Systems
                  </div>
                </div>
              </div>
              <div style="text-align: center; font-size: 20px; font-weight: bold; margin: 12px 0">
                ↓
              </div>
              <div style="border: 2px solid; padding: 14px; border-radius: 6px">
                <div style="font-weight: 700; font-size: 13px; margin-bottom: 8px; text-align: center">
                  Unified Data Integration Layer
                </div>
                <div style="display: flex; flex-direction: column; gap: 6px; font-size: 11px">
                  <div style="padding: 6px; border-radius: 4px">
                    Control Plane: Pipelines &amp; Policies
                  </div>
                  <div style="padding: 6px; border-radius: 4px">
                    Data Plane: Processing &amp; Movement
                  </div>
                  <div style="padding: 6px; border-radius: 4px">
                    Governance: Lineage &amp; Access
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
                  Multi-cloud integration addresses the reality that enterprises
                  use multiple cloud providers and on-premises systems, each
                  optimized for different workloads and subject to different
                  business or regulatory constraints
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  The architecture separates control plane (policy and
                  orchestration), data plane (actual data movement and
                  processing), and governance plane (metadata, lineage, and
                  access control) for clean separation of concerns
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Typical systems move 1 to 10 TB per day with target latencies
                  of 50 to 100 ms p99 for event streaming and under 5 minutes
                  for batch analytics integration across clouds
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Key technologies include event driven streaming for low
                  latency, Change Data Capture for operational updates, and
                  shared storage layers like lakehouses that work across
                  multiple providers
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
                  A retail company runs customer APIs in AWS, real-time
                  recommendation engines in GCP, and enterprise reporting in
                  Snowflake. Multi-cloud integration ensures order data flows
                  from AWS to GCP within 100 ms for personalization and to
                  Snowflake within 5 minutes for business intelligence.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  A financial services firm keeps transactional systems
                  on-premises for regulatory compliance, but replicates
                  sanitized data to AWS for fraud detection ML models and to
                  Azure for disaster recovery, all governed by a central policy
                  engine.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonMultiCloudIntegrationWhatIsMultiCloudDataIntegration;
