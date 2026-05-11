import type { Component } from "solid-js";

const LessonMultilingualSystemsFailureModesInProductionMultilingualSystems: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Failure Modes in Production Multilingual Systems
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              LOW-RESOURCE LANGUAGE DEGRADATION
            </p>
            <p>
              Multilingual models perform worse on languages with less training
              data. A model might achieve 90% accuracy on English but only 60%
              on Swahili. Users in low-resource language markets get inferior
              experience.
            </p>
            <p>
              <strong>Detection:</strong> Benchmark quality per language. Track
              user satisfaction or task success rates by language. Set minimum
              quality thresholds.
            </p>
            <p>
              <strong>Mitigation:</strong> Collect more training data for
              low-resource languages. Use translation augmentation. Apply
              language-specific fine-tuning. Consider falling back to
              translation + high-quality English model.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              TOKENIZATION FAILURES
            </p>
            <p>
              Tokenizers trained primarily on Latin scripts may produce poor
              tokenizations for other scripts. Chinese text might tokenize into
              individual bytes. Arabic diacritics might be mishandled. This
              hurts both quality and efficiency.
            </p>
            <p>
              <strong>Symptoms:</strong> Unusually long token sequences for
              certain languages. Nonsense outputs. Model refusing to process
              certain inputs.
            </p>
            <p>
              <strong>Fix:</strong> Use tokenizers trained on multilingual
              corpora. Test tokenization quality across all supported languages.
              Consider language-specific preprocessing.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              LANGUAGE DETECTION ERRORS
            </p>
            <p>
              Automatic language detection is imperfect. Short texts,
              code-switched text, and similar languages (e.g., Serbian vs
              Croatian) cause errors. Wrong language detection leads to wrong
              model routing or wrong output language.
            </p>
            <p>
              <strong>Mitigation:</strong> Use user-provided language preference
              when available. Require minimum text length for detection.
              Implement fallback behavior for uncertain detections.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              CULTURAL AND REGIONAL BIAS
            </p>
            <p>
              Models may produce culturally inappropriate content for certain
              regions. Date formats, currency assumptions, cultural references,
              and humor do not transfer across cultures.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Key Insight:</strong> Test every supported language
              independently. Aggregate metrics hide per-language problems. If
              you claim to support a language, ensure quality meets minimum
              standards.
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
                  Low-resource degradation: 90% English accuracy vs 60% Swahili;
                  benchmark and set minimum thresholds per language
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Tokenization failures: Latin-trained tokenizers produce poor
                  results on other scripts; test across all languages
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Language detection errors: short text, code-switching, similar
                  languages cause misrouting; use user preference when available
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
                  Interview Tip: Give specific quality gap examples: 90% English
                  vs 60% low-resource language.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Explain tokenization failure symptoms: long
                  token sequences, nonsense outputs.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonMultilingualSystemsFailureModesInProductionMultilingualSystems;
