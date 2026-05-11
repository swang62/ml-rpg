import type { Component } from "solid-js";

const LessonExperimentTrackingDatasetFingerprintingAndArtifactVersioningStrategies: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Dataset Fingerprinting and Artifact Versioning Strategies
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              What Dataset Fingerprinting Does
            </p>
            <p style="margin-top: 0">
              Dataset fingerprinting creates a cryptographic signature or
              version identifier for training data that proves two runs used
              exactly the same inputs. Without this, you might think you
              reproduced an experiment when in fact the underlying data changed
              silently due to schema evolution, backfill corrections, or
              deletion policies. Content addressing means computing strong
              hashes like SHA256 for datasets and using that hash as the
              artifact identifier. For a 100 GB dataset, you might compute
              per-shard hashes and store a manifest, enabling partial
              verification without reading everything.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Exact Snapshots vs Time Travel
            </p>
            <p style="margin-top: 0">
              The critical trade-off is exact data snapshots versus time travel
              reads. Copying entire datasets ensures immutability but becomes
              prohibitively expensive at 10 TB or larger scales. A full copy of
              a 5 TB dataset costs significant storage and takes hours to
              materialize. Time travel in data lakes and feature stores plus
              content hashing is cheaper, relying on underlying storage
              guarantees like Delta Lake or Iceberg to read data as it existed
              at a specific timestamp. This requires careful retention policies;
              if source systems delete data within your lookback window,
              reproducibility breaks.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Production Patterns
            </p>
            <p style="margin-top: 0">
              Uber Zipline versions feature definitions and materializations so
              training and serving read consistent time traveled snapshots. A
              marketplace model might reference a specific backfill version
              covering a 90 day window with explicit watermark boundaries. The
              pattern is to log source tables, snapshot or version IDs, query
              predicates, and the explicit list of sample IDs per split for
              perfect reproducibility.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Artifact Retention and Cost
            </p>
            <p style="margin-top: 0">
              Artifact retention quickly becomes a cost problem. Storing every
              checkpoint for every run leads to multi-TB growth monthly. A
              typical solution uses lifecycle policies: keep all artifacts for
              30 days, then keep only top k performers per experiment, and
              deduplicate identical artifacts via content hashing. For a mid
              size org generating 85 GB per day, deduplication and top k
              retention can reduce storage by 3x to 10x.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; gap: 16px; justify-content: center">
                <div style="flex: 1; border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 14px; display: block; margin-bottom: 8px">
                    Data Snapshots
                  </strong>
                  <div style="font-size: 12px; line-height: 1.6">
                    Copy full dataset
                    <br />
                    Immutable guarantee
                    <br />
                    Cost: 5 TB × $0.02/GB = $100/month
                    <br />
                    Slow: hours to materialize
                  </div>
                </div>
                <div style="flex: 1; border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 14px; display: block; margin-bottom: 8px">
                    Time Travel
                  </strong>
                  <div style="font-size: 12px; line-height: 1.6">
                    Query at timestamp
                    <br />
                    Relies on lake retention
                    <br />
                    Cost: metadata only
                    <br />
                    Fast: seconds to reference
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
                  Content addressed artifacts use strong hashes as identifiers,
                  enabling deduplication that reduces storage by 3x to 10x for
                  repeated experiments with identical datasets or model weights
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Dataset fingerprinting requires recording source tables,
                  snapshot IDs, query predicates, explicit sample ID lists per
                  split, and for streaming windows the watermark and backfill
                  version
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Time travel in data lakes costs near zero for references but
                  requires retention policies; if source systems delete within
                  your lookback window reproducibility fails silently
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Artifact lifecycle policies keep all for 30 days, top k per
                  experiment afterward, with deduplication; a mid size org
                  generating 85 GB daily needs 2.5 TB for 30 day retention
                  before deduplication
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Uber Zipline versions feature materializations with explicit
                  backfill windows; Google TFX uses immutable artifact
                  fingerprints to guarantee ExampleGen reads identical data on
                  pipeline reruns
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  For large datasets beyond 1 TB, compute per-shard hashes and
                  store a manifest to enable partial verification without
                  reading the entire dataset
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
                  Uber marketplace model references Zipline backfill version
                  covering 90 day window with watermark boundaries, ensuring
                  training and serving feature consistency across 100 million
                  labeled rows
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Netflix Metaflow content addressed paths:
                  /artifacts/&lt;SHA256_hash&gt;/model.pkl naturally
                  deduplicates identical model weights from repeated
                  hyperparameter search runs
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Dataset manifest example: &#123;"dataset_id":
                  "user_events_v2", "snapshot_timestamp":
                  "2024-01-15T00:00:00Z", "total_rows": 1500000000,
                  "shard_hashes": ["a3f2...", "b7e1..."], "split_sample_ids":
                  &#123;"train": [123, 456], "val": [789]&#125;&#125;
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonExperimentTrackingDatasetFingerprintingAndArtifactVersioningStrategies;
