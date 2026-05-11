import type { Component } from "solid-js";

const LessonFeatureSharingDiscoveryFeatureStoreFailureModesAndReliabilityPatterns: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Feature Store Failure Modes and Reliability Patterns
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Reliability Challenge
            </p>
            <p style="margin-top: 0">
              Production feature stores face a unique set of failure modes that
              can silently degrade model accuracy or cause user visible outages.
              Understanding these edge cases and implementing reliability
              patterns is essential for operating ML infrastructure at scale.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Target Leakage via Shared Features
            </p>
            <p style="margin-top: 0">
              A subtle but catastrophic failure. A team reuses a feature
              originally built for a different model, not realizing it was
              computed with label information baked in. The feature provides
              massive lift offline but zero lift online because the leaked
              signal does not exist at inference time. Prevention requires
              documenting feature lineage and flagging features computed from
              label adjacent data.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Stale Online Store
            </p>
            <p style="margin-top: 0">
              Streaming ingestion failures cause the online store to serve
              increasingly stale features while appearing healthy. A Redis
              cluster accepting reads while Kafka consumers are stuck on a bad
              offset serves data hours or days old. Monitoring must track
              feature age at read time, alerting when staleness exceeds SLA.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Hot Key Thundering Herd
            </p>
            <p style="margin-top: 0">
              Popular entities (celebrity profiles, viral content) generate
              concentrated traffic that overwhelms individual shards. A single
              hot key receiving 100,000 QPS can bring down a partition.
              Mitigation includes key salting (spreading one logical key across
              multiple physical keys), request coalescing (batching concurrent
              requests for the same key), and dedicated caching tiers for hot
              entities.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Backfill Corruption
            </p>
            <p style="margin-top: 0">
              Backfilling historical features after schema changes can overwrite
              correct historical values with incorrectly computed values.
              Immutable storage patterns (append only logs, versioned tables)
              prevent corruption and enable rollback when backfills introduce
              bugs.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Failure: Target Leakage
                  </strong>
                  <div style="margin-top: 6px; font-size: 12px">
                    Shared feature uses post event info
                    <br />
                    Offline AUC 0.90 → Online AUC 0.65
                    <br />
                    Mitigation: Time sliced validation + Whitelist
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Failure: Freshness Drift
                  </strong>
                  <div style="margin-top: 6px; font-size: 12px">
                    Stream delay causes stale fraud scores
                    <br />
                    Silent metric decay over days
                    <br />
                    Mitigation: Per feature SLO + Alerting
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Failure: Noisy Neighbor
                  </strong>
                  <div style="margin-top: 6px; font-size: 12px">
                    Team backfill spikes p99 to 200ms
                    <br />
                    Impacts other teams' inference SLOs
                    <br />
                    Mitigation: Quotas + Separate read pools
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">
                    Reliability: Defense in Depth
                  </strong>
                  <div style="margin-top: 6px; font-size: 12px">
                    Validation gates + Freshness tracking
                    <br />
                    Isolation + Fallbacks + Circuit breakers
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
                  Target leakage via shared features: team reuses feature with
                  post event info, offline AUC 0.90 drops to online 0.65;
                  mitigation requires time sliced validation, runtime whitelists
                  by phase, lineage review with human approval
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Staleness and freshness drift: strict budget features like
                  fraud scores become stale from delayed streams, causes silent
                  metric decay; per feature SLOs, freshness metrics in catalog,
                  alerting, fallback to last good value or priors
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Hot keys and tail latency: few entities dominate traffic,
                  shard hotspots inflate p99 and break inference SLOs; load
                  aware sharding, hot partition replication, per key rate
                  limiting, lazy materialization with backpressure
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Schema and version drift: shared feature evolves with type
                  change or distribution shift, downstream models silently
                  break; semantic versioning, backward compatible evolution,
                  contract tests, compatibility matrix in discovery UI
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Multi tenant noisy neighbors: one team backfill or streaming
                  spike impacts others' online SLOs; per tenant quotas, workload
                  isolation via separate read pools, admission control, circuit
                  breakers prevent cascades
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Catalog rot and discovery failure: outdated docs, missing
                  owners, dead features crowd search, engineers rebuild
                  duplicates; auto harvest usage, decay ranking, adopt or
                  archive policies, periodic curation SLAs
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
                  Payments company fraud model: reused account status feature
                  that included post fraud updates, offline 0.90 AUC but online
                  0.65 AUC; caught by time sliced validation splitting by event
                  timestamp and checking for future leakage
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Uber Michelangelo enforces per feature freshness SLOs and
                  surfaces freshness lag histograms in catalog; alerts fire when
                  stream delay exceeds 5 minutes for critical fraud or pricing
                  features
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Netflix Zipline tracks freshness adherence as first class
                  quality signal and ranks features by it in discovery; stale
                  features decay in search results and trigger owner pings for
                  remediation
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">4</span>
                <span class="flex-grow-1 Learn_cardContent">
                  LinkedIn implements per tenant quotas and separate read pools
                  to isolate workloads; large backfills are throttled and
                  scheduled off peak to avoid impacting online inference SLOs
                  for other teams
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonFeatureSharingDiscoveryFeatureStoreFailureModesAndReliabilityPatterns;
