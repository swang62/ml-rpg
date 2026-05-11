import type { Component } from "solid-js";

const LessonNeuralArchitectureSearchNasFailureModesAndProductionMitigations: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            NAS Failure Modes and Production Mitigations
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 0; margin-bottom: 12px; font-size: 15px; line-height: 1.6">
              NAS can fail in expensive ways. Understanding these failure modes
              helps you avoid wasted compute and misleading results.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Search Space Mismatch
            </p>
            <p style="margin: 0 0 10px 0; font-size: 15px; line-height: 1.6">
              The most common failure: defining a search space that does not
              contain good architectures. If you only search over 3x3
              convolutions but the task needs larger receptive fields, no amount
              of search will find a good solution.
            </p>
            <p style="margin: 0 0 10px 0; font-size: 15px; line-height: 1.6">
              Fix: Start with a search space based on known good architectures
              for your task. Include operations that have worked before. Expand
              cautiously rather than starting maximally broad.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Proxy Task Divergence
            </p>
            <p style="margin: 0 0 10px 0; font-size: 15px; line-height: 1.6">
              NAS often searches on a simpler proxy task (smaller dataset, fewer
              classes) then transfers to the full task. If proxy and target
              tasks have different optimal architectures, search finds the wrong
              answer.
            </p>
            <p style="margin: 0 0 10px 0; font-size: 15px; line-height: 1.6">
              Signs of divergence: top architectures from search underperform
              hand-designed baselines on full task. Fix: Validate on a held-out
              subset of the full task during search.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Evaluation Noise
            </p>
            <p style="margin: 0 0 10px 0; font-size: 15px; line-height: 1.6">
              Training is stochastic. The same architecture trained twice may
              differ by 0.5-1% accuracy due to random initialization and data
              ordering. If your multi-fidelity proxy has high variance, NAS
              picks lucky runs, not good architectures.
            </p>
            <p style="margin: 0 0 10px 0; font-size: 15px; line-height: 1.6">
              Fix: Average multiple runs per architecture (2-3 minimum). Use
              deterministic data ordering. Accept that very small accuracy
              differences are not meaningful.
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
                  Search space must contain good architectures for your task
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Proxy task divergence: simpler search task may have different
                  optimal architectures
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Training variance (0.5-1% accuracy) can mislead search toward
                  lucky runs
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Average 2-3 runs per architecture to reduce noise
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
                  Interview Tip: Describe how to validate that your search space
                  is appropriate before running NAS
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Explain signs of proxy task divergence and how
                  to detect them
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Discuss strategies to reduce evaluation noise
                  in NAS
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonNeuralArchitectureSearchNasFailureModesAndProductionMitigations;
