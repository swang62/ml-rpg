import type { Component } from "solid-js";

const LessonEmbeddingQualityEvaluationProductionRolloutAndVersionManagement: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Production Rollout and Version Management
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            Embedding model updates require careful orchestration because
            embeddings from different model versions are not comparable. Cosine
            similarity between vectors from model V1 and V2 is meaningless,
            making mixed version serving a critical failure mode. A search
            system with 500 million documents cannot reindex overnight.
            Backfilling at 50,000 to 200,000 vectors per second per worker means
            a single worker needs 40 to 160 hours to complete 500 million
            documents. Production rollouts require dual write and dual read
            phases to maintain availability and correctness. The standard
            pattern involves several stages. First, dual write: newly created or
            updated documents get embedded by both old and new models, and both
            vectors are stored with model version tags. Second, background
            backfill: workers re embed existing documents with the new model at
            controlled throughput to avoid overloading embedding services.
            Pinterest batches backfill jobs at 100,000 documents per batch, rate
            limiting to 500 requests per second to avoid impacting live traffic.
            Third, dual index: maintain two Approximate Nearest Neighbor (ANN)
            indexes, one per model version. Fourth, shadow traffic: route a
            small percentage (1 to 5%) of queries to the new index and log
            results alongside the old index without affecting users. Fifth, off
            policy evaluation: compare win rate in pairwise reranking, Recall
            overlap at K, and per slice metrics. Sixth, A/B test: route 5% then
            50% of live traffic to the new model and measure business Key
            Performance Indicators (KPIs) like Click Through Rate (CTR) and
            engagement. Finally, full rollout and deprecate the old model.
            Version skew creates subtle bugs. If the query embedding uses model
            V2 but 30% of document embeddings are still V1, relevance degrades
            unpredictably based on which documents a user interacts with. Google
            enforces that query and document embeddings must match versions,
            requiring the system to route queries to the index matching the
            query model version. During migration, queries use V1 index until
            backfill reaches 95% completeness, then switch atomically.
            Monitoring tracks version distribution per index shard, and alerts
            fire if version skew exceeds 10% after switchover. Cost and time
            dominate rollout planning. At 300 million documents, 768 dimensions,
            backfilling takes 24 to 96 hours with 4 to 8 workers. Storing dual
            embeddings temporarily doubles storage (an extra 450 GB). Running
            shadow traffic and A/B tests for 7 to 14 days adds opportunity cost.
            Spotify budgets 3 to 4 weeks end to end for embedding model updates:
            1 week backfill, 1 week shadow evaluation, 2 weeks A/B testing with
            ramp from 5% to 50% to 100%. They gate rollout by requiring no
            regression on any protected slice (genre, language, user tenure) and
            at least 2% engagement uplift overall.<p></p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 560px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; font-size: 13px">
                  <strong>Week 1: Dual Write + Backfill</strong>
                  <div style="margin-top: 4px; font-size: 12px">
                    New docs → V1 + V2 embeddings
                    <br />
                    Background: 50k to 200k docs/sec/worker
                    <br />
                    500M docs = 40 to 160 hours
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; font-size: 13px">
                  <strong>Week 2: Shadow Traffic</strong>
                  <div style="margin-top: 4px; font-size: 12px">
                    1 to 5% queries → V2 index (logged)
                    <br />
                    Measure: Recall overlap, win rate
                    <br />
                    Gate: No slice regression
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; font-size: 13px">
                  <strong>Week 3 to 4: A/B Test Ramp</strong>
                  <div style="margin-top: 4px; font-size: 12px">
                    5% → 50% → 100% live traffic
                    <br />
                    Measure: CTR, engagement uplift
                    <br />
                    Gate: +2% engagement, no regressions
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; font-size: 13px">
                  <strong>Full Rollout</strong>
                  <div style="margin-top: 4px; font-size: 12px">
                    Deprecate V1 index and embeddings
                    <br />
                    Monitor: Version skew &lt;10% per shard
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
                  Embeddings from different model versions are not comparable:
                  cosine similarity between V1 and V2 vectors is meaningless,
                  requiring strict version isolation during rollout
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Backfilling 500 million documents at 50k to 200k vectors per
                  second per worker requires 40 to 160 hours, necessitating
                  controlled multi day rollouts
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Dual phase rollout maintains two indexes (V1 and V2), uses
                  shadow traffic at 1 to 5% for offline metrics, then A/B tests
                  at 5 to 50 to 100% for business KPIs
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Version skew (mixed V1 and V2 documents in same index)
                  degrades relevance unpredictably: Google enforces query and
                  document versions must match, routing queries to matching
                  index until 95% backfill
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Pinterest rate limits backfill to 500 requests per second in
                  100k document batches to avoid impacting live embedding
                  service under production load
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Spotify budgets 3 to 4 weeks for embedding updates: 1 week
                  backfill, 1 week shadow evaluation, 2 weeks A/B testing, gated
                  by no protected slice regression and 2% engagement uplift
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
                  At 300 million documents, 768D embeddings, dual storage
                  temporarily adds 450 GB (doubles from 225 GB), costing extra
                  $9 per month during migration at cloud rates
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Google routes queries to V1 index until document backfill
                  reaches 95%, then switches atomically to V2, with alerts
                  firing if version skew exceeds 10% post switch
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  A team discovers 8% CTR drop during rollout caused by 30%
                  version skew: queries used V2 but many documents remained V1,
                  resolved by reverting and enforcing strict version matching
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">4</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Spotify ramps new playlist embeddings 5% for 3 days (shadow),
                  50% for 7 days (A/B), then 100%, monitoring slice metrics by
                  genre (pop, classical, hip hop) and user tenure (new vs power
                  users)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonEmbeddingQualityEvaluationProductionRolloutAndVersionManagement;
