import type { Component } from "solid-js";

const LessonLlmGuardrailsSafetyGuardrailDesignTradeOffs: Component = () => (
  <div class="lesson-content">
    <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
      <div class="mb-4 p-4">
        <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
          Guardrail Design Trade-offs
        </h1>
        <div
          class="card-content-area"
          style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
        >
          <p style="margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            The Central Tension
          </p>
          <p style="margin-top: 0">
            Every guardrail decision trades off safety, latency, cost, and user
            experience. There is no free lunch. Understanding these trade-offs
            lets you make informed choices based on your product requirements
            and risk tolerance.
          </p>
          <div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 8px; margin: 12px 0; align-items: stretch">
            <div style="padding: 12px; border: 2px solid; border-radius: 6px">
              <div style="font-weight: 700; margin-bottom: 4px; font-size: 13px">
                Finetuned Safety Model
              </div>
              <div style="font-size: 12px">
                Zero latency overhead, but hard to update quickly and no hard
                guarantees
              </div>
            </div>
            <div style="display: flex; align-items: center; font-weight: 800; font-size: 18px">
              vs
            </div>
            <div style="padding: 12px; border: 2px solid; border-radius: 6px">
              <div style="font-weight: 700; margin-bottom: 4px; font-size: 13px">
                External Guardrails
              </div>
              <div style="font-size: 12px">
                Adds 50 to 200ms latency, but updatable in hours and enforceable
              </div>
            </div>
          </div>
          <strong>Trade-off 1: Where to Put Safety Knowledge</strong>
          You can finetune the base LLM on safety examples so it naturally
          avoids bad outputs. This costs zero extra inference latency and
          improves average behavior. OpenAI's GPT models and Anthropic's Claude
          are heavily safety tuned. But finetuning cannot enforce hard
          guarantees. A cleverly worded jailbreak can still bypass learned
          safety. And updating finetuned behavior requires retraining the entire
          model, which takes weeks and costs hundreds of thousands to millions
          of dollars. External guardrails add 50 to 200ms per request but give
          you rapidly updatable control. When a new attack pattern emerges, you
          update a rule or retrain a small 300 million parameter classifier in
          hours, not weeks. When regulations change, you adjust policy code
          without touching the base model. For regulated domains, this agility
          is worth the latency cost.
          <strong>Trade-off 2: Rules vs Learned Models</strong>
          Rule based filters are fast (microseconds to milliseconds) and
          interpretable. A regex that blocks credit card numbers is trivial to
          explain to auditors and lawyers. Rules are perfect for objective
          constraints: "never send Social Security Numbers," "do not call
          payment API more than 5 times per minute," "always require supervisor
          approval for refunds over $500." But rules struggle with nuance.
          Detecting subtle hate speech or indirect self harm prompts requires
          understanding context and intent. Learned classifiers and LLM judges
          handle this better, catching 95 to 99 percent of nuanced violations.
          The cost is false positives, false negatives, and the need for
          periodic retraining as adversaries evolve. In practice, you use both:
          rules for clear cut cases, models for gray areas.<p></p>
          <div style="padding: 14px 16px; border-left: 4px solid; border-radius: 0 6px 6px 0; margin: 20px 0; font-style: italic">
            <div style="font-size: 14px; line-height: 1.5">
              "The decision is not 'add every guardrail.' It is: what is your
              risk profile? A medical chatbot (high risk, regulated) needs
              multiple layers and accepts 200ms latency. A creative writing
              assistant (lower risk) might use lighter checks and optimize for
              speed."
            </div>
          </div>
          <strong>Trade-off 3: Single Model vs Multi Stage Pipeline</strong>
          Using one big model to generate and self critique in a single pass
          simplifies architecture. You prompt the model with "Generate an
          answer, then check if it violates policy, then return only the safe
          version." This works for simple cases and adds no extra latency. But
          it couples safety quality tightly to that model and its failure modes.
          If an adversarial prompt exploits the generator, it often also fools
          the self critic because they share the same weights and biases. Using
          specialized smaller models for classification and a separate LLM as
          judge provides better defense in depth. A 300 million parameter
          classifier can run at thousands of QPS per GPU, much cheaper than
          running a 7B model twice. The trade-off is operational complexity:
          more components to deploy, monitor, and version.
          <strong>Trade-off 4: Overblocking vs Underblocking</strong>
          Stricter guardrails reduce unsafe outputs but increase false
          positives. An overly aggressive PII filter might block a customer
          support agent from saying "I will email you at john@example.com to
          confirm," even though echoing the user's own email is necessary and
          allowed. This degrades user experience and trust. At scale, you
          measure this with precision and recall. High precision (few false
          positives) but lower recall (misses some violations) means
          underblocking. High recall (catches most violations) but lower
          precision means overblocking and frustrated users. The right balance
          depends on your domain. A financial compliance chatbot might accept 5
          percent false positive rate to catch 99.9 percent of violations. A
          creative writing tool might accept 1 percent underblocking to avoid
          annoying users with false blocks.
          <p></p>
          <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            When to Choose What
          </p>
          <p style="margin-top: 0">
            For high risk, regulated domains (healthcare advice, legal guidance,
            financial transactions): use multiple guardrail layers, fail closed
            on outages, accept 200ms latency overhead, optimize for recall over
            precision. For consumer creativity or entertainment products: use
            lighter guardrails, fail open with monitoring, optimize for latency
            and user experience, accept slightly higher underblocking. For
            physical systems (robots, autonomous vehicles): use formal methods
            and real time constraints, optimize for worst case latency (10 to
            50ms), enforce hard safety properties over flexibility.
          </p>
        </div>
        <div class="Learn_keyTakeaways p-4 mb-4">
          <div class="Learn_keyTakeawaysHeader mb-3 pb-3">💡 Key Takeaways</div>
          <div class="d-flex flex-column gap-2">
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Finetuned safety adds zero latency but takes weeks to update;
                external guardrails add 50 to 200ms but update in hours
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Rules are fast (microseconds) and interpretable for clear
                policies; learned models catch nuanced violations but need
                retraining
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Single model self critique is simple but couples safety to
                generator's failure modes; multi stage pipelines offer defense
                in depth at cost of complexity
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Overblocking frustrates users; underblocking risks incidents. At
                10M requests/day, 0.1% false positive rate is 10,000 incorrectly
                blocked interactions
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Domain drives decisions: regulated systems (healthcare, finance)
                optimize for safety and accept latency; consumer products
                balance safety with user experience
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
                Medical chatbot: uses 3 layer guardrails (input validator 10ms,
                output classifier 50ms, LLM judge 200ms), fails closed on
                outage, accepts 260ms overhead for 99.9% violation recall
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">2</span>
              <span class="flex-grow-1 Learn_cardContent">
                Creative writing assistant: uses single layer fast classifier
                (20ms), fails open with logging, accepts 1% underblocking to
                avoid blocking creative content that mentions violence in
                literary context
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default LessonLlmGuardrailsSafetyGuardrailDesignTradeOffs;
