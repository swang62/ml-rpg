import type { Component } from "solid-js";

const LessonShadowModeDeploymentShadowModeTradeOffsCostVsRiskReduction: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Shadow Mode Trade-offs: Cost vs Risk Reduction
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Shadow Mode Economics:</strong> Shadow deployment doubles
              inference costs during validation (running two models instead of
              one). The trade-off: pay more now to reduce risk of costly
              production failures later. The math depends on failure probability
              and failure cost.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Cost Analysis
            </p>
            <p>
              Shadow mode costs: duplicate compute (2x inference cost),
              additional logging storage, analysis tooling, and engineering time
              for comparison. Shadow mode saves: rollback costs when bugs are
              caught pre-deployment, user trust damage from bad predictions,
              revenue loss from broken features, and incident response time. For
              a model serving 1 million requests per day at 0.001 USD per
              inference, shadow mode costs 1,000 USD per day. If it prevents one
              incident that would cost 50,000 USD in lost revenue and
              engineering time, a week of shadow mode is easily justified.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Duration Trade-offs
            </p>
            <p>
              Longer shadow periods catch more edge cases but cost more and
              delay launches. Short shadow (1-2 days): validates basic
              functionality, latency, obvious bugs. Catches gross errors but may
              miss rare edge cases. Medium shadow (1-2 weeks): covers daily and
              weekly traffic patterns, catches most issues. Standard for
              production models. Long shadow (1+ month): validates seasonal
              patterns, catches rare events. Reserved for high-stakes models
              where any failure is catastrophic. Match duration to risk
              tolerance and traffic variability.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Sampling Trade-offs
            </p>
            <p>
              Running shadow on 100% of traffic maximizes validation but
              maximizes cost. Sampling options: run shadow on 10% of requests
              (reduces cost 90%, but may miss rare patterns), sample stratified
              by user segment or request type (ensures coverage of important
              cases), or sample based on prediction confidence (shadow uncertain
              cases more heavily). The risk: sampling may miss issues that only
              occur in unsampled traffic. For high-stakes models, full traffic
              shadow is worth the cost.
            </p>
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Decision Framework:</strong> If (probability of failure) ×
              (cost of failure) &gt; (shadow cost), shadow mode is justified.
              High-stakes, novel models: always shadow. Minor updates to stable
              models: canary may suffice.
            </p>
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Shadow doubles inference cost but prevents costly production
                  failures
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Duration: 1-2 days for basic validation, 1-2 weeks standard,
                  1+ month for high-stakes
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  10% sampling reduces cost 90% but may miss rare patterns
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
                  1M requests/day at 0.001 USD = 1,000 USD/day shadow cost
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  If shadow prevents one 50,000 USD incident, a week of shadow
                  is justified
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonShadowModeDeploymentShadowModeTradeOffsCostVsRiskReduction;
