import type { Component } from "solid-js";

const LessonDataAnonymizationPseudonymizationVsAnonymizationVsDifferentialPrivacy: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Pseudonymization vs Anonymization vs Differential Privacy
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
                Three privacy techniques: <strong>Pseudonymization</strong>{" "}
                replaces identifiers with tokens (reversible),{" "}
                <strong>Anonymization</strong> removes identifying information
                (irreversible), <strong>Differential Privacy</strong> adds
                mathematical noise guarantees.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              PSEUDONYMIZATION: REVERSIBLE TRANSFORMATION
            </p>
            <p style="margin-top: 0">
              Replaces identifiers with consistent tokens while maintaining a
              secure mapping table. The same person always gets the same token,
              enabling longitudinal analysis. Under GDPR, pseudonymized data is
              still personal data requiring compliance, but provides security:
              if the dataset is breached, identities stay protected as long as
              the mapping is secure.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              ANONYMIZATION: IRREVERSIBLE REMOVAL
            </p>
            <p style="margin-top: 0">
              Permanently removes re-identification ability using k-anonymity,
              generalization, or suppression. Under GDPR, properly anonymized
              data is not personal data and falls outside regulatory scope. The
              challenge: proving data is truly anonymous is difficult, and
              auxiliary data can enable re-identification attacks years later.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Key Insight:</strong> GDPR distinguishes
              pseudonymization (personal data, full compliance required) from
              anonymization (not personal data, GDPR-exempt). This legal
              distinction drives architecture decisions.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              DIFFERENTIAL PRIVACY: MATHEMATICAL GUARANTEES
            </p>
            <p style="margin-top: 0">
              Adds calibrated noise to queries or training with mathematical
              bounds on privacy loss (epsilon). Unlike k-anonymity, protects
              against adversaries with arbitrary auxiliary information. For ML,
              DP-SGD clips gradients and adds noise during backpropagation,
              preventing models from memorizing training examples.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Key Trade-off:</strong> Pseudonymization preserves full
              utility but requires compliance; anonymization reduces utility but
              eliminates compliance; differential privacy provides strongest
              guarantees but causes 5-20% accuracy loss.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 600px">
              <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px">
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">Pseudonymization</strong>
                  <div style="margin-top: 8px; font-size: 12px">
                    Email → Token ABC123
                    <br />
                    <br />
                    Reversible ✓<br />
                    Linkable ✓<br />
                    Keys required ✓<br />
                    <br />
                    Use: Internal joins
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">Anonymization</strong>
                  <div style="margin-top: 8px; font-size: 12px">
                    Age 34 → 30 to 35
                    <br />
                    ZIP 94102 → 941**
                    <br />
                    <br />
                    Reversible ✗<br />
                    Linkable ✗<br />
                    Keys N/A
                    <br />
                    <br />
                    Use: External release
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">Differential Privacy</strong>
                  <div style="margin-top: 8px; font-size: 12px">
                    Count: 1000 + noise(ε=2)
                    <br />→ 1003
                    <br />
                    <br />
                    Query level ✓<br />
                    Math guarantee ✓<br />
                    Adds noise ✓<br />
                    <br />
                    Use: Public metrics
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
                  Pseudonymization is reversible with mapping table;
                  anonymization is irreversible; differential privacy adds
                  mathematical noise
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  GDPR treats pseudonymized data as personal data; anonymized
                  data is exempt from regulation
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Differential privacy protects against adversaries with
                  arbitrary auxiliary information
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
                  Use pseudonymization for internal analytics where compliance
                  is manageable; anonymization for sharing
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Consider differential privacy when releasing aggregate
                  statistics or training models on sensitive data
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonDataAnonymizationPseudonymizationVsAnonymizationVsDifferentialPrivacy;
