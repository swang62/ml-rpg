import type { Component } from "solid-js";

const LessonApproximateNearestNeighborsAnnFailureModesDataDriftImbalancedPartitionsAndHardwareEffects: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            ANN Failure Modes: Data Drift, Imbalanced Partitions, and Hardware
            Effects
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              DATA DRIFT DEGRADES RECALL
            </p>
            <p>
              ANN indexes encode assumptions about data distribution. IVF
              centroids, PQ codebooks, and HNSW graph structure are optimized
              for the training data. When embedding distributions shift—seasonal
              trends, new content types, model updates—the index no longer
              aligns with the data.
            </p>
            <p>
              Symptoms: recall drops 5-15 percentage points over weeks or
              months. Queries return unexpected results. Latency increases as
              search explores more partitions to maintain recall targets.
            </p>
            <p>
              Detection: sample 0.1% of queries and compare ANN results to exact
              search on a 1-million vector subset. If recall@10 drops below
              threshold (e.g., 0.90), trigger reindex. Monitor weekly.
            </p>
            <p>
              Mitigation: rebuild indexes periodically (monthly to quarterly).
              For streaming data, use incremental index updates or maintain
              rolling window indexes.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              IMBALANCED PARTITIONS
            </p>
            <p>
              IVF works well when clusters are roughly equal-sized. In practice,
              data often clusters unevenly—popular categories have 10x more
              vectors than niche ones. Imbalanced partitions hurt both recall
              and latency.
            </p>
            <p>
              If one partition contains 50% of vectors but nprobe is set
              assuming uniform distribution, searches hitting that partition are
              25x slower. Alternatively, if you probe the same number of cells
              regardless of size, recall in dense partitions drops.
            </p>
            <p>
              Fixes: use more fine-grained partitioning in dense regions. Train
              hierarchical IVF with different granularity per region. Or switch
              to HNSW which handles non-uniform distributions better.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              HARDWARE AND DEPLOYMENT EFFECTS
            </p>
            <p>
              <strong>Memory bandwidth bottleneck:</strong> Scanning compressed
              vectors is CPU-bound on memory bandwidth, not compute.
              Hyperthreading helps little. NUMA effects cause 2x latency
              variance across cores.
            </p>
            <p>
              <strong>Cold cache penalty:</strong> First query after service
              restart hits cold CPU caches. Latency can be 5-10x higher until
              cache warms. Pre-warm with representative queries at startup.
            </p>
            <p>
              <strong>Batch size effects:</strong> Single queries underutilize
              SIMD. Batching 8-16 queries together can improve throughput 3-5x
              with minimal latency increase per query.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              EDGE CASES IN PRODUCTION
            </p>
            <p>
              <strong>Empty results:</strong> If nprobe is too low or all nearby
              partitions are empty, search returns nothing. Always return at
              least K results even if distances are high.
            </p>
            <p>
              <strong>Distance threshold failures:</strong> Some systems filter
              by max distance. Threshold tuned on old data may reject valid
              matches after embedding drift.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>❗ Critical:</strong> Monitor recall continuously in
              production. ANN failure is silent—queries return results, just
              wrong ones. Sample-and-compare is your only detection mechanism.
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
                  Data drift degrades recall 5-15 points over time; rebuild
                  indexes monthly to quarterly
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Imbalanced partitions cause latency variance and recall drops
                  in dense regions
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Hardware effects: memory bandwidth limits throughput, NUMA
                  causes latency variance
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  ANN failure is silent—queries return results, just wrong ones.
                  Monitor via sampling.
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
                  Interview Tip: Describe recall monitoring—sample 0.1% of
                  queries, compare to exact search, alert if recall drops below
                  threshold.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Explain why imbalanced partitions are
                  problematic and how to detect them in production.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonApproximateNearestNeighborsAnnFailureModesDataDriftImbalancedPartitionsAndHardwareEffects;
