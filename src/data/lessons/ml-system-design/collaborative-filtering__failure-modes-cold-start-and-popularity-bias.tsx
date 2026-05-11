import type { Component } from "solid-js";

const LessonCollaborativeFilteringFailureModesColdStartAndPopularityBias: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Failure Modes: Cold Start and Popularity Bias
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
                Collaborative filtering has two fundamental failure modes: cold
                start (new users/items with no interactions) and popularity bias
                (head items dominate recommendations). Both stem from the same
                root cause: CF only learns from observed interactions.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Cold Start Problem
            </p>
            <p style="margin-top: 0">
              <strong>User cold start:</strong> New users have no interaction
              history. CF cannot place them in similarity space. Common
              mitigations: ask for explicit preferences during onboarding, use
              demographic features to bootstrap, or fall back to
              popularity-based recommendations until 5-10 interactions are
              collected.
            </p>
            <p>
              <strong>Item cold start:</strong> New items have no ratings. CF
              cannot learn their latent factors. Mitigations: use content
              features to initialize item vectors, boost exposure through random
              exploration, or use a separate model for new items until they
              collect enough interactions.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Popularity Bias
            </p>
            <p style="margin-top: 0">
              Popular items appear in more training examples, so the model
              learns them better. Better predictions lead to more
              recommendations, which lead to more interactions, which reinforce
              the bias. Long-tail items never get enough exposure to be learned
              properly. This creates a rich-get-richer feedback loop.
            </p>
            <p>
              Mitigations: popularity-weighted negative sampling during
              training, explicit diversity constraints in serving, and regular
              A/B tests comparing tail-item exposure across model versions.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Interview Deep-Dive:</strong> "How do you solve cold
              start?" is guaranteed to come up. Walk through the full picture:
              content-based fallback for new items, onboarding for new users,
              exploration budget to collect data, and hybrid models that combine
              CF with content features.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 540px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="text-align: center; font-weight: bold; margin-bottom: 8px">
                  Memory &amp; Cost Scaling at 100M Items
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong>Raw Embeddings:</strong>
                  <div style="font-size: 13px; margin-top: 6px">
                    150M entities × 64 dims × 4 bytes = 38.4 GB
                    <br />+ ANN index (2x) + biases + cache ={" "}
                    <strong>100-150 GB/replica</strong>
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong>Quantization Win:</strong>
                  <div style="font-size: 13px; margin-top: 6px">
                    float32 → int8: 4x smaller (38.4 GB → 9.6 GB)
                    <br />
                    Accuracy drop:{" "}
                    <strong>1-2% with careful calibration</strong>
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong>Throughput &amp; Cost:</strong>
                  <div style="font-size: 13px; margin-top: 6px">
                    10-20 replicas for 10K-20K QPS/region
                    <br />
                    k=64 CPU: $5K/month | k=256 or GPU: $15K-50K/month
                    <br />
                    <strong>Cost/click</strong> is the ultimate metric
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
                  User cold start: no history = random/average vector.
                  First-session engagement 30-50% lower. Fix: onboarding signals
                  (3-5 interests), demographic-based initialization
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Item cold start: no interactions = random vector, never shown,
                  never gets interactions, stays cold forever. Fix: content
                  features for initial vector + 5-10% exploration slots
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Popularity bias: popular items appear in more histories, model
                  learns to recommend them broadly, they get more interactions,
                  become more recommended. Feedback loop
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Niche items trapped: 100 interactions = connected to only 100
                  users. Model recommends only to very similar users. Never
                  breaks out even if broader audience would love it
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Training fix: up-weight rare items (if A has 1000x more data
                  than B, give B 1000x weight per interaction). Serving fix:
                  final_score = relevance - α × log(popularity)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Monitor coverage: if &lt;20-30% of catalog gets any
                  impressions, feedback loop is winning. Track Gini coefficient
                  of impression distribution
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
                  For capacity planning: give concrete numbers - 100M users × 64
                  dims × 4 bytes = 25GB user embeddings; similar for items;
                  total memory with replicas can reach 100s of GB.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  When asked about index updates: explain daily batch rebuilds
                  with optional hourly incremental updates for high-velocity
                  items (new releases, trending content).
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  For QPS calculations: mention that with 20+ replicas per
                  shard, systems can handle 50K+ QPS globally while maintaining
                  &lt;10ms p95 ANN latency.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonCollaborativeFilteringFailureModesColdStartAndPopularityBias;
