import type { Component } from "solid-js";

const LessonPromptEngineeringManagementPromptEngineeringTechniquesChainOfThoughtAndToolUse: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Prompt Engineering Techniques: Chain of Thought and Tool Use
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 0; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Chain of Thought Prompting
            </p>
            <p style="margin-top: 0">
              Chain of thought (CoT) asks the model to show reasoning steps
              before giving a final answer. Instead of "What is the answer?",
              prompt with "Think through this step by step, then give your final
              answer." This technique improves performance on math, logic, and
              multi-step reasoning problems by 20-40%. The model explicitly
              works through intermediate steps rather than jumping to
              conclusions.
            </p>
            <p>
              Implementation pattern: request reasoning, then extract the final
              answer programmatically. The model outputs "Step 1: ... Step 2:
              ... Final answer: X" and your code parses for text after "Final
              answer:" rather than using the entire response. This separates the
              reasoning (useful for debugging) from the actionable output.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Tool Use and Function Calling
            </p>
            <p style="margin-top: 0">
              Tool use enables models to invoke external functions: database
              queries, API calls, calculations. Instead of the model
              hallucinating a stock price, it calls a function that returns the
              real value. The prompt defines available tools with descriptions.
              The model outputs a structured tool call. Your code executes the
              call and returns results to the model for further processing.
            </p>
            <p>
              Effective tool descriptions are critical. Vague descriptions lead
              to incorrect tool selection. Include: what the tool does, required
              parameters with types and constraints, example inputs and outputs,
              when to use (and when NOT to use) this tool. More detailed
              descriptions reduce tool selection errors.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Key Trade-off:</strong> CoT increases response length
              3-5x, adding cost and latency. Use for complex reasoning tasks
              where accuracy matters. Skip for simple tasks where direct answers
              suffice.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Combining Techniques
            </p>
            <p style="margin-top: 0">
              CoT and tool use combine naturally. The model reasons about what
              information it needs, calls tools to get that information, reasons
              about the results, and produces a final answer. This ReAct
              (Reasoning + Acting) pattern is particularly powerful for complex
              tasks requiring both knowledge retrieval and multi-step logic.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; gap: 12px">
                <div style="flex: 1; border: 2px solid; padding: 12px; border-radius: 6px">
                  <div style="font-weight: bold; margin-bottom: 8px; font-size: 13px; text-align: center">
                    Chain of Thought
                  </div>
                  <div style="font-size: 11px; line-height: 1.5">
                    <strong>Input:</strong> "Calculate 23 × 47"
                    <br />
                    <br />
                    <strong>Reasoning:</strong>
                    <br />
                    "23 × 47 = 23 × (40 + 7)
                    <br />= (23 × 40) + (23 × 7)
                    <br />= 920 + 161
                    <br />= 1081"
                    <br />
                    <br />
                    <strong>Cost:</strong> 250 tokens vs 50 direct
                  </div>
                </div>
                <div style="flex: 1; border: 2px solid; padding: 12px; border-radius: 6px">
                  <div style="font-weight: bold; margin-bottom: 8px; font-size: 13px; text-align: center">
                    Tool Use
                  </div>
                  <div style="font-size: 11px; line-height: 1.5">
                    <strong>Input:</strong> "Weather in Seattle?"
                    <br />
                    <br />
                    <strong>Function Call:</strong>
                    <br />
                    get_weather(
                    <br />
                      location="Seattle"
                    <br />)<br />
                    <br />
                    <strong>Result:</strong> Real data from API
                    <br />
                    <br />
                    <strong>Accuracy:</strong> 60% → 90%
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
                  Chain of thought improves math/logic/reasoning performance by
                  20-40% by making the model show intermediate steps before
                  final answer
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Implementation: model outputs reasoning then 'Final answer:
                  X', code parses only the final answer for downstream use
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Tool use lets models call external functions for real data
                  instead of hallucinating - detailed tool descriptions reduce
                  selection errors
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  CoT increases response length 3-5x (cost/latency trade-off) -
                  use for complex reasoning, skip for simple direct-answer tasks
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
                  Explain CoT with the implementation pattern: model shows Step
                  1, Step 2, Final answer, and code parses just the final
                  answer.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  For tool use, emphasize description quality: include what it
                  does, parameters with types, examples, and when NOT to use it.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mention ReAct pattern: combine reasoning (CoT) with acting
                  (tool use) for tasks needing both knowledge retrieval and
                  logic.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonPromptEngineeringManagementPromptEngineeringTechniquesChainOfThoughtAndToolUse;
