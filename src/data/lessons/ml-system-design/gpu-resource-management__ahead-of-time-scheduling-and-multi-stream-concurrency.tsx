import type { Component } from "solid-js";

const LessonGpuResourceManagementAheadOfTimeSchedulingAndMultiStreamConcurrency: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Ahead of Time Scheduling and Multi Stream Concurrency
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Default Execution Problem
            </p>
            <p style="margin-top: 0">
              Default deep learning frameworks execute operators sequentially on
              a single CUDA stream, forcing each kernel launch to wait for the
              previous one to complete. This FIFO submission pattern leaves GPUs
              idle because the CPU runtime cannot issue kernels fast enough to
              keep thousands of CUDA cores saturated. Research shows PyTorch and
              TensorFlow leave GPUs idle 91 percent and 71 percent of the time
              respectively for certain models due to launch overhead and missed
              parallelism.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Ahead of Time Scheduling
            </p>
            <p style="margin-top: 0">
              Ahead of Time (AoT) scheduling solves this by recording one warm
              up iteration to build a static execution graph capturing all
              kernel launches, memory operations, and data dependencies. The
              scheduler analyzes this graph to assign operators to multiple
              parallel CUDA streams, maximizing logical concurrency up to degree
              15 while inserting synchronization barriers only on true data
              dependencies. The recorded schedule is then replayed for every
              subsequent iteration, eliminating repeated runtime scheduling
              decisions. Systems like Nimble achieve up to 22.3x inference
              speedup over PyTorch.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Multi Stream Pipelining
            </p>
            <p style="margin-top: 0">
              Multi stream execution pipelines independent operations: while
              stream 1 runs a matrix multiply, stream 2 can simultaneously copy
              the next batch from host to device memory, and stream 3 can
              transfer previous results back. This overlapping of compute, H2D
              transfers, and D2H transfers keeps the GPU fully utilized. Double
              or triple buffering strategies ensure there is always data ready
              for the next computation.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Trade-offs and Limitations
            </p>
            <p style="margin-top: 0">
              The tradeoff is static graph requirements: AoT scheduling works
              best for models with fixed control flow and tensor shapes. Dynamic
              branching, variable length sequences, or shape changes between
              iterations break the recorded schedule, requiring fallback to
              dynamic execution or re-recording. Incorrect dependency modeling
              risks deadlocks or stalls.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <div style="font-weight: 700; font-size: 14px; margin-bottom: 8px">
                    Single Stream (Default PyTorch)
                  </div>
                  <div style="font-size: 12px; font-family: monospace; line-height: 1.6">
                    Stream 0: [Kernel A] → [Kernel B] → [Kernel C]
                    <br />
                    <span>GPU Idle: 91% (launch overhead)</span>
                  </div>
                </div>
                <div style="font-size: 20px; text-align: center; font-weight: 700">
                  ↓ AoT Multi Stream
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <div style="font-weight: 700; font-size: 14px; margin-bottom: 8px">
                    Multi Stream (Nimble AoT)
                  </div>
                  <div style="font-size: 12px; font-family: monospace; line-height: 1.6">
                    Stream 0: [H2D Copy] ║ [Kernel A] ║ [D2H Copy]
                    <br />
                    Stream 1: ────── [Kernel B] ║ [Kernel C]
                    <br />
                    Stream 2: ──────────── [Kernel D]
                    <br />
                    <span>Concurrency: 15x, Speedup: 22.3x</span>
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
                  Default framework execution leaves GPUs idle 70 to 91% of time
                  due to single stream FIFO submission and Central Processing
                  Unit (CPU) launch overhead that cannot keep CUDA cores
                  saturated
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  AoT scheduling records one warm up iteration to build a static
                  graph, assigns operators to multiple CUDA streams (up to
                  degree 15 concurrency), and replays the schedule eliminating
                  runtime overhead for 22.3x speedup
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Multi stream pipelines overlap compute with Host to Device
                  (H2D) and Device to Host (D2H) memory transfers using double
                  or triple buffering, ensuring GPU always has data ready for
                  next operation
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Works best for static graphs with fixed control flow and
                  tensor shapes; dynamic models with variable sequences or
                  branching require re recording or fallback, losing the
                  performance benefit
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Incorrect dependency modeling introduces race conditions or
                  deadlocks; overly conservative barriers to prevent races can
                  serialize execution and negate concurrency gains, requiring
                  careful profiling
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
                  Nimble research system: Recorded ResNet50 inference schedule
                  once, replayed across 3 parallel CUDA streams, achieved 22.3x
                  speedup over PyTorch eager mode and 2.8x over TensorRT by
                  exposing logical concurrency of degree 15
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Production inference pattern: Pipeline batch preprocessing
                  (H2D copy on stream 0) with model forward pass (compute on
                  stream 1) and result postprocessing (D2H copy on stream 2),
                  keeping all GPU resources busy simultaneously
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonGpuResourceManagementAheadOfTimeSchedulingAndMultiStreamConcurrency;
