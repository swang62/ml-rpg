import type { Component } from "solid-js";

const LessonFeatureBackfillingWhatIsFeatureBackfillingInMlSystems: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            What is Feature Backfilling in ML Systems?
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
                <strong>Feature backfilling</strong> is the controlled
                recomputation of feature values for historical time ranges to
                create point in time correct training datasets. When you launch
                a new feature or fix a bug in feature logic, you retroactively
                compute those features over past data so your training set has
                months or years of examples.
              </div>
            </div>
            <p style="margin-top: 16px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Why Backfilling is Essential
            </p>
            <p style="margin-top: 0">
              Machine learning models require substantial historical data for
              training. A new user engagement feature cannot wait 6 months to
              accumulate enough examples. Backfilling enables immediate model
              iteration by computing what the feature would have been at each
              historical timestamp, using only data available at that time.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Point in Time Correctness Requirement
            </p>
            <p style="margin-top: 0">
              Backfills must be point in time correct: a feature computed for
              January 15th must only use data that existed on January 14th or
              earlier. Using current state (what we know now) instead of
              historical state (what we knew then) causes label leakage,
              inflating offline metrics while degrading production performance
              by 5 to 20 percent.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Scale Considerations
            </p>
            <p style="margin-top: 0">
              Production backfills process terabytes to petabytes of historical
              data. A typical baseline is 5 to 20 TB per hour throughput on a
              100 worker Spark cluster using columnar formats with partition
              pruning. Backfilling 1 year of daily features for 100 million
              entities might take 10 to 50 hours of compute time.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Reproducibility Foundation
            </p>
            <p style="margin-top: 0">
              Backfills enable reproducibility: given the same raw data and
              feature definitions, you can recreate any historical training
              dataset. This supports model audits, debugging production issues,
              and understanding why a model made specific predictions months
              ago.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="display: flex; gap: 10px; align-items: center">
                  <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; flex: 1; text-align: center">
                    <strong style="font-size: 13px">
                      Raw Events
                      <br />
                      (event_time)
                    </strong>
                    <div style="font-size: 11px; margin-top: 4px">Jan 1–31</div>
                  </div>
                  <div style="font-size: 20px; font-weight: bold">→</div>
                  <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; flex: 1; text-align: center">
                    <strong style="font-size: 13px">Backfill Job</strong>
                    <div style="font-size: 11px; margin-top: 4px">
                      7d window agg
                    </div>
                  </div>
                </div>
                <div style="text-align: center; font-size: 20px; font-weight: bold">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px">Feature Store</strong>
                  <div style="font-size: 11px; margin-top: 6px; line-height: 1.4">
                    (user_id=123, feature=purchases_7d,
                    <br />
                    feature_ts=Jan 15, value=3, version=v2)
                  </div>
                </div>
                <div style="display: flex; gap: 10px; margin-top: 4px">
                  <div style="border: 2px solid; padding: 8px 12px; border-radius: 6px; flex: 1; text-align: center; font-size: 12px">
                    <strong>Offline:</strong> Training data
                  </div>
                  <div style="border: 2px solid; padding: 8px 12px; border-radius: 6px; flex: 1; text-align: center; font-size: 12px">
                    <strong>Online:</strong> Real-time serving
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
                  Point in time correctness requires features computed as of
                  time t to use only data available strictly before t,
                  preventing label leakage that would inflate training accuracy
                  but fail in production
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Airbnb Zipline achieves single digit millisecond p50 latency
                  (2 to 10 ms) for online lookups while backfilling 30 to 365
                  days of history offline in hours to days
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Idempotency through deterministic upserts keyed by entity id,
                  feature name, timestamp, and monotonic version ensures reruns
                  converge to identical results without duplicates
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Uber Michelangelo reprocesses hundreds of terabytes per day
                  using copy on write or merge on read patterns with partition
                  level checkpointing for restartability
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  The same feature definition executes offline for backfill and
                  online for serving to eliminate training serving skew that
                  causes model accuracy drops of 20% or more in production
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
                  Netflix reprocesses hundreds of billions of events per day to
                  build training datasets after logic changes, completing full
                  day reprocesses within overnight maintenance windows using
                  multi terabyte per hour throughput
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Meta Feature Store runs billions of feature computations daily
                  with single digit millisecond median online reads and nightly
                  training dataset generation (10^9 to 10^11 rows) completing
                  within 12 hours
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  A ride sharing platform backfills user's 30 day trip count
                  feature: for training row at January 20th, counts trips from
                  December 21 to January 19 inclusive, strictly excluding
                  January 20 and later to avoid leakage
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonFeatureBackfillingWhatIsFeatureBackfillingInMlSystems;
