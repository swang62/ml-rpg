import type { Component } from "solid-js";

const LessonForecastingAtScaleHierarchicalForecastingPredictingAcrossMillionsOfRelatedTimeSeries: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Hierarchical Forecasting: Predicting Across Millions of Related Time
            Series
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            Hierarchical forecasting tackles the challenge of predicting across
            tree or graph structures where time series aggregate naturally. A
            retailer might track 10 million Stock Keeping Unit (SKU) by store
            combinations at the leaf level, which roll up to store totals, then
            state totals, then national totals. Similarly, Uber forecasts ride
            demand at thousands of individual geohash zones that aggregate to
            districts and cities. The goal is not just accuracy at each level,
            but also coherence: parent totals must equal the sum of their
            children. The core challenge is reconciliation. When you forecast
            each level independently, the sum of store forecasts rarely matches
            the national forecast you computed separately. Reconciliation
            projects these unconstrained forecasts onto a subspace defined by
            aggregation constraints, mathematically ensuring that all totals
            align. This step often reduces error at upper levels because it
            pools information across the hierarchy. At scale, the computational
            pattern looks like this: Amazon runs forecasting pipelines that
            generate hundreds of millions of SKU location horizon predictions
            daily. With a 28 day forecast horizon and 10 million leaf series,
            you produce 280 million prediction rows. Using a gradient boosted
            tree model that scores at 10 microseconds per row on modern
            hardware, a single 64 virtual Central Processing Unit (vCPU) node
            can process roughly 6.4 million rows per second. This means 280
            million rows complete in about 45 seconds on one node, or under 10
            minutes when fanned out across 10 nodes. The trade off between
            accuracy and compute dominates design decisions. Bottom up
            forecasting, where you predict only leaves and sum upward, preserves
            granular signals but is expensive when leaves are noisy. Top down
            forecasting predicts the national total and allocates downward using
            historical proportions, which is fast and coherent by construction
            but can miss local shifts in mix. Middle out forecasts at an
            intermediate level and reconciles both directions. Optimal
            reconciliation forecasts all levels and solves a weighted linear
            system, often yielding the best accuracy but requiring covariance
            estimation and matrix operations that can take hours at million
            scale without approximation.<p></p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 12px; align-items: center">
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 180px; text-align: center">
                  <strong style="font-size: 14px">National Total</strong>
                  <div style="font-size: 12px; margin-top: 4px">1 series</div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 180px; text-align: center">
                  <strong style="font-size: 14px">State Level</strong>
                  <div style="font-size: 12px; margin-top: 4px">50 series</div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 180px; text-align: center">
                  <strong style="font-size: 14px">Store Level</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    5,000 series
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 180px; text-align: center">
                  <strong style="font-size: 14px">SKU × Store (Leaves)</strong>
                  <div style="font-size: 12px; margin-top: 4px">10M series</div>
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
                  Hierarchical forecasting predicts across tree structures where
                  children aggregate to parents, common in retail (SKU to store
                  to state to national) and marketplace applications (zone to
                  city to region)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Reconciliation ensures coherence by projecting unconstrained
                  forecasts onto aggregation constraints, mathematically forcing
                  parent totals to equal sum of children, often reducing upper
                  level error by pooling information
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  At Amazon scale, generating 280 million predictions (10
                  million leaves times 28 day horizon) takes under 10 minutes on
                  a 10 node cluster, with gradient boosted models scoring at 10
                  microseconds per row
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Bottom up preserves granular signal but is expensive for noisy
                  leaves, top down is fast and coherent but misses local mix
                  shifts, optimal reconciliation gives best accuracy but
                  requires hours at scale without approximation
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Production systems use global models that share parameters
                  across millions of series rather than local per series models,
                  amortizing training cost and enabling cold start through
                  learned embeddings
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
                  Walmart M5 competition: 42,840 hierarchical forecasts across
                  store, state, and product categories with 28 day horizon,
                  winning solutions used gradient boosted trees plus optimal
                  reconciliation
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Uber demand forecasting: Predict ride demand at thousands of
                  geohash zones, reconcile by city to keep each linear solve
                  under a few thousand nodes, finishing reconciliation in
                  seconds per city within one hour Service Level Agreement (SLA)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Amazon scale: Hundreds of millions of SKU location horizon
                  predictions daily, using global LightGBM models for base
                  forecasts then MinT style reconciliation with diagonal
                  covariance approximation
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonForecastingAtScaleHierarchicalForecastingPredictingAcrossMillionsOfRelatedTimeSeries;
