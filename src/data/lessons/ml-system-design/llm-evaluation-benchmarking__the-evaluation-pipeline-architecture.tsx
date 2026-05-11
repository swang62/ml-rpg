import type { Component } from "solid-js";

const LessonLlmEvaluationBenchmarkingTheEvaluationPipelineArchitecture: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            The Evaluation Pipeline Architecture
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <strong>The Full System:</strong>
            At companies like OpenAI, Anthropic, or Google, LLM evaluation is
            not a one time test before launch. It is a continuously running
            service tightly integrated into the training and deployment
            pipeline. Understanding this architecture is critical because it
            shows how evaluation scales from thousands of prompts in research to
            millions in production. Here is how the pieces fit together.<p></p>
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 12px; align-items: center">
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 180px; text-align: center">
                  <strong style="font-size: 14px">Policy Repository</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Harm categories &amp; rules
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 180px; text-align: center">
                  <strong style="font-size: 14px">Prompt Generator</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    1M to 10M test prompts
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 180px; text-align: center">
                  <strong style="font-size: 14px">Evaluation Runner</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    5k to 20k QPS batch
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 180px; text-align: center">
                  <strong style="font-size: 14px">Scoring Layer</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Judge models + humans
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 180px; text-align: center">
                  <strong style="font-size: 14px">Release Gate</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Block if metrics regress
                  </div>
                </div>
              </div>
            </div>
            <strong>Component 1: Policy Repository</strong>
            This is version controlled documentation defining harm categories
            like self harm, hate speech, sexual content with minors, malware,
            fraud, and personal data disclosure. Each category has severity
            levels, edge case guidelines, and example prompts. Product teams
            treat policy changes as backward incompatible events requiring full
            model re evaluation. Think of this as your safety contract.
            <strong>Component 2: Prompt Generator</strong>
            Instead of static test sets, you maintain parameterized templates
            and automated generators. Hand written templates cover classic
            jailbreak patterns like roleplay attacks ("pretend you are..."),
            third person requests, or multi step manipulations. Model assisted
            generators take a harm category and propose candidate prompts
            designed to bypass guardrails. For a 70B parameter model release,
            you might generate 1 million to 10 million evaluation prompts
            covering all risk areas.
            <strong>Component 3: Evaluation Runner</strong>
            This internal service selects model variants, runs prompts at scale
            using batch inference across thousands of Graphics Processing Units
            (GPUs), and logs all inputs, outputs, and metadata. For cost
            efficiency, teams often start with smaller proxy models (7B or 13B
            parameters) to triage ideas before scaling to the full model. Target
            throughput is typically 5,000 to 20,000 queries per second (QPS)
            with p95 latency around 300 to 800 milliseconds per prompt.<p></p>
            <div style="margin: 20px 0; display: flex; flex-direction: column; align-items: center">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
                Evaluation Scale
              </div>
              <div style="display: inline-flex; gap: 12px; flex-wrap: wrap; justify-content: center">
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">10M</div>
                  <div style="font-size: 10px; font-weight: 600">
                    TEST PROMPTS
                  </div>
                </div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">20k</div>
                  <div style="font-size: 10px; font-weight: 600">
                    QPS THROUGHPUT
                  </div>
                </div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">500ms</div>
                  <div style="font-size: 10px; font-weight: 600">
                    P95 LATENCY
                  </div>
                </div>
              </div>
            </div>
            <strong>Component 4: Scoring Layer</strong>
            Outputs flow to safety classifiers, toxicity models, and LLM judge
            models that answer questions like "Does this violate self harm
            policy?" Judge models can score thousands of prompts per second,
            enabling continuous wide coverage. A sample of outputs (typically
            high severity or ambiguous cases) goes to human raters for ground
            truth calibration. Scores aggregate into metrics like attack success
            rate per category and refusal rate on benign prompts.
            <strong>Component 5: Release Gate</strong>
            Continuous Integration (CI) and model deployment pipelines query the
            metrics store and enforce policies. For example, block promotion if
            critical category regression exceeds threshold, or require manual
            review for non critical regressions. Dashboards show trend lines
            across model versions, helping teams understand whether safety is
            improving or degrading with each training run.<p></p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 12px; align-items: center">
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 180px; text-align: center">
                  <strong style="font-size: 14px">Policy Repository</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Harm categories &amp; rules
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 180px; text-align: center">
                  <strong style="font-size: 14px">Prompt Generator</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    1M to 10M test prompts
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 180px; text-align: center">
                  <strong style="font-size: 14px">Evaluation Runner</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    5k to 20k QPS batch
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 180px; text-align: center">
                  <strong style="font-size: 14px">Scoring Layer</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Judge models + humans
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 180px; text-align: center">
                  <strong style="font-size: 14px">Release Gate</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Block if metrics regress
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
                  Policy repository defines version controlled harm categories
                  with severity levels and examples, treating changes as
                  backward incompatible events requiring full re evaluation
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Prompt generators use templates and model assistance to create
                  1 million to 10 million evaluation prompts per model release,
                  covering all risk categories systematically
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Evaluation runner achieves 5,000 to 20,000 QPS throughput with
                  p95 latency of 300 to 800ms by batching across thousands of
                  GPUs, often using smaller proxy models first
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Release gates block model deployment if critical safety
                  metrics regress, for example if self harm success rate exceeds
                  0.1 percent threshold
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Continuous monitoring samples 0.1 to 1 percent of production
                  traffic (thousands of prompts daily) feeding automated scoring
                  and human review queues
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
                  Policy example: Self harm category with severity 1 (general
                  advice) to severity 5 (detailed instructions), each with 50+
                  edge case examples for calibration
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Prompt generation: Given 'fraud' category, generator produces
                  variations like direct requests, roleplay scenarios, third
                  person queries, multi step attacks
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Release gate scenario: New model shows 5 percent better
                  general quality but self harm success rate increases from 0.08
                  to 0.15 percent, deployment blocked until fixed
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonLlmEvaluationBenchmarkingTheEvaluationPipelineArchitecture;
