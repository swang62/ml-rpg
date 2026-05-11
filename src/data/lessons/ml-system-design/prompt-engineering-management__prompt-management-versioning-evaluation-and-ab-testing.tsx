import type { Component } from "solid-js";

const LessonPromptEngineeringManagementPromptManagementVersioningEvaluationAndAbTesting: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Prompt Management: Versioning, Evaluation, and A/B Testing
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 0; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Prompt Versioning
            </p>
            <p style="margin-top: 0">
              Prompts need version control separate from code. Why separate?
              Prompts change more frequently (often daily during optimization),
              non-engineers may need to edit them (product managers, content
              writers), and prompt changes require different testing than code
              changes. A dedicated system tracks each version with metadata:
              author, timestamp, rationale for change, and measured performance
              on test cases.
            </p>
            <p>
              A typical version entry: Version 47 by Sarah on March 15, changed
              from "Summarize the following" to "Write a 2-3 sentence summary of
              the key points." Accuracy improved from 78% to 84% on test set.
              This history is invaluable for debugging production issues - you
              can pinpoint exactly when a problem started.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Evaluation Frameworks
            </p>
            <p style="margin-top: 0">
              Systematic evaluation requires test suites covering normal cases,
              edge cases, and adversarial inputs. Define metrics appropriate to
              your task: accuracy for classification, ROUGE or BLEU for
              summarization, human preference scores for open-ended generation.
              Run evaluations automatically on prompt changes before deployment.
              Track metrics over time to detect drift.
            </p>
            <p>
              Evaluation datasets must be representative but not overfit. If you
              tune prompts obsessively on your test set, you optimize for those
              specific examples rather than general performance. Hold out a
              separate validation set that you check only occasionally.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Key Insight:</strong> Prompt A/B tests need larger
              sample sizes than UI tests. LLM outputs have higher variance than
              button clicks. A UI test might conclude at 500 users. A prompt
              test might need 5000 requests for statistical significance.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              A/B Testing
            </p>
            <p style="margin-top: 0">
              Before deploying prompt changes to all users, route 10% of traffic
              to the new version while 90% uses the current version. Compare
              metrics after 1000-5000 requests. Set clear success criteria
              before the test: "New version must achieve equal or better
              accuracy with no more than 10% latency increase." Without
              predefined criteria, there is pressure to ship regardless of
              results.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 540px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">Development Channel</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Draft prompts + Offline eval (500-2000 test cases)
                  </div>
                </div>
                <div style="text-align: center; font-size: 20px; font-weight: bold">
                  ↓ Promote
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">Staging Channel</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Integration tests + Model version pinning
                  </div>
                </div>
                <div style="text-align: center; font-size: 20px; font-weight: bold">
                  ↓ Release
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">Production Channel</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    A/B test: 5-20% traffic to new variant
                  </div>
                </div>
                <div style="display: flex; gap: 8px; margin-top: 4px">
                  <div style="flex: 1; border: 2px solid; padding: 8px; border-radius: 6px; font-size: 11px; text-align: center">
                    <strong>Control</strong>
                    <br />
                    80-95% traffic
                  </div>
                  <div style="flex: 1; border: 2px solid; padding: 8px; border-radius: 6px; font-size: 11px; text-align: center">
                    <strong>Treatment</strong>
                    <br />
                    5-20% traffic
                  </div>
                </div>
                <div style="text-align: center; font-size: 20px; font-weight: bold; margin-top: 4px">
                  ⟲ Rollback if metrics degrade
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
                  Prompt versioning needs separate system from code: prompts
                  change daily, non-engineers edit them, testing requirements
                  differ
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Each version tracks author, timestamp, rationale, and measured
                  performance - essential for debugging production issues
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Evaluation requires test suites with normal cases, edge cases,
                  adversarial inputs - hold out validation set to avoid
                  overfitting
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  A/B tests need 5000+ requests (not 500) for significance due
                  to high LLM output variance - set success criteria before
                  testing
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
                  Describe version entries: who changed what, why, and measured
                  impact (78% to 84% accuracy). Shows how to debug.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Warn about test set overfitting: if you tune obsessively on
                  test data, you optimize for those examples, not general
                  performance.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Give specific A/B test guidance: 10% traffic split, 1000-5000
                  requests needed, predefined success criteria.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonPromptEngineeringManagementPromptManagementVersioningEvaluationAndAbTesting;
