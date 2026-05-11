import type { Component } from "solid-js";

const LessonSearchPersonalizationTrainingPipelineAndOfflineBatchFeatureComputation: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Training Pipeline and Offline Batch Feature Computation
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 0; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Training Data for Personalization Models
            </p>
            <p style="margin-top: 0">
              Personalization models train on logged interactions: (user, query,
              item, context, outcome) tuples. The challenge: you need both
              long-term and short-term features reconstructed at training time.
              This means joining user profile snapshots with session logs at the
              exact timestamp of each interaction. Using current user profiles
              for historical interactions leaks future information.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Offline Feature Computation
            </p>
            <p style="margin-top: 0">
              Long-term user features (profile embeddings, category preferences,
              price sensitivity) are computed in daily batch jobs. Process:
              aggregate last 90 days of user interactions, compute feature
              values, store in offline feature store. These features change
              slowly, so daily refresh is sufficient. For training, snapshot
              these features and join by timestamp: training example from March
              5th uses the user profile as it existed on March 5th, not today's
              profile.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Reconstructing Session Features for Training
            </p>
            <p style="margin-top: 0">
              Session features (clicks before this search, session embedding)
              must be reconstructed from logs. For a search at timestamp T, find
              all clicks by that user in the same session before T. Compute
              session embedding from those clicks. This is expensive: for each
              training example, replay the session up to that point.
              Optimization: pre-compute session state at regular checkpoints
              (every 5 minutes), then compute delta from checkpoint to example
              time.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Point-in-Time Correctness
            </p>
            <p style="margin-top: 0">
              Every feature must reflect its value at interaction time, not
              current time. User profile: use March 5th snapshot for March 5th
              examples. Session features: only include clicks before the search,
              not after. Item features: use item embedding as it existed then
              (items change: titles update, prices change). This prevents the
              model from learning to use future information that won't be
              available at serving time.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Serving-Training Parity
            </p>
            <p style="margin-top: 0">
              The same feature computation code must run in both training and
              serving. If offline batch uses Python and online serving uses
              Java, subtle differences cause training-serving skew. Solution:
              define features in a shared language or format, generate code for
              both environments, run automated tests comparing offline and
              online feature values for sampled examples. A 2% feature drift can
              cause 5-10% model quality degradation.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 560px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Raw Event Logs (HDFS/S3)
                  </strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Clicks, bookings, dwell time | Billions of events/day
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Feature Computation (Daily Batch)
                  </strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Sessionize (30 min gap) | Long-term aggregates
                    <br />
                    Category prefs, avg price, item quality | Parquet tables
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="display: flex; gap: 10px">
                  <div style="flex: 1; border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                    <strong style="font-size: 12px">Embedding Training</strong>
                    <div style="font-size: 11px; margin-top: 4px">
                      Skip-gram on 800M sessions
                      <br />
                      32D vectors | Weekly on GPU
                      <br />
                      Model Registry
                    </div>
                  </div>
                  <div style="flex: 1; border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                    <strong style="font-size: 12px">Ranker Training</strong>
                    <div style="font-size: 11px; margin-top: 4px">
                      GBDT 50 to 90 features
                      <br />
                      Billions of examples | Daily
                      <br />
                      NDCG, AUC validation
                    </div>
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">
                    Feature Parity Test + A/B Deploy
                  </strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Offline vs online feature check (5% tolerance)
                    <br />
                    Replay simulator | Production rollout if pass
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
                  Training data joins user profiles, session logs, and item
                  features at exact interaction timestamp to avoid future
                  leakage
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Long-term features computed in daily batch from 90-day
                  history; stored with timestamps for point-in-time joins
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Session features reconstructed by replaying clicks before each
                  training example; checkpoint optimization reduces cost
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Point-in-time correctness: every feature must reflect value at
                  interaction time, not current time
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Serving-training parity: same code path for both; 2% feature
                  drift causes 5-10% quality degradation
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
                  Explain session reconstruction: for search at time T, replay
                  all clicks in that session before T
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mention the checkpoint optimization: pre-compute session state
                  every 5 minutes, compute delta to example time
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Emphasize point-in-time: March 5th example uses March 5th user
                  profile snapshot, not today's profile
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonSearchPersonalizationTrainingPipelineAndOfflineBatchFeatureComputation;
