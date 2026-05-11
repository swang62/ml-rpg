import type { Component } from "solid-js";

const LessonMlCostOptimizationAutoscalingArchitectureMatchingCapacityToDemand: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Autoscaling Architecture: Matching Capacity to Demand
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Autoscaling:</strong> Automatically adjusting compute
              capacity based on demand. Scale up when load increases (more
              requests, larger queue), scale down when load decreases. The goal
              is right-sizing: enough capacity to meet SLAs without paying for
              idle resources.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Scaling Metrics
            </p>
            <p>
              <strong>Reactive metrics:</strong> CPU utilization, memory usage,
              request latency. When utilization exceeds threshold (e.g., 70%),
              add capacity. Simple but lagging—by the time utilization is high,
              users may already experience degradation.{" "}
              <strong>Predictive metrics:</strong> Queue depth, request rate
              trend, time-of-day patterns. Scale before load arrives based on
              leading indicators. More complex but better user experience. For
              ML inference, request queue depth is often the best signal: if
              requests are waiting, you need more capacity regardless of current
              utilization.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Scale-Up vs Scale-Down Asymmetry
            </p>
            <p>
              Scaling up should be fast and aggressive—users are waiting.
              Scaling down should be slow and conservative—premature scale-down
              causes thrashing (scale down, load increases, scale up, repeat).
              Common pattern: scale up when metric exceeds threshold for 1
              minute, scale down when metric stays below threshold for 10
              minutes. This asymmetry reflects that over-provisioning costs
              money but under-provisioning costs users. For ML serving, add
              cooldown periods after model loading to prevent thrashing during
              warmup.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Capacity Limits
            </p>
            <p>
              Autoscaling needs bounds. Minimum capacity ensures baseline
              availability (at least 2 replicas for redundancy). Maximum
              capacity prevents runaway costs from traffic spikes or bugs.
              Without maximums, a sudden traffic surge or infinite loop could
              spin up hundreds of expensive GPU instances before anyone notices.
              Set maximums based on budget and realistic traffic projections,
              with alerts when approaching limits.
            </p>
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Cost Efficiency:</strong> Well-tuned autoscaling can
              reduce infrastructure costs 40-60% compared to static provisioning
              for peak load, while maintaining the same SLA.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">Scaling Signals</strong>
                  <div style="margin-top: 8px; font-size: 12px">
                    Request rate → Queue depth → p95 latency
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="display: flex; gap: 12px">
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; flex: 1; text-align: center">
                    <strong style="font-size: 13px">Horizontal Scaling</strong>
                    <div style="margin-top: 6px; font-size: 11px">
                      Add/remove replicas
                    </div>
                    <div style="margin-top: 4px; font-size: 11px">
                      Tens of seconds
                    </div>
                  </div>
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; flex: 1; text-align: center">
                    <strong style="font-size: 13px">Cluster Scaling</strong>
                    <div style="margin-top: 6px; font-size: 11px">
                      Add/remove nodes
                    </div>
                    <div style="margin-top: 4px; font-size: 11px">
                      Few minutes
                    </div>
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 12px">Thresholds</strong>
                  <div style="margin-top: 6px; font-size: 11px">
                    Scale out: p95 &gt; 100ms for 2min
                  </div>
                  <div style="margin-top: 3px; font-size: 11px">
                    Scale in: p95 &lt; 50ms for 10min
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
                  Queue depth is often the best ML inference scaling signal
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Scale-up fast (1 minute), scale-down slow (10 minutes) to
                  prevent thrashing
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Set maximum limits to prevent runaway costs from traffic
                  spikes or bugs
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
                  Scale up at 70% utilization, scale down after 10 minutes below
                  threshold
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Autoscaling reduces costs 40-60% vs static provisioning for
                  peak load
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonMlCostOptimizationAutoscalingArchitectureMatchingCapacityToDemand;
