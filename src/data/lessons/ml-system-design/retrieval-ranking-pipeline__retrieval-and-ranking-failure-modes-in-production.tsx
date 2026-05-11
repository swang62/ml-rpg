import type { Component } from "solid-js";

const LessonRetrievalRankingPipelineRetrievalAndRankingFailureModesInProduction: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Retrieval and Ranking Failure Modes in Production
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              RETRIEVAL BLIND SPOTS
            </p>
            <p style="margin-top: 0">
              The most dangerous failure: retrieval systematically misses good
              items. If the embedding model was trained on genre co occurrence,
              it might place jazz and classical far apart, so jazz fans never
              see classical recommendations. Detect by sampling users, running
              exhaustive scoring offline, comparing to retrieval candidates. If
              exhaustive scoring finds items retrieval missed that the ranker
              would rank highly, you have a blind spot.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              STAGE MISALIGNMENT
            </p>
            <p style="margin-top: 0">
              When stages disagree about quality, the cascade amplifies errors.
              If L1 uses popularity but L3 optimizes personalization, L1 filters
              niche items L3 would rank highly. Measure correlation between
              stage scores for surviving items. Below 0.6 indicates
              misalignment. Fix by distilling L3 knowledge into L1.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Warning:</strong> Position bias in training data causes
              models to learn that position 1 is better, even for random
              placements. Debias with inverse propensity scoring or train with
              position as explicit feature.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              COLD START
            </p>
            <p style="margin-top: 0">
              New items have no history, so embedding retrieval cannot find
              them. New users have no profile, so ranking falls back to
              popularity. For new items: use content based retrieval. For new
              users: use onboarding signals or trending content. Cold start
              windows: 7 to 14 days for items, 3 to 7 days for users before
              embeddings become reliable.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              LATENCY SPIKES
            </p>
            <p style="margin-top: 0">
              P99 latency often exceeds median by 5 to 10 times due to GC pauses
              or unbalanced candidates. When one retriever returns 10,000
              instead of 1,000 candidates, ranking spikes. Protect with 50ms
              stage timeouts, 5,000 candidate caps, circuit breakers for slow
              retrievers.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">Index Staleness</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Daily rebuild → 12 hour lag → trending content invisible
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">Tail Latency Blowup</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    p50: 40ms, p99: 300ms → SLO violation (100ms target)
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">Generator Imbalance</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Trending pool: 80% of candidates → personalization crowded
                    out
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">Feedback Loop</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Popular ranked high → more clicks → more popular → filter
                    bubble
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
                  Retrieval blind spots occur when embeddings miss relevant
                  similarity - detect by exhaustive offline scoring
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Stage misalignment: L1 uses popularity, L3 uses
                  personalization - correlation below 0.6 indicates problems
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Position bias in training data teaches models that position 1
                  is better - debias with inverse propensity scoring
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Cold start windows: 7-14 days for items, 3-7 days for users
                  before embeddings become reliable
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Protect against latency spikes with 50ms stage timeouts,
                  candidate caps at 5000, and circuit breakers
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
                  Describe a blind spot scenario: jazz fans never see classical
                  because embedding model misses cross-genre similarity
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Explain position bias: item shown in slot 1 gets 10x clicks
                  regardless of relevance, model learns wrong signal
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Discuss cold start mitigation: content-based retrieval for new
                  items, onboarding preferences for new users
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonRetrievalRankingPipelineRetrievalAndRankingFailureModesInProduction;
