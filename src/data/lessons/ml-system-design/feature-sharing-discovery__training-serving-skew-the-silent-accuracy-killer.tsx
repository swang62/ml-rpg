import type { Component } from "solid-js";

const LessonFeatureSharingDiscoveryTrainingServingSkewTheSilentAccuracyKiller: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Training Serving Skew: The Silent Accuracy Killer
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              What Training Serving Skew Is
            </p>
            <p style="margin-top: 0">
              Training serving skew is the most insidious failure mode in
              production ML: offline validation shows strong AUC lift, but
              online A/B tests show flat or negative impact. The root cause is
              divergence between how features are computed during training
              versus inference. This systematic difference means models learn
              patterns that do not exist at serving time.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Common Causes
            </p>
            <p style="margin-top: 0">
              Different transformation logic in batch (Python, Spark) versus
              streaming (Flink, Java) pipelines. Using future leaked data during
              training that is unavailable at inference. Schema drift where
              feature types or encodings change between training and serving.
              Time zone bugs where training uses UTC but serving uses local
              time.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The 5 to 20 Percent Impact
            </p>
            <p style="margin-top: 0">
              Skew typically degrades online metrics by 5 to 20 percent versus
              offline expectations. A fraud model showing 0.92 AUC offline might
              achieve only 0.78 AUC online due to features computed with stale
              data in production. This gap represents significant business
              impact: missed fraud, bad recommendations, wasted ad spend.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Detection Methods
            </p>
            <p style="margin-top: 0">
              Log serving request features, replay through offline pipeline with
              identical timestamps, compare distributions. Alert when PSI
              exceeds 0.1 to 0.2 for any feature. Run continuous shadow
              evaluation comparing online predictions to offline predictions on
              sampled traffic.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Prevention Architecture
            </p>
            <p style="margin-top: 0">
              Feature stores enforce single feature definitions compiled to both
              batch and streaming execution. Point in time correctness ensures
              training sees only data available at prediction time. Schema
              versioning prevents type mismatches. Unified transformation
              frameworks (Tecton, Feast) eliminate dual code paths.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="border: 2px solid; padding: 14px; border-radius: 6px">
                  <strong style="font-size: 13px">Training (Offline)</strong>
                  <div style="margin-top: 8px; font-size: 12px">
                    Join with finalized end of day data
                    <br />
                    Uses all available information
                    <br />
                    AUC 0.85 ✓
                  </div>
                </div>
                <div style="text-align: center; font-size: 18px; font-weight: bold">
                  ⚠ SKEW ⚠
                </div>
                <div style="border: 2px solid; padding: 14px; border-radius: 6px">
                  <strong style="font-size: 13px">Serving (Online)</strong>
                  <div style="margin-top: 8px; font-size: 12px">
                    Join with 1 hour lag for late arrivals
                    <br />
                    Limited by real time availability
                    <br />
                    AUC 0.72 ✗
                  </div>
                </div>
                <div style="text-align: center; font-size: 18px; font-weight: bold">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 14px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">
                    Solution: Point in Time Joins
                  </strong>
                  <div style="margin-top: 8px; font-size: 12px">
                    Offline replays same 1 hour lag
                    <br />
                    Single source transformation logic
                    <br />
                    Unit tests at same timestamps
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
                  Training serving skew manifests as strong offline AUC (for
                  example 0.85) but flat or negative online A/B impact (0.72
                  AUC) due to divergent feature computation between batch
                  training and real time inference
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Point in time correctness requires joins using entity keys and
                  event timestamps with same lookback windows and lag policies
                  in both planes; offline must replay the 1 hour lag for late
                  arrivals that online enforces
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Single source of truth transformations: define feature logic
                  once in shared library or DSL, compile to both batch Spark and
                  streaming Flink jobs to ensure identical semantics in training
                  and serving
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mitigation tactics: unit tests that replay online requests
                  against offline data at same timestamps, canary models on
                  small live traffic percentage to catch degradation before full
                  rollout, automated leakage checks
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Real incident example: fraud model showed 0.85 offline AUC but
                  0.72 online because training joined end of day account status
                  features including post event information; fix required multi
                  month training set rebuild
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Uber and Netflix emphasize training serving parity as
                  foundational: not optional but mandatory for reliable
                  production ML, enforced through validation gates and contract
                  tests in feature store
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
                  Payments company fraud model: 0.85 offline AUC dropped to 0.72
                  online due to time travel bug where training joined end of day
                  snapshots with post fraud event account status; fix required
                  multi month backfill and retraining
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Uber Michelangelo enforces point in time joins with
                  watermarking for late data and version pins models to feature
                  snapshots; unit tests replay online lookups against offline
                  data at identical timestamps
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Netflix Zipline uses single authoring model for features so
                  transformation logic is defined once and compiled to both
                  batch and streaming; prevents divergence that causes skew
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">4</span>
                <span class="flex-grow-1 Learn_cardContent">
                  LinkedIn Feathr DSL allows feature definitions to be
                  materialized in both offline Spark and online serving paths
                  from same source, caught a skew bug in unit tests before
                  production deploy
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonFeatureSharingDiscoveryTrainingServingSkewTheSilentAccuracyKiller;
