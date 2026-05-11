import type { Component } from "solid-js";

const LessonSearchPersonalizationEmbeddingBasedSimilarityFeaturesEmbclicksimAndEmbskipsim: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Embedding Based Similarity Features: EmbClickSim and EmbSkipSim
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
                <strong>Embedding similarity features</strong> measure how
                similar a candidate item is to items the user has interacted
                with. Embeddings are numerical vectors (lists of numbers like
                [0.2, -0.5, 0.8...]) that capture item meaning. Similar items
                have similar vectors. Comparing vectors tells you if items are
                related.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              EmbClickSim: Similarity to Clicked Items
            </p>
            <p style="margin-top: 0">
              For each candidate item, compute similarity between its vector and
              vectors of items the user clicked. Similarity is measured by
              cosine: how much the vectors point in the same direction (1.0 =
              identical direction, 0 = unrelated). Formula:{" "}
              <code style="padding: 2px 6px; border-radius: 3px; font-family: monospace">
                EmbClickSim = max(similarity to each clicked item)
              </code>
              . High EmbClickSim means candidate resembles liked items. User
              clicked hiking boots → trail shoes, hiking poles score high.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              EmbSkipSim: Similarity to Skipped Items
            </p>
            <p style="margin-top: 0">
              Skipped items (shown but not clicked) indicate negative
              preference. EmbSkipSim measures similarity to avoided items. High
              EmbSkipSim is negative: candidate resembles things user rejected.
              If user saw sandals and didn't click, similar sandals should score
              lower. Helps avoid showing more of what user already passed over.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Combining the Signals
            </p>
            <p style="margin-top: 0">
              The ranker combines both:{" "}
              <code style="padding: 2px 6px; border-radius: 3px; font-family: monospace">
                boost = w1 × EmbClickSim - w2 × EmbSkipSim
              </code>
              . Typical weights: w1 = 0.6-0.8 (clicks are strong positive), w2 =
              0.2-0.4 (skips are weaker negative since users skip for many
              reasons). Items similar to clicks but dissimilar from skips get
              strongest boost.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Implementation
            </p>
            <p style="margin-top: 0">
              Optimization: instead of comparing against each click, use session
              embedding (average of click vectors). One comparison instead of N.
              For skips, sample last 10 rather than all. Pre-compute item
              vectors offline; real-time only does vector lookups and similarity
              math.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Candidate Listing Embedding
                  </strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    32D vector from 800M click sessions
                  </div>
                </div>
                <div style="display: flex; gap: 10px; align-items: center">
                  <div style="flex: 1; border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                    <strong style="font-size: 12px">User Click Centroid</strong>
                    <div style="font-size: 11px; margin-top: 4px">
                      Avg of last 5 to 10 clicks
                      <br />
                      Dot Product → <strong>EmbClickSim</strong>
                      <br />
                      High score = similar to recent clicks
                    </div>
                  </div>
                  <div style="flex: 1; border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                    <strong style="font-size: 12px">User Skip Centroid</strong>
                    <div style="font-size: 11px; margin-top: 4px">
                      Avg of skipped items
                      <br />
                      Dot Product → <strong>EmbSkipSim</strong>
                      <br />
                      High score = similar to rejected items
                    </div>
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">Ranker Input Features</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    EmbClickSim (boost), EmbSkipSim (downweight)
                    <br />
                    Computed in &lt;1ms for 1,000 candidates
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
                  EmbClickSim: similarity between candidate and clicked items;
                  high value = candidate resembles liked items
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  EmbSkipSim: similarity to skipped items; high value =
                  candidate resembles rejected items (negative signal)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Combined formula: personalization_boost = w1 × EmbClickSim -
                  w2 × EmbSkipSim with typical weights 0.6-0.8 and 0.2-0.4
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Optimization: use session embedding (average of clicks)
                  instead of comparing against each click individually
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Pre-compute item embeddings offline; real-time only does
                  vector lookups and dot products
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
                  Define both features: EmbClickSim = similarity to clicked
                  items (positive), EmbSkipSim = similarity to skipped items
                  (negative)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Give the combination formula with typical weights: w1 around
                  0.6-0.8, w2 around 0.2-0.4
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mention the optimization: session embedding (average) vs
                  comparing against each click individually
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonSearchPersonalizationEmbeddingBasedSimilarityFeaturesEmbclicksimAndEmbskipsim;
