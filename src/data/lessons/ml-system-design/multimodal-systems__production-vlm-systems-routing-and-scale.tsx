import type { Component } from "solid-js";

const LessonMultimodalSystemsProductionVlmSystemsRoutingAndScale: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Production VLM Systems: Routing and Scale
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Routing Problem
            </p>
            <p style="margin-top: 0">
              In production, you never run just one VLM model. User requests
              vary wildly: a simple text question with a single screenshot needs
              sub second response, while analyzing a 100 page legal contract can
              take minutes. Running every request through your largest, most
              capable model wastes compute and money. Production systems at
              companies like OpenAI, Google, and Meta use intelligent routing
              layers that classify incoming requests by modality mix,
              complexity, user tier, and latency budget, then dynamically choose
              between small, medium, and large VLM variants.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Three Tier Strategy
            </p>
            <p style="margin-top: 0">
              First, latency sensitive flows like customer chat target p50 under
              800ms and p99 under 2 seconds. These route to 4B to 9B parameter
              models like Gemma 3 4B or GLM 4.6V Flash running on consumer grade
              GPUs. These models sacrifice some quality for speed. Second,
              balanced workloads like document Q&amp;A might use 30B to 70B
              models with p50 latency of 2 to 5 seconds. These run on A100 or
              H100 GPUs with mixed precision and batching to maximize
              throughput. Third, high value offline tasks such as invoice
              auditing, legal document review, or medical image analysis route
              to 70B to 235B models like Qwen3 VL 235B. Service Level Agreement
              (SLA) is minutes, not milliseconds, but quality is paramount.
              These might use multi GPU inference or even CPU offloading for
              rare, expensive queries.
            </p>
            <div style="margin: 20px 0; display: flex; flex-direction: column; align-items: center">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
                Latency vs Model Size Trade-off
              </div>
              <div style="display: inline-flex; gap: 12px; flex-wrap: wrap; justify-content: center">
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">800ms</div>
                  <div style="font-size: 10px; font-weight: 600">
                    4B MODEL P50
                  </div>
                </div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">3s</div>
                  <div style="font-size: 10px; font-weight: 600">
                    70B MODEL P50
                  </div>
                </div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">30s+</div>
                  <div style="font-size: 10px; font-weight: 600">
                    235B MODEL
                  </div>
                </div>
              </div>
            </div>
            <p style="margin-top: 16px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Specialized Preprocessing
            </p>
            <p style="margin-top: 0">
              Some systems add a preprocessing tier. If the router detects a
              text heavy document (invoice, receipt, form), it first routes to a
              specialized OCR model like DeepSeek OCR. This compresses visual
              content 10x to 20x, then feeds the compact representation to a
              reasoning VLM like QVQ 72B. This two stage approach reduces end to
              end cost by 60% to 80% for document heavy workloads while
              maintaining quality.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Capacity Planning
            </p>
            <p style="margin-top: 0">
              At scale, you need separate inference pools. A pool of 50 A100
              GPUs running 4B models at 20 QPS each handles 1,000 QPS aggregate
              for interactive queries. A smaller pool of 10 H100 GPUs running
              70B models handles 50 to 100 QPS for higher quality requests. A
              batch processing cluster runs 235B models overnight for audit
              workloads.
            </p>
            <div style="padding: 14px 16px; border-left: 4px solid; border-radius: 0 6px 6px 0; margin: 20px 0; font-style: italic">
              <div style="font-size: 14px; line-height: 1.5">
                "The decision isn't about building one best VLM. It's about
                orchestrating a fleet of models where each request lands on the
                smallest, cheapest model that can meet quality requirements."
              </div>
            </div>
            <p style="margin-top: 16px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Observability
            </p>
            <p style="margin-top: 0">
              Production systems track latency separately for each pipeline
              stage. A spike in vision encoding latency (from 150ms to 500ms)
              indicates GPU memory pressure or inefficient batching. A spike in
              decoding latency suggests context length growth or attention
              mechanism bottlenecks. Monitoring p99 latency by model tier
              reveals which capacity pools need scaling.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 14px">API Gateway + Router</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Classify by latency/quality needs
                  </div>
                </div>
                <div style="display: flex; gap: 10px; justify-content: space-between">
                  <div style="flex: 1; border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                    <strong style="font-size: 12px">Fast Tier</strong>
                    <div style="font-size: 10px; margin-top: 4px">4B model</div>
                    <div style="font-size: 10px">p50: 800ms</div>
                  </div>
                  <div style="flex: 1; border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                    <strong style="font-size: 12px">Balanced</strong>
                    <div style="font-size: 10px; margin-top: 4px">
                      70B model
                    </div>
                    <div style="font-size: 10px">p50: 3s</div>
                  </div>
                  <div style="flex: 1; border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                    <strong style="font-size: 12px">Quality</strong>
                    <div style="font-size: 10px; margin-top: 4px">
                      235B model
                    </div>
                    <div style="font-size: 10px">SLA: minutes</div>
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 12px">
                    Optional: OCR Preprocessor
                  </strong>
                  <div style="font-size: 10px; margin-top: 4px">
                    10x-20x compression for documents
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
                  Production systems use three tier routing: 4B models for sub
                  second latency (p50 800ms), 70B for balanced quality (p50 3s),
                  235B for high value offline tasks (minutes SLA)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Single A100 handles 10 to 30 QPS per model. A pool of 50 A100s
                  running 4B models serves 1,000 QPS aggregate for interactive
                  workloads
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Specialized OCR preprocessing (like DeepSeek OCR) reduces end
                  to end cost by 60% to 80% for document heavy workloads through
                  10x to 20x token compression
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Observability tracks latency by pipeline stage (encoding,
                  decoding, post processing) to identify specific bottlenecks as
                  scale increases
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
                  E commerce support: Simple product question with 1 image
                  routes to 4B model (800ms). Complex return with 5 images +
                  invoice routes to 70B model (3s).
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Legal document review: 200 page contract routes to OCR
                  preprocessor first (compress to 40k tokens), then to 235B
                  model overnight for clause extraction and risk analysis
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Medical imaging: Real time ultrasound analysis (emergency)
                  uses fast 9B model. Radiology report generation (non urgent)
                  uses 70B model with higher accuracy
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonMultimodalSystemsProductionVlmSystemsRoutingAndScale;
