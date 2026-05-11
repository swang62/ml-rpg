import type { Component } from "solid-js";

const LessonOrcFormatOrcFailureModesAndEdgeCases: Component = () => (
  <div class="lesson-content">
    <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
      <div class="mb-4 p-4">
        <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
          ORC Failure Modes and Edge Cases
        </h1>
        <div
          class="card-content-area"
          style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
        >
          <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
            When ORC Optimizations Break Down:
          </div>
          ORC relies heavily on data characteristics and correct metadata. When
          these assumptions are violated, performance degrades catastrophically.
          Understanding failure modes is critical for system design interviews
          because it shows you know when NOT to use ORC and how to mitigate
          problems.
          <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
            High Cardinality and Random Distribution:
          </div>
          Predicate pushdown depends on meaningful minimum and maximum
          statistics. Consider a column storing UUIDs, random hashes, or
          cryptographic identifiers. Every stripe contains nearly the full range
          of possible values because they are uniformly distributed. When a
          query filters on such a column, min and max checks cannot eliminate
          any stripes. Meta explicitly noted this limitation: predicate pushdown
          is ineffective for high cardinality, well distributed identifier
          columns. The system still pays the cost of computing and storing
          statistics for every stripe and row group, but gains almost no pruning
          benefit. For such workloads, the primary value comes from column
          pruning and lazy reads, not predicate pushdown.
          <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
            <strong>❗ Remember:</strong> If your primary filter columns are
            UUIDs or random identifiers, predicate pushdown saves almost
            nothing. You must rely on partition pruning at directory level and
            column pruning to avoid reading unnecessary columns.
          </div>
          <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
            Small File and Small Stripe Syndrome:
          </div>
          Streaming jobs that flush ORC files every 30 seconds or on every
          10,000 rows create thousands of tiny files, each with 1 to 5 MB
          stripes. This causes multiple problems. First, metadata overhead
          dominates. Each file has a footer describing schema and stripe
          locations. Reading 10,000 small files means 10,000 footer reads and
          10,000 file open operations. Second, query engines schedule one task
          per file or per stripe. With 10,000 files, the scheduler must launch
          10,000 tasks. Task startup overhead, network round trips to fetch
          data, and result merging dominate actual computation time. p99 query
          latencies can degrade from 5 seconds to 60 seconds even though total
          data volume is only a few gigabytes. The fix is aggressive compaction.
          Periodically rewrite many small files into fewer large files,
          targeting 128 MB to 512 MB per file and 64 MB to 256 MB stripes. This
          reduces file count by 100 to 1000 times and restores performance.
          <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
            Corrupted or Inconsistent Metadata:
          </div>
          ORC stores statistics in the file footer. If a writer bug or schema
          evolution process produces incorrect statistics, query engines may
          over prune or under prune. Over pruning is catastrophic: the engine
          skips stripes that actually contain matching rows, causing missing
          results. This is a silent correctness failure. Under pruning is less
          severe but expensive. The engine reads unnecessary stripes, wasting
          I/O and CPU. In mature systems, new writer implementations are
          validated by running dual reads: write data with both old and new
          writers, then run thousands of queries comparing checksums and row
          counts to detect discrepancies.
          <div style="margin: 8px 0; display: flex; flex-direction: column; align-items: center">
            <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
              Small File Impact on Latency
            </div>
            <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap; justify-content: center">
              <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                <div style="font-size: 10px; font-weight: 600">LARGE FILES</div>
                <div style="font-size: 16px; font-weight: 800">5 sec</div>
              </div>
              <div style="font-size: 18px; font-weight: 800">→</div>
              <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                <div style="font-size: 10px; font-weight: 600">
                  10K SMALL FILES
                </div>
                <div style="font-size: 16px; font-weight: 800">60 sec</div>
              </div>
            </div>
          </div>
          <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
            Write Heavy and Low Latency Requirements:
          </div>
          ORC is fundamentally designed for append mostly, batch oriented
          workloads. If you have a write heavy system with over 80 percent
          writes, or you need sub second ingestion to query latency, ORC is the
          wrong choice. Buffering rows to fill stripes adds latency. Computing
          statistics and encoding adds CPU cost. For such workloads, you need a
          hybrid architecture. Write to a fast store optimized for writes: a row
          oriented database, key value store, or in memory cache. Periodically,
          perhaps every 5 to 60 minutes, compact the fast store into ORC for
          historical analytics. This gives you low latency for recent data and
          efficient analytics for older data.
          <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
            Bloom Filter Overuse:
          </div>
          Some ORC implementations support bloom filters for faster point
          lookups. A bloom filter can quickly answer whether a value definitely
          does NOT exist in a stripe, enabling additional pruning beyond min and
          max. However, bloom filters consume memory and CPU. For high
          cardinality columns with millions of distinct values per stripe, bloom
          filters may be large (megabytes) and offer minimal pruning benefit.
          The decision is: what is your false positive rate tolerance, and what
          is your query pattern? For point lookups on medium cardinality columns
          (1000 to 100,000 distinct values per stripe), bloom filters can reduce
          scanned data by 50 to 90 percent. For range scans or very high
          cardinality, they add overhead without benefit.
        </div>
        <div
          class="card-diagram"
          style="margin-bottom: 24px; display: flex; justify-content: center"
        >
          <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
            <div style="display: flex; flex-direction: column; gap: 12px">
              <div style="text-align: center; font-weight: 700; margin-bottom: 8px">
                UUID Column Predicate Pushdown Failure
              </div>
              <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                <strong>Stripe 1</strong>
                <div style="margin-top: 6px; font-size: 12px">
                  UUID min: 00a3...
                  <br />
                  UUID max: ff8b...
                  <br />
                  Range: nearly full
                </div>
              </div>
              <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                <strong>Stripe 2</strong>
                <div style="margin-top: 6px; font-size: 12px">
                  UUID min: 01c7...
                  <br />
                  UUID max: fe9a...
                  <br />
                  Range: nearly full
                </div>
              </div>
              <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                <strong>Query Filter</strong>
                <div style="margin-top: 6px; font-size: 12px">
                  WHERE uuid = '5a3f...'
                </div>
              </div>
              <div style="text-align: center; font-size: 13px; font-weight: 600; margin-top: 4px">
                Cannot skip any stripe: both ranges contain target
              </div>
            </div>
          </div>
        </div>
        <div class="Learn_keyTakeaways p-4 mb-4">
          <div class="Learn_keyTakeawaysHeader mb-3 pb-3">💡 Key Takeaways</div>
          <div class="d-flex flex-column gap-2">
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Predicate pushdown fails on high cardinality, uniformly
                distributed columns like UUIDs where every stripe contains
                nearly the full value range; min and max statistics cannot
                eliminate stripes
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Small file syndrome (thousands of files under 5 MB) causes
                metadata overhead and task scheduling explosion, degrading p99
                latency from 5 seconds to 60 seconds; fix with compaction to 128
                to 512 MB files
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Incorrect statistics from writer bugs cause over pruning
                (missing results, silent correctness failure) or under pruning
                (wasted I/O); validate new writers with dual reads and checksum
                comparison
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Write heavy workloads (over 80% writes) or sub second latency
                requirements need hybrid architecture: fast store for recent
                data, periodic compaction to ORC for historical analytics
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
                Table partitioned by date but filtered on random
                &lt;code&gt;request_id&lt;/code&gt; UUID: partition pruning
                works, but within each partition predicate pushdown is
                ineffective, must scan all stripes
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">2</span>
              <span class="flex-grow-1 Learn_cardContent">
                Streaming job writing 10,000 ORC files per hour (avg 2 MB each):
                compaction rewrites into 20 files (1 GB each), reducing file
                open operations from 10,000 to 20, latency drops from 45 seconds
                to 8 seconds
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">3</span>
              <span class="flex-grow-1 Learn_cardContent">
                Real time dashboard requiring 500ms query latency: write to
                Redis or Cassandra, flush to ORC every 15 minutes for historical
                analytics, query recent data from fast store
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default LessonOrcFormatOrcFailureModesAndEdgeCases;
