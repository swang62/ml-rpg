import type { Component } from "solid-js";

const LessonFeatureBackfillingCommonBackfillFailureModesAndMitigations: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Common Backfill Failure Modes and Mitigations
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Training Serving Skew
            </p>
            <p style="margin-top: 0">
              The most insidious failure mode: offline backfilled features
              differ subtly from online computed features due to logic
              differences, default value mismatches, or rounding errors. Even
              0.1 to 0.5 percent divergence shifts ranking model predictions
              enough to degrade production metrics. A recommendation model
              trained on offline features showing 0.92 AUC may achieve only 0.78
              online.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Detection and Prevention
            </p>
            <p style="margin-top: 0">
              Sample recent online serving requests, replay their timestamps
              through the offline backfill pipeline, compare feature values.
              Alert when more than 0.1 percent of features diverge by more than
              1 percent. Use unified transformation logic that compiles to both
              batch and streaming execution paths.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Silent Data Corruption
            </p>
            <p style="margin-top: 0">
              Upstream schema changes or null handling differences cause
              backfills to produce subtly wrong values that pass validation
              checks. A price field changing from cents to dollars doubles all
              price related features without raising alerts. Prevention requires
              schema versioning and explicit validation of value ranges against
              historical baselines.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Resource Exhaustion
            </p>
            <p style="margin-top: 0">
              Large backfills exhaust cluster memory causing OOM failures, blow
              storage quotas, or timeout. The mitigation is chunked processing:
              break the full backfill into smaller date or entity ranges that
              fit within resource limits. Process chunks sequentially or in
              parallel with throttling.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Late Arriving Data
            </p>
            <p style="margin-top: 0">
              Backfilling a window immediately after it closes may miss late
              arriving events that trickle in over hours or days. The mitigation
              is waiting for a grace period (24 to 72 hours) before finalizing
              backfills, or implementing reconciliation jobs that re-backfill
              partitions after late data settles.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Clock Skew Bugs
            </p>
            <p style="margin-top: 0">
              Timezone inconsistencies between data sources cause off by one day
              errors in aggregates. Enforce UTC throughout the pipeline and
              validate aggregate boundaries against known ground truth.
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
                  Training serving skew from 0.1% to 0.5% feature value
                  divergence causes ranking model degradation; different default
                  values (zero vs median) systematically misrank sparse profiles
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Data leakage from using processing time instead of event time
                  or off by one window boundaries inflates offline AUC by 5% to
                  15% but fails in production with no labels
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Duplicate keys from non deterministic tie breaking cause 2% to
                  5% metric drift across training runs; requires max version or
                  LSN based upserts for consistency
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Schema evolution (field renames, type changes) causes silent
                  drops with 5% to 10% of rows defaulting to null; requires
                  explicit versioning and migration rules
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Cloud storage listing throttling at 5,000 requests per second
                  saturates backfills with thousands of partitions; bottom up
                  listing reduces API calls by 30% to 50%
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
                  A ride sharing model trained on user's 7 day trip count
                  including current day trips shows 0.88 AUC offline; production
                  serving excludes current day, causing accuracy drop to 0.82
                  and 10% more false positives
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Feature backfill joins user account status to current snapshot
                  instead of as of timestamp; suspended accounts appear active
                  in training, leaking future labels and inflating precision
                  from 0.75 to 0.88
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Replay of backfill partition writes duplicate rows for entity
                  id 789 at January 20th with values 5 and 7; non deterministic
                  sampling causes training AUC to vary between 0.81 and 0.83
                  across identical code runs
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">4</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Product price field renamed from price_usd to price without
                  migration rule; offline backfill defaults price to null for
                  15% of transactions, degrading revenue prediction model by 8%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonFeatureBackfillingCommonBackfillFailureModesAndMitigations;
