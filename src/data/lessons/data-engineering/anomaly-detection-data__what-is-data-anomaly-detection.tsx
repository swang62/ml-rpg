import type { Component } from "solid-js";

const LessonAnomalyDetectionDataWhatIsDataAnomalyDetection: Component = () => (
  <div class="lesson-content">
    <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
      <div class="mb-4 p-4">
        <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
          What is Data Anomaly Detection?
        </h1>
        <div
          class="card-content-area"
          style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
        >
          <div style="padding: 14px 16px; border: 2px solid; border-left: 4px solid; border-radius: 6px; margin: 0">
            <div style="font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px">
              Definition
            </div>
            <div style="font-size: 15px; line-height: 1.5">
              <strong>Data Anomaly Detection</strong> identifies unexpected
              patterns or deviations in data quality, volume, distribution, or
              business metrics that indicate potential pipeline failures, bugs,
              or data corruption.
            </div>
          </div>
          <strong>The Core Problem:</strong> Infrastructure monitoring tells you
          if servers are up and queries are running, but it cannot tell you if
          your data is wrong. Your database might be healthy, all jobs complete
          successfully, but a bug silently drops 30% of records or fills a
          critical column with nulls. Meanwhile, downstream dashboards show
          misleading numbers and machine learning models degrade without anyone
          noticing for hours or days. This is especially dangerous because bad
          data often looks normal at first glance. A recommender system fed
          corrupted events might show green infrastructure metrics while serving
          poor recommendations to millions of users. An analytics dashboard
          might report revenue figures that are technically computed correctly
          but based on incomplete input data.
          <strong>What Gets Monitored:</strong> Data anomaly detection focuses
          on the data itself rather than the infrastructure. Common metrics
          include row counts per batch (did today's hourly job write 5 million
          rows as expected, or only 3 million?), null ratios in key columns (is{" "}
          <code>user_id</code> suddenly 15% null instead of the usual 0.1%?),
          distinct value counts (did the number of unique stores drop from 5,000
          to 500?), distribution statistics like mean or 95th percentile values,
          schema changes (did a required field disappear?), and business metrics
          such as daily active users or order conversion rates.
          <strong>Why Traditional Monitoring Fails:</strong> System metrics like
          CPU, memory, and query execution time cannot catch data quality
          issues. A pipeline can run perfectly from an infrastructure
          perspective while producing garbage output. You need separate
          detection focused on data characteristics, which is why companies
          build dedicated anomaly detection layers that profile datasets and
          flag unexpected behavior before corrupt data propagates to critical
          systems.
        </div>
        <div
          class="card-diagram"
          style="margin-bottom: 24px; display: flex; justify-content: center"
        >
          <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
            <div style="display: flex; flex-direction: column; gap: 12px; align-items: center">
              <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 140px; text-align: center">
                <strong style="font-size: 14px">Event Stream</strong>
                <div style="font-size: 11px; margin-top: 4px">
                  100k events/sec
                </div>
              </div>
              <div style="font-size: 24px; font-weight: bold">↓</div>
              <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 140px; text-align: center">
                <strong style="font-size: 14px">ETL Pipeline</strong>
                <div style="font-size: 11px; margin-top: 4px">
                  Infra: ✓ Healthy
                </div>
                <div style="font-size: 11px; margin-top: 2px; font-weight: 600">
                  Data: ✗ 30% missing
                </div>
              </div>
              <div style="font-size: 24px; font-weight: bold">↓</div>
              <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 140px; text-align: center">
                <strong style="font-size: 14px">Warehouse Table</strong>
                <div style="font-size: 11px; margin-top: 4px">
                  Expected: 5M rows
                </div>
                <div style="font-size: 11px; margin-top: 2px; font-weight: 600">
                  Actual: 3.5M rows
                </div>
              </div>
              <div style="font-size: 24px; font-weight: bold">⚠</div>
              <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 140px; text-align: center">
                <strong style="font-size: 14px">Anomaly Detector</strong>
                <div style="font-size: 11px; margin-top: 4px">
                  Alert in 5 min
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="Learn_keyTakeaways p-4 mb-4">
          <div class="Learn_keyTakeawaysHeader mb-3 pb-3">💡 Key Takeaways</div>
          <div class="d-flex flex-column gap-2">
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Infrastructure monitoring shows system health (CPU, memory,
                query success) but cannot detect data quality problems like
                missing records, corrupt values, or distribution shifts
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Typical monitored metrics include row counts, null ratios,
                distinct value counts, distribution percentiles, schema changes,
                and business aggregates like revenue or active users
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Anomalies can be point based (single spike), contextual (unusual
                for this time or region), or collective (abnormal sequence like
                growing lag)
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Detection must happen before bad data propagates to dashboards,
                machine learning models, or downstream systems where it causes
                real business impact
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
                A bug excludes one country from an aggregation job.
                Infrastructure looks healthy with all jobs completing
                successfully, but row count drops from 5.5M to 3.5M. Anomaly
                detection flags this within 5 minutes and halts dependent jobs.
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">2</span>
              <span class="flex-grow-1 Learn_cardContent">
                An upstream service stops sending
                &lt;code&gt;user_id&lt;/code&gt; for mobile events. The null
                ratio in &lt;code&gt;user_id&lt;/code&gt; jumps from 0.1% to
                15%, breaking user attribution. Detection catches this before
                the corrupted batch reaches the ML feature store.
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">3</span>
              <span class="flex-grow-1 Learn_cardContent">
                A schema change removes a required field. Infrastructure metrics
                show normal throughput, but downstream models fail because they
                expect that field. Schema validation detects the missing field
                immediately.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default LessonAnomalyDetectionDataWhatIsDataAnomalyDetection;
