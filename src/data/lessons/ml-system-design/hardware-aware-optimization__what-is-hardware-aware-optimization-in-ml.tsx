import type { Component } from "solid-js";

const LessonHardwareAwareOptimizationWhatIsHardwareAwareOptimizationInMl: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            What is Hardware Aware Optimization in ML?
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
                <strong>Hardware-aware optimization</strong> designs ML models
                knowing their deployment target: GPU type, memory limits,
                latency budgets. Instead of training the best model then
                squeezing it onto hardware, you build constraints into the
                design process from the start.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Why Hardware Constraints Matter
            </p>
            <p style="margin-top: 0">
              A model optimized for V100 GPUs may run 3x slower on T4s due to
              different memory bandwidth and tensor core generations. Mobile
              chips have 10-100x less compute than cloud GPUs. Edge devices
              often lack FP16 support or have unusual memory hierarchies.
              Building without hardware awareness leads to: models too slow for
              latency SLAs, models too large for device memory, expensive
              rewrites after discovering constraints late.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Traditional Approach Fails
            </p>
            <p style="margin-top: 0">
              Traditional workflow: design model → train → optimize for
              deployment. This fails because: architectural choices made during
              design may be fundamentally incompatible with target hardware;
              post-hoc optimizations can only recover 20-30% of potential
              speedup; you discover constraints too late when changing
              architecture is expensive. Hardware-aware approach: define
              hardware constraints first → search for architectures that fit →
              train within constraints.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Key Constraint Types
            </p>
            <p style="margin-top: 0">
              <strong>Latency:</strong> maximum inference time (e.g., 10ms for
              real-time). <strong>Throughput:</strong> minimum requests per
              second. <strong>Memory:</strong> model size + activation memory
              must fit device RAM. <strong>Power:</strong> critical for
              mobile/edge (watts consumed). <strong>Cost:</strong> cloud
              inference cost per 1000 requests. Each constraint shapes
              architectural choices differently.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; gap: 16px; align-items: center; justify-content: center">
                <div style="border: 2px solid; padding: 12px; border-radius: 6px; flex: 1; text-align: center">
                  <strong style="font-size: 14px">Model A</strong>
                  <div style="margin-top: 8px; font-size: 13px">
                    10B FLOPs
                    <br />
                    Poor cache reuse
                    <br />
                    <strong>50ms latency</strong>
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold">vs</div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px; flex: 1; text-align: center">
                  <strong style="font-size: 14px">Model B</strong>
                  <div style="margin-top: 8px; font-size: 13px">
                    10B FLOPs
                    <br />
                    Sequential access
                    <br />
                    <strong>25ms latency</strong>
                  </div>
                </div>
              </div>
              <div style="margin-top: 12px; padding: 10px; border: 2px solid; border-radius: 6px; text-align: center; font-size: 13px">
                <strong>
                  Same FLOPs, 2x latency difference due to memory patterns
                </strong>
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
                  Hardware-aware optimization builds deployment constraints into
                  model design, not post-hoc optimization
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  V100-optimized models may run 3x slower on T4s; mobile has
                  10-100x less compute than cloud GPUs
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Traditional approach recovers only 20-30% of potential
                  speedup; constraints discovered too late
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Key constraints: latency (ms), throughput (QPS), memory (RAM),
                  power (watts), cost ($/1000 requests)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Define hardware constraints first, then search for
                  architectures that fit
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
                  Explain why hardware-first design outperforms optimize-later
                  approach with specific numbers (20-30% recovery)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  List the five constraint types (latency, throughput, memory,
                  power, cost) to show systematic thinking
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mention V100 vs T4 performance gap to demonstrate real-world
                  awareness of GPU generations
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonHardwareAwareOptimizationWhatIsHardwareAwareOptimizationInMl;
