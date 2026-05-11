import type { Component } from "solid-js";

const LessonTrainingServingSkewRobustnessEngineeringTrainingForProductionRealities: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Robustness Engineering: Training for Production Realities
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Production Environment Reality
            </p>
            <p style="margin-top: 0">
              Production serving environments are fundamentally messy: upstream
              services time out under load, caches go stale, network partitions
              cause missing features, and bursty traffic creates partial feature
              vectors. If your model only trains on clean, complete data, it
              will degrade sharply when these inevitable failures occur.
              Robustness engineering means explicitly training your model to
              handle production noise, trading a small amount of peak offline
              accuracy for much better worst case behavior.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Feature Dropout Technique
            </p>
            <p style="margin-top: 0">
              Feature dropout during training is the core technique. Randomly
              zero out 5 to 20 percent of features during each training step,
              forcing the model to learn redundant pathways and tolerate missing
              inputs. This mirrors what happens when a feature service times
              out: instead of receiving nonsensical default values the model has
              never seen, it receives zeros or nulls it was trained to handle.
              Fraud models with 15 percent feature dropout maintained 85 percent
              recall when three upstream services failed simultaneously, while
              models without dropout collapsed to 40 percent recall. The cost is
              typically 1 to 3 percent lower offline AUC.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Noise Injection
            </p>
            <p style="margin-top: 0">
              Noise injection complements dropout by matching production
              variance. If device fingerprint features are correct 95 percent of
              the time but wrong 5 percent due to spoofing or bugs, inject that
              same 5 percent corruption rate into training. If time aggregates
              have 30 second staleness on average, add random staleness to
              training features. Google's production ML guidelines recommend
              training with latency budgets: artificially time out feature
              fetches at training time with the same probability distribution as
              production timeouts.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Multi Tier Fallback
            </p>
            <p style="margin-top: 0">
              Per feature criticality and fallback strategies extend this.
              Classify features as critical, important, or auxiliary. Monitor
              critical features with tight SLAs. Netflix's recommendation system
              has three tiers: full model with all real time features (used 95
              percent of time), fallback model with only batch features (4
              percent), and popularity baseline (1 percent during incidents).
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
                  Feature dropout (randomly zero 5% to 20% of features during
                  training) forces model to tolerate production failures like
                  timeouts and missing data, costs 1% to 3% offline AUC but
                  prevents collapse during outages
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Noise injection matches production variance: if device
                  fingerprints are wrong 5% of time in production, inject 5%
                  corruption in training; if aggregates have 30 second
                  staleness, add random staleness to training
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Real impact at Mercado Libre: fraud model with 15% dropout
                  maintained 85% recall when three services failed, model
                  without dropout collapsed to 40% recall in same conditions
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Multi tier fallback strategy: Netflix uses full model with
                  real time features (95% of traffic), fallback model with batch
                  features only (4%), popularity baseline (1% during incidents)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Per feature Service Level Agreements (SLAs): critical features
                  with missing rate above 1% or latency above p95 5 milliseconds
                  trigger circuit breakers and graceful degradation to simpler
                  models
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
                  Google production ML: Train with latency budgets by
                  artificially timing out feature fetches (setting to null)
                  matching production timeout distribution, typically 2% to 5%
                  of requests per feature
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Uber trip matching: Device location features have 10% noise
                  radius in production due to GPS accuracy; training injects
                  equivalent 10 meter radius noise so model doesn't over rely on
                  precise coordinates
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Meta ad ranking: Real time user activity features unavailable
                  for 8% of requests due to cache misses; training drops these
                  features 8% of time, preventing CTR collapse when cache
                  degrades
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonTrainingServingSkewRobustnessEngineeringTrainingForProductionRealities;
