import type { Component } from "solid-js";

const LessonRealtimeForecastingUpdatesEventTimeWatermarksAndHandlingLateData: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Event Time, Watermarks, and Handling Late Data
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Event Time vs Processing Time:</strong> Event time is when
              something actually happened (user clicked at 10:00:00). Processing
              time is when the system receives the event (processed at
              10:00:05). The gap—caused by network delays, batching, or
              retries—creates the late data problem that watermarks address.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Why Event Time Matters
            </p>
            <p>
              Processing time windows give inconsistent results. If your server
              slows down, events queue up and arrive late—a 5-minute window
              might contain events spanning 15 minutes of real activity. Event
              time windows give deterministic results: the 10:00-10:05 window
              always contains events from those 5 minutes, regardless of when
              processed. For ML features, this reproducibility is
              essential—training and serving must compute identical features.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Watermarks: Tracking Progress
            </p>
            <p>
              A watermark is a timestamp assertion: all events with event time
              less than the watermark have been processed. If watermark is
              10:05:00, the system believes all events before 10:05 have
              arrived. Watermarks lag behind real time by expected maximum
              lateness. With 30-second expected delay, when wall clock shows
              10:05:30, watermark is at 10:05:00. When watermark passes a window
              boundary, that window can be finalized. Setting watermark too
              aggressively causes late data drops; too conservative delays
              results.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Late Data Strategies
            </p>
            <p>
              <strong>Drop late data:</strong> Simplest. Once window closes,
              late arrivals discarded. Acceptable if late data is rare (under
              0.1%). <strong>Allowed lateness:</strong> Keep windows open for
              additional time after watermark passes. More accurate but uses
              more memory. <strong>Retractions:</strong> Emit preliminary
              results, then emit corrections when late data arrives. Complex but
              necessary for high-accuracy applications.
            </p>
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Warning:</strong> Late data handling must be consistent
              between training and serving. If training includes late data but
              serving drops it, feature values diverge—a classic source of
              training-serving skew.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 560px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong>Timeline:</strong> Event Time vs Processing Time
                </div>
                <div style="display: flex; gap: 8px; align-items: center">
                  <div style="width: 140px; font-weight: bold; font-size: 13px">
                    Event Time:
                  </div>
                  <div style="flex: 1; border: 2px solid; padding: 6px 10px; border-radius: 4px; font-size: 12px">
                    10:00 → 10:01 → 10:02 → 10:03 → 10:04 → 10:05
                  </div>
                </div>
                <div style="display: flex; gap: 8px; align-items: center">
                  <div style="width: 140px; font-weight: bold; font-size: 13px">
                    Processing Time:
                  </div>
                  <div style="flex: 1; border: 2px solid; padding: 6px 10px; border-radius: 4px; font-size: 12px">
                    10:02 → 10:03 → 10:04 → 10:05 → 10:06 → 10:07
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px; font-size: 12px">
                  <strong>Watermark at 10:05 processing time:</strong> "All
                  events with event_time &lt; 10:03 received"
                  <div style="margin-top: 6px; font-size: 11px">
                    Lag = 2 minutes (current 10:05 minus watermark 10:03)
                  </div>
                </div>
                <div style="display: flex; gap: 8px">
                  <div style="flex: 1; border: 2px solid; padding: 8px; border-radius: 6px; font-size: 11px">
                    <strong>On time event:</strong>
                    <br />
                    event_time: 10:02
                    <br />
                    arrives: 10:04
                    <br />✓ Before watermark
                  </div>
                  <div style="flex: 1; border: 2px solid; padding: 8px; border-radius: 6px; font-size: 11px">
                    <strong>Late event:</strong>
                    <br />
                    event_time: 10:02
                    <br />
                    arrives: 10:06
                    <br />⚠ After watermark
                  </div>
                </div>
                <div style="border: 2px solid; padding: 8px; border-radius: 6px; font-size: 11px">
                  <strong>Allowed lateness = 2 min:</strong> Accept late events
                  until 10:05 watermark + 2 min = process time 10:07, emit
                  correction
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
                  Event time gives reproducible results independent of
                  processing delays
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Watermarks track progress by asserting all earlier events have
                  arrived
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Late data handling must be identical in training and serving
                  to prevent skew
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
                  30-second watermark lag: wall clock 10:05:30 means watermark
                  at 10:05:00
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Allowed lateness of 1 minute keeps windows open after
                  watermark passes
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonRealtimeForecastingUpdatesEventTimeWatermarksAndHandlingLateData;
