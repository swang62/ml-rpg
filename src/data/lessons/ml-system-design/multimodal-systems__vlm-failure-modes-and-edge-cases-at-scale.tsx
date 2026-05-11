import type { Component } from "solid-js";

const LessonMultimodalSystemsVlmFailureModesAndEdgeCasesAtScale: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            VLM Failure Modes and Edge Cases at Scale
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Input Corruption and Silent Degradation
            </p>
            <p style="margin-top: 0">
              Multimodal systems have more failure modes than text only LLMs
              because every modality introduces new edge cases. Images arrive
              corrupted (truncated downloads, encoding errors), extremely high
              resolution (24 megapixel phone photos when model expects 896 by
              896), or contain multiple documents per page (scanned multi page
              receipts as single image). The danger is silent degradation. If
              your preprocessing blindly resizes a 6000 by 4000 pixel receipt to
              896 by 896, small text becomes unreadable. Your VLM returns
              plausible but wrong invoice amounts because it literally cannot
              see the digits. This fails silently with no error, just bad
              output. The fix: implement resolution aware tiling. For high
              resolution inputs, split into overlapping tiles (1024 by 1024 with
              128 pixel overlap), process each tile separately, then merge
              results. This increases token count by 4x to 9x but preserves fine
              details. Alternatively, use native resolution encoders like those
              in Pixtral, which accept arbitrary image sizes but require more
              sophisticated attention mechanisms.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Video Processing Edge Cases
            </p>
            <p style="margin-top: 0">
              Video introduces temporal failures. Users upload 10 minute screen
              recordings when your system expects 30 second clips. At 4 FPS,
              that is 2,400 frames times 4,096 tokens equals 9.8 million tokens,
              far exceeding any context window. Frame deduplication helps but
              creates new issues. If you use simple frame differencing, slow
              animations or gradual transitions get over compressed (60 second
              fade treated as one frame). If you use embedding similarity with
              DINOv2, you need to tune the similarity threshold. Too aggressive
              (threshold 0.95) and you miss subtle changes. Too conservative
              (threshold 0.7) and you keep too many redundant frames.
            </p>
            <div style="margin: 20px 0; display: flex; flex-direction: column; align-items: center">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
                Video Token Explosion
              </div>
              <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap; justify-content: center">
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 10px; font-weight: 600">
                    10 MIN VIDEO
                  </div>
                  <div style="font-size: 16px; font-weight: 800">
                    9.8M tokens
                  </div>
                </div>
                <div style="font-size: 18px; font-weight: 800">→</div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 10px; font-weight: 600">
                    DEDUPLICATION
                  </div>
                  <div style="font-size: 16px; font-weight: 800">
                    800K tokens
                  </div>
                </div>
                <div style="font-size: 18px; font-weight: 800">→</div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 10px; font-weight: 600">
                    + COMPRESSION
                  </div>
                  <div style="font-size: 16px; font-weight: 800">
                    40K tokens
                  </div>
                </div>
              </div>
            </div>
            <p style="margin-top: 16px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Alignment Failures and Domain Shift
            </p>
            <p style="margin-top: 0">
              The projector that maps visual embeddings to language space is
              trained on specific data distributions. A model trained on natural
              images (ImageNet, COCO) may hallucinate heavily on UI screenshots,
              scientific plots, or medical images because the visual patterns
              are out of distribution. This is subtle. The model does not crash
              or return errors. It confidently describes UI elements that don't
              exist or misreads chart axes by 10x. Systems like Qwen 2.5 VL and
              Molmo mitigate this by training on diverse synthetic data
              including UI screenshots, flowcharts, and technical diagrams, and
              by exposing structured outputs like bounding boxes for grounding.
              Production systems need domain specific validation. For medical
              imaging, check that detected anatomical structures are
              anatomically plausible. For UI analysis, verify that described UI
              elements have corresponding pixel regions with high attention
              scores.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Multimodal RAG Failures
            </p>
            <p style="margin-top: 0">
              Retrieval Augmented Generation (RAG) for multimodal content has
              unique failure modes. Document screenshot embedding (one vector
              per page or passage) is fast but misses fine grained details. A 5
              page financial report with 12 charts and 8 tables embedded as 5
              vectors loses the structure of which table corresponds to which
              text section. ColBERT style token level embeddings are more
              accurate (hundreds of vectors per page capture table cells, chart
              elements, text spans), but a corpus of 1 million pages becomes 200
              billion vectors. Retrieval latency jumps from 50ms to 500ms, and
              memory requirements go from 4GB to 400GB. The trade-off: use
              coarse page level retrieval for initial filtering (top 100 pages),
              then fine grained token level reranking on those 100 candidates.
              This keeps p99 latency under 200ms while preserving detail.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Safety and Moderation at Scale
            </p>
            <p style="margin-top: 0">
              Text safety filters miss visual unsafe content. An image of a
              harmful activity with benign caption passes text only filters.
              Open VLMs like Pixtral have no built in moderation, so production
              deployments must add multimodal safety models. The challenge:
              false positives versus false negatives. Set your safety threshold
              too high and you block 5% of legitimate medical images or art
              references. Set it too low and 0.1% of harmful content gets
              through. At 100 million requests per day, 0.1% is 100,000 unsafe
              responses. Production systems run dual safety checks: a fast
              lightweight filter (99% recall, 2% false positive rate, 20ms
              latency) before generation, and a more accurate heavy filter
              (99.9% recall, 0.5% false positive rate, 100ms latency) after
              generation with human review for borderline cases.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>❗ Remember:</strong> The failure mode that matters most
              is the one that scales with your traffic. A 0.1% alignment failure
              on UI screenshots is ignorable at 1,000 queries per day but causes
              1,000 bad outputs per day at 1M QPS. Always calculate failure
              impact at peak scale, not average load.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="text-align: center; font-weight: 700; margin-bottom: 12px; font-size: 14px">
                Safety Pipeline
              </div>
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">Input: Text + Images</strong>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">Fast Safety Filter</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    99% recall, 2% FP, 20ms
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">VLM Generation</strong>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">Heavy Safety Filter</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    99.9% recall, 0.5% FP, 100ms
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">Safe Output</strong>
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
                  Silent degradation from image resizing: 6000x4000 receipt
                  resized to 896x896 makes small text unreadable, causing wrong
                  outputs with no error. Fix with resolution aware tiling or
                  native resolution encoders.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Video token explosion: 10 minute video generates 9.8M tokens.
                  Frame deduplication (similarity threshold tuning) plus
                  compression reduces to 40k tokens, fitting in context windows.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Alignment failures from domain shift: Models trained on
                  natural images hallucinate on UI screenshots or medical
                  images. Need domain specific validation and grounding with
                  bounding boxes.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Safety at scale: 0.1% false negative rate means 100k unsafe
                  outputs daily at 100M requests/day. Dual filter approach (fast
                  20ms pre check, heavy 100ms post check) balances latency and
                  safety.
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
                  Invoice processing: Blind resize to 896x896 causes 15% field
                  extraction errors on high resolution receipts. Switch to 4
                  tile approach (2x2 grid) recovers accuracy to 98% at 3x token
                  cost.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Video analysis: 5 minute tutorial generates 1.2M tokens
                  unprocessed. DINOv2 deduplication at 0.85 similarity threshold
                  keeps 200 diverse frames (163k tokens), then compress to 8k
                  tokens.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Medical imaging: VLM trained on natural images describes non
                  existent lesions in X rays (8% hallucination rate). Fine tune
                  on radiology dataset + anatomical plausibility checks reduces
                  to 0.5%.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonMultimodalSystemsVlmFailureModesAndEdgeCasesAtScale;
