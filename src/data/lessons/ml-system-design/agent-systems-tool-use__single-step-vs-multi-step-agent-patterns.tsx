import type { Component } from "solid-js";

const LessonAgentSystemsToolUseSingleStepVsMultiStepAgentPatterns: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Single Step vs Multi Step Agent Patterns
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <strong>Two Dominant Interaction Patterns:</strong>
            Production agent systems implement tool use in two fundamentally
            different ways, each optimized for different use cases and latency
            requirements.
            <p></p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Single Step Tool Use
            </p>
            <p style="margin-top: 0">
              In this pattern, one LLM call can either answer directly or return
              one or more tool calls. The orchestrator executes all requested
              tools (potentially in parallel), feeds results back into a final
              LLM call, and returns the answer. This fits use cases like
              question answering over internal documents with retrieval. The
              latency math is predictable: first LLM call (200 milliseconds)
              plus tool execution time (100 milliseconds for parallel calls)
              plus second LLM call (180 milliseconds) equals approximately 480
              milliseconds total. This easily stays within 1 to 2 LLM round
              trips and 1 to 3 tool calls, keeping p95 under 2 seconds. Example
              flow: User asks "What were last quarter's top selling products?"
              The LLM outputs a{" "}
              <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
                query_sales_db
              </code>{" "}
              tool call with appropriate SQL parameters. The orchestrator
              executes it, gets structured results, feeds them back to the LLM,
              which formats a natural language response with the data.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Multi Step Agent Loop
            </p>
            <p style="margin-top: 0">
              In this pattern, the orchestrator maintains an explicit scratchpad
              of thoughts, actions, and observations. It repeatedly calls the
              LLM with the evolving scratchpad and available tools until the
              model emits a finish action. This enables complex workflows,
              planning, and reflection. Consider a code generation agent: it
              might first call{" "}
              <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
                search_docs
              </code>{" "}
              to find API documentation (step 1, 150 milliseconds), then{" "}
              <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
                read_file
              </code>{" "}
              to examine existing code (step 2, 80 milliseconds), then{" "}
              <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
                write_file
              </code>{" "}
              to propose changes (step 3, 100 milliseconds), then{" "}
              <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
                run_tests
              </code>{" "}
              to validate (step 4, 2000 milliseconds), and finally revise if
              tests fail. Each LLM call adds 200 to 400 milliseconds. With 5
              iterations, that's 1 to 2 seconds just for LLM time, plus tool
              execution. This is why production systems almost always enforce
              hard caps on iterations, typically maximum 5 to 8 tool steps.
            </p>
            <div style="margin: 20px 0 20px 0">
              <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 6px">
                <div style="width: 22px; height: 22px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 11px; flex-shrink: 0; margin-top: 2px">
                  1
                </div>
                <div style="flex: 1">
                  <strong>LLM reasons:</strong> Outputs tool call with
                  parameters based on current state
                </div>
              </div>
              <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 6px">
                <div style="width: 22px; height: 22px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 11px; flex-shrink: 0; margin-top: 2px">
                  2
                </div>
                <div style="flex: 1">
                  <strong>Orchestrator executes:</strong> Validates and runs
                  tool, adds results to scratchpad
                </div>
              </div>
              <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 6px">
                <div style="width: 22px; height: 22px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 11px; flex-shrink: 0; margin-top: 2px">
                  3
                </div>
                <div style="flex: 1">
                  <strong>Loop continues:</strong> LLM sees new state, decides
                  next action or finish
                </div>
              </div>
            </div>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Scratchpad Mechanism
            </p>
            <p style="margin-top: 0">
              The scratchpad is a structured log that the LLM sees on each
              iteration. It might look like: "Thought: I need to find recent
              deployments. Action: call get_deployments with user_id=12345.
              Observation: Found 3 deployments, one failing. Thought: I should
              get logs for the failing deployment. Action: call get_logs with
              deployment_id=abc. Observation: Error shows timeout connecting to
              database." This gives the model context to plan next steps, but it
              also consumes tokens. A 5 step loop might accumulate 2,000 to
              3,000 tokens in the scratchpad, increasing both cost and latency
              for each subsequent LLM call.
            </p>
            <div style="padding: 14px 16px; border-left: 4px solid; border-radius: 0 6px 6px 0; margin: 20px 0 20px 0; font-style: italic">
              <div style="font-size: 14px; line-height: 1.5">
                "The choice isn't about which pattern is better. It's about
                whether your task requires planning across multiple steps or can
                be solved with a single retrieve and respond cycle."
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
                  Single step pattern uses 1 to 2 LLM round trips with parallel
                  tool execution, staying under 500 milliseconds p50 for
                  retrieval augmented generation
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Multi step pattern maintains explicit scratchpad with thoughts
                  and observations, allowing complex planning but adding 200 to
                  400 milliseconds per iteration
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Production systems enforce hard caps of 5 to 8 tool steps
                  maximum in multi step loops to prevent unbounded latency and
                  cost
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Scratchpad accumulates 2,000 to 3,000 tokens over 5 steps,
                  increasing both cost and latency for each subsequent LLM call
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  ReAct (Reason + Act) is the most common multi step prompting
                  strategy, alternating between reasoning about what to do and
                  taking actions
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
                  Single step: Question answering over docs uses one LLM call to
                  identify query, one vector search (120ms), one LLM call to
                  synthesize, total 480ms
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Multi step: Code review agent searches style guide (step 1),
                  reads code file (step 2), runs linter (step 3), proposes fixes
                  (step 4), validates changes (step 5)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Hybrid: SQL agent uses single step for simple queries but
                  switches to multi step loop when initial query fails
                  validation, allowing iterative refinement
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonAgentSystemsToolUseSingleStepVsMultiStepAgentPatterns;
