import type { Component } from "solid-js";

const LessonRealtimeForecastingUpdatesWhatAreSlidingWindowsInRealTimeSystems: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            What Are Sliding Windows in Real Time Systems?
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Sliding Window:</strong> A technique for computing
              aggregates over the most recent subset of streaming data,
              maintaining only a bounded time period (like last 5 minutes) or
              count (like last 1000 events) rather than full history. Enables
              real-time feature computation with predictable memory and latency.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Core Problem
            </p>
            <p>
              ML models need features computed over recent activity—average
              purchase amount in last 7 days, click rate in last hour, session
              duration trends. Computing these from full history is impractical:
              scanning millions of events for each prediction adds seconds of
              latency and consumes unbounded memory. Sliding windows solve this
              by maintaining only the recent subset needed for computation.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Time Windows vs Count Windows
            </p>
            <p>
              <strong>Time-based windows:</strong> Keep events from last N
              minutes/hours. A 5-minute window might contain 10 events during
              low traffic but 10,000 during peak. Memory usage varies with
              traffic volume, but the semantic meaning stays consistent (recent
              5 minutes). <strong>Count-based windows:</strong> Keep exactly the
              last N events regardless of time span. Memory is fixed (N events
              maximum), but temporal meaning varies—1000 events might span 30
              seconds during peak load or 30 minutes during quiet periods.
              Choose time windows when recency matters semantically; choose
              count windows when memory bounds are critical.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Tumbling vs Sliding Windows
            </p>
            <p>
              <strong>Tumbling windows</strong> are non-overlapping: events from
              10:00-10:05 go into one bucket, 10:05-10:10 into the next. Simple
              to implement but creates boundary artifacts—an event at 10:04 and
              10:06 are never in the same window even though only 2 minutes
              apart. <strong>Sliding windows</strong> overlap continuously:
              every query gets its own window ending at current time. A query at
              10:07 sees events from 10:02-10:07; a query at 10:08 sees
              10:03-10:08. More computationally expensive but eliminates
              boundary effects. For ML features requiring smooth temporal
              behavior, sliding windows are typically preferred despite higher
              cost.
            </p>
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Decision Criteria:</strong> Use tumbling windows for batch
              aggregations where boundary effects are acceptable (hourly
              rollups, daily summaries). Use sliding windows for real-time
              features where continuity matters (fraud scoring, recommendation
              ranking).
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong>Time:</strong> 10:00 → 10:01 → 10:02 → 10:03 → 10:04 →
                  10:05
                </div>
                <div style="display: flex; gap: 16px; align-items: flex-start">
                  <div style="flex: 1">
                    <div style="border: 2px solid; padding: 10px; border-radius: 6px; margin-bottom: 8px">
                      <strong>Tumbling (1 min)</strong>
                      <div style="margin-top: 4px; font-size: 13px">
                        [10:00-10:01] [10:01-10:02]
                      </div>
                      <div style="font-size: 12px; margin-top: 4px">
                        No overlap, discrete
                      </div>
                    </div>
                    <div style="border: 2px solid; padding: 10px; border-radius: 6px; margin-bottom: 8px">
                      <strong>Hopping (2 min, 1 min hop)</strong>
                      <div style="margin-top: 4px; font-size: 13px">
                        [10:00-10:02]
                      </div>
                      <div style="margin-top: 2px; font-size: 13px; margin-left: 12px">
                        [10:01-10:03]
                      </div>
                      <div style="font-size: 12px; margin-top: 4px">
                        Overlaps, smooth trends
                      </div>
                    </div>
                    <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                      <strong>Sliding (5 min)</strong>
                      <div style="margin-top: 4px; font-size: 13px">
                        [10:00:00-10:05:00]
                      </div>
                      <div style="margin-top: 2px; font-size: 13px">
                        [10:00:01-10:05:01]
                      </div>
                      <div style="font-size: 12px; margin-top: 4px">
                        Per event, continuous
                      </div>
                    </div>
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
                  Time-based windows maintain semantic meaning (last 5 minutes)
                  with variable memory
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Count-based windows guarantee fixed memory with variable time
                  spans
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Tumbling windows are simpler but create boundary artifacts at
                  window edges
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
                  Choose time windows for recency-sensitive features like fraud
                  detection
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Use count windows when memory bounds are critical and temporal
                  meaning is flexible
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonRealtimeForecastingUpdatesWhatAreSlidingWindowsInRealTimeSystems;
