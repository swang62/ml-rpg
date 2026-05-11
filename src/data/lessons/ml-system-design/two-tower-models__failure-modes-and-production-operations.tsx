import type { Component } from "solid-js";

const LessonTwoTowerModelsFailureModesAndProductionOperations: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Failure Modes and Production Operations
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
                Two-tower systems can fail silently: they return results that
                look reasonable but are stale, biased, or irrelevant. Without
                monitoring, you might run for weeks with degraded embeddings
                before business metrics catch the problem.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Embedding Staleness
            </p>
            <p style="margin-top: 0">
              User behavior changes faster than models retrain. A user who
              purchased running shoes yesterday still gets running shoe
              recommendations today, even if they switched to searching for
              formal shoes. The user tower uses outdated behavioral features.
            </p>
            <p>
              The fix: incorporate real-time session features that update
              instantly, not just historical aggregates. Use the last 10-20
              actions within the current session as input features. These
              reflect immediate intent, even if the model weights are a day old.
              Typical refresh: user embeddings recompute every request
              (sub-second freshness for session features), item embeddings
              rebuild hourly or daily.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Index-Model Mismatch
            </p>
            <p style="margin-top: 0">
              When you deploy a new model, the item index still contains
              embeddings from the old model. User embeddings from the new model
              and item embeddings from the old model live in different vector
              spaces. Dot products become meaningless. Retrieval recall drops to
              near-random.
            </p>
            <p>
              The fix: coordinate model and index deployments. Before switching
              to a new model, rebuild the entire item index with new embeddings.
              Use blue-green deployment: serve traffic from the old index while
              building the new one, then switch atomically. Never mix embeddings
              from different model versions in the same serving path. Track
              embedding version as metadata; alert if versions mismatch.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Cold Start Degradation
            </p>
            <p style="margin-top: 0">
              New users get generic embeddings because the user tower has no
              historical features to work with. If 30% of traffic is new users,
              30% of recommendations are essentially random. Worse: if new users
              do not engage, they never generate the data needed to improve
              their embeddings. This creates a retention cliff for new users.
            </p>
            <p>
              The fix: design specific cold-start paths. Use content-based
              recommendations for new users until you have 5-10 interactions.
              Surface popular or trending items that have high base rates. Track
              cold-start users separately in metrics; compare their engagement
              to warm users. Set targets: cold-start click rate should be at
              least 60% of warm-user click rate within the first session.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>❗ Interview Deep-Dive:</strong> "How do you prevent
              popularity collapse?" is a favorite follow-up question. Walk
              through: (1) Track coverage metrics - what % of catalog appears in
              recommendations weekly, (2) Reserve 10-20% of slots for
              exploration (random or epsilon-greedy), (3) Use
              popularity-weighted negative sampling in training so popular items
              are harder negatives. Show you understand the feedback loop:
              biased recommendations lead to biased engagement, which produces
              more biased training data.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 540px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">OFFLINE PIPELINE</strong>
                  <div style="font-size: 11px; margin-top: 6px">
                    1. Training data: logs → positive pairs + temporal cutoff
                  </div>
                  <div style="font-size: 11px; margin-top: 3px">
                    2. GPU training: 12–48 hrs on billions of examples
                  </div>
                  <div style="font-size: 11px; margin-top: 3px">
                    3. Batch inference: item tower → all item embeddings
                  </div>
                  <div style="font-size: 11px; margin-top: 3px">
                    4. Index build: FAISS/ScaNN sharded by locale/category
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">ONLINE SERVING</strong>
                  <div style="font-size: 11px; margin-top: 6px">
                    Request → User tower (1–10 ms) → User embedding
                  </div>
                  <div style="font-size: 11px; margin-top: 3px">
                    → Prefilter (eligibility) → ANN search (5–15 ms)
                  </div>
                  <div style="font-size: 11px; margin-top: 3px">
                    → Merge shards → Top 200–1000 candidates → Ranker
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">MONITORING</strong>
                  <div style="font-size: 11px; margin-top: 6px">
                    Quality: Recall@K, embedding drift, coverage
                  </div>
                  <div style="font-size: 11px; margin-top: 3px">
                    Latency: p50/p95/p99 for user tower + ANN search
                  </div>
                  <div style="font-size: 11px; margin-top: 3px">
                    ANN recall: Shadow brute force on sample queries
                  </div>
                  <div style="font-size: 11px; margin-top: 3px">
                    Canary: 1–5% traffic, auto rollback on regressions
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
                  User cold start: new users get generic embedding,
                  first-session CTR 30-50% lower. Fix: collect 3-5 interest
                  signals during onboarding, or adapt embedding from first few
                  in-session clicks
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Item cold start: new items have embeddings from content only,
                  not behavior. Fix: use text embeddings from title/description
                  trained on large text data - captures meaning without clicks
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Feedback loop: recommended items get clicks → become training
                  data → get recommended more. Items never shown never get
                  clicks, never surface. Coverage can drop below 10%
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Loop detection: track catalog coverage (fraction of items
                  getting any impressions) and impression Gini coefficient
                  (concentration). Coverage &lt;30% or high Gini = loop taking
                  over
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Loop fix: reserve 5-10% of slots for exploration. Show
                  uncertain or under-exposed items. Lower immediate CTR but
                  prevents model from getting stuck on small item set
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Why loops hurt: great new items never surface, user
                  preferences learned from biased sample of what was shown, not
                  true preferences. Model becomes confidently wrong
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
                  For system design interviews: draw the full pipeline - daily
                  batch training on billions of examples, embedding computation
                  for all items, index building with validation, then
                  replication to serving shards.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  When discussing latency budgets: break down the p95 target -
                  ANN lookup (3-10ms) + user embedding computation (1-5ms) +
                  network overhead (2-5ms) = 10-20ms total retrieval time.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  For monitoring discussion: mention the key metrics - embedding
                  freshness (staleness alert if &gt;24h), ANN recall (target
                  90%+), retrieval latency p99, and empty result rate.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonTwoTowerModelsFailureModesAndProductionOperations;
