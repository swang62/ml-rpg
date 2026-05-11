import type { Component } from "solid-js";

const LessonNamedEntityRecognitionProductionNerImplementationTrainingServingAndMonitoring: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Production NER Implementation: Training, Serving, and Monitoring
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 0; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Creating Quality Training Data
            </p>
            <p style="margin-top: 0">
              NER model quality depends heavily on training data quality.
              Annotation guidelines must be unambiguous: annotators need clear
              rules for what counts as each entity type, how to handle edge
              cases, and when to mark something as uncertain. Without clear
              guidelines, different annotators make different decisions, and the
              model learns inconsistent patterns.
            </p>
            <p>
              Measure inter-annotator agreement using Cohen's kappa. A score
              above 0.8 indicates annotators agree consistently. Below 0.7
              suggests your guidelines are ambiguous. When annotators disagree,
              have a senior annotator adjudicate, but also use the disagreement
              data to improve guidelines. If two competent annotators disagree
              on whether "Apple" is an organization or should be left
              unannotated in a specific context, that context is genuinely
              ambiguous and your guidelines need to address it.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Active Learning for Efficient Annotation
            </p>
            <p style="margin-top: 0">
              Annotating thousands of documents is expensive. Active learning
              reduces cost by selecting the most informative examples for
              annotation. The process: train an initial model on a small labeled
              set, use that model to find examples where it is most uncertain,
              annotate those uncertain examples, retrain, and repeat. This
              focuses annotation effort on the boundaries where the model
              struggles rather than examples it already handles well.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Key Insight:</strong> Active learning can achieve the
              same model quality with 30-50% less annotation compared to random
              sampling. The savings come from avoiding annotation of examples
              the model already classifies correctly with high confidence.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Scaling NER to Large Corpora
            </p>
            <p style="margin-top: 0">
              Processing billions of documents requires parallelization.
              Partition documents across workers, run NER independently on each
              partition, merge results. The process is embarrassingly parallel
              because documents are independent. The bottleneck shifts from
              compute to I/O: reading documents, writing extracted entities. Use
              batch processing frameworks that handle data shuffling
              efficiently.
            </p>
            <p>
              For very large scale, consider approximate methods: run expensive
              NER on a sample, use the results to train a smaller, faster model,
              deploy the fast model on the full corpus. You trade some accuracy
              for orders of magnitude speedup.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 540px">
              <div style="margin-bottom: 12px; font-weight: 700; font-size: 14px; text-align: center">
                Production NER Pipeline
              </div>
              <div style="display: flex; flex-direction: column; gap: 10px; align-items: center">
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; min-width: 200px; text-align: center; font-size: 13px">
                  <strong>Training Data</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    50k to 200k labeled
                    <br />
                    Cohen kappa &gt;0.8
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; min-width: 200px; text-align: center; font-size: 13px">
                  <strong>Transformer + CRF</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Distill &amp; quantize
                    <br />2 to 4x faster
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; min-width: 200px; text-align: center; font-size: 13px">
                  <strong>Entity Spans</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Person, Org, Location
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; min-width: 200px; text-align: center; font-size: 13px">
                  <strong>Linking &amp; Monitoring</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Map to KB IDs
                    <br />
                    Track F1 by type
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
                  Annotation guidelines must be unambiguous with clear edge case
                  rules; measure inter-annotator agreement with Cohen's kappa
                  (target 0.8+)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Active learning reduces annotation cost by 30-50% by focusing
                  on examples where the model is uncertain rather than random
                  sampling
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Large-scale NER is embarrassingly parallel - partition
                  documents across workers, run independently, merge results
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  For billion-document scale, train a fast model on expensive
                  NER results from a sample, trading accuracy for orders of
                  magnitude speedup
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
                  Mention Cohen's kappa as your annotation quality metric.
                  Explain that below 0.7 indicates ambiguous guidelines needing
                  revision.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Describe active learning as a cost-saving technique: find
                  uncertain examples, annotate those, retrain. Quantify the
                  30-50% savings.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  For scale questions, explain the partition-process-merge
                  pattern and identify I/O as the bottleneck, not compute.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonNamedEntityRecognitionProductionNerImplementationTrainingServingAndMonitoring;
