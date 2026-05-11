import type { Component } from "solid-js";

const LessonCvDataAugmentationAutoaugmentAutomatedPolicyDiscovery: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            AutoAugment: Automated Policy Discovery
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 0; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              THE MANUAL TUNING PROBLEM
            </p>
            <p style="margin-top: 0">
              Hand-tuning augmentation policies is tedious and error-prone.
              Should you rotate ±15° or ±30°? Apply color jitter with range 0.2
              or 0.4? These decisions are dataset-specific: what works for
              natural images may hurt medical imaging where color carries
              diagnostic signal. AutoAugment automates this by searching over
              the space of possible policies.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              HOW AUTOAUGMENT WORKS
            </p>
            <p style="margin-top: 0">
              AutoAugment defines a search space of augmentation policies. Each
              policy consists of 5-25 sub-policies. Each sub-policy contains 2
              operations (e.g., rotate, color jitter) with two parameters:
              probability of applying (0-1) and magnitude (how strong). The
              search algorithm (reinforcement learning or population-based
              training) evaluates thousands of candidate policies by training
              small proxy models for 5-10 epochs each. Policies that improve
              validation accuracy are refined; poor ones are discarded.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              SEARCH COST AND AMORTIZATION
            </p>
            <p style="margin-top: 0">
              Initial search is expensive: 12-48 hours on a small GPU cluster.
              But the discovered policy is reusable. A policy found on one
              architecture (ResNet-50) transfers well to others (EfficientNet)
              on the same dataset. Store policies as versioned artifacts. The
              one-time search cost is amortized across all future training runs.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Key Trade-off:</strong> Policies discovered on small
              proxy models (10% data, 5 epochs) may not transfer perfectly to
              full-scale training. Validate on held-out slices before production
              use.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              ACCURACY IMPROVEMENTS
            </p>
            <p style="margin-top: 0">
              AutoAugment typically improves top-1 accuracy by 1-2 percentage
              points on large datasets (ImageNet) and 2-5 percentage points on
              smaller datasets (CIFAR-10) where overfitting is more severe.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 14px">
                    Search Phase (Offline)
                  </strong>
                  <div style="font-size: 12px; margin-top: 6px">
                    Controller proposes policy → Train proxy model 5 to 10
                    epochs → Measure validation accuracy → Update controller
                  </div>
                  <div style="font-size: 12px; margin-top: 4px">
                    Duration: 12 to 48 hours | Cost: Small GPU cluster
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 14px">Discovered Policy</strong>
                  <div style="font-size: 12px; margin-top: 6px">
                    Sub Policy 1: Rotate(0.8, 15° to 30°) + Contrast(0.6, 1.1 to
                    1.5)
                  </div>
                  <div style="font-size: 12px">
                    Sub Policy 2: Shear(0.7, 10% to 20%) + Brightness(0.5, 0.8
                    to 1.2)
                  </div>
                  <div style="font-size: 12px; margin-top: 4px">
                    5 to 25 sub policies total
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 14px">Production Training</strong>
                  <div style="font-size: 12px; margin-top: 6px">
                    Sample 1 sub policy per image → Apply 2 ops with
                    probabilities → 1% accuracy gain on ImageNet
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
                  AutoAugment searches over augmentation policies (5-25
                  sub-policies, each with 2 operations, probability, and
                  magnitude)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Search cost: 12-48 hours evaluating thousands of policies with
                  proxy models trained 5-10 epochs each
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Discovered policies transfer across architectures on the same
                  dataset, amortizing the one-time search cost
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Accuracy improvement: 1-2 percentage points on ImageNet, 2-5
                  percentage points on smaller datasets
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
                  Explain the policy structure: 5-25 sub-policies, each with 2
                  operations and probability/magnitude parameters
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mention transferability: policy found on ResNet-50 works for
                  EfficientNet on the same dataset
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Warn about proxy model overfitting: policies from small
                  subsets may not transfer to full-scale training
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonCvDataAugmentationAutoaugmentAutomatedPolicyDiscovery;
