import type { Component } from "solid-js";

const LessonRampUpStrategiesRampUpStrategiesTrafficShapingAndCohortAssignment: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Ramp Up Strategies: Traffic Shaping and Cohort Assignment
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 0; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              CONSISTENT USER ASSIGNMENT
            </p>
            <p style="margin-top: 0">
              Users must stay in the same cohort (control or canary) throughout
              the experiment. If a user flips between versions mid-session, you
              cannot attribute behavior to either. Use consistent hashing:{" "}
              <code style="padding: 2px 6px; border-radius: 3px; font-family: monospace">
                hash(user_id) mod 10000
              </code>{" "}
              maps to buckets 0-9999. At 5% canary, buckets 0-499 receive the
              new version. User 123456 maps to bucket 6456, so they stay in
              control until you ramp past 35%.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              STRATIFIED SAMPLING
            </p>
            <p style="margin-top: 0">
              Pure user ID hashing can create biased cohorts. If your hash
              function happens to put 80% mobile users in the canary when the
              population is 60% mobile, your metrics are skewed. Stratified
              sampling hashes within segments: mobile users get buckets 0-5999,
              desktop 6000-9999. Then apply the 5% threshold within each segment
              to maintain population proportions.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              CAPABILITY PROBING
            </p>
            <p style="margin-top: 0">
              Not all clients support new features. If your new model requires
              dense embeddings but 10% of users have old app versions that do
              not send them, routing those users to the canary causes 10%
              feature null rate and potential crashes. Capability probing:
              client sends{" "}
              <code style="padding: 2px 6px; border-radius: 3px; font-family: monospace">
                &#123;supports_dense_embeddings: true, app_version: 2.5&#125;
              </code>
              , server routes only capable clients to the canary.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Key Trade-off:</strong> Capability probing reduces
              sample size and skews toward newer clients. Accept the trade-off
              or ensure backward compatibility.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              INFRASTRUCTURE COST
            </p>
            <p style="margin-top: 0">
              At 80k QPS peak, 25% canary means running both versions: control
              handles 60k QPS, canary handles 20k QPS. This adds 5-10% extra
              compute during the parallel operation period. Budget for this
              overhead when planning rollout schedules.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="text-align: center; margin-bottom: 12px">
                <strong style="font-size: 14px">
                  Progressive Ramp Schedule
                </strong>
              </div>
              <div style="display: flex; flex-direction: column; gap: 8px">
                <div style="display: flex; align-items: center; gap: 8px">
                  <div style="border: 2px solid; padding: 8px 12px; border-radius: 6px; min-width: 90px; text-align: center; font-size: 12px">
                    <strong>1%</strong>
                    <div style="font-size: 11px">30 min</div>
                  </div>
                  <div style="font-size: 11px; flex: 1">
                    800 RPS • Validate latency &amp; errors
                  </div>
                </div>
                <div style="display: flex; align-items: center; gap: 8px">
                  <div style="border: 2px solid; padding: 8px 12px; border-radius: 6px; min-width: 90px; text-align: center; font-size: 12px">
                    <strong>5%</strong>
                    <div style="font-size: 11px">2 hours</div>
                  </div>
                  <div style="font-size: 11px; flex: 1">
                    4K RPS • Check CTR &amp; feature nulls
                  </div>
                </div>
                <div style="display: flex; align-items: center; gap: 8px">
                  <div style="border: 2px solid; padding: 8px 12px; border-radius: 6px; min-width: 90px; text-align: center; font-size: 12px">
                    <strong>25%</strong>
                    <div style="font-size: 11px">12 hours</div>
                  </div>
                  <div style="font-size: 11px; flex: 1">
                    20K RPS • Monitor retention proxies
                  </div>
                </div>
                <div style="display: flex; align-items: center; gap: 8px">
                  <div style="border: 2px solid; padding: 8px 12px; border-radius: 6px; min-width: 90px; text-align: center; font-size: 12px">
                    <strong>100%</strong>
                    <div style="font-size: 11px">24-48h</div>
                  </div>
                  <div style="font-size: 11px; flex: 1">
                    Full rollout after gates pass
                  </div>
                </div>
              </div>
              <div style="margin-top: 12px; padding: 8px; border: 2px solid; border-radius: 6px; font-size: 11px; text-align: center">
                <strong>Hash Buckets:</strong> User ID mod 10,000 → Bucket 0-99
                = 1%, 0-499 = 5%
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
                  Consistent hashing: hash(user_id) mod 10000 ensures users stay
                  in same cohort throughout experiment
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Stratified sampling: hash within segments (mobile, desktop) to
                  maintain population proportions and avoid bias
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Capability probing: route only clients with required features
                  to canary, avoiding null rates and crashes
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Infrastructure cost: 25% canary at 80k QPS adds 5-10% extra
                  compute during parallel operation
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
                  Explain consistent hashing with concrete example: user 123456
                  hashes to bucket 6456, stays in control until 35% ramp
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Describe stratified sampling to prevent bias: mobile (60%)
                  gets buckets 0-5999, desktop (40%) 6000-9999
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mention capability probing for backward compatibility: only
                  route clients supporting new features to canary
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonRampUpStrategiesRampUpStrategiesTrafficShapingAndCohortAssignment;
