import type { Component } from "solid-js";

const LessonDataReconciliationKeyMismatchFailuresAndSamplingPitfalls: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Key Mismatch Failures and Sampling Pitfalls
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <strong>The Identity Crisis:</strong> Key mismatches are the most
            common and catastrophic failure mode in reconciliation. If system A
            uses a composite business key like (
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              user_id
            </code>
            ,{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              account_id
            </code>
            ,{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              transaction_date
            </code>
            ) and system B uses a surrogate ID like{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              transaction_id
            </code>
            , naive reconciliation will treat many genuine matches as missing
            records. At scale, this looks disastrous. Your dashboard shows only
            60% of records matching when the real issue is that you cannot
            correctly identify corresponding rows. This is an identity
            resolution problem, not a data quality problem, but it manifests as
            massive apparent discrepancies. The failure gets worse during
            migrations. If you change key semantics over time, like
            transitioning from natural keys to surrogate keys, older and newer
            records may not join correctly. Suppose pre migration records use{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              email
            </code>{" "}
            as the key and post migration records use{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              user_id
            </code>
            . Your reconciliation job needs dual key logic to handle both eras,
            or you will report perpetual mismatches on historical data.
            <strong>The Sampling Trap:</strong> Sampling is cost effective but
            has dangerous blind spots. Simple random sampling at 1% means a bug
            that affects only high value transactions, such as all payments over
            $10,000, might be severely underrepresented. If only 0.5% of your
            transactions are over $10,000, and you sample 1% uniformly, you
            might check only 5 such transactions out of 50,000. A costly
            discrepancy could go undetected for days or weeks.
            <div style="margin: 8px 0; display: flex; flex-direction: column; align-items: center">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
                Sampling Risk Example
              </div>
              <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap; justify-content: center">
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 10px; font-weight: 600">
                    HIGH VALUE TXN
                  </div>
                  <div style="font-size: 16px; font-weight: 800">0.5%</div>
                </div>
                <div style="font-size: 18px; font-weight: 800">×</div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 10px; font-weight: 600">
                    SAMPLE RATE
                  </div>
                  <div style="font-size: 16px; font-weight: 800">1%</div>
                </div>
                <div style="font-size: 18px; font-weight: 800">=</div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 10px; font-weight: 600">COVERAGE</div>
                  <div style="font-size: 16px; font-weight: 800">0.005%</div>
                </div>
              </div>
            </div>
            Stratified sampling helps by ensuring you check proportional samples
            from each value tier, but you must explicitly design for this.
            Targeted rules, such as always reconciling 100% of transactions over
            $5,000, are another mitigation.
            <strong>Time and Lateness Issues:</strong> Time based reconciliation
            introduces clock and lateness complications. Suppose you reconcile
            daily partitions based on processing time in your warehouse but
            source systems partition by event time. Late arriving events that
            fall into previous business days might never be reconciled or,
            worse, be double counted if your backfill logic is incorrect. At
            Uber scale, millions of events can arrive late due to mobile
            connectivity or retry logic. Without careful watermarking and
            backfill strategies, you risk persistent drift where the warehouse
            slowly accumulates records that never match against the source
            because they were assigned to the wrong reconciliation window.
            <strong>
              Silent Failures of the Reconciliation System Itself:
            </strong>{" "}
            Reconciliation engines can fail silently. If the job that computes
            your quality reports crashes, dashboards may show stale green
            indicators while underlying data is increasingly corrupted. Robust
            systems treat reconciliation jobs as first class production services
            with their own Service Level Agreements (SLAs), alerts, and
            backpressure handling. Another dangerous pattern is reconciliation
            that writes back automatic fixes. If these corrections are not
            idempotent and the job crashes mid run, you can partially update
            records and create new inconsistencies. In financial domains, non
            idempotent corrections can directly impact reported revenue or
            customer balances, turning a data quality issue into a financial
            integrity incident.
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>❗ Remember:</strong> Schema evolution is a chronic edge
              case. When a column is renamed, split, or its semantics change,
              reconciliation rules must update in lockstep. If not, you either
              get false positives on mismatches or, worse, false negatives where
              a column is silently dropped from comparison because the engine
              cannot map it between systems.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 12px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">Source A</strong>
                  <div style="font-size: 10px; margin-top: 4px">
                    Key: (user_id, date)
                  </div>
                </div>
                <div style="text-align: center; font-size: 20px; font-weight: bold">
                  ✗
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">Source B</strong>
                  <div style="font-size: 10px; margin-top: 4px">
                    Key: transaction_id
                  </div>
                </div>
                <div style="text-align: center; font-size: 20px; font-weight: bold">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">Result: 60% Match</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Key mismatch, not data issue
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
                  Key mismatch is the most catastrophic failure mode. When
                  systems use different keys (composite business key vs
                  surrogate ID), reconciliation reports massive false
                  mismatches. At 60% apparent match rate, the real problem is
                  identity resolution, not data quality.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Simple random sampling at 1% severely underrepresents rare but
                  critical segments. A bug affecting 0.5% of high value
                  transactions results in only 0.005% coverage, potentially
                  missing costly discrepancies for days.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Time based reconciliation with late arriving events creates
                  persistent drift. Millions of events can arrive after their
                  business day closes, falling into the wrong reconciliation
                  window unless careful watermarking and backfill logic are
                  implemented.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Reconciliation systems can fail silently, showing stale green
                  health indicators while data degrades. Non idempotent
                  automatic corrections that crash mid run create new
                  inconsistencies, especially dangerous in financial domains
                  where they impact reported revenue.
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
                  A migration from email based keys to user_id based keys causes
                  reconciliation to fail on all pre migration records unless
                  dual key logic is implemented, resulting in perpetual mismatch
                  reports on historical data
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  With 5 million transactions daily and 1% random sampling, only
                  250 high value transactions over $10,000 are checked. A bug
                  affecting this segment might process thousands of incorrect
                  records before being detected.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonDataReconciliationKeyMismatchFailuresAndSamplingPitfalls;
