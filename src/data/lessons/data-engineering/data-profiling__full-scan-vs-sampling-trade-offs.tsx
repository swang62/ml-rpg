import type { Component } from "solid-js";

const LessonDataProfilingFullScanVsSamplingTradeOffs: Component = () => (
  <div class="lesson-content">
    <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
      <div class="mb-4 p-4">
        <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
          Full Scan vs Sampling Trade offs
        </h1>
        <div
          class="card-content-area"
          style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
        >
          <strong>The Core Decision:</strong>
          Every profiling system faces a fundamental choice: scan all data for
          exact metrics, or sample for approximate results at lower cost. The
          right answer depends on your correctness requirements, compute budget,
          and latency constraints.
          <div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 8px; margin: 12px 0; align-items: stretch">
            <div style="padding: 12px; border: 2px solid; border-radius: 6px">
              <div style="font-weight: 700; margin-bottom: 4px; font-size: 13px">
                Full Scan
              </div>
              <div style="font-size: 12px">
                Exact metrics, linear cost with data size, can take hours for
                100 TB
              </div>
            </div>
            <div style="display: flex; align-items: center; font-weight: 800; font-size: 18px">
              vs
            </div>
            <div style="padding: 12px; border: 2px solid; border-radius: 6px">
              <div style="font-weight: 700; margin-bottom: 4px; font-size: 13px">
                Sampling (1%)
              </div>
              <div style="font-size: 12px">
                Approximate metrics, 100x cost reduction, completes in minutes
              </div>
            </div>
          </div>
          <strong>When Full Scans Are Required:</strong>
          First, <strong>primary key validation</strong> in Online Transaction
          Processing (OLTP) systems demands exact uniqueness guarantees. You
          cannot approximate whether a{" "}
          <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
            customer_id
          </code>{" "}
          is unique; duplicates cause immediate correctness failures. Second,{" "}
          <strong>financial reconciliation</strong> and compliance audits need
          exact counts. Reporting that you processed approximately 1.5 million
          transactions (plus or minus 15,000) is not acceptable when real number
          is 1,487,342. Third, detecting{" "}
          <strong>rare but critical anomalies</strong> requires full scans. If a
          regional bug affects 0.0001 percent of rows (100 orders out of 1
          billion), sampling 1 percent sees only 10 million rows and likely
          misses the issue entirely.
          <strong>When Sampling Is Sufficient:</strong>
          For <strong>distribution analysis and query optimization</strong>,
          approximate metrics work well. A query optimizer choosing between join
          orders does not need to know there are exactly 847,293 distinct values
          versus an estimate of 850,000 (0.3 percent error). The query plan
          remains the same. For{" "}
          <strong>anomaly detection on aggregate trends</strong>, sampling
          captures shifts. If daily order volume drops 30 percent, you will see
          that in a 1 percent sample with high confidence. You are monitoring
          macro patterns, not hunting individual bad rows. For{" "}
          <strong>schema validation and format checks</strong>, sampling
          provides fast feedback. Discovering that a timestamp column contains
          string values does not require scanning all 10 billion rows; seeing it
          in 10,000 sampled rows is enough to alert.
          <div style="margin: 8px 0; display: flex; flex-direction: column; align-items: center">
            <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
              Cost Comparison For 100 TB Dataset
            </div>
            <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap; justify-content: center">
              <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                <div style="font-size: 10px; font-weight: 600">FULL SCAN</div>
                <div style="font-size: 16px; font-weight: 800">
                  5000 CPU hrs
                </div>
              </div>
              <div style="font-size: 18px; font-weight: 800">→</div>
              <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                <div style="font-size: 10px; font-weight: 600">1% SAMPLE</div>
                <div style="font-size: 16px; font-weight: 800">50 CPU hrs</div>
              </div>
            </div>
          </div>
          <strong>Hybrid Strategies for Production:</strong>
          Most companies use a layered approach. Run{" "}
          <strong>fast sampled checks</strong> on every batch for broad quality
          metrics and alerts. Schedule <strong>targeted full scans</strong>{" "}
          weekly or monthly on critical columns like primary keys, financial
          amounts, or personally identifiable information where exactness
          matters. Another pattern is <strong>stratified sampling</strong>:
          sample heavily from recent partitions where issues are most likely,
          and lightly from older stable data. For a 365 day retention warehouse,
          profile the last 7 days at 10 percent sample, the prior 30 days at 1
          percent, and the rest at 0.1 percent.
          <div style="padding: 14px 16px; border-left: 4px solid; border-radius: 0 6px 6px 0; margin: 12px 0; font-style: italic">
            <div style="font-size: 14px; line-height: 1.5">
              "The decision is not 'sample or scan.' It is: what is the blast
              radius if I miss this issue, and how much am I willing to pay to
              prevent it?"
            </div>
          </div>
          <strong>The Silent Drift Failure Mode:</strong>
          Sampling has a blind spot. When issues are rare and localized,
          sampling misses them. If a payment gateway in one region starts
          writing incorrect currency codes for 0.001 percent of transactions,
          your 1 percent sample has only a 1 percent chance of including even
          one bad record. By the time you detect it through downstream
          complaints, thousands of transactions are wrong. The mitigation is
          combining sampling for broad checks with{" "}
          <strong>critical column full scans</strong> on high impact fields and{" "}
          <strong>business rule validation</strong> on aggregates. For example,
          daily sum of{" "}
          <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
            payment_amount
          </code>{" "}
          should match expected range based on historical patterns, even if
          individual row profiling uses sampling.
        </div>
        <div class="Learn_keyTakeaways p-4 mb-4">
          <div class="Learn_keyTakeawaysHeader mb-3 pb-3">💡 Key Takeaways</div>
          <div class="d-flex flex-column gap-2">
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Full scans provide exact metrics but cost scales linearly with
                data: profiling 100 TB can take 5,000 Central Processing Unit
                (CPU) hours versus 50 hours for 1 percent sampling
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Use full scans when exactness is critical: primary key
                uniqueness in OLTP, financial reconciliation, detecting rare
                anomalies affecting under 0.001 percent of rows
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Use sampling when approximate metrics suffice: query
                optimization (0.3 percent cardinality error does not change
                plans), aggregate anomaly detection (30 percent drop visible in
                1 percent sample)
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Hybrid strategy works best: fast sampled checks on every batch
                for alerts, targeted full scans weekly on critical columns where
                exactness matters
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
                A 1% sample of 1 billion rows (10 million sampled) will likely
                miss a bug affecting 0.0001% of rows (1,000 total bad records),
                requiring full scan for detection
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">2</span>
              <span class="flex-grow-1 Learn_cardContent">
                Query optimizer uses HyperLogLog estimate of 850,000 distinct
                values (actual 847,293) for join order selection; 0.3% error
                does not change the chosen plan
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default LessonDataProfilingFullScanVsSamplingTradeOffs;
