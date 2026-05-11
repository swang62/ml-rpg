import type { Component } from "solid-js";

const LessonAgentSystemsToolUseWhatAreAgentSystemsToolUse: Component = () => (
  <div class="lesson-content">
    <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
      <div class="mb-4 p-4">
        <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
          What are Agent Systems &amp; Tool Use?
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
              <strong>Agent Systems</strong> are LLM driven components that
              repeatedly observe state, reason about actions, call external
              tools or APIs, and update state until reaching a goal.{" "}
              <strong>Tool Use</strong> means the model can invoke structured
              capabilities like databases, search engines, or payment APIs
              instead of only generating text.
            </div>
          </div>
          <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            The Core Problem
          </p>
          <p style="margin-top: 0">
            Vanilla Large Language Models (LLMs) are excellent at pattern
            completion and text generation, but they fail in production on three
            critical fronts. First, they cannot access up to date or private
            data because their knowledge is frozen at training time. Second,
            they cannot reliably perform multi step tasks that require planning
            and state management. Third, they cannot take actions in external
            systems like updating databases, making payments, or triggering
            workflows. Agent systems with tool use exist specifically to close
            these gaps.
          </p>
          <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            How It Works
          </p>
          <p style="margin-top: 0">
            Think of the LLM as becoming the planner while traditional services
            remain the executors. Instead of the model hallucinating what a
            database might contain, it calls a real database tool and gets
            actual results. Instead of guessing at calendar availability, it
            invokes a calendar API. The pattern looks like this: the agent
            receives a user query, the LLM reasons about what information or
            actions are needed, it calls one or more tools with specific
            parameters, receives structured results, and either responds to the
            user or decides it needs more information and calls additional
            tools.
          </p>
          <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            A Concrete Example
          </p>
          <p style="margin-top: 0">
            Consider an internal support agent. A user asks: "Why is my
            deployment from yesterday failing?" A vanilla LLM would fabricate
            possible reasons. An agent system would: call a{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              get_recent_deployments
            </code>{" "}
            tool to fetch actual deployments for this user, identify the failing
            one, call a{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              get_deployment_logs
            </code>{" "}
            tool to retrieve error messages, and then synthesize a specific
            answer based on real data.
          </p>
          <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
            <strong>✓ In Practice:</strong> Companies like Microsoft Copilot and
            Google Workspace agents use this architecture to connect LLMs with
            calendar, docs, email, and code systems, turning the model from a
            text generator into an orchestrator of real services.
          </div>
        </div>
        <div class="Learn_keyTakeaways p-4 mb-4">
          <div class="Learn_keyTakeawaysHeader mb-3 pb-3">💡 Key Takeaways</div>
          <div class="d-flex flex-column gap-2">
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Agent systems solve three LLM limitations: no access to
                current/private data, inability to perform multi step tasks, and
                inability to take actions in external systems
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                The LLM acts as planner and decision maker, while traditional
                APIs and services act as executors of specific capabilities
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Tool use means the model outputs structured function calls with
                parameters rather than just generating freeform text
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Core components include: tool registry with typed interfaces,
                orchestrator managing the agent loop, state store for
                conversation history, and safety layer constraining tool access
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
                Support agent calling get_recent_deployments and
                get_deployment_logs tools to diagnose real deployment failures
                instead of guessing
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">2</span>
              <span class="flex-grow-1 Learn_cardContent">
                Shopping assistant calling product_search, check_inventory, and
                calculate_shipping tools to provide accurate availability and
                pricing
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">3</span>
              <span class="flex-grow-1 Learn_cardContent">
                Code assistant calling read_file, run_tests, and commit_change
                tools to implement and verify code changes in an actual
                repository
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default LessonAgentSystemsToolUseWhatAreAgentSystemsToolUse;
