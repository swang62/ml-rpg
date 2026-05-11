import type { Component } from "solid-js";

const LessonDataAnonymizationWhatIsDataAnonymizationAndWhyDoWeNeedIt: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            What is Data Anonymization and Why Do We Need It?
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
                <strong>Data Anonymization</strong> transforms personally
                identifiable information (PII) into data that cannot be traced
                back to individuals, enabling ML model training while protecting
                user privacy and satisfying regulatory requirements.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              WHY ANONYMIZATION IS CRITICAL FOR ML
            </p>
            <p style="margin-top: 0">
              ML systems require vast amounts of data, but raw user data
              contains PII (names, emails, addresses, phone numbers). Using PII
              directly creates legal liability under GDPR/CCPA, risks data
              breaches, and limits data sharing. Anonymization removes these
              barriers while preserving statistical properties for training.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              PII CATEGORIES
            </p>
            <p style="margin-top: 0">
              <strong>Direct identifiers</strong> uniquely identify individuals:
              names, SSNs, emails, phone numbers.{" "}
              <strong>Quasi-identifiers</strong> identify when combined: zip
              code + birth date + gender can uniquely identify 87% of the US
              population. <strong>Sensitive attributes</strong> include health
              conditions and financial data requiring protection.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Key Insight:</strong> Most privacy breaches occur
              through quasi-identifier attacks, not direct PII exposure.
              Anonymization must handle both obvious identifiers and innocuous
              fields that combine for re-identification.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              ANONYMIZATION VS PSEUDONYMIZATION
            </p>
            <p style="margin-top: 0">
              <strong>Pseudonymization</strong> replaces identifiers with tokens
              while maintaining a mapping table—reversible and still personal
              data under GDPR. <strong>Anonymization</strong> irreversibly
              removes identifying information with no path back. For ML
              training, true anonymization is preferred as pseudonymized data
              still requires full GDPR compliance.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Key Trade-off:</strong> Higher anonymization reduces
              re-identification risk but degrades model accuracy. A fraud model
              on heavily anonymized data may miss 15-20% of patterns requiring
              fine-grained behavioral analysis.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 550px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 14px">Raw Data</strong>
                  <div style="margin-top: 8px; font-size: 13px">
                    Name: John Smith
                    <br />
                    Email: john@example.com
                    <br />
                    Age: 34
                    <br />
                    ZIP: 94102
                  </div>
                </div>
                <div style="text-align: center; font-size: 20px; font-weight: bold">
                  ↓ Anonymization
                </div>
                <div style="display: flex; gap: 12px">
                  <div style="flex: 1; border: 2px solid; padding: 10px; border-radius: 6px">
                    <strong style="font-size: 13px">Suppression</strong>
                    <div style="margin-top: 6px; font-size: 12px">
                      Name: [REMOVED]
                      <br />
                      Email: [REMOVED]
                    </div>
                  </div>
                  <div style="flex: 1; border: 2px solid; padding: 10px; border-radius: 6px">
                    <strong style="font-size: 13px">Generalization</strong>
                    <div style="margin-top: 6px; font-size: 12px">
                      Age: 30 to 35
                      <br />
                      ZIP: 941**
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
                  Data anonymization transforms PII into non-identifiable data
                  while preserving statistical utility for ML
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Direct identifiers uniquely identify individuals;
                  quasi-identifiers combine to enable re-identification
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Pseudonymization is reversible and still personal data;
                  anonymization is irreversible and exempt from GDPR
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
                  Always analyze data for quasi-identifiers—zip code, birth
                  date, and gender can identify 87% of the US population
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Validate anonymization by attempting re-identification attacks
                  before releasing data
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonDataAnonymizationWhatIsDataAnonymizationAndWhyDoWeNeedIt;
