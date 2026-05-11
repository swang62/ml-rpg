import type { Component } from "solid-js";

const LessonPipelineMonitoringAlertingMonitoringTradeOffsWhenToChooseWhat: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Monitoring Trade Offs: When to Choose What
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Static Thresholds vs Anomaly Detection:
            </div>
            The fundamental choice is between simple rules and adaptive
            intelligence. Static thresholds like "failure rate &gt; 1 percent"
            or "latency &gt; 30 minutes" are deterministic, easy to debug, and
            transparent to on call engineers. When an alert fires at 3 AM, you
            immediately know what crossed which threshold.
            <div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 8px; margin: 12px 0; align-items: stretch">
              <div style="padding: 12px; border: 2px solid; border-radius: 6px">
                <div style="font-weight: 700; margin-bottom: 4px; font-size: 13px">
                  Static Thresholds
                </div>
                <div style="font-size: 12px">
                  Simple, debuggable, requires manual tuning as traffic changes
                </div>
              </div>
              <div style="display: flex; align-items: center; font-weight: 800; font-size: 18px">
                vs
              </div>
              <div style="padding: 12px; border: 2px solid; border-radius: 6px">
                <div style="font-weight: 700; margin-bottom: 4px; font-size: 13px">
                  Anomaly Detection
                </div>
                <div style="font-size: 12px">
                  Adapts to baselines, catches drift, but opaque and prone to
                  false positives
                </div>
              </div>
            </div>
            Anomaly detection adapts to baseline behavior. It learns that orders
            volume is 2 million on weekdays but 3.5 million on weekends, and
            only alerts on genuine deviations. This catches subtle issues: row
            counts gradually declining 2 percent per day over two weeks, which
            static thresholds would miss. The downside is complexity. When an
            anomaly alert fires, on call engineers ask "why did the model decide
            this is anomalous?" Black box explanations erode trust, especially
            during false positives from seasonality changes like holiday traffic
            spikes or marketing campaigns.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              The Decision Framework:
            </div>
            Start with static thresholds for critical operational metrics. Job
            success/failure is binary. Latency SLOs are well understood (p99
            under 60 seconds). These need no machine learning. Add anomaly
            detection selectively for high value data quality checks. Daily
            active users, revenue tables, and core business metrics benefit from
            baseline comparisons. A 15 percent unexpected drop in
            revenue_by_product table is worth investigating even if it doesn't
            violate a predefined threshold. But accept that you'll tune false
            positive rates: start conservative (only alert on 3 sigma
            deviations) and tighten gradually as you build confidence.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Pipeline Centric vs Data Product Centric:
            </div>
            Pipeline centric monitoring attaches checks to specific jobs. Your
            Spark application that builds the{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              daily_active_users
            </code>{" "}
            table emits row counts and validates constraints. This aligns with
            how engineers build and debug code. When the job fails, you know
            exactly which code to investigate. Data product centric monitoring
            defines expectations at the table level, independent of
            implementation. The{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              daily_active_users
            </code>{" "}
            table must have: row count within 10 percent of 30 day average, zero
            nulls in{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              user_id
            </code>
            , and freshness under 6 hours. If you refactor the pipeline from
            Spark to Flink, or switch from batch to streaming, the checks remain
            valid.
            <div style="padding: 14px 16px; border-left: 4px solid; border-radius: 0 6px 6px 0; margin: 12px 0; font-style: italic">
              <div style="font-size: 14px; line-height: 1.5">
                "Choose pipeline centric monitoring for operational health
                during development. Evolve to data product centric for stable,
                business critical tables consumed by many teams."
              </div>
            </div>
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Aggressive vs Sustainable Alerting:
            </div>
            Aggressive alerts minimize detection time but cause fatigue. If you
            alert on every job retry (even successful ones after retry), every
            small latency spike, and every 5 percent row count change, on call
            engineers will mute channels within weeks. Alert precision drops,
            and real incidents get missed in the noise. Sustainable alerting
            uses multi level warnings. When latency approaches 80 percent of
            SLO, post a non urgent message to a monitoring channel. When it
            exceeds 100 percent for 10 consecutive minutes, page on call. This
            gives teams early visibility without constant interruptions. The
            trade off is slightly longer Mean Time To Detect (MTTD): maybe 15
            minutes instead of 5. But if it prevents alert fatigue and keeps
            engineers responsive, the net reliability improves.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              When to Invest Heavily:
            </div>
            For tier 1 data products feeding user facing features
            (recommendations, search ranking, fraud detection), invest in
            comprehensive monitoring: anomaly detection, multi stage validation,
            sub 5 minute detection targets, and 24/7 on call. For tier 3
            experimental pipelines, basic job success/failure alerts with ticket
            based routing during business hours are sufficient. The cost of
            sophisticated monitoring must match the business impact of data
            issues.
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Static thresholds for operational metrics: job success rate,
                  latency SLOs are deterministic and easy to debug at 3 AM
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Anomaly detection for business metrics: catches gradual drift
                  like 2 percent daily decline over two weeks, but requires
                  tuning false positive rates starting at 3 sigma
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Pipeline centric monitoring aligns with development: engineers
                  debug specific jobs. Data product centric monitoring survives
                  refactoring: table level checks remain valid when switching
                  from Spark to Flink
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Multi level alerting prevents fatigue: warning at 80 percent
                  of SLO in Slack, page only when exceeding 100 percent for 10
                  minutes. Trade 10 minute slower detection for sustainable on
                  call experience
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
                  Static threshold: 'daily_orders_pipeline must complete by
                  06:00 UTC' is clear and debuggable. Engineers know exactly
                  what violated.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Anomaly detection: revenue_by_product averages 50M rows on
                  Tuesdays based on 8 week history. Today has 42M rows (16% drop
                  with 3.2 sigma deviation). Alert fires even without predefined
                  threshold.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Multi level alerting: streaming_latency at 48s posts warning
                  'Approaching SLO'. At 65s for 10 minutes, pages on call.
                  Prevents paging on transient 70s spike that recovers in 3
                  minutes.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonPipelineMonitoringAlertingMonitoringTradeOffsWhenToChooseWhat;
