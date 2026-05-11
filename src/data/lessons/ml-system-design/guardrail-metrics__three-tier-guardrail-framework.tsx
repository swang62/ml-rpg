import type { Component } from "solid-js";

const LessonGuardrailMetricsThreeTierGuardrailFramework: Component = () => (
  <div class="lesson-content">
    <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
      <div class="mb-4 p-4">
        <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
          Three-Tier Guardrail Framework
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
              The <strong>three-tier framework</strong> organizes guardrails by
              response time: immediate (real-time), session-level (same day),
              and long-term (weeks). Each tier has different detection speed vs
              accuracy trade-offs.
            </div>
          </div>
          <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            Tier 1: Immediate Guardrails
          </p>
          <p style="margin-top: 0">
            Detect within minutes to hours. Error rates, crash rates, latency
            p99. These catch catastrophic failures fast. Threshold example:
            &gt;1% error rate increase triggers automatic rollback. Measured via
            real-time streaming, checked every 5-15 minutes.
          </p>
          <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            Tier 2: Session-Level Guardrails
          </p>
          <p style="margin-top: 0">
            Detect within hours to 1 day. Session completion rate, add-to-cart
            rate, bounce rate. These catch UX degradation before it compounds.
            Threshold example: &gt;5% session bounce increase blocks experiment.
            Requires waiting for sessions to complete before measurement.
          </p>
          <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            Tier 3: Long-Term Guardrails
          </p>
          <p style="margin-top: 0">
            Detect over days to weeks. 7-day retention, repeat purchase rate,
            NPS. These catch delayed harm that session metrics miss. Threshold
            example: &gt;2% retention drop stops experiment. Requires longer
            runtime but catches the most important issues.
          </p>
          <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
            <strong>💡 Key Insight:</strong> Tier 1 guardrails auto-rollback
            without human review. Tier 2 pauses for investigation. Tier 3
            informs ship/no-ship decision but experiment continues while
            measuring.
          </div>
          <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            Action Matrix
          </p>
          <p style="margin-top: 0">
            Each tier has a response: Tier 1 = auto-rollback (immediate), Tier 2
            = pause + alert (same day), Tier 3 = decision input (end of
            experiment). This tiered approach balances speed with thoroughness.
          </p>
        </div>
        <div
          class="card-diagram"
          style="margin-bottom: 24px; display: flex; justify-content: center"
        >
          <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 560px">
            <div style="display: flex; flex-direction: column; gap: 10px">
              <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px">
                <strong style="font-size: 14px">Impact Guardrail</strong>
                <div style="margin-top: 6px; font-size: 13px">
                  Trigger: percent_change &lt; −T
                  <br />
                  Example: −0.6% revenue (T=0.5%), p=0.15 → ESCALATE
                  <br />
                  Purpose: Catch large potential harms early
                </div>
              </div>
              <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px">
                <strong style="font-size: 14px">Power Guardrail</strong>
                <div style="margin-top: 6px; font-size: 13px">
                  Trigger: standard_error &gt; 0.8 × T<br />
                  Example: SE=0.5% (T=0.5%) → NOT POWERED
                  <br />
                  Purpose: Ensure sensitivity to detect harm
                </div>
              </div>
              <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px">
                <strong style="font-size: 14px">
                  Stat-Sig Negative Guardrail
                </strong>
                <div style="margin-top: 6px; font-size: 13px">
                  Trigger: percent_change &lt; 0 AND p &lt; 0.05
                  <br />
                  Example: −0.2% retention, p=0.03 → ESCALATE
                  <br />
                  Purpose: Catch small but real degradations (top metrics only)
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="Learn_keyTakeaways p-4 mb-4">
          <div class="Learn_keyTakeawaysHeader mb-3 pb-3">💡 Key Takeaways</div>
          <div class="d-flex flex-column gap-2">
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Tier 1 (minutes): error rates, crashes, latency - auto-rollback
                on breach
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Tier 2 (hours): session completion, bounce rate - pause for
                investigation
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Tier 3 (days/weeks): retention, repeat purchase - informs ship
                decision
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Faster tiers catch catastrophic failures; slower tiers catch
                subtle harm
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
                When explaining tiers: describe detection speed trade-off (fast
                = crude, slow = accurate)
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">2</span>
              <span class="flex-grow-1 Learn_cardContent">
                For action matrix: Tier 1 auto-rollback, Tier 2 pause+alert,
                Tier 3 decision input
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default LessonGuardrailMetricsThreeTierGuardrailFramework;
