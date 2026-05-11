import type { Component } from "solid-js";

const LessonRegulatoryComplianceCriticalTradeOffsInPrivacyCompliantMl: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Critical Trade-offs in Privacy Compliant ML
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="padding: 14px 16px; border: 2px solid; border-left: 4px solid; border-radius: 6px; margin: 0">
              <div style="font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px">
                Core Concept
              </div>
              <div style="font-size: 15px; line-height: 1.5">
                Privacy compliance creates fundamental tensions with ML
                optimization. Understanding these trade-offs helps make informed
                decisions about compliance investment versus model degradation.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              DATA VOLUME VS MINIMIZATION
            </p>
            <p style="margin-top: 0">
              ML models improve with more data, but minimization requires
              collecting only what you need. A recommendation system on 2 years
              of history outperforms 90-day retention, but regulations may
              require 90-day limits. Quantify: if 2 years yields 85% precision
              and 90 days yields 78%, is 7% worth the compliance risk?
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              MODEL QUALITY VS DELETION
            </p>
            <p style="margin-top: 0">
              When users request deletion, data is already baked into weights.
              Options: retrain from scratch (expensive, 24-48 hours), use
              machine unlearning (5-15% accuracy impact), or accept influence
              until next scheduled retrain.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Key Insight:</strong> Most companies batch deletion
              requests and retrain weekly/monthly. Immediate unlearning is
              technically possible but costly. Document your approach for
              regulators.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              LATENCY VS CONSENT CHECKS
            </p>
            <p style="margin-top: 0">
              Real-time consent verification adds 15-30ms per inference. A feed
              returning in 50ms becomes 65-80ms. At millions of requests, this
              adds significant cost. Solutions: cache consent decisions (risk:
              stale), batch lookups, or accept degraded latency.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              FEATURE RICHNESS VS AUDIT COMPLEXITY
            </p>
            <p style="margin-top: 0">
              Rich features improve models but require tracking lineage for
              every transformation. Simpler features are easier to audit and
              delete but may underperform by 10-20%.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Key Trade-off:</strong> No free lunch. Every compliance
              investment has cost—latency, accuracy, engineering time. Quantify
              trade-offs and make explicit decisions.
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
                  Data minimization conflicts with ML need for large training
                  sets—quantify accuracy trade-offs
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Deletion requires retraining or unlearning; most batch
                  deletions and retrain periodically
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Consent verification adds 15-30ms latency; cache decisions to
                  reduce impact
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
                  Quantify: if 2 years yields 85% precision vs 78% with 90 days,
                  is 7% worth compliance risk?
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Discuss batched retraining for deletion—immediate unlearning
                  is costly
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonRegulatoryComplianceCriticalTradeOffsInPrivacyCompliantMl;
