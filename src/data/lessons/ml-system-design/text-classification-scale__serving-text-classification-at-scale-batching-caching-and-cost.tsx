import type { Component } from "solid-js";

const LessonTextClassificationScaleServingTextClassificationAtScaleBatchingCachingAndCost: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Serving Text Classification at Scale: Batching, Caching, and Cost
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 0; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Batching for Throughput
            </p>
            <p style="margin-top: 0">
              GPUs process single requests at the same cost as batches.
              Classifying 1 text takes 15ms on GPU. Classifying 32 texts takes
              18ms. That is 32x better throughput for 20% more latency. At
              10,000 requests per second, batching lets you serve with 10 GPUs
              instead of 320.
            </p>
            <p>
              <strong>Implementation:</strong> Collect incoming requests into a
              queue. Every 5ms (or when batch hits 32 items), process the batch
              together. Each original request waits for its result. Maximum
              added latency is 5ms; average added latency is 2.5ms.
            </p>
            <p>
              <strong>Trade-off:</strong> Batching adds tail latency. If your
              SLA is p99 under 20ms, a 5ms batching window might cause
              violations. For real-time applications, use smaller windows
              (1-2ms) with smaller batches (8-16).
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Caching Repeated Classifications
            </p>
            <p style="margin-top: 0">
              Users submit the same or similar texts repeatedly. Support tickets
              often contain common phrases. Product reviews cluster around
              similar complaints. Caching classification results can eliminate
              20-40% of compute.
            </p>
            <p>
              <strong>Exact match caching:</strong> Hash the normalized input
              text. Store label and confidence with 1-hour TTL. Hit rate: 15-25%
              for high-volume systems.
            </p>
            <p>
              <strong>Semantic caching:</strong> Store embeddings of previously
              classified texts. For new input, find nearest cached embedding. If
              similarity exceeds 0.95, return the cached label without running
              classification. Hit rate: 30-50% with proper similarity threshold.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Cost Optimization Strategies
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 GPU Cost Math:</strong> A100 GPU costs /hour. At 32
              requests per 20ms batch, that is 1.6M requests/hour. Cost:
              /bin/zsh.00000125 per request. With caching hitting 30%, effective
              cost drops to /bin/zsh.00000087.
            </div>
            <p>
              <strong>Model distillation:</strong> Train a smaller model
              (DistilBERT: 66M params) to mimic your large model (BERT: 110M
              params). 40% faster inference, 2-3% accuracy loss. For high-volume
              classification, this trade-off often makes sense.
            </p>
            <p>
              <strong>Quantization:</strong> Convert model weights from 32-bit
              floats to 8-bit integers. 4x smaller model, 2-3x faster inference
              on supported hardware. Accuracy loss typically under 1%.
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
                  GPU batching: 32 texts in 18ms vs 1 text in 15ms, 32x
                  throughput improvement
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Batching window adds tail latency: 5ms window = 2.5ms average
                  added latency
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Exact match caching: 15-25% hit rate; semantic caching: 30-50%
                  hit rate
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Model distillation: 40% faster inference for 2-3% accuracy
                  loss
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Quantization: 4x smaller model, 2-3x faster, under 1% accuracy
                  loss
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
                  Show the batching math: 1 text in 15ms, 32 texts in 18ms = 32x
                  throughput
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Explain semantic caching: store embeddings, return cached
                  label if similarity &gt; 0.95
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Compare distillation vs quantization trade-offs for your
                  accuracy budget
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonTextClassificationScaleServingTextClassificationAtScaleBatchingCachingAndCost;
