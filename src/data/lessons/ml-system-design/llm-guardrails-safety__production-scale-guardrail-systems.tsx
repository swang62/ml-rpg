import type { Component } from "solid-js";

const LessonLlmGuardrailsSafetyProductionScaleGuardrailSystems: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Production Scale Guardrail Systems
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Operating at Scale
            </p>
            <p style="margin-top: 0">
              A production guardrail system is not just a model. It is a
              separate safety service with clear APIs, Service Level Agreements
              (SLAs), and operational characteristics distinct from the main LLM
              service. The architecture must handle high throughput while
              maintaining strict latency guarantees.
            </p>
            <div style="margin: 20px 0; display: flex; flex-direction: column; align-items: center">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
                Typical Production Scale
              </div>
              <div style="display: inline-flex; gap: 12px; flex-wrap: wrap; justify-content: center">
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">10M</div>
                  <div style="font-size: 10px; font-weight: 600">
                    REQUESTS/DAY
                  </div>
                </div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">500</div>
                  <div style="font-size: 10px; font-weight: 600">PEAK QPS</div>
                </div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">3s</div>
                  <div style="font-size: 10px; font-weight: 600">P99 SLO</div>
                </div>
              </div>
            </div>
            <p style="margin-top: 16px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Safety Taxonomy
            </p>
            <p style="margin-top: 0">
              First, you define a concrete safety and policy taxonomy. Vague
              categories like "harmful content" are not actionable. Instead, you
              need specifics: self harm instructions, hate speech targeting
              protected groups, sexual content involving minors, disclosure of
              credit card numbers, hallucinated medical advice, instructions to
              bypass company security. This taxonomy becomes the contract
              between policy teams and engineering. Each category maps to
              detection logic and a handling policy (block, warn, log, human
              review).
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Component Architecture
            </p>
            <p style="margin-top: 0">
              Input validators apply to user prompts and RAG context. Typical
              building blocks include pattern based detectors for PII and API
              keys (regular expressions or finite automata running in
              microseconds), fast neural text classifiers for broad categories
              (5 to 20ms on GPU batches), and specialized prompt injection
              detectors. For very high Query Per Second (QPS), you batch
              requests: collecting 32 or 64 requests and processing them
              together amortizes GPU overhead, improving throughput from 2000 to
              8000 requests per second per GPU. Output validators combine static
              rules with dynamic models. Static rules always strip emails and
              phone numbers unless explicitly allowed. Then a safety classifier
              runs on the full response. A two tier system keeps average latency
              low: most requests get a fast verdict from a small classifier, but
              borderline cases (perhaps 5 to 10 percent) trigger escalation to a
              more powerful LLM judge that uses chain of thought reasoning. This
              judge might take 300 to 500ms extra, but it only runs on ambiguous
              outputs. Tool safety is implemented as a policy engine operating
              on structured intents. When the LLM proposes{" "}
              <code>refund_order(order_id=12345, amount=50.00)</code>, the
              engine checks: Does this user role allow refunds? Is $50 within
              their limit? Is this order flagged? Has this user requested
              suspiciously many refunds today? These checks query internal
              permission services and must complete in under 50ms to avoid
              becoming the bottleneck.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Math of Underblocking
            </p>
            <p style="margin-top: 0">
              At 10 million requests per day, even a 0.1 percent underblocking
              rate means 10,000 unsafe outputs slip through. If 1 percent of
              those cause serious incidents (regulatory fines, customer harm, PR
              damage), that is 100 incidents per day. This is why high volume
              systems often layer multiple detectors: a fast heuristic catches
              95 percent of violations in 5ms, a classifier catches another 4.9
              percent in 20ms, and an LLM judge catches half of the remaining
              0.1 percent in 200ms when triggered.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>❗ Remember:</strong> Observability is critical. Log all
              safety decisions, model scores, and block reasons with enough
              detail for audits but protect PII. Periodically red team the
              system with adversarial prompts and measure attack success rates
              to retrain safety models.
            </div>
            <p style="margin-top: 16px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Fail Open vs Fail Closed
            </p>
            <p style="margin-top: 0">
              When the guardrail service is unavailable, you must decide: fail
              open (let requests through unmoderated) or fail closed (reject all
              requests). Fail closed maximizes safety but can make your entire
              product appear down even when the main LLM is healthy. Fail open
              maximizes availability but risks serious incidents. Most regulated
              domains (healthcare, finance, legal) fail closed. Consumer
              products often fail open with degraded safety for short outages,
              but maintain a kill switch to disable high risk tools entirely if
              a novel attack is detected.
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
                  Define concrete safety taxonomy with actionable categories
                  (self harm, PII types, specific policy violations), not vague
                  labels
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  At 10 million requests per day, even 0.1% underblocking means
                  10,000 unsafe outputs; layer multiple detectors for defense in
                  depth
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Batch processing on GPU improves throughput from 2000 to 8000
                  requests per second by amortizing overhead across 32 to 64
                  requests
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Two tier output validation: fast classifier for most cases
                  (under 50ms), expensive LLM judge only for borderline 5 to 10%
                  of outputs
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Fail open vs fail closed decision depends on domain: regulated
                  systems (healthcare, finance) fail closed, consumer products
                  may fail open with kill switch
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
                  Commerce platform tool safety:
                  &lt;code&gt;refund_order()&lt;/code&gt; checks user role,
                  amount limit ($50 &lt; $200 manager limit), order status,
                  recent refund count, completes in 35ms querying permission
                  service
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Content platform with layered detection: regex catches 95% of
                  credit cards in 5ms, classifier catches 4.9% of hate speech in
                  20ms, LLM judge catches subtle self harm in borderline 0.1% of
                  cases in 200ms
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonLlmGuardrailsSafetyProductionScaleGuardrailSystems;
