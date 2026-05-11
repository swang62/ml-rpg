import type { Component } from "solid-js";

const LessonTrainingServingSkewWhatIsTrainingServingSkewAndWhyDoesItMatter: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            What is Training Serving Skew and Why Does It Matter?
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
                <strong>Training serving skew</strong> is the systematic
                mismatch between what a model experiences during training versus
                what it encounters in production. It spans feature computation
                (batch joins vs real time lookups), data distributions
                (historical vs live traffic), software environments (library
                versions, numeric precision), and feedback loops (model outputs
                influencing future training data).
              </div>
            </div>
            <p style="margin-top: 16px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Impact on Metrics
            </p>
            <p style="margin-top: 0">
              The impact shows up as a gap between offline and online metrics.
              Your model might achieve 0.92 AUC on validation data but drop to
              0.78 in production. Netflix might see a recommendation model
              perform well in backtesting but fail to improve CTR when deployed.
              Google's search ranking might show strong offline relevance scores
              but poor user engagement online.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Business Consequences
            </p>
            <p style="margin-top: 0">
              This matters because skew directly translates to lost revenue and
              user trust. At scale, even a 1 percent degradation in prediction
              quality can mean millions in lost transactions for fraud
              detection, or significant drops in user engagement for feed
              ranking. The challenge grows exponentially with complexity: if you
              have N independent upstream data sources that can each drift or
              fail, your consistency probability degrades roughly as 1 divided
              by 2 to the power of N unless you actively design against it.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              System Design Concern
            </p>
            <p style="margin-top: 0">
              Prevention requires treating skew as a first class system design
              concern, not just a data science problem. It spans data
              engineering (how features are built), model training (what the
              model learns), serving infrastructure (how predictions run), and
              monitoring (catching drift before users do).
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; gap: 24px; align-items: flex-start; justify-content: center">
                <div style="display: flex; flex-direction: column; gap: 10px; align-items: center">
                  <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; min-width: 160px; text-align: center">
                    <strong style="font-size: 13px">Training Time</strong>
                  </div>
                  <div style="border: 2px solid; padding: 8px 12px; border-radius: 6px; font-size: 11px; text-align: center">
                    Batch joins
                    <br />
                    Historical data
                    <br />
                    Python 3.8
                    <br />
                    float64 precision
                    <br />
                    AUC: 0.92
                  </div>
                </div>
                <div style="font-size: 32px; font-weight: bold; align-self: center">
                  ≠
                </div>
                <div style="display: flex; flex-direction: column; gap: 10px; align-items: center">
                  <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; min-width: 160px; text-align: center">
                    <strong style="font-size: 13px">Serving Time</strong>
                  </div>
                  <div style="border: 2px solid; padding: 8px 12px; border-radius: 6px; font-size: 11px; text-align: center">
                    Real time lookups
                    <br />
                    Live traffic
                    <br />
                    C++ runtime
                    <br />
                    float32 precision
                    <br />
                    AUC: 0.78
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
                  Skew manifests across four dimensions: data distributions
                  (covariate shift, concept drift), feature computation methods
                  (batch versus online), software stacks (library versions,
                  precision), and behavioral feedback loops (position bias in
                  ranking)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Real impact at scale: Uber fraud detection serving 100,000
                  predictions per second might see 5% to 10% accuracy drop from
                  skew, translating to millions in fraud losses or false
                  declines
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Complexity amplifies risk: A recommendation system touching 10
                  upstream data sources where each has 95% reliability yields
                  only 60% probability all features are correct simultaneously
                  (0.95 to the power of 10)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Skew is rarely one bug but an accumulation across layers:
                  offline feature pipelines, training data assembly, model
                  packaging, runtime constraints like timeouts and cache
                  staleness
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
                  Meta feed ranking trains on week old engagement data but
                  serves against real time user context, causing skew when
                  trending topics emerge
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Netflix recommendation model uses batch computed user
                  preference vectors in training (updated daily) but real time
                  vectors at serving (updated per session), creating
                  distribution mismatches
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Google Ads bidding model trains with complete historical
                  advertiser spend data but serves with 5 minute aggregates due
                  to latency budgets, missing recent campaign changes
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonTrainingServingSkewWhatIsTrainingServingSkewAndWhyDoesItMatter;
