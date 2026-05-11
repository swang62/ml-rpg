import type { Component } from "solid-js";

const LessonFeatureBackfillingBackfillCostAndThroughputPlanning: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Backfill Cost and Throughput Planning
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Compute Cost Reality
            </p>
            <p style="margin-top: 0">
              Production backfills consume significant compute and storage
              resources, requiring careful capacity planning and cost budgeting.
              A typical baseline is 5 to 20 terabytes per hour throughput on a
              100 worker batch cluster when scanning columnar formats like
              Parquet or ORC with predicate pushdown and partition pruning. This
              translates to roughly 2,000 vCPU hours per TB of raw data
              processed.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Cost Estimation Framework
            </p>
            <p style="margin-top: 0">
              For a 90 day backfill across 100 million entities with 50
              features: raw data volume is approximately 10 TB, compute cost is
              $500 to $2,000 on spot instances, and storage cost is $100 to $500
              per month for the output feature table. Total initial backfill
              investment of $1,000 to $3,000 is typical, with ongoing storage
              costs.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Optimization Levers
            </p>
            <p style="margin-top: 0">
              Partition pruning skips irrelevant date partitions, reducing data
              scanned by 10 to 100x for targeted backfills. Predicate pushdown
              filters rows at the storage layer before reading into memory.
              Incremental backfills recompute only changed entities rather than
              the full population. Spot instances reduce compute cost by 60 to
              80 percent with 2 to 3x longer completion times due to
              interruptions.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Priority and SLA Planning
            </p>
            <p style="margin-top: 0">
              Classify backfills by urgency: critical (model launch blocked, SLA
              of hours), normal (scheduled retraining, SLA of days), and
              background (experimental features, SLA of weeks). Allocate
              dedicated compute quota for critical backfills while running
              background work on spare capacity.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Cost Monitoring
            </p>
            <p style="margin-top: 0">
              Track cost per feature per backfill to identify expensive features
              consuming disproportionate resources. A single complex join or
              aggregation can dominate total backfill cost. Optimize or
              approximate expensive features when the cost exceeds the value
              they provide.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="margin-bottom: 12px; font-weight: bold; text-align: center; font-size: 14px">
                Backfill Cost Breakdown (10hr job)
              </div>
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="display: flex; align-items: center; gap: 8px">
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; width: 140px; text-align: center; font-size: 12px; font-weight: bold">
                    Compute
                  </div>
                  <div style="flex: 1; border: 2px solid; border-radius: 6px; padding: 8px; font-size: 12px">
                    2,000 vCPU·hrs × $1.50 = <strong>$3,000</strong>
                  </div>
                </div>
                <div style="display: flex; align-items: center; gap: 8px">
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; width: 140px; text-align: center; font-size: 12px; font-weight: bold">
                    Storage Read
                  </div>
                  <div style="flex: 1; border: 2px solid; border-radius: 6px; padding: 8px; font-size: 12px">
                    50 TB × $0.01/GB = <strong>$500</strong>
                  </div>
                </div>
                <div style="display: flex; align-items: center; gap: 8px">
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; width: 140px; text-align: center; font-size: 12px; font-weight: bold">
                    Storage Write
                  </div>
                  <div style="flex: 1; border: 2px solid; border-radius: 6px; padding: 8px; font-size: 12px">
                    5 TB × $0.02/GB = <strong>$100</strong>
                  </div>
                </div>
                <div style="margin-top: 6px; padding: 10px; border: 2px solid; border-radius: 6px; text-align: center; font-weight: bold">
                  Total: ~$3,600
                </div>
                <div style="margin-top: 8px; font-size: 11px; padding: 8px; border: 2px solid; border-radius: 6px">
                  <strong>Tradeoff:</strong> 180d window vs 7d → 25× data
                  scanned, 5× cost. Cap at $5k/feature forces prioritization.
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
                  Baseline throughput of 5 to 20 terabytes per hour on 100
                  worker clusters translates to 10 hour backfills costing $2,000
                  to $4,000 at $1 to $2 per vCPU hour
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Window length dominates cost: 180 day unique user aggregates
                  scan 25 times more data than 7 day windows, often making full
                  history recomputes prohibitively expensive
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Teams cap per feature backfills at 24 hours wall clock and
                  $5,000 budget, prioritizing features that provide at least 1%
                  to 2% model accuracy lift
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Bottom up partition listing (list once, filter) reduces wall
                  clock time by 30% to 50% versus top down existence checks by
                  minimizing cloud storage API calls
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Separate compute pools for backfills prevent resource
                  contention with production streaming jobs but may slow
                  completion if capacity is capped
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
                  Uber ingests hundreds of terabytes daily; a full 365 day
                  backfill over this volume would cost hundreds of thousands of
                  dollars, forcing incremental reprocessing strategies with
                  state checkpointing
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  A recommendation model feature providing 0.5% AUC lift is not
                  backfilled over 12 months (estimated $8,000 cost); instead,
                  team waits 60 days for data to accrue naturally
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Netflix schedules large backfills during overnight off peak
                  windows on isolated batch clusters achieving multi terabyte
                  per hour throughput without impacting real time recommendation
                  serving
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonFeatureBackfillingBackfillCostAndThroughputPlanning;
