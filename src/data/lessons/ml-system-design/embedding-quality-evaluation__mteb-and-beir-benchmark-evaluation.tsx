import type { Component } from "solid-js";

const LessonEmbeddingQualityEvaluationMtebAndBeirBenchmarkEvaluation: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            MTEB and BEIR Benchmark Evaluation
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              WHAT ARE EMBEDDING BENCHMARKS
            </p>
            <p>
              MTEB (Massive Text Embedding Benchmark) and BEIR (Benchmarking
              Information Retrieval) are standardized test suites that evaluate
              embedding models across many tasks. Instead of testing on one
              dataset, they aggregate performance across 56+ tasks (MTEB) or 18+
              retrieval datasets (BEIR).
            </p>
            <p>
              Why benchmarks matter: a model that excels on one dataset might
              fail on others. Benchmarks reveal how well embeddings generalize
              across domains, languages, and task types.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              MTEB STRUCTURE
            </p>
            <p>
              MTEB evaluates embeddings on 8 task categories: semantic textual
              similarity, classification, clustering, reranking, retrieval, pair
              classification, and summarization. Each category has multiple
              datasets with different characteristics.
            </p>
            <p>
              The aggregate MTEB score is a weighted average across all tasks. A
              model scoring 65/100 overall might score 75 on retrieval but only
              55 on classification. Check individual task scores relevant to
              your use case—the aggregate can hide weaknesses.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              BEIR FOR RETRIEVAL
            </p>
            <p>
              BEIR focuses specifically on zero-shot retrieval—can an embedding
              model retrieve relevant documents from domains it has never seen
              during training? Datasets span scientific papers, financial
              documents, COVID-19 research, and more.
            </p>
            <p>
              Key metrics: NDCG@10 (normalized discounted cumulative gain at
              rank 10) measures how well the model ranks relevant documents at
              the top. An NDCG@10 of 0.45 on BEIR is considered competitive;
              state-of-art models reach 0.50-0.55.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              BENCHMARK LIMITATIONS
            </p>
            <p>
              Benchmark datasets may not represent your production data. A model
              that tops MTEB leaderboard might underperform on your specific
              domain. Always validate on your own held-out data after benchmark
              screening.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Key Trade-off:</strong> Benchmark-optimized models may
              overfit to benchmark distributions. Use benchmarks for initial
              model selection, then fine-tune and validate on your domain data.
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
                  MTEB: 56+ tasks across 8 categories; aggregate score hides
                  per-task weaknesses
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  BEIR: zero-shot retrieval across 18+ domains; NDCG@10 of 0.45+
                  is competitive
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Benchmarks screen models but do not replace domain-specific
                  validation
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
                  Interview Tip: Explain why aggregate MTEB score is
                  misleading—a model scoring 65 overall might score 55 on your
                  specific task.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Describe the limitation—benchmark leaders may
                  underperform on your domain, so always validate locally.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonEmbeddingQualityEvaluationMtebAndBeirBenchmarkEvaluation;
