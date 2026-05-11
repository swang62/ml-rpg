import type { Component } from "solid-js";

const LessonImageClassificationScaleFailureModesAndProductionReliability: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Failure Modes and Production Reliability
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Failure Modes
            </p>
            <p style="margin-top: 0">
              Production classification systems fail in predictable ways.
              Understanding these failure modes helps you design monitoring and
              fallback mechanisms before problems reach users.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Distribution Shift
            </p>
            <p style="margin-top: 0">
              Models assume production data looks like training data. When user
              behavior changes, seasons shift, or new content types emerge,
              predictions degrade silently. A model trained on professional
              photos fails on smartphone selfies. A summer-trained model
              struggles with winter scenes.
            </p>
            <p>
              <strong>Detection:</strong> Monitor prediction confidence
              distributions. Sudden drops in average confidence signal
              distribution shift. Track per-class accuracy on labeled samples
              weekly.
            </p>
            <p>
              <strong>Mitigation:</strong> Retrain on recent data quarterly. Use
              online learning for fast adaptation. Maintain human review queues
              for low-confidence predictions.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Adversarial Attacks
            </p>
            <p style="margin-top: 0">
              Small perturbations invisible to humans can flip model
              predictions. A stop sign with a few pixels changed might classify
              as a speed limit sign. This matters for security-sensitive
              applications like content moderation or autonomous systems.
            </p>
            <p>
              <strong>Detection:</strong> Monitor for images with unusual pixel
              patterns. Track prediction volatility under minor transformations.
            </p>
            <p>
              <strong>Mitigation:</strong> Adversarial training adds perturbed
              examples during training. Ensemble multiple models - attacks that
              fool one model rarely fool all.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Infrastructure Failures
            </p>
            <p style="margin-top: 0">
              <strong>GPU memory exhaustion:</strong> Large batches or memory
              leaks crash inference servers. Monitor GPU memory utilization and
              set hard limits.
            </p>
            <p>
              <strong>Latency spikes:</strong> Garbage collection, thermal
              throttling, or noisy neighbors cause intermittent slowdowns. Use
              P99 latency monitoring, not just averages.
            </p>
            <p>
              <strong>Cold start:</strong> Model loading takes 10-30 seconds.
              Keep warm instances ready. Preload models on deployment.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 600px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px">
                  <strong style="font-size: 14px">Training Serving Skew</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Different resize or crop: 2 to 5 point accuracy drop
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px">
                  <strong style="font-size: 14px">Domain Shift</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Studio photos → user content: recall 85% to 60%
                  </div>
                  <div style="font-size: 12px">
                    Trigger: KL divergence &gt; 0.15
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px">
                  <strong style="font-size: 14px">Class Imbalance</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Rare class 0.01% frequency: F1 near zero
                  </div>
                  <div style="font-size: 12px">
                    Fix: reweight + pseudo label → 60 to 70% recall
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px">
                  <strong style="font-size: 14px">
                    Cache Invalidation Storm
                  </strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Model update → 1B cache entries invalid
                  </div>
                  <div style="font-size: 12px">
                    Gradual rollout: spread over 48 hours
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
                  Distribution shift causes silent accuracy degradation -
                  monitor confidence distributions and per-class accuracy weekly
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Adversarial attacks fool models with invisible perturbations -
                  use adversarial training and model ensembles for defense
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  GPU memory exhaustion and cold starts are common
                  infrastructure failures - monitor utilization and keep warm
                  instances
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  P99 latency reveals spikes that averages hide - always monitor
                  tail latency for production systems
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
                  Interview Tip: Explain distribution shift detection with
                  confidence monitoring - dropping average confidence is an
                  early warning signal
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Mention cold start as a deployment concern -
                  10-30 second model load times require warm instance pools
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonImageClassificationScaleFailureModesAndProductionReliability;
