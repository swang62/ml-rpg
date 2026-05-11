import type { Component } from "solid-js";

const LessonDataMaskingAnonymizationWhatIsDataMaskingAnonymization: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            What is Data Masking &amp; Anonymization?
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
                <strong>Data Masking</strong> transforms sensitive data to make
                it less risky while maintaining structural realism.{" "}
                <strong>Anonymization</strong> goes further to prevent
                re-identification of individuals, even with auxiliary data.
              </div>
            </div>
            <strong>The Core Problem:</strong>
            Production data in consumer apps contains Personally Identifiable
            Information (PII) like names, emails, phone numbers, device IDs, IP
            addresses, and exact GPS coordinates. When this raw data flows into
            analytics environments, dev/test databases, or ML pipelines, you
            dramatically increase the blast radius for breaches and regulatory
            fines. Consider a company with 50 million monthly active users
            generating 3 to 5 TB of event data daily. This data needs to serve
            200 analysts, 30 ML engineers, and 20 microservices for fraud
            detection and personalization. Without masking, every one of these
            access points becomes a potential leak.
            <strong>Data Masking in Practice:</strong>
            Masking makes data less sensitive while keeping it useful. A credit
            card number becomes a format preserving token that looks like{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              4532-****-****-7891
            </code>
            . An email like john.smith@example.com might become a hashed token{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              a4f3c2@example.com
            </code>{" "}
            where the domain is preserved for analytics about email providers.
            An IP address 192.168.45.123 gets truncated to 192.168.0.0 (city
            level precision instead of exact location).
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>⚠️ Key Difference:</strong> Masking is often reversible by
              trusted services using a tokenization vault. Anonymization aims
              for irreversibility, making re-identification computationally
              infeasible.
            </div>
            <strong>Anonymization for Stronger Privacy:</strong>
            Anonymization techniques include pseudonymization (replacing
            identifiers with stable but unrelated tokens), aggregation
            (reporting at group or regional level instead of individual
            records), and k-anonymity (ensuring each record is indistinguishable
            from at least k minus 1 others). Companies use these when sharing
            data externally or for public research where even auxiliary data
            shouldn't allow re-identification.
            <strong>The Three Control Levers:</strong>
            First, what you remove: dropping columns entirely or reducing
            precision (full birthdate becomes birth year). Second, what you
            transform: tokenization, hashing, or format preserving encryption.
            Third, where you apply it: at data ingestion (masking before
            storage), at storage layer (encrypted columns), or at query time
            (dynamic masking based on user role).
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 12px; align-items: center">
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 200px; text-align: center">
                  <strong style="font-size: 14px">Raw Data</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    john.smith@email.com
                    <br />
                    192.168.45.123
                    <br />
                    4532-1234-5678-7891
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 200px; text-align: center">
                  <strong style="font-size: 14px">Masked Data</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    a4f3c2@email.com
                    <br />
                    192.168.0.0
                    <br />
                    4532-****-****-7891
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 200px; text-align: center">
                  <strong style="font-size: 14px">Anonymized Data</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    User in CA, Age 30-40
                    <br />
                    Cohort: 10k+ users
                    <br />
                    Transaction: High Value
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
                  Masking transforms data to reduce sensitivity while
                  maintaining structure (hashing emails, truncating IPs,
                  tokenizing cards), typically remaining reversible for trusted
                  services
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Anonymization prevents re-identification through
                  pseudonymization, aggregation, or techniques like k-anonymity,
                  aiming for irreversibility even with auxiliary data
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Systems apply these controls at three points: ingestion
                  (before storage), storage layer (encrypted columns), or query
                  time (role based dynamic masking)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Real scale impact: 50 million user app generating 3 to 5 TB
                  daily events needs masking to protect 200 analysts and 30 ML
                  engineers from becoming breach points
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
                  Email masking: john.smith@example.com becomes hashed token
                  a4f3c2@example.com preserving domain for analytics
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  IP truncation: 192.168.45.123 becomes 192.168.0.0 reducing
                  precision from exact device to city level
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Credit card tokenization: 4532-1234-5678-7891 becomes
                  4532-****-****-7891 keeping format for validation while hiding
                  sensitive digits
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">4</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Aggregation for anonymization: individual salaries replaced
                  with department median and range ensuring minimum group size
                  of 100
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonDataMaskingAnonymizationWhatIsDataMaskingAnonymization;
