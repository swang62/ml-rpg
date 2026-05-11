import type { Component } from "solid-js";

const LessonDataReconciliationCompletenessVsCostTheReconciliationTradeOff: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Completeness vs Cost: The Reconciliation Trade Off
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <strong>The Economic Reality:</strong> Full cell level
            reconciliation where you compare every field of every row is
            extraordinarily expensive. Imagine 10 billion rows across 200
            columns. Reading and comparing that data daily requires many tens or
            hundreds of compute nodes and hours of runtime. The question is not
            whether to reconcile, but how much reconciliation you can afford.
            <div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 8px; margin: 12px 0; align-items: stretch">
              <div style="padding: 12px; border: 2px solid; border-radius: 6px">
                <div style="font-weight: 700; margin-bottom: 4px; font-size: 13px">
                  Full Reconciliation
                </div>
                <div style="font-size: 12px">
                  Every field compared, 100s of nodes, hours of compute. Catches
                  all discrepancies.
                </div>
              </div>
              <div style="display: flex; align-items: center; font-weight: 800; font-size: 18px">
                vs
              </div>
              <div style="padding: 12px; border: 2px solid; border-radius: 6px">
                <div style="font-weight: 700; margin-bottom: 4px; font-size: 13px">
                  Sampling + Aggregates
                </div>
                <div style="font-size: 12px">
                  Check 1% of rows plus counts and sums. 10x cheaper but can
                  miss subtle issues.
                </div>
              </div>
            </div>
            Most teams use a tiered approach. High risk flows like financial
            balances or billing amounts get full reconciliation. Lower risk
            analytics tables get lightweight checks: row counts, column sums,
            and aggregate hash totals. This hybrid strategy balances cost and
            coverage.
            <strong>Consistency vs Availability:</strong> You could
            theoretically design a system that never needs reconciliation by
            using distributed transactions or exactly once Change Data Capture
            (CDC). This would reduce discrepancies but it increases coupling
            between systems and hurts availability. If your payment processor
            must wait for synchronous confirmation from your data warehouse
            before completing a transaction, a warehouse outage takes down
            payments. In practice, most large scale systems accept eventual
            consistency and use reconciliation as a safety net. Stripe's
            internal ledger favors very strong consistency for account balances
            because correctness matters more than availability. Their data lake
            for analytics is eventually consistent, reconciled periodically,
            because a few minutes of lag is acceptable for dashboards.
            <strong>Matching Strategy Trade Offs:</strong> Strict key equality
            gives you deterministic, auditable matching. If both systems have{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              order_id
            </code>
            , you join on that and you're done. But this fails when different
            systems use different identifiers or formatting. Fuzzy matching and
            machine learning can handle messy real world data, like customer
            names and addresses across CRMs. However, they introduce
            probabilistic matches, which need explainability for regulated
            domains. You cannot tell an auditor that two financial records
            "probably" match with 85% confidence.
            <strong>Batch vs Streaming:</strong> Batch reconciliation allows
            heavy joins and detailed field comparisons but adds latency. You
            might reconcile daily at 2 AM, meaning issues are discovered hours
            after they occur. Streaming reconciliation on event logs detects
            problems within seconds or minutes, but you are limited to windowed
            aggregates and must carefully handle out of order events and late
            arrivals.
            <div style="padding: 14px 16px; border-left: 4px solid; border-radius: 0 6px 6px 0; margin: 12px 0; font-style: italic">
              <div style="font-size: 14px; line-height: 1.5">
                "The decision is not 'should we reconcile everything?' It's
                'which flows are high risk and warrant the cost of full
                reconciliation versus which can be safely sampled?'"
              </div>
            </div>
            <strong>When to Choose What:</strong> Use full reconciliation when
            the cost of a discrepancy exceeds the compute cost. For billing
            systems where a 0.01% error rate might affect millions in revenue,
            full reconciliation is cheap insurance. Use sampling for analytics
            where approximate correctness is acceptable. Use streaming
            reconciliation when you need fast feedback loops, such as fraud
            detection. Use batch when thoroughness matters more than speed, such
            as month end financial close.
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Full cell level reconciliation of billions of rows is
                  expensive, requiring hundreds of nodes and hours of runtime.
                  Teams tier their approach: full reconciliation for high risk
                  financial flows, sampling and aggregates for lower risk
                  analytics.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Choosing strong consistency to avoid reconciliation increases
                  system coupling and hurts availability. Most large systems
                  accept eventual consistency and use reconciliation as a safety
                  net, like Stripe's approach with strict ledger consistency but
                  eventual data lake consistency.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Strict key based matching is deterministic and auditable but
                  fails with different identifiers. Fuzzy or ML based matching
                  handles messy data but introduces probabilistic matches that
                  are hard to justify in regulated domains.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Batch reconciliation allows thorough comparison but adds
                  latency (hours to discover issues). Streaming reconciliation
                  detects problems in seconds but is limited to windowed
                  aggregates and must handle out of order events carefully.
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
                  A company with 10 billion rows and 200 columns might reserve
                  full daily reconciliation for the 5 core billing tables but
                  sample 1% of the 100 lower priority analytics tables, reducing
                  compute cost by 10x while maintaining coverage on critical
                  paths
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Stripe uses strong consistency in their internal ledger where
                  account balances must be immediately correct, but runs
                  periodic batch reconciliation on their analytics data lake
                  where a few minutes of eventual consistency is acceptable
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonDataReconciliationCompletenessVsCostTheReconciliationTradeOff;
