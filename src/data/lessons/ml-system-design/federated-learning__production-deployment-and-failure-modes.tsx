import type { Component } from "solid-js";

const LessonFederatedLearningProductionDeploymentAndFailureModes: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Production Deployment and Failure Modes
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Client Reliability Challenges
            </p>
            <p style="margin-top: 0">
              Production federated learning must handle unreliable clients.
              Mobile devices go offline, lose network connectivity, run out of
              battery, or simply close the app. In a typical round with 10,000
              selected clients, expect 10-30% to fail before sending their
              updates. This is not an edge case; it is the normal operating
              condition. If secure aggregation requires all selected clients to
              participate, a single dropout breaks the entire round. Systems
              must be designed assuming constant partial failures.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Handling Stragglers and Dropouts
            </p>
            <p style="margin-top: 0">
              <strong>Deadline-based aggregation:</strong> Do not wait for all
              clients. Set a deadline (5-10 minutes) and aggregate whatever
              updates arrive. This sacrifices some training data but keeps
              rounds completing. <strong>Over-selection:</strong> If you need
              1,000 clients for a valid round, select 1,500 initially, expecting
              dropouts. First 1,000 to respond get included.{" "}
              <strong>Asynchronous updates:</strong> Instead of synchronized
              rounds, accept updates continuously. Maintains a running aggregate
              that incorporates updates as they arrive. This eliminates waiting
              but introduces staleness: updates are computed on an older model
              version. Staleness beyond 5-10 rounds typically hurts convergence.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Security Failure Modes
            </p>
            <p style="margin-top: 0">
              <strong>Byzantine clients:</strong> Malicious clients send
              poisoned updates to corrupt the model. Even one client sending
              gradients pointing toward misclassification can shift the
              aggregate. Defenses include robust aggregation (median or trimmed
              mean instead of average) and anomaly detection on update
              statistics. <strong>Model inversion:</strong> Even aggregated
              models leak information. Given enough model queries, attackers can
              reconstruct training examples. Mitigation requires combining
              differential privacy with output perturbation.{" "}
              <strong>Free-riding:</strong> Clients that receive model updates
              without contributing genuine training. Detection relies on
              statistical validation of update quality.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Key Insight:</strong> Federated systems must work
              correctly when 10-30% of components fail every round. Design for
              failure as the default state, not the exception.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Round Starts: 5,000 Invited
                  </strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Target 500 completions, threshold 200
                  </div>
                </div>
                <div style="display: flex; gap: 10px; justify-content: space-between">
                  <div style="border: 2px solid; padding: 8px; border-radius: 6px; flex: 1; text-align: center">
                    <strong style="font-size: 12px">600 Complete</strong>
                    <div style="font-size: 10px; margin-top: 2px">
                      Success ✓
                    </div>
                  </div>
                  <div style="border: 2px solid; padding: 8px; border-radius: 6px; flex: 1; text-align: center">
                    <strong style="font-size: 12px">4,400 Drop</strong>
                    <div style="font-size: 10px; margin-top: 2px">
                      88% dropout
                    </div>
                  </div>
                </div>
                <div style="text-align: center; font-size: 18px; font-weight: bold">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Secure Aggregation Succeeds
                  </strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    600 &gt; threshold 200, round completes
                  </div>
                </div>
                <div style="text-align: center; font-size: 18px; font-weight: bold">
                  vs
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Only 150 Complete → Abort
                  </strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    150 &lt; threshold 200, privacy budget wasted
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
                  Expect 10-30% of clients to fail each round due to network
                  issues, battery, or app closure
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Deadline-based aggregation sets time limits rather than
                  waiting for all clients
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Over-selection compensates for dropouts: select 1,500 clients
                  to get 1,000 valid responses
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Asynchronous updates eliminate waiting but introduce staleness
                  beyond 5-10 rounds
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Byzantine clients require robust aggregation (median/trimmed
                  mean) instead of simple averaging
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
                  Emphasize that 10-30% failure per round is normal operation,
                  not edge case
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  When discussing security, mention model inversion attacks can
                  reconstruct training data from aggregate models
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonFederatedLearningProductionDeploymentAndFailureModes;
