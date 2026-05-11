import type { Component } from "solid-js";

const LessonForecastingAtScaleGlobalModelsForecastingMillionsOfSeriesWithSharedParameters: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Global Models: Forecasting Millions of Series with Shared Parameters
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            The fundamental scalability choice in large scale forecasting is
            between local models that fit one model per series versus global
            models that share parameters across many series. Local models train
            independently on each time series, which means training 10 million
            models for 10 million SKU store combinations. This approach scales
            linearly with series count and quickly becomes prohibitive. A simple
            Seasonal Autoregressive Integrated Moving Average (ARIMA) model
            might take 5 seconds to fit, resulting in 50 million seconds or
            roughly 580 days of serial compute time for 10 million series.
            Global models train once and predict many. A gradient boosted tree
            or neural network learns patterns across all series simultaneously
            by treating series identity as a feature. Modern approaches use
            embeddings to capture per series or per branch idiosyncrasies within
            a shared model structure. Neural models like Neural Basis Expansion
            Analysis for Time Series (N-BEATS) or N-HiTS encode series identity
            through learnable embedding vectors, allowing the model to
            specialize its internal representations while sharing all weights.
            Training a single global LightGBM model on 10 million series with 90
            days of history might take 2 to 4 hours on a 64 core machine, versus
            months for local models. The practical win is inference speed. Once
            trained, a global gradient boosted tree scores a single row in
            roughly 10 microseconds. To generate a 28 day forecast for 10
            million leaves you score 280 million rows, which completes in 45
            seconds on one 64 vCPU node or under 10 minutes across a 10 node
            cluster. Global models also handle cold start naturally: new SKUs or
            stores get predictions immediately through their embeddings and
            shared patterns, whereas local models have no data to train on until
            weeks of history accumulate. The trade off is expressiveness versus
            variance. Global models may underfit highly unique series or
            struggle when the population is heterogeneous. For example, a
            fashion retailer with seasonal apparel and stable staples in the
            same hierarchy might see the global model compress both into a
            middle ground. Companies address this by segmenting into multiple
            global models per category or maintaining a small set of local
            override models for the top 1 percent of high revenue series. Airbnb
            style marketplaces segment by geography and property type, training
            separate global models per segment, then reconcile within each
            segment independently.<p></p>
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Local models train one model per series, scaling linearly and
                  taking months of compute for millions of series (example: 5
                  seconds per ARIMA fit times 10 million series equals 580 days
                  of serial time)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Global models train once across all series, using series
                  identity or embeddings as features, reducing training time
                  from months to 2 to 4 hours for 10 million series on a 64 core
                  machine
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Inference with global models is fast: gradient boosted trees
                  score at 10 microseconds per row, generating 280 million
                  predictions in under 10 minutes on a 10 node cluster
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Cold start problem solved naturally: new SKUs or stores get
                  immediate predictions through shared patterns and embeddings,
                  versus local models needing weeks of history before first
                  forecast
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Trade off is underfitting heterogeneous series: global models
                  may compress diverse behaviors, mitigated by segmenting into
                  multiple global models per category or maintaining local
                  overrides for top 1 percent revenue series
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
                  Amazon scale: Single global LightGBM model forecasts hundreds
                  of millions of SKU location combinations, using hashed
                  categorical features for product and location embeddings
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Airbnb demand: Segment by geography and property type, train
                  separate global neural models per segment, each covering
                  thousands of listings, reconcile bookings at market level for
                  capacity planning
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Uber demand: Global model across geohash zones with zone
                  embeddings, time features, and lagged demand, trained weekly
                  and deployed for real time inference at thousands of Queries
                  Per Second (QPS)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonForecastingAtScaleGlobalModelsForecastingMillionsOfSeriesWithSharedParameters;
