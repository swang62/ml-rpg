import type { Component } from "solid-js";

const LessonMultimodalSystemsVlmArchitectureTradeOffsWhenToSpecializeVsGeneralize: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            VLM Architecture Trade-offs: When to Specialize vs Generalize
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Core Dilemma
            </p>
            <p style="margin-top: 0">
              Should you build one general purpose any to any VLM that handles
              text, images, video, and audio, or compose specialized components
              that excel at specific tasks? This is not an academic question.
              The wrong choice costs millions in infrastructure and months of
              engineering time.
            </p>
            <div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 8px; margin: 12px 0; align-items: stretch">
              <div style="padding: 12px; border: 2px solid; border-radius: 6px">
                <div style="font-weight: 700; margin-bottom: 4px; font-size: 13px">
                  General VLM (GPT 4o style)
                </div>
                <div style="font-size: 12px">
                  Handles any input, simpler product integration, higher latency
                  and cost per query
                </div>
              </div>
              <div style="display: flex; align-items: center; font-weight: 800; font-size: 18px">
                vs
              </div>
              <div style="padding: 12px; border: 2px solid; border-radius: 6px">
                <div style="font-weight: 700; margin-bottom: 4px; font-size: 13px">
                  Specialized Pipeline
                </div>
                <div style="font-size: 12px">
                  Faster and cheaper per task, complex orchestration, more
                  failure modes
                </div>
              </div>
            </div>
            <p style="margin-top: 16px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              When Generalization Wins
            </p>
            <p style="margin-top: 0">
              General VLMs like Qwen 2.5 Omni or GPT 4o make sense when your
              product needs true cross modal reasoning. For example, analyzing a
              dashboard screenshot while listening to a recorded user complaint
              and reading chat history. The model must understand relationships
              between what the user said (audio), what they saw (image), and
              what they typed (text). Splitting this across three specialized
              models loses context and introduces synchronization complexity.
              The cost: these models are large (70B to 200B parameters), require
              multi GPU inference, and run slower. A single query with 2 images,
              30 seconds of audio, and 500 tokens of text might take 5 to 10
              seconds at p99 and cost $0.02 to $0.05 per request. At 1 million
              requests per day, that is $20,000 to $50,000 daily.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              When Specialization Wins
            </p>
            <p style="margin-top: 0">
              For document heavy workloads like invoice processing, receipt
              extraction, or form filling, a specialized OCR model followed by a
              text reasoning model is dramatically cheaper. DeepSeek OCR
              processes an invoice image in 200ms and outputs 300 compressed
              tokens. A 7B text model then extracts fields in another 150ms.
              Total latency: 350ms. Total cost per request: $0.0005. Compare
              this to a general 70B VLM that processes the raw image (4,096
              tokens) in 1.5 seconds at $0.003 per request. The specialized
              pipeline is 4x faster and 6x cheaper. At 10 million invoices per
              month, you save $25,000 monthly.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Mixture of Experts (MoE) Middle Ground
            </p>
            <p style="margin-top: 0">
              MoE architectures activate only a fraction of parameters per
              token. A 70B MoE model might activate only 14B parameters per
              forward pass, giving 70B model quality at roughly 20B model cost.
              This is why models like Qwen 2.5 and Gemini use MoE decoders. The
              tradeoff: MoE adds serving complexity. Load imbalance between
              experts causes tail latency spikes. If one expert handles 3x more
              tokens than others, that GPU becomes a bottleneck. You need
              sophisticated load balancing and potentially expert replication.
            </p>
            <div style="margin: 20px 0; display: flex; flex-direction: column; align-items: center">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
                Cost Comparison: Invoice Processing
              </div>
              <div style="display: inline-flex; gap: 12px; flex-wrap: wrap; justify-content: center">
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">$0.003</div>
                  <div style="font-size: 10px; font-weight: 600">
                    GENERAL 70B VLM
                  </div>
                </div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">$0.0005</div>
                  <div style="font-size: 10px; font-weight: 600">
                    SPECIALIZED PIPELINE
                  </div>
                </div>
              </div>
            </div>
            <p style="margin-top: 16px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Model Size vs Deployment
            </p>
            <p style="margin-top: 0">
              Mobile and edge deployment changes the calculus entirely. A 200MB
              model barely fits on a smartphone and drains battery. Quantized
              small models like SmolVLM or Gemma 3 4B (compressed to 20MB to
              50MB) run on device with only 2% to 5% accuracy drop compared to
              full precision versions. The decision framework: If your product
              requires offline operation or sub 100ms latency (camera apps, AR
              filters), on device small models are mandatory. If accuracy is
              paramount (medical diagnosis, legal analysis), server side large
              models are worth the latency and cost.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>⚠️ Common Pitfall:</strong> Teams often over generalize
              early. They build one big VLM to handle everything, then discover
              80% of queries are simple OCR tasks that a $0.0001 specialized
              model could handle. By then, they have committed to expensive
              infrastructure. Start specialized, generalize only when cross
              modal reasoning justifies the cost.
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
                  General VLMs cost 4x to 6x more per query than specialized
                  pipelines for single modality tasks (invoice: $0.003 vs
                  $0.0005), but excel at true cross modal reasoning
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Specialized OCR plus text model is 4x faster (350ms vs 1.5s)
                  and saves $25,000 monthly at 10M requests for document
                  workloads
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  MoE models activate only a fraction of parameters (14B of
                  70B), giving large model quality at 3x lower serving cost, but
                  introduce load balancing complexity
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mobile deployment requires quantized small models under 50MB
                  (2% to 5% accuracy drop), while server side large models
                  justify latency for accuracy critical tasks
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
                  Cross modal reasoning (general VLM needed): Analyze dashboard
                  screenshot + audio complaint + chat logs together to diagnose
                  user issue. Context split across modalities.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Document processing (specialize): 10M invoices/month. DeepSeek
                  OCR (200ms, $0.0001) + 7B text model (150ms, $0.0004) saves
                  $25k/month vs general 70B VLM.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mobile AR filter (on device needed): Gemma 3 4B quantized to
                  20MB runs real time face analysis at 60 FPS on iPhone,
                  impossible with server round trip latency.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonMultimodalSystemsVlmArchitectureTradeOffsWhenToSpecializeVsGeneralize;
