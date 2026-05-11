import type { Component } from "solid-js";

const LessonSupervisedAnomalyDetectionFailureModesConceptDriftAdversarialAttacksAndColdStart: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Failure Modes: Concept Drift, Adversarial Attacks, and Cold Start
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 0; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Concept Drift
            </p>
            <p style="margin-top: 0">
              Fraudsters adapt. When models learn to catch a pattern, fraudsters
              change tactics. Last month's attack vector becomes ineffective;
              new vectors emerge. A model trained on historical data degrades as
              the fraud landscape evolves.
            </p>
            <p>
              Concept drift in fraud differs from natural drift. It is
              adversarial: fraudsters actively probe model boundaries and
              exploit weaknesses. Feature importance shifts as fraudsters
              discover which signals get them blocked and which do not. A
              feature that was highly predictive becomes useless once fraudsters
              learn to avoid it.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Adversarial Attacks
            </p>
            <p style="margin-top: 0">
              Fraudsters conduct probe attacks: small test transactions to map
              model behavior. They vary one feature at a time to identify
              thresholds. "How much can I spend before getting blocked? Which
              device fingerprints pass? What velocity triggers review?"
            </p>
            <p>
              Defense requires obfuscation and non-determinism. Add random
              delays before blocking high-risk transactions so timing does not
              reveal threshold hits. Use randomized thresholds within a range.
              Limit the information leaked through block messages.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Cold Start
            </p>
            <p style="margin-top: 0">
              New accounts, new merchants, new devices have no history. The
              model relies on aggregate features (velocity, spend patterns) that
              do not exist yet. First-party fraud often uses newly created
              accounts specifically to avoid historical signals.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Cold Start Mitigations:</strong> Use graph features
              connecting new entities to known ones (shared device with flagged
              account). Apply stricter thresholds for new entities. Require
              additional verification (SMS, email) for first transactions.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Monitoring for Failure
            </p>
            <p style="margin-top: 0">
              Track feature importance over time. If a top feature drops in
              importance rapidly, fraudsters may have adapted. Monitor false
              negative rate by segment: a sudden spike in chargebacks from a
              specific merchant category or device type indicates a new attack
              pattern the model misses.
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
                  Concept drift is adversarial: fraudsters actively probe and
                  adapt to exploit model weaknesses
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Probe attacks map model behavior by varying one feature at a
                  time to identify thresholds
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Defense: add random delays, randomized thresholds, limit
                  information in block messages
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Cold start: new entities have no history; use graph features
                  linking to known entities
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Monitor feature importance drops and chargeback spikes by
                  segment to detect new attack patterns
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
                  Explain adversarial drift: fraudsters discover which signals
                  get blocked and avoid them
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Describe probe attacks: test transactions vary one feature to
                  map thresholds
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  For cold start, use graph features: does new account share
                  device with flagged account?
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonSupervisedAnomalyDetectionFailureModesConceptDriftAdversarialAttacksAndColdStart;
