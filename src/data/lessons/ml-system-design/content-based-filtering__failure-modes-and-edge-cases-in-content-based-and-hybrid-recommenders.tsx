import type { Component } from "solid-js";

const LessonContentBasedFilteringFailureModesAndEdgeCasesInContentBasedAndHybridRecommenders: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Failure Modes and Edge Cases in Content Based and Hybrid
            Recommenders
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
                Content-based and hybrid systems have distinct failure modes.
                Understanding these helps you design monitoring and fallback
                strategies before problems impact users.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Feature Drift
            </p>
            <p style="margin-top: 0">
              Content features change meaning over time. A "trending" category
              meant something different in 2019 than 2024. Movie genres shift.
              User language evolves. If your content embeddings were trained on
              old data, they misrepresent current items.
            </p>
            <p>
              Symptoms: click-through rates drop on content-based
              recommendations while collaborative stays stable. New items with
              fresh features get low similarity scores to older user profiles.
              Fix: retrain content encoders on recent data, use temporal
              features to detect drift, A/B test new encoders before full
              rollout.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Filter Bubbles
            </p>
            <p style="margin-top: 0">
              Pure content-based creates echo chambers. User likes action
              movies, gets recommended only action movies, interacts only with
              action movies, profile becomes more action-focused. No mechanism
              breaks the cycle.
            </p>
            <p>
              Detect by tracking recommendation diversity: how many unique
              genres or categories appear per user per week. If diversity drops
              below threshold, inject exploration. Reserve 10-20% of
              recommendation slots for items outside the predicted preference
              zone.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Signal Conflict
            </p>
            <p style="margin-top: 0">
              In hybrid systems, content and collaborative signals can disagree.
              Collaborative says user will like item X. Content says X is
              dissimilar to user profile. Which wins? If your combination
              weights are static, neither gets proper credit.
            </p>
            <p>
              Fix: learn combination weights per context. New users get higher
              content weight. Power users get higher collaborative weight. New
              items get higher content weight. Train a meta-model that predicts
              optimal weights.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>❗ Interview Deep-Dive:</strong> "How do you prevent
              filter bubbles?" is a common follow-up. Structure your answer: (1)
              explain the feedback loop problem, (2) propose metrics to detect
              it (recommendation diversity, category coverage), (3) describe
              solutions like exploration budgets and diversity constraints.
              Quantify: "reserve 10-20% of slots for exploration." This
              demonstrates you think about long-term system health, not just
              immediate metrics.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="text-align: center; margin-bottom: 12px">
                <strong style="font-size: 15px">Common Failure Modes</strong>
              </div>
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 10px 12px; border-radius: 6px">
                  <strong style="font-size: 13px">Training Serving Skew</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Batch features in training, real time in serving → 20%
                    accuracy drop
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px 12px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Near Duplicate Collapse
                  </strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    ANN hubs produce identical items in top results →
                    diversification needed
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px 12px; border-radius: 6px">
                  <strong style="font-size: 13px">Stale Index Drift</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Embeddings evolve, old index mismatches → recall degradation
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px 12px; border-radius: 6px">
                  <strong style="font-size: 13px">ANN Recall Cliff</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    High QPS or GC pauses → tail latency spikes, poor candidates
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
                  Training serving skew causes 20 percent or more accuracy drops
                  when models train on batch features but serve with real time
                  features, requiring feature store consistency and validation
                  pipelines
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Near duplicate collapse from ANN hubs fills top results with
                  identical items, mitigated by deduplication and maximal
                  marginal relevance diversification in re ranking stage
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Popularity bias amplification creates feedback loops where
                  blended models drift toward popular items and content
                  similarity reinforces dominant themes, requiring calibrated re
                  ranking with coverage constraints
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Stale indices and embedding drift break score calibration
                  between models in hybrids as embeddings evolve, requiring
                  canary index builds and shadow traffic validation before
                  rollout with automatic rollback on regression
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  ANN recall cliffs under load from high QPS or garbage
                  collection pauses spike tail latencies and degrade candidate
                  quality, requiring 2 to 3 times headroom and multi level
                  caching strategies
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
                  When asked about common failures: explain feature quality
                  issues - garbage text metadata produces garbage embeddings;
                  validation against human judgment is essential.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  For gaming concerns: mention keyword stuffing and misleading
                  thumbnails that fool content models; multi-signal fusion and
                  fraud detection layers help mitigate.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  When discussing staleness: explain that content embeddings can
                  drift as models update (new encoder versions) while
                  collaborative signals stay relative; coordinate updates
                  carefully.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonContentBasedFilteringFailureModesAndEdgeCasesInContentBasedAndHybridRecommenders;
