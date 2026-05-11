import type { Component } from "solid-js";

const LessonTokenizationPreprocessingFailureModesTrainServeSkewUnicodePitfallsAndSpanAlignment: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Failure Modes: Train Serve Skew, Unicode Pitfalls, and Span
            Alignment
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 0; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Train-Serve Skew
            </p>
            <p style="margin-top: 0">
              Training uses one preprocessing pipeline; serving uses another.
              Training normalized with NFKC; serving uses NFC. Training
              lowercased; serving does not. The model learned patterns on
              processed text but receives differently processed text at
              inference. Accuracy drops 5-15% with no obvious error.
            </p>
            <p>
              <strong>Detection:</strong> Compare token distributions between
              training and production. If production generates tokens the model
              rarely saw during training, you have preprocessing skew. Log the
              top 100 most frequent tokens in both environments.
            </p>
            <p>
              <strong>Fix:</strong> Package preprocessing and tokenization as a
              single library. Training and serving import the same code. Version
              the tokenizer with the model. Never update preprocessing without
              retraining.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Unicode Pitfalls
            </p>
            <p style="margin-top: 0">
              <strong>Zero-width characters:</strong> Zero-width space,
              zero-width joiner, and similar invisible characters exist in user
              input. They tokenize to unknown tokens or split words
              unexpectedly. "Hello" with a zero-width space in the middle
              becomes ["Hel", "lo"] instead of ["Hello"].
            </p>
            <p>
              <strong>Homoglyphs:</strong> Cyrillic "а" looks identical to Latin
              "a" but has a different codepoint. Attackers use this for
              phishing. Your model may treat them differently. Normalize or
              reject non-ASCII lookalikes in security-sensitive applications.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Span Alignment
            </p>
            <p style="margin-top: 0">
              For named entity recognition (NER), you label character spans:
              "New York" is characters 0-8. Tokenization produces ["New",
              "York"] or ["New", "Yor", "k"] depending on the algorithm. Mapping
              character offsets to token offsets requires alignment tables.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Alignment Bug:</strong> If tokenization does not
              preserve offset mapping, you cannot convert model predictions back
              to character positions. Most tokenizers provide offset_mapping
              output. Always verify this works for your edge cases.
            </div>
            <p>
              <strong>Subword boundary labels:</strong> If "New York" becomes
              ["New", "Yor", "k"], which tokens get the entity label? Common
              schemes: label first token only (BIO tagging), label all tokens
              (adds redundancy), label first and last (span markers).
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 540px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="text-align: center; font-weight: bold; font-size: 15px; margin-bottom: 4px">
                  Train Serve Skew Example
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px">Training Path</strong>
                  <div style="margin-top: 8px; font-size: 12px; line-height: 1.5">
                    Input: "Apple iPhone"
                    <br />
                    Preprocessing: Lowercase
                    <br />
                    Tokens: ["apple", "iphone"]
                    <br />
                    IDs: [5241, 18192]
                  </div>
                </div>
                <div style="text-align: center; font-size: 24px; font-weight: bold">
                  ≠
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Serving Path (Misconfigured)
                  </strong>
                  <div style="margin-top: 8px; font-size: 12px; line-height: 1.5">
                    Input: "Apple iPhone"
                    <br />
                    Preprocessing: Cased
                    <br />
                    Tokens: ["Apple", "iPhone"]
                    <br />
                    IDs: [8912, 22043]
                  </div>
                </div>
                <div style="border-top: 2px solid; margin-top: 4px; padding-top: 10px; font-size: 12px; text-align: center; font-weight: bold">
                  Result: Wrong embeddings, 10-15% recall drop
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
                  Train-serve skew: different preprocessing in training vs
                  serving drops accuracy 5-15%
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Package preprocessing and tokenizer as single library used by
                  both training and serving
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Zero-width characters split words unexpectedly; homoglyphs
                  look identical but are different codepoints
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Span alignment maps character offsets to token offsets for
                  NER; verify offset_mapping works
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Subword boundary labels: BIO tags first token only, span
                  markers label first and last
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
                  Show train-serve skew detection: compare top 100 token
                  frequencies between environments
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Explain zero-width character problem: invisible character
                  splits 'Hello' into ['Hel', 'lo']
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  For NER, mention offset_mapping: must preserve
                  character-to-token alignment for predictions
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonTokenizationPreprocessingFailureModesTrainServeSkewUnicodePitfallsAndSpanAlignment;
