import type { Component } from "solid-js";

const LessonFeatureFreshnessEventTimeSemanticsAndPointInTimeCorrectness: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Event Time Semantics and Point in Time Correctness
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Event Time vs Processing Time
            </p>
            <p style="margin-top: 0">
              Event time is when an event actually occurred in the real world,
              as opposed to processing time (when your system handled it). All
              freshness computation and monitoring must use event time to
              correctly handle late arriving and out of order data. For example,
              a user click at 2:00:00 PM that arrives in your pipeline at
              2:00:45 PM due to network delays has event time of 2:00:00 PM. If
              you use processing time, you will incorrectly measure freshness
              and potentially compute wrong aggregates.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Point in Time Correctness
            </p>
            <p style="margin-top: 0">
              Prevents label leakage during training, which is one of the most
              insidious bugs in production ML systems. Features must reflect
              only information available at the training example timestamp, not
              future data. If you are predicting whether a user will convert and
              you include features computed after the conversion event, your
              model will learn to cheat and offline AUC will be inflated by 5 to
              20 percent.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Implementation
            </p>
            <p style="margin-top: 0">
              Join feature tables to training examples using event time less
              than or equal to example timestamp. Partition feature stores by
              event date and cluster by entity key to accelerate these temporal
              lookups. Zipline enforces this through automated point in time
              joins across billions of training rows.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Clock Skew Dangers
            </p>
            <p style="margin-top: 0">
              Distributed systems with clock drift across services can cause
              timestamps to be inconsistent. A feature computed on a server with
              a clock 30 seconds ahead will appear fresher than it actually is.
              Mitigation requires NTP synchronization across infrastructure,
              storing both event time and ingestion time, and computing
              freshness server side using monotonic clocks.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="text-align: center; font-weight: bold; margin-bottom: 8px; font-size: 15px">
                  Training: Point in Time Join
                </div>
                <div style="display: flex; gap: 12px; align-items: center; justify-content: center">
                  <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; min-width: 140px; text-align: center">
                    <strong style="font-size: 13px">Label</strong>
                    <div style="margin-top: 6px; font-size: 12px">
                      Jan 15, 3:00 PM
                      <br />
                      Conversion: Yes
                    </div>
                  </div>
                  <div style="font-size: 20px; font-weight: bold">→</div>
                  <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; min-width: 160px; text-align: center">
                    <strong style="font-size: 13px">Features AS OF</strong>
                    <div style="margin-top: 6px; font-size: 12px">
                      Jan 15, 2:59 PM
                      <br />
                      (before label time)
                    </div>
                  </div>
                </div>
                <div style="margin-top: 12px; padding: 10px; border: 2px solid; border-radius: 6px; font-size: 12px">
                  <strong>Metadata per feature:</strong> event_time,
                  last_updated_at, computation_window, ttl_seconds
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
                  Event time versus processing time matters for correctness. A 5
                  minute sliding window using processing time will miscount
                  events that arrive late, while event time with watermarks
                  handles delays up to a bounded lateness (typically 5 to 15
                  minutes).
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Label leakage from incorrect time joins is common and
                  devastating. One company reported 15% Area Under Curve (AUC)
                  drop when deploying a model trained with future feature values
                  that weren't actually available at serving time.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Watermarks bound how late data can arrive. Setting a 5 minute
                  watermark means events more than 5 minutes late are dropped or
                  sent to a dead letter queue, preventing unbounded state growth
                  in streaming jobs.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Feature metadata enables runtime freshness enforcement. If a
                  feature has ttl of 60 seconds and current age is 90 seconds,
                  the online assembler can log a violation, substitute a
                  default, or include an age feature for the model.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Identical transformation logic between training and serving is
                  critical. Defining features once and materializing to both
                  batch (for training) and online stores (for serving) prevents
                  subtle bugs from code drift.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Time travel queries or versioned snapshots add storage cost.
                  Maintaining 90 days of point in time queryable features can be
                  3x to 10x more expensive than keeping only current values, but
                  it's essential for correct retraining.
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
                  DoorDash maintains event time windows for features like
                  "orders in last 30 minutes for this store." Late arriving
                  orders due to mobile network delays are correctly included if
                  within the 5 minute watermark, ensuring accurate busy state.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Uber enforces point in time correctness by snapshotting
                  feature values hourly in offline stores. When training an
                  Estimated Time of Arrival (ETA) model, labels from 3 PM on Jan
                  15 join with features from the 2:55 PM snapshot, never using
                  data after 3 PM.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  A fraud detection team discovered their model had 0.92 offline
                  AUC but only 0.78 online. Root cause was training features
                  included transaction outcomes that occurred hours after the
                  prediction time, leaking future labels into training data.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonFeatureFreshnessEventTimeSemanticsAndPointInTimeCorrectness;
