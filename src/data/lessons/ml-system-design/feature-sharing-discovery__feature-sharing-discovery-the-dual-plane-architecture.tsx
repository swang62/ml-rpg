import type { Component } from "solid-js";

const LessonFeatureSharingDiscoveryFeatureSharingDiscoveryTheDualPlaneArchitecture: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Feature Sharing &amp; Discovery: The Dual-Plane Architecture
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="padding: 14px 16px; border: 2px solid; border-left: 4px solid; border-radius: 6px; margin: 0">
              <div style="font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px">
                Definition
              </div>
              <div style="font-size: 15px; line-height: 1.5">
                <strong>Feature sharing and discovery</strong> enables hundreds
                of ML models across different teams to access thousands of
                features consistently without rebuilding them. The architecture
                uses a <strong>dual plane</strong> design: an offline plane for
                training data and a registry that acts as the central nervous
                system for metadata and discovery.
              </div>
            </div>
            <p style="margin-top: 16px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Offline Plane
            </p>
            <p style="margin-top: 0">
              Computes and stores historical feature values in a data lake or
              warehouse (Hive, Delta Lake, BigQuery). Batch jobs materialize
              feature tables partitioned by entity and date, supporting point in
              time joins for training dataset generation. Throughput is the
              priority: scanning terabytes for a training job should complete in
              minutes to hours, not days.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Online Plane
            </p>
            <p style="margin-top: 0">
              Serves features at inference time with strict latency
              requirements. Key value stores (Redis, DynamoDB, Cassandra)
              provide sub 10ms p95 lookups. Streaming jobs continuously update
              online values from event streams. The online plane trades storage
              cost for latency: keeping features hot in memory costs 10 to 50x
              more per GB than offline cold storage.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Registry
            </p>
            <p style="margin-top: 0">
              Catalogs every feature with schema, owner, lineage, freshness SLA,
              and quality metrics. Serves as the single source of truth for
              discovery, enabling teams to search and evaluate candidate
              features before integration. Without a registry, teams reinvent
              features that already exist or use inconsistent definitions.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Synchronization Challenge
            </p>
            <p style="margin-top: 0">
              The offline and online planes must stay synchronized. A feature
              definition change must propagate to both planes atomically, or
              training serving skew emerges. Feature stores enforce this through
              versioned feature groups that materialize to both stores from the
              same transformation logic.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="display: flex; gap: 16px; align-items: center; justify-content: center">
                  <div style="border: 2px solid; padding: 14px 18px; border-radius: 6px; min-width: 220px; text-align: center">
                    <strong style="font-size: 14px">Offline Plane</strong>
                    <div style="margin-top: 6px; font-size: 12px">
                      Point in time joins
                      <br />
                      TB scale datasets
                      <br />
                      Multi month backfills
                    </div>
                  </div>
                  <div style="border: 2px solid; padding: 14px 18px; border-radius: 6px; min-width: 220px; text-align: center">
                    <strong style="font-size: 14px">Online Plane</strong>
                    <div style="margin-top: 6px; font-size: 12px">
                      5 to 20ms p95 latency
                      <br />
                      10K to 1M QPS
                      <br />
                      Sub minute freshness
                    </div>
                  </div>
                </div>
                <div style="text-align: center; font-size: 20px; font-weight: bold">
                  ↕
                </div>
                <div style="border: 2px solid; padding: 14px 18px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 14px">Feature Registry</strong>
                  <div style="margin-top: 6px; font-size: 12px">
                    Canonical definitions + Lineage + Quality metrics
                    <br />
                    Usage stats + Owners + Training serving parity enforcement
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
                  Dual plane architecture separates offline training (TB scale,
                  point in time correct) from online serving (5 to 20ms p95, 10K
                  to 1M QPS) with registry enforcing consistency across both
                  planes
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Feature registry is not just storage but active governance:
                  ranks by usage and quality, surfaces null rates and drift
                  scores, enforces training serving parity to prevent skew
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Production systems achieve 30 to 70 percent reuse rates,
                  cutting model onboarding from weeks to days at Netflix, Uber,
                  LinkedIn, and Airbnb
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Online serving constraint drives architecture: single digit to
                  low tens of milliseconds p95 latency within sub 100ms end to
                  end inference budgets requires pre materialization and
                  aggressive caching
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Point in time correctness is mandatory: offline joins use
                  event timestamps to prevent data leakage, same transformation
                  logic in batch and streaming paths prevents silent accuracy
                  drops
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Scale envelope: thousands of features, hundreds of models,
                  millions of events per minute for streaming updates, multi
                  month historical backfills at TB to PB scale
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
                  Netflix Zipline manages thousands of features used by hundreds
                  of personalization models, processes daily TB scale training
                  sets with multi month backfills, maintains single digit to low
                  tens of milliseconds p95 for online retrieval
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Uber Michelangelo ingests millions of events per minute for
                  ETA and pricing models, achieves 5 to 20ms p95 online lookups,
                  generates multi TB training sets with point in time joins to
                  prevent leakage
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  LinkedIn Feathr reduces time to production from weeks to days
                  by ranking features by usage frequency and model performance
                  attribution, integrates with Venice for single digit
                  millisecond online reads
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">4</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Airbnb Bighead targets sub 100ms end to end inference for
                  search ranking, allocates low tens of milliseconds p95 to
                  feature retrieval via pre materialized stores and request
                  coalescing
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonFeatureSharingDiscoveryFeatureSharingDiscoveryTheDualPlaneArchitecture;
