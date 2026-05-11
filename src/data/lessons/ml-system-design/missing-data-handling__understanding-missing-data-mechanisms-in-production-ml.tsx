import type { Component } from "solid-js";

const LessonMissingDataHandlingUnderstandingMissingDataMechanismsInProductionMl: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Understanding Missing Data Mechanisms in Production ML
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            Missing data in production machine learning systems is not random
            noise to ignore. It has structure and causes that directly impact
            model quality. The mechanism behind missingness determines whether
            simple fixes work or introduce silent bias that degrades your system
            over time. There are three fundamental mechanisms. Missing
            Completely At Random (MCAR) means the probability of missingness has
            no relationship to any variable in your dataset. For example, a
            sensor randomly fails 0.5% of the time due to hardware flaws.
            Missing At Random (MAR) means missingness depends on observed
            variables but not the missing value itself. For instance, mobile
            users are 10% more likely to have missing location features than
            desktop users, but among mobile users the missingness does not
            depend on their actual location. Missing Not At Random (MNAR) means
            the probability of being missing depends on the unobserved value.
            High income users might be 3x more likely to opt out of sharing
            income data, creating systematic gaps in your wealthiest segment.
            The mechanism matters because imputation strategies that work under
            MCAR or MAR can create serious bias under MNAR. If you use mean
            imputation when high spenders systematically hide their data, you
            will underestimate their value and misdirect marketing spend. A
            recommendation system at scale might see 2% overall missingness in
            purchase history features, but if that 2% represents your highest
            value customers blocking tracking, your model's calibration for that
            segment degrades. Offline Area Under Curve (AUC) might stay at 0.85,
            but conversion rate for the hidden segment drops 15% because the
            model learned to optimize for the visible majority. In practice, you
            identify mechanisms through sensitivity analysis and proxy
            variables. Check if missingness correlates with other features. If
            users with missing income also have missing education and premium
            subscriptions, that pattern suggests MAR or MNAR rather than random
            sensor failure. Production systems at companies like Uber and Airbnb
            handle this by adding explicit missingness indicators as features,
            allowing the model to learn patterns in what is missing, and by
            setting segment specific defaults rather than global means when MNAR
            is suspected.<p></p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 14px">
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px">
                  <strong style="font-size: 14px">
                    MCAR: Random Sensor Failure
                  </strong>
                  <div style="margin-top: 6px; font-size: 13px">
                    0.5% missingness across all users uniformly
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px">
                  <strong style="font-size: 14px">
                    MAR: Mobile Users Missing Location
                  </strong>
                  <div style="margin-top: 6px; font-size: 13px">
                    10% on mobile vs 1% on desktop (depends on device)
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px">
                  <strong style="font-size: 14px">
                    MNAR: High Earners Opt Out
                  </strong>
                  <div style="margin-top: 6px; font-size: 13px">
                    Income &gt;$200K: 15% missing | &lt;$50K: 2% missing
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
                  MCAR allows simple mean or median imputation with minimal bias
                  if missingness is below 1 to 2 percent of your dataset
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  MAR can be handled by conditional imputation based on observed
                  features, such as using device specific means for mobile
                  versus desktop cohorts
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  MNAR creates systematic bias that cannot be fixed by
                  imputation alone, requiring explicit missingness indicators
                  and segment specific model calibration
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Production impact is measurable: MNAR in a high value segment
                  can cause 15% conversion rate drops even when overall offline
                  AUC remains stable at 0.85
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Detection involves checking correlations between missingness
                  patterns and other features, then testing model performance
                  across segments with different missingness rates
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
                  E-commerce system: Users blocking tracking have 40% missing
                  purchase history. Mean imputation treats them as average
                  spenders. Model underserves this segment, reducing revenue by
                  $2M per quarter from high value customers.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Uber trip features: Mobile app version 2.3 has 8% missing GPS
                  accuracy versus 1% on version 2.4. This is MAR since it
                  depends on observed app version. Use version specific defaults
                  rather than global mean.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Airbnb pricing model: Hosts with premium listings are 3x more
                  likely to hide cost data. MNAR mechanism. Adding a binary
                  missing indicator feature improved price prediction Mean
                  Absolute Percentage Error (MAPE) from 18% to 14% for that
                  segment.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonMissingDataHandlingUnderstandingMissingDataMechanismsInProductionMl;
