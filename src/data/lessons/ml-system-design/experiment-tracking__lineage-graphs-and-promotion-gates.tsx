import type { Component } from "solid-js";

const LessonExperimentTrackingLineageGraphsAndPromotionGates: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Lineage Graphs and Promotion Gates
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              What Lineage Graphs Model
            </p>
            <p style="margin-top: 0">
              A lineage graph models runs, parameters, metrics, datasets,
              models, and environments as nodes with edges capturing consumed
              and produced relationships plus timestamps. This enables queries
              like find all models trained on dataset snapshot S or rebuild run
              R with identical inputs. Each edge records not just the artifact
              reference but also the access pattern: did the run read the entire
              dataset or a filtered subset, did it use a specific feature
              version from a feature store, what was the exact preprocessing
              transform applied. This metadata powers impact analysis when you
              discover a data quality issue.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Promotion Gates in CI/CD
            </p>
            <p style="margin-top: 0">
              Promotion gates integrate with CI/CD pipelines so only runs with
              complete provenance and evaluation passing pre-registered
              thresholds can be registered or pushed to production. A typical
              gate checks: Does this run have a dataset fingerprint? Is the code
              commit tagged? Does the environment digest match an approved base
              image? Do evaluation metrics exceed the current production model
              by a statistically significant margin? Did the evaluator run on
              time sliced and feature sliced test sets? The system records the
              decision context including who approved, when, and why for audits.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Production Implementations
            </p>
            <p style="margin-top: 0">
              Google TFX uses an Evaluator component that compares candidates
              against baseline models on per-slice metrics with confidence
              intervals. Models only get pushed if they show statistically
              significant improvements, preventing noise from causing rollouts.
              Uber Michelangelo ties each model to exact feature definitions
              from Zipline and backfilled data windows, blocking registration if
              lineage is incomplete.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Statistical Rigor for Comparisons
            </p>
            <p style="margin-top: 0">
              Comparison at scale requires normalizing metric names and slicing
              schemas across runs. Standardize on a core schema with extensible
              tags for custom fields. For statistical rigor, support summaries
              across repeated runs: mean, variance, confidence intervals. For
              small improvements under 0.5 percent relative, run N equals 3 to
              10 repeats and only promote if the confidence interval excludes
              zero. This increases compute cost by N times but prevents
              overfitting to test set noise and reduces Type I errors.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 540px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="display: flex; gap: 12px; align-items: center; justify-content: center">
                  <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; flex: 1; text-align: center">
                    <strong style="font-size: 13px">Dataset v123</strong>
                    <div style="font-size: 11px">1.5B rows</div>
                  </div>
                  <div style="font-size: 20px; font-weight: bold">→</div>
                  <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; flex: 1; text-align: center">
                    <strong style="font-size: 13px">Run abc789</strong>
                    <div style="font-size: 11px">commit f3a2</div>
                  </div>
                  <div style="font-size: 20px; font-weight: bold">→</div>
                  <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; flex: 1; text-align: center">
                    <strong style="font-size: 13px">Model v2</strong>
                    <div style="font-size: 11px">F1: 0.87</div>
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">Promotion Gate</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    ✓ Dataset fingerprint ✓ Code tagged ✓ F1 &gt; baseline +
                    0.01
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
                  Lineage graph models runs, datasets, models, environments as
                  nodes with consumed and produced edges recording timestamps
                  and access patterns like filtered subsets or specific feature
                  versions
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Promotion gates block deployment unless run has dataset
                  fingerprint, tagged code commit, approved environment digest,
                  and evaluation metrics exceeding baseline by statistically
                  significant margin
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Google TFX Evaluator pushes models only with statistically
                  significant per-slice improvements; Uber Michelangelo blocks
                  registration without complete Zipline feature lineage and
                  backfill windows
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Comparison at scale normalizes metric names across runs; for
                  improvements under 0.5 percent relative run N equals 3 to 10
                  repeats reporting mean and confidence intervals to prevent
                  test set overfitting
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Lineage enables impact analysis queries: Find all models
                  trained on dataset snapshot S or rebuild run R with identical
                  inputs by traversing consumed edges in provenance graph
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Statistical rigor: Running 10 repeats increases compute cost
                  10x but reduces Type I error from iterating many candidates
                  against same validation slice; only promote if confidence
                  interval excludes zero
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
                  Google TFX: Evaluator component compares candidate versus
                  baseline on time sliced and feature sliced test sets with
                  confidence intervals, blocks push if improvement not
                  statistically significant at p &lt; 0.05
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Uber Michelangelo: Model registration checks Zipline feature
                  definition versions and backfill window timestamps; blocks if
                  lineage incomplete preventing training serving skew from
                  feature drift
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Meta FBLearner Flow: Side by side comparison dashboards for
                  hundreds of hyperparameter search runs with normalized metric
                  schema enabling identification of best candidate from large
                  sweeps
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">4</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Lineage query example: SELECT model_id, dataset_snapshot,
                  code_commit FROM lineage WHERE dataset_snapshot =
                  'user_events_20240115' AND metric_f1 &gt; 0.85 ORDER BY
                  metric_f1 DESC LIMIT 10
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonExperimentTrackingLineageGraphsAndPromotionGates;
