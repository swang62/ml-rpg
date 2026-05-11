import type { Component } from "solid-js";

const LessonRecsysScalabilityProductionFailureModesAndOperationalChallenges: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Production Failure Modes and Operational Challenges
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              INDEX STALENESS
            </p>
            <p style="margin-top: 0">
              Indexes built on old data miss new vectors. If you rebuild weekly
              but add 1M items daily, 7M items are invisible to search.
              Solutions: incremental updates (HNSW supports adding vectors),
              partial rebuilds (update clusters containing new items), or hybrid
              search (exact search on recent items, ANN on older items). Balance
              rebuild frequency against infrastructure cost.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              DISTRIBUTION SHIFT
            </p>
            <p style="margin-top: 0">
              ANN indexes optimize for the training data distribution. If new
              vectors come from a different distribution (new product category,
              different language), recall drops significantly. Monitor recall on
              recent queries. If recall for new items is 10% lower than
              established items, the index needs retraining. Include diverse
              samples in index training to handle distribution changes.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Warning:</strong> PQ codebooks learned on old data may
              poorly compress new distributions. Relearn codebooks periodically,
              especially after major catalog changes.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              MEMORY FRAGMENTATION
            </p>
            <p style="margin-top: 0">
              Long running ANN services accumulate memory fragmentation. HNSW
              graphs grow with additions; deletions leave holes. After months of
              updates, memory usage may be 2x what you expect. Schedule periodic
              full rebuilds or use memory efficient allocators. Monitor actual
              versus expected memory consumption.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              HOT SPOTS
            </p>
            <p style="margin-top: 0">
              Some queries hit popular regions of the index repeatedly while
              others touch rarely accessed regions. This creates uneven load:
              some servers are overloaded while others idle. Replicate hot
              regions across more servers. Monitor query latency distribution:
              if p99 is 10x median, you likely have hot spots.
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
                  Index staleness: weekly rebuild + 1M daily items = 7M
                  invisible items; use incremental updates
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Distribution shift: new categories may have 10% lower recall;
                  monitor and retrain periodically
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  PQ codebooks degrade on new distributions; relearn after major
                  catalog changes
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Memory fragmentation: after months of updates, memory may be
                  2x expected; schedule rebuilds
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Hot spots: p99 latency 10x median indicates uneven load;
                  replicate hot regions
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
                  Describe hybrid search: exact search on items added in last
                  hour, ANN on older items
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Explain distribution monitoring: track recall for items &lt; 7
                  days old vs older items
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Discuss memory: HNSW starts at 51 GB, grows to 100 GB after 6
                  months of updates
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonRecsysScalabilityProductionFailureModesAndOperationalChallenges;
