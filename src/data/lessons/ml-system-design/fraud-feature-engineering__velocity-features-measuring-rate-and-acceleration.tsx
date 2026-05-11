import type { Component } from "solid-js";

const LessonFraudFeatureEngineeringVelocityFeaturesMeasuringRateAndAcceleration: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Velocity Features: Measuring Rate and Acceleration
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Definition:</strong> Velocity features measure the rate of
              activity over time—transactions per hour, dollars spent per day,
              login attempts per minute. Acceleration features measure how
              velocity itself is changing—is the user speeding up or slowing
              down compared to their baseline?
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Why Velocity Matters
            </p>
            <p>
              Fraudsters must act quickly—stolen credentials expire, accounts
              get locked, victims notice. This creates velocity spikes: rapid
              account creation, burst transactions, fast fund transfers. A
              legitimate user might make 3 purchases in a day; a fraudster
              drains the account in 30 minutes. Velocity separates the two even
              when individual transactions look normal.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Velocity Feature Examples
            </p>
            <p>
              Transaction velocity: transactions per hour, per day. Amount
              velocity: dollars spent per hour. Login velocity: login attempts
              per minute. Geographic velocity: unique cities accessed per hour
              (impossible physical travel indicates account sharing or
              compromise). Device velocity: unique devices used per day.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Velocity Ratios
            </p>
            <p>
              Compare current velocity to historical baseline: current_hour_txns
              / avg_hourly_txns_30d. A ratio of 5x means the user is transacting
              5 times faster than usual. Ratios normalize across users with
              different activity levels—a power user with 50 daily transactions
              and a casual user with 2 both show 5x ratio when they spike to 250
              and 10 respectively.
            </p>
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Acceleration Insight:</strong> First derivative (velocity)
              catches current spikes. Second derivative (acceleration) catches
              emerging spikes. If velocity is normal but acceleration is high,
              the user is ramping up—potentially useful for early intervention
              before velocity thresholds trigger.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Impossible Travel
            </p>
            <p>
              Geographic velocity detects physically impossible patterns:
              transactions from New York and London 30 minutes apart. Compute
              distance between consecutive transaction locations divided by time
              elapsed. Velocities exceeding airplane speed indicate compromised
              credentials or VPN usage.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="text-align: center; font-weight: 700; font-size: 14px; margin-bottom: 8px">
                  Velocity Attack Pattern
                </div>
                <div style="display: flex; justify-content: space-between; align-items: flex-end; padding: 12px; border: 2px solid; border-radius: 6px; height: 160px">
                  <div style="display: flex; flex-direction: column; align-items: center; justify-content: flex-end; gap: 4px">
                    <div style="width: 50px; border: 2px solid; height: 30px"></div>
                    <div style="font-size: 11px; font-weight: 700">
                      Min 1<br />
                      count: 2
                    </div>
                  </div>
                  <div style="display: flex; flex-direction: column; align-items: center; justify-content: flex-end; gap: 4px">
                    <div style="width: 50px; border: 2px solid; height: 75px"></div>
                    <div style="font-size: 11px; font-weight: 700">
                      Min 2<br />
                      count: 5
                    </div>
                  </div>
                  <div style="display: flex; flex-direction: column; align-items: center; justify-content: flex-end; gap: 4px">
                    <div style="width: 50px; border: 2px solid; height: 130px"></div>
                    <div style="font-size: 11px; font-weight: 700">
                      Min 3<br />
                      count: 12
                    </div>
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px; margin-top: 8px">
                  <strong style="font-size: 13px">Acceleration Signal</strong>
                  <div style="margin-top: 6px; font-size: 12px">
                    Rate change: +3, then +7
                    <br />
                    Acceleration: rising (7 &gt; 3)
                    <br />
                    Decision: Block, escalating attack detected
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
                  Velocity features (transactions/hour, dollars/day) capture
                  fraudster urgency—they must act fast before detection
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Velocity ratios (current vs 30-day baseline) normalize across
                  users with different activity levels
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Acceleration (second derivative) catches emerging spikes
                  before velocity thresholds trigger—useful for early
                  intervention
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
                  Geographic velocity detects impossible travel: NYC to London
                  in 30 minutes indicates compromised credentials
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  A 5x velocity ratio means transacting 5x faster than
                  usual—same signal whether power user or casual user
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonFraudFeatureEngineeringVelocityFeaturesMeasuringRateAndAcceleration;
