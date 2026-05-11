import type { Component } from "solid-js";

const LessonDataVersioningFailureModesWhenVersioningAndLineageBreakDown: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Failure Modes: When Versioning and Lineage Break Down
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Broken Delta Chains
            </p>
            <p style="margin-top: 0">
              Production versioning systems fail in predictable ways that
              require specific mitigations. Broken delta chains occur when base
              snapshots are deleted by retention policies before dependent
              deltas are compacted, rendering entire version ranges
              unrecoverable. Reference counting in metadata must track active
              dependents and block deletion of any base with live dependencies
              until compaction merges deltas into a new self contained
              checkpoint.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Event Time vs Processing Time Confusion
            </p>
            <p style="margin-top: 0">
              Event time versus processing time confusion silently corrupts
              datasets. If you define stream versions by processing time when
              data arrives, late arriving events get assigned to wrong versions,
              causing data leakage in training and double counting in metrics.
              Always use event time with explicit watermarks and late data
              windows; document the allowed lateness budget in version metadata.
              For a payment processing pipeline, accepting events up to 24 hours
              late means version boundaries shift as late data arrives,
              requiring careful handling of downstream consumers.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Training Serving Skew in Lineage
            </p>
            <p style="margin-top: 0">
              Training serving skew hides in lineage gaps. If online features
              bypass the same transformation code logged for offline pipelines,
              lineage appears clean but reality diverges. A handcoded
              aggregation in a serving microservice that differs from the Spark
              job computing training features creates a 10 to 20 percent
              accuracy drop that manifests only in production.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Mitigation Strategies
            </p>
            <p style="margin-top: 0">
              Enforce single source of truth transformations and dual write
              lineage from both offline batch and online streaming paths,
              alerting when transformation logic diverges.
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
                  Broken delta chains from premature base deletion render
                  versions unrecoverable; reference counting must track
                  dependents and block deletion of bases with active deltas
                  until compaction completes
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Event time versus processing time confusion admits late events
                  to wrong versions causing silent data leakage; always define
                  versions by event time with explicit watermarks and document
                  lateness budgets
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Training serving skew hidden by lineage gaps occurs when
                  online features bypass offline transformations; handcoded
                  service logic diverging from training pipelines causes 10 to
                  20% accuracy drops
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Schema evolution shards lineage when renames or splits lack
                  semantic equivalence tracking; maintain explicit schema change
                  events linking old and new columns to preserve continuity
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Non deterministic transformations with unseeded randomness,
                  parallel aggregation order sensitivity, or time of day
                  dependencies break reproducibility even with versioned inputs;
                  fix seeds and record external parameters
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  GDPR deletion requests conflict with immutable versions
                  retaining personally identifiable information; solutions
                  include per subject encryption keys, detachable joinable
                  tables, or write time redaction with salted hashes
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
                  A retention policy deletes weekly checkpoint after 90 days
                  while daily deltas from days 91 to 97 remain; reconstruction
                  fails because base is missing; reference counting would have
                  blocked deletion until deltas were compacted
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Payment pipeline versions defined by processing time include
                  transactions arriving 6 hours late in wrong day's dataset,
                  causing 2% training data leakage and inflated revenue metrics
                  until switched to event time with 24 hour watermark
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Recommendation model drops 15% accuracy in production because
                  online feature service computes user engagement as 7 day
                  rolling average while training used 30 day aggregation; dual
                  lineage tracking would surface divergence
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">4</span>
                <span class="flex-grow-1 Learn_cardContent">
                  User deletion request under GDPR cannot erase data from
                  immutable historical snapshots; system switches to per user
                  encryption keys stored separately, deleting keys to
                  cryptographically erase access without modifying snapshots
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonDataVersioningFailureModesWhenVersioningAndLineageBreakDown;
