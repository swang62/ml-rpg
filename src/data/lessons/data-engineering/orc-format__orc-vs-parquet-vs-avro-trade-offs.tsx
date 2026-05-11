import type { Component } from "solid-js";

const LessonOrcFormatOrcVsParquetVsAvroTradeOffs: Component = () => (
  <div class="lesson-content">
    <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
      <div class="mb-4 p-4">
        <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
          ORC vs Parquet vs Avro: Trade offs
        </h1>
        <div
          class="card-content-area"
          style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
        >
          <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
            The Format Decision:
          </div>
          Choosing between ORC, Parquet, and Avro is not about one being
          universally better. It is about matching format characteristics to
          workload patterns, ecosystem requirements, and operational
          constraints. Each format optimizes for different priorities.
          <div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 8px; margin: 12px 0; align-items: stretch">
            <div style="padding: 12px; border: 2px solid; border-radius: 6px">
              <div style="font-weight: 700; margin-bottom: 4px; font-size: 13px">
                Read Heavy Analytics
              </div>
              <div style="font-size: 12px">
                ORC or Parquet: columnar, heavy compression, metadata rich
              </div>
            </div>
            <div style="display: flex; align-items: center; font-weight: 800; font-size: 18px">
              vs
            </div>
            <div style="padding: 12px; border: 2px solid; border-radius: 6px">
              <div style="font-weight: 700; margin-bottom: 4px; font-size: 13px">
                Streaming Ingestion
              </div>
              <div style="font-size: 12px">
                Avro: row oriented, fast appends, simple schema evolution
              </div>
            </div>
          </div>
          <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
            When to Choose ORC:
          </div>
          ORC excels in read heavy analytical workloads on very large
          partitioned tables, especially in Hive, Presto, and Trino ecosystems.
          Choose ORC when your workload is over 90 percent reads, you have wide
          tables with 50 to 500 columns, queries typically access 5 to 20
          columns, and you need aggressive compression to minimize storage costs
          on petabyte scale data. ORC also shines when you have good
          partitioning keys and filter columns with meaningful ranges. If your
          queries frequently filter on timestamps, integer identifiers with
          sequential ranges, or enum like categorical fields, ORC statistics
          enable very effective predicate pushdown. Meta showed that with proper
          filters, ORC queries can skip 80 to 95 percent of stripes. The trade
          off is write cost. Buffering millions of rows to form 64 to 256 MB
          stripes increases ingest latency from seconds to minutes. Computing
          statistics and applying encoding adds CPU overhead. Systems that need
          low latency writes, such as real time dashboards updating every few
          seconds, should not write directly to ORC.
          <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
            When to Choose Parquet:
          </div>
          Parquet is very similar to ORC: both are columnar, both support
          predicate pushdown, both compress well. The choice often comes down to
          ecosystem. Parquet has broader support across cloud data warehouses
          like Snowflake, BigQuery (which can read Parquet from GCS), and
          Redshift Spectrum. If you are building a multi engine environment
          where data must be readable by diverse tools, Parquet is often safer.
          Performance differences are workload dependent. Meta benchmarks showed
          ORC with optimized readers was about 4 times faster than their Parquet
          implementation for single column BIGINT queries, but only 1.3 to 1.9
          times faster for multi column analytic queries. The gap narrows as you
          access more columns. For extremely wide tables with hundreds of
          columns where queries access 50 to 100 columns, the difference becomes
          negligible.
          <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
            When to Choose Avro:
          </div>
          Avro is row oriented, making it poor for analytics but excellent for
          streaming and transactional workloads. Choose Avro when you need fast
          incremental writes, such as change data capture (CDC) from databases
          or high throughput event streaming. Avro supports rich schema
          evolution: you can add or remove fields, and old readers can still
          process new data by ignoring unknown fields. Many companies use Avro
          as the landing format for raw data, then convert to ORC or Parquet for
          analytics. LinkedIn and Uber follow this pattern: Kafka topics store
          Avro messages, batch jobs read Avro and write ORC to Hive tables.
          <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
            <strong>⚠️ Common Pitfall:</strong> Choosing ORC for a write heavy
            workload that requires low latency ingestion. If your system writes
            constantly with sub minute latency requirements, you need a hybrid
            architecture: write to a fast store (key value or row oriented),
            then periodically compact to ORC for historical analytics.
          </div>
          <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
            Decision Framework:
          </div>
          First, determine your read to write ratio. Over 90 percent reads: ORC
          or Parquet. Under 50 percent reads: consider row oriented or hybrid.
          Second, assess your ecosystem. Hive and Presto heavy: lean ORC. Multi
          cloud and diverse engines: lean Parquet. Streaming and CDC: definitely
          Avro. Third, measure your query patterns. If queries access fewer than
          10 percent of columns and have good filter selectivity, columnar
          formats deliver 10 to 100 times gains. If queries access most columns
          or have poor selectivity, the advantage shrinks. Finally, consider
          operational complexity. ORC requires tuning stripe sizes, compression,
          and compaction schedules. Parquet requires similar tuning. Avro is
          simpler operationally but sacrifices read performance. The right
          choice depends on whether you optimize for developer velocity, query
          performance, or operational simplicity.
        </div>
        <div class="Learn_keyTakeaways p-4 mb-4">
          <div class="Learn_keyTakeawaysHeader mb-3 pb-3">💡 Key Takeaways</div>
          <div class="d-flex flex-column gap-2">
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                ORC optimizes for read heavy analytics with over 90% reads, wide
                tables, and queries accessing 5 to 20 columns; poor fit for
                write heavy or low latency ingestion workloads
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Parquet offers similar performance to ORC but has broader
                ecosystem support across cloud warehouses; choose for multi
                engine environments
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Avro excels at streaming and transactional workloads with fast
                incremental writes and schema evolution; common pattern is Avro
                for raw ingestion, then ORC or Parquet for analytics
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Performance differences are workload dependent: ORC showed 4x
                gain on single column queries but only 1.3 to 1.9x on multi
                column queries compared to Parquet in Meta benchmarks
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
                Analytics table with 10 billion rows, 200 columns, 95% read
                queries accessing 10 columns: choose ORC or Parquet, partition
                by date, achieve 4 to 20x speedup versus row format
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">2</span>
              <span class="flex-grow-1 Learn_cardContent">
                CDC pipeline from Postgres to data lake: write Avro to Kafka
                topics (fast incremental appends), batch convert to ORC hourly
                for query optimization
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">3</span>
              <span class="flex-grow-1 Learn_cardContent">
                Multi cloud data platform needing compatibility with Snowflake,
                BigQuery, and Athena: choose Parquet for broadest support,
                accept slightly lower performance versus optimized ORC
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default LessonOrcFormatOrcVsParquetVsAvroTradeOffs;
