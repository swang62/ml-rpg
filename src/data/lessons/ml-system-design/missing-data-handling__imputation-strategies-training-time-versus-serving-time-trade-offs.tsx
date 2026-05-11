import type { Component } from "solid-js";

const LessonMissingDataHandlingImputationStrategiesTrainingTimeVersusServingTimeTradeOffs: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Imputation Strategies: Training Time Versus Serving Time Trade-offs
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            The choice of imputation strategy is not just a statistical
            decision. It is a system design problem that balances model
            accuracy, inference latency, engineering complexity, and training
            serving consistency. What works offline during model training often
            cannot be replicated online at 100,000 queries per second (QPS) with
            20 to 50 millisecond inference budgets. At training time, you have
            the luxury of computation. K Nearest Neighbors (KNN) imputation can
            scan historical data to find similar records and fill gaps. Model
            based imputation can train a separate regression or tree model to
            predict missing values using other features. Multiple imputation
            generates several plausible values to propagate uncertainty. These
            methods can reduce bias under Missing At Random (MAR) conditions and
            improve offline metrics. However, they are computationally
            expensive. KNN imputation over 200 million training examples with 50
            features might take hours in a batch job. Running that same
            computation online per request is impossible when your feature store
            must respond in 5 to 10 milliseconds at the 95th percentile. At
            serving time, you need deterministic, low latency fallbacks. Mean or
            median imputation with precomputed statistics is fast. Looking up a
            default constant or an unknown token embedding takes microseconds.
            Last good value within a Time To Live (TTL) window requires a single
            cache lookup. Google's production systems emphasize this: the online
            path uses simple retrieval with strict timeouts, while offline
            training uses richer imputation to get the best model. The key is
            training the model to be robust to the simple defaults it will see
            in production. If training uses KNN imputation but serving uses
            zeros, you create training serving skew. Offline AUC might be 0.85,
            but online AUC drops to 0.78 because the model learned patterns that
            do not exist at inference time. The standard approach in large scale
            systems is to unify imputation logic. Implement the same operators
            for both paths. For numeric features, compute mean or median on the
            training set and store it in the feature registry. Both offline and
            online pipelines call the same function with the same statistic. For
            categorical features, use an explicit unknown token in the embedding
            table. For tree based models like Gradient Boosted Trees, enable
            native missing value handling which learns a separate split
            direction. Netflix style personalization systems add binary
            missingness indicators as extra features. This is cheap at inference
            (one extra bit per feature) and allows the model to learn that being
            missing is itself informative. Production implementations at Uber's
            Michelangelo and Airbnb's Zipline enforce this through schema
            definitions. Each feature has a default value, TTL, and missingness
            policy stored in the feature registry. Training pipelines apply the
            policy during materialization. Serving pipelines use a backoff
            chain: online cache first, then last good value within TTL, then the
            schema default. The system logs which tier was used, enabling
            measurement of how often you fall back and the impact on model
            metrics. When a feature's missingness rate spikes above a threshold
            (for example, from 0.5% to 40% due to a client bug), automated
            gating disables that feature or diverts traffic to a fallback model
            that does not depend on it.<p></p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 540px">
              <div style="display: flex; gap: 16px">
                <div style="flex: 1; border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 14px; display: block; margin-bottom: 8px">
                    Training Time
                  </strong>
                  <div style="font-size: 12px; margin-bottom: 6px">
                    ✓ KNN imputation (hours)
                  </div>
                  <div style="font-size: 12px; margin-bottom: 6px">
                    ✓ Model based imputation
                  </div>
                  <div style="font-size: 12px; margin-bottom: 6px">
                    ✓ Multiple imputation
                  </div>
                  <div style="font-size: 12px; margin-top: 10px; padding: 6px; border-radius: 4px">
                    Offline AUC: 0.85
                  </div>
                </div>
                <div style="flex: 1; border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 14px; display: block; margin-bottom: 8px">
                    Serving Time
                  </strong>
                  <div style="font-size: 12px; margin-bottom: 6px">
                    ✓ Cache lookup (5ms p95)
                  </div>
                  <div style="font-size: 12px; margin-bottom: 6px">
                    ✓ Last good within TTL
                  </div>
                  <div style="font-size: 12px; margin-bottom: 6px">
                    ✓ Default constant
                  </div>
                  <div style="font-size: 12px; margin-top: 10px; padding: 6px; border-radius: 4px">
                    Online AUC: 0.78 (skew!)
                  </div>
                </div>
              </div>
              <div style="margin-top: 12px; padding: 10px; border: 2px solid; border-radius: 6px; text-align: center">
                <strong style="font-size: 13px">
                  Solution: Use same simple imputation in both paths →
                  Consistent 0.82 AUC
                </strong>
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
                  KNN and model based imputation improve offline metrics but
                  cannot run at 100k QPS with 5 to 10ms p95 latency budgets
                  required for online serving
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Training serving skew from different imputation methods causes
                  offline AUC of 0.85 to drop to 0.78 online, a 7 point
                  degradation that affects revenue
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Unified imputation logic with the same operators and
                  statistics in both paths prevents skew: store precomputed
                  means or unknown tokens in the feature registry
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Backoff chains for online retrieval typically follow cache
                  (microseconds), last good within TTL (milliseconds), then
                  schema default (microseconds), with logging at each tier
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Binary missingness indicators add minimal inference cost (one
                  bit per feature) and often recover 2 to 3 AUC points by
                  letting the model learn that being missing is informative
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Automated feature gating when missingness exceeds thresholds
                  (for example, 5% for critical features) protects production by
                  disabling unreliable features or routing to fallback models
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
                  E-commerce ranking at 100k QPS with 100ms p99 budget: Model
                  inference gets 20 to 50ms. Feature store must respond in 5 to
                  10ms p95 for 20 to 50 features. KNN imputation is impossible.
                  Use precomputed category medians and unknown token embeddings.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Airbnb's Zipline: Feature schema stores default values and
                  TTL. Training materializes features with those defaults.
                  Serving uses backoff: online cache, last good within 1 hour
                  TTL for demographics or 5 minutes for activity counters, then
                  default. Replay tests verify equivalence.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Uber's fraud detection: Added binary indicators for 8 high
                  missingness features (payment method, device ID). Offline
                  training with indicators plus mean imputation. Online serving
                  uses same means and indicators. Precision at 0.1 False
                  Positive Rate improved from 0.72 to 0.76.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonMissingDataHandlingImputationStrategiesTrainingTimeVersusServingTimeTradeOffs;
