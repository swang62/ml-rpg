import type { Component } from "solid-js";

const LessonMultimodalSystemsWhatAreMultimodalVisionLanguageModels: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            What are Multimodal Vision-Language Models?
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
                <strong>Multimodal Vision Language Models (VLMs)</strong> are
                machine learning systems that process and reason over multiple
                types of input like text, images, video, and audio in a unified
                way, generating responses that show understanding across these
                different modalities.
              </div>
            </div>
            <p style="margin-top: 16px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Core Problem
            </p>
            <p style="margin-top: 0">
              Traditional Large Language Models (LLMs) only understand tokens,
              treating everything as text. But real world applications demand
              more. Users want to upload a screenshot and ask "What is wrong
              with this UI?", submit an 80 page PDF with charts and tables for
              summarization, or analyze a 30 second video clip. Pure text models
              cannot solve these tasks because critical information lives in
              visual or audio content.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              How VLMs Work
            </p>
            <p style="margin-top: 0">
              A production VLM has three key components working together. First,
              a modality encoder converts raw inputs (images, video frames,
              audio) into dense numerical embeddings. Second, a projector aligns
              these embeddings into the same mathematical space as text tokens,
              so the model can reason over them uniformly. Third, a language
              model decoder processes this fused sequence of text tokens and
              visual embeddings to generate coherent responses. Think of it like
              translation: an image encoder "translates" pixels into a language
              the text model understands, then reasoning happens in that shared
              space.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Real World Examples
            </p>
            <p style="margin-top: 0">
              OpenAI's GPT 4o, Google's Gemini 2, and Meta's Llama 3.2 Vision
              all follow this architecture. Anthropic's Claude 3.5 can analyze
              screenshots and documents. Qwen 2.5 VL handles up to 256,000
              tokens of multimodal context, enough for hundreds of document
              pages or several minutes of video.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>✓ In Practice:</strong> A customer support assistant might
              process a photo of a damaged item, an invoice PDF, and a text
              question all together, understanding relationships between the
              visual defect, purchase details, and the customer's concern to
              generate a helpful response.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 12px; align-items: center">
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 160px; text-align: center">
                  <strong style="font-size: 14px">Raw Inputs</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Text + Images + Video
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 160px; text-align: center">
                  <strong style="font-size: 14px">Modality Encoders</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Convert to embeddings
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 160px; text-align: center">
                  <strong style="font-size: 14px">Projector</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Align to token space
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 160px; text-align: center">
                  <strong style="font-size: 14px">Language Decoder</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Unified reasoning
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 160px; text-align: center">
                  <strong style="font-size: 14px">Generated Response</strong>
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
                  VLMs extend LLMs from text only to multiple modalities
                  (vision, audio, video), solving tasks impossible with text
                  alone
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Core architecture has three stages: modality encoders create
                  embeddings, projectors align them to token space, language
                  decoder performs reasoning
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Production systems like GPT 4o, Gemini 2, and Qwen 2.5 VL can
                  handle 256,000+ tokens of multimodal context for long
                  documents and videos
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Key challenge is balancing three conflicting goals: strong
                  multimodal understanding, long context windows, and low
                  latency at production scale
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
                  Customer support: Process photo of damaged product + invoice
                  PDF + text question to generate refund decision
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Document analysis: Summarize 80 page technical report with
                  charts, tables, and diagrams while preserving visual
                  information
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Video understanding: Analyze 30 second screen recording (120
                  frames at 4 FPS) to debug UI interaction issues
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonMultimodalSystemsWhatAreMultimodalVisionLanguageModels;
