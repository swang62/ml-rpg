import type { Component } from "solid-js";

const LessonAgentSystemsToolUseProductionImplementationAndLlmops: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Production Implementation and LLMOps
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <strong>Treating Agents as LLMOps Problems:</strong>
            Mature teams do not treat agent systems as "just add an LLM." They
            apply rigorous ML operations practices: offline evaluation, A/B
            testing, continuous monitoring, and willingness to fall back to
            simpler patterns when agents do not deliver value.
            <p></p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Offline Simulators and Evaluation
            </p>
            <p style="margin-top: 0">
              Before deploying a new prompt, tool, or orchestration change,
              teams build simulators that replay real production traffic against
              the modified system. They collect a dataset of 10,000 to 50,000
              representative user requests with ground truth labels or human
              judgments. The simulator runs each request through both the
              current system and the candidate system, comparing outputs.
              Metrics include: task success rate (did it solve the user
              problem?), tool call efficiency (did it use the minimum necessary
              tools?), latency (p50, p95, p99), and cost (average LLM calls and
              tokens per request). Example: you want to add a new{" "}
              <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
                search_company_wiki
              </code>{" "}
              tool. Offline eval on 20,000 support requests shows: success rate
              improves from 78 percent to 84 percent, average tool calls
              increase from 2.1 to 2.8, latency p95 increases from 1.2 seconds
              to 1.6 seconds, cost per request increases by 22 percent. You
              decide the 6 percent success improvement justifies the cost, but
              you implement parallel wiki search to reduce the latency hit to
              200 milliseconds.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Metrics That Matter
            </p>
            <p style="margin-top: 0">
              Production monitoring tracks multiple dimensions. System metrics
              include: requests per second, latency percentiles, error rates,
              tool success rates. ML metrics include: average LLM calls per
              request, average tokens per request, tool invocation distribution
              (which tools are called most?). Business metrics include: task
              completion rate, user satisfaction scores, escalation to human
              rate. You also track incremental cost per successful task. If
              adding a feature improves success rate from 80 percent to 85
              percent but doubles cost, that is $0.04 per request to gain 5
              percent success. For a support product with 1 million requests per
              month, that is $40,000 per month for 50,000 additional successful
              resolutions. The business decides if this Return on Investment
              (ROI) makes sense.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              A/B Testing Agents
            </p>
            <p style="margin-top: 0">
              You cannot just deploy a new agent configuration to 100 percent of
              traffic. Teams run controlled experiments: 5 percent of traffic
              goes to the new system, 95 percent stays on the current system.
              They run for 1 to 2 weeks, collecting thousands of requests per
              variant. Key challenge: agent outputs are not easily compared. For
              a search ranking change, you measure clicks. For an agent, success
              is subjective. Many teams use a combination of automated metrics
              (did it call the right tools? was latency acceptable?) and human
              evaluation (random sample of 200 to 500 responses rated by
              judges). If automated metrics look good but human evaluation is
              neutral, you do not ship. If latency degrades beyond SLA
              thresholds even with quality improvements, you optimize first.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Simplicity Escape Hatch
            </p>
            <p style="margin-top: 0">
              The most important production lesson: agent systems are not always
              the answer. For many use cases, simple Retrieval Augmented
              Generation (RAG) with a single search plus LLM call outperforms
              multi step agents on latency, cost, and reliability, with only
              marginal quality difference.
            </p>
            <div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 8px; margin: 12px 0; align-items: stretch">
              <div style="padding: 12px; border: 2px solid; border-radius: 6px">
                <div style="font-weight: 700; margin-bottom: 4px; font-size: 13px">
                  Multi Step Agent
                </div>
                <div style="font-size: 12px">
                  86% success, 1.8s p95, $0.08/request
                </div>
              </div>
              <div style="display: flex; align-items: center; font-weight: 800; font-size: 18px">
                vs
              </div>
              <div style="padding: 12px; border: 2px solid; border-radius: 6px">
                <div style="font-weight: 700; margin-bottom: 4px; font-size: 13px">
                  Simple RAG
                </div>
                <div style="font-size: 12px">
                  82% success, 0.5s p95, $0.02/request
                </div>
              </div>
            </div>
            Mature teams run this comparison constantly. If a 4 percent quality
            gain costs 4x in latency and cost, they often choose the simpler
            system. They reserve agents for tasks that genuinely require
            planning, multi step reasoning, or dynamic tool composition.
            <p></p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Observability is Non Negotiable
            </p>
            <p style="margin-top: 0">
              Every production agent system logs every interaction with
              correlation identifiers. When a user reports a problem, engineers
              trace the exact LLM prompts, tool calls, parameters, results, and
              policy decisions that led to the output. Logs feed into dashboards
              showing: tool success rates over time (is a tool degrading?),
              latency distribution per tool (which tool is the bottleneck?),
              cost trends (is average token usage creeping up?), and error
              patterns (what are the top 10 failure modes?). This data also
              feeds back into prompt engineering and tool interface refinement.
              If logs show the LLM frequently calls{" "}
              <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
                search_docs
              </code>{" "}
              with overly broad queries that return too many results, you might
              refine the tool description in the schema or add a{" "}
              <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
                max_results
              </code>{" "}
              parameter with a default of 5.
            </p>
            <div style="padding: 14px 16px; border-left: 4px solid; border-radius: 0 6px 6px 0; margin: 20px 0; font-style: italic">
              <div style="font-size: 14px; line-height: 1.5">
                "The teams that succeed with agents are the ones that treat them
                like any other production system: measured, monitored, tested,
                and willing to choose simpler alternatives when the complexity
                does not pay off."
              </div>
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="text-align: center; font-weight: 700; font-size: 14px; margin-bottom: 4px">
                  LLMOps Feedback Loop
                </div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">Production Traffic</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    10K-50K requests/day
                  </div>
                </div>
                <div style="text-align: center; font-size: 20px; font-weight: bold">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">Logging &amp; Metrics</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Correlation IDs, tool calls
                  </div>
                </div>
                <div style="text-align: center; font-size: 20px; font-weight: bold">
                  ↓
                </div>
                <div style="display: flex; gap: 12px">
                  <div style="border: 2px solid; padding: 10px 12px; border-radius: 6px; text-align: center; flex: 1">
                    <strong style="font-size: 12px">Offline Eval</strong>
                    <div style="font-size: 10px; margin-top: 4px">
                      Replay simulator
                    </div>
                  </div>
                  <div style="border: 2px solid; padding: 10px 12px; border-radius: 6px; text-align: center; flex: 1">
                    <strong style="font-size: 12px">A/B Test</strong>
                    <div style="font-size: 10px; margin-top: 4px">
                      5% new variant
                    </div>
                  </div>
                </div>
                <div style="text-align: center; font-size: 20px; font-weight: bold">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">Refine Prompts/Tools</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Iterate and deploy
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
                  Offline simulators replay 10,000 to 50,000 real requests
                  against new configurations, measuring task success rate, tool
                  efficiency, latency percentiles, and cost before deployment
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Production monitoring tracks system metrics (latency, errors),
                  ML metrics (average LLM calls, tokens), and business metrics
                  (task completion, escalation rate) with correlation IDs
                  linking all interactions
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  A/B tests run new agents on 5 percent traffic for 1 to 2 weeks
                  with both automated metrics and human evaluation on 200 to 500
                  sampled responses before full rollout
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Cost per successful task is critical ROI metric: if adding a
                  feature improves success 5 percent but doubles cost, that is
                  measurable dollars per additional resolution for business
                  decision
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mature teams compare agent systems to simple RAG constantly
                  and choose simpler patterns when 4 percent quality gain costs
                  4x in latency and money, reserving agents for genuinely
                  complex tasks
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
                  Adding search_wiki tool: offline eval shows 6% success
                  improvement but 22% cost increase and 400ms latency hit, team
                  implements parallel search to reduce latency to 200ms before
                  shipping
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  A/B test finds new multi step agent has 86% success vs 82% for
                  RAG, but 1.8s p95 vs 0.5s and 4x cost, team chooses RAG for
                  latency sensitive product surface
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Log analysis reveals LLM calls search_docs with overly broad
                  queries 40% of time, team adds max_results parameter with
                  default 5 and improves tool description, reducing average
                  results from 50 to 8 and cutting latency by 120ms
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonAgentSystemsToolUseProductionImplementationAndLlmops;
