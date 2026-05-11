import type { Component } from "solid-js";

const LessonNamedEntityRecognitionNerModelArchitectureTradeOffsRulesCrfsTransformersAndLlms: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            NER Model Architecture Trade-offs: Rules, CRFs, Transformers, and
            LLMs
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 0; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Rule-Based NER
            </p>
            <p style="margin-top: 0">
              The simplest NER approach uses pattern matching: regular
              expressions for phone numbers and emails, lookup tables
              (gazetteers) for known entity names, hand-written rules for
              specific formats. A rule might say: any sequence of capitalized
              words followed by Inc, Corp, or LLC is likely an organization.
              This works surprisingly well for well-defined patterns and runs
              extremely fast, typically under 1 millisecond per document.
            </p>
            <p>
              The limitation is coverage. Rules only catch patterns you
              anticipated. A new company name with unusual capitalization, a
              phone number in an unexpected format, a person's name you did not
              include in your list - all of these slip through. Rule-based
              systems also require constant maintenance as new patterns emerge,
              and they cannot learn from data.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Statistical and Neural Models
            </p>
            <p style="margin-top: 0">
              Machine learning models learn entity patterns from labeled
              training data. Traditional approaches like Conditional Random
              Fields (CRFs) model the sequential nature of text, understanding
              that the word after "Mr." is likely a person name. Modern
              transformer-based models like BERT go further, using deep
              contextual understanding to distinguish "Apple the company" from
              "apple the fruit" based on surrounding words.
            </p>
            <p>
              These models generalize to unseen entities. A neural model trained
              on one set of company names can recognize new companies it has
              never seen, based on contextual patterns. The trade-off is
              computational cost: transformer models require 10-100x more
              computation than rule-based systems, and they need substantial
              labeled training data (typically 10,000+ annotated examples for
              good performance).
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Key Insight:</strong> Production systems often combine
              approaches. Rules handle high-precision, well-defined patterns
              (email addresses, phone numbers). Neural models handle ambiguous
              cases requiring context (company names, person names). This hybrid
              achieves both speed and coverage.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Choosing an Approach
            </p>
            <p style="margin-top: 0">
              Start with rules for clearly structured entities. Use neural
              models when context matters for disambiguation. Measure precision
              and recall separately: rules typically have high precision but low
              recall, neural models have more balanced metrics. Combine them
              when you need both.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 580px">
              <div style="margin-bottom: 12px; font-weight: 700; font-size: 14px; text-align: center">
                NER Model Comparison
              </div>
              <div style="display: flex; flex-direction: column; gap: 8px">
                <div style="display: flex; gap: 8px; font-size: 11px; font-weight: 700; padding: 6px; border: 2px solid; border-radius: 6px">
                  <div style="flex: 1; min-width: 80px">Approach</div>
                  <div style="flex: 1; min-width: 70px">Latency</div>
                  <div style="flex: 1; min-width: 70px">Memory</div>
                  <div style="flex: 1; min-width: 60px">F1</div>
                  <div style="flex: 1; min-width: 80px">Best For</div>
                </div>
                <div style="display: flex; gap: 8px; font-size: 11px; padding: 8px; border: 2px solid; border-radius: 6px">
                  <div style="flex: 1; min-width: 80px">
                    <strong>Rules</strong>
                  </div>
                  <div style="flex: 1; min-width: 70px">&lt;1ms</div>
                  <div style="flex: 1; min-width: 70px">~5 MB</div>
                  <div style="flex: 1; min-width: 60px">60 to 75</div>
                  <div style="flex: 1; min-width: 80px">Compliance</div>
                </div>
                <div style="display: flex; gap: 8px; font-size: 11px; padding: 8px; border: 2px solid; border-radius: 6px">
                  <div style="flex: 1; min-width: 80px">
                    <strong>CRF</strong>
                  </div>
                  <div style="flex: 1; min-width: 70px">&lt;1ms</div>
                  <div style="flex: 1; min-width: 70px">10 to 50 MB</div>
                  <div style="flex: 1; min-width: 60px">75 to 85</div>
                  <div style="flex: 1; min-width: 80px">Edge/IoT</div>
                </div>
                <div style="display: flex; gap: 8px; font-size: 11px; padding: 8px; border: 2px solid; border-radius: 6px">
                  <div style="flex: 1; min-width: 80px">
                    <strong>Transformer</strong>
                  </div>
                  <div style="flex: 1; min-width: 70px">2 to 5ms</div>
                  <div style="flex: 1; min-width: 70px">100 to 400 MB</div>
                  <div style="flex: 1; min-width: 60px">90 to 93</div>
                  <div style="flex: 1; min-width: 80px">Production</div>
                </div>
                <div style="display: flex; gap: 8px; font-size: 11px; padding: 8px; border: 2px solid; border-radius: 6px">
                  <div style="flex: 1; min-width: 80px">
                    <strong>LLM</strong>
                  </div>
                  <div style="flex: 1; min-width: 70px">300 to 1000ms</div>
                  <div style="flex: 1; min-width: 70px">2 to 10 GB</div>
                  <div style="flex: 1; min-width: 60px">85 to 95</div>
                  <div style="flex: 1; min-width: 80px">Analysts</div>
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
                  Rule-based NER uses patterns and lookup tables, running under
                  1ms but only catching anticipated patterns with no learning
                  capability
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Neural models like BERT generalize to unseen entities using
                  context but require 10-100x more computation and 10K+ labeled
                  examples
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Production systems combine both: rules for high-precision
                  structured patterns, neural models for ambiguous
                  context-dependent cases
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Rules have high precision but low recall; neural models have
                  more balanced metrics. Choose based on which errors cost more.
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
                  Start simple - mention that rule-based NER handles emails and
                  phone numbers at sub-millisecond latency. Then escalate to
                  neural models for ambiguous cases.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Quantify the compute trade-off: rules at &lt;1ms vs
                  transformers at 10-100ms. This shapes architecture decisions.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Suggest the hybrid pattern proactively. It shows you
                  understand production systems use multiple approaches
                  together.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonNamedEntityRecognitionNerModelArchitectureTradeOffsRulesCrfsTransformersAndLlms;
