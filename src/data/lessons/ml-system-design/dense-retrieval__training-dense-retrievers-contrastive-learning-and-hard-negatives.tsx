import type { Component } from "solid-js";

const LessonDenseRetrievalTrainingDenseRetrieversContrastiveLearningAndHardNegatives: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Training Dense Retrievers: Contrastive Learning and Hard Negatives
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="padding: 14px 16px; border: 2px solid; border-left: 4px solid; border-radius: 6px; margin: 0">
              <div style="font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px">
                Core Concept
              </div>
              <div style="font-size: 15px; line-height: 1.5">
                <strong>Contrastive learning</strong> trains the encoder to push
                relevant query-document pairs close together in vector space
                while pushing irrelevant pairs apart. The loss function
                penalizes when negatives are closer to the query than positives.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Training Data Structure
            </p>
            <p style="margin-top: 0">
              Each training example: (query, positive document, negative
              documents). Positives come from click logs, relevance judgments,
              or QA pairs. Negatives matter most for quality.{" "}
              <strong>Random negatives:</strong> Easy to distinguish, model
              learns little. <strong>Hard negatives:</strong> Documents that
              seem relevant but are not (high BM25 score but wrong answer).
              Mining hard negatives from the model"s own errors during training
              dramatically improves accuracy (10-20% gains).
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              In-Batch Negatives
            </p>
            <p style="margin-top: 0">
              Efficient negative sampling: treat other positives in the same
              batch as negatives. With batch size 128, each query gets 127
              negatives for free. This works because random documents are
              unlikely to be relevant. Combine with a few mined hard negatives
              (1-3 per query) for best results. Larger batches improve training
              but require more GPU memory.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Two-Tower Architecture
            </p>
            <p style="margin-top: 0">
              Query and document encoders can share weights (siamese) or be
              separate (asymmetric). Shared weights: simpler, regularizes
              better, works well for similar-length inputs. Separate weights:
              query encoder handles short text, document encoder handles long
              text, each optimized for its task. Document embeddings are
              computed offline; only query encoding happens at search time
              (10-50ms latency).
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
                  Contrastive learning pushes positives close, negatives apart;
                  quality depends on negative selection
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Hard negatives (high BM25 but wrong) improve accuracy 10-20%
                  over random negatives
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  In-batch negatives: batch size 128 gives 127 free negatives;
                  combine with 1-3 hard negatives
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Two-tower: query and doc encoders can share weights (siamese)
                  or be separate (asymmetric)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Document embeddings precomputed offline; only query encoding
                  at search time (10-50ms)
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
                  Explain hard negatives concept with BM25 example - shows
                  understanding of what makes training effective
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Describe in-batch negatives technique for efficient training
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mention two-tower architecture options (siamese vs asymmetric)
                  with trade-offs
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonDenseRetrievalTrainingDenseRetrieversContrastiveLearningAndHardNegatives;
