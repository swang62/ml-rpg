import type { Component } from "solid-js";

const LessonModelRegistryProductionModelRegistryArchitectureAndScaleRequirements: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Production Model Registry Architecture and Scale Requirements
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="padding: 14px 16px; border: 2px solid; border-left: 4px solid; border-radius: 6px; margin: 0">
              <div style="font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px">
                Architecture Principle
              </div>
              <div style="font-size: 15px; line-height: 1.5">
                A production registry separates <strong>control plane</strong>{" "}
                (metadata) from <strong>data plane</strong> (artifacts). This
                isolation ensures metadata queries stay fast even during large
                artifact transfers.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              CONTROL PLANE
            </p>
            <p style="margin-top: 0">
              Handles registration, promotion, approval. Uses strongly
              consistent store for critical writes (stage transitions). Reads
              serve through replicas or cache for p95 under 10ms. Typical load:
              hundreds of models, thousands of versions, bursts of hundreds of
              writes/hour during retraining.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              DATA PLANE
            </p>
            <p style="margin-top: 0">
              Model binaries live in object storage with versioning, replicated
              across serving regions. Large models (500MB-5GB) store chunked
              with checksums. Regional caches warm ahead of promotion to keep
              artifact load under 5 seconds.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Insight:</strong> Version resolution happens
              out-of-band from inference. Services cache versions, prefetch
              artifacts, and flip atomically—the hot path never queries the
              registry.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              PROGRESSIVE ROLLOUT
            </p>
            <p style="margin-top: 0">
              At 5%/25%/50%/100%, the new model preloads in a background slot
              while the old serves. Once warmed, flip atomically. Keep the old
              model resident for 10-30 minutes for instant rollback without
              re-downloading.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              SCALE TARGETS
            </p>
            <p style="margin-top: 0">
              Design for: p95 metadata read under 10ms, write under 50ms,
              artifact throughput 10 Gbps/region for parallel rollouts. Events
              publish to a durable queue so pipelines can trigger on approved
              versions.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Safety:</strong> Artifact signing, per-model access
              control, encryption at rest/transit, full audit logging.
              Optimistic locking prevents concurrent promotion conflicts.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 540px">
              <div style="display: flex; gap: 12px; justify-content: space-between">
                <div style="border: 2px solid; padding: 10px; border-radius: 6px; flex: 1">
                  <strong style="font-size: 13px">Control Plane</strong>
                  <div style="font-size: 11px; margin-top: 6px">
                    Metadata Store
                  </div>
                  <div style="font-size: 11px">Read: &lt;10ms p95</div>
                  <div style="font-size: 11px">Write: &lt;50ms p95</div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px; flex: 1">
                  <strong style="font-size: 13px">Data Plane</strong>
                  <div style="font-size: 11px; margin-top: 6px">
                    Object Storage
                  </div>
                  <div style="font-size: 11px">Artifacts: 500MB–5GB</div>
                  <div style="font-size: 11px">Load: &lt;5s p95</div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px; flex: 1">
                  <strong style="font-size: 13px">Serving</strong>
                  <div style="font-size: 11px; margin-top: 6px">
                    Cached Lookup
                  </div>
                  <div style="font-size: 11px">TTL: 30–300s</div>
                  <div style="font-size: 11px">Prefetch + Warm</div>
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
                  Control plane uses strongly consistent store for promotions
                  with p95 read under 10ms, data plane replicates artifacts
                  across regions with p95 load under 5 seconds
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Serving systems resolve model version at startup with 30 to
                  300 second TTL cache, never querying registry on inference
                  request path
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Large models take 10 to 60 seconds to download and 5 to 60
                  seconds to warm, rollouts preload in background slot and flip
                  atomically
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Progressive exposure at 5%, 25%, 50%, 100% keeps old model
                  resident for 10 to 30 minute grace period enabling instant
                  rollback
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Scale targets include hundreds of model groups, thousands of
                  versions, hundreds of writes per hour, 10 Gbps artifact
                  throughput per region
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Safety requires artifact signing, per model access control,
                  encryption, audit logging, optimistic locking, and disaster
                  recovery under 15 minutes RTO
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
                  Artifact download: 1 GB model takes 15 seconds over 10 Gbps
                  link, 40 seconds to warm in memory, total 55 seconds before
                  serving traffic
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Rollout coordination: Service prefetches new model
                  sha256:b4e3... in background while serving sha256:a3f2...,
                  flips pointer when ready, keeps old model loaded for 20
                  minutes
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Scale example: 500 models, 5000 total versions, 200 writes per
                  day during retraining, 3000 reads per minute during deploy
                  window across 1000 service instances
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonModelRegistryProductionModelRegistryArchitectureAndScaleRequirements;
