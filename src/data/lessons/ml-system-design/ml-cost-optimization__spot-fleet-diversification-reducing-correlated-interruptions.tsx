import type { Component } from "solid-js";

const LessonMlCostOptimizationSpotFleetDiversificationReducingCorrelatedInterruptions: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Spot Fleet Diversification: Reducing Correlated Interruptions
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Spot Fleet Diversification:</strong> Spreading spot
              instances across multiple instance types, availability zones, and
              capacity pools to reduce the risk of correlated interruptions.
              When demand spikes in one pool, your workload continues in others.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Why Diversification Matters
            </p>
            <p>
              Spot interruptions are not random—they are correlated by instance
              type and availability zone. When a cloud provider needs capacity,
              they reclaim instances from specific pools. If all your instances
              are the same type in the same zone, a single reclamation event can
              terminate 100% of your fleet simultaneously. With diversification
              across 10 pools, a reclamation event might affect only 10-20% of
              your fleet. The remaining instances continue working while
              replacements launch in unaffected pools.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Diversification Dimensions
            </p>
            <p>
              <strong>Instance types:</strong> Instead of only p3.2xlarge, also
              use p3.8xlarge, p3.16xlarge, g4dn variants. Different types have
              different spot pools. <strong>Availability zones:</strong> Spread
              across all zones in a region. Zone-specific demand spikes affect
              only instances in that zone. <strong>Instance families:</strong>{" "}
              GPU training can often run on multiple GPU generations (V100, A10,
              A100). Flexibility in hardware increases available capacity. The
              trade-off: diversification requires software that handles
              heterogeneous hardware gracefully.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Allocation Strategies
            </p>
            <p>
              <strong>Lowest price:</strong> Always choose the cheapest
              available instance type. Maximizes savings but concentrates in
              popular (cheap) pools, increasing interruption risk.{" "}
              <strong>Capacity optimized:</strong> Choose pools with most
              available capacity. Reduces interruption probability but may cost
              slightly more. <strong>Diversified:</strong> Explicitly spread
              across pools regardless of price. Most resilient but requires
              managing heterogeneous fleet. For critical training jobs,
              capacity-optimized or diversified strategies are worth the small
              premium over lowest-price.
            </p>
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Rule of Thumb:</strong> Target at least 5-10 different
              capacity pools. With proper diversification, simultaneous
              interruption of more than 30% of your fleet becomes rare.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="border: 2px solid; padding: 12px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 14px">Single Pool Risk</strong>
                  <div style="margin-top: 8px; font-size: 12px">
                    c5.4xlarge in us-east-1a
                  </div>
                  <div style="margin-top: 6px; font-size: 12px">
                    100% capacity affected by one event
                  </div>
                  <div style="margin-top: 4px; font-size: 12px">
                    Interruption rate: ~20%
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓ Diversify ↓
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 14px; text-align: center">
                    Diversified Fleet
                  </strong>
                  <div style="margin-top: 8px; font-size: 11px">
                    Zone A: c5.4xl (15%), m5.4xl (15%), r5.4xl (10%)
                  </div>
                  <div style="margin-top: 4px; font-size: 11px">
                    Zone B: c5a.4xl (15%), m5a.4xl (15%), r5a.4xl (10%)
                  </div>
                  <div style="margin-top: 4px; font-size: 11px">
                    Zone C: c5.2xl (10%), m5.2xl (10%)
                  </div>
                  <div style="margin-top: 8px; font-size: 12px; text-align: center">
                    Max 15% capacity per pool
                  </div>
                  <div style="margin-top: 4px; font-size: 12px; text-align: center">
                    Interruption rate: ~3%
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
                  Spot interruptions are correlated by instance type and zone,
                  not random
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Diversify across instance types, availability zones, and GPU
                  generations
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Target 5-10 different pools to limit simultaneous interruption
                  to under 30%
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
                  Single pool: 100% fleet loss on reclamation. 10 pools: 10-20%
                  loss.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Capacity-optimized strategy reduces interruptions for small
                  cost premium
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonMlCostOptimizationSpotFleetDiversificationReducingCorrelatedInterruptions;
