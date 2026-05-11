import type { Component } from "solid-js";

const LessonImageClassificationScaleImageClassificationAtScaleArchitectureAndDataFlow: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Image Classification at Scale: Architecture and Data Flow
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
                <strong>Image Classification at Scale</strong> is a system that
                assigns category labels to millions or billions of images with
                sub-second latency. Unlike single-image demos, production
                systems must handle massive throughput while maintaining high
                accuracy across thousands of classes.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              End-to-End Data Flow
            </p>
            <p style="margin-top: 0">
              Images arrive continuously from uploads, crawlers, or camera
              feeds. The pipeline decodes raw bytes into tensors, normalizes
              pixel values to model expectations, batches multiple requests
              together, runs inference on GPUs, and returns class probabilities
              with confidence scores. Each stage can bottleneck the whole
              pipeline.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Why Scale Changes Everything
            </p>
            <p style="margin-top: 0">
              <strong>Throughput demands:</strong> A photo app might process
              100,000 images per second globally. Each millisecond of latency
              multiplied by millions of requests equals massive infrastructure
              cost.
            </p>
            <p>
              <strong>Class explosion:</strong> Academic benchmarks have 1,000
              classes. Production systems often have 10,000+ categories,
              requiring larger output layers and more nuanced decision
              boundaries.
            </p>
            <p>
              <strong>Distribution shift:</strong> User-uploaded photos differ
              dramatically from training data. Blurry, cropped, rotated, and
              watermarked images are common. The system must handle graceful
              degradation rather than catastrophic failure.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Core Architecture Components
            </p>
            <p style="margin-top: 0">
              <strong>Model server cluster:</strong> GPU-backed containers
              running inference, horizontally scaled behind load balancers to
              handle variable traffic.
            </p>
            <p>
              <strong>Preprocessing service:</strong> Image decoding and
              normalization. This is often CPU-bound and separated from GPU
              inference to prevent GPU starvation.
            </p>
            <p>
              <strong>Feature cache:</strong> Store embeddings for
              frequently-seen images to skip redundant inference. Cache hit
              rates of 30-50% are common for applications with repeated content.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 600px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 14px">Raw Upload</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    200 KB JPEG avg
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 14px">
                    Content Hash + Perceptual Hash
                  </strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Dedupe: 80 to 95% cache hit
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="display: flex; gap: 12px; justify-content: space-between">
                  <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; flex: 1; text-align: center">
                    <strong style="font-size: 14px">Offline Batch</strong>
                    <div style="font-size: 12px; margin-top: 4px">
                      5K to 50K img/s/GPU
                    </div>
                  </div>
                  <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; flex: 1; text-align: center">
                    <strong style="font-size: 14px">Online Serving</strong>
                    <div style="font-size: 12px; margin-top: 4px">
                      50 to 150 ms p99
                    </div>
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 14px">
                    Embedding Store + Label Store
                  </strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    2 KB embedding, 2 TB per 1B images
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
                  Production classification handles millions of images per
                  second with sub-second latency requirements
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Class count grows from 1000 to 10000+ in production, requiring
                  larger models and careful hierarchical training
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Architecture splits preprocessing (CPU) from inference (GPU)
                  for efficient resource utilization
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Feature caching reduces redundant computation - 30-50% cache
                  hit rates common for repeated content
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
                  Interview Tip: Discuss how latency at scale translates to cost
                  - 10ms saved per request times 100K requests/sec equals
                  significant infrastructure savings
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Mention distribution shift as the gap between
                  clean training data and messy user uploads - this shows
                  production awareness
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonImageClassificationScaleImageClassificationAtScaleArchitectureAndDataFlow;
