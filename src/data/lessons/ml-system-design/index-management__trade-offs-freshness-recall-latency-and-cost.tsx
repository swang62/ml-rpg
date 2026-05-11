import type { Component } from "solid-js";

const LessonIndexManagementTradeOffsFreshnessRecallLatencyAndCost: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Trade-offs: Freshness, Recall, Latency, and Cost
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              THE FUNDAMENTAL TENSION
            </p>
            <p>
              Index management forces you to choose between four competing goals
              that cannot all be maximized simultaneously. Improving one
              typically degrades another. Understanding these trade-offs lets
              you make intentional decisions rather than discovering painful
              surprises in production.
            </p>
            <p>
              <strong>Freshness vs recall:</strong> Faster index updates (better
              freshness) mean smaller training batches for clustering. Smaller
              batches produce worse centroids, reducing recall. A batch of 100K
              vectors produces centroids that miss 8-12% of relevant items; a
              batch of 10M produces centroids missing only 2-4%.
            </p>
            <p>
              <strong>Recall vs latency:</strong> Higher recall requires
              searching more partitions. Searching 5% of partitions gives ~92%
              recall at 15ms. Searching 20% gives ~98% recall at 60ms. For most
              recommendation systems, 92% recall is acceptable. For
              safety-critical search (medical, legal), you need 98%+.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              COST TRADE-OFFS
            </p>
            <p>
              <strong>Memory vs latency:</strong> Keeping all indexes in RAM
              gives sub-10ms latency. Spilling to SSD increases p99 to 50-100ms
              but cuts memory costs by 70%. Tiered storage (hot data in RAM,
              cold on SSD) balances this.
            </p>
            <p>
              <strong>Replication vs cost:</strong> More replicas improve read
              throughput and fault tolerance. 3 replicas give good availability
              but triple storage costs. For non-critical workloads, 2 replicas
              may suffice. Critical systems need 3+ across availability zones.
            </p>
            <p>
              <strong>Build frequency vs compute cost:</strong> Daily full
              rebuilds ensure optimal index quality but consume significant
              compute. Weekly rebuilds with daily incremental updates reduce
              cost 5-8x while maintaining 95%+ of optimal recall.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              MONITORING ESSENTIALS
            </p>
            <p>
              Track p50, p95, p99 latencies with clear SLOs (e.g., p99 &lt;
              50ms). Sample recall weekly by comparing index results to
              brute-force search on test queries. Monitor index freshness (time
              since newest item indexed). Alert on recall drops &gt;2% or
              latency exceeding SLO for 5+ minutes.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Key Trade-off:</strong> You cannot have fresh,
              high-recall, low-latency, and cheap simultaneously. Pick three.
              Most production systems optimize for latency + recall + cost,
              accepting 1-6 hour freshness delays.
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
                  Monitor: latency (p50/p95/p99), recall (stable at 95%+),
                  freshness (&lt;1 hour for real-time)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Alert thresholds: p99 latency exceeds SLO, recall drops 2%+,
                  freshness exceeds target
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Capacity planning: estimate 6 months ahead; scale before
                  hitting 70% CPU, 80% memory
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
                  Interview Tip: Describe the key metrics—latency, recall,
                  freshness—and how each is measured.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Explain scaling triggers—CPU, memory, latency
                  thresholds that indicate need for more capacity.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonIndexManagementTradeOffsFreshnessRecallLatencyAndCost;
