import type { Component } from "solid-js";

const LessonFeatureSharingDiscoveryFeatureDiscoveryRankingTrustAndQualitySignals: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Feature Discovery: Ranking, Trust, and Quality Signals
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Discovery as a Ranking Problem
            </p>
            <p style="margin-top: 0">
              Discovery is not just keyword search over a catalog; it is a
              ranking and trust problem. When a platform manages thousands of
              features, teams need to quickly evaluate whether a candidate
              feature is fit for purpose without manually auditing code or
              running costly experiments. The discovery layer must surface
              actionable quality signals and rank results by relevance and
              reliability.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Quality Signals to Surface
            </p>
            <p style="margin-top: 0">
              Freshness compliance (percentage of time the feature meets its
              SLA), null rate and trend (current null percentage and whether it
              is increasing), coverage (percentage of entities with values
              versus population), usage count (how many models consume this
              feature), and owner responsiveness (SLA for fixing reported
              issues). These signals let teams filter out abandoned or
              unreliable features.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Trust Tiers
            </p>
            <p style="margin-top: 0">
              Implement trust levels: gold (SLA backed, monitored, owned by
              platform team), silver (SLA backed, owned by product teams), and
              bronze (best effort, experimental). Discovery surfaces trust tier
              prominently so teams understand the support level before adopting.
              Promotion from bronze to gold requires passing reliability audits.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Search and Navigation
            </p>
            <p style="margin-top: 0">
              Support both keyword search (find features mentioning "purchase")
              and faceted navigation (filter by entity type, data type,
              freshness tier, trust level). Semantic search using embeddings
              helps find related features when exact terminology differs across
              teams (spend versus purchase versus transaction).
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Lineage Visibility
            </p>
            <p style="margin-top: 0">
              Show upstream dependencies and downstream consumers. Before
              modifying a feature, teams see which models will be affected. This
              prevents breaking changes and enables impact assessment for
              migrations.
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
                  Discovery ranking uses multiple trust signals: usage
                  frequency, model performance attribution (for example plus 2
                  percent AUC lift), freshness SLA adherence (99.9 percent),
                  stability drift scores, and owner responsiveness to incidents
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Quality surfaces in catalog: null rates, distribution drift
                  (population vs training), outlier counts, freshness lag
                  histograms, all displayed alongside compatibility matrices and
                  example notebooks
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Automated validation gates prevent bad features from entering
                  production: time sliced holdout validation, leakage checks for
                  post event information, drift analysis against baselines with
                  block or warn thresholds
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mature organizations target greater than 50 percent feature
                  reuse rates and keep duplicates below 10 percent through
                  catalog suggestions, decay ranking for unused features, and
                  adopt or archive policies
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  LinkedIn reports cutting time to production from weeks to days
                  and significant reduction in duplicate feature work through
                  centralized discovery and quality driven ranking
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Catalog rot mitigation: auto harvest lineage and usage from
                  logs, decay ranking for unused features, enforce owners or
                  archive policies, periodic curation SLAs to keep registry
                  clean
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
                  LinkedIn Feathr surfaces feature ranked by usage and
                  performance attribution; a feature used by 20 models with plus
                  2 percent AUC lift and 99.9 percent freshness ranks higher
                  than rarely used features with missing owners
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Airbnb discovery portal integrates quality metrics,
                  compatibility matrices, and example notebooks so teams
                  evaluate fitness before committing to a feature
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Netflix enforces validation gates: time sliced cross
                  validation and leakage checks run before publishing; features
                  violating thresholds are marked degraded in registry and
                  consumers alerted
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">4</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Uber Michelangelo tags features with semantic versioning and
                  compatibility info; downstream models see deprecation
                  timelines and migration guidance in the catalog to prevent
                  silent breakage
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonFeatureSharingDiscoveryFeatureDiscoveryRankingTrustAndQualitySignals;
