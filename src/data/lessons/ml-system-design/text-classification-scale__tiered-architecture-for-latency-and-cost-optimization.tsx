import type { Component } from "solid-js";

const LessonTextClassificationScaleTieredArchitectureForLatencyAndCostOptimization: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Tiered Architecture for Latency and Cost Optimization
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="padding: 14px 16px; border: 2px solid; border-left: 4px solid; border-radius: 6px; margin: 0">
              <div style="font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px">
                Key Insight
              </div>
              <div style="font-size: 15px; line-height: 1.5">
                <strong>Tiered classification</strong> uses multiple models of
                increasing capability and cost. Fast cheap models handle easy
                cases; slow expensive models handle hard cases. Most requests
                never hit the expensive tier.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Why Tiers Work
            </p>
            <p style="margin-top: 0">
              Not all classification requests are equally difficult. "I want to
              cancel my subscription" is obviously a cancellation request. But
              "I am thinking about whether this makes sense for my budget" is
              ambiguous. A simple model classifies the first correctly at 2ms.
              The second needs a sophisticated model that takes 150ms.
            </p>
            <p>
              The key insight: 70-80% of real production traffic is easy cases.
              If you can identify and route them to cheap models, you cut
              average latency and cost dramatically while maintaining accuracy
              on hard cases.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Three Tier Architecture
            </p>
            <p style="margin-top: 0">
              <strong>Tier 1 (Rule-based, 0.5ms):</strong> Keyword matching and
              regex patterns. "Cancel subscription" triggers cancellation label.
              Handles 30-40% of traffic with 99% precision on matched patterns.
              No ML cost.
            </p>
            <p>
              <strong>Tier 2 (Lightweight ML, 5ms):</strong> Distilled BERT or
              logistic regression on TF-IDF. Handles 40-50% of traffic. 85-90%
              accuracy. Runs on CPU.
            </p>
            <p>
              <strong>Tier 3 (Full model, 100-200ms):</strong> Large language
              model or fine-tuned transformer. Handles remaining 10-20% of
              ambiguous cases. 92-95% accuracy. Requires GPU.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Routing Logic
            </p>
            <p style="margin-top: 0">
              Each tier outputs a confidence score. If Tier 1 matches with
              confidence above 0.95, return immediately. Otherwise, pass to Tier
              2. If Tier 2 confidence is below 0.80, escalate to Tier 3. These
              thresholds are tuned on validation data to balance accuracy vs
              cost.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Cost Math:</strong> 1M requests/day. Without tiers: all
              hit GPU at /bin/zsh.001 each = /day. With tiers: 35% rules
              (/bin/zsh), 45% CPU (/bin/zsh.0001), 20% GPU = /day. Same
              accuracy, 78% cost reduction.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 12px; align-items: center">
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 180px; text-align: center">
                  <strong style="font-size: 14px">Incoming Traffic</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    1000 requests/sec
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 180px; text-align: center">
                  <strong style="font-size: 14px">Fast Gate (CPU)</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    TF IDF + Rules: 0.5ms
                  </div>
                  <div style="font-size: 12px">Handles 70% of traffic</div>
                </div>
                <div style="display: flex; gap: 16px; width: 100%">
                  <div style="flex: 1; text-align: center">
                    <div style="font-size: 20px; font-weight: bold">↓ 70%</div>
                    <div style="border: 2px solid; padding: 12px; border-radius: 6px; margin-top: 8px">
                      <strong style="font-size: 13px">Return Label</strong>
                      <div style="font-size: 11px; margin-top: 4px">
                        High confidence
                      </div>
                    </div>
                  </div>
                  <div style="flex: 1; text-align: center">
                    <div style="font-size: 20px; font-weight: bold">↓ 30%</div>
                    <div style="border: 2px solid; padding: 12px; border-radius: 6px; margin-top: 8px">
                      <strong style="font-size: 13px">
                        Heavy Expert (GPU)
                      </strong>
                      <div style="font-size: 11px; margin-top: 4px">
                        BERT: 20ms + batch
                      </div>
                    </div>
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
                  70-80% of classification requests are easy cases that simple
                  models handle correctly
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Tier 1 uses rules/regex (0.5ms, 30-40% traffic), Tier 2 uses
                  lightweight ML (5ms, 40-50%), Tier 3 uses full model (100ms,
                  10-20%)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Confidence thresholds control routing: high confidence returns
                  early, low confidence escalates
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Tiered approach can reduce costs by 70-80% while maintaining
                  accuracy on hard cases
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Tune thresholds on validation data to balance accuracy vs
                  latency vs cost
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
                  Describe the three tier pattern: rules for obvious cases,
                  lightweight ML for medium, full model for ambiguous
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Show the cost math: 1M requests with tiers costs 78% less than
                  sending all to GPU
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Explain confidence-based routing: set thresholds based on
                  validation accuracy at each tier
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonTextClassificationScaleTieredArchitectureForLatencyAndCostOptimization;
