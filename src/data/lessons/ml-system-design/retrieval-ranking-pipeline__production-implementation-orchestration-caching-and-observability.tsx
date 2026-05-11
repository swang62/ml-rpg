import type { Component } from "solid-js";

const LessonRetrievalRankingPipelineProductionImplementationOrchestrationCachingAndObservability: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Production Implementation: Orchestration, Caching, and Observability
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              PIPELINE ORCHESTRATION
            </p>
            <p style="margin-top: 0">
              The request coordinator fans out to retrievers in parallel, waits
              with 30ms timeout, merges candidates, applies filters, then passes
              to ranking. Each retriever runs independently. The coordinator
              collects whatever arrives before timeout and proceeds with partial
              candidates rather than failing. This degradation strategy keeps
              the system available even when individual retrievers are slow.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              CACHING STRATEGIES
            </p>
            <p style="margin-top: 0">
              User embeddings cache for 5 to 15 minutes since preferences change
              slowly. Item embeddings cache for hours. Retrieval results for
              popular queries cache for 1 to 5 minutes. Ranking features are
              tricky: static features (item age, category) cache well,
              personalized features cannot. Typical systems achieve 60 to 80%
              cache hit rate on retrieval, reducing average latency by 40%.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              OBSERVABILITY AND DEBUGGING
            </p>
            <p style="margin-top: 0">
              Log at each stage: candidate count, score distribution (min, max,
              median), latency, sample item IDs. Build debug mode storing full
              candidate lists for sampled requests. When recommendations look
              wrong, retrieve the trace to see what retrieval returned, what
              ranking scored, where it broke.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>✅ Best Practice:</strong> Propagate a request ID through
              all stages. Include it in metrics and traces so you can correlate
              retriever latency, candidate counts, and ranking scores for any
              request.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              A/B TESTING PIPELINE CHANGES
            </p>
            <p style="margin-top: 0">
              Changes to retrieval affect candidate diversity, affecting ranking
              behavior, affecting engagement. A new retriever improving recall
              5% might surface candidates with lower ranking scores. Always
              measure end to end metrics (clicks, conversions), not just stage
              metrics. Run experiments at least one week to capture weekly
              patterns.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 12px; align-items: center">
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 180px; text-align: center">
                  <strong style="font-size: 14px">User Query</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    "What is retrieval?"
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 180px; text-align: center">
                  <strong style="font-size: 14px">Retrieval (Hybrid)</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    BM25 + Dense: 15ms
                  </div>
                  <div style="font-size: 12px">Returns 25 chunks</div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 180px; text-align: center">
                  <strong style="font-size: 14px">
                    Re Ranking (Cross Encoder)
                  </strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Score 25 pairs: 70ms
                  </div>
                  <div style="font-size: 12px">Select top 3 chunks</div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 180px; text-align: center">
                  <strong style="font-size: 14px">LLM Generation</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    GPT 4 with top 3 chunks
                  </div>
                  <div style="font-size: 12px">Answer grounded in facts</div>
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
                  Fan out to retrievers in parallel with 30ms timeout - proceed
                  with partial results rather than fail
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Cache user embeddings for 5-15 mins, item embeddings for
                  hours, retrieval results for 1-5 mins
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Typical systems achieve 60-80% cache hit rate on retrieval,
                  reducing latency by 40%
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Log candidate count, score distribution, latency, and sample
                  IDs at each stage for debugging
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Test pipeline changes end-to-end for at least one week to
                  capture engagement effects
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
                  Describe the orchestration flow: coordinator → parallel
                  retrievers (30ms timeout) → merge → filter → rank
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Explain cache strategy: embeddings cache well, personalized
                  features cannot be cached
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Discuss debugging: trace request ID through all stages to find
                  where recommendations went wrong
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonRetrievalRankingPipelineProductionImplementationOrchestrationCachingAndObservability;
