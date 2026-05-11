import type { Component } from "solid-js";

const LessonColdStartProblemProductionImplementationLatencyBudgetsAndNearlineRefreshCadences: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Production Implementation: Latency Budgets and Nearline Refresh
            Cadences
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
                Implementing cold start handling in production requires
                balancing latency constraints with signal freshness. User
                profiles must update quickly, item features must be available
                immediately, and fallback paths must be fast.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Latency Budget Allocation
            </p>
            <p style="margin-top: 0">
              Total recommendation latency budget: 100-200ms. Cold start adds
              complexity. User lookup to check if cold: 5ms. Feature fetch for
              content-based: 10ms. Popularity fallback: 5ms. Leave room for
              primary model. If user is cold, you might skip the collaborative
              retrieval entirely and go straight to content-based or popularity.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Profile Refresh Cadence
            </p>
            <p style="margin-top: 0">
              How quickly does a new interaction update the user profile?
              Real-time (sub-second) is ideal but expensive. Near-real-time
              (minutes) is practical for most systems. Batch (hourly) is
              cheapest but delays warm-up. For new users, prioritize fast
              refresh: even 1-minute delay means first few pageviews get stale
              recommendations.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Item Availability Pipeline
            </p>
            <p style="margin-top: 0">
              When a new item is added to catalog, how fast is it available for
              recommendation? Feature extraction (text embedding, image
              encoding) might take seconds. Index update might take minutes.
              Build separate fast-path for new items: content-based
              recommendations can use raw features without waiting for full
              pipeline completion.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>✅ Best Practice:</strong> Define cold-to-warm transition
              thresholds explicitly. Example: user is cold if interactions &lt;
              5, warm if interactions &gt;= 20, transitional in between. For
              transitional users, blend cold-start and personalized signals with
              linear interpolation based on interaction count.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 540px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="text-align: center; font-weight: bold; font-size: 14px; margin-bottom: 6px">
                  Latency Budget Breakdown (p95)
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 12px">Retrieval: 20–50ms</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    ANN index lookup over precomputed embeddings
                    <br />
                    Returns 200–1,000 candidates
                  </div>
                </div>
                <div style="text-align: center; font-size: 16px; font-weight: bold">
                  +
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 12px">Re-ranking: 20–100ms</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Blend signals (collab, content, context, boost)
                    <br />
                    Lightweight ML model scoring
                  </div>
                </div>
                <div style="text-align: center; font-size: 16px; font-weight: bold">
                  =
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 12px">Total: 100–200ms p95</strong>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px; margin-top: 8px">
                  <strong style="font-size: 12px">Refresh Cadences</strong>
                  <div style="font-size: 11px; margin-top: 4px; line-height: 1.5">
                    <strong>Offline (daily):</strong> Embeddings, similarity
                    graphs
                    <br />
                    <strong>Nearline (1–15 min):</strong> Popularity, trends
                    <br />
                    <strong>Cache TTL (5–30 min):</strong> Per user candidates
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
                  End to end recommendation latency targets are 100 to 200ms p95
                  for interactive surfaces, with retrieval consuming 20 to 50ms
                  via ANN indexes and re-ranking taking 20 to 100ms for signal
                  blending
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Approximate nearest neighbor search over precomputed
                  embeddings trades off 2 to 5% recall for sub 50ms latency at
                  10 million plus item scale using libraries like FAISS or ScaNN
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Hybrid refresh cadences balance freshness and cost: content
                  embeddings and similarity graphs daily offline, popularity and
                  trends nearline every 1 to 15 minutes, per user caches with 5
                  to 30 minute TTL
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Robust fallback logic is mandatory: if personalization fails
                  due to cache miss or service degradation, serve popularity and
                  context conditioned defaults instantly to maintain user
                  experience
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Measurement uses interleaving and counterfactual logging for
                  causal impact isolation, tracking exposure normalized CTR,
                  catalog coverage percentage, calibration (predicted vs
                  actual), and latency p95/p99
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
                  For system design: draw the tiered architecture - nearline
                  embedding updates (10-30 min freshness), streaming popularity
                  counters (sub-minute), online context blending (&lt;10ms).
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  When asked about metrics: mention tracking cold start rate (%
                  sessions with &lt;5 signals), cold-to-warm transition time,
                  and segment-specific engagement comparing cold vs warm users.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  For capacity planning: explain that cold start handling adds
                  complexity - content embeddings need real-time computation,
                  exploration budget needs tracking, fallback paths need
                  monitoring.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonColdStartProblemProductionImplementationLatencyBudgetsAndNearlineRefreshCadences;
