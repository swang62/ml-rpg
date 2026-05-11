import type { Component } from "solid-js";

const LessonTokenizationPreprocessingPreprocessingPipelineNormalizationAndTextCleaning: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Preprocessing Pipeline: Normalization and Text Cleaning
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 0; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Why Preprocessing Matters
            </p>
            <p style="margin-top: 0">
              Identical text can have different byte representations. "Café"
              could be encoded as a single character (é) or as two characters (e
              followed by combining accent). Without normalization, these appear
              as different tokens to the model, fragmenting the vocabulary and
              reducing model quality.
            </p>
            <p>
              Preprocessing standardizes text before tokenization. The goal:
              ensure semantically identical inputs produce identical token
              sequences. This affects both training data quality and inference
              consistency.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Unicode Normalization
            </p>
            <p style="margin-top: 0">
              <strong>NFC (Composed):</strong> Combines base character with
              accent into single codepoint. é becomes one character. Most web
              content uses NFC. This is the standard choice for tokenization.
            </p>
            <p>
              <strong>NFD (Decomposed):</strong> Separates base character and
              accent into distinct codepoints. é becomes e + combining acute
              accent. Useful when you need to strip accents for search
              applications.
            </p>
            <p>
              <strong>NFKC/NFKD:</strong> Compatibility normalization. Converts
              fullwidth characters to ASCII equivalents, ligatures to separate
              letters, circled numbers to regular digits. Essential for CJK text
              processing.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Text Cleaning Steps
            </p>
            <p style="margin-top: 0">
              <strong>Lowercasing:</strong> Reduces vocabulary size by 30-40%
              but loses information. "Apple" (company) and "apple" (fruit)
              become identical. Use for search and classification; avoid for
              generation tasks.
            </p>
            <p>
              <strong>Whitespace normalization:</strong> Multiple spaces, tabs,
              and newlines collapse to single spaces. Invisible Unicode spaces
              (non-breaking, zero-width) convert to regular spaces.
            </p>
            <p>
              <strong>Special character handling:</strong> HTML entities
              (&amp;amp; → &amp;) decoded. URLs and emails optionally replaced
              with [URL] and [EMAIL] tokens to prevent vocabulary pollution.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Order Matters
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Pipeline Order:</strong> Unicode normalization → HTML
              decoding → whitespace normalization → lowercasing (optional) →
              tokenization. Wrong order causes subtle bugs: lowercasing before
              normalization may miss certain Unicode uppercase variants.
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
                  Identical text can have different byte representations;
                  normalization ensures consistent tokens
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  NFC (composed) is standard for tokenization; NFKC essential
                  for CJK text
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Lowercasing reduces vocabulary 30-40% but loses semantic
                  information
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Pipeline order matters: normalize → decode HTML → whitespace →
                  lowercase → tokenize
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Replace URLs and emails with placeholder tokens to prevent
                  vocabulary pollution
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
                  Explain NFC vs NFD: composed puts accent in one character,
                  decomposed separates it
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Show lowercasing trade-off: reduces vocabulary but Apple
                  (company) = apple (fruit)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mention pipeline order: wrong order causes subtle bugs with
                  Unicode uppercase variants
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonTokenizationPreprocessingPreprocessingPipelineNormalizationAndTextCleaning;
