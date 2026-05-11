import type { Component } from "solid-js";

const LessonNlpScalabilityHorizontalScalingModelReplicationAndLoadBalancing: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Horizontal Scaling: Model Replication and Load Balancing
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 0; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Replicating Models for Throughput
            </p>
            <p style="margin-top: 0">
              A single GPU running a model has a throughput ceiling. Once
              batching is optimized, the only way to handle more requests is
              more GPUs. Horizontal scaling deploys multiple model replicas
              behind a load balancer. 10 replicas handling 100 requests per
              second each serve 1000 total requests per second. Each replica is
              independent: no state sharing, no synchronization needed during
              inference.
            </p>
            <p>
              The challenge is replica management. Loading a large model takes
              30-60 seconds. If a replica crashes, you cannot instantly replace
              it. Cold start latency means you need spare capacity running to
              handle failures and traffic spikes. Most production systems run at
              60-70% peak capacity, keeping 30-40% headroom for resilience.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Load Balancing Strategies
            </p>
            <p style="margin-top: 0">
              Simple round-robin load balancing ignores request complexity. A
              long document summarization request takes 10x longer than a short
              classification. If one replica gets several long requests, it
              queues while others sit idle. Weighted load balancing considers
              request characteristics: estimate processing time based on input
              length, route to the least loaded replica.
            </p>
            <p>
              Queue depth is a useful metric for load balancing. Route requests
              to replicas with the shortest queues. This naturally balances load
              even when request complexity varies. Some systems expose queue
              depth as a health signal - a replica with growing queue depth
              receives fewer new requests.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Key Insight:</strong> ML inference has high variance in
              processing time based on input length and complexity. Load
              balancing must account for this, unlike web services where request
              times are more uniform.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Autoscaling Considerations
            </p>
            <p style="margin-top: 0">
              Autoscaling ML services is harder than web services because
              scale-up is slow (30-60 second model load) and GPUs are expensive.
              Scale based on queue depth and latency percentiles, not just CPU
              utilization. Set conservative scale-down policies to avoid
              thrashing - removing a replica and immediately needing it back is
              wasteful.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 540px">
              <div style="text-align: center; margin-bottom: 12px">
                <strong style="font-size: 14px">
                  Failure Mode Examples with Impact
                </strong>
              </div>
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 12px">Communication Stall</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Worker 3 slow link: 25 GB/s vs 50 GB/s
                    <br />
                    All reduce 140GB: 2.8s vs 5.6s (+2.8s)
                    <br />
                    1000 steps = +46 minutes wasted
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 12px">Pipeline Bubble</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Stage 4: 400ms, others 200ms each
                    <br />
                    Bubble time: 200ms idle per step
                    <br />
                    Efficiency drops from 82% to 60%
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 12px">KV Cache Exhaustion</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    512 seq × 4k tokens × 2.5 MB = 1.2 TB
                    <br />
                    Available: 1 TB → OOM, reject requests
                    <br />
                    Fragmentation adds 20% overhead
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 12px">MoE Hot Spot</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Expert 7 receives 10x load vs avg
                    <br />
                    GPU 7 OOMs, throughput drops 50%
                    <br />
                    Load balancing loss reduces to 2x
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 12px">
                    Length Variance Pathology
                  </strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Batch: 1× 8k tokens, 7× 512 tokens
                    <br />
                    Short seqs wait 3s for long seq
                    <br />
                    p99 latency: 200ms → 3200ms
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
                  Horizontal scaling deploys independent model replicas behind
                  load balancer - 10 replicas at 100 RPS each = 1000 RPS total
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Model loading takes 30-60 seconds, so production systems run
                  at 60-70% capacity with 30-40% headroom for failures
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Round-robin ignores request complexity - use queue depth or
                  weighted balancing based on input length
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Autoscale on queue depth and latency percentiles, not CPU; use
                  conservative scale-down to avoid thrashing
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
                  Explain why ML horizontal scaling differs from web: 30-60
                  second cold starts require running spare capacity.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Describe queue-depth load balancing: route to replica with
                  shortest queue, naturally handles variable request complexity.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  For autoscaling, recommend latency percentiles (P99) over CPU
                  metrics. GPU utilization is complex to measure.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonNlpScalabilityHorizontalScalingModelReplicationAndLoadBalancing;
