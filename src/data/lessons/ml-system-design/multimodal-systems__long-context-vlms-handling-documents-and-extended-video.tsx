import type { Component } from "solid-js";

const LessonMultimodalSystemsLongContextVlmsHandlingDocumentsAndExtendedVideo: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Long Context VLMs: Handling Documents and Extended Video
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Context Length Problem
            </p>
            <p style="margin-top: 0">
              A typical conversation with text only LLMs uses 2,000 to 5,000
              tokens. Add one image (4,096 tokens) and you double or triple
              context length. Add a 20 page document (80,000 tokens of
              screenshots plus text) or a 5 minute video (200,000+ tokens), and
              suddenly you need context windows of 256k to 1 million tokens.
              This is not just about model architecture supporting long
              contexts. It's about computational cost scaling quadratically with
              sequence length in standard attention mechanisms. Processing 256k
              tokens requires 65 billion attention computations (256k squared)
              compared to 25 million for 5k tokens: a 2,600x increase.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Architectural Solutions
            </p>
            <p style="margin-top: 0">
              Modern long context VLMs like Qwen3 VL (256k native, 1M extended)
              use sparse attention patterns. Instead of every token attending to
              every other token (O(n squared) complexity), they use sliding
              window attention (each token attends to nearest 4,096 neighbors)
              plus global attention on key frames or document sections. This
              reduces complexity to O(n times window size), making 256k context
              computationally feasible. The tradeoff: you lose some long range
              dependencies. A reference on page 5 of a document to a chart on
              page 75 might be missed if they are outside each other's attention
              windows. FlashAttention and other kernel optimizations reduce
              memory bandwidth bottlenecks, achieving 2x to 3x speedup, but the
              fundamental quadratic scaling remains for full attention.
            </p>
            <div style="margin: 20px 0; display: flex; flex-direction: column; align-items: center">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
                Attention Computation Scaling
              </div>
              <div style="display: inline-flex; gap: 12px; flex-wrap: wrap; justify-content: center">
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">25M</div>
                  <div style="font-size: 10px; font-weight: 600">5K TOKENS</div>
                </div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">4B</div>
                  <div style="font-size: 10px; font-weight: 600">
                    64K TOKENS
                  </div>
                </div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">65B</div>
                  <div style="font-size: 10px; font-weight: 600">
                    256K TOKENS
                  </div>
                </div>
              </div>
            </div>
            <p style="margin-top: 16px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Compression Strategies
            </p>
            <p style="margin-top: 0">
              Aggressive visual compression is mandatory for long context.
              DeepSeek OCR's 20x compression turns a 50 page document from 200k
              visual tokens to 10k compressed tokens. LongVU's frame
              deduplication keeps video tokens manageable by eliminating 60% to
              80% of redundant frames using self supervised embeddings from
              DINOv2. The decision matrix: for safety critical applications
              (legal contracts, medical records), use conservative compression
              (5x to 10x) to preserve all details. For cost sensitive, high
              volume workloads (customer support ticket screenshots), use
              aggressive compression (15x to 20x) and accept 2% to 3% detail
              loss.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Hierarchical Processing
            </p>
            <p style="margin-top: 0">
              Some systems use two pass approaches. First pass: process the
              entire document with a small, fast model that generates a summary
              and identifies key sections. Second pass: only process identified
              key sections with a large, high quality model. This cuts compute
              cost by 70% to 90% for long documents where most content is not
              relevant to the query. For example, analyzing a 100 page financial
              report to answer "What was Q3 revenue?" First pass with a 4B model
              identifies pages 23 to 27 contain Q3 data. Second pass processes
              only those 5 pages with a 70B model, using 95% less compute than
              processing all 100 pages.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Memory and Serving Constraints
            </p>
            <p style="margin-top: 0">
              A 70B model processing 256k tokens requires approximately 180GB of
              GPU memory for key value (KV) cache (256k tokens times 128 layers
              times 8k hidden dimension times 2 bytes per float16 value). This
              exceeds single GPU capacity, requiring tensor parallelism across 4
              to 8 GPUs. Batch size is severely constrained. A single H100 80GB
              can batch maybe 2 to 4 long context requests simultaneously,
              compared to 32 to 64 short context requests. This limits
              throughput and increases per query cost by 10x to 15x.
            </p>
            <div style="padding: 14px 16px; border-left: 4px solid; border-radius: 0 6px 6px 0; margin: 20px 0; font-style: italic">
              <div style="font-size: 14px; line-height: 1.5">
                "Long context is not a feature you add for free. Every 10x
                increase in context length increases serving cost by 5x to 10x.
                Build your system to avoid needing long context whenever
                possible."
              </div>
            </div>
            <p style="margin-top: 16px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              When to Actually Use Long Context
            </p>
            <p style="margin-top: 0">
              Do NOT use 256k context for everything. Most queries need under 8k
              tokens. Reserve long context for genuine use cases: comprehensive
              document analysis where the answer requires synthesizing
              information across many pages, extended video analysis for multi
              step processes, or conversational agents maintaining multi hour
              interaction history. For point queries ("What is the total on this
              invoice?"), extract and process only the relevant section. For
              aggregate queries ("Summarize all Q3 financial metrics"), use long
              context. The architectural pattern: route based on query type, not
              document size.
            </p>
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Context length scaling is quadratic: 256k tokens require 65
                  billion attention computations vs 25 million for 5k tokens, a
                  2,600x increase
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Sparse attention (sliding window + global attention) reduces
                  complexity from O(n squared) to O(n times window) but may miss
                  long range dependencies across distant pages
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  70B model with 256k context needs 180GB GPU memory for KV
                  cache, exceeding single GPU and constraining batch size to 2
                  to 4 requests (vs 32 to 64 for short context)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Hierarchical two pass processing (4B model finds relevant
                  sections, 70B model analyzes them) cuts compute cost by 70% to
                  90% for long documents with localized queries
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
                  Legal contract review: 200 page agreement generates 800k
                  tokens uncompressed. DeepSeek OCR compresses to 40k tokens.
                  Sparse attention processes in 8 seconds vs 45 seconds full
                  attention.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Financial report Q&amp;A: 100 page report, query is 'Q3
                  revenue'. First pass (4B model, 2s) identifies pages 23 to 27.
                  Second pass (70B model, 3s) processes 5 pages. Total 5s vs 50s
                  for full document.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Multi hour support chat: 3 hour conversation with 50
                  screenshots generates 220k tokens. Sliding window attention
                  (4k window) keeps recent context sharp, older context
                  compressed to key points.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonMultimodalSystemsLongContextVlmsHandlingDocumentsAndExtendedVideo;
