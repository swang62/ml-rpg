import type { Component } from "solid-js";

const LessonWarehouseCostOptimizationHowDataLayoutReducesQueryCosts: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            How Data Layout Reduces Query Costs
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <strong>The Problem:</strong> Without intelligent data organization,
            every query scans the entire dataset. If you store 2 years of events
            (730 days, 200 TB total) in a single monolithic table, a dashboard
            showing "last 7 days of US traffic" must read all 200 TB to find the
            relevant rows. At $5 per TB scanned, that simple dashboard costs
            $1,000 per refresh.
            <strong>The Solution: Strategic Data Layout</strong>
            Data layout strategies physically organize data to minimize what
            queries must read. Three techniques dominate: partitioning,
            clustering, and columnar storage.
            <div style="margin: 12px 0">
              <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
                <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                  1
                </div>
                <div style="flex: 1; padding-top: 4px">
                  <strong>Partitioning:</strong> Split tables into physically
                  separate chunks based on a key dimension. Most commonly date
                  or ingestion time. If you ingest 1 TB per day, date
                  partitioning creates 730 partitions for 2 years of data.
                </div>
              </div>
              <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
                <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                  2
                </div>
                <div style="flex: 1; padding-top: 4px">
                  <strong>Clustering:</strong> Within each partition, sort and
                  co-locate rows by secondary dimensions like{" "}
                  <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
                    customer_id
                  </code>{" "}
                  or{" "}
                  <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
                    region
                  </code>
                  . This improves range scans and joins without creating massive
                  partition counts.
                </div>
              </div>
              <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
                <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                  3
                </div>
                <div style="flex: 1; padding-top: 4px">
                  <strong>Columnar format:</strong> Store data by column instead
                  of by row. Queries selecting 5 columns from a 50 column table
                  read only 10 percent of the data. Compression is 3x to 10x
                  better because similar values sit together.
                </div>
              </div>
            </div>
            <strong>Real Impact Example:</strong> A dashboard queries "last 30
            days US traffic" from a table with 365 days and 20 regions (7,300
            possible partition/region combinations). Without partitioning: Scans
            all 200 TB, costs $1,000 per query. With date partitioning only:
            Scans 30 days worth, approximately 6 TB (30 out of 365 days), costs
            $30. With date AND region clustering: Query engine skips non-US data
            blocks within those 30 partitions, scans roughly 0.3 TB (1 out of 20
            regions), costs $1.50.
            <div style="margin: 8px 0; display: flex; flex-direction: column; align-items: center">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
                Query Cost Reduction
              </div>
              <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap; justify-content: center">
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 10px; font-weight: 600">
                    UNPARTITIONED
                  </div>
                  <div style="font-size: 16px; font-weight: 800">$1000</div>
                </div>
                <div style="font-size: 18px; font-weight: 800">→</div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 10px; font-weight: 600">
                    DATE PARTITIONED
                  </div>
                  <div style="font-size: 16px; font-weight: 800">$30</div>
                </div>
                <div style="font-size: 18px; font-weight: 800">→</div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 10px; font-weight: 600">
                    DATE + CLUSTERED
                  </div>
                  <div style="font-size: 16px; font-weight: 800">$1.50</div>
                </div>
              </div>
            </div>
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>⚠️ Common Pitfall:</strong> Over-partitioning by high
              cardinality keys like{" "}
              <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
                user_id
              </code>{" "}
              creates millions of tiny files. Query planners must touch
              thousands of files, actually increasing cost and latency. Keep
              partition counts in the hundreds, not millions.
            </div>
            Columnar compression is equally powerful. A typical analytics table
            might have 50 columns but queries average 8 columns. Columnar
            storage means you read 16 percent of raw data. Combined with
            compression ratios of 5x to 10x, your actual I/O and storage costs
            drop by 30x to 60x compared to uncompressed row storage.
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="text-align: center; font-weight: 700; font-size: 14px; margin-bottom: 8px">
                  Partitioning + Clustering Strategy
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Date Partitions (730 days)
                  </strong>
                  <div style="margin-top: 6px; font-size: 12px">
                    2023-01-01 | 2023-01-02 | ... | 2024-12-31
                  </div>
                  <div style="margin-top: 4px; font-size: 11px">
                    ~1 TB per partition
                  </div>
                </div>
                <div style="font-size: 20px; text-align: center; font-weight: bold">
                  ↓ Within each partition
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Clustered by Region (20 regions)
                  </strong>
                  <div style="margin-top: 6px; font-size: 12px">
                    US | EU | APAC | ... | LATAM
                  </div>
                  <div style="margin-top: 4px; font-size: 11px">
                    Data blocks co-located by region
                  </div>
                </div>
                <div style="font-size: 20px; text-align: center; font-weight: bold">
                  ↓ Result
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">
                    Query: "Last 30 days, US only"
                  </strong>
                  <div style="margin-top: 6px; font-size: 12px">
                    Scans 30 partitions × 1/20 regions
                  </div>
                  <div style="margin-top: 4px; font-size: 14px; font-weight: 700">
                    0.3 TB instead of 200 TB
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
                  Date partitioning on a 200 TB table with 2 years of data
                  creates 730 partitions of roughly 1 TB each, reducing typical
                  query scans from 200 TB to single digit TB
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Clustering by secondary dimensions like region or customer
                  within partitions cuts scanned data by another 10x to 20x
                  without exploding partition counts
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Columnar storage with compression achieves 3x to 10x space
                  savings and allows queries to read only needed columns,
                  cutting I/O by 5x to 10x
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Over-partitioning by high cardinality keys creates millions of
                  tiny files, forcing query planners to open thousands of files
                  and actually increasing cost
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
                  A production table storing 1 TB per day for 2 years uses date
                  partitioning. A query for last 7 days scans 7 TB instead of
                  730 TB, saving $3,615 per query at $5 per TB.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  BigQuery recommends keeping partition counts in the hundreds.
                  A table partitioned by &lt;code style="padding: 2px 6px;
                  background: #f5f5f5; border: 1px solid #ddd; border-radius:
                  3px; font-family: monospace; font-size:
                  0.9em;"&gt;user_id&lt;/code&gt; with 5 million users creates 5
                  million partitions, causing query planning overhead that can
                  exceed scan costs.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonWarehouseCostOptimizationHowDataLayoutReducesQueryCosts;
