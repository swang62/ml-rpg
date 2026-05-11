import type { Component } from "solid-js";

const LessonEmbeddingQualityEvaluationHubnessAndAnisotropyFailureModes: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Hubness and Anisotropy Failure Modes
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            Hubness occurs when a few vectors become universal nearest neighbors
            in high dimensional space, appearing in the top K results for many
            unrelated queries. In a healthy embedding space, each vector might
            be the nearest neighbor for 10 to 50 queries on average. With
            hubness, a handful of vectors appear as nearest neighbors for
            thousands of queries, inflating nearest neighbor overlap across
            semantically distinct queries and degrading diversity. A user
            searching for apple keyboard layout and apple pie recipe should not
            see the same top 10 documents. Anisotropy describes the non uniform
            distribution of embeddings across the vector space. Ideally,
            embeddings spread uniformly in all directions. Anisotropic
            embeddings collapse into a narrow cone, causing high cosine
            similarity even for unrelated items. You might observe that 90% of
            pairwise cosine similarities fall between 0.7 and 0.9, making it
            impossible to distinguish relevant from irrelevant candidates. This
            kills ranking quality because small noise dominates the signal.
            Detection uses the distribution of k occurrence counts (how many
            times each vector appears in top K across a query sample) and cosine
            similarity histograms. In a healthy 100 million document corpus
            sampled with 10,000 queries, the k occurrence distribution should be
            roughly exponential with most documents appearing zero or a few
            times. Hubness shows a long tail with some documents appearing 500
            to 2,000 times. For anisotropy, plot the histogram of pairwise
            cosine similarities between random document pairs. A healthy
            distribution spreads from 0.1 to 0.9 with mean around 0.3 to 0.5. An
            anisotropic distribution clusters tightly around 0.7 to 0.8 with
            narrow variance. Mitigation strategies include centering embeddings
            by subtracting the mean vector, normalizing to unit length, adding
            contrastive or triplet loss terms that encourage uniform spread, and
            temperature scaling during training. Google and Meta apply post
            processing normalization and centering before indexing, which
            empirically reduces hubness by 40 to 60% measured by k occurrence
            skew. Some teams add an isotropy regularization term to the training
            loss, penalizing embeddings with low average cosine distance.
            Pinterest reports that adding hard negative mining (selecting
            negatives that are close in embedding space but semantically
            different) reduces anisotropy and improves Recall at 100 by 3 to 5
            points.<p></p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 540px">
              <div style="display: flex; flex-direction: column; gap: 14px">
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px">
                  <strong style="font-size: 14px">
                    Healthy Embedding Space
                  </strong>
                  <div style="margin-top: 6px; font-size: 12px">
                    k-occurrence: Exponential decay, max 50
                    <br />
                    Cosine similarity: Mean 0.35, spread 0.1 to 0.9
                    <br />
                    Diversity: Distinct top K per query
                  </div>
                </div>
                <div style="text-align: center; font-size: 20px; font-weight: bold">
                  ⚠ Degradation
                </div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px">
                  <strong style="font-size: 14px">Hubness + Anisotropy</strong>
                  <div style="margin-top: 6px; font-size: 12px">
                    k-occurrence: Long tail, some docs 500 to 2000
                    <br />
                    Cosine similarity: Mean 0.75, narrow 0.7 to 0.85
                    <br />
                    Diversity: Same top K for unrelated queries
                  </div>
                </div>
                <div style="text-align: center; font-size: 18px; font-weight: bold">
                  ↓ Mitigation
                </div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px">
                  <strong style="font-size: 14px">
                    After Centering + Normalization
                  </strong>
                  <div style="margin-top: 6px; font-size: 12px">
                    k-occurrence: Reduced skew by 40 to 60%
                    <br />
                    Cosine similarity: Broader distribution
                    <br />
                    Recall@100: +3 to 5 points
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
                  Hubness causes a few vectors to appear in top K for thousands
                  of unrelated queries (500 to 2,000 times in 10k query sample)
                  vs healthy 10 to 50 occurrences, destroying diversity
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Anisotropy collapses embeddings into narrow cone with 90% of
                  pairwise cosine similarities between 0.7 and 0.9, making
                  relevant vs irrelevant distinction impossible
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Detection uses k occurrence distribution (should be
                  exponential decay) and cosine similarity histogram (healthy
                  mean 0.3 to 0.5 with broad spread, anisotropic mean 0.75
                  narrow)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mitigation includes centering (subtract mean vector),
                  normalization, contrastive loss for uniform spread, and hard
                  negative mining during training
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Google and Meta apply post processing normalization and
                  centering before indexing, reducing hubness by 40 to 60%
                  measured by k occurrence skew
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Pinterest reports hard negative mining (selecting close but
                  semantically different negatives) reduces anisotropy and
                  improves Recall@100 by 3 to 5 points
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
                  User queries apple keyboard layout and apple pie recipe both
                  return the same hub document about apple company in top 5,
                  revealing hubness failure
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Analysis of 100 million embeddings shows document ID 42735
                  appears as nearest neighbor in 1,847 out of 10,000 test
                  queries, while median is 8, indicating severe hubness
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Histogram of 10,000 random pairwise cosine similarities
                  clusters between 0.72 and 0.82 with mean 0.76, compared to
                  healthy 0.35 mean with 0.1 to 0.9 spread
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">4</span>
                <span class="flex-grow-1 Learn_cardContent">
                  After applying mean centering and L2 normalization, k
                  occurrence max drops from 1,847 to 312, and Recall@100
                  improves from 68 to 72 on product search task
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonEmbeddingQualityEvaluationHubnessAndAnisotropyFailureModes;
