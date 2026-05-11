import type { Component } from "solid-js";

const LessonInferenceLatencyOptimizationHowDoYouTuneInferenceServingForDifferentWorkloadPatterns: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            How Do You Tune Inference Serving for Different Workload Patterns?
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Latency-Sensitive Interactive Workloads
            </p>
            <p style="margin-top: 0">
              The priority is minimizing p95 or p99 latency while maintaining
              acceptable throughput. Use short micro batching windows of 10 to
              20 milliseconds to limit queuing delay. Deploy continuous batching
              with small maximum batch sizes, perhaps 8 to 16 requests, to avoid
              long sequences blocking short ones. Enable KV caching and prefix
              reuse aggressively since multi turn conversations benefit
              enormously. Apply weight only quantization to reduce memory
              footprint and enable more concurrent sessions, but validate that
              p99 latency remains stable. Monitor memory utilization closely and
              set admission control thresholds at 75% to 80% to preserve
              headroom for bursts.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Throughput-Optimized Batch Workloads
            </p>
            <p style="margin-top: 0">
              Maximize tokens per second per dollar of compute. Use longer
              batching windows of 50 to 100 milliseconds or wait until
              accumulating 32 to 64 requests to fully saturate the accelerator.
              Increase maximum batch size to the memory limit, tolerating higher
              tail latency since users are not waiting interactively. Apply
              aggressive quantization including weight plus activation if
              quality permits, since even small speedups multiply across
              millions of tokens. Offloading to slower but cheaper memory tiers
              becomes viable when latency SLOs are measured in seconds rather
              than milliseconds. Disable prefix caching unless the batch
              contains many duplicated prefixes.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Mixed Workloads
            </p>
            <p style="margin-top: 0">
              Require explicit separation or sophisticated scheduling. Use
              separate serving pools for interactive and batch traffic to
              prevent resource contention. Alternatively, priority queues with
              preemption allow high priority interactive requests to interrupt
              lower priority batch jobs, accepting some wasted work for better
              p99 latency. Elastic batch sizes that shrink during interactive
              traffic bursts and grow during quiet periods balance utilization
              and responsiveness. Cache aware scheduling routes requests with
              high expected cache hit rates to instances with warm caches.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Interaction Effect
            </p>
            <p style="margin-top: 0">
              Optimizations interact nonlinearly. Aggressive batching plus
              aggressive quantization can push a previously memory bound
              workload into compute bound territory, where quantization suddenly
              provides 2x to 3x speedup instead of 1.5x. Conversely, over
              aggressive KV cache compression can negate the benefits of
              continuous batching if quality degradation forces retries. Tuning
              requires continuous measurement of arithmetic intensity, memory
              bandwidth utilization, and quality metrics across representative
              traffic to find the Pareto frontier.
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
                  Interactive workloads prioritize p95 or p99 latency with short
                  10 to 20 ms batching windows, continuous batching capped at 8
                  to 16 requests, and admission control at 75% to 80% memory to
                  preserve burst headroom
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Throughput optimized batch workloads use 50 to 100 ms batching
                  windows or wait for 32 to 64 requests, maximize batch size to
                  memory limit, apply aggressive weight plus activation
                  quantization for multiplied speedup across millions of tokens
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mixed workloads require resource separation with dedicated
                  serving pools or priority queues with preemption, allowing
                  high priority interactive requests to interrupt batch jobs at
                  cost of wasted computation
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Optimization interactions are nonlinear: aggressive batching
                  plus quantization can shift workload from memory bound to
                  compute bound, changing quantization speedup from 1.5× to 3×;
                  measurement required to find Pareto frontier
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Cache aware scheduling routes requests with expected high
                  cache hit rates to instances with warm prefix caches, while
                  cold requests use separate capacity to avoid thrashing shared
                  caches
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Elastic batch sizing dynamically adjusts maximum batch size
                  based on current traffic mix, shrinking during interactive
                  bursts to protect latency and growing during quiet periods to
                  improve utilization
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
                  Amazon separates interactive product recommendations (p95
                  target 100 ms) from batch email personalization (target 10
                  minutes) into different serving fleets, with interactive using
                  small batches and batch using 64+ request batches to saturate
                  Graphics Processing Units (GPUs)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Netflix tunes recommendation inference with 15 ms batching
                  windows and batch size 12 for homepage (p99 150 ms Service
                  Level Objective (SLO)), but uses 100 ms windows and batch size
                  64 for overnight email generation (no latency SLO)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Google production systems measure arithmetic intensity
                  continuously and increase quantization aggressiveness when
                  workload shifts toward compute bound during batch processing,
                  then back off to weight only quantization during interactive
                  peaks
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">4</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Meta deploys priority queues where chat requests can preempt
                  document summarization jobs, accepting up to 20% wasted work
                  on preempted jobs to keep chat p99 under 200 ms during traffic
                  bursts
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonInferenceLatencyOptimizationHowDoYouTuneInferenceServingForDifferentWorkloadPatterns;
