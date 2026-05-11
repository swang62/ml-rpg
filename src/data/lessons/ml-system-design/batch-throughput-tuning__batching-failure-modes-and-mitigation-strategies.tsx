import type { Component } from "solid-js";

const LessonBatchThroughputTuningBatchingFailureModesAndMitigationStrategies: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Batching Failure Modes and Mitigation Strategies
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 0; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Head-of-Line Blocking
            </p>
            <p style="margin-top: 0">
              One slow item in a batch delays all items. If batch processing
              takes max(item_times) rather than sum, a single slow request (10x
              normal) blocks the entire batch. Symptoms: p99 latency is much
              higher than p50; latency spikes correlate with specific input
              types. Mitigation: timeout individual items within the batch,
              process remaining items, return partial results. Or: separate fast
              and slow paths based on input characteristics (sequence length,
              complexity score). Profile to identify which inputs cause
              outliers.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Memory Spikes from Variable Batches
            </p>
            <p style="margin-top: 0">
              Peak memory occurs when maximum batch size coincides with maximum
              input size. If max batch is 64 and max sequence is 512 tokens,
              peak memory is 64×512 even though average is 64×100. The system
              runs fine most of the time, then crashes on unlucky combinations.
              Prevention: cap the product batch_size × max_input_size;
              dynamically reduce batch size when inputs are long; use separate
              pools for different input size ranges. Set memory limits per
              worker to fail fast rather than crash the host.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Batch Formation Starvation
            </p>
            <p style="margin-top: 0">
              During low traffic, batches rarely fill before timeout. Each
              request waits the full timeout delay for a batch that never forms.
              Under low load, latency is worse than no batching. Detection:
              monitor timeout trigger rate; if &gt;80% of batches are
              timeout-triggered, batching is hurting latency. Fix: reduce
              timeout at low traffic, or bypass batching entirely when queue
              depth is below threshold (e.g., process immediately if &lt;4
              requests waiting). This threshold should be tuned based on
              overhead amortization break-even.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Adaptive Strategy:</strong> Adjust batching parameters
              based on real-time load. High traffic: longer timeout, larger
              batches. Low traffic: short timeout or no batching. Use queue
              depth or request rate as the control signal for smooth
              transitions.
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
                  Head-of-line blocking: one slow item delays entire batch;
                  timeout individuals and return partial results
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Memory spikes: batch_size × max_input_size causes crashes; cap
                  product or reduce batch for long inputs
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Starvation: &gt;80% timeout triggers means batching hurts
                  latency; bypass batching at low queue depth
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Symptom of head-of-line: p99 latency much higher than p50,
                  spikes correlate with input types
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Adaptive: adjust batch params based on load; use queue depth
                  as control signal
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
                  Describe head-of-line blocking with p99/p50 symptom - shows
                  latency analysis experience
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Explain memory spike from batch×input product and capping
                  solution
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mention 80% timeout trigger threshold as signal to disable
                  batching at low load
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonBatchThroughputTuningBatchingFailureModesAndMitigationStrategies;
