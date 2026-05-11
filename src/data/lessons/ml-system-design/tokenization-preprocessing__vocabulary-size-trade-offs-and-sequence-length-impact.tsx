import type { Component } from "solid-js";

const LessonTokenizationPreprocessingVocabularySizeTradeOffsAndSequenceLengthImpact: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Vocabulary Size Trade-offs and Sequence Length Impact
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 0; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Vocabulary Size Trade-offs
            </p>
            <p style="margin-top: 0">
              Smaller vocabulary (16K-32K tokens): Each token is more common, so
              the model sees each one more times during training. Better
              generalization on limited data. But rare words split into many
              tokens, increasing sequence length. "Unhappiness" might become
              ["un", "ha", "pp", "i", "ness"] with 5 tokens.
            </p>
            <p>
              Larger vocabulary (64K-100K tokens): Rare words stay intact as
              single tokens. Sequence lengths stay shorter, fitting more content
              in the context window. But each token appears less often in
              training data, requiring more data for good representations. Also
              increases memory for the embedding table.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Sequence Length Impact
            </p>
            <p style="margin-top: 0">
              Language models have fixed context windows: 2048, 4096, 8192
              tokens. If your tokenizer produces more tokens per word, you fit
              fewer words in the context. This directly impacts model
              capability: a document that fits in context can be summarized; one
              that does not cannot.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Compression Ratio:</strong> Measure tokens per word.
              English text averages 1.3-1.5 tokens per word with 32K vocabulary,
              1.1-1.3 with 100K vocabulary. Code averages 1.5-2.0 tokens per
              word. A 20% improvement in compression means 20% more content fits
              in context.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Memory Considerations
            </p>
            <p style="margin-top: 0">
              The embedding table stores one vector per vocabulary entry. At 768
              dimensions with 32-bit floats, each entry is 3KB. A 50K vocabulary
              needs 150MB just for embeddings. Doubling vocabulary to 100K
              doubles this to 300MB.
            </p>
            <p>
              For edge deployment on mobile or IoT devices, this matters. A 16K
              vocabulary with 256 dimensions fits in 16MB, enabling on-device
              inference. Production servers rarely care about this difference.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Multilingual Vocabulary
            </p>
            <p style="margin-top: 0">
              Covering 100+ languages requires larger vocabularies. Each
              language needs representation. A 32K vocabulary splits unevenly:
              English might get 15K tokens while Hindi gets 500. Hindi text ends
              up with 3-4× more tokens per word than English, severely limiting
              its effective context length.
            </p>
            <p>
              Multilingual models often use 100K-250K tokens to give adequate
              coverage. This increases model size but ensures no language is
              severely penalized on sequence length.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="text-align: center; font-weight: bold; font-size: 15px; margin-bottom: 6px">
                  Vocabulary Size Trade-offs
                </div>
                <div style="display: flex; gap: 12px">
                  <div style="flex: 1; border: 2px solid; padding: 10px; border-radius: 6px">
                    <strong style="font-size: 13px">Small Vocab</strong>
                    <div style="font-size: 12px; margin-top: 6px">
                      32K tokens
                    </div>
                    <div style="font-size: 11px; margin-top: 8px; line-height: 1.4">
                      Embedding: 49MB
                      <br />
                      Sequence: 150 tokens
                      <br />
                      Coverage: Better
                      <br />
                      Softmax: Faster
                    </div>
                  </div>
                  <div style="flex: 1; border: 2px solid; padding: 10px; border-radius: 6px">
                    <strong style="font-size: 13px">Large Vocab</strong>
                    <div style="font-size: 12px; margin-top: 6px">
                      50K tokens
                    </div>
                    <div style="font-size: 11px; margin-top: 8px; line-height: 1.4">
                      Embedding: 77MB
                      <br />
                      Sequence: 120 tokens
                      <br />
                      Coverage: Sparse
                      <br />
                      Softmax: Slower
                    </div>
                  </div>
                </div>
                <div style="border-top: 2px solid; margin-top: 8px; padding-top: 10px; text-align: center">
                  <div style="font-size: 13px; font-weight: bold; margin-bottom: 6px">
                    Attention Cost for 2KB Document
                  </div>
                  <div style="font-size: 12px; line-height: 1.5">
                    Character (512 tokens): ~262K operations per layer
                    <br />
                    Subword (150 tokens): ~22.5K operations per layer
                    <br />
                    <span style="font-weight: bold">
                      Subword is 12x faster for attention
                    </span>
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
                  Smaller vocabulary (16-32K): better generalization but rare
                  words split into many tokens
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Larger vocabulary (64-100K): rare words stay intact but need
                  more training data per token
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Compression ratio: English is 1.3-1.5 tokens/word at 32K,
                  1.1-1.3 at 100K vocabulary
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Embedding table memory: 50K vocab at 768 dims = 150MB; doubles
                  to 300MB at 100K
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Multilingual needs 100K+ tokens so no language is penalized on
                  context length
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
                  Show vocabulary trade-off: 32K gives better generalization,
                  100K gives shorter sequences
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Explain compression ratio impact: 20% better compression = 20%
                  more content in context
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  For multilingual, mention uneven distribution: 32K might give
                  Hindi 3-4× more tokens than English
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonTokenizationPreprocessingVocabularySizeTradeOffsAndSequenceLengthImpact;
