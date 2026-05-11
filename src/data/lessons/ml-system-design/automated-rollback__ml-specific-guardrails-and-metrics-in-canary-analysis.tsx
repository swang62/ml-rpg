import type { Component } from "solid-js";

const LessonAutomatedRollbackMlSpecificGuardrailsAndMetricsInCanaryAnalysis: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            ML Specific Guardrails and Metrics in Canary Analysis
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="padding: 14px 16px; border: 2px solid; border-left: 4px solid; border-radius: 6px; margin: 0">
              <div style="font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px">
                Key Concept
              </div>
              <div style="font-size: 15px; line-height: 1.5">
                ML canary analysis layers{" "}
                <strong>model quality and business metrics</strong> on top of
                traditional infrastructure SLOs. Two tiers: fast infrastructure
                guardrails (seconds) and slower ML/business metrics (minutes to
                hours).
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              FAST GUARDRAILS
            </p>
            <p style="margin-top: 0">
              Checked every 30-60 seconds: success rate ≥99%, P99 latency
              &lt;500ms, CPU &lt;90%, memory &lt;95%. These gate traffic
              increases. If latency spikes or error rate jumps, rollback
              immediately.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              SLOW ML METRICS
            </p>
            <p style="margin-top: 0">
              CTR, conversion rate, or prediction error take minutes to hours to
              accumulate signal. Run in background analysis windows (10-30
              minutes). If CTR drops &gt;5% after several intervals, halt
              promotion or trigger rollback even if infrastructure metrics are
              healthy.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Pattern:</strong> Gate on request success and latency
              first, then watch engagement metrics (time spent, interactions)
              over longer periods.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              SEGMENT-LEVEL ANALYSIS
            </p>
            <p style="margin-top: 0">
              Aggregate metrics mask segment problems. Model might improve
              overall precision 0.82→0.85 but hurt recall for new users
              0.60→0.45. Track metrics by segment (user cohort, device,
              geography) and require canary to not degrade any critical segment.
              Track separately by city, time of day, and trip type.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              DISTRIBUTION DRIFT
            </p>
            <p style="margin-top: 0">
              Compare input and output distributions between canary and
              baseline. KL divergence or PSI &gt;0.2 signals different data
              distribution, invalidating comparison. Check calibration: if
              canary predicts 70% confidence but actual rate is 50%, that
              miscalibration breaks downstream decisions.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Calibration:</strong> Critical for probability outputs.
              Miscalibration can break downstream systems even when accuracy
              looks similar.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Fast Guardrails (30s checks)
                  </strong>
                  <div style="font-size: 11px; margin-top: 6px">
                    ✓ Success rate ≥ 99%
                    <br />✓ P99 latency &lt; 500ms (or 150ms ML)
                    <br />✓ Error rate delta &lt; 50%
                    <br />✓ CPU &lt; 90%, Memory &lt; 95%
                  </div>
                  <div style="font-size: 10px; margin-top: 6px; font-style: italic">
                    Gate: Block traffic increase if fail
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  +
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Slow ML Metrics (10 to 30 min)
                  </strong>
                  <div style="font-size: 11px; margin-top: 6px">
                    • CTR drop &lt; 5%
                    <br />• Conversion rate delta &lt; 10%
                    <br />• AUC drift &lt; 0.02
                    <br />• Calibration error &lt; 0.05
                  </div>
                  <div style="font-size: 10px; margin-top: 6px; font-style: italic">
                    Gate: Halt promotion or rollback
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  +
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Segment &amp; Distribution Checks
                  </strong>
                  <div style="font-size: 11px; margin-top: 6px">
                    • Per segment metric (city, device)
                    <br />• KL divergence or PSI &lt; 0.2
                    <br />• No critical cohort regression
                  </div>
                  <div style="font-size: 10px; margin-top: 6px; font-style: italic">
                    Gate: Require all segments pass
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
                  Two tier gating: Fast infrastructure metrics (99 percent
                  success, 500 ms P99, checked every 30 to 60 seconds) gate
                  traffic increases, slow ML metrics (CTR drop within 5 percent,
                  AUC drift under 0.02) run in 10 to 30 minute background
                  windows
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Segment level analysis prevents hidden regressions where
                  aggregate metrics look good but specific cohorts (new users,
                  device types, geographies) degrade significantly
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Distribution drift checks (KL divergence or PSI above 0.2)
                  detect when canary sees different data than baseline,
                  invalidating metric comparisons
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Calibration error is critical for probability predictions:
                  canary predicting 70 percent confidence with 50 percent actual
                  rate breaks downstream systems even if accuracy is similar
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Netflix gates recommendation canaries on P99 inference under
                  150 ms and stable error rate, monitors CTR and watch time over
                  longer windows to catch business impact before full rollout
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
                  Meta feed ranking canary: gates on request success rate 99
                  percent and P99 latency 200 ms every 30 seconds, monitors
                  engagement metrics (time spent, interactions) over 20 minute
                  windows, requires no segment to drop more than 3 percent
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Uber ETA prediction canary: tracks prediction error separately
                  by city, time of day, trip type, ensures canary does not
                  increase error for high value segments (airport trips, peak
                  hours) by more than 5 percent even if overall error improves
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonAutomatedRollbackMlSpecificGuardrailsAndMetricsInCanaryAnalysis;
