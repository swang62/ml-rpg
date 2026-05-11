import type { Component } from "solid-js";

const LessonNlpScalabilityWhatIsModelParallelismAndWhyDoWeNeedIt: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            What is Model Parallelism and Why Do We Need It?
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
                <strong>ML Scalability</strong> is the ability to handle
                increasing load - more requests, larger models, bigger datasets
                - without proportionally increasing latency or cost. It covers
                both training (processing more data) and serving (handling more
                inference requests).
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Why ML Scaling is Different
            </p>
            <p style="margin-top: 0">
              Traditional web services scale by adding more stateless servers.
              ML systems are fundamentally different. A model is a large
              stateful artifact - a 7B parameter LLM is 14GB in float16. You
              cannot simply spin up more servers; each server needs the model
              loaded in memory. Loading takes 30-60 seconds for large models.
              Memory is the constraint, not CPU.
            </p>
            <p>
              The scaling challenge varies by phase. Training scales with data
              parallelism: split your dataset across GPUs, each processes a
              portion, gradients are synchronized. Serving scales with model
              replication and request batching: run multiple model copies, batch
              incoming requests to maximize GPU utilization. These require
              different architectures.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Cost of Not Scaling
            </p>
            <p style="margin-top: 0">
              An unscaled ML system hits walls fast. At 100 requests per second,
              your single GPU saturates. Queue depth grows. P99 latency spikes
              from 100ms to 5 seconds. Users abandon. Revenue drops. The fix is
              not obvious: more GPUs require load balancing, model
              synchronization, and batching logic that your original system was
              not designed for.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Key Insight:</strong> GPU utilization is the key metric
              for ML cost efficiency. A GPU processing one request at a time
              might run at 10% utilization. Batching 32 requests together can
              push utilization to 70-80%, serving 30x more requests on the same
              hardware.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Scaling Dimensions
            </p>
            <p style="margin-top: 0">
              ML systems scale along three axes: model parallelism (splitting
              one model across multiple GPUs), data parallelism (running
              multiple model copies on different data), and request batching
              (processing multiple requests together). Each addresses different
              bottlenecks and they can be combined.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; gap: 12px; margin-bottom: 16px">
                <div style="flex: 1; border: 2px solid; padding: 12px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">Tensor Parallel</strong>
                  <div style="margin-top: 8px; font-size: 12px">
                    Layer split across 8 GPUs
                    <br />
                    140GB layer → 17.5GB/GPU
                    <br />
                    High bandwidth needed
                  </div>
                </div>
                <div style="flex: 1; border: 2px solid; padding: 12px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">Pipeline Parallel</strong>
                  <div style="margin-top: 8px; font-size: 12px">
                    Layers on 8 stages
                    <br />
                    Micro batches stream
                    <br />
                    82% efficiency (32 batches)
                  </div>
                </div>
                <div style="flex: 1; border: 2px solid; padding: 12px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">Mixture of Experts</strong>
                  <div style="margin-top: 8px; font-size: 12px">
                    Router picks 2 of 64 experts
                    <br />
                    Reduces FLOPs 97%
                    <br />
                    Load balancing needed
                  </div>
                </div>
              </div>
              <div style="border: 2px solid; padding: 12px; border-radius: 6px; text-align: center">
                <strong style="font-size: 13px">
                  3D Parallelism Example: 256 A100 GPUs
                </strong>
                <div style="margin-top: 8px; font-size: 12px">
                  Tensor Parallel 8 (within node NVLink) × Pipeline Parallel 8
                  (across nodes) × Data Parallel 4 = 256 total GPUs
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
                  ML scaling differs from web services because models are large
                  stateful artifacts (14GB for 7B params) that take 30-60
                  seconds to load
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Training scales with data parallelism (split dataset across
                  GPUs), serving scales with model replication and request
                  batching
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  GPU utilization is the key cost metric - single requests run
                  at 10% utilization, batching 32 requests pushes to 70-80%
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Three scaling axes: model parallelism (split model), data
                  parallelism (multiple copies), request batching (process
                  together)
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
                  Explain why ML scaling is harder than web scaling: models are
                  stateful 14GB artifacts, not stateless handlers. Memory is the
                  constraint.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mention GPU utilization as your cost efficiency metric. Single
                  request processing wastes 90% of GPU capacity.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Distinguish training vs serving scaling: data parallelism for
                  training, model replication with batching for serving.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonNlpScalabilityWhatIsModelParallelismAndWhyDoWeNeedIt;
