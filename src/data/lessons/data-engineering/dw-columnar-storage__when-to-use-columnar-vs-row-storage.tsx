import type { Component } from "solid-js";

const LessonDwColumnarStorageWhenToUseColumnarVsRowStorage: Component = () => (
  <div class="lesson-content">
    <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
      <div class="mb-4 p-4">
        <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
          When to Use Columnar vs Row Storage
        </h1>
        <div
          class="card-content-area"
          style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
        >
          <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
            The Decision Framework:
          </div>
          Columnar storage optimizes read heavy, scan oriented workloads at the
          cost of write complexity and point lookup performance. The choice
          between columnar and row storage fundamentally depends on your access
          patterns and read to write ratio.
          <div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 8px; margin: 12px 0; align-items: stretch">
            <div style="padding: 12px; border: 2px solid; border-radius: 6px">
              <div style="font-weight: 700; margin-bottom: 4px; font-size: 13px">
                Row Storage (OLTP)
              </div>
              <div style="font-size: 12px">
                High write QPS, point lookups, full row access
              </div>
            </div>
            <div style="display: flex; align-items: center; font-weight: 800; font-size: 18px">
              vs
            </div>
            <div style="padding: 12px; border: 2px solid; border-radius: 6px">
              <div style="font-weight: 700; margin-bottom: 4px; font-size: 13px">
                Columnar Storage (OLAP)
              </div>
              <div style="font-size: 12px">
                Scan millions of rows, few columns, aggregates
              </div>
            </div>
          </div>
          <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
            Choose Columnar When:
          </div>
          Your workload is dominated by analytical queries that scan millions to
          billions of rows but access only a handful of columns and perform
          aggregates. For Online Analytical Processing (OLAP) systems, the gains
          are dramatic. You might see 10 to 50 times less disk I/O and 3 to 10
          times lower query latency compared to a row store at the same scale.
          Specific indicators include: queries touch fewer than 20 percent of
          columns in a table, read to write ratio exceeds 100 to 1, typical
          query scans over 1 million rows, and you can tolerate seconds of write
          latency or batch inserts. Event logs, clickstream data, time series
          metrics, data warehouse fact tables, and slowly changing dimension
          tables are ideal candidates. For example, a marketing analytics table
          with 500 columns tracking user behavior sees 10,000 inserts per second
          but 50,000 analytical queries per hour. Each query averages 10 columns
          across 100 million rows. Columnar storage reduces scan I/O by 50 times
          and query latency from 30 seconds to 3 seconds.
          <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
            Choose Row Storage When:
          </div>
          Your system frequently fetches or updates entire rows with strict
          millisecond level Service Level Agreements (SLAs). A user profile API
          that needs to serve complete user records with P99 latency under 10 ms
          will suffer with columnar storage. Reading a full row requires
          touching dozens of separate column files, adding significant overhead.
          Specific indicators include: queries access over 50 percent of columns
          per row, write to read ratio exceeds 1 to 10, you need transactional
          guarantees with ACID (Atomicity, Consistency, Isolation, Durability)
          semantics, and point lookups by primary key dominate your workload.
          Online Transaction Processing (OLTP) systems, user profile databases,
          inventory systems, and order management systems should use row
          storage.
          <div style="padding: 14px 16px; border-left: 4px solid; border-radius: 0 6px 6px 0; margin: 12px 0; font-style: italic">
            <div style="font-size: 14px; line-height: 1.5">
              "The decision is not 'add columnar everywhere.' It is: what is my
              read to write ratio and how many columns does each query access?"
            </div>
          </div>
          <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
            The Write Amplification Tradeoff:
          </div>
          Columnar storage trades write performance for read performance. A
          single logical row update typically touches multiple column files.
          Most column stores handle this using a write optimized delta store or
          a log structured merge design, then periodically compacting into
          larger columnar segments. This introduces write amplification and
          background compaction cost. For a table with 100 columns, a single row
          insert might write to 100 separate column files. Systems mitigate this
          by buffering writes in memory and flushing batches, but write latency
          still suffers. A workload with 80 percent writes and 20 percent reads
          might see throughput drop from 50,000 inserts per second in row
          storage to 8,000 inserts per second in columnar.
          <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
            Hybrid Approaches:
          </div>
          Some systems bridge the gap with hybrid designs. They maintain a row
          oriented delta buffer for recent writes to keep write latency low,
          while older data lives in columnar segments. Apache Kudu and some
          configurations of Apache Druid use this pattern. Cloud warehouses like
          Snowflake handle updates by writing small delta files and applying
          them at read time until compaction merges them. The hybrid approach
          works when your workload has temporal locality: recent data sees
          updates and mixed access, while historical data is read only and
          purely analytical.
        </div>
        <div class="Learn_keyTakeaways p-4 mb-4">
          <div class="Learn_keyTakeawaysHeader mb-3 pb-3">💡 Key Takeaways</div>
          <div class="d-flex flex-column gap-2">
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Choose columnar for OLAP workloads with read to write ratios
                exceeding 100 to 1 and queries accessing fewer than 20 percent
                of columns, delivering 10 to 50 times less I/O
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Choose row storage for OLTP workloads with write to read ratios
                above 1 to 10, point lookups by primary key, and requirements
                for P99 latency under 10 ms
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Write amplification is real: inserting one row into a 100 column
                table touches 100 separate column files, reducing write
                throughput from 50,000 to 8,000 inserts per second for write
                heavy workloads
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Hybrid designs with row oriented delta buffers and columnar
                historical segments provide a middle ground for workloads with
                temporal access patterns
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
                A user profile service needing to fetch complete user records at
                10,000 QPS with 5 ms latency uses row storage in PostgreSQL or
                MySQL
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">2</span>
              <span class="flex-grow-1 Learn_cardContent">
                A clickstream analytics table with 300 columns where queries
                average 8 columns across 500 million rows uses columnar Parquet
                in a data lake
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">3</span>
              <span class="flex-grow-1 Learn_cardContent">
                An inventory management system with frequent stock updates and
                ACID transaction requirements uses row storage despite having
                some analytical queries
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default LessonDwColumnarStorageWhenToUseColumnarVsRowStorage;
