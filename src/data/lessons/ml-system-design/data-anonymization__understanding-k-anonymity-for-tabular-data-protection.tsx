import type { Component } from "solid-js";

const LessonDataAnonymizationUnderstandingKAnonymityForTabularDataProtection: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Understanding K-Anonymity for Tabular Data Protection
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
                <strong>K-Anonymity</strong> ensures every record in a dataset
                is indistinguishable from at least k-1 other records based on
                quasi-identifiers (fields like zip code, age, gender that can
                combine to identify individuals).
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              HOW K-ANONYMITY WORKS
            </p>
            <p style="margin-top: 0">
              The algorithm generalizes quasi-identifier values until each
              unique combination appears at least k times. For example, with
              k=5: specific ages become ranges (25-30), zip codes become
              prefixes (9021*), and exact dates become months. After
              transformation, any attacker who knows your quasi-identifiers can
              narrow you down to at most k people but cannot uniquely identify
              you.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              CHOOSING THE RIGHT K VALUE
            </p>
            <p style="margin-top: 0">
              Higher k provides stronger privacy but requires more
              generalization, reducing data utility. Typical choices: k=5 for
              low-risk internal analytics, k=10 for shared datasets, k=20+ for
              public releases with sensitive attributes. The minimum k depends
              on the attacker model—if adversaries have external data sources,
              higher k is needed.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Key Insight:</strong> K-anonymity protects against
              identity disclosure but not attribute disclosure. If all k records
              in a group share the same sensitive value (all have cancer
              diagnosis), an attacker learns that attribute with certainty.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              GENERALIZATION TECHNIQUES
            </p>
            <p style="margin-top: 0">
              <strong>Value generalization</strong>: replace exact values with
              ranges (age 34 → 30-40). <strong>Suppression</strong>: remove
              outlier records requiring excessive generalization.{" "}
              <strong>Cell suppression</strong>: replace specific values with
              wildcards (*). The optimal approach minimizes information loss
              while achieving k-anonymity.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Key Trade-off:</strong> ML models trained on
              k-anonymized data typically see 5-15% accuracy drops. Loss is
              higher for tasks requiring fine-grained distinctions that
              generalization obscures.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 580px">
              <div style="margin-bottom: 12px; font-weight: bold; font-size: 15px">
                K-Anonymity with k=3 Example
              </div>
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong>Before (Identifiable)</strong>
                  <table style="width: 100%; margin-top: 8px; font-size: 13px">
                    <tbody>
                      <tr>
                        <td>Age: 34</td>
                        <td>Gender: M</td>
                        <td>ZIP: 94102</td>
                      </tr>
                      <tr style="border-top: 1px solid">
                        <td>Age: 29</td>
                        <td>Gender: F</td>
                        <td>ZIP: 10001</td>
                      </tr>
                      <tr style="border-top: 1px solid">
                        <td>Age: 34</td>
                        <td>Gender: M</td>
                        <td>ZIP: 94103</td>
                      </tr>
                    </tbody>
                  </table>
                  <div style="margin-top: 6px; font-size: 12px">
                    ⚠ Each combination unique, k=1
                  </div>
                </div>
                <div style="text-align: center; font-size: 18px; font-weight: bold">
                  ↓ Generalization
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong>After (k=3 satisfied)</strong>
                  <table style="width: 100%; margin-top: 8px; font-size: 13px">
                    <tbody>
                      <tr>
                        <td>Age: 30-35</td>
                        <td>Gender: M</td>
                        <td>ZIP: 941**</td>
                      </tr>
                      <tr style="border-top: 1px solid">
                        <td>Age: 25-30</td>
                        <td>Gender: F</td>
                        <td>ZIP: 100**</td>
                      </tr>
                      <tr style="border-top: 1px solid">
                        <td>Age: 30-35</td>
                        <td>Gender: M</td>
                        <td>ZIP: 941**</td>
                      </tr>
                    </tbody>
                  </table>
                  <div style="margin-top: 6px; font-size: 12px">
                    ✓ At least 3 records per combination
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
                  K-anonymity ensures every record is indistinguishable from at
                  least k-1 others based on quasi-identifiers
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Generalization replaces specific values with ranges;
                  suppression removes outliers requiring excessive
                  generalization
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  K-anonymity protects identity disclosure but not attribute
                  disclosure when group members share sensitive values
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
                  Start with k=5 for internal use, k=10 for shared data, and
                  k=20+ for public releases with sensitive attributes
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Complement k-anonymity with l-diversity to protect against
                  attribute disclosure attacks
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonDataAnonymizationUnderstandingKAnonymityForTabularDataProtection;
