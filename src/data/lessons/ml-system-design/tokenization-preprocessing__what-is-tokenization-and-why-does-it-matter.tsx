import type { Component } from "solid-js";

const LessonTokenizationPreprocessingWhatIsTokenizationAndWhyDoesItMatter: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            What is Tokenization and Why Does It Matter?
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
                <strong>Tokenization</strong> is the process of splitting text
                into smaller units (tokens) that a model can process. A model
                cannot read raw text. It needs text converted into numerical IDs
                from a fixed vocabulary. Tokenization bridges the gap between
                human-readable text and model-processable numbers.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Why Not Just Split on Spaces
            </p>
            <p style="margin-top: 0">
              The naive approach: split "I love cats" into ["I", "love", "cats"]
              and assign each word an ID. This fails for three reasons. First,
              vocabulary explodes. English has 170,000+ words, plus
              misspellings, slang, and technical terms. A word-level vocabulary
              easily exceeds 1 million entries.
            </p>
            <p>
              Second, out of vocabulary (OOV) words break the system. If
              "cryptocurrency" is not in your vocabulary, the model cannot
              process it. You could add an [UNK] token for unknowns, but then
              the model loses all information about that word.
            </p>
            <p>
              Third, morphologically rich languages like German or Turkish
              create compound words that word-level tokenization cannot handle.
              "Donaudampfschifffahrtsgesellschaft" (Danube steamship company)
              would require a vocabulary entry for every possible compound.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Subword Tokenization
            </p>
            <p style="margin-top: 0">
              Modern tokenizers split text into subword units. "Unhappiness"
              becomes ["un", "happiness"] or ["un", "hap", "pi", "ness"]
              depending on the algorithm. Common words stay whole; rare words
              decompose into smaller pieces.
            </p>
            <p>
              This keeps vocabulary manageable (32,000-100,000 tokens) while
              handling any input. Even completely novel words decompose into
              known subwords. "Cryptocurrency" becomes ["crypto", "currency"]
              and the model can infer meaning from the parts.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Common Algorithms
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Three Main Approaches:</strong> BPE (Byte Pair
              Encoding) merges frequent character pairs iteratively. WordPiece
              uses likelihood maximization. SentencePiece operates on raw bytes,
              handling any language without preprocessing.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 14px">Raw Text: "playing"</strong>
                  <div style="margin-top: 8px; font-size: 13px">
                    9 characters
                  </div>
                </div>
                <div style="display: flex; gap: 16px; justify-content: center; align-items: center">
                  <div style="flex: 1; text-align: center">
                    <div style="font-size: 20px; font-weight: bold; margin-bottom: 8px">
                      ↓
                    </div>
                    <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                      <strong style="font-size: 13px">Word Level</strong>
                      <div style="margin-top: 6px; font-size: 12px">
                        1 token
                      </div>
                      <div style="font-size: 11px; margin-top: 4px">
                        Large vocab, OOV risk
                      </div>
                    </div>
                  </div>
                  <div style="flex: 1; text-align: center">
                    <div style="font-size: 20px; font-weight: bold; margin-bottom: 8px">
                      ↓
                    </div>
                    <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                      <strong style="font-size: 13px">Subword BPE</strong>
                      <div style="margin-top: 6px; font-size: 12px">
                        2 tokens: "play" + "ing"
                      </div>
                      <div style="font-size: 11px; margin-top: 4px">
                        Balanced, no OOV
                      </div>
                    </div>
                  </div>
                  <div style="flex: 1; text-align: center">
                    <div style="font-size: 20px; font-weight: bold; margin-bottom: 8px">
                      ↓
                    </div>
                    <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                      <strong style="font-size: 13px">Character</strong>
                      <div style="margin-top: 6px; font-size: 12px">
                        9 tokens
                      </div>
                      <div style="font-size: 11px; margin-top: 4px">
                        Long sequences, slow
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
                  Tokenization converts human text into numerical IDs from a
                  fixed vocabulary that models can process
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Word-level tokenization fails: vocabulary explodes (1M+
                  words), OOV words lose information, compounds cannot be
                  handled
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Subword tokenization splits rare words into pieces while
                  keeping common words whole
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Typical vocabulary size is 32,000-100,000 tokens, covering any
                  possible input
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Main algorithms: BPE (merge frequent pairs), WordPiece
                  (likelihood), SentencePiece (raw bytes)
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
                  Explain why word-level tokenization fails: vocabulary
                  explosion, OOV words, compound words
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Show subword example: 'cryptocurrency' becomes ['crypto',
                  'currency'] so model can infer meaning
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mention vocabulary sizes: 32K for efficient models, 100K for
                  multilingual coverage
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonTokenizationPreprocessingWhatIsTokenizationAndWhyDoesItMatter;
