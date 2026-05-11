import type { Component } from "solid-js";

const LessonLlmServingWhatAreTheKeyTradeOffsInLlmServingOptimizations: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            What Are the Key Trade-offs in LLM Serving Optimizations?
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              LATENCY VS THROUGHPUT
            </p>
            <p>
              The fundamental trade-off in LLM serving. Larger batch sizes
              improve throughput (tokens per second) but increase latency for
              individual requests (time to first token, time per token).
            </p>
            <p>
              <strong>Batch size 1:</strong> Lowest latency (~10ms/token for 7B
              model). GPU underutilized. Throughput: ~100 tokens/second.
            </p>
            <p>
              <strong>Batch size 32:</strong> Higher latency (~30ms/token). GPU
              fully utilized. Throughput: ~3000 tokens/second.
            </p>
            <p>
              Choose based on use case: interactive chat needs low latency
              (small batches). Bulk document processing needs throughput (large
              batches).
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              PRECISION VS QUALITY
            </p>
            <p>
              Lower precision (FP16, INT8, INT4) reduces memory and increases
              speed but may degrade output quality.
            </p>
            <p>
              <strong>FP16:</strong> Standard for serving. Minimal quality loss.
              2x memory savings vs FP32.
            </p>
            <p>
              <strong>INT8:</strong> 2x further memory savings. Quality depends
              on quantization method. Good methods (GPTQ, AWQ) maintain quality
              for most tasks.
            </p>
            <p>
              <strong>INT4:</strong> 4x savings vs INT8. Noticeable quality
              degradation on complex reasoning tasks. Acceptable for simpler
              generation.
            </p>
            <p>
              Test quality on your specific use case before deploying quantized
              models in production.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              CONTEXT LENGTH VS COST
            </p>
            <p>
              Longer context enables more capabilities but increases memory and
              compute cost quadratically (attention is O(N²)).
            </p>
            <p>
              <strong>Trade-off:</strong> 32K context costs ~4x more than 8K
              context. Do you need the full context? Often you can truncate or
              summarize to use shorter context at lower cost.
            </p>
            <p>
              Sliding window attention and other techniques reduce this cost but
              may lose information from truncated context.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Key Insight:</strong> There is no single optimal
              configuration. Match optimization choices to your specific
              latency, throughput, quality, and cost requirements. Profile and
              measure before and after each optimization.
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
                  Latency vs throughput: batch size 1 = 10ms/token, 100 tok/s;
                  batch 32 = 30ms/token, 3000 tok/s
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Precision: FP16 standard; INT8 (GPTQ/AWQ) good quality; INT4
                  noticeable degradation on complex reasoning
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Context length: 32K costs ~4x of 8K; often can
                  truncate/summarize to reduce cost
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
                  Interview Tip: Give specific numbers for batch size vs
                  latency/throughput tradeoffs.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Explain INT8 quantization methods (GPTQ, AWQ)
                  and when quality degrades.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonLlmServingWhatAreTheKeyTradeOffsInLlmServingOptimizations;
