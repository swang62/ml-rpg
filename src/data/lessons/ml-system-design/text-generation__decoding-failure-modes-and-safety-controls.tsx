import type { Component } from "solid-js";

const LessonTextGenerationDecodingFailureModesAndSafetyControls: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Decoding Failure Modes and Safety Controls
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 0; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Repetition Loops
            </p>
            <p style="margin-top: 0">
              The model generates "I think that I think that I think that..."
              endlessly. This happens because once a phrase appears, its
              probability increases for the next position. Beam search amplifies
              this: the repetitive sequence accumulates high probability and
              dominates all beams.
            </p>
            <p>
              <strong>Fix:</strong> Repetition penalty. Reduce the probability
              of tokens that already appeared in the output. A penalty of 1.2
              means previously-seen tokens get their logits divided by 1.2. Too
              high (2.0+) causes the model to avoid legitimate repetition like
              pronouns.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Length Degeneration
            </p>
            <p style="margin-top: 0">
              Beam search favors shorter sequences because probability
              accumulates multiplicatively. A 10-token sequence with 0.9
              per-token probability scores higher (0.9^10 = 0.35) than a
              20-token sequence with same per-token probability (0.9^20 = 0.12).
            </p>
            <p>
              <strong>Fix:</strong> Length normalization. Divide final score by
              sequence length or length raised to a power (alpha). Alpha of
              0.6-0.8 balances brevity preference against completion. Without
              this, the model outputs terse, incomplete responses.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Sampling Collapse
            </p>
            <p style="margin-top: 0">
              High temperature plus high top_p occasionally samples an extremely
              low probability token. Once one bad token enters the sequence, the
              model has no good continuations, and output quality collapses into
              nonsense.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Prevention:</strong> Use both temperature and top_p
              together. Temperature 0.7 reshapes distribution, then top_p 0.9
              filters out the long tail. Never use temperature 2.0 with top_p
              1.0 in production.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Safety Controls
            </p>
            <p style="margin-top: 0">
              <strong>Output filtering:</strong> Run generated text through a
              classifier before returning. Block responses containing harmful
              content, personally identifiable information, or policy
              violations. Latency cost: 10-50ms per response.
            </p>
            <p>
              <strong>Logit bias:</strong> Increase or decrease probability of
              specific tokens during generation. Set certain tokens to negative
              infinity to make them impossible to generate. Used for preventing
              profanity, brand names, or competitor mentions.
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
                  Repetition loops occur when prior tokens boost their own
                  probability; fix with repetition penalty 1.2
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Beam search favors shorter sequences due to multiplicative
                  probability; fix with length normalization
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Sampling collapse: one bad token derails entire output; use
                  temperature + top_p together
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Output filtering adds 10-50ms latency but catches harmful
                  content before returning
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Logit bias prevents specific tokens by setting their
                  probability to negative infinity
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
                  Explain repetition penalty: divide logits of seen tokens by
                  1.2, but not higher than 2.0
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Show length normalization math: divide score by length^alpha
                  where alpha is 0.6-0.8
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Never use temperature 2.0 with top_p 1.0 in production due to
                  sampling collapse risk
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonTextGenerationDecodingFailureModesAndSafetyControls;
