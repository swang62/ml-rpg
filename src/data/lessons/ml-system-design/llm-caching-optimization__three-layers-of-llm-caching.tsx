import type { Component } from "solid-js";

const LessonLlmCachingOptimizationThreeLayersOfLlmCaching: Component = () => (
  <div class="lesson-content">
    <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
      <div class="mb-4 p-4">
        <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
          Three Layers of LLM Caching
        </h1>
        <div
          class="card-content-area"
          style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
        >
          <p style="margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            Understanding the Caching Stack
          </p>
          <p style="margin-top: 0">
            Production LLM systems use multiple caching layers working together,
            each optimizing different aspects of the inference pipeline.
            Understanding where and how each layer operates is crucial for
            interview discussions about system design.
          </p>
          <div style="margin: 20px 0 20px 0">
            <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 6px">
              <div style="width: 22px; height: 22px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 11px; flex-shrink: 0; margin-top: 2px">
                1
              </div>
              <div style="flex: 1">
                <strong>Application Layer Response Caching:</strong> Stores
                complete prompt and response pairs. When an identical or
                semantically similar request arrives, the system returns the
                cached response without calling the model at all. This is the
                most visible and controllable layer for application developers.
              </div>
            </div>
            <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 6px">
              <div style="width: 22px; height: 22px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 11px; flex-shrink: 0; margin-top: 2px">
                2
              </div>
              <div style="flex: 1">
                <strong>Provider Level Key Value (KV) Cache:</strong> Stores
                attention key and value tensors for tokens that have already
                been processed. When generating the next token in a
                conversation, the model reuses these cached tensors instead of
                recomputing attention for the entire history. This is mostly
                transparent to developers but crucial for throughput.
              </div>
            </div>
            <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 6px">
              <div style="width: 22px; height: 22px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 11px; flex-shrink: 0; margin-top: 2px">
                3
              </div>
              <div style="flex: 1">
                <strong>Agentic Plan Caching:</strong> Caches high level
                reasoning structures or workflows for complex multi-step tasks.
                Instead of caching raw text, this stores abstracted plans that
                can be adapted to new contexts, reducing expensive planner model
                invocations.
              </div>
            </div>
          </div>
          <p style="margin-top: 16px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            How KV Caching Works
          </p>
          <p style="margin-top: 0">
            For interactive chat, KV caching provides massive savings. Imagine a
            10 turn conversation where each message adds 50 tokens. Without KV
            caching, generating token 501 (first token of turn 11) would require
            computing attention over all 500 previous tokens. With KV caching,
            providers like OpenAI and Anthropic keep those attention tensors in
            GPU memory, so only the new user message needs full forward passes.
            This cuts per token compute by 30 to 70 percent depending on
            conversation length. A chat session with 2,000 tokens of history
            might see 60 percent of compute eliminated through KV reuse. The
            technique uses paged memory management to keep more concurrent users
            per GPU by swapping rarely accessed keys to host memory when GPU
            memory gets tight.
          </p>
          <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            Agentic Plan Caching Example
          </p>
          <p style="margin-top: 0">
            Consider a financial analysis agent that must generate earnings
            reports. A large planner model (2 to 3 seconds p95 latency) creates
            a multi-step plan: fetch earnings data, calculate growth metrics,
            compare to sector average, generate summary. A smaller actor model
            (200 to 400 milliseconds p95) executes each step. Without plan
            caching, every new ticker requires calling the expensive planner.
            With plan caching, the system extracts task intent ("quarterly
            earnings analysis"), looks up a cached generic plan, and adapts it
            with a cheaper model by filling in the specific ticker and date.
            Research shows this reduces planner invocations by roughly 47
            percent while maintaining about 97 percent of baseline accuracy.
          </p>
          <div style="padding: 14px 16px; border-left: 4px solid; border-radius: 0 6px 6px 0; margin: 20px 0 20px 0; font-style: italic">
            <div style="font-size: 14px; line-height: 1.5">
              "The key insight: different caching layers optimize different
              bottlenecks. Response caching eliminates redundant LLM calls
              entirely. KV caching reduces compute per token. Plan caching cuts
              down expensive reasoning steps."
            </div>
          </div>
          <p style="margin-top: 16px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            Working Together
          </p>
          <p style="margin-top: 0">
            In production, all three layers often operate simultaneously. A chat
            request first checks the response cache for an exact match. If not
            found, it proceeds to the model, which uses KV caching to
            efficiently process the conversation history. For complex agentic
            workflows, plan caching determines whether to invoke the expensive
            planner or reuse an adapted template.
          </p>
        </div>
        <div
          class="card-diagram"
          style="margin-bottom: 24px; display: flex; justify-content: center"
        >
          <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
            <div style="display: flex; flex-direction: column; gap: 12px">
              <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; text-align: center">
                <strong style="font-size: 14px">
                  Application Response Cache
                </strong>
                <div style="font-size: 11px; margin-top: 4px">
                  Full prompt/response pairs
                </div>
                <div style="font-size: 12px; font-weight: 600; margin-top: 4px">
                  20-40% hit rate typical
                </div>
              </div>
              <div style="font-size: 24px; font-weight: bold; text-align: center">
                ↓
              </div>
              <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; text-align: center">
                <strong style="font-size: 14px">Provider KV Cache</strong>
                <div style="font-size: 11px; margin-top: 4px">
                  Attention key/value tensors
                </div>
                <div style="font-size: 12px; font-weight: 600; margin-top: 4px">
                  30-70% compute saved
                </div>
              </div>
              <div style="font-size: 24px; font-weight: bold; text-align: center">
                ↓
              </div>
              <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; text-align: center">
                <strong style="font-size: 14px">Agentic Plan Cache</strong>
                <div style="font-size: 11px; margin-top: 4px">
                  Reasoning workflows
                </div>
                <div style="font-size: 12px; font-weight: 600; margin-top: 4px">
                  47% fewer planner calls
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="Learn_keyTakeaways p-4 mb-4">
          <div class="Learn_keyTakeawaysHeader mb-3 pb-3">💡 Key Takeaways</div>
          <div class="d-flex flex-column gap-2">
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Response caching at the application layer eliminates entire LLM
                calls for identical queries, with typical hit rates of 20 to 40
                percent in enterprise scenarios
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                KV caching at the provider level stores attention tensors to
                avoid recomputing them for conversation history, cutting per
                token compute by 30 to 70 percent
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Agentic plan caching stores abstracted reasoning workflows that
                can be adapted to new tasks, reducing expensive planner
                invocations by roughly 47 percent
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                These layers stack: a single request might benefit from all
                three, with each layer optimizing a different part of the
                inference pipeline
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
                Chat application: Response cache serves FAQ answers in 5ms. For
                novel questions, KV cache reuses attention over 2,000 token
                history, saving 60% compute per new token
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">2</span>
              <span class="flex-grow-1 Learn_cardContent">
                Financial agent: Plan cache provides generic earnings analysis
                workflow in 100ms via small adapter model, avoiding 2 second
                planner call for structurally similar tasks
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">3</span>
              <span class="flex-grow-1 Learn_cardContent">
                Customer support: Application cache stores exact responses for
                common issues. KV cache speeds up multi-turn troubleshooting. No
                plan cache needed for simple query/response pattern
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default LessonLlmCachingOptimizationThreeLayersOfLlmCaching;
