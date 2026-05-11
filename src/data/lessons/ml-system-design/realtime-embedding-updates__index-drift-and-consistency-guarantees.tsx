import type { Component } from "solid-js";

const LessonRealtimeEmbeddingUpdatesIndexDriftAndConsistencyGuarantees: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Index Drift and Consistency Guarantees
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              INDEX DRIFT EXPLAINED
            </p>
            <p>
              Index drift occurs when the index structure becomes misaligned
              with the underlying data. In IVF indexes, this happens when
              cluster centroids no longer represent the actual data
              distribution. New vectors cluster differently than the training
              data, so routing queries to centroids misses relevant results.
            </p>
            <p>
              Measuring drift: sample queries, compare index results against
              brute-force exact search. Recall@100 dropping from 95% to 88% over
              two weeks indicates significant drift. At 85% recall, visible
              quality degradation occurs in user-facing search.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              CONSISTENCY CHALLENGES
            </p>
            <p>
              <strong>Write-search consistency:</strong> After a vector is added
              to the hot index, can a query immediately find it? With async
              writes, there is a brief window (milliseconds to seconds) where
              the vector exists but is not searchable.
            </p>
            <p>
              <strong>Cross-index consistency:</strong> During hot-to-main
              merges, the same vector might briefly appear in both indexes or
              neither. Queries during merge might return duplicates or miss
              items.
            </p>
            <p>
              <strong>Delete consistency:</strong> Deleting an item requires
              removing it from both hot and main indexes. If delete propagates
              to hot but not main (or vice versa), deleted items may still
              appear in results.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              HANDLING CONSISTENCY
            </p>
            <p>
              <strong>Idempotent operations:</strong> Design inserts and deletes
              to be safely repeatable. If a merge fails mid-way, retry should
              produce correct results.
            </p>
            <p>
              <strong>Version tracking:</strong> Assign monotonic versions to
              vectors. During query, filter results to exclude outdated
              versions. This handles duplicates during merges.
            </p>
            <p>
              <strong>Tombstone records:</strong> Mark deletions rather than
              physically removing. Clear tombstones during compaction. Ensures
              deletes propagate correctly across index tiers.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Key Trade-off:</strong> Strong consistency (immediate
              visibility after write) requires synchronous index updates, which
              limits throughput. Eventual consistency (sub-second delays)
              enables async batching for higher throughput.
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
                  Index drift: centroids misalign with data over time; recall
                  drops from 95% to 88% over weeks indicates significant drift
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Consistency challenges: write-search visibility, cross-index
                  duplicates during merges, delete propagation
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Solutions: idempotent operations, version tracking for
                  deduplication, tombstone records for deletes
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
                  Interview Tip: Explain how to measure drift—sample queries
                  comparing index results to brute-force exact search.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Discuss the consistency tradeoff—strong
                  consistency limits throughput; eventual consistency enables
                  async batching.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonRealtimeEmbeddingUpdatesIndexDriftAndConsistencyGuarantees;
