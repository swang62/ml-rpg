import type { Component } from "solid-js";

const LessonRealtimeForecastingUpdatesTimeBucketingEfficientSlidingWindowImplementation: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Time Bucketing: Efficient Sliding Window Implementation
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Time Bucketing:</strong> An implementation technique that
              groups events into discrete time intervals (buckets) and
              aggregates within each bucket. Instead of tracking individual
              events, you maintain per-bucket summaries, reducing memory from
              O(events) to O(buckets) while approximating true sliding window
              semantics.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Implementation Challenge
            </p>
            <p>
              True sliding windows require storing every event to compute exact
              aggregates. A 1-hour window at 1000 events/second means 3.6
              million events in memory per user. For features like sum, count,
              or average, time bucketing achieves near-equivalent results with
              fixed memory. Instead of storing 3.6M events, store 60 one-minute
              buckets. Each bucket holds pre-aggregated values: count, sum, min,
              max. Memory drops from megabytes to hundreds of bytes.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Bucket Granularity Trade-offs
            </p>
            <p>
              Smaller buckets (1 second) give more accurate sliding windows but
              require more storage and computation. Larger buckets (1 minute)
              use less memory but introduce approximation error. The error
              manifests at window boundaries: if current time is 10:07:30 and
              you want a 5-minute window, the bucket starting at 10:02:00 is
              only half inside your true window. Common approach: use bucket
              size at most 1/10th of window size. For a 1-hour window, use
              6-minute buckets (10 buckets); for real-time features, 1-second
              buckets for 10-second windows.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Partial Bucket Handling
            </p>
            <p>
              When computing aggregates, the oldest bucket typically overlaps
              partially with the window boundary. Two strategies:{" "}
              <strong>Exclude partial:</strong> Only use complete buckets inside
              the window. Simpler but window size varies (4.5-5.5 minutes for a
              5-minute window with 1-minute buckets).{" "}
              <strong>Linear interpolation:</strong> If 30% of the boundary
              bucket falls inside the window, include 30% of its aggregate. More
              accurate but requires storing bucket boundaries. For ML features,
              interpolation is usually worth the complexity—sudden jumps in
              features when buckets expire can confuse models.
            </p>
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Memory Formula:</strong> For window W with bucket size B,
              you need ceil(W/B) + 1 buckets (extra bucket for partial overlap).
              A 1-hour window with 1-minute buckets needs 61 buckets. At 32
              bytes per bucket (count, sum, min, max, timestamp), that is under
              2KB per entity.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 540px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="border: 2px solid; padding: 12px; border-radius: 6px; text-align: center">
                  <strong>
                    5 Minute Sliding Window = 60 Buckets × 5 Seconds
                  </strong>
                </div>
                <div style="display: grid; grid-template-columns: repeat(12, 1fr); gap: 4px">
                  <div style="border: 2px solid; padding: 8px 4px; border-radius: 4px; font-size: 11px; text-align: center">
                    <strong>B1</strong>
                    <div>cnt:42</div>
                  </div>
                  <div style="border: 2px solid; padding: 8px 4px; border-radius: 4px; font-size: 11px; text-align: center">
                    <strong>B2</strong>
                    <div>cnt:38</div>
                  </div>
                  <div style="border: 2px solid; padding: 8px 4px; border-radius: 4px; font-size: 11px; text-align: center">
                    <strong>B3</strong>
                    <div>cnt:51</div>
                  </div>
                  <div style="border: 2px solid; padding: 8px 4px; border-radius: 4px; font-size: 11px; text-align: center">
                    <strong>...</strong>
                  </div>
                  <div style="border: 2px solid; padding: 8px 4px; border-radius: 4px; font-size: 11px; text-align: center">
                    <strong>B58</strong>
                    <div>cnt:47</div>
                  </div>
                  <div style="border: 2px solid; padding: 8px 4px; border-radius: 4px; font-size: 11px; text-align: center">
                    <strong>B59</strong>
                    <div>cnt:39</div>
                  </div>
                  <div style="border: 2px solid; padding: 8px 4px; border-radius: 4px; font-size: 11px; text-align: center">
                    <strong>B60</strong>
                    <div>cnt:44</div>
                  </div>
                </div>
                <div style="display: flex; gap: 8px; margin-top: 8px">
                  <div style="flex: 1; border: 2px solid; padding: 8px; border-radius: 6px; font-size: 12px">
                    <strong>Memory per key:</strong> 60 buckets × 24 bytes = 1.4
                    KB
                  </div>
                  <div style="flex: 1; border: 2px solid; padding: 8px; border-radius: 6px; font-size: 12px">
                    <strong>Update cost:</strong> O(1) drop oldest + add newest
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px; font-size: 12px">
                  <strong>Window aggregate = sum(B1...B60) =</strong>{" "}
                  42+38+51+...+44 = 2,547 events
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
                  Time bucketing reduces memory from O(events) to O(buckets)
                  with bounded approximation error
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Bucket size should be at most 1/10th of window size for
                  acceptable accuracy
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Linear interpolation for partial buckets prevents sudden
                  feature jumps at bucket boundaries
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
                  1-hour window with 6-minute buckets needs 11 buckets (about
                  350 bytes)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Without bucketing, 1-hour at 1000 events/sec requires 3.6M
                  events in memory
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonRealtimeForecastingUpdatesTimeBucketingEfficientSlidingWindowImplementation;
