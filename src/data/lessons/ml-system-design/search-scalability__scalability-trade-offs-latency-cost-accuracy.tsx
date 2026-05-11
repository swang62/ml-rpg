import type { Component } from "solid-js";

const LessonSearchScalabilityScalabilityTradeOffsLatencyCostAccuracy: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Trade-offs: Latency, Cost, Accuracy, and Freshness
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="padding: 14px 16px; border: 2px solid; border-left: 4px solid; border-radius: 6px; margin: 0">
              <div style="font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px">
                Core Concept
              </div>
              <div style="font-size: 15px; line-height: 1.5">
                Scaling ML search requires balancing{" "}
                <strong>latency, cost, accuracy, and freshness</strong>. Each
                technique trades one for another.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              LATENCY VS COST
            </p>
            <p style="margin-top: 0">
              Lower latency requires more resources. HNSW with full vectors:
              2ms, 1TB RAM (k/month). IVF-PQ: 20ms, 64GB RAM (/month). 10x
              latency reduction can mean 20x cost increase. Define latency SLAs
              first, then optimize cost within budget.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              ACCURACY VS SPEED
            </p>
            <p style="margin-top: 0">
              Approximate search trades recall for speed. 99% recall at 5ms vs
              95% at 1ms. Missing 5% may be OK for recommendations but not for
              search. ANN parameters (HNSW M, efSearch) control this—tune based
              on accuracy needs.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Key Insight:</strong> Recall@100 matters more than
              Recall@10 for ranking. Retrieve top 100, rerank to find top 10.
              95% recall + perfect reranking = near-perfect final results.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              FRESHNESS VS EFFICIENCY
            </p>
            <p style="margin-top: 0">
              Caching improves latency but serves stale data. For
              recommendations, 1-hour staleness is acceptable. For news,
              5-minute freshness is required. Choose cache TTLs based on content
              velocity.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              DECISION FRAMEWORK
            </p>
            <p style="margin-top: 0">
              <strong>Step 1:</strong> Define latency SLA.{" "}
              <strong>Step 2:</strong> Define accuracy (recall target).{" "}
              <strong>Step 3:</strong> Define freshness.{" "}
              <strong>Step 4:</strong> Calculate cost at configurations.{" "}
              <strong>Step 5:</strong> Choose minimum cost meeting all
              requirements.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Key Trade-off:</strong> Fast + accurate + fresh + cheap
              is impossible. Pick your constraints, accept trade-offs on the
              rest.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="text-align: center; font-weight: bold; margin-bottom: 6px; font-size: 15px">
                  Latency Budget: 150 ms P99 SLO
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">User Embedding</strong>
                  <div style="font-size: 11px; margin-top: 3px">
                    Budget: 5 ms | Cache hit 1-2 ms (99%)
                  </div>
                </div>
                <div style="text-align: center; font-size: 18px; font-weight: bold">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">ANN Retrieval</strong>
                  <div style="font-size: 11px; margin-top: 3px">
                    Budget: 20 ms | 16 shards, 15 ms P95
                  </div>
                </div>
                <div style="text-align: center; font-size: 18px; font-weight: bold">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">Feature Fetch</strong>
                  <div style="font-size: 11px; margin-top: 3px">
                    Budget: 15 ms | P99 12 ms at 95% hit
                  </div>
                </div>
                <div style="text-align: center; font-size: 18px; font-weight: bold">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">Ranking Model</strong>
                  <div style="font-size: 11px; margin-top: 3px">
                    Budget: 25 ms | 1k candidates, 10-25 ms CPU
                  </div>
                </div>
                <div style="text-align: center; font-size: 18px; font-weight: bold">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">Network + Overhead</strong>
                  <div style="font-size: 11px; margin-top: 3px">
                    Budget: 10 ms
                  </div>
                </div>
                <div style="margin-top: 8px; text-align: center; padding: 8px; border: 2px solid; border-radius: 6px; font-weight: bold; font-size: 13px">
                  Total: 75 ms median, 150 ms P99 target
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
                  10x latency reduction can mean 20x cost increase
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Approximate search trades recall for speed—tune to
                  requirements
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Freshness vs efficiency: cache TTLs depend on content velocity
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
                  Use decision framework: define latency, accuracy, freshness,
                  minimize cost
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Recall@100 matters more than Recall@10—retrieve broadly,
                  rerank precisely
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonSearchScalabilityScalabilityTradeOffsLatencyCostAccuracy;
