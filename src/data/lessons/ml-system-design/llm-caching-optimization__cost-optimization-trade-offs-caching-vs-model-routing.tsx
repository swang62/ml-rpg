import type { Component } from "solid-js";

const LessonLlmCachingOptimizationCostOptimizationTradeOffsCachingVsModelRouting: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Cost Optimization Trade-offs: Caching vs Model Routing
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Decision Framework
            </p>
            <p style="margin-top: 0">
              Caching and model routing are complementary but solve different
              problems. Caching eliminates redundant compute for repeated work.
              Model routing sends different requests to different
              cost/capability tiers. Understanding when to use each is critical
              for interview discussions.
            </p>
            <div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 8px; margin: 12px 0; align-items: stretch">
              <div style="padding: 12px; border: 2px solid; border-radius: 6px">
                <div style="font-weight: 700; margin-bottom: 4px; font-size: 13px">
                  Response Caching
                </div>
                <div style="font-size: 12px">
                  Best for: High repetition (20-40%), strict correctness,
                  latency critical
                </div>
                <div style="font-size: 11px; margin-top: 4px">
                  Save: 30% cost, 100x latency
                </div>
              </div>
              <div style="display: flex; align-items: center; font-weight: 800; font-size: 18px">
                vs
              </div>
              <div style="padding: 12px; border: 2px solid; border-radius: 6px">
                <div style="font-weight: 700; margin-bottom: 4px; font-size: 13px">
                  Model Routing
                </div>
                <div style="font-size: 12px">
                  Best for: Variable complexity, cost constraints, acceptable
                  quality loss
                </div>
                <div style="font-size: 11px; margin-top: 4px">
                  Save: 50-80% cost, similar latency
                </div>
              </div>
            </div>
            <p style="margin-top: 16px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              When Caching Dominates
            </p>
            <p style="margin-top: 0">
              Use aggressive caching when your workload has natural repetition
              and correctness is paramount. Enterprise knowledge bases, customer
              support FAQs, and documentation search all see 30 to 50 percent of
              queries asking the same small set of questions. A 40 percent cache
              hit rate with exact matching gives you 40 percent cost reduction
              with zero quality risk. For regulated domains like healthcare or
              finance, where approximate answers can cause compliance issues,
              exact caching is often the only safe optimization. Semantic
              caching introduces risk of returning contextually wrong answers
              that could violate regulations. Caching also wins when latency
              matters more than cost. Serving from cache takes under 5
              milliseconds versus 500 to 2000 milliseconds for model inference.
              For user facing chat where every 100 milliseconds hurts
              engagement, that 100x to 400x speedup is worth more than marginal
              cost savings from routing.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              When Model Routing Dominates
            </p>
            <p style="margin-top: 0">
              Model routing shines when requests have variable complexity and
              you can tolerate some quality degradation. Consider a coding
              assistant: simple syntax questions can go to a smaller, faster
              model (200 milliseconds, $0.001 per request), while complex
              algorithm design needs the big model (800 milliseconds, $0.02 per
              request). A classifier model (often a fine tuned smaller model at
              50 milliseconds, $0.0001 per classification) routes each request.
              If 70 percent of queries are simple, you route them to the cheap
              model. This saves roughly 65 percent of costs: 0.7 times $0.001
              plus 0.3 times $0.02 equals $0.0067 per request on average versus
              $0.02 for always using the expensive model. The trade-off is
              quality variance. That cheap model might have 92 percent accuracy
              versus 97 percent for the expensive model. For simple queries
              where both are highly accurate, this is fine. But complex queries
              routed to the cheap model by mistake suffer significant quality
              drops.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Combining Both Strategies
            </p>
            <p style="margin-top: 0">
              Production systems often use both. A request flow might be: check
              response cache first (5 milliseconds if hit), on miss, classify
              query complexity (50 milliseconds), route to appropriate model
              tier (200 to 800 milliseconds), cache the response for future
              hits. This stacks savings. If 30 percent hit the cache and 50
              percent of the remaining 70 percent route to the cheap model, your
              effective cost is: 0.30 times $0 plus 0.35 times $0.001 plus 0.35
              times $0.02, which equals $0.0074 per request versus $0.02
              baseline. That is 63 percent cost reduction.
            </p>
            <div style="padding: 14px 16px; border-left: 4px solid; border-radius: 0 6px 6px 0; margin: 20px 0; font-style: italic">
              <div style="font-size: 14px; line-height: 1.5">
                "The right strategy depends on your workload: High repetition
                plus strict correctness requirements favor caching. Variable
                complexity plus acceptable quality trade-offs favor routing.
                Most production systems use both."
              </div>
            </div>
            <p style="margin-top: 16px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Hidden Costs
            </p>
            <p style="margin-top: 0">
              Model routing adds complexity that you must defend with unit
              economics. The classifier itself costs money and adds latency. If
              classification takes 80 milliseconds and costs $0.0002 per
              request, and your routing only saves $0.005 per routed request,
              you need over 50 percent cheap model routing just to break even on
              the classifier cost. Aggressive routing also risks quality
              degradation in ways that are hard to detect. Routing 80 percent to
              cheap models might preserve average accuracy metrics, but critical
              edge cases could deteriorate sharply. You need per segment quality
              monitoring and rollback mechanisms when optimizations hurt
              specific user cohorts. Semantic caching has similar hidden costs.
              Vector search for similarity takes 10 to 30 milliseconds and
              requires maintaining an embedding index. If your baseline hit rate
              is only 15 percent, the overhead might not justify the savings.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">Incoming Request</strong>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">Check Response Cache</strong>
                  <div style="font-size: 11px; margin-top: 3px">
                    30% hit → 5ms return
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓ miss
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">Classify Complexity</strong>
                  <div style="font-size: 11px; margin-top: 3px">
                    50ms, $0.0001
                  </div>
                </div>
                <div style="display: flex; gap: 10px; justify-content: space-between">
                  <div style="flex: 1; border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                    <strong style="font-size: 12px">
                      Simple → Cheap Model
                    </strong>
                    <div style="font-size: 11px; margin-top: 3px">
                      50% of misses
                      <br />
                      200ms, $0.001
                    </div>
                  </div>
                  <div style="flex: 1; border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                    <strong style="font-size: 12px">
                      Complex → Premium Model
                    </strong>
                    <div style="font-size: 11px; margin-top: 3px">
                      20% of misses
                      <br />
                      800ms, $0.02
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
                  Caching wins for high repetition workloads (30 to 50 percent
                  hit rate) and strict correctness requirements, saving 30 to 40
                  percent cost with zero quality risk
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Model routing saves 50 to 80 percent cost when requests have
                  variable complexity, but requires classifier overhead (50 to
                  80 milliseconds, $0.0001 to $0.0002) and tolerates quality
                  variance
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Combining both strategies can achieve 60 to 70 percent total
                  cost reduction: cache handles repetition, routing optimizes
                  the remaining varied queries
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Hidden costs matter: classifier cost and latency, semantic
                  cache vector search overhead (10 to 30 milliseconds), and
                  quality monitoring for routed requests
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
                  Customer support chatbot: 40% cache hit rate for FAQs,
                  remaining 60% routes simple greetings to cheap model, complex
                  troubleshooting to premium model, total 65% cost reduction
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Code assistant: exact caching for common syntax questions (30%
                  hit), routing 70% of misses by complexity (simple to fast
                  model, complex to GPT-4), saving 68% with acceptable quality
                  trade-off
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Financial compliance tool: only exact caching (no semantic, no
                  routing) to avoid regulatory risk, 25% hit rate, prioritizes
                  correctness over maximum savings
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonLlmCachingOptimizationCostOptimizationTradeOffsCachingVsModelRouting;
