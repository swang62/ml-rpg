import type { Component } from "solid-js";

const LessonGdprComplianceWhatIsGdprDataPrivacyCompliance: Component = () => (
  <div class="lesson-content">
    <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
      <div class="mb-4 p-4">
        <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
          What is GDPR &amp; Data Privacy Compliance?
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
              <strong>General Data Protection Regulation (GDPR)</strong> is
              European Union law requiring companies to protect personal data
              and give individuals control over their information, including
              rights to access, correct, and delete their data.
            </div>
          </div>
          <strong>The Core Problem:</strong>
          Modern data platforms collect millions of events per second:
          clickstreams, payments, location data, behavioral logs. Without
          constraints, this personal data is easy to copy, hard to delete, and
          trivial to misuse. A user's email might exist in production databases,
          log files, analytics warehouses, machine learning models, cache
          systems, backup archives, and analyst laptops. When that user requests
          deletion, how do you find and remove all copies? GDPR treats personal
          data as toxic material that must be tightly controlled, tracked
          through its lifecycle, and eventually destroyed. It transforms what
          was primarily a product and legal problem into a fundamental data
          engineering challenge.
          <strong>Key Definitions:</strong>
          <strong>Personal data</strong> means any information that can identify
          a person directly or indirectly. This includes obvious identifiers
          like email addresses and phone numbers, but also combinations like IP
          address plus timestamp plus device identifier that together can
          uniquely identify someone.
          <strong>Data controller</strong> decides why and how personal data is
          processed (typically product teams), while{" "}
          <strong>data processor</strong> handles data on behalf of the
          controller (infrastructure teams, cloud services).
          <strong>Data subject rights</strong> give individuals specific powers:
          the right to access their data, correct inaccuracies, request deletion
          (right to be forgotten), restrict processing, port data to another
          service, and object to certain uses.
          <strong>Privacy by design</strong> requires embedding privacy
          protections into system architecture from the start, not bolting them
          on later. This means data minimization (collect only what you need),
          isolation of personally identifiable information (PII),
          pseudonymization (replacing identifiers with tokens), and strict
          retention limits. From a data engineering perspective, GDPR is
          primarily about lifecycle control and purpose limitation across
          distributed systems. Every piece of personal data must have a lawful
          basis for processing (such as explicit consent or legitimate business
          interest), and you must be able to prove you handle it correctly
          throughout its entire lifecycle.
        </div>
        <div class="Learn_keyTakeaways p-4 mb-4">
          <div class="Learn_keyTakeawaysHeader mb-3 pb-3">💡 Key Takeaways</div>
          <div class="d-flex flex-column gap-2">
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                GDPR requires companies to protect personal data and give users
                rights to access, correct, and delete their information across
                all systems
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Personal data includes not just obvious identifiers like email,
                but also combinations of fields (IP plus timestamp plus device)
                that together can identify someone
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Data controller decides how data is used (product teams) while
                data processor handles it (infrastructure teams, cloud
                providers)
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Data subject rights translate to technical requirements: locate
                all user data across distributed systems and delete or export
                within strict Service Level Agreements (SLAs)
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Privacy by design means architectural choices like data
                minimization, PII isolation, pseudonymization, and retention
                limits from the start
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
                A user requests deletion. You must find and remove their email
                from production databases, analytics warehouses, log archives,
                ML models, cache systems, and backup tapes within 30 days
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">2</span>
              <span class="flex-grow-1 Learn_cardContent">
                An IP address (192.168.1.1) plus timestamp (2024-01-15 14:32)
                plus device ID (iPhone12) together can uniquely identify a
                person, making all three fields personal data under GDPR
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">3</span>
              <span class="flex-grow-1 Learn_cardContent">
                Product team (controller) decides to collect location data for
                restaurant recommendations. Infrastructure team (processor)
                stores and processes this data following the controller's
                instructions
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default LessonGdprComplianceWhatIsGdprDataPrivacyCompliance;
