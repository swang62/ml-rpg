import type { Component } from "solid-js";

const LessonMultilingualSystemsLanguageConsistencyAndGenerationControlMechanisms: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Language Consistency and Generation Control Mechanisms
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              THE LANGUAGE MIXING PROBLEM
            </p>
            <p>
              Multilingual models can inadvertently mix languages in output. A
              user asks in French, model responds partly in French and partly in
              English. This is jarring and unprofessional.
            </p>
            <p>
              <strong>Causes:</strong> Training data had mixed-language
              examples. Model optimizes for content correctness, not language
              consistency. High-resource languages (English) dominate model
              priors.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              CONTROL MECHANISMS
            </p>
            <p>
              <strong>Language tagging:</strong> Prepend language code to input
              and require it in output. Example: [FR] Question here → [FR]
              Response here. Training with tags conditions the model to stay in
              the specified language.
            </p>
            <p>
              <strong>Language detection + filtering:</strong> Detect output
              language. If it does not match expected language, regenerate or
              post-process. Adds latency but guarantees consistency.
            </p>
            <p>
              <strong>Constrained decoding:</strong> During generation, bias
              token probabilities toward language-appropriate tokens. Requires
              language-specific vocabulary identification.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              SCRIPT AND FORMAT CONSISTENCY
            </p>
            <p>
              Beyond language, control script choice (simplified vs traditional
              Chinese), formality level, and regional variants (US vs UK
              English, Brazilian vs European Portuguese).
            </p>
            <p>
              <strong>Implementation:</strong> Include variant in prompt or
              system message. Fine-tune on variant-specific data. Post-process
              to normalize spelling/formatting.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              EVALUATION
            </p>
            <p>
              Measure language consistency rate: what percentage of outputs are
              entirely in the expected language? Track by language—consistency
              is often worse for low-resource languages. Human evaluation
              sampling is essential; automated detection has limitations.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Key Trade-off:</strong> Strict language control may
              reduce output quality if the model knows a concept better in
              English. Balance consistency requirements against content quality.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Layer 1: Explicit Prompt Control
                  </strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    "Respond in &#123;language&#125;" + ISO 639-1 code
                  </div>
                </div>
                <div style="text-align: center; font-size: 18px; font-weight: bold">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Layer 2: Post-Generation Validation
                  </strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Language ID on output: &lt;2ms | Match query language?
                  </div>
                </div>
                <div style="text-align: center; font-size: 18px; font-weight: bold">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Layer 3: Constrained Second Pass
                  </strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    If mismatch: Regenerate with stricter constraints |
                    +500-1200ms
                  </div>
                </div>
                <div style="text-align: center; font-size: 18px; font-weight: bold">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Layer 4: Fallback Translation
                  </strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Last resort: Translate correct English answer | +120-250ms
                  </div>
                </div>
                <div style="margin-top: 8px; padding: 8px; border: 2px solid; border-radius: 6px; text-align: center">
                  <strong style="font-size: 12px">
                    Target: 100% Language Consistency | Alert &lt;99.5%
                  </strong>
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
                  Language mixing: model outputs multiple languages; caused by
                  mixed training data and English-dominant priors
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Control mechanisms: language tags ([FR]), detection +
                  filtering, constrained decoding with language-biased tokens
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Measure consistency rate per language; worse for low-resource
                  languages; human evaluation essential
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
                  Interview Tip: Explain language tagging mechanism: prepend
                  [FR] to input and require in output.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Describe the consistency vs quality tradeoff:
                  strict control may hurt content quality.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonMultilingualSystemsLanguageConsistencyAndGenerationControlMechanisms;
