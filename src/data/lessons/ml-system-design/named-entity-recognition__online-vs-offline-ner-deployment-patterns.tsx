import type { Component } from "solid-js";

const LessonNamedEntityRecognitionOnlineVsOfflineNerDeploymentPatterns: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Online vs Offline NER Deployment Patterns
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 0; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Online NER for Real-Time Systems
            </p>
            <p style="margin-top: 0">
              In online NER, extraction happens at request time. A user types a
              search query, the NER model processes it in 10-50ms, extracts
              entities, and those entities inform what happens next. Maybe the
              extracted location filters search results. Maybe the extracted
              product name routes to a specific catalog. The key constraint is
              latency: users cannot wait seconds for entity extraction.
            </p>
            <p>
              This latency requirement shapes architectural choices. You need
              models small enough to run fast but accurate enough to be useful.
              You typically cannot use the largest, most accurate models because
              their inference time exceeds acceptable response latency. A model
              with 95% accuracy that takes 500ms is worse than one with 88%
              accuracy that takes 20ms if your latency budget is 100ms
              end-to-end.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Batch NER for Offline Processing
            </p>
            <p style="margin-top: 0">
              Batch NER processes documents when speed does not matter. You
              ingest a corpus of 10 million documents overnight, run NER on all
              of them, store the extracted entities in a database, and serve
              queries against the pre-extracted data. The extraction latency can
              be minutes per document because users never wait for it.
            </p>
            <p>
              This latency flexibility enables different choices. You can use
              ensemble models that combine multiple NER systems and vote on
              results. You can run expensive post-processing to improve entity
              resolution. You can use the largest, most accurate models
              available because cost per document matters more than speed per
              document.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Key Trade-off:</strong> Online NER requires smaller,
              faster models (10-50ms latency) with lower accuracy. Batch NER can
              use larger, slower models with higher accuracy. The choice depends
              on whether users wait for extraction or query pre-extracted data.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Hybrid Architectures
            </p>
            <p style="margin-top: 0">
              Many systems combine both approaches. Pre-extract entities from
              your document corpus using batch NER with high-accuracy models.
              When a user query arrives, run fast online NER on just the query
              text. Match query entities against the pre-extracted document
              entities. This way, you get high accuracy on the large corpus
              (batch) and acceptable latency on the short query (online).
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 560px">
              <div style="display: flex; gap: 20px; justify-content: space-between">
                <div style="flex: 1; display: flex; flex-direction: column; gap: 10px">
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                    <strong style="font-size: 14px">Offline Batch</strong>
                  </div>
                  <div style="border: 2px solid; padding: 8px; border-radius: 6px; font-size: 12px">
                    <strong>Goal:</strong> Throughput
                    <br />
                    <strong>Latency:</strong> Hours/days
                    <br />
                    <strong>Batch:</strong> 64 to 256
                    <br />
                    <strong>Scale:</strong> 200 GPUs
                    <br />
                    <strong>Rate:</strong> 10M tok/sec
                  </div>
                </div>
                <div style="flex: 1; display: flex; flex-direction: column; gap: 10px">
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                    <strong style="font-size: 14px">Online Real Time</strong>
                  </div>
                  <div style="border: 2px solid; padding: 8px; border-radius: 6px; font-size: 12px">
                    <strong>Goal:</strong> Latency
                    <br />
                    <strong>p95:</strong> 2 to 10ms
                    <br />
                    <strong>Batch:</strong> 1 (dynamic 8)
                    <br />
                    <strong>Cache:</strong> &gt;80% hits
                    <br />
                    <strong>Rate:</strong> 100s to 1000s QPS
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
                  Online NER extracts entities at request time in 10-50ms,
                  requiring smaller models that sacrifice accuracy for speed
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Batch NER processes documents offline where latency does not
                  matter, enabling ensemble models and expensive post-processing
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  A 95% accurate model at 500ms is worse than 88% at 20ms if
                  your latency budget is 100ms end-to-end
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Hybrid architectures batch-process the corpus with
                  high-accuracy models and online-process queries with fast
                  models
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
                  Frame online vs batch as a latency trade-off. Ask about the
                  use case: do users wait for extraction, or query pre-extracted
                  data?
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mention specific numbers - 10-50ms for online NER, minutes per
                  document acceptable for batch. This shows you understand
                  production constraints.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Describe the hybrid pattern: batch NER on documents, online
                  NER on queries, match entities between them.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonNamedEntityRecognitionOnlineVsOfflineNerDeploymentPatterns;
