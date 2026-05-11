import type { Component } from "solid-js";

const LessonFeatureStoreArchitectureTrainingServingSkewAndDistributionDrift: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Training Serving Skew and Distribution Drift
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              What Training Serving Skew Is
            </p>
            <p style="margin-top: 0">
              Occurs when the features used during training differ from those
              served at inference, causing offline AUC to significantly exceed
              online performance. Common causes include different transformation
              code paths (training uses Spark UDFs, serving uses Python),
              incorrect time filters that leak future data into training, or
              schema mismatches where a feature type changes between offline and
              online stores. Symptoms manifest as offline AUC of 0.92 dropping
              to online AUC of 0.76. The blast radius is large: a 10 percent
              accuracy drop can reduce CTR by 15 to 25 percent.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Mitigation Through Unified Logic
            </p>
            <p style="margin-top: 0">
              Feast and Tecton enforce this by using the same transformation
              definitions for both offline backfills and online materialization.
              Airbnb Zipline requires that feature pipelines produce both
              offline datasets and online values from identical code, preventing
              divergence. Point in time joins with "as of" semantics ensure
              training examples only see features available at the example
              timestamp. Automated validation compares offline and online
              distributions using PSI or KL divergence; a PSI above 0.2 or KL
              divergence above 0.1 triggers alerts before model deployment.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Online Offline Drift
            </p>
            <p style="margin-top: 0">
              Happens when feature groups are deployed to one store without
              updating the other. Deploying a new feature view to the online key
              value store without backfilling the offline lake means training on
              old logic while serving new logic. The mitigation is versioned
              feature groups with release gates: backfill offline first,
              validate distributions match, then cut over online serving. Shadow
              reads during cutover compare both versions in production.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Late Data Drift
            </p>
            <p style="margin-top: 0">
              An event arriving 10 minutes late may miss the window close in
              streaming aggregation but appear in the next day's batch backfill,
              creating offline online count mismatches. The fix is event time
              processing with watermarks that delay window close to wait for
              late events, plus idempotent upserts keyed by entity, window end,
              and version. Compensating updates can correct closed windows when
              very late events arrive beyond the watermark.
            </p>
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Training serving skew causes offline Area Under the Curve to
                  exceed online performance (e.g., 0.92 offline dropping to 0.76
                  online), often due to different transformation code paths,
                  incorrect time filters, or schema mismatches between stores
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Unified transformation logic enforced by platforms like Feast
                  and Airbnb Zipline ensures the same code generates both
                  offline training datasets and online serving values,
                  preventing divergence and maintaining parity
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Distribution validation using Population Stability Index above
                  0.2 or Kullback Leibler divergence above 0.1 triggers alerts;
                  shadow reads during cutover compare old and new versions to
                  catch drift before it impacts users
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Versioned feature groups with release gates require
                  backfilling offline storage first, validating distribution
                  match, then cutting over online serving to prevent deploying
                  mismatched logic
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Late events in streaming cause offline online mismatches;
                  mitigation uses event time watermarks to delay window close,
                  idempotent upserts keyed by entity and window end, and
                  compensating updates for very late arrivals
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
                  A recommendation model trained with Spark User Defined
                  Functions for feature transforms but served with Python
                  transforms produced 15 percent lower precision online;
                  unifying to Python based transforms in both paths restored
                  parity
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Airbnb Zipline blocked a feature deployment when Population
                  Stability Index validation detected 0.3 divergence between
                  offline backfill and online materialization, revealing a
                  timezone bug that leaked future data into training
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonFeatureStoreArchitectureTrainingServingSkewAndDistributionDrift;
