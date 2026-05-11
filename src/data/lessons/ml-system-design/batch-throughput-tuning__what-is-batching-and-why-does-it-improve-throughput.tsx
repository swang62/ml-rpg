import type { Component } from "solid-js";

const LessonBatchThroughputTuningWhatIsBatchingAndWhyDoesItImproveThroughput: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            What is Batching and Why Does It Improve Throughput?
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
                <strong>Batching</strong> groups multiple independent operations
                into a single execution. Instead of processing requests one at a
                time, the system collects several requests and processes them
                together, amortizing fixed overhead across multiple items.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Why Batching Improves Throughput
            </p>
            <p style="margin-top: 0">
              Every operation has fixed overhead: network round-trips, kernel
              launches, memory allocation. Processing one item takes 5ms
              overhead plus 1ms compute. Processing 32 items takes 5ms overhead
              plus 10ms compute. Single-item throughput: 166 items/second.
              Batched throughput: 2133 items/second. The overhead amortizes
              across the batch, and parallel hardware (GPUs) processes multiple
              items simultaneously.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Latency Trade-off
            </p>
            <p style="margin-top: 0">
              Batching increases individual request latency. If requests arrive
              at 100/second and you batch every 32, each request waits up to
              320ms to form a batch. For real-time applications, this is
              unacceptable. The solution: bounded-time batching. Wait up to X
              milliseconds or until batch is full, whichever comes first.
              Typical bounds: 5-50ms for interactive applications, 100-500ms for
              batch processing.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Batching Domains
            </p>
            <p style="margin-top: 0">
              <strong>GPU inference:</strong> batch inputs to maximize tensor
              core utilization. <strong>Database operations:</strong> batch
              writes to reduce I/O overhead. <strong>API calls:</strong> batch
              requests to external services to stay under rate limits.{" "}
              <strong>Message queues:</strong> batch messages to reduce
              per-message overhead. Each domain has different optimal batch
              sizes: GPU inference (16-128), database writes (100-1000), API
              calls (10-100).
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 550px">
              <div style="display: flex; justify-content: space-around; gap: 24px">
                <div style="flex: 1">
                  <div style="text-align: center; margin-bottom: 12px; font-weight: 700; font-size: 14px">
                    Without Batching
                  </div>
                  <div style="display: flex; flex-direction: column; gap: 8px">
                    <div style="border: 2px solid; padding: 8px; border-radius: 6px; text-align: center; font-size: 13px">
                      <strong>Item 1</strong>
                      <br />
                      20s
                    </div>
                    <div style="border: 2px solid; padding: 8px; border-radius: 6px; text-align: center; font-size: 13px">
                      <strong>Item 2</strong>
                      <br />
                      20s
                    </div>
                    <div style="border: 2px solid; padding: 8px; border-radius: 6px; text-align: center; font-size: 13px">
                      <strong>Item 3</strong>
                      <br />
                      20s
                    </div>
                  </div>
                  <div style="margin-top: 12px; text-align: center; font-weight: 700">
                    Total: 60s
                    <br />
                    0.05 items/s
                  </div>
                </div>
                <div style="flex: 1">
                  <div style="text-align: center; margin-bottom: 12px; font-weight: 700; font-size: 14px">
                    With Batching
                  </div>
                  <div style="border: 2px solid; padding: 16px; border-radius: 6px">
                    <div style="text-align: center; font-weight: 700; margin-bottom: 8px">
                      Batch of 10 Items
                    </div>
                    <div style="font-size: 13px; text-align: center">
                      Item 1, 2, 3, 4, 5,
                      <br />
                      6, 7, 8, 9, 10
                    </div>
                  </div>
                  <div style="margin-top: 12px; text-align: center; font-weight: 700">
                    Total: 30s
                    <br />
                    0.333 items/s
                    <br />
                    (6.6x faster)
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
                  Batching amortizes fixed overhead (5ms) across multiple items,
                  enabling 10x+ throughput gains
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Single-item: 166 items/sec; batch of 32: 2133 items/sec (13x
                  improvement in example)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Trade-off: individual latency increases; use bounded-time
                  batching (5-50ms for interactive)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Optimal batch sizes vary by domain: GPU (16-128), database
                  (100-1000), API (10-100)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Wait up to X ms or until batch full, whichever first -
                  balances latency and throughput
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
                  Give specific throughput calculation (166 vs 2133 items/sec)
                  to demonstrate quantitative thinking
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mention bounded-time batching as the solution to latency
                  trade-off
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  List domain-specific batch sizes to show breadth of batching
                  experience
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonBatchThroughputTuningWhatIsBatchingAndWhyDoesItImproveThroughput;
