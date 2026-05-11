import type { Component } from "solid-js";

const LessonAgentSystemsToolUseTradeOffsLlmCentricPlanningVsBackendOrchestration: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Trade-offs: LLM Centric Planning vs Backend Orchestration
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <strong>The Central Design Decision:</strong>
            When building agent systems, you must decide where intelligence
            lives: in the LLM's dynamic planning or in your backend's
            deterministic orchestration. This choice fundamentally shapes system
            behavior, reliability, and cost.<p></p>
            <div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 8px; margin: 12px 0; align-items: stretch">
              <div style="padding: 12px; border: 2px solid; border-radius: 6px">
                <div style="font-weight: 700; margin-bottom: 4px; font-size: 13px">
                  LLM Centric Planning
                </div>
                <div style="font-size: 12px">
                  Model decides which tools, what order, when to stop
                </div>
              </div>
              <div style="display: flex; align-items: center; font-weight: 800; font-size: 18px">
                vs
              </div>
              <div style="padding: 12px; border: 2px solid; border-radius: 6px">
                <div style="font-weight: 700; margin-bottom: 4px; font-size: 13px">
                  Backend Orchestration
                </div>
                <div style="font-size: 12px">
                  Code routes flow, LLM fills arguments only
                </div>
              </div>
            </div>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              LLM Centric Planning
            </p>
            <p style="margin-top: 0">
              In this approach, the LLM has full autonomy. It receives a list of
              available tools and decides which to call, in what sequence, and
              when it has enough information to answer. Patterns like ReAct
              (reason and act) or planning and execution frameworks give the
              model maximum flexibility. The advantage is adaptability. The LLM
              can discover novel tool combinations you never explicitly
              programmed. If a user asks an unexpected question, the agent might
              chain together three tools in a creative way that solves the
              problem. You write less custom code and can add new tools without
              rewriting orchestration logic. The cost is unpredictability. The
              same query might take 2 tool calls one day and 5 calls the next,
              making latency Service Level Agreements (SLAs) harder to
              guarantee. Debugging failures is difficult because you cannot
              easily reproduce the exact decision path the LLM took. Testing
              requires running the full agent against diverse scenarios rather
              than unit testing specific code paths. At scale, this variability
              matters. If 5 percent of requests unexpectedly take 8 tool steps
              instead of 2, your p95 latency blows up. Your cost also becomes
              less predictable: some days you average 3 LLM calls per request,
              other days 5, and your bill varies by 40 percent.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Backend Orchestration
            </p>
            <p style="margin-top: 0">
              Here, your backend code contains explicit routing rules. For
              example: if the query is about user data, call{" "}
              <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
                get_user_profile
              </code>
              , then call the LLM to format the response. If it's about orders,
              call{" "}
              <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
                search_orders
              </code>
              , then{" "}
              <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
                get_order_details
              </code>
              , then synthesize. The LLM is only used to extract parameters from
              natural language or generate final text. This maximizes
              predictability. Every query follows a known path. You can measure
              exact latency per flow, set SLAs per use case, and unit test each
              branch. Your cost is deterministic: each order query costs exactly
              2 LLM calls plus 2 tool calls. The tradeoff is rigidity. You must
              anticipate every user intent and hard code the tool sequence.
              Adding new capabilities requires engineering work. The system
              cannot adapt to edge cases you didn't foresee. If a user asks
              something slightly outside your defined flows, the agent fails
              rather than improvising.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              When to Choose Each
            </p>
            <p style="margin-top: 0">
              Choose LLM centric planning when: your domain is open ended and
              you need adaptability. Research assistants, creative tools, and
              exploratory agents benefit from flexible planning. You have
              tolerance for variable latency and cost, perhaps because requests
              are asynchronous or users expect 3 to 5 second response times. You
              have strong offline evaluation to catch bad behaviors before
              production. Choose backend orchestration when: you need strict
              SLAs, for example customer facing APIs with p95 under 1 second.
              You operate in regulated domains where auditability and
              determinism matter. Your use cases are well defined, like order
              lookup or account management. You want to minimize cost by
              avoiding unnecessary LLM calls.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Hybrid Reality
            </p>
            <p style="margin-top: 0">
              Most production systems use a hybrid. The backend orchestrates
              high level flows (authentication, intent classification, tool
              selection constraints), while the LLM plans within bounded sub
              tasks. For example: the backend decides "this is an order
              question" and provides only order related tools. Within that
              scope, the LLM can flexibly decide whether to search by order ID,
              by date range, or by product, and whether to fetch details or just
              summaries. This gives you 70 percent of the flexibility with 80
              percent of the predictability.
            </p>
            <div style="margin: 20px 0; display: flex; flex-direction: column; align-items: center">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
                Cost Impact Example
              </div>
              <div style="display: inline-flex; gap: 12px; flex-wrap: wrap; justify-content: center">
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">3-5 calls</div>
                  <div style="font-size: 10px; font-weight: 600">
                    LLM PLANNING
                  </div>
                </div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">2 calls</div>
                  <div style="font-size: 10px; font-weight: 600">
                    BACKEND ROUTING
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
                  LLM centric planning maximizes flexibility and reduces custom
                  code but creates unpredictable latency and cost, with request
                  variability of 40 percent in LLM calls
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Backend orchestration provides deterministic flows with strict
                  SLAs and unit testable paths but requires anticipating every
                  use case and engineering effort for changes
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Choose LLM planning for open ended domains with 3 to 5 second
                  latency tolerance; choose backend orchestration for customer
                  facing APIs needing p95 under 1 second
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Hybrid approach uses backend for high level routing and
                  constraints while LLM plans within bounded sub tasks,
                  achieving 70 percent flexibility with 80 percent
                  predictability
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Testing differs radically: LLM agents require scenario based
                  evaluation suites, backend orchestration allows standard unit
                  and integration tests
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
                  Research assistant uses full LLM planning across 10+ tools
                  (search, summarize, compare) because latency tolerance is 10
                  seconds and adaptability matters more than cost
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Banking app uses backend orchestration for balance lookup and
                  transfers with exactly 2 LLM calls per request, guaranteeing
                  p95 under 800 milliseconds and audit trails
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  E-commerce support uses hybrid: backend routes to order,
                  account, or product domains, then LLM flexibly plans within 3
                  to 5 domain specific tools
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonAgentSystemsToolUseTradeOffsLlmCentricPlanningVsBackendOrchestration;
