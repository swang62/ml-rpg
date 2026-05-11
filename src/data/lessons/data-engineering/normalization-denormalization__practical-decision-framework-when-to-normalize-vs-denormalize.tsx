import type { Component } from "solid-js";

const LessonNormalizationDenormalizationPracticalDecisionFrameworkWhenToNormalizeVsDenormalize: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Practical Decision Framework: When to Normalize vs Denormalize
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              The Mental Model:
            </div>
            You do not choose normalization or denormalization in isolation. You
            choose them for different parts of your data flow based on concrete
            performance and correctness requirements. The pragmatic approach
            used in industry is: normalize the write path where integrity
            matters most, then selectively denormalize for read paths that
            cannot meet Service Level Objectives (SLOs) otherwise. Start by
            instrumenting your system. Measure actual query latencies, write
            throughput, and storage costs. Identify hot spots where joins or
            aggregations dominate response time. Only then introduce
            denormalized projections for those specific patterns.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              The Decision Criteria:
            </div>
            First, consider your read to write ratio. If you have 100:1 reads to
            writes, denormalization becomes attractive because you amortize the
            write cost over many reads. A typical ecommerce product catalog is
            read heavy: millions of users browse products, but updates to
            product details happen infrequently. Denormalizing product data into
            a search index makes sense. Conversely, a banking transaction ledger
            is write heavy with strict correctness requirements. Keep it
            normalized. Second, evaluate latency SLOs. If your API must respond
            in 50 milliseconds at p95 and joins across 8 tables take 200
            milliseconds, you have no choice but to denormalize. The alternative
            is violating SLOs. But if you have 5 seconds to generate a report,
            the complexity of denormalization might not be justified. Third,
            assess consistency requirements. Financial balances, inventory
            counts, and payment processing demand strong consistency. Use
            normalized schemas with ACID transactions. User feeds,
            recommendations, and analytics can tolerate seconds to minutes of
            staleness. These are prime candidates for denormalization with
            eventual consistency.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              The Hybrid Pattern:
            </div>
            In production at companies like Amazon and LinkedIn, you rarely see
            fully normalized or fully denormalized systems. Instead, you see
            hybrid architectures. The core transactional system is normalized:
            orders, customers, products, inventory. Downstream, denormalized
            read models are derived through streaming pipelines:
            product_search_index in Elasticsearch, orders_by_customer in
            Cassandra, revenue_by_category in a data warehouse. This gives you
            the best of both worlds. Strong consistency and simple write logic
            in the normalized core. Fast, scalable reads from denormalized
            projections. The cost is operational: you must manage streaming
            pipelines, monitor lag, handle schema evolution, and debug
            inconsistencies when they occur.
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>✓ In Practice:</strong> BigQuery and Snowflake encourage
              wide, denormalized fact tables for analytics because columnar
              scans are cheap. But the transactional systems that feed them
              remain normalized. The transformation happens in the Extract,
              Transform, Load (ETL) pipeline.
            </div>
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Red Flags and Antipatterns:
            </div>
            Denormalizing speculatively is a common mistake. Teams add redundant
            fields or duplicate tables "just in case" without measuring actual
            query patterns. This adds complexity without benefit. Another
            antipattern is denormalizing too early. Start with a normalized
            schema, add indexes, tune queries, introduce caching. Only when
            those tools fail to meet SLOs should you reach for denormalization.
            Over normalization is also real. Creating 20 tiny tables with one or
            two columns each, requiring 15 joins for simple queries, is painful
            at scale. The goal is not maximum normalization but appropriate
            normalization: enough to prevent update anomalies and enforce
            constraints, not so much that queries become unmanageable.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              The Interview Answer:
            </div>
            When asked about normalization vs denormalization in an interview,
            explain the trade-off clearly. Normalization optimizes for write
            correctness and storage efficiency. Denormalization optimizes for
            read latency and query simplicity. Modern systems use both:
            normalized write models for integrity, denormalized read models for
            performance, connected by streaming pipelines. Then dive into a
            specific example with numbers: "For a product catalog with 10
            million products and 1 billion page views per day, I would normalize
            the product database but denormalize the search index to meet the 50
            millisecond latency requirement."
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Normalize the write path for correctness, then selectively
                  denormalize read paths that cannot meet SLOs; start by
                  measuring actual query latencies and only optimize hot spots
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Favor denormalization when read to write ratio exceeds 100:1
                  and p95 latency requirements are under 100 milliseconds; joins
                  across multiple tables cannot meet these thresholds at scale
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Normalize when strong consistency is required (financial
                  balances, inventory) and writes are frequent; denormalize when
                  eventual consistency is acceptable (feeds, analytics) and
                  reads dominate
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Avoid speculative denormalization; add complexity only after
                  measuring that indexes, query tuning, and caching fail to meet
                  concrete SLOs
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Modern systems are hybrid: normalized OLTP core with ACID
                  transactions, denormalized OLAP and read stores derived
                  through streaming pipelines with monitored lag
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
                  Ecommerce: Normalized order service handles 50k writes/sec
                  with ACID guarantees. Denormalized product search index serves
                  1M queries/sec with 20ms latency. Changes flow through Kafka
                  with 3 second lag.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Social network: Normalized graph stores friendships and posts.
                  Denormalized feed service precomputes timelines and serves
                  them in 50ms. Write amplification is limited by storing
                  references instead of full copies.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Analytics platform: Snowflake uses wide denormalized fact
                  tables for fast columnar scans. Upstream MySQL stores
                  normalized transactional data. ETL pipeline transforms
                  normalized to denormalized nightly.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonNormalizationDenormalizationPracticalDecisionFrameworkWhenToNormalizeVsDenormalize;
