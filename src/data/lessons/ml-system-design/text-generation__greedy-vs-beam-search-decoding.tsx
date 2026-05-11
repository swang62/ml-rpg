import type { Component } from "solid-js";

const LessonTextGenerationGreedyVsBeamSearchDecoding: Component = () => (
  <div class="lesson-content">
    <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
      <div class="mb-4 p-4">
        <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
          Greedy vs Beam Search Decoding
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
              <strong>Decoding</strong> is how a language model converts its
              internal probability predictions into actual text tokens. At each
              step, the model outputs probabilities for every possible next word
              (typically 50,000+ options). Decoding is the strategy for picking
              which word to actually use.
            </div>
          </div>
          <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            Greedy Decoding
          </p>
          <p style="margin-top: 0">
            The simplest approach: always pick the highest probability token. If
            the model says "the" has 0.3 probability, "a" has 0.2, and "an" has
            0.1, greedy picks "the." Repeat for every position until you hit an
            end token or max length.
          </p>
          <p>
            <strong>Why it fails:</strong> Greedy gets stuck in local optima.
            The highest probability first word might lead to a dead end. "The"
            might score 0.3 now, but the sentence "A brilliant idea emerged"
            could have higher overall probability than "The idea was good."
            Greedy cannot see ahead.
          </p>
          <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            Beam Search
          </p>
          <p style="margin-top: 0">
            Instead of keeping one candidate, keep the top K candidates (called
            beam width). At each step, expand all K candidates by considering
            their top tokens, then prune back to K total. A beam width of 5
            means tracking 5 partial sequences simultaneously.
          </p>
          <p>
            <strong>How it works:</strong> Start with "The" (0.3), "A" (0.2),
            "An" (0.1) as your 3 beams. Expand each: "The idea" (0.15), "The
            cat" (0.12), "A brilliant" (0.18), etc. Keep top 3 overall. After 20
            tokens, pick the sequence with highest cumulative probability.
          </p>
          <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            Beam Search Trade-offs
          </p>
          <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
            <strong>⚠️ Compute Cost:</strong> Beam width K means K× more
            computation per step. Beam 5 is 5× slower than greedy. For 100-token
            generation at 50ms per token, that is 5 seconds vs 25 seconds.
          </div>
          <p>
            <strong>Quality vs cost:</strong> Beam 3-5 typically improves BLEU
            scores by 1-3 points on translation tasks. Beyond beam 10, gains
            diminish while costs keep rising. For creative text, beam search
            often produces repetitive, generic outputs because it optimizes for
            probability, not diversity.
          </p>
        </div>
        <div
          class="card-diagram"
          style="margin-bottom: 24px; display: flex; justify-content: center"
        >
          <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 600px">
            <div style="display: flex; justify-content: space-around; gap: 24px">
              <div style="flex: 1">
                <div style="border: 2px solid; padding: 12px; border-radius: 6px; text-align: center; margin-bottom: 12px">
                  <strong style="font-size: 14px">Greedy Decoding</strong>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px; font-size: 13px; margin-bottom: 8px">
                  Step 1: Pick max prob
                  <br />
                  <strong>"The"</strong> (p=0.42)
                </div>
                <div style="font-size: 20px; text-align: center; margin: 4px 0">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px; font-size: 13px; margin-bottom: 8px">
                  Step 2: Pick max prob
                  <br />
                  <strong>"cat"</strong> (p=0.38)
                </div>
                <div style="padding: 8px; border-radius: 4px; margin-top: 12px; font-size: 12px">
                  <strong>Memory:</strong> 100 MB
                  <br />
                  <strong>Speed:</strong> Fast
                </div>
              </div>
              <div style="flex: 1">
                <div style="border: 2px solid; padding: 12px; border-radius: 6px; text-align: center; margin-bottom: 12px">
                  <strong style="font-size: 14px">Beam Search (B=4)</strong>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px; font-size: 12px; margin-bottom: 8px">
                  Keep 4 beams:
                  <br />
                  "The" "A" "This" "My"
                </div>
                <div style="font-size: 20px; text-align: center; margin: 4px 0">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px; font-size: 12px; margin-bottom: 8px">
                  Expand &amp; keep top 4:
                  <br />
                  "The cat" "The dog"
                  <br />
                  "A large" "This small"
                </div>
                <div style="padding: 8px; border-radius: 4px; margin-top: 12px; font-size: 12px">
                  <strong>Memory:</strong> 400 MB
                  <br />
                  <strong>Speed:</strong> 4x slower
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="Learn_keyTakeaways p-4 mb-4">
          <div class="Learn_keyTakeawaysHeader mb-3 pb-3">💡 Key Takeaways</div>
          <div class="d-flex flex-column gap-2">
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Decoding converts model probability outputs into actual text
                tokens, one token at a time
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Greedy decoding always picks highest probability token but gets
                stuck in local optima
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Beam search tracks K candidates simultaneously, finding better
                overall sequences
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Beam width K means K× compute cost: beam 5 is 5× slower than
                greedy
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Beam search improves translation quality but produces repetitive
                text for creative tasks
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
                Explain greedy's local optima problem: highest first word may
                lead to worse overall sentence
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">2</span>
              <span class="flex-grow-1 Learn_cardContent">
                Show beam search mechanics: expand K candidates, prune to K,
                pick best final sequence
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">3</span>
              <span class="flex-grow-1 Learn_cardContent">
                Mention that beam 3-5 improves BLEU by 1-3 points but gains
                diminish beyond beam 10
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default LessonTextGenerationGreedyVsBeamSearchDecoding;
