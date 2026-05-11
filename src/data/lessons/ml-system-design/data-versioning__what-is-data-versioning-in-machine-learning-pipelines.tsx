import type { Component } from "solid-js";

const LessonDataVersioningWhatIsDataVersioningInMachineLearningPipelines: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            What is Data Versioning in Machine Learning Pipelines?
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
                <strong>Data versioning</strong> makes datasets immutable and
                addressable so any data used in ML can be referenced precisely
                and reproduced later. Instead of overwriting files or tables,
                every change creates a new version with a unique identifier,
                whether a cryptographic hash, timestamp, or offset range in a
                stream.
              </div>
            </div>
            <p style="margin-top: 16px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Git Analogy
            </p>
            <p style="margin-top: 0">
              Think of it like Git for data. When you train a model on a
              dataset, you want to know exactly which rows were included, which
              transformations were applied, and be able to recreate that exact
              state months later for debugging or retraining. Without
              versioning, data silently changes underneath you. A table gets
              updated, features are recalculated, or upstream sources evolve,
              and suddenly your experiment results are no longer reproducible.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Versioning Strategies
            </p>
            <p style="margin-top: 0">
              Production systems mix several strategies. Full snapshots copy the
              entire dataset per version, giving fast reads but expensive
              storage. Delta based approaches store only changes from a base
              version, slashing storage costs by 6 to 7 times in typical
              scenarios but requiring rehydration when reading old versions.
              Append only offsets define versions by stream positions, perfect
              for event logs where you materialize a dataset by reading up to a
              specific offset or timestamp.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Immutability Principle
            </p>
            <p style="margin-top: 0">
              The key principle is immutability: once written, a version never
              changes, so references remain valid forever. This enables
              reproducibility, audit trails, and reliable rollback when model
              performance degrades after a data change.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="display: flex; gap: 12px; align-items: center; justify-content: center">
                  <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 140px; text-align: center">
                    <strong style="font-size: 13px">v1: Hash abc123</strong>
                    <div style="font-size: 12px; margin-top: 4px">
                      10 TB dataset
                    </div>
                  </div>
                  <div style="font-size: 20px; font-weight: bold">→</div>
                  <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 140px; text-align: center">
                    <strong style="font-size: 13px">v2: Hash def456</strong>
                    <div style="font-size: 12px; margin-top: 4px">
                      +100 GB delta
                    </div>
                  </div>
                </div>
                <div style="text-align: center; font-size: 12px; padding: 8px; border: 2px solid; border-radius: 6px">
                  <strong>Storage Cost:</strong> Weekly snapshots + daily deltas
                  = 44.6 TB/month vs 300 TB/month for daily full snapshots
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
                  Immutability is fundamental: versions never change after
                  creation, making all references stable and reproducible across
                  time
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Full snapshots provide instant access to complete datasets but
                  cost 300 terabytes per month for a 10 terabyte dataset with 30
                  day retention and daily versions
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Delta based storage reduces costs to 44.6 terabytes per month
                  by storing weekly checkpoints plus daily changes, saving 85%
                  while keeping reconstruction under minutes
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Append only stream offsets define versions by position in
                  event logs, enabling time travel by replaying up to specific
                  offsets or watermarks without storing redundant copies
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Content addressed artifacts use cryptographic hashes as
                  identifiers, providing natural deduplication and integrity
                  verification across distributed storage systems
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
                  Netflix Metaflow captures immutable artifact versions with
                  content addressing for every workflow step, recording inputs,
                  code, parameters, and outputs for exact reproducibility
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Kafka based pipelines define dataset versions by bounded
                  offsets across partitions, such as all events up to offset
                  5,000,000 in partition 0 through 127, checkpointing weekly to
                  cap read time
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  A 10 terabyte dataset with 1% daily churn generates 100
                  gigabytes of changes per day; storing weekly full snapshots
                  plus six daily deltas costs $1,026 per month versus $6,900 for
                  30 daily full snapshots
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonDataVersioningWhatIsDataVersioningInMachineLearningPipelines;
