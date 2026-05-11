import type { Component } from "solid-js";

const LessonCiCdMlModelRegistryAndLineageCapture: Component = () => (
  <div class="lesson-content">
    <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
      <div class="mb-4 p-4">
        <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
          Model Registry and Lineage Capture
        </h1>
        <div
          class="card-content-area"
          style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
        >
          <div style="padding: 14px 16px; border: 2px solid; border-left: 4px solid; border-radius: 6px; margin: 0">
            <div style="font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px">
              Core Concept
            </div>
            <div style="font-size: 15px; line-height: 1.5">
              A <strong>model registry</strong> is both versioned storage and
              metadata database. When training completes, it captures not just
              the model binary but full lineage: code commit, feature
              definitions, data snapshot IDs, hyperparameters, seeds, hardware
              fingerprints, metrics, and fairness checks.
            </div>
          </div>
          <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            WHY LINEAGE MATTERS
          </p>
          <p style="margin-top: 0">
            Models are non-deterministic artifacts. Floating-point differences
            across hardware, multi-threaded randomness in data loading, and
            unpinned dependencies can yield different weights from identical
            code and data. Without captured environment fingerprints and seeds,
            you cannot reproduce a model to debug production issues or roll back
            reliably.
          </p>
          <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
            <strong>💡 Example:</strong> If a canary shows 3% CTR drop, you need
            to know exactly which data snapshot, feature transform version, and
            training environment produced both candidate and baseline to isolate
            root cause.
          </div>
          <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            AUTOMATED PROMOTION GATES
          </p>
          <p style="margin-top: 0">
            The registry enforces promotion policies. A candidate must beat a
            persisted baseline by pre-agreed margins before deployment
            eligibility:
          </p>
          <p style="margin-top: 8px">
            • <strong>Statistical:</strong> AUC improvement ≥0.5 points,
            calibration slope within 0.02 on top 5 traffic slices
          </p>
          <p style="margin-top: 4px">
            • <strong>Fairness:</strong> Maximum precision difference of 2%
            across protected groups
          </p>
          <p style="margin-top: 4px">
            • <strong>Operational:</strong> Model size under 500MB (mobile),
            inference latency under 100ms p99
          </p>
          <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            PRODUCTION IMPLEMENTATION
          </p>
          <p style="margin-top: 0">
            ML pipelines formalize this with validator components that compare
            candidate metrics against thresholds and only promote if validation
            passes. Central experiment registries log every training run, A/B
            test result, and deployment event—enabling fast root cause analysis
            when online metrics shift and supporting compliance audits requiring
            data provenance proof.
          </p>
        </div>
        <div
          class="card-diagram"
          style="margin-bottom: 24px; display: flex; justify-content: center"
        >
          <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
            <div style="display: flex; flex-direction: column; gap: 12px">
              <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                <strong style="font-size: 13px">Training Job Output</strong>
                <div style="font-size: 12px; margin-top: 4px">
                  Model binary (2.3 GB)
                  <br />
                  Commit: a4f3c9d
                  <br />
                  Data: s3://snap_2024_01_15
                  <br />
                  Seed: 42, GPU: V100
                </div>
              </div>
              <div style="font-size: 20px; font-weight: bold; text-align: center">
                ↓
              </div>
              <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                <strong style="font-size: 13px">Registry Promotion Gate</strong>
                <div style="font-size: 12px; margin-top: 4px">
                  AUC: 0.87 (+0.6 vs baseline ✓)
                  <br />
                  Calib slope: 0.98 (within 0.02 ✓)
                  <br />
                  Fairness delta: 1.5% (&lt;2% ✓)
                </div>
              </div>
              <div style="font-size: 20px; font-weight: bold; text-align: center">
                ↓
              </div>
              <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                <strong style="font-size: 13px">Deployed Model v87</strong>
                <div style="font-size: 12px; margin-top: 4px">
                  Eligible for staging
                  <br />
                  Full lineage stored
                  <br />
                  Rollback path preserved
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="Learn_keyTakeaways p-4 mb-4">
          <div class="Learn_keyTakeawaysHeader mb-3 pb-3">💡 Key Takeaways</div>
          <div class="d-flex flex-column gap-2">
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Exhaustive lineage includes training code hash, data snapshot
                IDs, feature definitions, hyperparameters, random seeds,
                hardware fingerprints, and computed metrics on validation slices
                for full reproducibility
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Promotion gates enforce automated policies before deployment:
                AUC improvement greater than 0.5 points, calibration slope
                within 0.02, fairness delta under 2 percent across protected
                groups, model size under 500MB for mobile
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Non determinism from floating point hardware differences, multi
                threaded randomness, and unpinned dependencies makes environment
                fingerprints essential to reproduce or roll back models reliably
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Offline metrics can lie: A candidate with 0.85 precision at k
                equals 10 on replay logs may degrade to 0.78 in production due
                to feature freshness lag or distribution shift, requiring online
                validation
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Model size and format matter for deployment: A 2 gigabyte
                TensorFlow SavedModel won't fit on mobile, quantized 200
                megabyte version runs on device with 2 percent accuracy drop but
                10x faster inference
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Centralized registries like Uber Michelangelo and Google Model
                Registry power dashboards showing training history, currently
                deployed versions per service, and A/B test results tied to each
                model version
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
                TFX ModelValidator component: Compares candidate AUC, precision,
                recall against baseline thresholds and slice metrics, only
                promotes if all gates pass, stores decision provenance in ML
                Metadata store
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">2</span>
              <span class="flex-grow-1 Learn_cardContent">
                Uber fraud model lineage: Model version 127 trained on commit
                f3a9c with data snapshot covering 2024 Jan 10 to Jan 24,
                hyperparams learning_rate 0.001, batch_size 2048, deployed to 5%
                canary on Jan 26 with rollback to v126 on Jan 27 due to p99
                latency spike
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">3</span>
              <span class="flex-grow-1 Learn_cardContent">
                Netflix recommendation registry: Tracks which model versions
                serve which UI surfaces (homepage, search, post play), offline
                replay metrics (precision at 10, NDCG at 20), online A/B test
                results (CTR lift, watch time), and data snapshot timestamps for
                compliance audits
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default LessonCiCdMlModelRegistryAndLineageCapture;
