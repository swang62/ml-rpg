import type { Component } from "solid-js";

const LessonTokenizationPreprocessingTokenizerTrainingAndOperationalBestPractices: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Tokenizer Training and Operational Best Practices
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 0; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              When to Train a Custom Tokenizer
            </p>
            <p style="margin-top: 0">
              Pre-trained tokenizers work well for general English text. Train
              your own when: your domain has specialized vocabulary (medical
              terms, chemical formulas, code), you need multilingual coverage
              not in existing tokenizers, or compression ratio on your data is
              poor (more than 2 tokens per word average).
            </p>
            <p>
              Training cost is low: a few hours on 10-100GB of text. The risk is
              getting it wrong and needing to retrain the entire model. Test
              extensively before committing to a vocabulary.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Training Process
            </p>
            <p style="margin-top: 0">
              <strong>Data selection:</strong> Use representative text from your
              domain. Include rare but important terms. Balance across languages
              if multilingual. 10GB is minimum; 100GB gives better coverage of
              rare words.
            </p>
            <p>
              <strong>BPE training:</strong> Start with byte-level vocabulary
              (256 entries). Iteratively merge the most frequent adjacent pairs.
              Stop when vocabulary reaches target size. More merges = larger
              vocabulary = better compression but more memory.
            </p>
            <p>
              <strong>Special tokens:</strong> Reserve slots for [PAD], [UNK],
              [CLS], [SEP], [MASK] and any task-specific tokens. Add these
              before training. You cannot add special tokens later without
              breaking existing models.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Operational Best Practices
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>✅ Version Everything:</strong> Tokenizer version,
              vocabulary hash, preprocessing code version. Store together with
              model checkpoints. You must be able to recreate exact tokenization
              from any model version.
            </div>
            <p>
              <strong>Vocabulary updates:</strong> Never modify vocabulary of a
              trained model. Adding tokens invalidates learned embeddings. If
              you need new tokens, train a new model from scratch or use the
              [UNK] fallback.
            </p>
            <p>
              <strong>Testing:</strong> Create a test suite of edge cases: empty
              strings, single characters, maximum length inputs, Unicode edge
              cases, adversarial inputs. Run on every tokenizer change.
              Regression bugs are subtle and costly.
            </p>
            <p>
              <strong>Monitoring:</strong> Track token distribution in
              production. Alert if unknown token rate exceeds 0.1% or if average
              sequence length changes by more than 10%. Both indicate data
              distribution shift.
            </p>
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Train custom tokenizer for specialized vocabulary,
                  multilingual needs, or poor compression ratio
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  BPE training: start with 256 bytes, merge frequent pairs until
                  target vocabulary size
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Reserve special tokens ([PAD], [UNK], [CLS], [SEP], [MASK])
                  before training
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Never modify vocabulary of a trained model; adding tokens
                  invalidates learned embeddings
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Monitor unknown token rate (alert if &gt;0.1%) and sequence
                  length changes (alert if &gt;10% shift)
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
                  Explain when to train custom tokenizer: specialized domain,
                  multilingual, or &gt;2 tokens/word average
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mention versioning: tokenizer version, vocabulary hash,
                  preprocessing code must be stored with model
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  For monitoring, alert on unknown token rate &gt;0.1% or
                  sequence length change &gt;10%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonTokenizationPreprocessingTokenizerTrainingAndOperationalBestPractices;
