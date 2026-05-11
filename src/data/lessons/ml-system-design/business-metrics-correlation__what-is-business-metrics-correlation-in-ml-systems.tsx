import type { Component } from "solid-js";

const LessonBusinessMetricsCorrelationWhatIsBusinessMetricsCorrelationInMlSystems: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            What is Business Metrics Correlation in ML Systems?
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
                <strong>Business metrics correlation</strong> is the practice of
                linking ML model performance metrics to business outcomes,
                enabling you to understand how model improvements translate to
                revenue, engagement, or efficiency gains.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              THE DISCONNECT PROBLEM
            </p>
            <p>
              ML teams optimize for model metrics: accuracy, AUC, NDCG. Business
              teams care about revenue, conversion rate, customer retention.
              Without correlation, a model improvement (AUC +2%) might have no
              business impact—or even hurt business metrics due to unintended
              side effects.
            </p>
            <p>
              This disconnect creates two problems. First, you cannot prioritize
              model work effectively. Should you improve click prediction
              accuracy or reduce latency? Without knowing which impacts revenue
              more, you are guessing. Second, you cannot justify ML investment.
              If you cannot show that a 5% AUC improvement generated $500K in
              additional revenue, ML becomes a cost center rather than a profit
              driver.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              THE METRIC CHAIN
            </p>
            <p>
              Model metrics → Proxy metrics → Business metrics form a causal
              chain. A recommendation model improves its NDCG score. This leads
              to better click-through rate (proxy metric). Higher CTR leads to
              more purchases (business metric). Each link in this chain has a
              correlation coefficient that determines how much improvement
              propagates.
            </p>
            <p>
              The challenge: correlations are not constant. A 5% NDCG
              improvement might yield 3% CTR improvement in one context and 0.5%
              in another. Context includes user segment, product category, time
              of year, and competitive environment.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              WHAT MAKES THIS HARD
            </p>
            <p>
              <strong>Confounders:</strong> Multiple factors affect business
              metrics simultaneously. Did revenue increase because of the model
              or because of a marketing campaign? Isolating model impact
              requires careful experimental design.
            </p>
            <p>
              <strong>Lag:</strong> Business metrics may lag model changes by
              days or weeks. A better recommendation model affects today clicks
              but next month purchases.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Key Insight:</strong> Correlation is not causation.
              Strong correlation between model metrics and business metrics does
              not mean improving the model will improve business—you need
              controlled experiments to establish causation.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 12px; align-items: center">
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 160px; text-align: center">
                  <strong style="font-size: 14px">Technical Metrics</strong>
                  <div style="font-size: 12px; margin-top: 6px">
                    P95 Latency: 450ms
                    <br />
                    AUC: 0.82
                    <br />
                    Error Rate: 0.1%
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 160px; text-align: center">
                  <strong style="font-size: 14px">Correlation Analysis</strong>
                  <div style="font-size: 12px; margin-top: 6px">
                    Pearson: 0.65
                    <br />
                    Lag: 2 hours
                    <br />
                    Segment: Mobile
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 160px; text-align: center">
                  <strong style="font-size: 14px">Business Metrics</strong>
                  <div style="font-size: 12px; margin-top: 6px">
                    Conversion: 3.2%
                    <br />
                    Revenue/User: $42
                    <br />
                    30d Retention: 68%
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
                  ML teams optimize model metrics (AUC, NDCG); business cares
                  about revenue, conversion, retention—correlation bridges this
                  gap
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Metric chain: model metrics → proxy metrics → business
                  metrics, each link has context-dependent correlation
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Challenges: confounders obscure true impact, business metrics
                  may lag model changes by days or weeks
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
                  Interview Tip: Explain the metric chain concept—how NDCG
                  improvement flows through CTR to revenue.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Discuss why correlation is insufficient—you
                  need controlled experiments to establish causation.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonBusinessMetricsCorrelationWhatIsBusinessMetricsCorrelationInMlSystems;
