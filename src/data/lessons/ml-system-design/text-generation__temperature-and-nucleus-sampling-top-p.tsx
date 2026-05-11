import type { Component } from "solid-js";

const LessonTextGenerationTemperatureAndNucleusSamplingTopP: Component = () => (
  <div class="lesson-content">
    <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
      <div class="mb-4 p-4">
        <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
          Temperature and Nucleus Sampling (Top P)
        </h1>
        <div
          class="card-content-area"
          style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
        >
          <div style="padding: 14px 16px; border: 2px solid; border-left: 4px solid; border-radius: 6px; margin: 0">
            <div style="font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px">
              Core Concept
            </div>
            <div style="font-size: 15px; line-height: 1.5">
              <strong>Sampling</strong> introduces randomness into decoding.
              Instead of always picking the highest probability token, you
              randomly sample from the distribution. Temperature and nucleus
              sampling control how much randomness.
            </div>
          </div>
          <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            Temperature Scaling
          </p>
          <p style="margin-top: 0">
            Temperature divides the raw model scores (logits) before converting
            to probabilities. If token A has logit 2.0 and token B has logit
            1.0, the probability ratio depends on temperature. At temperature
            1.0, standard probabilities apply. Lower temperature sharpens the
            distribution; higher temperature flattens it.
          </p>
          <p>
            <strong>Temperature 0.5:</strong> Divide logits by 0.5 (multiply by
            2). The gap between A and B doubles. A becomes more dominant. Output
            becomes more deterministic and predictable.
          </p>
          <p>
            <strong>Temperature 2.0:</strong> Divide logits by 2. The gap
            shrinks. Lower probability tokens get more chance. Output becomes
            more random and creative, but also more likely to produce nonsense.
          </p>
          <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            Nucleus Sampling (Top P)
          </p>
          <p style="margin-top: 0">
            Instead of a fixed number of candidates, nucleus sampling keeps
            tokens until their cumulative probability reaches threshold P. If
            P=0.9, keep adding tokens (highest first) until they sum to 90%
            probability, then sample only from that set.
          </p>
          <p>
            <strong>Why this works:</strong> The number of reasonable next
            tokens varies by context. After "The capital of France is" only 1-2
            tokens make sense. After "I feel" dozens might work. Top P adapts
            automatically: tight distributions yield few candidates, flat
            distributions yield many.
          </p>
          <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            Practical Settings
          </p>
          <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
            <strong>💡 Common Configurations:</strong> Factual QA: temp 0.1-0.3,
            top_p 0.9. Creative writing: temp 0.7-1.0, top_p 0.95. Code
            generation: temp 0.2, top_p 0.95. Chatbots: temp 0.7, top_p 0.9.
          </div>
          <p>
            Using both together: temperature reshapes probabilities first, then
            top_p filters. Temperature 0.7 with top_p 0.9 gives controlled
            creativity: slightly sharper distribution, filtered to reasonable
            options.
          </p>
        </div>
        <div
          class="card-diagram"
          style="margin-bottom: 24px; display: flex; justify-content: center"
        >
          <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 550px">
            <div style="margin-bottom: 16px; padding: 12px; border: 2px solid; border-radius: 6px">
              <strong style="font-size: 14px">Original Distribution</strong>
              <div style="margin-top: 8px; font-size: 13px">
                "cat": 0.30, "dog": 0.25, "bird": 0.20, "fish": 0.15, "mouse":
                0.10
              </div>
            </div>
            <div style="display: flex; gap: 12px; margin-bottom: 12px">
              <div style="flex: 1; padding: 10px; border: 2px solid; border-radius: 6px">
                <strong style="font-size: 13px">Temp = 0.5</strong>
                <div style="font-size: 12px; margin-top: 6px">
                  "cat": 0.42
                  <br />
                  "dog": 0.31
                  <br />
                  "bird": 0.18
                  <br />
                  (sharper)
                </div>
              </div>
              <div style="flex: 1; padding: 10px; border: 2px solid; border-radius: 6px">
                <strong style="font-size: 13px">Temp = 2.0</strong>
                <div style="font-size: 12px; margin-top: 6px">
                  "cat": 0.24
                  <br />
                  "dog": 0.22
                  <br />
                  "bird": 0.21
                  <br />
                  (flatter)
                </div>
              </div>
            </div>
            <div style="padding: 12px; border: 2px solid; border-radius: 6px">
              <strong style="font-size: 13px">Top p = 0.75</strong>
              <div style="font-size: 12px; margin-top: 6px">
                Include tokens until cumulative ≥ 0.75:
                <br />
                "cat" (0.30) + "dog" (0.25) + "bird" (0.20) = 0.75
                <br />
                <strong>Sample from: &#123;"cat", "dog", "bird"&#125;</strong>
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
                Temperature divides logits before probability conversion: lower
                = sharper, higher = flatter distribution
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Temperature 0.5 makes output deterministic; temperature 2.0
                makes it random and creative
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Nucleus sampling (top_p) keeps tokens until cumulative
                probability reaches threshold P
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Top_p adapts automatically: tight contexts yield few candidates,
                open contexts yield many
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Common settings: factual QA uses temp 0.1-0.3, creative writing
                uses temp 0.7-1.0
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
                Explain temperature mechanics: lower temp sharpens distribution,
                higher flattens it
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">2</span>
              <span class="flex-grow-1 Learn_cardContent">
                Show why top_p adapts: 'capital of France is' needs few
                candidates, 'I feel' needs many
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">3</span>
              <span class="flex-grow-1 Learn_cardContent">
                Give concrete settings: code generation uses temp 0.2, creative
                writing uses temp 0.7-1.0
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default LessonTextGenerationTemperatureAndNucleusSamplingTopP;
