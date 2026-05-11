import type { Component } from "solid-js";

const LessonInterleavingExperimentsProductionImplementationAndScaleConsiderations: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Production Implementation and Scale Considerations
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 0; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              LATENCY BUDGET
            </p>
            <p style="margin-top: 0">
              Consider a search service with 100ms p50 latency and 150ms p99.
              Adding interleaving must not blow the latency budget. The merge
              algorithm itself is cheap: O(K) with under 1ms for typical
              K=10-50. The real cost is running two rankers. If your ranker
              takes 30ms, dual inference adds 30ms (or 60ms if sequential).
              Mitigations: (1) Run rankers in parallel. (2) Cache shared
              features (user embeddings, item metadata) in Redis or local
              memory. (3) Use a fast candidate generator and only interleave the
              reranking stage.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              TRAFFIC SAMPLING
            </p>
            <p style="margin-top: 0">
              Running interleaving on 100% of traffic doubles infrastructure
              cost. Instead, sample 10-20% of traffic. At 10,000 QPS, 10%
              sampling gives 1,000 QPS for interleaving, producing 400-2,000
              competitive sessions per day, enough for statistical significance
              in 2-5 days. Use deterministic hashing (e.g., hash of user ID mod
              100 &lt; 10) for consistent user bucketing.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>✅ Best Practice:</strong> Sample 10-20% of traffic for
              interleaving to balance statistical power against infrastructure
              cost.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              LOGGING AND MONITORING
            </p>
            <p style="margin-top: 0">
              Every interleaved request logs: query ID, item IDs with positions,
              team assignments, neutral flags, coin flip seeds, and all
              engagement events (clicks, time spent, conversions). Build a
              streaming pipeline to compute running preference margins every
              5-10 minutes. Alert when: (1) Competitive coverage drops below
              30%. (2) First position balance drifts beyond 2%. (3) Latency p99
              regresses more than 5%.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              PARALLEL EXPERIMENTS
            </p>
            <p style="margin-top: 0">
              Large teams run 10-20 interleaving experiments simultaneously.
              Each experiment targets a different query segment (e.g.,
              navigational vs informational queries) or feature area (e.g.,
              personalization vs query understanding). Use query level
              randomization with deterministic hashing so the same query
              consistently enters the same experiment. Log experiment IDs for
              downstream filtering.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 8px">
                <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">User Request</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    10K QPS, 120ms median latency
                  </div>
                </div>
                <div style="font-size: 18px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="display: flex; gap: 8px; justify-content: center">
                  <div style="border: 2px solid; padding: 8px; border-radius: 6px; flex: 1; text-align: center">
                    <strong style="font-size: 12px">Feature Cache</strong>
                    <div style="font-size: 11px; margin-top: 2px">50ms</div>
                  </div>
                </div>
                <div style="font-size: 18px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="display: flex; gap: 8px; justify-content: center">
                  <div style="border: 2px solid; padding: 8px; border-radius: 6px; flex: 1; text-align: center">
                    <strong style="font-size: 12px">Model A</strong>
                    <div style="font-size: 11px; margin-top: 2px">20ms</div>
                  </div>
                  <div style="border: 2px solid; padding: 8px; border-radius: 6px; flex: 1; text-align: center">
                    <strong style="font-size: 12px">Model B</strong>
                    <div style="font-size: 11px; margin-top: 2px">20ms</div>
                  </div>
                </div>
                <div style="font-size: 18px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 8px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 12px">Team Draft Merge</strong>
                  <div style="font-size: 11px; margin-top: 2px">
                    &lt; 1ms for K=20 items
                  </div>
                </div>
                <div style="font-size: 18px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 8px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 12px">Response + Logging</strong>
                  <div style="font-size: 11px; margin-top: 2px">
                    Total: ~92ms (under 10ms added)
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
                  Merge is cheap (&lt;1ms) but dual ranker inference adds
                  30-60ms; mitigate with parallel execution and feature caching
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Sample 10-20% of traffic to balance statistical power against
                  infrastructure cost; 10% at 10k QPS gives adequate samples in
                  days
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Log query ID, item positions, team labels, neutral flags, coin
                  seeds, and all engagement for streaming aggregation
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Monitor competitive coverage (&gt;30%), first position balance
                  (within 2%), and latency p99 regression (&lt;5%)
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
                  When discussing scale, mention that 10% traffic sampling at
                  10k QPS provides 400-2,000 competitive sessions daily, enough
                  for 2-5 day experiments
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Explain latency mitigation: parallel ranker execution, feature
                  caching in Redis, and only interleaving the reranking stage
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Show operational depth by listing guardrails: competitive
                  coverage &gt;30%, position balance within 2%, latency p99
                  under 5% regression
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonInterleavingExperimentsProductionImplementationAndScaleConsiderations;
