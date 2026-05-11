import type { Component } from "solid-js";

const LessonDataVirtualizationFailureModesAndEdgeCases: Component = () => (
  <div class="lesson-content">
    <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
      <div class="mb-4 p-4">
        <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
          Failure Modes and Edge Cases
        </h1>
        <div
          class="card-content-area"
          style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
        >
          <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
            Source Availability Cascade:
          </div>
          The most common failure mode is source slowness or unavailability
          cascading through your system. If your virtual query touches 5 systems
          and one is down 1% of the time, your aggregate availability drops to
          approximately 95% assuming independence. In practice it is worse
          because failures often correlate: network issues, data center
          problems, or peak load events affect multiple systems simultaneously.
          When one source has a p99 latency of 2 seconds while others respond in
          300ms, your composite p99 becomes dominated by the slowest link.
          Platforms like Denodo mitigate this with timeouts, retries, and
          partial result strategies. But then you face a difficult choice:
          return incomplete data with a warning, fail the entire query, or
          substitute cached stale data. Each option has consequences for
          correctness and user experience.
          <div style="margin: 8px 0; display: flex; flex-direction: column; align-items: center">
            <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
              Failure Timeline
            </div>
            <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap; justify-content: center">
              <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                <div style="font-size: 10px; font-weight: 600">NORMAL</div>
                <div style="font-size: 16px; font-weight: 800">2 sec p95</div>
              </div>
              <div style="font-size: 18px; font-weight: 800">→</div>
              <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                <div style="font-size: 10px; font-weight: 600">
                  ONE SOURCE SLOW
                </div>
                <div style="font-size: 16px; font-weight: 800">8 sec p95</div>
              </div>
              <div style="font-size: 18px; font-weight: 800">→</div>
              <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                <div style="font-size: 10px; font-weight: 600">SOURCE DOWN</div>
                <div style="font-size: 16px; font-weight: 800">TIMEOUTS</div>
              </div>
            </div>
          </div>
          <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
            Consistency Anomalies:
          </div>
          Virtual queries often span multiple transactional systems that do not
          share a transaction boundary. A Customer 360 read might see a new
          order in the transactional database but a stale customer address still
          cached in the CRM system. This creates anomalies where related data
          appears inconsistent. If you need strict read after write correctness
          across systems, you face a hard choice. You can accept stale reads
          with eventual consistency, adding seconds to minutes of lag. You can
          fall back to a consolidated store with defined snapshot semantics,
          losing the freshness benefit. Or you can implement distributed
          transaction protocols, adding significant complexity and latency. Most
          production systems choose eventual consistency and design UIs to
          handle inconsistencies gracefully.
          <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
            Cache Stampede:
          </div>
          Caching reduces source load and improves latency, but creates edge
          cases. If cache Time To Live (TTL) is too long, consumers see outdated
          data. If TTL is too short or invalidation too aggressive, cache hit
          rates drop and source load spikes. At 10x scale, an unexpectedly
          popular dashboard can generate thousands of near identical virtual
          queries, stampeding a backend that was never sized for that Queries
          Per Second (QPS). A production incident example: a new executive
          dashboard goes viral internally, generating 500 requests per minute.
          With a 60 second cache TTL, the first query of each minute hits all 5
          backend systems. Four systems handle the load, but the CRM API rate
          limits at 10 requests per second. Queries start timing out, triggering
          retries, which amplify the problem. The solution involved longer TTLs
          for this specific query pattern and pre warming caches before
          dashboard launches.
          <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
            <strong>❗ Remember:</strong> Schema drift is another common
            problem. A source team renames a column or changes a type, and
            virtual views depending on it suddenly fail. Without strong metadata
            lineage and automated testing, debugging which virtual objects are
            impacted becomes painful at scale.
          </div>
          <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
            High Cardinality Join Explosion:
          </div>
          Joining high cardinality datasets from slow systems over the network
          can explode memory or hit timeouts. Imagine cross joining a CRM table
          with 10 million customers and an orders table with 100 million rows
          over a high latency API. Even with filters, if selectivity estimates
          are wrong, the optimizer may attempt to pull gigabytes across the
          network and perform the join in memory, exhausting resources or timing
          out after 30 seconds. Production systems address this with join hints,
          cardinality caps, and monitoring for expensive query patterns. Some
          platforms automatically detect problematic joins and suggest
          materialization or reject the query with guidance to refactor it.
        </div>
        <div class="Learn_keyTakeaways p-4 mb-4">
          <div class="Learn_keyTakeawaysHeader mb-3 pb-3">💡 Key Takeaways</div>
          <div class="d-flex flex-column gap-2">
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Source availability problems cascade: if each of 5 systems is
                99% available independently, composite availability drops to
                approximately 95%, and failures often correlate during network
                or load events
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Virtual queries spanning multiple transactional systems lack a
                shared transaction boundary, leading to consistency anomalies
                where related data appears inconsistent due to different update
                timing across sources
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Cache stampedes occur when popular dashboards generate thousands
                of identical queries, overwhelming backends not sized for that
                Queries Per Second load, especially when cache Time To Live is
                too short
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                High cardinality joins across slow sources can exhaust memory or
                timeout, especially when optimizer selectivity estimates are
                wrong and gigabytes of data get pulled across the network for in
                memory joins
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
                A fintech company experiences an incident where their CRM API
                degrades to 5 second p99 latency during a vendor maintenance
                window. Their Customer 360 virtualization platform, which
                normally achieves 2 second p95 latency, spikes to 8 second p95
                and 10% timeout rate, impacting 20 downstream services until
                they enable partial result mode that returns data without CRM
                fields.
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">2</span>
              <span class="flex-grow-1 Learn_cardContent">
                An e-commerce virtualization layer caches aggregated sales
                reports with a 5 minute Time To Live. During Black Friday, a bug
                causes cache invalidation to trigger on every write to the
                orders table (50,000 per minute). Cache hit rate drops from 90%
                to under 5%, overwhelming the Snowflake backend with query load
                that jumps from 100 to 9,000 queries per second, causing 30
                minutes of dashboard unavailability until emergency TTL
                extension.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default LessonDataVirtualizationFailureModesAndEdgeCases;
