import type { Component } from "solid-js";

const LessonDataVirtualizationWhenToUseDataVirtualizationVsEtl: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            When to Use Data Virtualization vs ETL
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              The Fundamental Tradeoff:
            </div>
            Data virtualization trades physical consolidation for logical
            integration. You gain fresher data since queries hit systems of
            record directly, and you avoid the cost and complexity of copying
            everything into a single warehouse. But you now depend on the
            availability and performance of every underlying system for each
            query.
            <div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 8px; margin: 12px 0; align-items: stretch">
              <div style="padding: 12px; border: 2px solid; border-radius: 6px">
                <div style="font-weight: 700; margin-bottom: 4px; font-size: 13px">
                  ETL to Warehouse
                </div>
                <div style="font-size: 12px">
                  Predictable performance, handles petabyte scans, stale data
                  (hours to days)
                </div>
              </div>
              <div style="display: flex; align-items: center; font-weight: 800; font-size: 18px">
                vs
              </div>
              <div style="padding: 12px; border: 2px solid; border-radius: 6px">
                <div style="font-weight: 700; margin-bottom: 4px; font-size: 13px">
                  Data Virtualization
                </div>
                <div style="font-size: 12px">
                  Fresh data (seconds), flexible schemas, tail latency depends
                  on sources
                </div>
              </div>
            </div>
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Performance at Scale:
            </div>
            Your p99 latency becomes bounded by the slowest source. If one of
            five systems has p99 latency of 2 seconds or 1% downtime, your
            composite Service Level Agreement (SLA) degrades quickly. A
            dashboard expecting 2 second p95 can see p99 spike above 10 seconds
            when one overloaded CRM API lags. For heavy analytical queries at
            petabyte scale, warehouses with precomputed aggregates and columnar
            storage typically outperform on demand federated joins by 10x or
            more. Scanning 500 TB with complex joins across sources over the
            network is fundamentally slower than a warehouse optimized query
            that reads from local columnar storage.
            <div style="padding: 14px 16px; border-left: 4px solid; border-radius: 0 6px 6px 0; margin: 12px 0; font-style: italic">
              <div style="font-size: 14px; line-height: 1.5">
                "The decision isn't virtualize everything or ETL everything.
                It's matching the pattern to your workload characteristics:
                query volume, latency requirements, and data freshness needs."
              </div>
            </div>
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Decision Framework:
            </div>
            Use pure data virtualization when you need a quick unified view
            across 10s or 100s of systems, query volumes are modest (under a few
            thousand queries per second across the platform), and you can
            tolerate occasional tail latency spikes. This works well for
            Customer 360 APIs serving product features, compliance dashboards
            querying 20 plus regulatory systems, or exploratory analytics where
            schema flexibility matters more than raw speed. Prefer ETL into a
            warehouse or lakehouse when you have stable schemas, need to perform
            large scans and joins over terabytes, require strict and predictable
            SLAs, or face massive concurrency (10,000 plus concurrent queries).
            Financial reporting, machine learning feature stores, and high
            traffic BI dashboards typically fall into this category.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              The Hybrid Reality:
            </div>
            Most large companies combine both. One common pattern is "virtualize
            first then materialize hot paths as needed." Start with
            virtualization to quickly expose new data sources. Monitor query
            patterns, and when certain joins or aggregations run frequently or
            hit performance limits, materialize them into the warehouse. This
            gives you the 80/20 benefit: fast time to value for most queries,
            optimized performance for the critical 20%. Another pattern is
            "warehouse first then virtualize only edge systems." Core analytics
            runs on a well optimized data warehouse with nightly or hourly ETL.
            Edge cases like querying a rarely used legacy system or a new SaaS
            tool get virtualized to avoid the overhead of building and
            maintaining yet another ETL pipeline. The choice reflects
            priorities. Virtualization favors freshness and decoupling at the
            cost of variable performance and operational complexity from
            distributed dependencies. ETL favors predictable performance and
            simplicity at the cost of staleness and infrastructure for data
            movement.
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Virtualization p99 latency is bounded by the slowest source,
                  so one system with 2 second p99 can degrade entire composite
                  SLA even if other sources are fast
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Heavy analytical queries over petabytes typically run 10x
                  faster in warehouses with columnar storage and precomputed
                  aggregates compared to on demand federated joins
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Use virtualization when you have modest query volumes (under a
                  few thousand queries per second), can tolerate tail latency
                  variance, and need data freshness measured in seconds rather
                  than hours
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Most production systems adopt hybrid approaches, materializing
                  the critical 20% of hot query paths in warehouses while
                  keeping 80% of edge cases and exploratory queries purely
                  virtual
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
                  A media company virtualizes 30 content management and rights
                  systems for compliance queries that run a few times per day
                  with 5 to 10 second acceptable latency. Core user engagement
                  dashboards queried 100,000 times per day with sub 500ms SLAs
                  run entirely on BigQuery with hourly ETL, achieving
                  predictable performance at scale.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  An e-commerce platform starts with virtualization to quickly
                  expose product catalog, inventory, and pricing from 8 regional
                  systems. After observing 10,000 queries per hour on a specific
                  product search join pattern with p99 hitting 3 seconds, they
                  materialize that join into Snowflake, reducing p99 to 200ms
                  while keeping less frequent queries virtual.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonDataVirtualizationWhenToUseDataVirtualizationVsEtl;
