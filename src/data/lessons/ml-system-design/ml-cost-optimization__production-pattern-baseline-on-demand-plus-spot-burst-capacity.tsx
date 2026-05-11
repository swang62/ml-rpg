import type { Component } from "solid-js";

const LessonMlCostOptimizationProductionPatternBaselineOnDemandPlusSpotBurstCapacity: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Production Pattern: Baseline On Demand Plus Spot Burst Capacity
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Hybrid Capacity Pattern:</strong> Run baseline load on
              reliable on-demand instances while handling traffic spikes and
              batch workloads on cheaper spot instances. This combines spot cost
              savings with on-demand reliability for a balanced cost-risk
              profile.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Architecture Pattern
            </p>
            <p>
              Identify your minimum required capacity—the load that must be
              served even during spot unavailability. Run this baseline on
              on-demand instances with reserved capacity for additional savings.
              Above baseline, use spot instances that can be interrupted without
              violating SLAs. For inference: 60% on-demand baseline handles
              typical load, 40% spot handles peaks. For training: critical
              production model training on on-demand, experimental and
              hyperparameter search on spot. This hybrid approach captures
              50-70% of spot savings while eliminating availability risk.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Dynamic Rebalancing
            </p>
            <p>
              When spot instances are interrupted, automatically shift load to
              on-demand baseline. The baseline absorbs overflow temporarily
              while replacement spot instances launch. Design systems to handle
              this gracefully: queuing during transition, graceful degradation
              of non-critical features, priority-based request handling. If spot
              interruption rate exceeds threshold (e.g., 20% per hour),
              temporarily suspend spot usage and run entirely on-demand until
              spot market stabilizes.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Reserved Instances for Baseline
            </p>
            <p>
              On-demand baseline is expensive at full price. Reserved instances
              (1-year or 3-year commitment) provide 30-60% discount for
              predictable baseline load. The optimal strategy: reserved
              instances for minimum sustained load, on-demand for predictable
              variation, spot for burst and experimental workloads. This layered
              approach minimizes cost at each tier while maintaining appropriate
              reliability guarantees.
            </p>
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Typical Split:</strong> 40% reserved (baseline), 20%
              on-demand (variation), 40% spot (burst). Actual ratios depend on
              load predictability and interruption tolerance.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px">Traffic Pattern</strong>
                  <div style="margin-top: 8px; font-size: 12px">
                    Average: 50K req/sec | Peak: 100K req/sec | Trough: 30K
                    req/sec
                  </div>
                </div>
                <div style="display: flex; gap: 12px">
                  <div style="border: 2px solid; padding: 12px; border-radius: 6px; flex: 1">
                    <strong style="font-size: 13px">On Demand Baseline</strong>
                    <div style="margin-top: 8px; font-size: 12px">
                      30 replicas
                    </div>
                    <div style="margin-top: 4px; font-size: 11px">
                      Handles 60K req/sec
                    </div>
                    <div style="margin-top: 4px; font-size: 11px">
                      Always running
                    </div>
                  </div>
                  <div style="border: 2px solid; padding: 12px; border-radius: 6px; flex: 1">
                    <strong style="font-size: 13px">Spot Burst</strong>
                    <div style="margin-top: 8px; font-size: 12px">
                      0 to 70 replicas
                    </div>
                    <div style="margin-top: 4px; font-size: 11px">
                      Adds 0 to 40K req/sec
                    </div>
                    <div style="margin-top: 4px; font-size: 11px">
                      Scales with demand
                    </div>
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">Cost Savings</strong>
                  <div style="margin-top: 8px; font-size: 12px">
                    70% capacity from Spot at 80% discount = 56% total cost
                    reduction
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
                  Run minimum required capacity on reliable on-demand, burst on
                  spot
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Hybrid approach captures 50-70% of spot savings while
                  eliminating availability risk
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Layered strategy: reserved (baseline), on-demand (variation),
                  spot (burst)
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
                  Inference: 60% on-demand baseline, 40% spot for peaks
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Typical split: 40% reserved, 20% on-demand, 40% spot
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonMlCostOptimizationProductionPatternBaselineOnDemandPlusSpotBurstCapacity;
