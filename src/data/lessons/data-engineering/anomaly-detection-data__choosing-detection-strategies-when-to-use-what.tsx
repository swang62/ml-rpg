import type { Component } from "solid-js";

const LessonAnomalyDetectionDataChoosingDetectionStrategiesWhenToUseWhat: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Choosing Detection Strategies: When to Use What
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <strong>The Core Decision:</strong> Selecting between rule based and
            model based detection depends on your data characteristics, team
            capabilities, and tolerance for false positives versus false
            negatives.
            <div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 8px; margin: 12px 0; align-items: stretch">
              <div style="padding: 12px; border: 2px solid; border-radius: 6px">
                <div style="font-weight: 700; margin-bottom: 4px; font-size: 13px">
                  Rule Based
                </div>
                <div style="font-size: 12px">
                  Predictable, explainable, needs manual tuning
                </div>
              </div>
              <div style="display: flex; align-items: center; font-weight: 800; font-size: 18px">
                vs
              </div>
              <div style="padding: 12px; border: 2px solid; border-radius: 6px">
                <div style="font-weight: 700; margin-bottom: 4px; font-size: 13px">
                  Model Based
                </div>
                <div style="font-size: 12px">
                  Adaptive, complex, handles growth automatically
                </div>
              </div>
            </div>
            <strong>Use Rule Based When:</strong> Your data has stable, well
            understood bounds. For example, <code>user_id</code> null ratio
            should always be under 0.5% regardless of volume growth. A
            percentage value cannot exceed 100%. Geographic data should only
            contain known country codes. These constraints are business logic,
            not statistical patterns. Rules are also better when you need
            perfect explainability for compliance or when your team lacks ML
            expertise to maintain model based systems. Rule based systems work
            well for critical invariants where any violation is definitely
            wrong. A financial pipeline where transaction amounts must be
            positive, or an inventory system where stock levels cannot be
            negative. False positives are acceptable because every alert
            represents a real constraint violation.
            <strong>Use Model Based When:</strong> Your data has growth trends
            or seasonality. Daily active users growing 10% month over month will
            quickly outgrow static thresholds. Retail traffic that spikes 10x
            during holidays needs adaptive baselines. Model based detection
            shines when normal behavior changes over time but anomalies are
            still deviations from the trend. Models handle high dimensional
            metrics better. If you monitor 1,000 tables with 10 metrics each,
            maintaining 10,000 manual rules is operationally impossible. A model
            trained on historical patterns can cover all metrics with shared
            infrastructure.
            <div style="padding: 14px 16px; border-left: 4px solid; border-radius: 0 6px 6px 0; margin: 12px 0; font-style: italic">
              <div style="font-size: 14px; line-height: 1.5">
                "Choose rules when any violation is definitely wrong. Choose
                models when you need to detect deviations from evolving normal
                behavior."
              </div>
            </div>
            <strong>Hybrid Approach in Practice:</strong> Most mature systems
            combine both. Run rules for hard constraints (schema validation,
            null ratios on critical fields) alongside models for volume and
            distribution metrics (row counts, value ranges). Salesforce uses a
            rule engine for conditions needing clear explanations, plus an ML
            model service for complex patterns. They batch model requests and
            use horizontal scaling to handle load.
            <strong>The Streaming Decision:</strong> Choose streaming detection
            when you need operational response times (under 5 minutes) for high
            value use cases like fraud detection, SLA monitoring, or systems
            where bad data causes immediate user impact. The cost is 3x to 5x
            higher infrastructure spend and operational complexity. Choose batch
            detection when you can tolerate detection latency of one batch
            interval (typically 15 minutes to 1 hour). Most analytics pipelines
            fall here. A corrupt daily report detected in 1 hour is acceptable,
            and batch detection is simpler and cheaper.
            <strong>Cold Start and Growth:</strong> Model based systems need
            warmup. AWS Glue requires at least 3 runs, but 30 to 90 days of
            history for reliable detection. During cold start or after major
            changes, expect higher false positive rates. Plan to tune
            sensitivity thresholds based on your tolerance. Financial systems
            might accept 20% false positives to catch every real issue.
            Analytics teams might tune for 5% false positives to reduce alert
            fatigue.
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Rule based detection works for stable constraints (null ratios
                  under 0.5%, values within fixed ranges) and when perfect
                  explainability is required for compliance
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Model based detection handles growth trends (10% monthly
                  increase), seasonality (10x holiday traffic), and high
                  dimensional metrics (1,000s of tables) that make manual rules
                  impossible
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Hybrid systems combine rules for hard constraints with models
                  for volume and distribution patterns, as implemented by
                  companies like Salesforce
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Streaming detection costs 3x to 5x more but provides under 5
                  minute alerts for high value use cases like fraud or SLA
                  monitoring, while batch detection suits most analytics with 15
                  minute to 1 hour tolerance
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Model based systems need 30 to 90 days warmup and higher false
                  positive rates during cold start, requiring sensitivity tuning
                  based on team tolerance (5% for analytics, 20% for financial
                  systems)
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
                  Financial pipeline uses rules: transaction amounts must be
                  positive, account balances cannot go negative. Any violation
                  is definitely an error requiring immediate investigation.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Retail analytics uses models: daily sales grow 8% monthly and
                  spike 10x during Black Friday. Model learns these patterns
                  from 90 days history, avoiding false alarms during expected
                  peaks while catching real anomalies.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Hybrid system: Rules check that
                  &lt;code&gt;user_id&lt;/code&gt; is never more than 1% null
                  (hard constraint), while models detect unexpected 20% drop in
                  daily signups (trend deviation).
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">4</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Streaming fraud detection justifies 5x cost with under 2
                  minute alerts preventing account takeovers. Batch analytics
                  detection runs hourly, catching corrupt reports with 1 hour
                  latency at 1/5 the infrastructure cost.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonAnomalyDetectionDataChoosingDetectionStrategiesWhenToUseWhat;
