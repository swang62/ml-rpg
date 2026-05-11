import type { Component } from "solid-js";

const LessonTextGenerationHowToChooseDeterministicVsStochasticDecoding: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            How to Choose: Deterministic vs Stochastic Decoding
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 0; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Core Trade-off
            </p>
            <p style="margin-top: 0">
              Deterministic methods (greedy, beam search) produce the same
              output every time for the same input. Stochastic methods (sampling
              with temperature) produce different outputs each time. The choice
              depends entirely on your use case: do you need consistency or
              variety?
            </p>
            <p>
              Deterministic outputs are verifiable and reproducible. If a user
              reports a bug, you can regenerate the exact same output.
              Stochastic outputs cannot be reproduced exactly, which complicates
              debugging and testing.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              When to Use Deterministic Decoding
            </p>
            <p style="margin-top: 0">
              <strong>Machine translation:</strong> There is typically one
              correct translation. Beam search with beam 4-5 consistently
              outperforms sampling on BLEU scores. Users expect the same
              translation for the same input.
            </p>
            <p>
              <strong>Summarization:</strong> The summary should capture key
              points reliably. Beam search ensures consistent extraction of
              important information. Sampling might miss crucial details on some
              runs.
            </p>
            <p>
              <strong>Code generation from specs:</strong> Given identical
              requirements, generate identical code. Developers need
              reproducible outputs for testing and version control.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              When to Use Stochastic Decoding
            </p>
            <p style="margin-top: 0">
              <strong>Creative writing:</strong> Users want variety. The same
              prompt should yield different stories. Temperature 0.8-1.0 with
              top_p 0.95 provides diverse yet coherent outputs.
            </p>
            <p>
              <strong>Chatbots and assistants:</strong> Slight variation feels
              more human. Identical responses to repeated questions feel
              robotic. Temperature 0.7 with top_p 0.9 balances consistency with
              naturalness.
            </p>
            <p>
              <strong>Brainstorming:</strong> Generate multiple distinct options
              for the user to choose from. Run the same prompt 5 times with
              temperature 1.0 to get 5 different ideas.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Decision Framework
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>🎯 Decision Criteria:</strong> Is there one correct
              answer? Use deterministic. Is variety valuable? Use stochastic.
              Need reproducibility for debugging? Use deterministic with logged
              seeds. Need A/B testing different outputs? Use stochastic with
              tracked seeds.
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
                  Deterministic (greedy, beam) gives same output every time;
                  stochastic (sampling) varies each run
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Deterministic outputs are reproducible for debugging;
                  stochastic cannot be exactly reproduced
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Use deterministic for translation, summarization, code
                  generation where one answer is correct
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Use stochastic for creative writing, chatbots, brainstorming
                  where variety is valuable
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  For reproducibility with variation, use stochastic with logged
                  random seeds
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
                  Match decoding to use case: translation needs beam search,
                  creative writing needs sampling
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Explain debugging trade-off: deterministic outputs can be
                  reproduced, stochastic cannot
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mention seed logging for A/B testing: track random seeds to
                  reproduce specific outputs
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonTextGenerationHowToChooseDeterministicVsStochasticDecoding;
