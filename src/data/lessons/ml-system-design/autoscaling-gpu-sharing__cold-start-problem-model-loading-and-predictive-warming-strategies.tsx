import type { Component } from "solid-js";

const LessonAutoscalingGpuSharingColdStartProblemModelLoadingAndPredictiveWarmingStrategies: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Cold Start Problem: Model Loading and Predictive Warming Strategies
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Cold Start Breakdown
            </p>
            <p style="margin-top: 0">
              Cold start latency is the dominant constraint for GPU autoscaling
              in real time inference. The total delay from scaling decision to
              serving traffic includes: node provisioning (60 to 120 seconds for
              cloud VMs), GPU driver initialization (20 to 40 seconds),
              container image pull for GPU optimized images (30 to 90 seconds
              depending on registry proximity), and model weight loading from
              object storage (100 to 300 seconds for multi gigabyte models). A
              LLM at 10GB can take 180+ seconds just to load weights into GPU
              memory.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Why Reactive Scaling Fails
            </p>
            <p style="margin-top: 0">
              If your autoscaler triggers on queue depth exceeding 50 requests
              and takes 240 seconds to bring a new replica online, every request
              during that window experiences degraded latency or timeouts. A
              sudden traffic spike from 100 to 1000 requests per second causes
              immediate SLO violations while the system scrambles to add
              capacity.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Predictive Autoscaling
            </p>
            <p style="margin-top: 0">
              Uses traffic forecasts or reinforcement learning based controllers
              to anticipate load and pre warm capacity minutes before spikes
              occur. Historical patterns (like daily/weekly seasonality) plus
              real time signals stage GPU nodes and load models proactively. The
              risk is over provisioning if forecasts drift, requiring cost
              guardrails and maximum capacity caps. Warm pools maintain a small
              baseline of ready replicas even during idle periods, trading idle
              cost (perhaps one replica at $2/hour) for instant response to
              initial traffic.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Model Loading Optimization
            </p>
            <p style="margin-top: 0">
              Techniques include splitting weights into chunks for parallel
              download, using nearby object storage or CDN to reduce transfer
              time from 200 seconds to 60 seconds, lazy loading layers
              progressively as requests arrive, and caching popular models on
              persistent volumes attached to GPU nodes. Health check grace
              periods must account for load time: a 180 second grace period
              prevents Kubernetes from killing pods that are legitimately
              initializing. Termination grace periods (like 600 seconds) allow
              in flight inference to drain before shutdown.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Reactive Scaling (Cold Start)
                  </strong>
                  <div style="font-size: 11px; margin-top: 6px">
                    t=0s: Queue depth hits 50, trigger scale up
                    <br />
                    t=60s: Node provisioned
                    <br />
                    t=100s: Driver + container ready
                    <br />
                    t=280s: Model loaded (10GB), ready to serve
                    <br />
                    <strong>Total: 280s of degraded latency</strong>
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Predictive Scaling (Pre-warmed)
                  </strong>
                  <div style="font-size: 11px; margin-top: 6px">
                    t=-300s: Forecast predicts spike, start warming
                    <br />
                    t=0s: Traffic spike arrives
                    <br />
                    t=0s: Pre-warmed replicas already serving
                    <br />
                    <strong>Total: 0s user-facing delay</strong>
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">Warm Pool (Hybrid)</strong>
                  <div style="font-size: 11px; margin-top: 6px">
                    Baseline: 1 replica always ready ($2/hr idle cost)
                    <br />
                    Handles initial burst instantly
                    <br />
                    Reactive scaling adds capacity for sustained load
                    <br />
                    <strong>Balances cost and responsiveness</strong>
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
                  Total cold start latency reaches 240 to 280 seconds combining
                  node provision (60 to 120s), driver init (20 to 40s), image
                  pull (30 to 90s), and model weight loading (100 to 300s for
                  10GB models)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Reactive autoscaling triggers after queue buildup causes every
                  request during the 240 second ramp to violate p99 SLO, making
                  it unsuitable for latency critical inference without warm
                  pools
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Predictive autoscaling using historical patterns or
                  reinforcement learning pre warms capacity 5 to 10 minutes
                  before forecasted spikes, hiding cold start entirely at risk
                  of over provisioning if forecasts miss
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Warm pools maintain one to two baseline replicas during idle
                  periods trading $2 to $4 per hour idle cost for instant
                  response to initial traffic, then reactive scaling adds
                  capacity for sustained load
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Model loading optimization reduces time from 200 seconds to 60
                  seconds through parallel chunk downloads, nearby object
                  storage or Content Delivery Network (CDN), and persistent
                  volume caching of popular models on GPU nodes
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
                  Production configuration: health check grace period of 180
                  seconds accommodates model loading; termination grace of 600
                  seconds allows in flight inference to complete before pod
                  shutdown
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Large language model serving uses persistent volumes to cache
                  10GB model weights on GPU nodes, reducing subsequent pod
                  startup from 180 seconds to 45 seconds by skipping object
                  storage download
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Predictive autoscaler at Meta uses reinforcement learning on
                  traffic patterns to pre warm GPU capacity 8 minutes before
                  daily peak, maintaining p99 latency under 150ms target during
                  traffic increase from 500 to 5000 requests per second
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonAutoscalingGpuSharingColdStartProblemModelLoadingAndPredictiveWarmingStrategies;
