import type { Component } from "solid-js";

const LessonRealtimeEmbeddingUpdatesOperationalMetricsAndFailureDetection: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Operational Metrics and Failure Detection
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              FRESHNESS METRICS
            </p>
            <p>
              <strong>Time to searchability:</strong> How long from item
              creation until it appears in search results. For hot+main
              architecture, this is hot index ingestion time (typically seconds
              to minutes). Track p50, p95, p99. Alert if p99 exceeds SLO (e.g.,
              &gt;5 minutes for e-commerce).
            </p>
            <p>
              <strong>Index age:</strong> Age of the newest item in main index.
              Reflects how stale the main index is. If merge cycle is daily,
              main index age oscillates between 0-24 hours. Track to ensure
              merges complete on schedule.
            </p>
            <p>
              <strong>Hot index size:</strong> Number of vectors in hot index.
              Should stay within designed capacity. If hot index grows beyond
              threshold, it signals merge failures or capacity issues.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              QUALITY METRICS
            </p>
            <p>
              <strong>Recall@K:</strong> Weekly sampling of queries, comparing
              index results to brute-force exact search. Establishes baseline
              (e.g., 95% recall@100). Alert on 2%+ drop—indicates drift or index
              corruption.
            </p>
            <p>
              <strong>Latency distribution:</strong> p50, p95, p99 query
              latency. Sudden p99 spikes often indicate hot shard issues or
              resource contention. Gradual increases suggest index bloat or
              degraded structures.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              FAILURE DETECTION
            </p>
            <p>
              <strong>Merge failures:</strong> Monitor merge job completion.
              Failures leave hot index growing unbounded. Set alerts for merge
              duration exceeding 2x normal time or consecutive failures.
            </p>
            <p>
              <strong>Ingestion backlog:</strong> Queue depth for vectors
              waiting to enter hot index. Growing backlog indicates ingestion
              cannot keep up with arrival rate. Scale ingestion workers or
              reduce rate.
            </p>
            <p>
              <strong>Cross-index inconsistency:</strong> Periodically sample
              items, verify they appear in exactly one index (hot or main, not
              both, not neither). Inconsistencies indicate merge bugs or delete
              propagation issues.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>✅ Best Practice:</strong> Build a dashboard showing: time
              to searchability (freshness), recall@K trend (quality), hot index
              size (capacity), and merge job status. On-call should diagnose
              issues within 5 minutes using this dashboard.
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
                  Freshness metrics: time to searchability (p99 &lt; SLO), index
                  age, hot index size (capacity alert)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Quality metrics: recall@K sampled weekly (alert on 2%+ drop),
                  latency distribution (p50/p95/p99)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Failure detection: merge job status, ingestion backlog,
                  cross-index consistency sampling
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
                  Interview Tip: Describe a real-time index monitoring dashboard
                  with freshness, quality, and capacity metrics.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Explain how to detect merge failures—monitor
                  job completion and hot index size growth.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonRealtimeEmbeddingUpdatesOperationalMetricsAndFailureDetection;
