import type { Component } from "solid-js";

const LessonExperimentTrackingWhatIsExperimentTrackingAndReproducibilityInMlSystems: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            What is Experiment Tracking and Reproducibility in ML Systems?
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
                <strong>Experiment tracking</strong> captures the complete
                provenance of an ML run: code snapshot, data snapshot,
                configuration, environment, hardware, runtime logs, metrics, and
                outputs. <strong>Reproducibility</strong> means you can
                re-execute an experiment months later on different hardware
                after library updates and recover the same outcome, or at least
                understand why results differ.
              </div>
            </div>
            <p style="margin-top: 16px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Lineage Graph Architecture
            </p>
            <p style="margin-top: 0">
              In production systems, this operates as a lineage graph where each
              run is a node connected to the artifacts it consumed and produced.
              A run might consume a dataset snapshot and feature definitions,
              then produce model weights and evaluation reports. Every run
              carries critical metadata: unique run ID, parent run ID for
              tracking evolution, code version as a commit hash, environment
              fingerprint like a container image digest, random seeds, hardware
              profile showing CPU or GPU type, and the full configuration of
              hyperparameters and data filters.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Three Levels of Reproducibility
            </p>
            <p style="margin-top: 0">
              Production systems recognize three levels of reproducibility.
              Bitwise exact means identical binary output, useful for audits and
              regulated industries. Algorithmic deterministic means same numbers
              within floating point precision, suitable for most production use
              cases. Statistical means same distribution within confidence
              bounds, acceptable for research and hyperparameter optimization
              where you run multiple trials anyway.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Core Architecture
            </p>
            <p style="margin-top: 0">
              The core architecture separates concerns: a write optimized
              metadata store handles run events, a durable artifact store
              manages large binaries like models and datasets, and a lineage
              service builds and queries the provenance graph. Logging happens
              asynchronously to avoid slowing down training. Gating policies in
              CI/CD block deployments that lack reproducibility guarantees or
              fail evaluation thresholds.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 12px; align-items: center">
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 180px; text-align: center">
                  <strong style="font-size: 14px">Run Metadata</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    ID, Code Hash, Seeds
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 180px; text-align: center">
                  <strong style="font-size: 14px">Inputs</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Dataset Snapshot, Features
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 180px; text-align: center">
                  <strong style="font-size: 14px">Outputs</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Model Weights, Metrics
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
                  Experiment tracking captures full provenance: code, data,
                  config, environment, hardware, logs, metrics, and outputs for
                  every machine learning run
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Three reproducibility levels: Bitwise exact for audits,
                  algorithmic deterministic for production (same numbers within
                  float precision), statistical for research (same distribution
                  within confidence bounds)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Production architecture uses three components: write optimized
                  metadata store for events, durable artifact store for large
                  binaries, lineage service for provenance queries
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Meta handles millions of experiments yearly with FBLearner
                  Flow; Netflix generates thousands of Metaflow tasks daily with
                  sub-second per step overhead
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Typical mid size org with 5 teams running 500 runs per day
                  generates 70 to 85 GB daily, requiring 2 to 2.5 TB for 30 day
                  hot retention
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Asynchronous logging keeps training overhead under 1 percent
                  while maintaining complete audit trails and enabling CI/CD
                  gates that block non reproducible deployments
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
                  Meta FBLearner Flow: Handles tens of thousands of run events
                  per day supporting ranking, vision, and NLP use cases with
                  centralized metadata capturing code version, input datasets,
                  hyperparameters, and evaluation results
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Uber Michelangelo with Zipline: Supports thousands of
                  production models across marketplace and ETA prediction,
                  experiments on 100 million to 1 billion labeled rows, stores
                  model binaries from 10 to 500 MB with exact feature definition
                  lineage
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Google TFX with ML Metadata: Runs hundreds of pipelines with
                  tens of thousands of pipeline steps daily, only pushes models
                  when Evaluator finds statistically significant improvements
                  with per-slice metrics and confidence intervals
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonExperimentTrackingWhatIsExperimentTrackingAndReproducibilityInMlSystems;
