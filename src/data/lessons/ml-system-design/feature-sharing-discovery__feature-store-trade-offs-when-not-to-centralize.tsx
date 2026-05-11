import type { Component } from "solid-js";

const LessonFeatureSharingDiscoveryFeatureStoreTradeOffsWhenNotToCentralize: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Feature Store Trade-offs: When NOT to Centralize
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              When Centralization Hurts
            </p>
            <p style="margin-top: 0">
              A centralized feature store is not always the right choice. The
              overhead of governance, migration, and platform constraints can
              outweigh the benefits of reuse when teams move fast on novel,
              domain specific features or when a single model dominates with
              minimal cross team sharing. Understanding when to centralize
              versus when to stay decentralized is critical for platform
              strategy.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Arguments Against Centralization
            </p>
            <p style="margin-top: 0">
              Single team dominates: if one team owns 80 percent of ML
              workloads, the coordination overhead of a shared platform exceeds
              the reuse benefits. Novel feature exploration: experimental
              features that may be discarded after one A/B test do not warrant
              formal registration and SLA commitment. Domain specificity:
              features deeply tied to one product domain (game physics, medical
              imaging) rarely transfer to other use cases.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Arguments For Centralization
            </p>
            <p style="margin-top: 0">
              Cross team feature reuse: user embeddings, engagement scores, and
              entity attributes often provide lift across many models.
              Consistency enforcement: centralization prevents teams from
              computing the same feature differently. Governance requirements:
              regulated industries need lineage, access control, and audit
              trails that centralized systems provide more easily.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Hybrid Path
            </p>
            <p style="margin-top: 0">
              Start decentralized with clear promotion criteria. Teams build
              features locally, validate lift in production, then promote proven
              features to the central store. This filters experimental noise
              while capturing high value shared features. Promotion requires:
              owner commitment, freshness SLA, monitoring, and documentation.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Migration Cost Reality
            </p>
            <p style="margin-top: 0">
              Migrating to a centralized feature store is not free. Budget 3 to
              6 months of engineering effort per 50 features migrated, including
              validation, backfill, and dual write cutover. Only migrate
              features with clear reuse potential to justify this investment.
            </p>
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Centralized feature store is not always optimal: overhead of
                  governance, migration, and platform constraints can outweigh
                  reuse benefits for single model domains or fast moving novel
                  features with minimal cross team sharing
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Centralization wins when multiple teams share entities (users,
                  items, sessions) and need low latency inference at scale; 30
                  to 70 percent reuse rates and weeks to days onboarding justify
                  investment despite bottleneck risk
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Pre materialized features: lower tail latency and predictable
                  SLOs but higher storage cost and staleness risk; example
                  storage math: 500M entities with 100 features at 8 bytes
                  equals 24 TB with 30 day retention and 2x replication
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  On demand computation: fresher and more flexible but
                  introduces latency variance; use pre materialization for top N
                  hottest features with strict p95 targets, compute infrequent
                  features on demand or cache on first access
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Batch only vs streaming plus batch: batch is simpler and
                  cheaper but may miss freshness for fraud or pricing; streaming
                  meets sub minute freshness but adds exactly once semantics,
                  watermarking, dual code paths overhead
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Shared engineered features vs learned embeddings: engineered
                  features are interpretable and transferable but can plateau;
                  embeddings yield higher accuracy but harder to govern; mix
                  both and catalog embeddings with same versioning
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
                  Single fraud detection model with bespoke real time
                  aggregations may not justify central store overhead; team
                  iterates faster with dedicated pipeline until reuse emerges
                  across other risk models
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Netflix centralizes because hundreds of personalization models
                  share user and content features; 30 to 70 percent reuse and
                  training serving parity across models justifies platform
                  investment and migration cost
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Uber uses streaming plus batch for ETA and pricing features
                  where sub minute freshness lifts conversion and user
                  satisfaction; batch only would miss real time traffic or
                  demand spikes affecting predictions
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">4</span>
                <span class="flex-grow-1 Learn_cardContent">
                  LinkedIn catalogs learned embeddings from transformer models
                  alongside engineered features; applies same versioning,
                  lineage, and discovery to embeddings to enable reuse while
                  maintaining governance
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonFeatureSharingDiscoveryFeatureStoreTradeOffsWhenNotToCentralize;
