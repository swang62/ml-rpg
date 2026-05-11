import type { Component } from "solid-js";

const LessonDifferentialPrivacyCentralVsLocalDifferentialPrivacyTradeOffs: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Central vs Local Differential Privacy Trade-offs
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Central vs Local DP:</strong> Two fundamentally different
              trust models. Central DP adds noise at the aggregator after
              collecting raw data. Local DP adds noise on each device before
              data leaves. The choice determines who must be trusted and how
              much utility you sacrifice for privacy.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Central Differential Privacy
            </p>
            <p>
              A trusted curator collects raw data from users, computes
              aggregates, then adds calibrated noise before releasing results.
              Users must trust that the curator: securely stores raw data,
              applies DP correctly, and will not be compromised. Advantages:
              high utility because noise is added only once at aggregation time.
              A count of 1 million users with Laplace noise (epsilon=1) has
              error of about 1—negligible at scale. Disadvantage: single point
              of failure. If the curator is breached, all raw data is exposed.
              Privacy guarantee depends entirely on curator trustworthiness.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Local Differential Privacy
            </p>
            <p>
              Each user adds noise to their own data before sending it. Even if
              the aggregator is malicious or compromised, they receive only
              noisy data. Example: to report whether you visited a website, flip
              a biased coin. If heads, report truthfully; if tails, report
              randomly. The aggregator sees a mixture of truth and random noise,
              and cannot determine any individual response. Advantage: no trust
              required in the aggregator—privacy is cryptographically
              guaranteed. Disadvantage: noise compounds. Each user adds noise
              independently, so aggregate accuracy is much worse. To achieve
              epsilon=1 privacy with 1 million users, aggregate error is around
              1000, not 1.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Utility Gap
            </p>
            <p>
              For the same privacy guarantee (same epsilon), local DP requires
              roughly sqrt(n) times more data than central DP to achieve the
              same accuracy, where n is the number of users. With 1 million
              users, local DP needs 1000x more participants to match central DP
              accuracy. This massive utility gap makes local DP practical only
              for very high-volume applications (billions of data points) or
              when trust in any central party is unacceptable.
            </p>
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Decision Guide:</strong> Can you trust a central
              aggregator? Use central DP for 1000x better accuracy. Cannot trust
              anyone? Use local DP but expect to need massive scale for usable
              results.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 550px">
              <div style="display: flex; gap: 16px">
                <div style="flex: 1; border: 2px solid; padding: 12px; border-radius: 6px">
                  <div style="font-weight: bold; font-size: 14px; margin-bottom: 8px; text-align: center">
                    Central DP
                  </div>
                  <div style="font-size: 12px; line-height: 1.6">
                    <div style="margin-bottom: 6px">
                      User → Raw Data → Curator
                    </div>
                    <div style="margin-bottom: 6px">
                      Curator: Aggregate + Noise
                    </div>
                    <div style="margin-bottom: 6px">ε=1, n=10k → error ≈ 1</div>
                    <div style="padding: 4px; border-radius: 4px; margin-top: 8px; font-weight: bold">
                      High utility, trust required
                    </div>
                  </div>
                </div>
                <div style="flex: 1; border: 2px solid; padding: 12px; border-radius: 6px">
                  <div style="font-weight: bold; font-size: 14px; margin-bottom: 8px; text-align: center">
                    Local DP
                  </div>
                  <div style="font-size: 12px; line-height: 1.6">
                    <div style="margin-bottom: 6px">
                      User → Add Noise → Server
                    </div>
                    <div style="margin-bottom: 6px">Server: Aggregate only</div>
                    <div style="margin-bottom: 6px">
                      ε=1, n=10k → error ≈ 100
                    </div>
                    <div style="padding: 4px; border-radius: 4px; margin-top: 8px; font-weight: bold">
                      Lower utility, no trust needed
                    </div>
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
                  Central DP: trusted curator adds noise after collection, high
                  utility
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Local DP: each user adds noise before sending, no trust
                  required
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Utility gap: local DP needs sqrt(n) more data for same
                  accuracy
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
                  Central DP error on 1M users with epsilon=1: about 1. Local
                  DP: about 1000.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Local DP practical only at billions of data points scale
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonDifferentialPrivacyCentralVsLocalDifferentialPrivacyTradeOffs;
