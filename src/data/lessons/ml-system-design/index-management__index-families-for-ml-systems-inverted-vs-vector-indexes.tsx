import type { Component } from "solid-js";

const LessonIndexManagementIndexFamiliesForMlSystemsInvertedVsVectorIndexes: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Index Families for ML Systems: Inverted vs Vector Indexes
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="padding: 14px 16px; border: 2px solid; border-left: 4px solid; border-radius: 6px; margin: 0">
              <div style="font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px">
                Definition
              </div>
              <div style="font-size: 15px; line-height: 1.5">
                <strong>Index management</strong> encompasses the operational
                tasks of building, updating, and scaling vector indexes that
                power similarity search at production scale.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              THE LIFECYCLE CHALLENGE
            </p>
            <p>
              Building an index once is straightforward. The challenge is
              managing that index over time as content changes, embeddings are
              updated, and query volume grows. A static index becomes stale
              within weeks as new items are added and old embeddings drift.
            </p>
            <p>
              Production index management requires answering: How do you add new
              vectors without rebuilding from scratch? How do you handle
              embedding model updates that invalidate all vectors? How do you
              scale to billions of vectors across multiple machines?
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              INDEX BUILD PHASES
            </p>
            <p>
              <strong>Initial build:</strong> Compute embeddings for entire
              corpus, train index structures (IVF centroids, HNSW graph, PQ
              codebooks). For 100M vectors, expect 2-8 hours depending on index
              type and hardware.
            </p>
            <p>
              <strong>Validation:</strong> Measure recall@K on held-out queries
              before deployment. If recall is below target (typically 95%), tune
              index parameters and rebuild.
            </p>
            <p>
              <strong>Deployment:</strong> Load index into serving
              infrastructure. Warm caches with common queries. Route traffic
              gradually from old to new index.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              KEY TRADEOFFS
            </p>
            <p>
              <strong>Build time vs query quality:</strong> Spending more time
              on index training (higher efConstruction for HNSW, more IVF
              centroids) improves recall but delays deployment.
            </p>
            <p>
              <strong>Update frequency vs freshness:</strong> More frequent
              updates keep content fresh but require more compute and introduce
              stability risks.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Key Insight:</strong> Index management is an ongoing
              operation, not a one-time build. Budget for continuous reindexing,
              version management, and monitoring.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; gap: 16px; justify-content: center">
                <div style="flex: 1; border: 2px solid; padding: 16px; border-radius: 6px">
                  <div style="font-weight: bold; font-size: 15px; margin-bottom: 12px; text-align: center">
                    Inverted Index
                  </div>
                  <div style="font-size: 13px; line-height: 1.6">
                    <div style="margin-bottom: 6px">
                      <strong>"laptop"</strong> → [123, 456]
                    </div>
                    <div style="margin-bottom: 6px">
                      <strong>"phone"</strong> → [789, 101]
                    </div>
                    <div style="margin-bottom: 6px">
                      <strong>"blue"</strong> → [123, 789]
                    </div>
                    <div style="margin-top: 12px; padding-top: 10px; border-top: 2px solid; font-size: 12px">
                      Sparse retrieval
                      <br />
                      Term matching
                    </div>
                  </div>
                </div>
                <div style="flex: 1; border: 2px solid; padding: 16px; border-radius: 6px">
                  <div style="font-weight: bold; font-size: 15px; margin-bottom: 12px; text-align: center">
                    Vector Index
                  </div>
                  <div style="font-size: 13px; line-height: 1.6">
                    <div style="margin-bottom: 6px">
                      <strong>Item 123</strong>
                      <br />
                      [0.8, 0.2, ..., 0.5]
                    </div>
                    <div style="margin-bottom: 6px">
                      <strong>Item 456</strong>
                      <br />
                      [0.7, 0.3, ..., 0.4]
                    </div>
                    <div style="margin-top: 12px; padding-top: 10px; border-top: 2px solid; font-size: 12px">
                      Semantic search
                      <br />
                      Nearest neighbors
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
                  Index lifecycle: initial build → validation → deployment →
                  ongoing updates
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  100M vector build: 2-8 hours depending on index type and
                  hardware
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Tradeoffs: build time vs quality; update frequency vs
                  freshness
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
                  Interview Tip: Explain why static indexes fail—content
                  changes, embeddings drift, new items need indexing.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Describe the validation step—measure recall@K
                  on held-out queries before deployment.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonIndexManagementIndexFamiliesForMlSystemsInvertedVsVectorIndexes;
