import type { Component } from "solid-js";

const LessonMultimodalSystemsVlmProcessingPipelineFromPixelsToTokens: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            VLM Processing Pipeline: From Pixels to Tokens
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Token Budget Challenge
            </p>
            <p style="margin-top: 0">
              When you feed an image into a VLM, it doesn't stay as pixels. A
              single 896 by 896 image gets divided into patches (typically 14 by
              14 pixels each), creating 64 by 64 equals 4,096 patches. Each
              patch becomes a visual token. For a 30 second video sampled at 4
              frames per second (FPS), that is 120 frames times 4,096 tokens
              equals 491,520 visual tokens before you even add the text prompt.
              This is why token compression matters. Systems like DeepSeek OCR
              achieve 10x to 20x compression, reducing 4,096 tokens per image
              down to 200 to 400 tokens while preserving critical details like
              small text in receipts or tables in documents.
            </p>
            <div style="margin: 20px 0 20px 0">
              <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 6px">
                <div style="width: 22px; height: 22px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 11px; flex-shrink: 0; margin-top: 2px">
                  1
                </div>
                <div style="flex: 1">
                  <strong>Preprocessing:</strong> Images are normalized and
                  resized to the model's expected resolution (896x896 for some
                  models, native resolution for others like Pixtral). Video is
                  sampled at 1 to 4 FPS. PDFs are converted to page screenshots
                  plus extracted text.
                </div>
              </div>
              <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 6px">
                <div style="width: 22px; height: 22px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 11px; flex-shrink: 0; margin-top: 2px">
                  2
                </div>
                <div style="flex: 1">
                  <strong>Vision Encoding:</strong> Encoders like CLIP, SigLIP,
                  or DINOv2 convert patches into embeddings. This takes 100 to
                  300ms at p50 on modern GPUs for moderate sized images.
                </div>
              </div>
              <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 6px">
                <div style="width: 22px; height: 22px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 11px; flex-shrink: 0; margin-top: 2px">
                  3
                </div>
                <div style="flex: 1">
                  <strong>Projection:</strong> Visual embeddings are mapped into
                  the language model's token space through learned projection
                  layers. This alignment is critical; poor projection causes
                  hallucinations on new domains.
                </div>
              </div>
              <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 6px">
                <div style="width: 22px; height: 22px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 11px; flex-shrink: 0; margin-top: 2px">
                  4
                </div>
                <div style="flex: 1">
                  <strong>Decoding:</strong> The language model processes the
                  fused sequence of text tokens and visual embeddings. Mixture
                  of Experts (MoE) decoders activate only a fraction of
                  parameters per token for better efficiency. This takes 300 to
                  800ms at p50.
                </div>
              </div>
            </div>
            <p style="margin-top: 16px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Real Numbers That Matter
            </p>
            <p style="margin-top: 0">
              A single NVIDIA A100 40GB GPU can handle 10 to 30 queries per
              second (QPS) for medium sized VLM requests, assuming 1,000 to
              2,000 total tokens per request and 1 to 4 images with batching.
              DeepSeek OCR specifically achieves approximately 2,500 tokens per
              second throughput on a single A100, making it useful as a
              preprocessing step to compress visual content before the main VLM.
            </p>
            <div style="margin: 20px 0; display: flex; flex-direction: column; align-items: center">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
                Single Image Token Count
              </div>
              <div style="display: inline-flex; gap: 12px; flex-wrap: wrap; justify-content: center">
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">4,096</div>
                  <div style="font-size: 10px; font-weight: 600">
                    UNCOMPRESSED
                  </div>
                </div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">200-400</div>
                  <div style="font-size: 10px; font-weight: 600">
                    COMPRESSED
                  </div>
                </div>
              </div>
            </div>
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>⚠️ Common Pitfall:</strong> Blindly resizing all images to
              a fixed resolution like 896x896 can make small text or fine
              details unreadable, silently degrading OCR and reasoning accuracy.
              For documents with dense text, consider tiling or using native
              resolution encoders.
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
                  A single 896x896 image generates 4,096 visual tokens (64x64
                  patches). A 30 second video at 4 FPS creates 491,520 tokens
                  before text prompts.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Compression techniques like DeepSeek OCR reduce tokens by 10x
                  to 20x (from 4,096 to 200 to 400 per image), critical for long
                  context and cost management
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  End to end latency budget: 50 to 150ms preprocessing, 100 to
                  300ms encoding, 300 to 800ms decoding at p50 on modern GPUs
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Single A100 40GB handles 10 to 30 QPS for medium VLM requests
                  with batching; specialized OCR models hit 2,500 tokens/second
                  for preprocessing
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
                  Document processing: 80 page PDF becomes 80 screenshots.
                  Uncompressed is 327,680 tokens (80 × 4,096). Compressed to
                  16,000 to 32,000 tokens fits in context window.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Video analysis: 30 second clip at 4 FPS with frame
                  deduplication keeps 40 diverse frames (120 reduced to 40),
                  cutting tokens from 491,520 to 163,840
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Invoice extraction: DeepSeek OCR preprocessor compresses
                  invoice image to 300 tokens, then feeds to Qwen3 VL for field
                  extraction, reducing total latency from 1.2s to 600ms
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonMultimodalSystemsVlmProcessingPipelineFromPixelsToTokens;
