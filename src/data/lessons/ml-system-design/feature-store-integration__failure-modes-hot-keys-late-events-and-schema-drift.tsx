import type { Component } from "solid-js";

const LessonFeatureStoreIntegrationFailureModesHotKeysLateEventsAndSchemaDrift: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Failure Modes: Hot Keys, Late Events, and Schema Drift
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Common Failure Modes:</strong> Feature stores fail through
              hot keys overloading single shards, late events causing stale
              features, and schema changes breaking downstream consumers. Each
              failure appears as degraded model performance rather than obvious
              errors.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Hot Keys and Load Imbalance
            </p>
            <p>
              When certain entities are accessed far more frequently than others
              (viral content, celebrity users), the shard holding their data
              becomes overloaded. Redis cluster with user_id as key: if 10% of
              users generate 90% of traffic, 10% of shards handle 90% of load.
              Symptoms: p99 latency spikes, timeouts, feature assembly failures.
              Mitigation: replicate hot keys across multiple shards, cache hot
              entities at the serving layer, or use probabilistic data
              structures for extremely hot aggregations.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Late Events and Stale Features
            </p>
            <p>
              Streaming features depend on timely event arrival. If events are
              delayed (network issues, upstream processing lag), features become
              stale without any error signal. The online store contains old
              values that are technically valid but no longer represent current
              state. Monitor: track event lag (time between event timestamp and
              processing time), alert when lag exceeds feature window size. If a
              5-minute feature has 10-minute event lag, the feature is
              meaningless.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Schema Drift and Breaking Changes
            </p>
            <p>
              Feature definitions evolve: adding fields, changing data types,
              modifying aggregation logic. Without careful versioning, changes
              break downstream models. A model trained on "click_rate_7d" as
              float suddenly receives integer division results. Mitigation:
              version feature schemas explicitly, validate new versions against
              historical data before deployment, maintain backward compatibility
              by keeping old versions available during transition periods. Never
              modify features in place—create new versions.
            </p>
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Monitoring Checklist:</strong> Track these metrics: hot
              key detection (access frequency by key), event lag distribution,
              schema version mismatches between producers and consumers, and
              feature value distributions over time (detect silent drift).
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
                  Hot keys cause load imbalance when 10% of entities generate
                  90% of traffic
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Event lag exceeding feature window size makes streaming
                  features meaningless
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Version feature schemas explicitly and never modify features
                  in place
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
                  Replicate hot keys across shards or cache at serving layer
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Alert when event lag exceeds feature window size (10-min lag
                  on 5-min feature)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonFeatureStoreIntegrationFailureModesHotKeysLateEventsAndSchemaDrift;
