import type { Component } from "solid-js";

const LessonPromptEngineeringManagementProductionPromptPipelineArchitecture: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Production Prompt Pipeline Architecture
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 0; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Pipeline Components
            </p>
            <p style="margin-top: 0">
              A production prompt pipeline has distinct stages. The prompt
              template defines structure with placeholders. The context
              assembler gathers relevant information (user history, retrieved
              documents) to fill placeholders. The request builder constructs
              the API call with parameters. The response parser extracts
              structured data from model output.
            </p>
            <p>
              Each component has different requirements. Templates change
              infrequently. Context assembly runs per-request and must be fast
              (under 50ms). Response parsing must handle malformed outputs since
              models occasionally produce unparseable responses.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Template Architecture
            </p>
            <p style="margin-top: 0">
              Templates separate static instruction from dynamic content. A
              customer support template might have: system instruction (static),
              few-shot examples (semi-static), user context (dynamic
              per-request), and the user query (dynamic). This separation
              enables independent versioning. Update examples without touching
              system instruction, or add context fields without modifying prompt
              logic.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Key Insight:</strong> The best prompt architectures use
              composition over monolithic strings. Small, tested components
              combined at runtime are more maintainable than one giant template
              nobody dares touch.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Context Assembly
            </p>
            <p style="margin-top: 0">
              Context assembly determines what information reaches the model.
              Too little and the model lacks information. Too much wastes tokens
              and may confuse with irrelevant information. Effective assembly
              ranks context by relevance and includes only what fits the token
              budget.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Error Handling
            </p>
            <p style="margin-top: 0">
              Handle failures at every stage: context fetch timeouts, API rate
              limits, malformed responses. A context fetch failure might proceed
              with partial context. Rate limits trigger backoff or failover to
              secondary model.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 540px">
              <div style="display: flex; flex-direction: column; gap: 8px">
                <div style="border: 2px solid; padding: 10px 12px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    1. API Gateway + Policy
                  </strong>
                  <div style="font-size: 11px; margin-top: 3px">
                    Identity, rate limits, routing
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px 12px; border-radius: 6px">
                  <strong style="font-size: 13px">2. Prompt Builder</strong>
                  <div style="font-size: 11px; margin-top: 3px">
                    System preamble + Task instructions + Token budget
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px 12px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    3. RAG Retriever (optional)
                  </strong>
                  <div style="font-size: 11px; margin-top: 3px">
                    15 to 50ms co-located, 60 to 150ms cross region
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px 12px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    4. Pre Model Guardrails
                  </strong>
                  <div style="font-size: 11px; margin-top: 3px">
                    Content filters + Injection detection
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px 12px; border-radius: 6px">
                  <strong style="font-size: 13px">5. Model Inference</strong>
                  <div style="font-size: 11px; margin-top: 3px">
                    200 to 800ms first token, 15 to 50 tokens/sec
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px 12px; border-radius: 6px">
                  <strong style="font-size: 13px">6. Post Processing</strong>
                  <div style="font-size: 11px; margin-top: 3px">
                    Schema validation + Safety checks + Retry logic
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
                  Pipeline stages: template definition, context assembly
                  (&lt;50ms), request building, response parsing - each with
                  different requirements
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Separate static instruction from dynamic content to enable
                  independent versioning of examples, context, and logic
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Context assembly balances relevance against token budget -
                  rank available context and include only what fits
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Design fallback behavior for each failure mode: partial
                  context on fetch failure, backoff on rate limits, retry on
                  malformed output
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
                  Describe the four pipeline stages and their characteristics:
                  templates change rarely, context runs per-request, parsing
                  handles malformed output.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Explain composition over monolithic: small tested components
                  combined at runtime beat one giant template nobody dares
                  touch.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  For context assembly, mention the trade-off: too little
                  context = poor response, too much = wasted tokens and
                  confusion.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonPromptEngineeringManagementProductionPromptPipelineArchitecture;
