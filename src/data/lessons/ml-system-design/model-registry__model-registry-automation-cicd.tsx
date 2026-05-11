import type { Component } from "solid-js";

const LessonModelRegistryModelRegistryAutomationCicd: Component = () => (
  <div class="lesson-content">
    <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
      <div class="mb-4 p-4">
        <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
          Model Registry Automation and CI/CD Integration
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
              <strong>Model registry automation</strong> integrates the registry
              with CI/CD pipelines for automated validation, deployment, and
              governance—turning model deployment into a repeatable process.
            </div>
          </div>
          <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            CI/CD INTEGRATION
          </p>
          <p style="margin-top: 0">
            <strong>Push trigger:</strong> Training completes → registers model
            → triggers validation. <strong>Gates:</strong> Accuracy,
            performance, bias tests. <strong>Promotion:</strong> Passing models
            auto-promoted. <strong>Deploy:</strong> Approved models deployed via
            registry API.
          </p>
          <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            AUTOMATED VALIDATION
          </p>
          <p style="margin-top: 0">
            <strong>Functional:</strong> Model loads and returns valid outputs.{" "}
            <strong>Performance:</strong> Latency, memory, throughput.{" "}
            <strong>Quality:</strong> Accuracy vs baseline.{" "}
            <strong>Compliance:</strong> Lineage present, metadata complete.
          </p>
          <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
            <strong>💡 Insight:</strong> Treat model validation like code
            testing. Models without passing tests never reach
            production—automated gates enforce this.
          </div>
          <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            EVENT-DRIVEN ARCHITECTURE
          </p>
          <p style="margin-top: 0">
            Registry emits events: model_registered, model_promoted,
            model_deployed. Downstream systems subscribe: monitoring starts,
            rollback caches previous version. Events decouple registry from
            consumers.
          </p>
          <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            GOVERNANCE AUTOMATION
          </p>
          <p style="margin-top: 0">
            <strong>Approvals:</strong> Require sign-off before production.{" "}
            <strong>Audit:</strong> Every action logged.{" "}
            <strong>Access control:</strong> Role-based permissions.{" "}
            <strong>Expiration:</strong> Auto-deprecate old models without
            recent validation.
          </p>
          <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
            <strong>⚠️ Trade-off:</strong> Full automation needs robust testing.
            Start manual, automate as confidence grows.
          </div>
        </div>
        <div class="Learn_keyTakeaways p-4 mb-4">
          <div class="Learn_keyTakeawaysHeader mb-3 pb-3">💡 Key Takeaways</div>
          <div class="d-flex flex-column gap-2">
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                CI/CD integration automates validation, promotion, and
                deployment through registry APIs
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Automated gates enforce quality standards before production
                deployment
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Event-driven architecture decouples registry from downstream
                consumers
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
                Treat model validation like code testing—no passing tests, no
                production
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">2</span>
              <span class="flex-grow-1 Learn_cardContent">
                Start with manual approval workflows, automate incrementally as
                confidence grows
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default LessonModelRegistryModelRegistryAutomationCicd;
