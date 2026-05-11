import type { Component } from "solid-js";

const LessonImagePreprocessingProductionDataPipelineDesignAndThroughput: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Production Data Pipeline Design and Throughput
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Production Pipeline Requirements
            </p>
            <p style="margin-top: 0">
              Training pipelines can take minutes per batch. Production
              pipelines must process images in milliseconds. The same
              preprocessing logic runs in both contexts, but implementation
              differs dramatically for throughput and latency.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Image Decoding Bottleneck
            </p>
            <p style="margin-top: 0">
              JPEG decoding is CPU-intensive. A single core decodes 50-200
              images per second depending on resolution. For high-throughput
              pipelines, this becomes the bottleneck before GPU inference even
              starts.
            </p>
            <p>
              <strong>Solutions:</strong> Use multiple CPU workers for parallel
              decoding. GPU-accelerated decoders like nvJPEG process 1000+
              images per second. Pre-decode and store as raw tensors for
              repeated access at the cost of 10-20x storage.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Memory and Batching
            </p>
            <p style="margin-top: 0">
              A 224x224 RGB image consumes 150KB as a float tensor. A batch of
              32 images uses 5MB. A batch of 256 images uses 38MB. Pipeline
              memory must accommodate multiple batches in flight simultaneously.
            </p>
            <p>
              <strong>Prefetching:</strong> While GPU processes batch N, CPU
              prepares batch N+1. This hides preprocessing latency but doubles
              memory requirements. Balance prefetch depth against available
              memory.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Data Loading Patterns
            </p>
            <p style="margin-top: 0">
              <strong>Synchronous loading:</strong> Load, preprocess, inference
              sequentially. Simple but GPU sits idle during loading. Utilization
              drops to 30-50%.
            </p>
            <p>
              <strong>Asynchronous loading:</strong> Separate threads handle
              loading and preprocessing. GPU stays busy while CPU prepares next
              batch. Achieves 80-95% GPU utilization.
            </p>
            <p>
              <strong>Memory-mapped files:</strong> For datasets that fit in
              memory, map files directly. OS handles caching. Eliminates
              explicit loading code.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 650px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">Storage (S3/HDFS)</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Sharded files: 1–4 GB each | Seq read: 1.4 GB/s
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">Decode + Augment</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    CPU: 1k–2k img/s | GPU: 3k–6k img/s per node
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">Normalize + Batch</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Pinned memory | Prefetch 2–4 batches ahead
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">8 GPUs @ 256 img/GPU</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Target: 8192 img/s | Step time: 0.25s | Utilization &gt;90%
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
                  JPEG decoding at 50-200 images/sec per CPU core often
                  bottlenecks before GPU inference
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  GPU-accelerated decoders (nvJPEG) process 1000+ images/sec,
                  eliminating CPU bottleneck
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Prefetching hides preprocessing latency but doubles memory
                  requirements
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Asynchronous loading achieves 80-95% GPU utilization vs 30-50%
                  with synchronous loading
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
                  Interview Tip: Identify image decoding as a common overlooked
                  bottleneck - many teams focus on GPU but CPU limits throughput
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Mention prefetching trade-off: faster
                  throughput at cost of higher memory - size prefetch queue
                  based on available RAM
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonImagePreprocessingProductionDataPipelineDesignAndThroughput;
