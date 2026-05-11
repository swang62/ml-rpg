import type { Component } from "solid-js";

const LessonAnomalyDetectionDataFailureModesAndEdgeCases: Component = () => (
  <div class="lesson-content">
    <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
      <div class="mb-4 p-4">
        <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
          Failure Modes and Edge Cases
        </h1>
        <div
          class="card-content-area"
          style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
        >
          <strong>Concept Drift vs Real Anomalies:</strong> The most common
          failure mode is confusing legitimate business changes with data
          quality issues. A successful marketing campaign doubles traffic for
          three weeks. Row counts jump from 5 million to 10 million daily. A
          naive detector flags every run as anomalous because values exceed
          historical ranges. If your team manually suppresses these alerts, you
          create alert fatigue where engineers start ignoring notifications.
          Real issues get buried in false positives. Eventually the model learns
          the new baseline, but during the transition period (often 7 to 14
          days), detection is unreliable. AWS Glue mitigates this by allowing
          users to exclude confirmed anomalies from training data, but that
          requires human judgment for every major shift.
          <strong>Seasonality and Calendar Effects:</strong> Retail traffic
          around Black Friday or Singles Day can be 10x normal volume. If your
          detector has not seen enough yearly cycles (ideally 2+ years of
          history), it treats this as an extreme anomaly. Similarly, workday
          versus weekend patterns confuse detectors operating at daily
          granularity. Monday might see 6 million events while Sunday sees 3
          million. Without calendar aware features, a Sunday following a
          Saturday maintenance window (also low volume) might not trigger alerts
          even though Sunday data is actually missing.
          <div style="margin: 8px 0; display: flex; flex-direction: column; align-items: center">
            <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
              Seasonal Spike Timeline
            </div>
            <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap; justify-content: center">
              <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                <div style="font-size: 10px; font-weight: 600">NORMAL</div>
                <div style="font-size: 16px; font-weight: 800">5M rows</div>
              </div>
              <div style="font-size: 18px; font-weight: 800">→</div>
              <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                <div style="font-size: 10px; font-weight: 600">
                  BLACK FRIDAY
                </div>
                <div style="font-size: 16px; font-weight: 800">50M rows</div>
              </div>
              <div style="font-size: 18px; font-weight: 800">→</div>
              <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                <div style="font-size: 10px; font-weight: 600">FALSE ALERT</div>
                <div style="font-size: 16px; font-weight: 800">10x spike</div>
              </div>
            </div>
          </div>
          <strong>Backfill and Reprocessing:</strong> When you rerun a monthly
          job with corrected logic, row counts and distributions can change
          drastically compared to the buggy version. If detection compares only
          to the last run, it treats corrected data as anomalous. For example,
          fixing a join that was dropping 2 million rows suddenly increases
          output from 8 million to 10 million rows. The detector flags this as a
          25% anomaly. One strategy is to scope detection to production forward
          fills only, explicitly disabling checks for historical backfills.
          Alternatively, compute separate baselines for backfill windows by
          comparing the reprocessed data to other backfills of the same time
          period, not to recent production runs.
          <strong>Partial Failures and Distribution Shifts:</strong> An upstream
          service silently stops sending events for one region due to a
          configuration change. Total row count drops only 5% (from 20 million
          to 19 million), within normal daily variance. If you monitor only
          global row count, you miss the issue entirely. However, the regional
          composition changed drastically. US events dropped from 8 million to
          100, while other regions stayed normal. A robust design monitors
          dimensions like region, platform, or client version, detecting
          distribution shifts even when totals look normal. The challenge is
          that monitoring every dimension creates thousands of metrics. Small
          volume segments (a new app version with 1,000 daily users) have high
          random noise, producing spurious alerts.
          <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
            <strong>❗ Remember:</strong> High dimensional monitoring (by
            region, platform, version) catches partial failures but creates
            alert volume. Set minimum volume thresholds: only monitor dimensions
            with at least 100,000 events daily to avoid noise.
          </div>
          <strong>Meta Failures:</strong> The anomaly detection system itself
          can fail. A streaming detector falls behind due to processing
          bottleneck, operating on data with 1 hour lag instead of the usual 2
          minute latency. It misses time sensitive anomalies entirely. Mature
          platforms treat data quality jobs as first class workloads with their
          own SLAs, health checks, and monitoring. You need alerts on alert
          system health: detection lag exceeding 5 minutes, profiler jobs
          failing, metric store unavailability.
        </div>
        <div class="Learn_keyTakeaways p-4 mb-4">
          <div class="Learn_keyTakeawaysHeader mb-3 pb-3">💡 Key Takeaways</div>
          <div class="d-flex flex-column gap-2">
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Concept drift (marketing campaigns, product launches) causes
                false positives when row counts double. Models need 7 to 14 days
                to adapt, creating alert fatigue unless confirmed anomalies are
                excluded from training
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Seasonality requires 2+ years of history for events like Black
                Friday (10x traffic spike) or calendar patterns (weekday vs
                weekend). Without this, legitimate peaks trigger false alerts
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Backfills and reprocessing flag corrected data as anomalous when
                compared to buggy previous runs. Solution: disable detection for
                historical jobs or use separate baselines for backfill windows
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Partial failures (one region stops sending data) may only drop
                total count 5%, within normal variance. Dimensional monitoring
                (by region, platform) catches these but creates alert volume for
                low traffic segments
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Meta failures occur when detection system itself degrades:
                streaming detector lag grows from 2 minutes to 1 hour, missing
                time sensitive issues. Monitor your monitors with SLAs on
                detection latency
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
                Marketing campaign doubles traffic for 3 weeks. Detector trained
                on 30 days flags every run. Team suppresses alerts manually,
                creating fatigue. Real bug (database connection failure) gets
                ignored in alert noise.
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">2</span>
              <span class="flex-grow-1 Learn_cardContent">
                Black Friday traffic hits 50M rows versus normal 5M. Detector
                without yearly history treats this as 900% anomaly, halting all
                pipelines. Business loses critical holiday insights.
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">3</span>
              <span class="flex-grow-1 Learn_cardContent">
                Reprocessing fixes join bug, increasing output from 8M to 10M
                rows. Detection compares to last buggy run (8M), flags 25%
                anomaly, rejects corrected data as suspicious.
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">4</span>
              <span class="flex-grow-1 Learn_cardContent">
                Configuration error stops US region events. Global count drops
                5% (19M vs 20M), within variance. No alert fires. Later
                investigation finds US data missing for 6 hours, corrupting
                regional dashboards.
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">5</span>
              <span class="flex-grow-1 Learn_cardContent">
                Streaming detector queue fills during traffic spike, lag grows
                to 1 hour. Fraud detection misses account takeovers happening in
                real time because alerts arrive too late.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default LessonAnomalyDetectionDataFailureModesAndEdgeCases;
