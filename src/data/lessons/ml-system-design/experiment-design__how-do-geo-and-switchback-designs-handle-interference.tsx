import type { Component } from "solid-js";

const LessonExperimentDesignHowDoGeoAndSwitchbackDesignsHandleInterference: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            How Do Geo and Switchback Designs Handle Interference?
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
                <strong>Geo-cluster</strong> and <strong>switchback</strong>
                experiments address interference where user-level randomization
                creates contamination. They randomize at region or time-period
                level instead.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Interference Problem
            </p>
            <p style="margin-top: 0">
              In a two-sided marketplace, treating some buyers but not others in
              the same city affects supply availability for all. If treatment
              buyers get faster matching, they consume driver supply that
              control buyers would have used. User-level effects spill over,
              biasing your estimates.
            </p>
            <p>
              Social networks have similar issues: if treatment users share
              more, control users see more content. The control experience is
              contaminated by treatment effects.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Geo-Cluster Design
            </p>
            <p style="margin-top: 0">
              Randomize entire cities or regions. Chicago gets treatment,
              Detroit gets control. All users in a region have same experience,
              eliminating within-region spillover. Trade-off: you need many
              regions for statistical power. With 50 cities, you have 25 units
              per arm - high variance.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Key Insight:</strong> Synthetic control methods compare
              treatment regions to weighted combinations of control regions
              matched on pre-experiment trends. This reduces variance when
              region count is limited.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Switchback Design
            </p>
            <p style="margin-top: 0">
              Alternate treatment and control over time periods (hours, days)
              within each region. 9-10am treatment, 10-11am control, etc. This
              multiplies effective sample by number of time periods. Trade-off:
              carryover effects between periods can contaminate results.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 540px">
              <div style="display: flex; gap: 14px">
                <div style="flex: 1; display: flex; flex-direction: column; gap: 10px">
                  <div style="text-align: center; font-weight: bold; font-size: 13px; margin-bottom: 4px">
                    Geo Cluster
                  </div>
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                    <strong style="font-size: 12px">City A</strong>
                    <div style="font-size: 11px; margin-top: 4px">
                      Treatment
                    </div>
                  </div>
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                    <strong style="font-size: 12px">City B</strong>
                    <div style="font-size: 11px; margin-top: 4px">Control</div>
                  </div>
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                    <strong style="font-size: 12px">City C</strong>
                    <div style="font-size: 11px; margin-top: 4px">
                      Treatment
                    </div>
                  </div>
                  <div style="font-size: 10px; margin-top: 4px; text-align: center; font-weight: bold">
                    No interference
                  </div>
                </div>
                <div style="flex: 1; display: flex; flex-direction: column; gap: 10px">
                  <div style="text-align: center; font-weight: bold; font-size: 13px; margin-bottom: 4px">
                    Switchback
                  </div>
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                    <strong style="font-size: 12px">Hour 1</strong>
                    <div style="font-size: 11px; margin-top: 4px">
                      Treatment
                    </div>
                  </div>
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                    <strong style="font-size: 12px">Hour 2</strong>
                    <div style="font-size: 11px; margin-top: 4px">Control</div>
                  </div>
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                    <strong style="font-size: 12px">Hour 3</strong>
                    <div style="font-size: 11px; margin-top: 4px">
                      Treatment
                    </div>
                  </div>
                  <div style="font-size: 10px; margin-top: 4px; text-align: center; font-weight: bold">
                    Time isolation
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
                  User-level randomization fails when treatment effects spill
                  over to control users (marketplace, social)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Geo-cluster randomizes entire regions but needs many regions
                  (50+) for statistical power
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Synthetic control matches treatment regions to weighted
                  control combinations for variance reduction
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Switchback alternates treatment/control over time but risks
                  carryover effects between periods
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
                  When asked about marketplace experiments: explain supply-side
                  spillover where treatment consumes shared resources
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  For geo design: mention 50+ regions needed for power,
                  synthetic control for limited regions
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonExperimentDesignHowDoGeoAndSwitchbackDesignsHandleInterference;
