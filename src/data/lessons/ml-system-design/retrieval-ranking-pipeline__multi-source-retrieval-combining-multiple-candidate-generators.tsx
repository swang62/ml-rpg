import type { Component } from "solid-js";

const LessonRetrievalRankingPipelineMultiSourceRetrievalCombiningMultipleCandidateGenerators: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Multi Source Retrieval: Combining Multiple Candidate Generators
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              MULTI SOURCE RETRIEVAL
            </p>
            <p style="margin-top: 0">
              Production systems run multiple retrievers in parallel and merge
              results. A typical setup includes: embedding retriever (items
              similar to user vector), collaborative filtering retriever (items
              liked by similar users), content retriever (matching user
              interests to item attributes), and trending retriever (currently
              popular items). Each returns 500 to 2,000 candidates, yielding
              3,000 to 5,000 unique items after deduplication.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              EMBEDDING RETRIEVAL MECHANICS
            </p>
            <p style="margin-top: 0">
              The system maintains vectors for users and items, typically 64 to
              256 dimensions. Finding candidates means computing similarity
              between user vector and all item vectors. Approximate Nearest
              Neighbor algorithms (HNSW, FAISS) build graph structures that find
              top 1,000 items in 5 to 20ms, sacrificing about 5% recall versus
              exact search.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              CANDIDATE MERGING
            </p>
            <p style="margin-top: 0">
              After retrievers return candidates, merge them for ranking.
              Simple: take the union. Smarter: weighted combination like{" "}
              <code style="padding: 2px 6px; border-radius: 3px; font-family: monospace">
                0.4 × embedding + 0.3 × cf + 0.2 × content + 0.1 × trending
              </code>
              . Some systems enforce diversity quotas, ensuring 100+ candidates
              from each retriever reach ranking.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Trade-off:</strong> More retrievers increase recall but
              add 10 to 30ms latency each. Most systems use 3 to 5 retrievers.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              PRE-RANKING FILTERING
            </p>
            <p style="margin-top: 0">
              Before ranking, hard filters remove ineligible items: already
              interacted, wrong region, out of stock, age restricted, below
              quality threshold. Filtering removes 10 to 30% of candidates,
              saving ranking compute.
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
                  Production systems use 3-5 parallel retrievers: embedding,
                  collaborative filtering, content, trending
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  ANN algorithms (HNSW, FAISS) find top 1,000 similar items in
                  5-20ms with ~95% recall
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Candidate merging uses weighted scores or diversity quotas to
                  balance retriever contributions
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Hard filters remove 10-30% of candidates before ranking
                  (already seen, out of stock, wrong region)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Each additional retriever adds 10-30ms latency - balance
                  coverage against response time
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
                  Describe a concrete multi-retriever setup: embedding (2000
                  items) + CF (1000) + content (500) + trending (200) = 3700
                  candidates
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Explain why ANN is necessary: exact search over 100M items
                  takes seconds, ANN takes milliseconds
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mention filtering as a latency optimization - ranking 3000
                  items vs 4000 items saves 20-30% compute
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonRetrievalRankingPipelineMultiSourceRetrievalCombiningMultipleCandidateGenerators;
