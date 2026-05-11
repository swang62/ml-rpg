import type { Component } from "solid-js";

const LessonDataAnonymizationFailureModesAttacksAndOperationalRisksInAnonymization: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Failure Modes: Attacks and Operational Risks in Anonymization
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
                <strong>Anonymization failure modes</strong> occur when
                de-identified data can be re-linked to individuals through
                linkage attacks, inference attacks, or operational errors.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              LINKAGE ATTACKS
            </p>
            <p style="margin-top: 0">
              Attackers combine anonymized data with external datasets to
              re-identify individuals. Even with direct identifiers removed,
              quasi-identifiers (zip + birth date + gender) can match public
              records. Risk increases over time as more datasets become publicly
              available.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              INFERENCE ATTACKS
            </p>
            <p style="margin-top: 0">
              Statistical inference reveals sensitive attributes without direct
              re-identification. If 95% of people in an anonymized group share a
              disease, attackers infer that attribute with high confidence. ML
              models may also leak information through membership inference.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Key Insight:</strong> K-anonymity protects identity but
              fails against inference. Use l-diversity (diverse sensitive
              attributes per group) or t-closeness (distributions match
              population) for stronger protection.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              OPERATIONAL FAILURES
            </p>
            <p style="margin-top: 0">
              Common risks: incomplete PII detection leaving identifiers in
              free-text or metadata, version mismatches where non-anonymized
              data persists in backups, logging systems capturing raw PII. Audit
              trails must themselves be anonymized.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              DEFENSE STRATEGIES
            </p>
            <p style="margin-top: 0">
              Test with simulated re-identification attacks before release. Use
              differential privacy for quantifiable guarantees. Implement data
              minimization. Monitor for emerging auxiliary datasets enabling
              future attacks.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Key Trade-off:</strong> Defending sophisticated attacks
              requires stronger anonymization that degrades utility. Balance
              attack surface against accuracy requirements.
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
                  Linkage attacks combine anonymized data with external datasets
                  using quasi-identifiers
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Inference attacks reveal sensitive attributes through
                  statistics without direct re-identification
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Operational failures include incomplete PII detection, version
                  mismatches, and logging raw data
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
                  Test anonymized datasets with simulated re-identification
                  attacks before release
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Complement k-anonymity with l-diversity or t-closeness for
                  inference protection
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonDataAnonymizationFailureModesAttacksAndOperationalRisksInAnonymization;
