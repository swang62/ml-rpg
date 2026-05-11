import type { Component } from "solid-js";

const LessonMultiCloudIntegrationMultiCloudAtScaleCostsLatencyAndRealNumbers: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Multi-Cloud at Scale: Costs, Latency, and Real Numbers
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <strong>The Network Cost Reality:</strong> Cross-cloud data transfer
            is expensive and measurable. Egress fees typically cost tens of
            dollars per terabyte. A pipeline moving 50 TB per day across clouds
            easily adds over $1,000 per month just in network charges. This is
            not an optimization problem, it is an architectural constraint that
            shapes every design decision. At scale, these costs compound. A
            company processing 500 TB monthly across three cloud providers might
            pay $15,000 to $25,000 in egress alone, separate from compute and
            storage. This is why modern architectures emphasize processing data
            close to its source and only moving aggregated or filtered results
            across cloud boundaries.
            <strong>Latency Between Clouds:</strong> Network round-trip time
            between cloud providers within the same continent typically ranges
            from 5 to 20 milliseconds. This makes strongly consistent,
            synchronous cross-cloud writes problematic without sacrificing tail
            latency. Cross-region writes within a single cloud might add 10 ms.
            Cross-cloud writes can add 30 to 50 ms or more.
            <div style="margin: 8px 0; display: flex; flex-direction: column; align-items: center">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
                Egress Cost Impact
              </div>
              <div style="display: inline-flex; gap: 12px; flex-wrap: wrap; justify-content: center">
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">50 TB/day</div>
                  <div style="font-size: 10px; font-weight: 600">
                    DATA VOLUME
                  </div>
                </div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">$1K+/mo</div>
                  <div style="font-size: 10px; font-weight: 600">
                    EGRESS FEES
                  </div>
                </div>
              </div>
            </div>
            Many architectures choose eventual consistency at the integration
            layer to preserve reasonable p99 latencies. You accept 2 to 5
            seconds of propagation delay rather than adding 40+ ms to every
            write operation. For analytics workloads, this trade-off is obvious.
            For operational systems like inventory management or payment
            processing, you often keep writes local to a single cloud and
            replicate asynchronously.
            <strong>Operational Complexity:</strong> Single-provider platforms
            offer end-to-end integration with one billing model, one Identity
            and Access Management (IAM) system, and integrated monitoring.
            Multi-cloud forces you to build or adopt your own catalog,
            governance plane, and observability that works across providers. You
            need unified monitoring that aggregates metrics like throughput,
            lag, error rate, and cost per gigabyte from multiple clouds.
            Operators run anomaly detection on these signals to trigger
            self-healing: scaling workers, rerouting around unhealthy regions,
            or temporarily degrading less critical pipelines during load spikes.
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>⚠️ Common Pitfall:</strong> Teams underestimate operational
              overhead and monitoring complexity. What looks like "just adding
              another cloud" means maintaining separate IAM policies, different
              monitoring tools, multiple incident response playbooks, and
              coordinating upgrades across environments.
            </div>
            <strong>When It Makes Sense:</strong> Companies accept this
            complexity for risk management, vendor diversification, regulatory
            constraints requiring local processing in multiple jurisdictions, or
            taking advantage of specialized services. The calculation is whether
            flexibility and resilience outweigh the measurable costs in dollars
            and operational effort.
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Cross-cloud data transfer costs tens of dollars per TB in
                  egress fees. Moving 50 TB daily can add over $1,000 monthly
                  just in network charges, making cost a primary architectural
                  constraint
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Network latency between clouds is 5 to 20 ms within
                  continents, forcing architects to choose eventual consistency
                  for integration to avoid adding 30 to 50 ms to synchronous
                  write operations
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Operational complexity increases significantly because you
                  must build unified catalog, governance, IAM, and monitoring
                  layers that work across multiple providers with different APIs
                  and billing models
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  The trade-off is concrete: single-cloud simplicity and lower
                  cost versus multi-cloud flexibility, vendor diversification,
                  and regulatory compliance across jurisdictions
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
                  A financial services company processes transactions in AWS but
                  must store certain data in EU-based Azure regions for GDPR
                  compliance. They pay $3,000 monthly in cross-cloud egress fees
                  but avoid multi-million dollar regulatory penalties.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  A retailer runs promotional campaigns that cause 10x traffic
                  spikes. They keep transactional systems in AWS but burst
                  analytics workloads to GCP during peak seasons, paying higher
                  egress costs for flexibility rather than over-provisioning AWS
                  capacity year-round.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonMultiCloudIntegrationMultiCloudAtScaleCostsLatencyAndRealNumbers;
