import type { Component } from "solid-js";

const LessonRealtimeEmbeddingUpdatesModelEvolutionAndDualIndexing: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Model Evolution and Dual Indexing
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              THE MODEL UPDATE PROBLEM
            </p>
            <p>
              Embedding models improve over time. A newer model might produce
              better quality embeddings, improving search relevance. But
              switching models means every existing vector is now
              invalid—embeddings from different models are incompatible. You
              cannot compare a vector from model v1 against a vector from model
              v2.
            </p>
            <p>
              Full re-embedding is expensive. For 100M items, if embedding takes
              10ms per item, re-embedding takes ~12 days of continuous compute.
              During this time, you need the old index serving traffic while
              building the new one.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              DUAL INDEX STRATEGY
            </p>
            <p>
              <strong>Shadow index:</strong> Build new index using new model in
              background while old index serves traffic. Once complete, run
              quality validation (offline A/B test or shadow scoring). If
              quality improves, switch traffic to new index.
            </p>
            <p>
              <strong>Traffic cut-over:</strong> Start with 1% traffic to new
              index. Monitor latency, errors, and quality metrics. Gradually
              increase to 100% over hours or days. This catches regressions
              before full rollout.
            </p>
            <p>
              <strong>Rollback plan:</strong> Keep old index available for 1-2
              weeks after switch. If quality issues emerge, instant rollback by
              routing traffic back to old index.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              QUERY-TIME MODEL MIGRATION
            </p>
            <p>
              Alternative approach: keep both indexes running permanently. At
              query time, embed the query with both models, search both indexes,
              and merge results. This avoids atomic cutover but doubles compute
              and storage costs.
            </p>
            <p>
              When to use: if embedding quality is highly item-dependent (some
              items work better with model v1, others with v2), merging results
              from both may outperform either alone. Otherwise, dual index
              overhead is rarely worth it.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Key Insight:</strong> Model updates are index rebuilds.
              Budget for shadow indexing infrastructure—you need capacity to run
              two full indexes during transitions.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="text-align: center; font-weight: bold; font-size: 14px; margin-bottom: 4px">
                  Dual Index Migration Timeline
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong>Day 0 to 1: Build New Index</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Embed 100M items with new model
                  </div>
                  <div style="font-size: 12px">Parallel HNSW construction</div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong>Day 1 to 3: Dual Write</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Old index: old embeddings
                  </div>
                  <div style="font-size: 12px">New index: new embeddings</div>
                  <div style="font-size: 12px">0% traffic on new</div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong>Day 3 to 7: Traffic Ramp</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    1% → 10% → 50% → 100%
                  </div>
                  <div style="font-size: 12px">
                    Monitor CTR, precision at 10
                  </div>
                  <div style="font-size: 12px">Rollback if metrics drop 2%</div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong>Day 8: Decommission Old</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    100% on new index
                  </div>
                  <div style="font-size: 12px">Stop dual writes</div>
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
                  Model updates invalidate all existing vectors—embeddings from
                  different models are incompatible
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Re-embedding 100M items at 10ms each takes ~12 days; need
                  shadow index running while old serves traffic
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Traffic cut-over: start 1% on new index, monitor quality,
                  gradually increase; keep old index for rollback
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
                  Interview Tip: Explain that model updates are index
                  rebuilds—budget shadow index infrastructure for transitions.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Describe gradual traffic cut-over strategy with
                  rollback capability.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonRealtimeEmbeddingUpdatesModelEvolutionAndDualIndexing;
