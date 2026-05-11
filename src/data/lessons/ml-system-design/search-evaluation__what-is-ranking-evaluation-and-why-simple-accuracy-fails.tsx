import type { Component } from "solid-js";

const LessonSearchEvaluationWhatIsRankingEvaluationAndWhySimpleAccuracyFails: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            What is Ranking Evaluation and Why Simple Accuracy Fails
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
                <strong>Ranking evaluation</strong> measures how well a system
                orders items by relevance. Unlike classification (right or
                wrong), ranking cares about <em>order</em>: putting the best
                item first matters more than putting it tenth.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Why Simple Accuracy Fails for Ranking
            </p>
            <p style="margin-top: 0">
              Classification accuracy counts correct predictions: 95% accurate
              means 95 of 100 predictions were right. But ranking has a
              different goal. Consider a search for "python tutorial". If your
              top 10 results contain 8 relevant items, that sounds good. But if
              those 8 are at positions 3-10 and positions 1-2 are irrelevant,
              users see garbage first and leave. Accuracy says 80%, but user
              experience says failure. Ranking metrics must weight position:
              errors at the top hurt more than errors at the bottom.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Offline vs Online Evaluation
            </p>
            <p style="margin-top: 0">
              <strong>Offline evaluation</strong> uses historical data with
              known relevance labels. You rank items, compare against labels,
              compute a score. Fast (seconds), cheap (no live traffic),
              reproducible (same data gives same result). Run hundreds of
              experiments per day. The catch: labels may be stale or biased by
              how previous systems collected them.
            </p>
            <p>
              <strong>Online evaluation</strong> measures real user behavior:
              clicks, time spent, conversions. Slow (needs traffic), expensive
              (affects real users), noisy (user behavior varies). But it
              captures what actually matters: user satisfaction. The gap between
              offline and online is often 10-30%: a model that wins offline may
              lose online.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Four Metrics You Need to Know
            </p>
            <p style="margin-top: 0">
              <strong>NDCG</strong> (Normalized Discounted Cumulative Gain):
              measures graded relevance with position discounting. Best item at
              position 1 scores much higher than at position 10.{" "}
              <strong>MRR</strong> (Mean Reciprocal Rank): measures where the
              first relevant result appears. Good when users want one answer.{" "}
              <strong>CTR</strong> (Click Through Rate): percentage of
              impressions that get clicked. <strong>Dwell Time</strong>: how
              long users spend after clicking. High CTR with low dwell suggests
              clickbait; high dwell suggests satisfaction.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 14px">
                <div style="border: 2px solid; padding: 14px; border-radius: 6px">
                  <strong style="font-size: 15px">NDCG@5 Example</strong>
                  <div style="margin-top: 8px; font-size: 13px; line-height: 1.6">
                    Rank 1: rel=3, gain=3/log2(2)=3.0
                    <br />
                    Rank 2: rel=2, gain=2/log2(3)=1.26
                    <br />
                    Rank 3: rel=0, gain=0/log2(4)=0
                    <br />
                    Rank 4: rel=1, gain=1/log2(5)=0.43
                    <br />
                    Rank 5: rel=2, gain=2/log2(6)=0.77
                    <br />
                    <strong>DCG = 5.46, Ideal DCG = 6.86, NDCG = 0.80</strong>
                  </div>
                </div>
                <div style="border: 2px solid; padding: 14px; border-radius: 6px">
                  <strong style="font-size: 15px">MRR Example</strong>
                  <div style="margin-top: 8px; font-size: 13px; line-height: 1.6">
                    Query A: First relevant at rank 1 → 1/1 = 1.0
                    <br />
                    Query B: First relevant at rank 3 → 1/3 = 0.33
                    <br />
                    Query C: First relevant at rank 2 → 1/2 = 0.5
                    <br />
                    <strong>MRR = (1.0 + 0.33 + 0.5) / 3 = 0.61</strong>
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
                  Ranking evaluation measures order quality, not just
                  correctness. Position 1 errors matter more than position 10
                  errors.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Simple accuracy fails because it ignores position: 80%
                  relevant items means nothing if positions 1-2 are irrelevant.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Offline evaluation is fast and cheap but may not reflect real
                  user behavior. Online evaluation is slow and expensive but
                  measures what matters.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  The offline/online gap is often 10-30%: models winning offline
                  may lose online.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Four key metrics: NDCG (graded relevance with position), MRR
                  (first correct result), CTR (clicks), Dwell Time (engagement
                  depth).
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
                  Explain why accuracy fails with a concrete example: 8 of 10
                  relevant items sounds good until you realize positions 1-2 are
                  irrelevant.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Distinguish offline (fast, cheap, reproducible, potentially
                  stale) from online (slow, expensive, noisy, reflects reality).
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mention the 10-30% offline/online gap to show awareness of
                  real-world evaluation challenges.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonSearchEvaluationWhatIsRankingEvaluationAndWhySimpleAccuracyFails;
