import type { Component } from "solid-js";

const LessonUnsupervisedAnomalyDetectionHowDoesIsolationForestWork: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            How Does Isolation Forest Work?
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="padding: 14px 16px; border: 2px solid; border-left: 4px solid; border-radius: 6px; margin: 0">
              <div style="font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px">
                Key Insight
              </div>
              <div style="font-size: 15px; line-height: 1.5">
                <strong>Isolation Forest</strong> exploits a key property of
                anomalies: they are easier to isolate. Random splits quickly
                separate outliers from the bulk of normal data. The fewer splits
                needed to isolate a point, the more anomalous it is.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Algorithm
            </p>
            <p style="margin-top: 0">
              Build a forest of random trees (typically 100-256 trees). For each
              tree: randomly sample a subset of data, then recursively partition
              by picking a random feature and random split point within the
              feature range. Stop when each point is isolated or max depth is
              reached.
            </p>
            <p>
              An outlier sitting far from the data cluster gets isolated in 2-3
              splits. A normal point deep in a dense cluster requires 10-15
              splits. The path length (number of splits to isolate) becomes the
              anomaly score.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Scoring
            </p>
            <p style="margin-top: 0">
              Average the path length across all trees. Normalize by the
              expected path length for a dataset of that size (approximately{" "}
              <code style="padding: 2px 6px; border-radius: 3px; font-family: monospace">
                2 × (ln(n-1) + 0.5772) - 2(n-1)/n
              </code>{" "}
              for n samples). Score near 1 means anomaly, near 0.5 means normal,
              near 0 means the point is in a very dense region.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Why It Works
            </p>
            <p style="margin-top: 0">
              Random splits are inefficient at separating tightly clustered
              points but efficient at separating outliers. Outliers have more
              empty space around them, so any random split has good odds of
              isolating them. This property makes Isolation Forest robust to the
              curse of dimensionality that plagues distance-based methods.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Key Advantages:</strong> Linear time complexity O(n),
              no distance calculations (works in high dimensions), handles mixed
              feature types, minimal hyperparameters (just tree count and
              subsample size).
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 480px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="text-align: center; font-weight: bold; margin-bottom: 6px">
                  Isolation Tree Example
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center">
                  <strong>Root: feature X &lt; 45</strong>
                </div>
                <div style="display: flex; gap: 12px; justify-content: center">
                  <div style="display: flex; flex-direction: column; gap: 8px; align-items: center">
                    <div style="border: 2px solid; padding: 8px 12px; border-radius: 6px; font-size: 13px; text-align: center">
                      <strong>feature Y &lt; 12</strong>
                    </div>
                    <div style="border: 2px solid; padding: 8px 12px; border-radius: 6px; font-size: 12px; text-align: center">
                      <strong>Normal</strong>
                      <div style="font-size: 11px">Path length: 4</div>
                    </div>
                  </div>
                  <div style="display: flex; flex-direction: column; gap: 8px; align-items: center">
                    <div style="border: 2px solid; padding: 8px 12px; border-radius: 6px; font-size: 13px; text-align: center">
                      <strong>feature Z &lt; 90</strong>
                    </div>
                    <div style="border: 2px solid; padding: 8px 12px; border-radius: 6px; font-size: 12px; text-align: center">
                      <strong>Anomaly</strong>
                      <div style="font-size: 11px">Path length: 2</div>
                    </div>
                  </div>
                </div>
                <div style="margin-top: 8px; font-size: 12px; text-align: center; padding: 8px; border: 2px solid; border-radius: 6px">
                  Anomaly isolated in 2 splits vs normal in 4+ splits
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
                  Anomalies are easier to isolate: fewer random splits needed to
                  separate them
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Build 100-256 random trees, each recursively partitioning with
                  random feature and split point
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Path length (splits to isolate) becomes anomaly score: short
                  path = more anomalous
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Score near 1 = anomaly, near 0.5 = normal, near 0 = very dense
                  region
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Linear O(n) time, no distance calculations, works in high
                  dimensions
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
                  Explain the intuition: outliers have empty space around them,
                  random splits isolate quickly
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Show path length scoring: 2-3 splits for outlier vs 10-15 for
                  normal point
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mention advantages: O(n) time, no distance math, handles high
                  dimensions
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonUnsupervisedAnomalyDetectionHowDoesIsolationForestWork;
