import type { Component } from "solid-js";

const LessonBackfillStrategiesTradeOffsFullVsIncrementalBackfill: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Trade-offs: Full vs. Incremental Backfill
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <strong>The Core Decision:</strong>
            When logic changes, should you reprocess all historical data or just
            a targeted time window? This is not a theoretical question. It
            directly impacts cost, time to repair, data consistency, and
            operational risk.
            <div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 8px; margin: 12px 0; align-items: stretch">
              <div style="padding: 12px; border: 2px solid; border-radius: 6px">
                <div style="font-weight: 700; margin-bottom: 4px; font-size: 13px">
                  Full Backfill
                </div>
                <div style="font-size: 12px">
                  All history consistent, but 2 to 7 days compute, multiple PB
                  moved
                </div>
              </div>
              <div style="display: flex; align-items: center; font-weight: 800; font-size: 18px">
                vs
              </div>
              <div style="padding: 12px; border: 2px solid; border-radius: 6px">
                <div style="font-weight: 700; margin-bottom: 4px; font-size: 13px">
                  Incremental (90 days)
                </div>
                <div style="font-size: 12px">
                  Faster, cheaper, but old data uses old logic
                </div>
              </div>
            </div>
            <strong>When to Choose Full Backfill:</strong>
            Full backfill makes sense when you need consistent definitions
            across your entire history. Machine learning training is the classic
            case. If you are training a fraud detection model on 2 years of
            data, having "fraud score" calculated with one algorithm for 2022 to
            2023 and a different algorithm for 2024 corrupts your labels. Model
            accuracy degrades because the target variable is inconsistent.
            Another scenario is regulatory reporting or audits where you must
            provide consistent metrics across arbitrary time ranges. If an
            auditor asks for revenue trends over 3 years, having piecewise
            definitions creates compliance risk. The cost is significant.
            Reprocessing 2 years at 10 TB per day means moving 7.3 PB. On a
            large Spark cluster with 2,000 executors, this takes 3 to 7 days
            even with 24/7 processing. At cloud pricing of roughly $0.10 per GB
            processed, that is $730,000 in compute cost.
            <strong>When to Choose Incremental Backfill:</strong>
            Incremental backfill reprocesses only recent data, typically 30 to
            90 days. This is appropriate when older data is rarely queried or
            when you can tolerate definition changes over time. Business
            dashboards often fall here. A product manager looking at last
            quarter's metrics does not care if 2022 data uses a slightly
            different definition. The math favors incremental: 90 days at 10 TB
            per day is 900 TB, completing in 1 to 2 days with 10 to 20 percent
            of cluster capacity. Cost drops to roughly $90,000. For many
            organizations, this 8x cost reduction and 3x to 5x faster repair
            time outweighs having inconsistent historical data.
            <div style="margin: 8px 0; display: flex; flex-direction: column; align-items: center">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
                Full Backfill Cost Comparison
              </div>
              <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap; justify-content: center">
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 10px; font-weight: 600">2 YEARS</div>
                  <div style="font-size: 16px; font-weight: 800">7.3 PB</div>
                </div>
                <div style="font-size: 18px; font-weight: 800">→</div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 10px; font-weight: 600">90 DAYS</div>
                  <div style="font-size: 16px; font-weight: 800">900 TB</div>
                </div>
              </div>
            </div>
            <strong>Hybrid Approach:</strong>
            Many large companies use a hybrid strategy. They fully reprocess the
            last 90 to 180 days for active use cases, but leave older data
            untouched unless specifically needed. When someone requests a 3 year
            analysis, they either accept that pre-2024 data uses old logic, or
            they trigger a targeted backfill for only the needed metrics and
            time ranges. This pragmatic approach balances cost and consistency.
            You get fast repair for recent data where most queries land (90
            percent of analytics queries touch data less than 6 months old),
            while avoiding the expense of reprocessing rarely accessed archives.
            <strong>Decision Framework:</strong>
            Ask these questions: First, what is the read pattern? If 95 percent
            of queries are last 90 days, incremental wins. Second, is this a
            training dataset for ML? If yes, full backfill for consistency.
            Third, what is your error tolerance? Revenue and compliance metrics
            need full backfill. Engagement metrics can often use incremental.
            Fourth, what is the urgency? If you need repairs in production
            tomorrow, incremental gets you there. Full backfill is for planned
            migrations.
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>⚠️ Common Pitfall:</strong> Teams often default to full
              backfill for perfection, then regret it when the job takes 5 days,
              costs $500,000, and blocks other critical work. Start with
              incremental for most cases.
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
                  Full backfill (2 years, 7.3 PB) costs roughly $730,000 and
                  takes 3 to 7 days but ensures complete consistency for ML
                  training or compliance
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Incremental backfill (90 days, 900 TB) costs roughly $90,000
                  and completes in 1 to 2 days, acceptable for dashboards where
                  old data is rarely queried
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Machine learning training requires full backfill to avoid
                  label inconsistency that degrades model accuracy
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  90 percent of analytics queries touch data less than 6 months
                  old, making incremental backfill sufficient for most business
                  use cases
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Hybrid strategy: fully reprocess 90 to 180 days for active
                  queries, leave older archives unless specifically requested
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
                  ML scenario: Training fraud model on 2 years of transactions
                  requires full backfill so &lt;code&gt;fraud_score&lt;/code&gt;
                  uses consistent algorithm across all training examples
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Dashboard scenario: Product engagement metrics for last
                  quarter can use incremental 90 day backfill; 2022 data with
                  old logic is acceptable since no one queries it
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonBackfillStrategiesTradeOffsFullVsIncrementalBackfill;
