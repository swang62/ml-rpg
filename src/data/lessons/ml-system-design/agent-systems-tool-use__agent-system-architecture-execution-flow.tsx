import type { Component } from "solid-js";

const LessonAgentSystemsToolUseAgentSystemArchitectureExecutionFlow: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Agent System Architecture &amp; Execution Flow
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <strong>The System Components:</strong>
            In production, agent systems sit between user interfaces and
            existing microservices. The architecture consists of four key layers
            that work together to enable safe, scalable tool use. First is the{" "}
            <strong>tool registry</strong>, which defines each tool as a typed
            function with a name, description, input and output schemas using
            JSON Schema or similar, and safety attributes like required
            permissions and risk level. Think of this as your service catalog
            but formatted for LLM consumption. Second is the{" "}
            <strong>agent orchestrator</strong>, the service responsible for the
            interaction loop. It initializes agent state with the user query,
            context like user profile and permissions, and the goal. It manages
            the back and forth between LLM and tools. Third is the{" "}
            <strong>state store</strong>, which maintains conversation history,
            intermediate results, and task progress. This might be Redis for
            short lived sessions or a database for long running workflows.
            Fourth is the <strong>safety and policy layer</strong>, which checks
            every tool invocation against user identity, scopes, rate limits,
            and business rules before execution.
            <p></p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Execution Flow
            </p>
            <p style="margin-top: 0">
              Let's trace a typical request through a system serving 5,000
              concurrent users at 200 Queries Per Second (QPS). A user sends a
              request to an API gateway. After authentication, it passes to the
              agent orchestrator, which initializes state and calls the LLM with
              available tools and their schemas. The LLM outputs either a direct
              text response or a structured tool invocation. Suppose it calls a{" "}
              <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
                search_tickets
              </code>{" "}
              tool. The orchestrator validates parameters through the policy
              layer, executes the tool (which hits an indexed service in 50 to
              150 milliseconds), and feeds results back to the LLM for final
              response generation.
            </p>
            <div style="margin: 20px 0; display: flex; flex-direction: column; align-items: center">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
                Typical Request Latency Breakdown
              </div>
              <div style="display: inline-flex; gap: 12px; flex-wrap: wrap; justify-content: center">
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">150-400ms</div>
                  <div style="font-size: 10px; font-weight: 600">
                    LLM CALL (P50)
                  </div>
                </div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">50-150ms</div>
                  <div style="font-size: 10px; font-weight: 600">
                    TOOL EXECUTION
                  </div>
                </div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">&lt;800ms</div>
                  <div style="font-size: 10px; font-weight: 600">
                    TOTAL P50 TARGET
                  </div>
                </div>
              </div>
            </div>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Scaling Considerations
            </p>
            <p style="margin-top: 0">
              At global scale with 10,000 QPS, companies like Google and
              Microsoft split responsibilities. A thin front agent handles
              dialog and routing, while specialized sub agents or microservices
              handle vertical logic like billing, search, or content creation.
              Tools are implemented as horizontally scalable stateless services
              behind load balancers. To keep latency under control at high
              throughput, mature systems run independent tools in parallel when
              possible, cache frequent queries with short Time To Live (TTL)
              values, and prefetch likely resources based on conversation state.
              When tool subsystems become overloaded, the orchestrator uses
              queues and applies backpressure rather than cascading failures.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>⚠️ Common Pitfall:</strong> The orchestrator must restrict
              agents to 1 or 2 tool hops in the critical path for synchronous
              requests. Anything requiring more steps should be pushed to an
              async workflow with user notifications to avoid timeout issues.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 12px; align-items: center">
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 140px; text-align: center">
                  <strong style="font-size: 14px">User Request</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    API Gateway
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 140px; text-align: center">
                  <strong style="font-size: 14px">Agent Orchestrator</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    State + Policy Check
                  </div>
                </div>
                <div style="display: flex; gap: 20px; align-items: center">
                  <div style="font-size: 20px; font-weight: bold">↙</div>
                  <div style="font-size: 20px; font-weight: bold">↘</div>
                </div>
                <div style="display: flex; gap: 16px">
                  <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; text-align: center; flex: 1">
                    <strong style="font-size: 13px">LLM Service</strong>
                    <div style="font-size: 11px; margin-top: 4px">
                      150-400ms
                    </div>
                  </div>
                  <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; text-align: center; flex: 1">
                    <strong style="font-size: 13px">Tool Services</strong>
                    <div style="font-size: 11px; margin-top: 4px">
                      50-150ms each
                    </div>
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
                  Tool registry defines each tool with typed schemas,
                  descriptions, and safety attributes that LLMs can understand
                  and invoke correctly
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Orchestrator manages the interaction loop between LLM and
                  tools, enforcing 1 to 2 tool hops in critical path to meet p50
                  latency targets under 800 milliseconds
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Policy layer validates every tool call against user
                  permissions, rate limits, and business rules before execution
                  to prevent unauthorized access
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  At scale beyond 10,000 QPS, systems split into front agents
                  for routing and specialized sub agents for vertical logic,
                  with tools as stateless microservices
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Parallel tool execution, caching with short TTL, and
                  prefetching based on conversation state are essential to keep
                  p95 latency under 2 seconds
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
                  Internal support system at 200 QPS restricts to 2 tool calls
                  maximum: one search_tickets (100ms) and one get_details (80ms)
                  to stay under 800ms p50
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Microsoft Copilot runs calendar and email tools in parallel
                  when both are needed, reducing sequential 300ms + 250ms to
                  parallel 300ms max
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Google Workspace agent prefetches recent docs when user asks
                  document questions, hitting cache in 15ms instead of 120ms
                  storage fetch
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonAgentSystemsToolUseAgentSystemArchitectureExecutionFlow;
