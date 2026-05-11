import type { Component } from "solid-js";

const LessonRecsysEvaluationCandidateRetrievalVsFinalRankingMetrics: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Candidate Retrieval vs Final Ranking Metrics
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="padding: 14px 16px; border: 2px solid; border-left: 4px solid; border-radius: 6px; margin: 0">
              <div style="font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px">
                Core Concept
              </div>
              <div style="font-size: 15px; line-height: 1.5">
                <strong>A/B testing</strong> is the gold standard for
                recommendation evaluation. Split traffic, show different models
                to different user groups, measure business outcomes. But
                recommendation A/B tests have unique challenges that make them
                harder than typical feature tests.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Network Effects
            </p>
            <p style="margin-top: 0">
              Recommendations create spillover effects. If group A sees trending
              items, those items get more engagement, which makes them trend
              more, affecting what group B sees. User-level randomization may
              not isolate treatment effects. Consider time-based splitting or
              geo-based splitting for cleaner measurement.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Long-term vs Short-term Metrics
            </p>
            <p style="margin-top: 0">
              Click-through rate responds fast (days). Retention responds slowly
              (weeks). Revenue effects may take months. A model that maximizes
              clicks with clickbait might hurt retention. Run experiments long
              enough to capture delayed effects. For major model changes,
              consider 4-8 week experiments with retention as primary metric.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Sample Size Challenges
            </p>
            <p style="margin-top: 0">
              Recommendation effects are often small (1-3% improvement).
              Detecting 1% lift with 95% confidence requires millions of
              impressions. Power your experiments properly. Use metrics with
              lower variance (clicks) for initial validation, then confirm with
              higher-variance metrics (revenue, retention).
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>❗ Interview Deep-Dive:</strong> "How do you A/B test
              recommendations?" is a common follow-up. Cover: (1) network
              effects and why user-level randomization may not work, (2)
              long-term metrics versus short-term proxies, (3) sample size
              requirements for detecting small effects. This demonstrates
              production experience beyond model building.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="text-align: center; margin-bottom: 14px">
                <strong style="font-size: 15px">
                  Two Stage Recommendation Pipeline
                </strong>
              </div>
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong>1. Retrieval (Candidate Generation)</strong>
                  <div style="margin-top: 6px; font-size: 13px">
                    Input: User context, millions of items
                  </div>
                  <div style="font-size: 13px">
                    Output: 200 to 1000 candidates
                  </div>
                  <div style="font-size: 13px; margin-top: 4px">
                    <strong>Metric: Recall@500 = 0.88</strong>
                  </div>
                  <div style="font-size: 13px">
                    Latency: 5 to 30 ms (ANN search)
                  </div>
                </div>
                <div style="text-align: center; font-size: 22px; font-weight: bold">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong>2. Ranking (Scoring &amp; Ordering)</strong>
                  <div style="margin-top: 6px; font-size: 13px">
                    Input: 500 candidates from retrieval
                  </div>
                  <div style="font-size: 13px">
                    Output: Top 10 to 20 ranked items
                  </div>
                  <div style="font-size: 13px; margin-top: 4px">
                    <strong>Metrics: Precision@10 = 0.28</strong>
                  </div>
                  <div style="font-size: 13px">
                    <strong>NDCG@10 = 0.42</strong>
                  </div>
                  <div style="font-size: 13px">
                    Latency: 20 to 100 ms (neural network)
                  </div>
                </div>
                <div style="text-align: center; font-size: 22px; font-weight: bold">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px; text-align: center">
                  <strong>User Interface</strong>
                  <div style="margin-top: 4px; font-size: 13px">
                    Shows top 10 items
                  </div>
                  <div style="font-size: 13px">End to end p99: &lt;150 ms</div>
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
                  Retrieval stage: optimize Recall@K at candidate size (K equals
                  200 to 1000), target 80% to 95% recall, latency 5 to 30
                  milliseconds via Approximate Nearest Neighbor (ANN) search
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Ranking stage: optimize Precision@K and NDCG@K at UI size (K
                  equals 5 to 20), latency 20 to 100 milliseconds, uses heavier
                  models (neural networks, gradient boosting)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Recall versus latency tradeoff: 1000 candidates gives 92%
                  recall in 30 ms, 500 candidates gives 85% recall in 10 ms,
                  choose based on end to end p99 budget (typically under 150 to
                  250 ms)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Failure mode: ranking metrics look good but retrieval recall
                  dropped from 90% to 70%, ranker cannot recover missing good
                  items, always monitor both stages
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  End to end latency: track p50, p95, p99 separately for
                  retrieval and ranking, p99 spike in ranking can time out
                  requests and hurt online CTR despite strong offline NDCG
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Production pattern: multiple retrieval strategies
                  (collaborative filtering, content based, trending) merged,
                  then single ranker, each retrieval path tracked for Recall@K
                  contribution
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
                  For system design: describe the metrics pipeline - retrieval
                  recall@K (ANN quality), ranking NDCG (model quality), coverage
                  (ecosystem health), and business metrics (CTR, conversion).
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  When asked about monitoring: mention daily offline evaluation
                  on 500M+ sessions, stratified by user segments and content
                  types, with automated regression detection.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  For interview depth: explain the latency-recall trade-off -
                  faster retrieval (fewer candidates) hurts Recall@K; establish
                  SLOs balancing latency (p99&lt;50ms) and recall (&gt;90%).
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonRecsysEvaluationCandidateRetrievalVsFinalRankingMetrics;
