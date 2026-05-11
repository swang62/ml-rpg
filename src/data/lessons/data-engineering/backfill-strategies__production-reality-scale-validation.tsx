import type { Component } from "solid-js";

const LessonBackfillStrategiesProductionRealityScaleValidation: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Production Reality: Scale &amp; Validation
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <strong>The Numbers That Matter:</strong>
            At Netflix scale, a single data pipeline might process 200,000
            events per second. Over 24 hours, that is 17.3 billion events.
            Compressed and stored, this becomes 8 to 12 TB per day. When you
            need to reprocess 90 days of history, you are moving 720 TB to 1.08
            PB of data. Running this naively would consume the entire data
            platform for days. Instead, production systems implement careful
            resource management. A backfill might be limited to 500 concurrent
            Spark executors out of a cluster with 5,000 total, completing in 36
            to 48 hours while leaving 90 percent of capacity for daily
            production workloads.
            <strong>Versioned Datasets:</strong>
            Large companies handle logic changes with versioned datasets.
            Instead of overwriting{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              user_engagement
            </code>{" "}
            in place, you create{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              user_engagement_v3
            </code>{" "}
            and backfill it completely with new logic. Both versions coexist
            during validation. Dashboards still read from v2 while data
            engineers compare distributions, check for anomalies, and validate
            that changes match expectations. Only after validation passes do you
            atomically switch queries to read from v3. If something is wrong,
            rollback is instant: just point back to v2. This pattern trades
            storage cost (keeping multiple versions) for safety and
            debuggability.
            <div style="margin: 8px 0; display: flex; flex-direction: column; align-items: center">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
                LinkedIn Reprocessing Scale
              </div>
              <div style="display: inline-flex; gap: 12px; flex-wrap: wrap; justify-content: center">
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">10 TB/day</div>
                  <div style="font-size: 10px; font-weight: 600">
                    PER DAY VOLUME
                  </div>
                </div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">90 days</div>
                  <div style="font-size: 10px; font-weight: 600">
                    BACKFILL WINDOW
                  </div>
                </div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">900 TB</div>
                  <div style="font-size: 10px; font-weight: 600">
                    TOTAL MOVED
                  </div>
                </div>
              </div>
            </div>
            <strong>Validation is Not Optional:</strong>
            Before promoting a reprocessed dataset, production teams run
            extensive validation. This includes statistical checks: comparing
            record counts, key distributions, null rates, and aggregate metrics
            between old and new versions. For example, if total revenue in the
            old version is $45.2 million for January and the new version shows
            $45.8 million, that 1.3 percent difference needs explanation. Is it
            the bug fix? Or did the reprocessing introduce new errors? Some
            teams require that 95 percent of dimensions (like country, product
            category, user segment) differ by less than 0.5 percent, or that any
            larger differences are documented as expected fixes. This prevents
            silently shipping new bugs during reprocessing.
            <strong>Handling Schema Evolution:</strong>A tricky production
            challenge is schema changes over time. An event log from 2022 might
            have different fields than 2024. Naive reprocessing code that
            expects the latest schema will fail or silently drop old events.
            Robust systems maintain schema registries with versioning.
            Transformation logic checks the{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              schema_version
            </code>{" "}
            field in each event and applies the appropriate parsing logic. For
            example, events before June 2023 use{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              user_id
            </code>{" "}
            as an integer. After that, it is a UUID string. Reprocessing code
            handles both, mapping old integers to the new UUID format during
            transformation.
            <div style="padding: 14px 16px; border-left: 4px solid; border-radius: 0 6px 6px 0; margin: 12px 0; font-style: italic">
              <div style="font-size: 14px; line-height: 1.5">
                "At scale, backfill is not a one-off script. It is a first class
                workflow with resource limits, progress tracking, validation
                gates, and safe rollback mechanisms."
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
                  Processing 90 days at 10 TB per day (900 TB total) at Netflix
                  or LinkedIn requires throttling to 10 to 20 percent of cluster
                  capacity to maintain production SLAs
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Versioned datasets like
                  &lt;code&gt;user_engagement_v3&lt;/code&gt; enable side by
                  side comparison and instant rollback before promoting to
                  production
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Validation requires checking that 95 percent of dimensions
                  differ by less than 0.5 percent, or documenting larger changes
                  as expected fixes
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Schema evolution handling is critical: maintain schema
                  registries and apply version-specific parsing logic per event
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  At 200,000 events per second, a single day produces 17.3
                  billion events and 8 to 12 TB of compressed storage
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
                  LinkedIn pattern: compute
                  &lt;code&gt;user_engagement_v3&lt;/code&gt; for full 90 days,
                  compare distributions with v2, validate revenue totals within
                  0.5%, then atomically switch dashboards to read from v3
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Schema handling: events with
                  &lt;code&gt;schema_version=1&lt;/code&gt; (pre June 2023) use
                  integer &lt;code&gt;user_id&lt;/code&gt;, version 2 uses UUID.
                  Reprocessing code checks version field and applies appropriate
                  mapping.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonBackfillStrategiesProductionRealityScaleValidation;
