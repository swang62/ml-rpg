import type { Component } from "solid-js";

const LessonAdversarialRobustnessRealWorldTradeOffsWhenToUseAdversarialDefensesVsAlternatives: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Real World Trade-offs: When to Use Adversarial Defenses vs
            Alternatives
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              When Adversarial Defenses Are Worth It
            </p>
            <p>
              Invest in adversarial robustness when: attack success has high
              cost (financial fraud, account takeover), attackers are
              sophisticated and adaptive, you have evidence of adversarial
              behavior in production. Skip expensive defenses when: attacks are
              opportunistic rather than targeted, simple rules catch most fraud,
              model decisions are human-reviewed anyway.
            </p>
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Decision Framework:</strong> Cost of successful attack ×
              attack probability &gt; cost of defense implementation. If the
              math does not work, simpler alternatives may be better
              investments.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Alternatives to Consider
            </p>
            <p>
              Human review for edge cases: rather than making models robust to
              all attacks, route uncertain predictions to human analysts. Rate
              limiting: restrict how many transactions attackers can test,
              reducing their ability to probe your model. Delayed decisions:
              hold funds for 24-48 hours, allowing slow-path analysis before
              releasing high-risk transactions.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Cost-Benefit Analysis
            </p>
            <p>
              Adversarial training adds 2-10x training cost plus 2-5% accuracy
              drop. Ensemble defenses multiply inference cost by model count.
              Human review costs per-transaction analyst time. Calculate
              break-even: how many attacks must defenses prevent to justify
              their cost? This varies dramatically by business context.
            </p>
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Practical Insight:</strong> Most fraud systems get more
              value from faster model updates (catching new attack patterns
              quickly) than from adversarial robustness (resisting known attack
              patterns better). Invest in deployment velocity first.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Hybrid Approaches
            </p>
            <p>
              Combine defenses pragmatically: use adversarial training for the
              core model, simple rules for obvious attacks, human review for
              edge cases, rate limiting to slow attackers. No single technique
              solves adversarial robustness—layer defenses based on
              cost-effectiveness.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="text-align: center; font-weight: 700; margin-bottom: 8px; font-size: 15px">
                  Defense Strategy Decision Tree
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    High Stakes + High Throughput
                  </strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    → Adversarial training (accept 3-4x cost, 2-3% accuracy
                    drop)
                    <br />
                    Example: Payment fraud, content moderation
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Tight Latency (&lt;10ms) or Budget
                  </strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    → Rules + lightweight anomaly detection (1-3ms overhead)
                    <br />
                    Example: Real time bidding, mobile apps
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">Moderate Risk</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    → Diversity injection + rate limiting (minimal cost)
                    <br />
                    Example: Recommendation ranking, search suggestions
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Offline Risk Quantification
                  </strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    → Certified defenses (32-256x latency, not for serving)
                    <br />
                    Example: Security audits, compliance reports
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
                  Invest in adversarial robustness when attack cost ×
                  probability exceeds defense cost—skip if math does not work
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Alternatives: human review for edge cases, rate limiting to
                  slow probing, delayed decisions for high-risk transactions
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Faster model updates often provide more value than adversarial
                  robustness—invest in deployment velocity first
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
                  Calculate break-even: how many attacks must defenses prevent
                  to justify 2-10x training cost plus accuracy drop?
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Combine pragmatically: adversarial training for core model,
                  rules for obvious attacks, human review for edge cases
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonAdversarialRobustnessRealWorldTradeOffsWhenToUseAdversarialDefensesVsAlternatives;
