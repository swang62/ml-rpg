import type { Component } from "solid-js";

const LessonPipelineMonitoringAlertingProductionScaleMonitoringChallenges: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Production Scale Monitoring Challenges
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              The Scale Problem:
            </div>
            At production scale, monitoring thousands of pipelines creates
            challenges that don't exist in smaller systems. Consider a platform
            running 5,000 daily batch jobs and 200 streaming applications. If
            you naively create one alert per job with basic threshold checks,
            you'd have 5,200+ alert rules to maintain. When an upstream data
            source fails, 300 downstream jobs cascade fail, triggering 300
            individual pages at 4 AM.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Alert Aggregation and Context:
            </div>
            Robust systems aggregate related failures into single incidents.
            When a critical upstream partition is missing, the monitoring system
            identifies all dependent jobs and creates one incident: "Missing
            partition users_snapshot date=2024-01-15 affecting 87 downstream
            jobs." The alert includes lineage information showing which final
            tables are impacted, estimated business impact, and a link to the
            runbook for handling missing partitions. Routing becomes critical at
            scale. Every pipeline and table has metadata tags:{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              owner_team
            </code>
            ,{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              service_name
            </code>
            ,{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              tier
            </code>{" "}
            (1 for user facing, 2 for internal analytics, 3 for experimental). A
            central alert manager uses these tags to route notifications
            appropriately. Tier 1 data outages page via PagerDuty. Tier 2 delays
            post to team Slack channels. Tier 3 issues create Jira tickets
            reviewed during business hours.
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>⚠️ Common Pitfall:</strong> Monitoring system failures
              create blind spots. If your metrics pipeline is backlogged by 20
              minutes, you might see "no alerts" and assume everything is
              healthy when both the data pipeline and monitoring are broken.
              Implement heartbeat signals: if a critical job hasn't emitted any
              health metric in 30 minutes, trigger a "monitoring silence" alert.
            </div>
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Cardinality Explosion:
            </div>
            At high scale, metric cardinality becomes a failure mode. If you tag
            every metric with{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              user_id
            </code>{" "}
            or{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              partition_id
            </code>
            , you might generate 10 million unique time series. Your monitoring
            backend either rejects the data (hitting cardinality limits) or
            becomes so slow that queries timeout during incidents. The system
            "works" but is operationally useless. The solution is careful tag
            design. Use high cardinality dimensions only in logs (which are
            sampled and queried infrequently). Keep metrics tags to low
            cardinality values: pipeline name, environment (prod, staging),
            region, and status. This keeps total time series under 100,000,
            making queries instant even during incidents.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Real World Numbers:
            </div>
            Companies operating at scale report specific patterns. Datadog has
            published that effective monitoring systems maintain alert precision
            (actionable alerts / total alerts) above 70 percent to avoid
            fatigue. Netflix monitors hundreds of data pipelines with SLOs
            requiring 99.9 percent success rates, meaning they can tolerate at
            most 8 hours of downtime per year per pipeline. Meta's data
            observability platform profiles thousands of tables continuously,
            detecting anomalies in row counts, schema changes, and freshness
            with 5 to 10 minute detection latency.
            <div style="margin: 8px 0; display: flex; flex-direction: column; align-items: center">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
                Alert Quality Targets
              </div>
              <div style="display: inline-flex; gap: 12px; flex-wrap: wrap; justify-content: center">
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">70%+</div>
                  <div style="font-size: 10px; font-weight: 600">PRECISION</div>
                </div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">5-10min</div>
                  <div style="font-size: 10px; font-weight: 600">DETECTION</div>
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
                  Alert aggregation prevents cascading pages: one missing
                  upstream partition might affect 87 downstream jobs but
                  generates one incident, not 87 pages
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Tiered alerting by business impact: Tier 1 user facing data
                  pages on call, Tier 2 internal analytics posts to Slack, Tier
                  3 experimental creates tickets
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Cardinality explosion breaks monitoring: tagging metrics with
                  high cardinality fields like user_id creates millions of time
                  series, causing ingestion failures or query timeouts
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Alert precision above 70 percent required: ratio of actionable
                  alerts to total alerts must stay high to prevent on call
                  fatigue and alert blindness
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
                  Aggregated alert: 'Missing partition users_snapshot
                  date=2024-01-15 affecting 87 downstream jobs. Estimated
                  impact: 12 tier-1 tables, 45 tier-2 dashboards. Runbook:
                  /wiki/missing-partitions'
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Cardinality limit: With 5,000 pipelines × 3 environments × 5
                  status codes × 4 regions = 300k time series. Adding
                  partition_id (10k values) would explode to 3 billion time
                  series
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Heartbeat monitoring: Critical streaming job should emit
                  health metric every 2 minutes. If no metric received in 30
                  minutes, alert 'Monitoring silence detected for
                  user_events_processor'
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonPipelineMonitoringAlertingProductionScaleMonitoringChallenges;
