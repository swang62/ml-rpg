import type { Component } from "solid-js";

const LessonNeuralArchitectureSearchWhenToUseNasVsManualArchitectureDesign: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            When to Use NAS vs Manual Architecture Design
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 0; margin-bottom: 12px; font-size: 15px; line-height: 1.6">
              NAS is powerful but expensive. Manual design is cheaper but
              limited. Choosing between them depends on your constraints and the
              maturity of your problem domain.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              When NAS Makes Sense
            </p>
            <p style="margin: 0 0 10px 0; font-size: 15px; line-height: 1.6">
              You have a large model fleet with strict efficiency requirements.
              A 1% accuracy improvement or 10% latency reduction multiplied
              across millions of daily predictions justifies thousands of GPU
              hours for search.
            </p>
            <p style="margin: 0 0 10px 0; font-size: 15px; line-height: 1.6">
              You are exploring a new domain where existing architectures do not
              transfer well. When expert intuition fails, systematic search can
              find non-obvious designs that humans would not consider.
            </p>
            <p style="margin: 0 0 10px 0; font-size: 15px; line-height: 1.6">
              You need device-specific architectures. Deploying to 10 different
              hardware targets manually means designing 10 architectures. NAS
              can search for all 10 in parallel with shared infrastructure.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              When Manual Design Wins
            </p>
            <p style="margin: 0 0 10px 0; font-size: 15px; line-height: 1.6">
              Your task has well-established architectures. For standard image
              classification, pre-trained models from established architectures
              often beat NAS-found architectures of similar size because they
              have been tuned extensively.
            </p>
            <p style="margin: 0 0 10px 0; font-size: 15px; line-height: 1.6">
              You lack compute budget. A minimal NAS run costs hundreds of GPU
              hours. If your total model development budget is under 1000 GPU
              hours, spend it on hyperparameter tuning and data quality instead.
            </p>
            <div style="margin: 16px 0; padding: 12px 14px; border-left: 3px solid; border-radius: 0 6px 6px 0">
              <p style="margin: 0; font-size: 14px; line-height: 1.5">
                Rule of thumb: If you would deploy the model to fewer than 10
                million predictions per day, the ROI of NAS rarely justifies the
                search cost. Start with established architectures.
              </p>
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 560px">
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px">
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 14px">Use NAS When:</strong>
                  <div style="font-size: 12px; margin-top: 8px; line-height: 1.6">
                    <strong>✓</strong> Hard device constraints
                    <br />
                    (sub 100ms, under 20MB)
                    <br />
                    <br />
                    <strong>✓</strong> Many devices/tasks
                    <br />
                    (10+ device types)
                    <br />
                    <br />
                    <strong>✓</strong> High inference volume
                    <br />
                    (billions daily)
                    <br />
                    <br />
                    <strong>✓</strong> Reusable platform
                    <br />
                    (10 to 20 searches/year)
                    <br />
                    <br />
                    <strong>✓</strong> 500 to 1000 GPUs available
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 14px">
                    Use Manual Design When:
                  </strong>
                  <div style="font-size: 12px; margin-top: 8px; line-height: 1.6">
                    <strong>✓</strong> Domain expertise strong
                    <br />
                    (team knows architecture)
                    <br />
                    <br />
                    <strong>✓</strong> One time training
                    <br />
                    (served for months)
                    <br />
                    <br />
                    <strong>✓</strong> Large model scale
                    <br />
                    (LLMs, trillion tokens)
                    <br />
                    <br />
                    <strong>✓</strong> Limited GPU budget
                    <br />
                    (under 100 GPUs)
                    <br />
                    <br />
                    <strong>✓</strong> 80 to 95% gain acceptable
                  </div>
                </div>
              </div>
              <div style="margin-top: 12px; border: 2px solid; padding: 12px; border-radius: 6px">
                <strong style="font-size: 13px">Break Even Example:</strong>
                <div style="font-size: 12px; margin-top: 6px">
                  Instagram 100B inferences/day: 20% latency reduction saves $2M
                  annually in infrastructure, justifies $200K NAS investment
                  (500 GPUs × 2 weeks)
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
                  NAS ROI: 1% accuracy gain across millions of predictions
                  justifies search cost
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  New domains without established architectures are good NAS
                  candidates
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Manual design wins when tasks have proven architectures or
                  limited compute budget
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Rule: Under 10M predictions per day rarely justifies NAS
                  search cost
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
                  Interview Tip: Calculate the ROI of NAS based on prediction
                  volume and accuracy gains
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Explain when to use pre-trained established
                  architectures vs running NAS
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Discuss how to allocate a limited GPU budget
                  between NAS and other optimization
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonNeuralArchitectureSearchWhenToUseNasVsManualArchitectureDesign;
