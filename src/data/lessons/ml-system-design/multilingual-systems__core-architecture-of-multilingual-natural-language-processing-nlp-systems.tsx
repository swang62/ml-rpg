import type { Component } from "solid-js";

const LessonMultilingualSystemsCoreArchitectureOfMultilingualNaturalLanguageProcessingNlpSystems: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Core Architecture of Multilingual Natural Language Processing (NLP)
            Systems
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
                <strong>Multilingual NLP systems</strong> process and generate
                content across multiple languages, requiring specialized
                architectures for handling diverse scripts, vocabularies, and
                linguistic structures.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              ARCHITECTURAL APPROACHES
            </p>
            <p>
              <strong>Single multilingual model:</strong> One model trained on
              data from all supported languages. Examples: mBERT, XLM-RoBERTa,
              multilingual LLMs. Simpler deployment but quality may be uneven
              across languages.
            </p>
            <p>
              <strong>Language-specific models:</strong> Separate models for
              each language or language family. Higher quality per language but
              complex deployment—routing, multiple model instances, more
              resources.
            </p>
            <p>
              <strong>Hybrid:</strong> Multilingual model for common patterns
              plus language-specific adapters or fine-tuning for high-priority
              languages. Balances quality and complexity.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              TOKENIZATION CHALLENGES
            </p>
            <p>
              Different languages have vastly different tokenization needs.
              Chinese has no spaces between words. German has long compound
              words. Arabic is written right-to-left. Thai has no explicit word
              boundaries.
            </p>
            <p>
              <strong>Vocabulary trade-off:</strong> Large shared vocabulary
              (100K+ tokens) handles more languages but increases model size.
              Smaller vocabulary requires more tokens per word for rare
              languages, hurting efficiency.
            </p>
            <p>
              Byte-level BPE (like GPT models use) handles any language but may
              be inefficient for non-Latin scripts. Language-specific tokenizers
              are more efficient but add deployment complexity.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              CROSS-LINGUAL TRANSFER
            </p>
            <p>
              Models trained on high-resource languages (English, Chinese) can
              transfer knowledge to low-resource languages. This is why
              multilingual models work at all—shared representations capture
              language-agnostic patterns.
            </p>
            <p>
              Transfer effectiveness varies. Languages in the same family
              transfer well (Spanish ↔ Portuguese). Distant languages transfer
              poorly (English ↔ Japanese).
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Key Insight:</strong> Multilingual systems trade off
              quality vs complexity. Single model is simpler but quality varies.
              Language-specific models have higher quality but higher
              operational burden.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 550px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Query (Japanese/German/English)
                  </strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Language ID: &lt;2ms
                  </div>
                </div>
                <div style="text-align: center; font-size: 20px; font-weight: bold">
                  ↓
                </div>
                <div style="display: flex; gap: 8px">
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; flex: 1">
                    <strong style="font-size: 12px">
                      Path 1: Multilingual Vector Index
                    </strong>
                    <div style="font-size: 10px; margin-top: 4px">
                      Shared embedding space
                    </div>
                  </div>
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; flex: 1">
                    <strong style="font-size: 12px">
                      Path 2: Query Translation
                    </strong>
                    <div style="font-size: 10px; margin-top: 4px">
                      +120-250ms fallback
                    </div>
                  </div>
                </div>
                <div style="text-align: center; font-size: 20px; font-weight: bold">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Top 50 Candidates → Rerank → Generate
                  </strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    p95 latency: &lt;2000ms | Language consistency: 100%
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
                  Approaches: single multilingual model (simpler),
                  language-specific models (higher quality), hybrid with
                  adapters (balanced)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Tokenization: shared vocabulary (100K+) or byte-level BPE;
                  non-Latin scripts need more tokens with byte-level
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Cross-lingual transfer works better for similar language
                  families; distant languages transfer poorly
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
                  Interview Tip: Compare single vs language-specific model
                  tradeoffs: deployment simplicity vs quality consistency.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Explain tokenization challenges: Chinese no
                  spaces, German compounds, Arabic RTL, Thai no word boundaries.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonMultilingualSystemsCoreArchitectureOfMultilingualNaturalLanguageProcessingNlpSystems;
