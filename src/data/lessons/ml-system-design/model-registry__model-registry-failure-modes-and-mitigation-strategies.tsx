import type { Component } from "solid-js";

const LessonModelRegistryModelRegistryFailureModesAndMitigationStrategies: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Model Registry Failure Modes and Mitigation Strategies
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="padding: 14px 16px; border: 2px solid; border-left: 4px solid; border-radius: 6px; margin: 0">
              <div style="font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px">
                Critical Failure Mode
              </div>
              <div style="font-size: 15px; line-height: 1.5">
                <strong>Model-code skew</strong> is the most dangerous failure:
                serving code expects features the model was not trained on,
                causing silent accuracy degradation or hard crashes.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              MODEL-CODE SKEW
            </p>
            <p style="margin-top: 0">
              Service upgrades feature extraction (adds fields, changes
              preprocessing) but the registry still points to an older model.
              Example: fraud service adds geolocation features in v2.0 but loads
              a model trained without them—precision drops from 0.89 to 0.72.
              Mitigation: store a model signature (feature names, types,
              preprocessing version). Block promotion if schema mismatches.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              STALE POINTERS
            </p>
            <p style="margin-top: 0">
              Eventual consistency in metadata or cache causes two systems to
              read different versions. One canary loads v1.24 while others
              remain on v1.23, invalidating A/B tests. Mitigation: optimistic
              locking with version fields, event-driven propagation instead of
              polling, short cache TTLs (30-60s) during rollouts.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Warning:</strong> Never bind model versions to stages
              alone. Bind to application releases for strongest guarantees—both
              code and model deploy together.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              REGISTRY OUTAGE
            </p>
            <p style="margin-top: 0">
              Training finishes but registry control plane is down—registration
              stalls, deployments partially update. Mitigation: serving
              continues using last resolved version (hot path never queries
              registry). Registration writes to durable queue with retry logic.
              Write-ahead logs ensure no metadata loss.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              COLD STARTS
            </p>
            <p style="margin-top: 0">
              New model promoted but artifacts not replicated to all regions.
              Distant instances fail to download within 60s timeout and
              crash-loop. Mitigation: prestage artifacts in regional caches
              before flipping pointer. Delay promotion until health checks
              confirm replicas ready. Fallback to cached older version if
              download fails.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong>Failure: Model Code Skew</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Service v2.0 (new features) + Model v1.23 (old schema)
                  </div>
                  <div style="font-size: 12px">
                    Impact: Accuracy drops 0.89 → 0.72
                  </div>
                </div>
                <div style="font-size: 20px; text-align: center; font-weight: bold">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong>Mitigation: Signature Check</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Block promotion if schemas incompatible
                  </div>
                  <div style="font-size: 12px">
                    Bind model version to app release
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
                  Model code skew occurs when service upgrades feature schema
                  but loads old model, causing silent accuracy degradation from
                  0.89 to 0.72 precision
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Stale pointers from eventual consistency cause different
                  instances to load different versions, invalidating A/B test
                  results and user experience
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Registry outage stalls deployments if control plane is on
                  critical path, mitigation caches last resolved version and
                  uses durable queues for events
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Artifact unavailability in distant regions causes instances to
                  crash loop when download exceeds 60 second startup timeout
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Metric gaming with offline evaluation looks good due to
                  leakage but online Key Performance Indicators (KPIs) degrade,
                  requires statistically sound canary tests
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Rollback mismanagement leaves bad model serving if instances
                  do not reload or cache TTL is too long, need forced invalidate
                  signal
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
                  Model code skew: Fraud detection service adds
                  merchant_category feature, model trained without it receives
                  null values, false positive rate jumps 15%
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Stale pointer: Eventual consistency lag of 5 seconds causes 20
                  out of 200 instances to load v1.24 while others stay on v1.23
                  during canary window
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Artifact unavailability: New 1.5 GB model promoted but not
                  replicated to Asia Pacific region, 50 instances fail to start
                  within 60 second timeout
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">4</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Rollback failure: Registry pointer flipped back to v1.23 but
                  300 second cache TTL means instances continue serving bad
                  v1.24 for 4 more minutes
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonModelRegistryModelRegistryFailureModesAndMitigationStrategies;
