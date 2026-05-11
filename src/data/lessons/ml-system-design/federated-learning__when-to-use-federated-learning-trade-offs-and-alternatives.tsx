import type { Component } from "solid-js";

const LessonFederatedLearningWhenToUseFederatedLearningTradeOffsAndAlternatives: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            When to Use Federated Learning: Trade-offs and Alternatives
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              When Federated Learning Makes Sense
            </p>
            <p style="margin-top: 0">
              <strong>Regulatory requirements:</strong> Healthcare data (HIPAA),
              financial data (GDPR), and other regulated domains where data
              physically cannot leave organizational boundaries. No amount of
              security engineering can bypass legal restrictions.{" "}
              <strong>Physical impossibility:</strong> IoT devices generating
              terabytes daily cannot upload everything. Edge devices with
              limited connectivity can train locally and sync occasionally.{" "}
              <strong>Competitive sensitivity:</strong> Multiple organizations
              want to collaborate on a model without revealing proprietary data
              to each other. Hospitals can jointly train diagnostic models
              without sharing patient records with competitors.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              When Federated Learning Is Wrong
            </p>
            <p style="margin-top: 0">
              <strong>When you can centralize:</strong> If users willingly
              provide data and regulations allow centralization, centralized
              training is simpler, faster, and produces better models. Federated
              learning adds 2-10x overhead in engineering complexity.{" "}
              <strong>Small client populations:</strong> Differential privacy
              and secure aggregation provide guarantees only with sufficient
              clients (typically 1,000+). With 50 clients, individual
              contributions are detectable.{" "}
              <strong>Highly heterogeneous data:</strong> If every client has
              completely different data, no single model serves everyone well.
              Personalization or separate models may work better.{" "}
              <strong>Real-time requirements:</strong> Federated rounds take
              minutes to hours. Applications needing sub-second model updates
              cannot wait for distributed coordination.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Alternatives to Consider
            </p>
            <p style="margin-top: 0">
              <strong>Data synthesis:</strong> Generate synthetic data that
              preserves statistical properties without containing real records.
              Train centrally on synthetic data.{" "}
              <strong>Split learning:</strong> Only certain model layers run on
              clients; others run on server. Reduces client computation
              requirements. <strong>Local-only models:</strong> Each device
              trains its own model on local data. No coordination needed, but no
              knowledge sharing either. Works for personalization tasks.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>🎯 Decision Framework:</strong> Use federated learning
              when data cannot be centralized (legal or physical constraints),
              you have 1,000+ clients, and model quality justifies 2-10x
              engineering overhead. Otherwise, simpler approaches likely
              suffice.
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
                  Use federated learning when regulations prevent centralization
                  (HIPAA, GDPR) or physical constraints exist
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Federated learning adds 2-10x engineering overhead compared to
                  centralized training
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Privacy guarantees require 1,000+ clients; smaller populations
                  cannot hide individual contributions
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Highly heterogeneous data may need personalization or separate
                  models rather than one federated model
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Alternatives include synthetic data generation, split
                  learning, and local-only personalization
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
                  Provide the decision framework: data cannot be centralized,
                  1,000+ clients, and benefits justify 2-10x overhead
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mention that centralized training is always simpler if you can
                  legally and practically centralize data
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonFederatedLearningWhenToUseFederatedLearningTradeOffsAndAlternatives;
