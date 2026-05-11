import type { Component } from "solid-js";

const LessonLlmCachingOptimizationFailureModesAndEdgeCasesInLlmCaching: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Failure Modes and Edge Cases in LLM Caching
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Staleness and Cache Invalidation
            </p>
            <p style="margin-top: 0">
              The most common production failure is serving stale cached
              responses after underlying data changes. Imagine an HR chatbot
              caching policy answers with a 24 hour TTL. If the vacation policy
              changes mid day from 15 to 20 days, cached responses will tell
              employees the old 15 day policy for up to 24 hours, causing
              confusion and potential compliance issues. The fix requires tying
              cache keys to content versions. Instead of just caching by prompt,
              include a <code>policy_version</code> hash in the key. When
              policies update, the version changes, and old cache entries become
              unreachable. This works but requires coordinating your cache
              invalidation with your content deployment pipeline. For dynamic
              data like stock prices or inventory, aggressive TTLs (10 to 30
              seconds) are necessary. But this tanks your hit rate because cache
              entries expire before they can be reused. You end up with cache
              overhead (key generation, lookup latency) but minimal benefit.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>❗ Remember:</strong> Cache invalidation is one of the two
              hard problems in computer science. For LLM caching, always version
              your content or use conservative TTLs shorter than your acceptable
              staleness window.
            </div>
            <p style="margin-top: 16px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Semantic Drift in Approximate Matching
            </p>
            <p style="margin-top: 0">
              Semantic caching fails catastrophically on prompts that embed
              similarly but require different answers. Consider two questions:
              "What's our refund window for electronics?" and "What's our refund
              window for groceries?" Both embed nearly identically (cosine
              similarity 0.94) because they share structure and most words. If
              the actual policies differ (30 days for electronics, 7 days for
              groceries), a semantic cache with threshold 0.90 will return the
              wrong cached answer 50 percent of the time depending on which
              question was cached first. This type of subtle semantic drift is
              almost impossible to detect automatically without expensive
              verification. The solution is domain specific filtering. Before
              returning a cached hit, extract key entities ("electronics" versus
              "groceries") and verify they match. This adds 20 to 50
              milliseconds of latency and complexity, reducing the benefit of
              caching. For high risk domains, the conservative choice is to
              disable semantic caching entirely and rely only on exact matches.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              KV Cache Memory Exhaustion
            </p>
            <p style="margin-top: 0">
              KV caching increases GPU memory pressure because you store tensors
              for every active conversation. In a chat system serving 10,000
              concurrent users, each with 2,000 token history, you might need 5
              to 10 Gigabytes (GB) of GPU memory just for KV cache, leaving less
              room for model weights and batch processing. When memory fills up,
              providers must either evict KV entries (forcing recomputation
              later) or swap them to host memory. Swapping can increase p99
              latency from 800 milliseconds to 5 seconds because loading KV
              tensors from host memory over PCIe is slow. This creates a latency
              cliff under load that is hard to predict and debug. Paged KV
              techniques help by splitting cache into fixed size blocks that can
              be swapped granularly, but this adds scheduling complexity. The
              system must decide which blocks to keep in GPU memory based on
              usage patterns, essentially implementing an LRU (Least Recently
              Used) cache inside the GPU.
            </p>
            <div style="margin: 20px 0; display: flex; flex-direction: column; align-items: center">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
                KV Cache Memory Pressure
              </div>
              <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap; justify-content: center">
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 10px; font-weight: 600">NORMAL</div>
                  <div style="font-size: 16px; font-weight: 800">800ms p99</div>
                </div>
                <div style="font-size: 18px; font-weight: 800">→</div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 10px; font-weight: 600">
                    SWAP TO HOST
                  </div>
                  <div style="font-size: 16px; font-weight: 800">
                    5000ms p99
                  </div>
                </div>
              </div>
            </div>
            <p style="margin-top: 16px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Plan Cache False Positives
            </p>
            <p style="margin-top: 0">
              Agentic plan caching breaks when keyword extraction is too coarse.
              If two tasks map to the same keyword but need different plans, the
              system executes the wrong workflow. For example, "analyze Q3
              earnings growth" and "forecast Q4 earnings growth" might both
              extract keyword "earnings growth" but require different plans
              (historical analysis versus forward prediction). The research uses
              exact keyword matching to avoid fuzzy false positives, but this
              lowers hit rate to around 47 percent. There is no free lunch:
              tighter matching means more cache misses and more expensive
              planner invocations. Looser matching means higher hit rate but
              more execution failures. Another edge case is cached plans
              encoding outdated assumptions. If a plan from six months ago calls
              an API endpoint that has since changed or uses tools that have
              been deprecated, high cache hit rate actually causes high task
              failure rate. You need explicit plan versioning and periodic
              revalidation or retraining of cached templates.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Quality Degradation Under Routing
            </p>
            <p style="margin-top: 0">
              Aggressive model routing can harm user experience in subtle ways
              that average metrics miss. Imagine routing 80 percent of coding
              questions to a cheaper model that performs well on simple syntax
              but poorly on algorithms. Your overall accuracy might be 94
              percent (high), but the 20 percent of users asking hard questions
              see 75 percent accuracy (terrible). This creates a bimodal quality
              distribution where some users have great experiences and others
              have awful experiences, even though the average looks acceptable.
              Detecting this requires per cohort or per query type quality
              tracking, not just global metrics. The mitigation is conservative
              routing policies with escape hatches. Start by routing only the
              most obviously simple queries (like greetings or simple lookups).
              Monitor quality closely. Add a feedback mechanism so users can
              flag bad responses, triggering a retry with the premium model.
              This caps the damage from misrouting.
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
                  Staleness failures occur when cache TTL exceeds content update
                  frequency, requiring content versioning in cache keys or
                  aggressive TTLs that hurt hit rates
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Semantic caching with similarity threshold 0.90 can return
                  wrong answers for prompts that embed similarly (0.94 cosine
                  similarity) but need different responses, requiring entity
                  level validation
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  KV cache memory pressure causes latency cliffs: p99 jumps from
                  800 milliseconds to 5 seconds when GPU memory fills and system
                  swaps tensors to host memory
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Agentic plan cache false positives happen when distinct tasks
                  map to the same keyword, and stale cached plans can encode
                  outdated API assumptions causing execution failures
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Model routing creates bimodal quality distribution where
                  average metrics look good but specific user cohorts experience
                  significantly degraded performance
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
                  HR chatbot serves 15 day vacation policy from cache for 18
                  hours after policy updated to 20 days because TTL was 24 hours
                  and key did not include policy version
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  E-commerce refund bot with semantic cache (0.90 threshold)
                  returns electronics policy (30 days) for grocery question
                  because queries embedded at 0.94 similarity despite different
                  answers
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Chat system at 10K concurrent users fills 8GB GPU memory with
                  KV cache, forcing swaps to host memory that spike p99 from
                  600ms to 4 seconds during peak traffic
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">4</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Coding assistant routes 80% to cheap model, overall accuracy
                  is 93%, but algorithmic questions (20% of traffic) drop to 72%
                  accuracy, hurting expert users
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonLlmCachingOptimizationFailureModesAndEdgeCasesInLlmCaching;
