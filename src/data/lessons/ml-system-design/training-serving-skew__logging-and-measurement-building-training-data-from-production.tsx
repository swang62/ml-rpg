import type { Component } from "solid-js";

const LessonTrainingServingSkewLoggingAndMeasurementBuildingTrainingDataFromProduction: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Logging and Measurement: Building Training Data from Production
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Production Feature Logging
            </p>
            <p style="margin-top: 0">
              The second pillar of skew prevention is explicit measurement
              through production feature logging. The gold standard is logging
              the exact feature vector used for each prediction at serving time,
              then building your next training dataset directly from these logs.
              This eliminates entire classes of skew because training literally
              uses what production saw, including all the quirks: missing values
              from timeouts, stale cache entries, upstream service failures, and
              edge cases that never appear in clean offline pipelines.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Scale Considerations
            </p>
            <p style="margin-top: 0">
              At 20,000 QPS with 1 kilobyte per feature vector, you generate 20
              megabytes per second of logs, which is 72 gigabytes per hour or
              1.7 terabytes per day. Real systems control this through sampling
              (log 1 to 10 percent of predictions), compression (Protocol
              Buffers or Avro), and schema minimization. Google's TFX style
              stacks log features, model outputs, and eventually observed
              labels, creating a closed loop where serving directly feeds
              training.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Blocking Skew Tests
            </p>
            <p style="margin-top: 0">
              This enables powerful validation workflows. Before deploying a new
              model, you run blocking skew tests: take 1,000 to 10,000 examples
              from your offline pipeline with expected outputs, load your
              packaged model with bundled transforms, run both paths, and assert
              output deltas below tight thresholds (maximum absolute difference
              less than 0.000001 for deterministic models). If there is a
              mismatch, you binary search the stack to localize the divergence.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Continuous Monitoring
            </p>
            <p style="margin-top: 0">
              Continuous monitoring extends this to live traffic. You compute
              distribution metrics between your training reference dataset and
              live serving slices: PSI warns above 0.1 and alerts above 0.2, KS
              statistics for continuous features, JS divergence for categorical
              distributions. When fraud models see PSI spike on device
              fingerprint features, it triggers investigation before false
              positive rates climb.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 560px">
              <div style="display: flex; flex-direction: column; gap: 11px; align-items: center">
                <div style="border: 2px solid; padding: 11px 15px; border-radius: 6px; min-width: 200px; text-align: center">
                  <strong style="font-size: 13px">Production Serving</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    20k QPS × 1KB = 20 MB/s logs
                  </div>
                </div>
                <div style="font-size: 22px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 11px 15px; border-radius: 6px; min-width: 200px; text-align: center">
                  <strong style="font-size: 13px">Feature Logs</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    10% sample + compression
                  </div>
                </div>
                <div style="font-size: 22px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 11px 15px; border-radius: 6px; min-width: 200px; text-align: center">
                  <strong style="font-size: 13px">Next Training Dataset</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Built from actual serving data
                  </div>
                </div>
                <div style="font-size: 22px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 11px 15px; border-radius: 6px; min-width: 200px; text-align: center">
                  <strong style="font-size: 13px">Drift Monitoring</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    PSI &gt; 0.1 warns, PSI &gt; 0.2 alerts
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
                  Gold standard: Log exact feature vectors at serving time
                  (sampled 1% to 10%), build next training dataset from these
                  production logs to eliminate offline online pipeline
                  divergence
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Scale and cost: 20,000 QPS at 1 kilobyte per record yields 72
                  gigabytes per hour uncompressed; control via sampling,
                  Protocol Buffers compression, schema minimization (feature IDs
                  not raw values)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Blocking skew tests pre deploy: Run 1,000 to 10,000 examples
                  through offline pipeline and packaged serving model, assert
                  output deltas below 0.000001 absolute difference for
                  deterministic models
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Continuous drift detection: Population Stability Index (PSI)
                  warns above 0.1 and alerts above 0.2, Kolmogorov Smirnov test
                  for continuous features, Jensen Shannon divergence for
                  categorical distributions
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Trade off: Full logging provides strongest parity but raises
                  privacy concerns (Personally Identifiable Information or PII
                  compliance) and storage costs; balance with sampling, hashing,
                  access controls
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
                  Google TensorFlow Extended (TFX): Logs features, predictions,
                  and delayed labels from serving, builds training data directly
                  from logs, runs validation comparing offline versus online
                  model outputs
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Uber fraud detection: Monitors PSI on device fingerprint and
                  transaction features; PSI spike above 0.15 triggers
                  investigation before false positive rates increase, preventing
                  customer friction
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Meta feed ranking: Pre deployment tests run 5,000 examples
                  comparing offline ranking scores versus packaged model
                  outputs; any delta above 0.00001 blocks deployment until
                  resolved
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonTrainingServingSkewLoggingAndMeasurementBuildingTrainingDataFromProduction;
