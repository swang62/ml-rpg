import type { Component } from "solid-js";

const LessonImageClassificationScaleCriticalTradeOffsModelChoiceServingStrategyAndCost: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Critical Trade-offs: Model Choice, Serving Strategy, and Cost
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Critical Trade-offs
            </p>
            <p style="margin-top: 0">
              Every architectural decision in image classification involves
              trade-offs. Understanding these helps you make informed choices
              rather than blindly following best practices that may not fit your
              constraints.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Model Size vs Latency
            </p>
            <p style="margin-top: 0">
              <strong>Larger models (ResNet-152, EfficientNet-B7):</strong>{" "}
              Higher accuracy, 100-500ms inference, 500MB+ memory. Suitable when
              accuracy matters more than speed.
            </p>
            <p>
              <strong>Smaller models (MobileNet, EfficientNet-B0):</strong> 2-5%
              lower accuracy, 10-50ms inference, 20-50MB memory. Suitable for
              real-time applications or edge deployment.
            </p>
            <p>
              <strong>Decision framework:</strong> If your accuracy requirement
              is 95% and a large model achieves 97% while a small model achieves
              93%, the large model is necessary. If both exceed 95%, prefer the
              smaller model for cost savings.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Accuracy vs Cost
            </p>
            <p style="margin-top: 0">
              GPU inference costs $0.50-2.00 per million images depending on
              model size and batch efficiency. A 3% accuracy improvement might
              require 10x compute cost. Calculate the business value of that
              accuracy gain before committing.
            </p>
            <p>
              <strong>Example:</strong> A content moderation system processing
              10 billion images/month costs $5,000-20,000 in GPU compute.
              Upgrading to a model that is 3% more accurate but 5x slower
              increases cost to $25,000-100,000. Is catching 3% more violations
              worth $20,000+/month?
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Generalization vs Specialization
            </p>
            <p style="margin-top: 0">
              <strong>General classifier:</strong> One model handles all
              categories. Simpler deployment, but accuracy suffers on hard
              classes.
            </p>
            <p>
              <strong>Specialized classifiers:</strong> Separate models for
              different domains (animals, products, scenes). Higher accuracy on
              each domain, but complex routing logic and more models to
              maintain.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>Key Trade-off:</strong> Specialization improves accuracy
              5-10% on hard categories but multiplies operational complexity.
              Start general, specialize only when accuracy gaps cause real
              business problems.
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
                  Larger models gain 2-5% accuracy but cost 5-10x more in
                  latency and compute
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  GPU inference costs $0.50-2.00 per million images - calculate
                  business value of accuracy improvements
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Specialized classifiers improve hard-category accuracy 5-10%
                  but multiply operational complexity
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Decision framework: if both models meet accuracy threshold,
                  prefer smaller for cost savings
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
                  Interview Tip: Frame trade-offs in business terms - ask what
                  the cost of a false negative vs false positive is for the
                  specific use case
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Mention that model selection depends on latency
                  SLA - real-time feeds need small models regardless of accuracy
                  preference
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonImageClassificationScaleCriticalTradeOffsModelChoiceServingStrategyAndCost;
