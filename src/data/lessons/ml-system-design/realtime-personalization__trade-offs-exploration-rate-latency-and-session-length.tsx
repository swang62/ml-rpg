import type { Component } from "solid-js";

const LessonRealtimePersonalizationTradeOffsExplorationRateLatencyAndSessionLength: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Trade-offs: Exploration Rate, Latency, and Session Length
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              EXPLORATION RATE TRADEOFF
            </p>
            <p style="margin-top: 0">
              More exploration (10-20% of traffic) means faster learning about
              new items and changing preferences, but it shows suboptimal items
              to real users, reducing short term revenue. Less exploration
              (1-5%) protects revenue but adapts slowly. A product catalog that
              changes weekly needs more exploration than one that changes
              monthly. Start with 5-10% and adjust based on regret metrics.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              LATENCY VS PERSONALIZATION DEPTH
            </p>
            <p style="margin-top: 0">
              Richer context (100+ features) improves predictions but increases
              inference time. A linear model with 20 features runs in 1ms. A
              neural network with 200 features takes 20ms. For real-time
              personalization with 100ms budget, you might afford one neural
              model or five linear models. Choose based on how much lift
              additional features provide.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>🎯 Decision Framework:</strong> Use bandits when you need
              continuous learning (changing catalog, cold start). Use session
              models when sequences strongly predict intent (e-commerce
              browsing). Use both when you need sequence understanding plus
              exploration.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              SESSION LENGTH CONSIDERATIONS
            </p>
            <p style="margin-top: 0">
              Short sessions (1-3 actions) have little signal; fall back to
              historical or popular. Medium sessions (4-15 actions) benefit most
              from real-time personalization. Long sessions (20+ actions) may
              indicate confused users who need help, not more personalization.
              Tailor strategy to session length distribution in your product.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              WHEN NOT TO USE REAL-TIME PERSONALIZATION
            </p>
            <p style="margin-top: 0">
              Skip it when session intent rarely differs from historical
              (subscription services with stable preferences), when catalog is
              small (fewer than 1,000 items), or when users browse randomly
              without clear sequences. The infrastructure cost is only justified
              when conversion lift exceeds 10%.
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
                  Exploration 10-20% learns fast but hurts short-term revenue;
                  1-5% protects revenue but adapts slowly
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Linear model with 20 features: 1ms. Neural net with 200
                  features: 20ms. Budget accordingly.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Bandits for continuous learning, session models for sequence
                  prediction, both for full coverage
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Short sessions (1-3 actions): use historical. Medium (4-15):
                  real-time shines. Long (20+): user might be confused
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Skip real-time personalization if conversion lift is under 10%
                  - infrastructure cost is not justified
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
                  Discuss exploration rate: weekly catalog changes need 10%,
                  monthly changes need 3%
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Walk through latency budget: 100ms allows one neural model or
                  five linear models
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Explain when to skip: stable subscription preferences, small
                  catalogs under 1000 items
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonRealtimePersonalizationTradeOffsExplorationRateLatencyAndSessionLength;
