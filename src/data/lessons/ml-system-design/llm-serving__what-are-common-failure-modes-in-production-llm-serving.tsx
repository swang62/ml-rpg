import type { Component } from "solid-js";

const LessonLlmServingWhatAreCommonFailureModesInProductionLlmServing: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            What Are Common Failure Modes in Production LLM Serving?
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              OUT-OF-MEMORY (OOM) FAILURES
            </p>
            <p>
              The most common failure in LLM serving. KV cache grows with
              sequence length. A burst of long-context requests can exhaust
              memory, crashing the serving process.
            </p>
            <p>
              <strong>Prevention:</strong> Set hard limits on max sequence
              length. Reserve memory headroom (20-30%). Implement request
              queuing with admission control. Use paged attention to reduce
              fragmentation.
            </p>
            <p>
              <strong>Recovery:</strong> Auto-restart crashed processes.
              Implement circuit breakers that reject requests when memory is
              critically low.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              LATENCY SPIKES
            </p>
            <p>
              Sudden latency increases due to: GC pauses, memory swapping to
              disk, batch size fluctuations, or model loading. Users experience
              timeouts or degraded experience.
            </p>
            <p>
              <strong>Detection:</strong> Monitor p99 latency continuously.
              Alert on deviations from baseline. Track GPU memory utilization
              and swap activity.
            </p>
            <p>
              <strong>Mitigation:</strong> Use dedicated GPU memory pools.
              Disable swap on serving nodes. Pre-warm model weights on startup.
              Implement request timeouts with graceful degradation.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              QUALITY DEGRADATION
            </p>
            <p>
              Model outputs become worse without visible errors. Causes:
              quantization issues, temperature drift, prompt template bugs, or
              tokenizer mismatches.
            </p>
            <p>
              <strong>Detection:</strong> Monitor output quality metrics
              (perplexity on test set, task-specific metrics). Track output
              length distribution. Human evaluation sampling.
            </p>
            <p>
              <strong>Prevention:</strong> Version everything (model weights,
              tokenizer, prompts). Test quality after each deployment. A/B test
              model changes.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              CASCADING FAILURES
            </p>
            <p>
              One slow request backs up the queue. Queue grows. Memory pressure
              increases. More requests fail. System becomes unresponsive.
            </p>
            <p>
              <strong>Prevention:</strong> Implement load shedding—reject
              requests above capacity rather than queuing indefinitely. Set
              queue size limits. Prioritize requests based on SLO tier.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>✅ Best Practice:</strong> Build defense in depth: memory
              limits, queue limits, timeouts, circuit breakers, and
              auto-restart. Assume failures will happen; design for rapid
              recovery.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="text-align: center; font-weight: bold; margin-bottom: 8px; font-size: 15px">
                  Common Failure Progression
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Initial State: Healthy
                  </strong>
                  <div style="margin-top: 6px; font-size: 12px">
                    64 sequences, 40 GB KV used, 10 GB free
                    <br />
                    Inter token latency: 50ms p95
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Failure: Overadmission
                  </strong>
                  <div style="margin-top: 6px; font-size: 12px">
                    Scheduler admits 20 more sequences
                    <br />
                    KV grows to 52 GB, exceeds 50 GB limit
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">Outcome: OOM Crash</strong>
                  <div style="margin-top: 6px; font-size: 12px">
                    Out of memory exception, abort 30 requests
                    <br />
                    Users see errors, retry storm increases load
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
                  OOM: most common failure; prevent with max sequence limits,
                  20-30% memory headroom, admission control
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Latency spikes from GC, swap, batch fluctuation; monitor p99,
                  disable swap, pre-warm models on startup
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Cascading failures from queue backup; implement load shedding,
                  queue limits, priority tiers
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
                  Interview Tip: Explain cascading failure pattern: slow request
                  → queue growth → memory pressure → system unresponsive.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Describe defense in depth: memory limits +
                  queue limits + timeouts + circuit breakers + auto-restart.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonLlmServingWhatAreCommonFailureModesInProductionLlmServing;
