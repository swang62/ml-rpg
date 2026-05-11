import type { Component } from "solid-js";

const LessonGdprCompliancePrivacyTradeOffsUtilityVsProtection: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Privacy Trade-offs: Utility vs Protection
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <strong>The Fundamental Tension:</strong>
            Every privacy protection you add reduces either data utility or
            system performance. The art of GDPR compliance is choosing the right
            trade offs for your specific use case, not blindly applying maximum
            protection everywhere.
            <div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 8px; margin: 12px 0; align-items: stretch">
              <div style="padding: 12px; border: 2px solid; border-radius: 6px">
                <div style="font-weight: 700; margin-bottom: 4px; font-size: 13px">
                  Strong Anonymization
                </div>
                <div style="font-size: 12px">
                  Drop full IP, coarse location to city level. Lower
                  reidentification risk but 15-20% drop in fraud detection
                  accuracy.
                </div>
              </div>
              <div style="display: flex; align-items: center; font-weight: 800; font-size: 18px">
                vs
              </div>
              <div style="padding: 12px; border: 2px solid; border-radius: 6px">
                <div style="font-weight: 700; margin-bottom: 4px; font-size: 13px">
                  Pseudonymization
                </div>
                <div style="font-size: 12px">
                  Tokenize identifiers, keep linkage ability. Maintains model
                  accuracy, requires strict access controls.
                </div>
              </div>
            </div>
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Key Trade off Dimensions:
            </div>
            <strong>Latency versus control:</strong> Encrypting or tokenizing
            PII on the write path adds latency. At 50,000 writes per second,
            even 5 milliseconds extra p99 latency for tokenization is real cost.
            Some designs batch tokenization asynchronously for low priority
            data, accepting a window where raw PII exists in logs. Others choose
            synchronous protection for high risk data and pay the latency
            penalty.
            <div style="margin: 8px 0; display: flex; flex-direction: column; align-items: center">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
                Tokenization Impact at Scale
              </div>
              <div style="display: inline-flex; gap: 12px; flex-wrap: wrap; justify-content: center">
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">+5ms</div>
                  <div style="font-size: 10px; font-weight: 600">
                    ADDED LATENCY
                  </div>
                </div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">50k/s</div>
                  <div style="font-size: 10px; font-weight: 600">
                    WRITE RATE
                  </div>
                </div>
              </div>
            </div>
            <strong>Centralization versus autonomy:</strong> A central privacy
            platform gives consistent controls and easier audits but becomes a
            bottleneck for fast moving product teams. Federated approach where
            each domain manages compliance scales organizationally but increases
            risk of inconsistent policy enforcement and compliance drift.
            <strong>Strong deletion versus operational safety:</strong>{" "}
            Immediate hard deletion simplifies compliance but complicates
            debugging and rollbacks. Many companies use soft deletion plus 30
            day buffer where data is hidden from business use but restorable for
            incidents, then irreversible destruction. This balances compliance
            with operational reality.
            <strong>Compliance scope versus global architecture:</strong>{" "}
            Keeping European Union data in EU regions improves regulatory
            posture but may increase latency for cross region services from 50ms
            to 150ms and complicate global analytics. Alternatives include
            differential privacy for global aggregates or federated analytics,
            but these reduce accuracy and add complexity.
            <div style="padding: 14px 16px; border-left: 4px solid; border-radius: 0 6px 6px 0; margin: 12px 0; font-style: italic">
              <div style="font-size: 14px; line-height: 1.5">
                "The decision isn't maximum privacy everywhere. It's: what's
                your read/write ratio, data sensitivity level, and acceptable
                accuracy trade off?"
              </div>
            </div>
            <strong>When to Choose What:</strong>
            Choose strong anonymization for public datasets, research, or
            external sharing where reidentification risk is high. Choose
            pseudonymization for internal analytics where you need linkage but
            can enforce strict access controls. Choose minimal protection with
            strong access policies for real time fraud detection where
            milliseconds and accuracy matter more than theoretical
            reidentification risk.
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Strong anonymization (dropping full IP addresses, coarse
                  graining location) reduces reidentification risk but can
                  degrade fraud detection accuracy by 15 to 20 percent
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  At 50,000 writes per second, adding 5ms tokenization latency
                  is measurable cost requiring choice between synchronous
                  protection versus asynchronous batching with raw PII windows
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Centralized privacy platform provides consistent controls but
                  bottlenecks product velocity, while federated approach scales
                  organizationally but risks policy drift
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Soft deletion with 30 day buffer balances compliance (data
                  hidden from business) with operational safety (restorable for
                  debugging) before hard deletion
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Geographic data isolation (keeping EU data in EU) improves
                  regulatory posture but increases cross region latency from
                  50ms to 150ms and complicates global analytics
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
                  Fraud detection system chooses pseudonymization over
                  anonymization to maintain linkage between events, accepting
                  strict access control burden to preserve 95% accuracy
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Analytics pipeline uses asynchronous tokenization batch
                  process for low priority events, tolerating 2 hour window
                  where raw email exists in logs to avoid write path latency
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  E-commerce company implements 30 day soft deletion: order data
                  marked deleted immediately (invisible to customers and
                  business), but preserved for debugging until hard deletion
                  runs monthly
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonGdprCompliancePrivacyTradeOffsUtilityVsProtection;
