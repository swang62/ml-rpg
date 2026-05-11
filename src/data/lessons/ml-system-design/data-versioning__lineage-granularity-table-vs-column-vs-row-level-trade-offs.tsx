import type { Component } from "solid-js";

const LessonDataVersioningLineageGranularityTableVsColumnVsRowLevelTradeOffs: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Lineage Granularity: Table vs Column vs Row Level Trade-offs
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Table Level Lineage
            </p>
            <p style="margin-top: 0">
              Lineage granularity determines what you can trace and at what
              cost. Table level lineage tracks dependencies between datasets as
              whole units, answering which tables feed into which downstream
              tables. This is cheap to collect and query, scaling to millions of
              tables with minimal overhead, but provides only coarse impact
              analysis. If an upstream table schema changes, you know all
              downstream tables are affected but not which specific columns or
              rows break.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Column Level Lineage
            </p>
            <p style="margin-top: 0">
              Column level lineage maps individual columns through
              transformations, tracking that output column revenue depends on
              input columns price and quantity through a multiplication. This
              enables precise schema evolution safety. When renaming or dropping
              a column, you see exactly which downstream columns lose their
              inputs. The overhead is moderate: metadata size grows with column
              count times transformation fan out, and collection requires
              parsing query plans or instrumenting data frames to track column
              projections. At enterprise scale with thousands of tables
              averaging 50 columns each, this still remains tractable at tens of
              millions of edges.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Row Level Lineage
            </p>
            <p style="margin-top: 0">
              Row level lineage traces individual output rows back to the
              specific input rows that produced them, essential for auditing PII
              flows or right to be forgotten compliance. The cost is severe:
              storage inflates 5 to 20 times because you maintain per row
              mappings, and compute overhead doubles as joins must track
              provenance vectors.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Practical Strategy
            </p>
            <p style="margin-top: 0">
              Reserve row level lineage for subsets flagged by policy, such as
              financial transactions or medical records, or use sampling to
              trace a representative 1 to 10 percent of rows for debugging
              rather than full coverage.
            </p>
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Table level lineage provides coarse impact analysis at minimal
                  cost, scaling to millions of datasets but only identifying
                  affected downstream tables without column or row specificity
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Column level lineage enables precise schema evolution by
                  mapping which output columns derive from which inputs, adding
                  moderate metadata overhead proportional to column count times
                  transformation fan out
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Row level lineage traces individual output rows to specific
                  input rows, inflating storage 5 to 20 times and doubling
                  compute costs by maintaining per row provenance vectors
                  through joins
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Enterprise lineage graphs with thousands of tables and 50
                  columns average reach tens of millions of column level edges,
                  remaining queryable under 500 milliseconds with denormalized
                  indexes
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Pragmatic approach uses table level by default, column level
                  for governed datasets and schema evolution sensitive
                  pipelines, and row level selectively for regulated data or
                  sampled at 1 to 10% for debugging
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
                  Uber tracks column level lineage for feature definitions,
                  enabling impact analysis when raw event schemas evolve;
                  renaming a field shows exactly which 37 downstream features
                  require transformation updates
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Healthcare data warehouse implements row level lineage for
                  patient records to support right to be forgotten requests,
                  storing per row mappings that inflate storage from 2 terabytes
                  to 18 terabytes for full audit trail
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  E-commerce platform uses table level lineage for 5,000
                  datasets, column level for 200 revenue critical tables, and
                  row level sampling at 5% for debugging recommendation pipeline
                  issues without full overhead
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonDataVersioningLineageGranularityTableVsColumnVsRowLevelTradeOffs;
