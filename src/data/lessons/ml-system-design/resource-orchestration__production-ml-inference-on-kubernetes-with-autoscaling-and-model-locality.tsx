import type { Component } from "solid-js";

const LessonResourceOrchestrationProductionMlInferenceOnKubernetesWithAutoscalingAndModelLocality: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Production ML Inference on Kubernetes with Autoscaling and Model
            Locality
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>ML Inference Orchestration:</strong> Running model serving
              at scale on container orchestrators like Kubernetes. Unlike
              training (batch, can wait), inference is latency-sensitive and
              must handle variable traffic. Autoscaling and model loading
              strategies are critical for meeting SLAs while controlling costs.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Autoscaling Challenges
            </p>
            <p>
              Standard CPU autoscaling uses metrics like CPU utilization. GPU
              autoscaling is harder: GPU utilization is bursty (0% between
              batches, 100% during), memory utilization is static (model loaded
              once), and request latency is the real signal but hard to
              attribute to resource shortage vs model complexity. Effective GPU
              autoscaling uses: request queue depth (how many requests are
              waiting), inference latency percentiles (p99 above SLA triggers
              scale-up), and GPU memory pressure (approaching limits).
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Cold Start Problem
            </p>
            <p>
              Scaling up GPU inference is slow. A new pod must: pull the
              container image (seconds to minutes for large images), allocate
              GPU (seconds), load model weights into GPU memory (10-60 seconds
              for large models), and warm up (first few inferences are slower).
              Total cold start: 30 seconds to 5 minutes. During this time,
              existing pods handle increased load. Mitigations: keep warm
              standby replicas, use smaller model images, preload models into
              shared storage, or use serverless inference platforms with
              pre-warmed pools.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Model Locality
            </p>
            <p>
              Large models (multi-GB) are expensive to transfer repeatedly.
              Model locality strategies: <strong>Node affinity:</strong>{" "}
              Schedule model pods on nodes that already have the model cached on
              local disk. <strong>Shared storage:</strong> Mount model files
              from network storage (reduces image size but adds load time).{" "}
              <strong>Model distribution:</strong> Pre-distribute models to
              nodes before scheduling pods. The right strategy depends on model
              size (small models: bake into image; large models: shared storage
              with aggressive caching).
            </p>
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>SLA Planning:</strong> If p99 latency target is 100ms and
              cold start is 60 seconds, you need enough warm capacity to handle
              traffic spikes for 60 seconds before new pods are ready.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 11px">
                <div style="border: 2px solid; padding: 11px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">Request Traffic</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Queue depth &gt; 100 ms wait
                  </div>
                </div>
                <div style="font-size: 22px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 11px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">Autoscaler Trigger</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    p95 latency &gt; 75% SLO for 3 min
                  </div>
                </div>
                <div style="font-size: 22px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 11px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">Pod Spin Up: 20s</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Model cached on node local NVMe
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
                  GPU utilization is bursty: use queue depth and p99 latency for
                  autoscaling
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Cold start takes 30 seconds to 5 minutes including model
                  loading
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Model locality: bake small models into image, use shared
                  storage for large models
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
                  Large model cold start: image pull + GPU alloc + model load =
                  30s to 5min
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Keep warm standby replicas to handle traffic while new pods
                  start
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonResourceOrchestrationProductionMlInferenceOnKubernetesWithAutoscalingAndModelLocality;
