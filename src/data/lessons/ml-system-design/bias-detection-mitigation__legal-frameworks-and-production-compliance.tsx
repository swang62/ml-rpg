import type { Component } from "solid-js";

const LessonBiasDetectionMitigationLegalFrameworksAndProductionCompliance: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Legal Frameworks and Production Compliance
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Key Regulations
            </p>
            <p style="margin-top: 0">
              <strong>Equal Credit Opportunity Act (ECOA):</strong> Prohibits
              discrimination in credit decisions based on race, color, religion,
              national origin, sex, marital status, age. Applies to any model
              used in lending. <strong>Fair Housing Act:</strong> Prohibits
              discrimination in housing-related decisions. Advertising
              algorithms showing housing ads to specific demographics can
              violate this. <strong>Title VII:</strong> Prohibits employment
              discrimination. Hiring algorithms must not have disparate impact
              on protected groups. <strong>GDPR Article 22:</strong> Gives EU
              citizens right to explanation for automated decisions. ML models
              must provide meaningful information about decision logic.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The 80% Rule (Disparate Impact)
            </p>
            <p style="margin-top: 0">
              The EEOC 80% rule: selection rate for any group should be at least
              80% of the rate for the highest group. If 50% of Group A
              applicants are hired and only 30% of Group B, the ratio is 30/50 =
              0.6, violating the threshold. This is not a safe harbor: passing
              does not guarantee compliance, failing does not guarantee
              violation. But it is the primary statistical test regulators use.
              Document your demographic parity ratio for every model touching
              regulated decisions.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Compliance Architecture
            </p>
            <p style="margin-top: 0">
              <strong>Audit trail:</strong> Log every prediction with features
              and outcome. Store for 5 years minimum for lending, 3 years for
              employment. <strong>Model documentation:</strong> Maintain model
              cards documenting training data demographics, fairness metrics,
              intended use. <strong>Adverse action notices:</strong> Credit
              denials must explain reasons. ML models need interpretability to
              generate specific reasons ("insufficient income" not "low
              probability score"). <strong>Testing protocol:</strong> Regular
              fairness audits by independent team. Pre-deployment fairness
              certification for high-risk models.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Key Trade-off:</strong> Compliance requirements vary by
              jurisdiction and domain. Employment, lending, and healthcare have
              different rules. Consult legal counsel for specific obligations.
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
                  Key regulations: ECOA (credit), Fair Housing Act, Title VII
                  (employment), GDPR Article 22 (explanation rights)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  EEOC 80% rule: group selection rate should be at least 80% of
                  highest group rate
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Audit trails: 5 years for lending, 3 years for employment
                  decisions
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Model cards document training demographics, fairness metrics,
                  intended use
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Adverse action notices require interpretable reasons, not just
                  probability scores
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
                  Explain 80% rule with concrete calculation: 30%/50% = 0.6
                  violates threshold
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mention compliance varies by domain: employment, lending,
                  healthcare have different rules
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonBiasDetectionMitigationLegalFrameworksAndProductionCompliance;
