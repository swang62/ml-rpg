import type { Component } from "solid-js";

const LessonPointInTimeCorrectnessWhatIsPointInTimePitCorrectnessInMlSystems: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            What is Point in Time (PIT) Correctness in ML Systems?
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
                <strong>Point in Time (PIT) correctness</strong> ensures that
                both training datasets and online predictions use only
                information that would have been available at the exact moment
                of prediction. It enables time travel reads over your feature
                data: for any entity at time t, the system reconstructs the last
                known value as of t, not what you know now.
              </div>
            </div>
            <p style="margin-top: 16px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Why It Matters
            </p>
            <p style="margin-top: 0">
              PIT correctness eliminates future leakage, where information from
              after the prediction timestamp contaminates your model. This is
              one of the most insidious bugs in ML systems because offline
              metrics look great while production performance mysteriously
              degrades.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Event Time vs Processing Time
            </p>
            <p style="margin-top: 0">
              The core requirement is strict separation of event time (when the
              fact actually happened) versus processing time (when your system
              saw it). A fraud detection feature computed at 3pm but reflecting
              transaction data from 2pm must be timestamped at 2pm, not 3pm.
              Without this distinction, late arriving data can leak future
              information into past training examples.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              When PIT Becomes Critical
            </p>
            <p style="margin-top: 0">
              PIT correctness is essential when labels trail features (fraud
              confirmed days later, ad clicks happen hours after impression),
              when features are time window aggregates (user activity over past
              7 days), or when data arrives out of order in streaming systems.
              Uber processes 100 million to 1 billion training examples using
              PIT joins to ensure temporal consistency.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Implementation Principle
            </p>
            <p style="margin-top: 0">
              The same principles as database point in time recovery apply:
              maintain immutable versioned histories with event timestamps, then
              reconstruct state at any moment using base snapshots plus an
              append only change log. This underpins reproducibility, letting
              you recreate the exact dataset that trained a deployed model
              despite ongoing pipeline evolution.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="display: flex; gap: 12px; align-items: center; justify-content: center">
                  <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center; flex: 1">
                    <strong style="font-size: 13px">Event Time</strong>
                    <div style="font-size: 12px; margin-top: 4px">
                      2:00 PM
                      <br />
                      (when it happened)
                    </div>
                  </div>
                  <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center; flex: 1">
                    <strong style="font-size: 13px">Processing Time</strong>
                    <div style="font-size: 12px; margin-top: 4px">
                      3:00 PM
                      <br />
                      (when system saw it)
                    </div>
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 14px">
                    PIT Join at Label Time 2:30 PM
                  </strong>
                  <div style="font-size: 12px; margin-top: 6px">
                    Uses only features with event_time ≤ 2:30 PM
                    <br />
                    Excludes 3:00 PM processing time data
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">✓ No Future Leakage</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Training matches reality at prediction time
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
                  Event time (when fact occurred) must be separated from
                  processing time (when system observed it) to prevent late data
                  from contaminating past training examples
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Requires immutable versioned feature histories where each
                  value is keyed by entity ID and event timestamp, enabling
                  reconstruction of state at any historical moment
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Temporal as of joins select the latest feature value with
                  timestamp less than or equal to target time, costing 1.5 to 4
                  times more compute than naive latest value joins at 100
                  million plus row scale
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Production systems like Uber Michelangelo enforce PIT joins
                  for 100 million to 1 billion example training sets while
                  maintaining p99 online latency under 10 to 20 milliseconds
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Critical for any supervised learning with time dependent
                  features, delayed labels (fraud, recommendations, ads), or
                  streaming data with out of order arrival
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Enables reproducibility by persisting exact dataset manifests
                  with feature versions and snapshot IDs, allowing byte for byte
                  rebuilds months later for audits and rollbacks
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
                  Airbnb Zipline requires explicit event timestamp and separate
                  ingestion timestamp for all features, using as of joins across
                  petabyte scale tables to build training datasets with
                  thousands of features across hundreds of models
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Netflix uses Iceberg like table formats with snapshotting to
                  rebuild multi hundred million row training datasets in hours
                  while preserving temporal consistency, supporting time travel
                  queries over months of history
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Meta unified feature store provides time travel semantics
                  handling tens of billions of feature reads per day with single
                  digit to low tens of milliseconds p99 latency, versioning
                  feature values by event time for safe backfills
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonPointInTimeCorrectnessWhatIsPointInTimePitCorrectnessInMlSystems;
