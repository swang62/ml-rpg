import type { Component } from "solid-js";

const LessonDataProfilingWhatIsDataProfiling: Component = () => (
  <div class="lesson-content">
    <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
      <div class="mb-4 p-4">
        <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
          What is Data Profiling?
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
              <strong>Data Profiling</strong> is the systematic analysis of
              datasets to understand their structure, content quality, and
              relationships by computing concrete statistics and metadata about
              each table and column.
            </div>
          </div>
          <strong>The Problem It Solves:</strong>
          Modern systems generate massive amounts of data, but that data is
          often incomplete, inconsistent, or misunderstood. Building analytics
          dashboards, Machine Learning (ML) models, or user facing features on
          top of poor quality data leads to wrong metrics, biased models, and
          production incidents. Before you can trust your data, you need to
          answer: What is the actual shape and quality of this data,
          quantitatively?
          <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
            Three Core Analysis Types:
          </div>
          First, <strong>Structure Analysis</strong> verifies that schemas and
          formats match expectations. For example, checking that a{" "}
          <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
            created_at
          </code>{" "}
          column always contains timestamps within a valid range, not strings or
          nulls. Second, <strong>Content Analysis</strong> examines actual
          values: frequency distributions, outliers, missing data, and
          uniqueness. For instance, a{" "}
          <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
            country_code
          </code>{" "}
          column should contain roughly 250 valid values, with null rates below
          0.1 percent. Third, <strong>Relationship Analysis</strong> looks
          across columns and tables: checking primary and foreign key integrity,
          functional dependencies, and cross table consistency. Every{" "}
          <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
            user_id
          </code>{" "}
          in an orders table should exist in the users table.
          <strong>Why Statistics Matter:</strong>
          Profiling becomes actionable when you attach concrete numbers to
          quality dimensions: completeness (percent non null), validity (percent
          matching patterns), consistency (cross field agreement), uniqueness
          (distinct count ratios), and timeliness (data freshness). Tracking
          these metrics as time series enables Service Level Objectives (SLOs)
          for data quality, just like you have SLOs for application latency or
          error rates.
        </div>
        <div class="Learn_keyTakeaways p-4 mb-4">
          <div class="Learn_keyTakeawaysHeader mb-3 pb-3">💡 Key Takeaways</div>
          <div class="d-flex flex-column gap-2">
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Data profiling produces metadata and statistics about datasets:
                distinct counts, null percentages, min and max values,
                distributions, and relationship integrity checks
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Three analysis types: structure (schema and format validation),
                content (value distributions and quality), and relationships
                (keys and cross table consistency)
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Profiling attaches quantitative metrics to quality dimensions:
                completeness, validity, consistency, uniqueness, and timeliness
                tracked over time
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Results enable data quality SLOs and prevent building analytics
                or ML models on unreliable data
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
                A &lt;code&gt;country_code&lt;/code&gt; column profiled shows
                247 distinct values, 0.08% nulls, and top 3 values are US (42%),
                UK (18%), CA (12%)
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">2</span>
              <span class="flex-grow-1 Learn_cardContent">
                Relationship check discovers that 0.3% of
                &lt;code&gt;order_id&lt;/code&gt; values in the shipments table
                have no matching record in the orders table, indicating a data
                integrity bug
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default LessonDataProfilingWhatIsDataProfiling;
