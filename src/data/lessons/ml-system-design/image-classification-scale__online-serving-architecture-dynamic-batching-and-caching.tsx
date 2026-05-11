import type { Component } from "solid-js";

const LessonImageClassificationScaleOnlineServingArchitectureDynamicBatchingAndCaching: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Online Serving Architecture: Dynamic Batching and Caching
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Online Serving Architecture
            </p>
            <p style="margin-top: 0">
              Serving a trained model at scale requires careful system design.
              The model itself is only part of the solution. Infrastructure for
              batching, caching, and load balancing determines whether you
              achieve target latency and throughput.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Dynamic Batching
            </p>
            <p style="margin-top: 0">
              GPUs excel at parallel computation. Processing one image takes
              5ms; processing 32 images takes 8ms. Without batching, you waste
              90%+ of GPU capacity on memory transfers and kernel launches.
            </p>
            <p>
              <strong>How it works:</strong> Requests queue until either a batch
              fills (e.g., 32 images) or a timeout expires (e.g., 10ms). Larger
              batches increase throughput but add latency. A 50ms batching
              window means the fastest possible response is 50ms.
            </p>
            <p>
              <strong>Adaptive batching:</strong> During traffic spikes, batches
              fill quickly and latency stays low. During low traffic, timeout
              triggers before batches fill, preventing requests from waiting
              forever.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Caching Strategies
            </p>
            <p style="margin-top: 0">
              <strong>Result caching:</strong> Store (image_hash,
              class_prediction) pairs. When the same image reappears, return the
              cached result without inference. Hit rates of 20-40% are typical
              for user upload scenarios.
            </p>
            <p>
              <strong>Embedding caching:</strong> Store intermediate embeddings
              from the model backbone. For similar images, retrieve nearby
              embeddings and compare distances. Useful for near-duplicate
              detection.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Load Balancing
            </p>
            <p style="margin-top: 0">
              Model servers sit behind a load balancer that distributes
              requests. Round-robin works for homogeneous servers. For mixed GPU
              types, use weighted distribution based on server throughput
              capacity. Health checks remove failing servers from rotation
              within seconds.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 600px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 14px">Request Arrives</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    20,000 QPS total load
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="display: flex; gap: 12px">
                  <div style="border: 2px solid; padding: 12px; border-radius: 6px; flex: 1; text-align: center">
                    <strong style="font-size: 13px">Cache Hit</strong>
                    <div style="font-size: 11px; margin-top: 4px">
                      90% of traffic
                    </div>
                    <div style="font-size: 11px">18,000 QPS</div>
                    <div style="font-size: 11px">~10 ms latency</div>
                  </div>
                  <div style="border: 2px solid; padding: 12px; border-radius: 6px; flex: 1; text-align: center">
                    <strong style="font-size: 13px">Cache Miss</strong>
                    <div style="font-size: 11px; margin-top: 4px">
                      10% of traffic
                    </div>
                    <div style="font-size: 11px">2,000 QPS</div>
                    <div style="font-size: 11px">→ GPU tier</div>
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 14px">Dynamic Batch Queue</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Wait up to 2 to 8 ms, batch 16 to 32
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 14px">GPU Inference</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    250 QPS per A100, 8 to 12 GPUs
                  </div>
                  <div style="font-size: 12px">p99 &lt; 100 ms end to end</div>
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
                  Dynamic batching improves GPU utilization from under 10% to
                  80%+ by processing multiple images together
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Batch size vs timeout trade-off: larger batches increase
                  throughput but add minimum latency equal to timeout
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Result caching achieves 20-40% hit rates for user uploads;
                  embedding caching enables near-duplicate detection
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Weighted load balancing accounts for heterogeneous GPU server
                  capacities
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
                  Interview Tip: Explain the batching latency trade-off with
                  numbers - 50ms timeout means 50ms minimum response time
                  regardless of GPU speed
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Mention cache invalidation as a hidden
                  complexity - model updates require cache flushes or versioned
                  keys
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonImageClassificationScaleOnlineServingArchitectureDynamicBatchingAndCaching;
