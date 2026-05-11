import type { Component } from "solid-js";

const LessonFederatedLearningSecureAggregationAndPrivacyMechanisms: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Secure Aggregation and Privacy Mechanisms
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="padding: 14px 16px; border: 2px solid; border-left: 4px solid; border-radius: 6px; margin: 0">
              <div style="font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px">
                Core Concept
              </div>
              <div style="font-size: 15px; line-height: 1.5">
                <strong>Secure Aggregation</strong> is a cryptographic protocol
                allowing a server to compute the sum of client updates without
                seeing individual updates. The server learns only the final
                aggregate.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Why Weight Updates Leak Information
            </p>
            <p style="margin-top: 0">
              Even though federated learning only shares model updates, these
              updates can reveal sensitive information. If a client update
              causes the model to recognize a rare disease, an attacker might
              infer the client has that disease. Research shows gradient updates
              can be mathematically inverted to reconstruct training images.
              Without protection, the server could extract private information
              from individual updates.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              How Secure Aggregation Works
            </p>
            <p style="margin-top: 0">
              The core idea uses pairwise masking. Before sending updates, each
              client pair agrees on a random mask. Client A adds the mask;
              Client B subtracts it. When the server sums all updates, masks
              cancel out, revealing only the true aggregate. With 10,000
              clients, coordination is complex. Production systems use threshold
              cryptography where only a subset (1,000 of 10,000) need to
              participate, handling dropouts gracefully.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Differential Privacy as Additional Protection
            </p>
            <p style="margin-top: 0">
              Secure aggregation hides individual updates, but the aggregate
              itself still reveals information. If the aggregate shifts
              dramatically when one client joins, you can infer that client had
              unusual data. Differential privacy adds calibrated noise. The
              privacy budget (epsilon) controls noise level: epsilon 1 provides
              strong privacy but degrades accuracy 5-15%; epsilon 8 preserves
              accuracy but offers weaker guarantees. Production systems target
              epsilon 2-6.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Key Trade-off:</strong> Privacy mechanisms reduce model
              quality. Secure aggregation adds 2-5x communication overhead.
              Differential privacy with epsilon 3 typically reduces accuracy by
              3-8%.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 14px">
                    Step 1: Gradient Clipping
                  </strong>
                  <div style="font-size: 12px; margin-top: 6px">
                    Clip gradient to L2 norm ≤ 1.0
                  </div>
                </div>
                <div style="text-align: center; font-size: 20px; font-weight: bold">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 14px">Step 2: Add DP Noise</strong>
                  <div style="font-size: 12px; margin-top: 6px">
                    Gaussian noise ~ N(0, σ²) for epsilon = 2 to 10
                  </div>
                </div>
                <div style="text-align: center; font-size: 20px; font-weight: bold">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 14px">
                    Step 3: Secure Aggregation
                  </strong>
                  <div style="font-size: 12px; margin-top: 6px">
                    Mask with pairwise secrets, threshold ≥ 200 clients
                  </div>
                </div>
                <div style="text-align: center; font-size: 20px; font-weight: bold">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 14px">Server sees only SUM</strong>
                  <div style="font-size: 12px; margin-top: 6px">
                    No individual client update visible
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
                  Weight updates can leak sensitive information and be
                  mathematically inverted to reconstruct training data
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Secure aggregation uses pairwise masking where random masks
                  cancel out when summed
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Threshold cryptography allows aggregation when 10-30% of
                  clients drop out mid-round
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Differential privacy adds noise with epsilon controlling
                  privacy-utility trade-off (2-6 typical)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Privacy has real costs: secure aggregation adds 2-5x overhead,
                  differential privacy costs 3-8% accuracy
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
                  Explain that privacy has concrete costs: secure aggregation
                  adds 2-5x communication overhead
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  When discussing epsilon, give examples: epsilon 1 is strong
                  privacy with 5-15% accuracy loss
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonFederatedLearningSecureAggregationAndPrivacyMechanisms;
